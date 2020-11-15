# Sentry 前端异常上报源码分析

> 林文聪 / 2019-12-03

这节我们主要对 Sentry 核心概念的基本原理进行分析，主要有几点：

- 收集错误信息
- 面包屑如何工作

## 收集错误信息

我们在前端收集错误，肯定离不开 [window.onerror](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror) 这个 API，Sentry 之所以能够自动收集错误信息，主要也是基于这个 API 来做的。

首先通过 `installGlobalHandler` 这个函数对原生的 `onerror` 进行了重写：

```ts
this._global.onerror = function(msg: any, url: any, line: any, column: any, error: any): boolean {
      const currentHub = getCurrentHub();
      const hasIntegration = currentHub.getIntegration(GlobalHandlers);
      const isFailedOwnDelivery = error && error.__sentry_own_request__ === true;

      if (!hasIntegration || shouldIgnoreOnError() || isFailedOwnDelivery) {
        if (self._oldOnErrorHandler) {
          return self._oldOnErrorHandler.apply(this, arguments);
        }
        return true;
      }

      const client = currentHub.getClient();
      const event = isPrimitive(error)
        ? self._eventFromIncompleteOnError(msg, url, line, column)
        : self._enhanceEventWithInitialFrame(
            eventFromUnknownInput(error, undefined, {
              attachStacktrace: client && client.getOptions().attachStacktrace,
              rejection: false,
            }),
            url,
            line,
            column,
          );

      addExceptionMechanism(event, {
        handled: false,
        type: 'onerror',
      });

      currentHub.captureEvent(event, {
        originalException: error,
      });

      if (self._oldOnErrorHandler) {
        return self._oldOnErrorHandler.apply(this, arguments);
      }

      return true;
    };
```

当然仅仅依赖于 `window.onerror` 还不够，比如说 `Promise` 里的 `reject`, 当没有 reject 处理器的时候，则会触发 [unhandledrejection](https://developer.mozilla.org/zh-CN/docs/Web/Events/unhandledrejection) 事件，因此需要用到这个 API，Sentry 也对其进行了重写：

```js
this._global.onunhandledrejection = function(e: any): boolean {
      let error = e;
      try {
        error = e && 'reason' in e ? e.reason : e;
      } catch (_oO) {
        // no-empty
      }

      const currentHub = getCurrentHub();
      const hasIntegration = currentHub.getIntegration(GlobalHandlers);
      const isFailedOwnDelivery = error && error.__sentry_own_request__ === true;

      if (!hasIntegration || shouldIgnoreOnError() || isFailedOwnDelivery) {
        if (self._oldOnUnhandledRejectionHandler) {
          return self._oldOnUnhandledRejectionHandler.apply(this, arguments);
        }
        return true;
      }

      const client = currentHub.getClient();
      const event = isPrimitive(error)
        ? self._eventFromIncompleteRejection(error)
        : eventFromUnknownInput(error, undefined, {
            attachStacktrace: client && client.getOptions().attachStacktrace,
            rejection: true,
          });

      event.level = Severity.Error;

      addExceptionMechanism(event, {
        handled: false,
        type: 'onunhandledrejection',
      });

      currentHub.captureEvent(event, {
        originalException: error,
      });

      if (self._oldOnUnhandledRejectionHandler) {
        return self._oldOnUnhandledRejectionHandler.apply(this, arguments);
      }

      return true;
    };
```

`installGlobalHandler.ts` 还在事件的 exception 上添加 stacktrace 属性，来存放收集到的堆栈跟踪记录：

```ts
  private _enhanceEventWithInitialFrame(event: Event, url: any, line: any, column: any): Event {
    event.exception = event.exception || {};
    event.exception.values = event.exception.values || [];
    event.exception.values[0] = event.exception.values[0] || {};
    event.exception.values[0].stacktrace = event.exception.values[0].stacktrace || {};
    event.exception.values[0].stacktrace.frames = event.exception.values[0].stacktrace.frames || [];

    const colno = isNaN(parseInt(column, 10)) ? undefined : column;
    const lineno = isNaN(parseInt(line, 10)) ? undefined : line;
    const filename = isString(url) && url.length > 0 ? url : getLocationHref();

    if (event.exception.values[0].stacktrace.frames.length === 0) {
      event.exception.values[0].stacktrace.frames.push({
        colno,
        filename,
        function: '?',
        in_app: true,
        lineno,
      });
    }

    return event;
  }
```

## Breadcrumbs 的实现

我们知道 Sentry 的面包屑功能，是用来收集 Issue 发生时的相关信息。通过 SDK 对某些事件的拦截，并时刻进行监听。只要在拦截范围内拦截到用户的操作，Sentry 都会为其生成一个面包屑记录，并通过实现的一个队列结构来存放这些记录；当错误发生时，这些信息会作为参数的一部分上传报告到 Sentry 后台。

通过查看 `breadcrumbs.ts` 源码，发现它主要是对 `DOM`, `EventListener`, `fetch`, `console`, `history`, `xhr` 几处进行了拦截处理。所有拦截事件会通过 [instrument](https://github.com/getsentry/sentry-javascript/blob/4905a844cef67fbd0347ee6e6f0da584f013a091/packages/browser/src/instrument.ts#L331)来进行添加，

来看看 `Dom` 相关的具体实现：

```ts
  /**
   * Creates breadcrumbs from DOM API calls
   */
  private _domBreadcrumb(handlerData: { [key: string]: any }): void {
    let target;

    /* 访问 event.target，并通过 htmlTreeAsString 递归获取父节点，获取到类似 body > div#app > 
      img[alt="Vue logo"] 之类的路径
     */
    try {
      target = handlerData.event.target
        ? htmlTreeAsString(handlerData.event.target as Node)
        : htmlTreeAsString((handlerData.event as unknown) as Node);
    } catch (e) {
      target = '<unknown>';
    }

    if (target.length === 0) {
      return;
    }

    getCurrentHub().addBreadcrumb(
      {
        category: `ui.${handlerData.name}`,
        message: target,
      },
      {
        event,
        name: handlerData.name,
      },
    );
  }
```

关于面包屑所有的拦截事件，都会根据构造函数的 options 来确定是否启用：

```ts
  public constructor(options?: BreadcrumbIntegrations) {
    this._options = {
      console: true,
      dom: true,
      fetch: true,
      history: true,
      sentry: true,
      xhr: true,
      ...options,
    };
  }
```