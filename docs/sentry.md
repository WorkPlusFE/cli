# Sentry

<p>
  <img :src="$withBase('/sentry-bg.jpg')" alt="sentry">
</p>

## 什么是 Sentry

Sentry 是一个开源的实时错误追踪系统，可以帮助开发者实时监控并修复异常问题。它主要专注于持续集成、提高效率并且提升用户体验。Sentry 分为服务端和客户端 SDK，前者可以直接使用它家提供的在线服务，也可以本地自行搭建；后者提供了对多种主流语言和框架的支持，包括 React、Angular、Node、Django、RoR、PHP、Laravel、Android、.NET、JAVA 等。同时它可提供了和其他流行服务集成的方案，例如 GitHub、GitLab、bitbuck、heroku、slack、Trello 等。

目前公司的前端项目也都在逐步应用上 Sentry 进行错误日志管理。

可以打开[https://sentry.workplus.io](https://sentry.workplus.io)进行访问，若需要申请账号，请联系相关负责人。

## 为什么使用 Sentry

任何项目发布上线，都会经过测试部门的检验。但往往线上问题，都存在偶发性、特殊性，或者难以重现。借助 Sentry，通过异常捕捉或者主动提交日志，可以更快地掌握异常的相关信息，大大减少排查问题成本。

一份异常日志，会包含用户的点击行为，网络请求等。同时可以通过 SourceMap 技术，对混淆压缩后的 js 文件进行反编译，精准定位错误代码位置。

## 如何使用

Sentry 官方支持多种前端框架，使用方式大同小异，下面以 Vue 为例：

> 更多的框架接入文档，请访问[https://docs.sentry.io/platforms/javascript/](https://docs.sentry.io/platforms/javascript/)

### 安装 SDK

要使用 Sentry，需先安装相应的 SDK，即`@sentry/browser`，至于`@sentry/integrations`，主要是用于跟 Vue 关联起来。

```bash
npm install --save  @sentry/browser @sentry/integrations
```

@sentry/browser 将报告通过应用程序触发的任何被捕获的异常。此外，通过 Vue 的 errorHandler 钩子，可以定位到异常所在的组件。

### 初始化

在入口文件敲入以下代码：

```js
import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [new VueIntegration({ Vue, attachProps: true })],
});
```

这样，Sentry 已经成功接入，但仅能上报全局上捕获的异常！


此外，VueIntegration 可以配置以下参数：
：
* `Vue` 可选的，如果不传入，则 window.Vue 必须存在；
* `attachProps` 可选的，默认为 true；若设置为 false，将不上报组件相关信息；
* `logErrors` 可选的，默认为 false；若设置为 true，若出现异常，Vue 的 logError 同样会输出到控制台。

::: tip 关于 logErrors
一旦启用 VueIntegration，异常将不会打印到开发者调试器的 console 中，若需要，请确保 logErrors 为 true。
:::

### 主动上报

偶尔需要对某些特殊功能或者关键性功能进行跟踪，此时可以使用 sentry sdk 提供的 API，主动上报日志。

* captureEvent
* captureMessage
* captureException

```js
import * as Sentry from '@sentry/browser';

// Capture exceptions, messages or manual events
Sentry.captureMessage('Hello, world!');
Sentry.captureException(new Error('Good bye'));
Sentry.captureEvent({
  message: 'Manual',
  stacktrace: [
    // ...
  ],
});
```

通常使用以上 3 个 API 为主，详情其查看[接口用例](https://github.com/getsentry/sentry-javascript/tree/master/packages/browser#usage)。

## 关于 dsn

一个 dsn，大概是长下面的样子，每个项目的 dsn 都是唯一的：

```bash
# http（不推荐）
http://d4c5b124775b2484ac6d4dbb48b@121.40.118.145:8080/232

# https（推荐）
https://d4c5b124775b2484ac6d4dbb48b@sentry.workplus.io/232
```

在 Sentry 上创建项目后，将可获取到相应的 dsn。

需要注意的是，目前配置获取到的是 http 的 ip段 dsn，在一些以 https 访问的应用上，日志无法正常上报，所以，**请确保使用 https 协议**。

如上，把`http://`协议改成`https://`，同时，`IP+端口`，改成域名访问地址`sentry.workplus.io`。

## 多环境区分

大多情况下，一个项目需要经过开发、测试到发布的阶段，而每个阶段，可能存在多种环境。

为了可以清晰地区分不同的环境，可以使用`configureScope`进行设置，如下：

```js
import * as Sentry from '@sentry/browser';

// Set user information, as well as tags and further extras
Sentry.configureScope(scope => {
  scope.setExtra('battery', 0.7);
  scope.setTag('user_mode', 'admin');
  scope.setUser({ id: '4711' });
  // scope.clear();
});
```

如果是主动上报的日志，可以通过拼装用户信息到日志标题中，用于快速区分，例如：

```js
// 在 message 中带上用户id
Sentry.captureEvent({
  message: `登录异常-${userId}`,
  stacktrace: [
    // ...
  ],
});
```

::: warning 关于开发阶段
开发阶段尽可能不要开启日志上报功能，除非需要处理特殊的事情，否则将会产生过多无谓的异常日志。可以通过`process.env.NODE_ENV`来判断，若为`development`，即不初始化 Sentry。
:::

## 上传 SourceMap

通过 w6s-cli 创建的项目，已经具备这样的功能（非默认），通过简单配置，即可实现上传功能，[查看配置](/#sentry)。

该功能是通过[@sentry/webpack-plugin](https://github.com/getsentry/sentry-webpack-plugin)实现，其他非 w6s-cli 创建的项目，可以直接使用该插件来实现 sourceMap 文件上传，但请注意，**请不要把 sourceMap 文件发布到生产环境**。




