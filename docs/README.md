# 快速开始

## 项目创建

### 安装 @w6s/cli <a href="https://www.npmjs.com/package/@w6s/cli"><img alt="npm" src="https://img.shields.io/npm/v/@w6s/cli.svg?style=flat-square"></a> 

环境要求：

* Node.js 版本 >=10
* [Yarn](https://yarnpkg.com/) (推荐使用) / npm

> 使用 Yarn 的理由：性能更好，使用更方便

通过以下命令进行安装：

```bash
yarn global add @w6s/cli
# or
npm install -g @w6s/cli
```

安装成功后，在 shell 中键入`w6s`，即可看到相关功能说明。 

```bash
Usage: w6s <command> [options]

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  init <app-name>             create a new project
  clone <template> [project]  generate a new project from a template
  list                        list available official templates
  serve                       http-server like, start a local static server
  help [command]              display help for command
```

### 通过 w6s init 创建

`w6s-cli`有两种创建初始项目的方法，分别是通过`w6s init app-name`及`ws6 clone template-name`命令。其中，clone 命令是1.0版本的功能，目前还保留了一些优质的项目模版，可以通过`w6s list`进行查看。

**在2.0版本，请使用 init 命令进行项目创建。**

当前`w6s-cli`内置两个项目模版，分别是`admin`和`H5`，如其名，admin 为管理后台类型的前端项目模版，而 H5 就是轻应用的前端项目模版。

> `admin`和`H5`俩模版只在使用 init 命令时可选（后续会补充小程序的项目模版，敬请期待！）

假设当前在文件目录A， 执行以下命令：

```bash
w6s init project1
```

此时，会要求使用者选择项目模版，通过`上下方向键`选择需要的模版即可。

选择模版后，cli 会自动在 A 目录下创建 project1 文件夹，并把所选的项目模版生成到 project1 文件夹内，在这之前会有一些人机交互，使用者需要输入一些简单的项目信息：

```bash
? Project name: project1
? Project description: A vue2.0 minimal H5 layout template.
? Author: hejx@foreverht.com 
```

项目创建完毕后，会询问是否自动安装依赖及启动服务，然后输入`yes/no`即可。cli 会自动判断你的电脑上所安装的`Node.js包管理器`，优先会使用`Yarn`进行依赖的安装。

如果没有选择自动安装依赖及启动服务，需要进入 project1 文件夹，执行以下命令：

```bash
# 进入目录
cd project1

# 安装依赖
yarn

# 安装成功后，启动服务
yarn dev
```

### 通过 w6s clone 创建

clone 方式已经不推荐使用，但如果对其他的项目模版有兴趣的，可以使用 clone 方式进行项目创建。

通过 `w6s list`，可以查看当前所有的项目模版，所有的模版都放置在叫[workplus-templates](https://github.com/workplus-templates)的 Github 组织里，因为是即时查询的，可能会因为网络问题而失败，可以多次尝试或切换网络。

当前所有的模版：

```bash
* f7-vue - Framework7 Vue Webpack starter app template.
* multiple-pages - Multiple pages starter project.
* rollup-starter - Sample project for packages built using rollup.
* single-page - Single-page starter project, include webpack, less, babel.
* vue-component - Roll your Vue components with Rollup.
* webpack-framework7 - A starter project for using Framework7 with Webpack via Babel!
* webpack-vue - Webpack VueJs template. 
```

然后选择需要的模版，例如`f7-vue`这个模版，通过`w6s clone f7-vue project2`命令，即可在当前目录创建`project2`文件夹，并将项目生成到文件夹里。

### 其他功能

#### w6s serve

用于启动一个静态文件服务，详细使用方法，可通过输入`w6s serve --help`进行查看。

#### w6s qrcode

用于生成二维码，例如一个应用的访问地址，通过输入`ws6 qrcode <app-url>`，即可在 shell 上生成二维码，方便手机扫码调试。

详细使用方法，可通过输入`w6s qrcode --help`进行查看。

## 项目介绍

### 技术栈

核心技术栈：

* vue@2.6.11
* vue-router@3.1.6
* vuex@3.1.3"
* vue-i18n@8.17.5
* typescript@3.8.3
* axios@0.19.2
* vue-class-component@7.2.3
* vue-property-decorator@8.4.1
* vuex-module-decorators@0.17.0

其他：

* core-js@3.6.5
* @sentry
  * browser@5.15.5
  * integrations@5.15.5
* @w6s
  * codash@1.1.2
  * cordova-import@1.3.2

> tips: 在 H5 sdk 出来后，codash 和 cordova-import 将会被取代。

UI库

* [admin] element-ui@2.9.2
* [H5] vant@2.8.1

### 目录说明

以`H5`模版为例，当前项目文件结构如下：

```bash
.
├── README.md
├── babel.config.js            --- babel 配置文件
├── commitlint.config.js       --- commitlint 配置文件
├── mock                       --- 模拟 api，mock 服务
│   └── index.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── sentry.config.js           --- sentry 配置
├── src
│   ├── App.vue
│   ├── api                    --- api 目录
│   │   └── user.ts
│   ├── assets                 --- 放置静态资源
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── i18n.ts                --- 国际化配置入口
│   ├── locales                --- 国际化文件存放位置
│   │   └── zh-CN.json
│   ├── main.ts
│   ├── router                 --- 路由配置
│   │   └── index.ts
│   ├── shims-tsx.d.ts
│   ├── shims-vue.d.ts
│   ├── store                  --- vuex 配置
│   │   ├── index.ts
│   │   └── modules
│   │       └── Counter.ts
│   ├── styles
│   │   └── index.scss
│   ├── typings
│   │   └── Common.ts
│   ├── utils
│   │   ├── cordova            --- cordova 相关，引入了 @w6s/codash
│   │   │   └── index.ts
│   │   ├── http               --- http 相关，封装了一些 api 请求方法
│   │   │   └── https.ts
│   │   └── sentry             --- sentry 模块的设置
│   │       └── index.ts
│   └── views                  --- 页面
│       ├── About.vue
│       └── Home.vue
├── stylelint.config.js        --- stylelint 配置
├── tsconfig.json              --- typescript 配置
├── w6s.config.js              --- w6s-cli-script 配置（详情请看 w6s.config.js 栏目）
├── .browserslistrc            --- babel 转换的目标浏览器版本配置文件
├── .editorconfig              --- ide 的一些默认配置，例如缩进为2个空格
├── .env                       --- 环境配置文件（生产配置）
├── .env.development           --- 环境配置文件（开发配置）
└── .eslintrc                  --- eslint 的配置文件
```

### scripts 命令说明

具体可用命令，请在项目的根目录查看`package.json`的`scripts`标签，以下做简单的作用描述：

* `dev` -- 启动服务，用于项目开发
* `serve` -- 同上
* `build` -- 对项目进行打包
* `lint` -- js 代码检测
* `lint:style` -- 样式检测
* `i18n:report` -- 检测 i18n 的配置是否有缺漏或者存在没被使用的属性
* `inspect` -- 打印出项目的 webpack 配置
* `svg` -- 通过`vue-svgicon`，把 svg 图标生成 vue 控件

### w6s-cli-script

在上一步 scripts 命令里，例如`dev`命令，是通过`w6s-cli-script dev`执行的。`w6s-cli-script`实际是对`@vue/cli-service`的上层封装，除了原始的几个命令方法，包括`serve`、`build`、`inspect`及`lint`，`w6s-cli-script`还内置了`i18n:report`和`lint:style`，以及一系列的插件。也就是说，`@vue/cli-service`支持的，`w6s-cli-script`同样支持，例如，添加第三方的 vue-cli 插件。

> 不能通过 vue add plugin 的方式添加，因为某些插件会改变文件内容，例如在 vue.config.js 添加配置

### w6s.config.js

为了让项目看起来更加专业（装逼），配置文件被命名为`w6s.config.js`，这个配置文件会被`w6s-cli-script`读取（如果存在的话）。项目创建后，`w6s.config.js`会有一些初始的配置，例如某些插件的初始化配置，同时，`w6s.config.js`的所有设置，实际跟`vue.config.js`是一致的，也就是说，相关的构建配置，可以直接查看 [vue-cli](https://cli.vuejs.org/config/#vue-config-js) 官网。

## 默认插件

> 所有配置文件，若无特殊原因，请勿随意修改

### babel

bable 使用的是`@vue/cli-plugin-babel`，相关配置请查看`babel.config.js`。其中针对不同项目模板的 UI 库，默认支持按需引入。

### eslint

eslint 使用的是`@vue/cli-plugin-eslint`，相关配置请查看`.eslintrc.js`，当前使用的规范是`@w6s/eslint-config`。

```js
module.exports = {
  root: true,
  extends: ['@w6s'],
  rules: {
    ...
  },
};

```

### stylelint

stylelint 使用的是`@w6s/stylelint-plugin`，相关配置请查看`stylelint.config.js`，当前使用的规范是`@w6s/stylelint-config`。

```js
module.exports = {
  "extends": ["@w6s/stylelint-config"],
};
```

### typescript

相关配置请查看`tsconfig.json`。

### mock

API mock 服务功能，是通过`@w6s/mock-plugin`实现的。依赖于 webpack 的 dev-server，通过 express 中间件的方式来达到模拟请求的效果，所有请求都可以在调试器的 network 一栏查看。插件的默认配置在`w6s.config.js`里，如果不需要，可以将`disable`设置为`true`。

API 的模拟，默认放置在`/mock/index.js`里，`@w6s/mock-plugin`会监听文件的变化，并自动重置所有请求配置。

> 模拟接口的配置文件，必须按 node.js 的模块规范来导出，暂不支持以 es 的模块导出。

### vConsole

[vConsole](https://github.com/Tencent/vConsole) 是腾讯开源的一个轻量、可拓展、针对手机网页的前端开发者调试面板。

通过`@w6s/vconsole-plugin`插件，会自动判断当前环境，只会在开发模式下，也就是`process.env.NODE_ENV === 'development'`时，自动为项目引入 vConsole，便于在移动设备调试。

当前该插件默认在 H5 项目模版启用。

### sentry

sentry 是一个实时的事件日志记录和聚合平台。当前我们也私有化部署了一套，可以通过[https://sentry.workplus.io/sentry/](https://sentry.workplus.io/sentry/)访问。

而该插件的功能由`@w6s/sentry-plugin`插件提供，主要是用于在项目打包后，上传前端资源文件，例如 js 的`sourcemap`文件。配置在`sentry.config.js`文件中，使用该插件前，需要在 sentry 上创建项目并获取`apiKey`。

```js
module.exports = {
  // Sentry options are required
  enable: false,
  project: 'your-project-name',
  apiKey: 'sentry-auth-token',
};
```

### i18n

该插件使用的是一个叫[vue-cli-plugin-i18n](https://github.com/kazupon/vue-cli-plugin-i18n)的第三方 vue-cli 插件，该插件会注册一个名为`i18n:report`的`command`命令，该命令的主要作用就是检测当前的国际化配置中，哪些属性有遗漏或未被使用。有利于检测国际化配置的完整性，避免不必要的低级错误。

国际化文件，默认存放到`src/locales/`内，为保证统一性，请勿随意修改目录。

### style-resources-loader

该插件是通过`@w6s/style-resources-loader-plugin`实现。主要是依赖了[style-resources-loader](https://github.com/yenshih/style-resources-loader)模块。

该 loader 主要用于：

* 在所有样式文件中共享变量，mixin，函数，因此您无需手动 @import 它们；
* 覆盖其他库提供的样式文件中的变量（例如 element-ui），并自定义您自己的主题。

## 项目规范

### eslint

具体规范配置，可查看[@w6s/eslint-config](https://github.com/WorkPlusFE/eslint-config/blob/master/index.js)。

主要规范包括：

* [@vue/eslint-config-airbnb](https://github.com/vuejs/eslint-config-airbnb/blob/master/index.js)
* [@vue/eslint-config-typescript/recommended](https://github.com/vuejs/eslint-config-typescript/blob/master/recommended.js)

关于 Airbnb 的 JavaScript 规范，可以查看[这里](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-)。

### stylelint

具体规范配置，可查看[@w6s/stylelint-config](https://github.com/WorkPlusFE/stylelint-config/blob/master/index.js)

主要规范包括：

* [stylelint-config-airbnb](https://github.com/airbnb/css#airbnb-css--sass-styleguide)
* [stylelint-config-rational-order](https://github.com/constverum/stylelint-config-rational-order#stylelint-config-rational-order)

### commitlint

借助 [husky](https://github.com/typicode/husky)，我们可以在 git hook 中定义事件，用于进行多种检测。实际在每次代码提交到仓库前，都会执行 js 及样式的规范检测及自动修复。

除此之外，为了更好地管理项目的提交记录，我们还会检测提交代码时输入的`commit message`，使用的是[@commitlint/config-conventional"](https://github.com/conventional-changelog/commitlint)规范。

基本写法：

```bash
type(scope?): subject  #scope is optional
```