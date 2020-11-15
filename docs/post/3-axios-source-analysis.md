# Axios 源码分析

> 何建贤 / 2020-11-15

[Axios](https://github.com/mzabriskie/axios) 可以说是当前 Github 上最受关注的 HTTP 库，目前已经有超过 78k 的 star 数。作为 vue.js 官方推荐的 HTTP 库，必然有着过人之处。

Axios 的主要特性包括：

- 基于 Promise
- 支持浏览器和 node.js
- 可添加拦截器和转换请求和响应数据
- 请求可以取消
- 自动转换 JSON 数据
- 客户端支持防范 XSRF
- 支持各主流浏览器及 IE8+

对比于 fetch，除了同样支持 Promise API 外，aixos 的确拥有更加丰富的功能，而这次的源码分析也主要是针对‘拦截器’和‘请求取消’。

## 拦截器

在 Axios 中，大概是这样添加拦截器：

```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
```

从上面的代码，我们可以把每一次请求想象成一条管道里的流过的水。当一个请求发出的时候，会先流过 interceptors 的 request 部分，接着请求会发出，当接受到响应时，会先流过 interceptors 的 response 部分，最后返回，这条管道大概如下：

```js
interceptors.request -> request -> interceptors.response -> response
```

而 Axios 内部，很巧妙地实现了上面所说的管道式流程，首先看 `lib/core/Axios.js`文件里的部分代码:

```js
var dispatchRequest = require('./dispatchRequest');

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

Axios.prototype.request = function request(config) {
    // 省略部分代码...
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
};
// 省略部分代码...
```

上面的的代码中，首先看到 Axios 类的定义里面有 interceptors，并且带有 request 和 response 属性，而这 2 个属性都是指向 InterceptorManager 类的实例。这个等下再说，先看 request 方法里 interceptors 的实现。

我们留意 chain 这个变量，经过 2 次 `forEach` 操作后，最后的值会变成：(这个 forEach 方法在 InterceptorManager 中定义)

```js
[interceptor.request.fulfilled, interceptor.request.rejected, 
dispatchRequest, undefined, 
interceptor.response.fulfilled, interceptor.response.rejected]
```

而最终将 chain 里的方法包成 promise，并返回：

```js
while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
}
return promise;
```

返回的 promise 会是这样：

```js
Promise.resolve(config)
    .then(interceptor.request.fulfilled, interceptor.request.rejected)
    .then(dispatchRequest, undefined)
    .then(interceptor.response.fulfilled, interceptor.response.rejected)
```

讲到这里，就差一步了，就是发起请求，截取部分代码：

```js
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

// 省略 'post', 'put', 'patch' 方法的定义
```

到这里，我们可以看到，axios 将所有的请求都通过 request 方法发起， 这样就完全符合我们在上面说的管道流程，而 `chain` 变量里定义的 `undefined` 也是很巧妙。而在`lib/core/InterceptorManager.js`里，定义了 InterceptorManager 类，和一些方法，例如 use 和 eject，包括上面的 forEach。

## 取消请求

首先还是从调用方法开始看：

```js
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  // something
});

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

分析上面的这段代码，可以看得出`CancelToken.source()` 是起最主要作用的，包括它的`token`和`cancel`方法。我一开始以为取消请求，会是在拦截器的那条管道上去处理，但是实际上并没有，它是把这取消请求的逻辑放到了 adapter（这里主要分析 xhr.js，也就是浏览器部分） 来处理，而 adapter 会在 dispatchRequest 里引用。

其实这一部分代码并不多，但是理解起来会有点乱，首先看 `lib/adapters/xhr.js` 这个文件，截取部分代码：

```js
if (config.cancelToken) {
    config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
            return;
        }
        request.abort();
        reject(cancel);
        request = null;
    });
}
```

那么这里出现了一个有趣的东西，就是 config.cancelToken，和在第二行代码中的 config.cancelToken.promise，这里的代码我们暂时就简单地理解成当执行了请求取消时，请求会被终止，并且 reject。

那现在我们去看 cancel 的内部代码，只有 3 个 js 文件，都在 lib/cancel 文件夹里，然后里面最重要的是 CancelTOken.js 文件，代码不多：

```js
function CancelToken(executor) {
  // 省略...
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
```

那么从这里，我们看到了 this.promise 这个方法，和上面提到的那个其实是同一个，但是这里，它却没有执行 resolve，而是进行了一个变量赋值。而这个 resolve 是要在 executor 函数传入的函数方法执行的时候，才会被执行，并且返回 reason 信息。

那其实到了这里，我们还是得从调用方式反过来推导，到现在 token 和 cancel 方法还没出现呢，请看下面的代码：

```js
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};
```

到这里，就很清晰了，如果调用了 cancel 方法，其实就等同于将上一段代码中的 resolvePromise 给执行了，并且 reason 也会被实例化。然后要注意的是，这里的 token，也就是 config.cancelToken，这里必须是要 cancel 方法执行后，this.promise 才会正式 resolve，不然会一直处于 pending 状态。

那这时候回到 xhr.js 里的那段代码，就真正的连起来了：

```js
执行 cancel 方法 -> 生成 reason 信息 -> promise resolve -> request abort
```

然后这里还有一点，就是被取消的请求，会在 catch 方法里返回（或者在 then 的第二个方法里返回，但是这个没验证过），是因为在 dispatchRequest 里，在请求准备返回响应时，如果请求被取消了，会 throw 一个错误，而因为都是包在 Promise 里，所以这个异常也是会被捕捉到。

```js
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
```

而这个 throwIfRequested 方法就是简单地把 reason throw 出来。

## 总结

Axios 其实还有很多接口方法和特性，也是进行了一些抽象封装什么的，不过这些都比较容易看的懂。在看源码的过程中，除了可以发现一些有趣的或者神奇的代码之外，其实重点还是在于学习一些编码的技巧和思路，及项目的管理，例如代码和模块的拆分。