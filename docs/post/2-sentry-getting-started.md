# Sentry 入门攻略

> 林文聪 / 2019-12-03

## 基本概念

[Sentry](https://github.com/getsentry/sentry) 是一个开源的实时错误监控的项目，支持多端的配置，包括 web 前端、服务器端、移动端及游戏端。

支持各种主流语言，例如 python、oc、java、node、javascript 等，也可以应用到各种不同的框架上面，如前端框架中的 vue 、angular 、react 等最流行的前端框架，此外还提供了 GitHub、Slack、Trello 等常见开发工具的集成。

Sentry 使用 python 的 Django 编写后端服务；8.0 版本开始使用了 React.js 构建前端 UI。 

Sentry 采用的是 C/S 架构，客户端通过 SDK 的方式集成到应用程序中，并自动将错误发送到 Sentry 的服务端。一般情况下，我们只需要在项目里安装 SDK 且进行少量配置，十分方便。

<!-- more -->

官方提供的 SaaS 服务，有 **免费** 和 **收费** 两种模式：

- 个人开发者（免费），支持所有语言，不支持团队协作，功能受限较多
- 团队/企业（收费），$26/月起，收费主要以事件数量和一些高级功能为准

除此之外，作为开源项目，Sentry 也支持私有化部署，官方提供了相关 [文档](https://docs.sentry.io/server/)

## 竞品对比

[Sentry](https://sentry.io/welcome)
优势：支持语言全面，功能丰富，开源项目
缺点：非国内社区，官方没有小程序的 SDK

[FunDebug](https://www.fundebug.com)
优势：支持各类小程序，[BUG场景重现](https://static.fundebug.cn/eleme_full.mp4)
缺点：收费，定位偏前端

[FrontJs](https://www.frontjs.com/feature/website)
优点：提供性能监控，支持各类小程序
缺点：收费，仅前端项目可用

上述工具基本都支持常见的错误追踪、SourceMap 及用户记录等，Sentry 对于其他国内的同类型平台工具来说，主要优势是开源免费，且功能较为多，除了缺少中文社区支持外，像没有小程序的SDK这种，其实也能通过个人开发或社区贡献来解决，这里附上一个丁香园开源的 [小程序 - SDK](https://github.com/lizhiyao/sentry-miniapp)

## 接入前端项目

以 `Vue` 项目为例，首先我们需要使用官方提供的两个 SDK:

- @sentry/browser
- @sentry/integrations

安装到项目里：

```sh
# Using yarn
$ yarn add @sentry/browser
$ yarn add @sentry/integrations

# Using npm
$ npm install @sentry/browser
$ npm install @sentry/integrations
```

完成之后，找到项目的入口文件进行配置，例如`app.js`:

```js
import Vue from "vue";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

Sentry.init({
  dsn: "https://<key>@sentry.io/<project>",
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
});
```

这样我们就完成了 SDK 最基本的配置，现在只要项目里出现任何未捕获的错误，SDK 都会帮你上传报告到 Sentry，针对其他一些特殊场景，需要我们手动发起错误报告的，可以用 Sentry 提供的API：

- **captureException**：捕获异常，发送事件包含整个错误对象
- **captureMessage**：捕获消息，发送一个只包含文本信息的事件

如常见的 try catch 处理：

```js
try {
    aFunctionThatMightFail();
} catch (err) {
    Sentry.captureException(err);
}
```

> * 如果你的项目并没有使用 `Vue`，只需要把上面的 `@sentry/integrations` 相关步骤移除即可，在这里它主要是通过 `Vue` 的 **config.errorHandler** 钩子函数，捕获 `Vue` 框架内引发错误的组件名称和 props 等。
> * 查看完整的 Sentry SDK 配置 [案例](https://github.com/getsentry/sentry-javascript/blob/b8691d3994f55033f52f3e83b2c0c3933bc01696/packages/browser/examples/app.js#L34)

## DSN（Data Source Name）

DSN 作为应用的客户端密钥，用来确定 SDK 将事件发送到哪里。如果未提供此值，则 SDK 会尝试从SENTRY_DSN 环境变量中读取它。如果该变量也不存在，则 SDK 将不会发送任何事件。

DSN 的组成：'{PROTOCOL}://{PUBLIC_KEY}@{HOST}/{PATH}{PROJECT_ID}'

> * 同一个应用可以生成多个 DSN
> * DSN 可以设置 **速率限制**，比如某个时间段能接受的最多事件量，来避免滥用及服务器攻击。

## Environments

SDK 通过配置 Environments，可以解决项目下同项目中不同环境的问题：

```js
Sentry.init({
  environment: 'staging',
})
```

配置完成后，我们在管理后台可以看到对应的 Environments：

![Environments](https://docs.sentry.io/assets/environment_filter-0c0681900ea6c1c30d8ef08382a6da17b38013780f19a03087885bf6fa0f9430.png)

## Breadcrumbs

Sentry 通过 SDK 会自动记录某些用户操作，例如 url 的改变、Dom 事件的触发以及 XHR 请求等，这种称之为 **Breadcrumbs 面包屑**。它主要用来记录当事件发生时，用户操作的一系列行为，以便我们更好地重现场景：

![Breadcrumbs](https://images.ctfassets.net/em6l9zw4tzag/4gBMFPOm4dQWm9OfrHLPqt/983c79b198222ac9d46e8d781202be92/breadcrumbs.png)

我们还可以自定义面包屑事件，比如用 `addBreadcrumb` 来一个面包屑：

```js
window.addEventListener('resize', function(event){
  Sentry.addBreadcrumb({
    category: 'ui',
    message: 'New window size:' + window.innerWidth + 'x' + window.innerHeight,
    level: 'info'
  });
})
```

此外还提供了 `beforeBreadcrumb` 钩子函数，来进行面包屑添加前的最后交互。

## Context & Scope

Sentry 提供 **Context**(上下文) 及 **Scope**(作用域)，当捕获事件时，SDK 会将事件数据与当前作用域中的信息进行合并，然后再发送到服务端。

我们可以手动进行设置 Context，它包含以下几个部分：

- **Structured Contexts**：特定的结构化上下文——包含操作系统信息，运行时的信息等，由 Sentry 自动设置。

- **User**：设置当前的用户信息，向 Sentry 发送用户信息可以解锁更多功能，主要能力是收集受到问题影响的用户数量，以及更加了解 app 的整体质量。提供四个字段：`id`、`username `、`email `、`ip_address `，默认为 IP 地址，设置如下：

```js
Sentry.configureScope((scope) => {
  scope.setUser({"email": "john,doe@example.com"});
});
```

> 除此之外也可以提供任意的键值对，只要不是以上的保留字段，Sentry SDK 都会将它与用户信息储存起来。

- **Tags**：以键值对的形式来设置，用户可以使用他们快速地访问相关的事件，绝大多数 SDK 通常支持在配置 scope 的时候配置 tag：

```js
Sentry.configureScope((scope) => {
  scope.setTag("locale", "en");
});
```

只要 Sentry 开始发送打上了 tag 的数据，我们就可以在以下地方看到它：

1.  侧边栏的过滤器
2. 侧边栏的事件总结
3. 聚合事件上的标签页

Sentry 会自动对一个事件的所有 tag 做索引，以及事件的发生概率和最后一次接受到的值，我们可以追踪不同标签的数量来分析各种问题的热点。

- **Level**：设置事件严重等级：`fatal`, `error`, `warning`, `info`, `debug`；`error ` 是默认值，`fatal` 等级最高，`debug` 等级最低，通过 setLevel 来设置：

```js
Sentry.configureScope((scope) => {
  scope.setLevel('warning');
});
```

- **Fingerprint**：Sentry 通过指纹来对事件进行分组，对于某些场景，可以通过使用指纹来覆盖Sentry 默认的分组。

- **Extra Context**：用来为事件添加额外数据，可以是任意的键值对，Sentry SDK 将会把它与事件一同储存起来，一般用于备注信息，不会影响索引，由于 Sentry 单个事件的大小限制，因此不宜添加大量数据：

```js
Sentry.configureScope((scope) => {
  scope.setExtra("character_name", "Mighty Fighter");
});
```

关于 Scope 的用法

**configureScope** 会创建全局的作用域，这意味着在 `configureScope` 里设置过后的上下文信息会一直保留，可以通过 `scope.clear()` 来进行清除；如果只是需要一次性的 scope，应该改用 `Sentry.withScope` 来完成

**withScope** 用来创建临时的作用域，当每一个操作（请求，等等）结束时就会被清除：

```js
Sentry.withScope(scope => {
  scope.setExtra("character_name", "Mighty Fighter");
  Sentry.captureException(error);
});
```

## Source Map & Release

Sentry 推荐将 Source Map 和 Sentry SDK 结合，这样可以更充分的利用监控与错误堆栈，同时Source Map 提供的错误堆栈提供了更多的关于错误的信息。

线上产品代码一般是编译过的，因此 Source Map 的生成方式也有多种：

- 转译器/Transpilers (Babel, Traceur)
- 编译器/Compilers (Closure Compiler, TypeScript, CoffeeScript, Dart)
- 压缩/Minifiers (UglifyJS)

常见的场景在我们打包完成后，会生成对应的 sourcemap 文件, 一般情况下我们会将 js 脚本部署到服务器上，而将 sourcemap 文件上传到监控系统，在监控系统中展示 stack 信息时，利用 sourcemap 文件对 stack 信息进行解码，从而得到源码中的具体信息。  

> 顺便附上 [Source Map 的原理探究](https://blog.fundebug.com/2018/10/12/understanding_frontend_source_map/)

有了 Source Map，Sentry 还需要将它和 **Release 版本** 进行关联，通过和 sourcemap 进行对应，才能保证在查异常的时候可以正确利用 stack 信息，找到出问题所在版本的代码。

> Release 的名字在组织（organization）中必须是唯一的，默认情况下是 git 的 Commit Id，但我们也可以手动指定它，如 `dev@1.0.0`

Release 一般在构建过程中执行，因此可以通过建立 CI 任务，在集成化部署中增加一个部署流程以实现。Sentry 中有两种配置方式:

- 直接上传到 Sentry (`webpack-plugin`、`sentry cli`)
- 将 SourceMap 文件托管到线上以进行访问

官方提倡我们使用第一种方式，主要有以下几点考虑：

- Sentry并不总是能够访问到你的服务器
- 如果你在资源的url中未指定版本，也许会导致版本不匹配
- 额外的请求延迟
- 暴露的安全问题

这里我们介绍通过 webpack-plugin 方式来上传 SourceMap，因为 webpack 相对于前端开发人员更熟悉:

首先安装：

```bash
$ yarn add @sentry/webpack-plugin --dev
```

在 webpack 的配置文件里：

```js
const SentryCliPlugin = require("@sentry/webpack-plugin");

const config = {
  plugins: [
    new SentryCliPlugin({
      include: ".",  // 根目录，递归查找 sourcemap
      ignoreFile: ".sentrycliignore",
      ignore: ["node_modules", "webpack.config.js"],
      configFile: "sentry.properties"
    })
  ]
};
```

在目录下新建一个 `.sentryclirc` 文件，设置 sentry-cli 的默认项：

```txt
[defaults]
url = <url>  # sentry 的请求地址
org = <my-org> # 组织名
project = <my-project> # 应用名

[auth]
token = <my-token> # 注意这里是账号的token
```

完成后我们执行构建任务，应该可以看到对应的 SourceMap 已经上传，我们可以在 Sentry 管理后台进行确认：

![Release](https://user-images.githubusercontent.com/10757519/69917803-0092c700-14a5-11ea-8ecb-16bbdd0d7e83.png)

## 敏感数据

我们知道，Sentry 默认是会发送所有事件的，那对于一些敏感数据的场景又该如何处理呢？比如说用户的账号个人信息、支付相关信息等，其实 Sentry 也提供了相关配置，总结如下：

- SDK 支持 **blacklistUrls** 配置，通过设置字符串或正则表达式来匹配 URL 黑名单列表，命中则不上传：

```js
Sentry.init({
    blacklistUrls: ["/home"]
})
```

- 通过 `beforeSend` 钩子函数来对事件进行拦截处理，如返回 `null` 则让事件作废，不上传：

```js
Sentry.init({
  beforeSend(event) {
    // 此钩子函数可以进行发送前的最后处理
    return null;
  }
})
```

- 通过 `beforeBreadcrumb` 钩子函数来对面包屑进行拦截处理，如返回 `null` 则过滤

```js
Sentry.init(event) {
  beforeBreadcrumb(breadcrumb, hint) {
    if (breadcrumb.category === 'ui.click') {
      const { target } = hint.event;
      if (target.ariaLabel) {
        breadcrumb.message = target.ariaLabel;
      }
    }
    return breadcrumb;
  },
})
```

> 对于项目某些环境不需要配置 Sentry SDK 的，则可以通过环境变量来处理

## Issue Owner 

默认情况下，如果没有开启 Issue Owner，Sentry 会将警报发送到与此项目关联的团队的所有成员，通过 Issue Owner，可以设置基于路径或 URL 将通知定向到特定的团队或用户，从而减少冗余的提醒通知。这会更快速地将问题推送给相应的开发人员，从而更快地解决这些问题。

![Issue Owner](https://docs.sentry.io/assets/owners_panel-507c5848d618903826c83affa142278dd07296514ec8052041ab85c4ebf200d3.png)
