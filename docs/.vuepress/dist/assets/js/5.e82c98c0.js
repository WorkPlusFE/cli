(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{437:function(s,t,e){"use strict";e.r(t);var a=e(55),n=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"快速开始"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#快速开始"}},[s._v("#")]),s._v(" 快速开始")]),s._v(" "),e("h2",{attrs:{id:"项目创建"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#项目创建"}},[s._v("#")]),s._v(" 项目创建")]),s._v(" "),e("h3",{attrs:{id:"安装-w6s-cli"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装-w6s-cli"}},[s._v("#")]),s._v(" 安装 @w6s/cli")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://www.npmjs.com/package/@w6s/cli"}},[e("img",{attrs:{alt:"npm",src:"https://img.shields.io/npm/v/@w6s/cli.svg?style=flat-square"}})])]),s._v(" "),e("p",[s._v("环境要求：")]),s._v(" "),e("ul",[e("li",[s._v("Node.js 版本 >=10")]),s._v(" "),e("li",[e("a",{attrs:{href:"https://yarnpkg.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Yarn"),e("OutboundLink")],1),s._v(" (推荐使用) / npm")])]),s._v(" "),e("blockquote",[e("p",[s._v("使用 Yarn 的理由：性能更好，使用更方便")])]),s._v(" "),e("p",[s._v("通过以下命令进行安装：")]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" global "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" @w6s/cli\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# or")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -g @w6s/cli\n")])])]),e("p",[s._v("安装成功后，在 shell 中键入"),e("code",[s._v("w6s")]),s._v("，即可看到相关功能说明。")]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("Usage: w6s "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("command"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\nOptions:\n  -V, --version    output the version number\n  -h, --help       display "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("help")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("command")]),s._v("\n\nCommands:\n  init "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("app-name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("  create a new project\n  serve            http-server like, start a "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("local")]),s._v(" static server\n  qrcode           draw QRcode "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" terminal window\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("env")]),s._v("              print debugging information about your environment\n  "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("help")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("command"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("   display "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("help")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("command")]),s._v("\n")])])]),e("h3",{attrs:{id:"通过-w6s-init-创建"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#通过-w6s-init-创建"}},[s._v("#")]),s._v(" 通过 w6s init 创建")]),s._v(" "),e("p",[s._v("当前"),e("code",[s._v("w6s-cli")]),s._v("内置两个项目模版，分别是"),e("code",[s._v("admin")]),s._v("和"),e("code",[s._v("H5")]),s._v("，如其名，admin 为管理后台类型的前端项目模版，而 H5 就是轻应用的前端项目模版。")]),s._v(" "),e("p",[s._v("假设当前在文件目录A， 执行以下命令：")]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("w6s init project1\n")])])]),e("p",[s._v("此时，会要求使用者选择项目模版，通过"),e("code",[s._v("上下方向键")]),s._v("选择需要的模版即可。")]),s._v(" "),e("p",[s._v("选择模版后，cli 会自动在 A 目录下创建 project1 文件夹，并把所选的项目模版生成到 project1 文件夹内，在这之前会有一些人机交互，使用者需要输入一些简单的项目信息：")]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("? 请输入项目名称 project1\n? 请输入项目描述 project1\n? 请输入项目创建者 hejx\n")])])]),e("p",[s._v("项目创建完毕后，会询问是否自动安装依赖及启动服务，然后输入"),e("code",[s._v("yes/no")]),s._v("即可。cli 会自动判断你的电脑上所安装的"),e("code",[s._v("Node.js包管理器")]),s._v("，优先会使用"),e("code",[s._v("Yarn")]),s._v("进行依赖的安装。")]),s._v(" "),e("p",[s._v("如果没有选择自动安装依赖及启动服务，需要进入 project1 文件夹，执行以下命令：")]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入目录")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" project1\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装依赖")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装成功后，启动服务")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" serve "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# yarn dev 同样可用")]),s._v("\n")])])]),e("h3",{attrs:{id:"其他功能"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#其他功能"}},[s._v("#")]),s._v(" 其他功能")]),s._v(" "),e("h4",{attrs:{id:"w6s-serve"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#w6s-serve"}},[s._v("#")]),s._v(" w6s serve")]),s._v(" "),e("p",[s._v("用于启动一个静态文件服务，常用于应用打包后的本地调试。")]),s._v(" "),e("p",[s._v("详细使用方法，可通过输入"),e("code",[s._v("w6s serve --help")]),s._v("进行查看。")]),s._v(" "),e("h4",{attrs:{id:"w6s-qrcode"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#w6s-qrcode"}},[s._v("#")]),s._v(" w6s qrcode")]),s._v(" "),e("p",[s._v("用于生成二维码，例如一个应用的访问地址，通过输入"),e("code",[s._v("ws6 qrcode <app-url>")]),s._v("，即可在 shell 上生成二维码，方便手机扫码调试。")]),s._v(" "),e("p",[s._v("详细使用方法，可通过输入"),e("code",[s._v("w6s qrcode --help")]),s._v("进行查看。")]),s._v(" "),e("h4",{attrs:{id:"w6s-env"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#w6s-env"}},[s._v("#")]),s._v(" w6s env")]),s._v(" "),e("p",[s._v("输出当前设备的一些软件或工具的版本信息，例如：")]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("Environment Info:\n\nSystem:\n  OS: macOS "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.15")]),s._v(".4\n  CPU: "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" x64 Intel"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("R"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" Core"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("TM"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" i5-5257U CPU @ "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(".70GHz\nBinaries:\n  Node: "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.16")]),s._v(".0 - ~/.nvm/versions/node/v10.16.0/bin/node\n  Yarn: "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.22")]),s._v(".4 - ~/.nvm/versions/node/v10.16.0/bin/yarn\n  npm: "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6.9")]),s._v(".0 - ~/.nvm/versions/node/v10.16.0/bin/npm\nBrowsers:\n  Chrome: "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("85.0")]),s._v(".4183.102\n  Edge: Not Found\n  Firefox: "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("57.0")]),s._v("\n  Safari: "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("13.1")]),s._v("\n")])])]),e("h2",{attrs:{id:"项目介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#项目介绍"}},[s._v("#")]),s._v(" 项目介绍")]),s._v(" "),e("h3",{attrs:{id:"技术栈"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#技术栈"}},[s._v("#")]),s._v(" 技术栈")]),s._v(" "),e("p",[s._v("核心技术栈：")]),s._v(" "),e("ul",[e("li",[s._v("vue@2.6.11")]),s._v(" "),e("li",[s._v("vue-router@3.1.6")]),s._v(" "),e("li",[s._v('vuex@3.1.3"')]),s._v(" "),e("li",[s._v("vue-i18n@8.17.5")]),s._v(" "),e("li",[s._v("typescript@3.8.3")]),s._v(" "),e("li",[s._v("axios@0.19.2")]),s._v(" "),e("li",[s._v("vue-class-component@7.2.3")]),s._v(" "),e("li",[s._v("vue-property-decorator@8.4.1")]),s._v(" "),e("li",[s._v("vuex-module-decorators@0.17.0")])]),s._v(" "),e("p",[s._v("其他：")]),s._v(" "),e("ul",[e("li",[s._v("core-js@3.6.5")]),s._v(" "),e("li",[s._v("@sentry\n"),e("ul",[e("li",[s._v("browser@5.15.5")]),s._v(" "),e("li",[s._v("integrations@5.15.5")])])]),s._v(" "),e("li",[s._v("@w6s\n"),e("ul",[e("li",[s._v("codash@1.1.2")]),s._v(" "),e("li",[s._v("cordova-import@1.3.2")])])])]),s._v(" "),e("blockquote",[e("p",[s._v("tips: 在 H5 sdk 出来后，codash 和 cordova-import 将会被取代。")])]),s._v(" "),e("p",[s._v("UI库")]),s._v(" "),e("ul",[e("li",[s._v("[admin] element-ui@2.9.2")]),s._v(" "),e("li",[s._v("[H5] vant@2.8.1")])]),s._v(" "),e("h3",{attrs:{id:"目录说明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#目录说明"}},[s._v("#")]),s._v(" 目录说明")]),s._v(" "),e("p",[s._v("以"),e("code",[s._v("H5")]),s._v("模版为例，当前项目文件结构如下：")]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n├── README.md\n├── babel.config.js            --- babel 配置文件\n├── commitlint.config.js       --- commitlint 配置文件\n├── mock                       --- 模拟 api，mock 服务\n│   └── index.js\n├── package.json\n├── public\n│   ├── favicon.ico\n│   └── index.html\n├── sentry.config.js           --- sentry 配置\n├── src\n│   ├── App.vue\n│   ├── api                    --- api 目录\n│   │   └── user.ts\n│   ├── assets                 --- 放置静态资源\n│   │   └── logo.png\n│   ├── components\n│   │   └── HelloWorld.vue\n│   ├── i18n.ts                --- 国际化配置入口\n│   ├── locales                --- 国际化文件存放位置\n│   │   └── zh-CN.json\n│   ├── main.ts\n│   ├── router                 --- 路由配置\n│   │   └── index.ts\n│   ├── shims-tsx.d.ts\n│   ├── shims-vue.d.ts\n│   ├── store                  --- vuex 配置\n│   │   ├── index.ts\n│   │   └── modules\n│   │       └── Counter.ts\n│   ├── styles\n│   │   └── index.scss\n│   ├── typings\n│   │   └── Common.ts\n│   ├── utils\n│   │   ├── cordova            --- cordova 相关，引入了 @w6s/codash\n│   │   │   └── index.ts\n│   │   ├── http               --- http 相关，封装了一些 api 请求方法\n│   │   │   └── https.ts\n│   │   └── sentry             --- sentry 模块的设置\n│   │       └── index.ts\n│   └── views                  --- 页面\n│       ├── About.vue\n│       └── Home.vue\n├── stylelint.config.js        --- stylelint 配置\n├── tsconfig.json              --- typescript 配置\n├── w6s.config.js              --- w6s-cli-script 配置（详情请看 w6s.config.js 栏目）\n├── .browserslistrc            --- babel 转换的目标浏览器版本配置文件\n├── .editorconfig              --- ide 的一些默认配置，例如缩进为2个空格\n├── .env                       --- 环境配置文件（生产配置）\n├── .env.development           --- 环境配置文件（开发配置）\n└── .eslintrc                  --- eslint 的配置文件\n")])])]),e("h3",{attrs:{id:"scripts-命令说明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#scripts-命令说明"}},[s._v("#")]),s._v(" scripts 命令说明")]),s._v(" "),e("p",[s._v("具体可用命令，请在项目的根目录查看"),e("code",[s._v("package.json")]),s._v("的"),e("code",[s._v("scripts")]),s._v("标签，以下做简单的作用描述：")]),s._v(" "),e("ul",[e("li",[e("code",[s._v("dev")]),s._v(" -- 启动服务，用于项目开发")]),s._v(" "),e("li",[e("code",[s._v("serve")]),s._v(" -- 同上")]),s._v(" "),e("li",[e("code",[s._v("build")]),s._v(" -- 对项目进行打包")]),s._v(" "),e("li",[e("code",[s._v("lint")]),s._v(" -- js 代码检测")]),s._v(" "),e("li",[e("code",[s._v("lint:style")]),s._v(" -- 样式检测")]),s._v(" "),e("li",[e("code",[s._v("i18n:report")]),s._v(" -- 检测 i18n 的配置是否有缺漏或者存在没被使用的属性")]),s._v(" "),e("li",[e("code",[s._v("inspect")]),s._v(" -- 打印出项目的 webpack 配置")]),s._v(" "),e("li",[e("code",[s._v("svg")]),s._v(" -- 通过"),e("code",[s._v("vue-svgicon")]),s._v("，把 svg 图标生成 vue 控件")])]),s._v(" "),e("h3",{attrs:{id:"w6s-cli-script"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#w6s-cli-script"}},[s._v("#")]),s._v(" w6s-cli-script")]),s._v(" "),e("p",[s._v("在上一步 scripts 命令里，例如"),e("code",[s._v("dev")]),s._v("命令，是通过"),e("code",[s._v("w6s-cli-script dev")]),s._v("执行的。"),e("code",[s._v("w6s-cli-script")]),s._v("实际是对"),e("code",[s._v("@vue/cli-service")]),s._v("的上层封装，除了原始的几个命令方法，包括"),e("code",[s._v("serve")]),s._v("、"),e("code",[s._v("build")]),s._v("、"),e("code",[s._v("inspect")]),s._v("及"),e("code",[s._v("lint")]),s._v("，"),e("code",[s._v("w6s-cli-script")]),s._v("还内置了"),e("code",[s._v("i18n:report")]),s._v("和"),e("code",[s._v("lint:style")]),s._v("，以及一系列的插件。也就是说，"),e("code",[s._v("@vue/cli-service")]),s._v("支持的，"),e("code",[s._v("w6s-cli-script")]),s._v("同样支持，例如，添加第三方的 vue-cli 插件。")]),s._v(" "),e("blockquote",[e("p",[s._v("不能通过 vue add plugin 的方式添加，因为某些插件会改变文件内容，例如在 vue.config.js 添加配置")])]),s._v(" "),e("h3",{attrs:{id:"w6s-config-js"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#w6s-config-js"}},[s._v("#")]),s._v(" w6s.config.js")]),s._v(" "),e("p",[s._v("为了让项目看起来更加专业（装逼），配置文件被命名为"),e("code",[s._v("w6s.config.js")]),s._v("，这个配置文件会被"),e("code",[s._v("w6s-cli-script")]),s._v("读取（如果存在的话）。项目创建后，"),e("code",[s._v("w6s.config.js")]),s._v("会有一些初始的配置，例如某些插件的初始化配置，同时，"),e("code",[s._v("w6s.config.js")]),s._v("的所有设置，实际跟"),e("code",[s._v("vue.config.js")]),s._v("是一致的，也就是说，相关的构建配置，可以直接查看 "),e("a",{attrs:{href:"https://cli.vuejs.org/config/#vue-config-js",target:"_blank",rel:"noopener noreferrer"}},[s._v("vue-cli"),e("OutboundLink")],1),s._v(" 官网。")]),s._v(" "),e("h2",{attrs:{id:"默认插件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#默认插件"}},[s._v("#")]),s._v(" 默认插件")]),s._v(" "),e("blockquote",[e("p",[s._v("所有配置文件，若无特殊原因，请勿随意修改")])]),s._v(" "),e("h3",{attrs:{id:"babel"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#babel"}},[s._v("#")]),s._v(" babel")]),s._v(" "),e("p",[s._v("bable 使用的是"),e("code",[s._v("@vue/cli-plugin-babel")]),s._v("，相关配置请查看"),e("code",[s._v("babel.config.js")]),s._v("。其中针对不同项目模板的 UI 库，默认支持按需引入。")]),s._v(" "),e("h3",{attrs:{id:"eslint"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#eslint"}},[s._v("#")]),s._v(" eslint")]),s._v(" "),e("p",[s._v("eslint 使用的是"),e("code",[s._v("@vue/cli-plugin-eslint")]),s._v("，相关配置请查看"),e("code",[s._v(".eslintrc.js")]),s._v("，当前使用的规范是"),e("code",[s._v("@w6s/eslint-config")]),s._v("。")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[s._v("module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  root"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@w6s'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  rules"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n")])])]),e("h3",{attrs:{id:"stylelint"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#stylelint"}},[s._v("#")]),s._v(" stylelint")]),s._v(" "),e("p",[s._v("stylelint 使用的是"),e("code",[s._v("@w6s/stylelint-plugin")]),s._v("，相关配置请查看"),e("code",[s._v("stylelint.config.js")]),s._v("，当前使用的规范是"),e("code",[s._v("@w6s/stylelint-config")]),s._v("。")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[s._v("module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"extends"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"@w6s/stylelint-config"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),e("h3",{attrs:{id:"typescript"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#typescript"}},[s._v("#")]),s._v(" typescript")]),s._v(" "),e("p",[s._v("相关配置请查看"),e("code",[s._v("tsconfig.json")]),s._v("。")]),s._v(" "),e("h3",{attrs:{id:"mock"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mock"}},[s._v("#")]),s._v(" mock")]),s._v(" "),e("p",[s._v("API mock 服务功能，是通过"),e("code",[s._v("@w6s/mock-plugin")]),s._v("实现的。依赖于 webpack 的 dev-server，通过 express 中间件的方式来达到模拟请求的效果，所有请求都可以在调试器的 network 一栏查看。插件的默认配置在"),e("code",[s._v("w6s.config.js")]),s._v("里，如果不需要，可以将"),e("code",[s._v("disable")]),s._v("设置为"),e("code",[s._v("true")]),s._v("。")]),s._v(" "),e("p",[s._v("API 的模拟，默认放置在"),e("code",[s._v("/mock/index.js")]),s._v("里，"),e("code",[s._v("@w6s/mock-plugin")]),s._v("会监听文件的变化，并自动重置所有请求配置。")]),s._v(" "),e("blockquote",[e("p",[s._v("模拟接口的配置文件，必须按 node.js 的模块规范来导出，暂不支持以 es 的模块导出。")])]),s._v(" "),e("h3",{attrs:{id:"vconsole"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vconsole"}},[s._v("#")]),s._v(" vConsole")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://github.com/Tencent/vConsole",target:"_blank",rel:"noopener noreferrer"}},[s._v("vConsole"),e("OutboundLink")],1),s._v(" 是腾讯开源的一个轻量、可拓展、针对手机网页的前端开发者调试面板。")]),s._v(" "),e("p",[s._v("通过"),e("code",[s._v("@w6s/vconsole-plugin")]),s._v("插件，会自动判断当前环境，只会在开发模式下，也就是"),e("code",[s._v("process.env.NODE_ENV === 'development'")]),s._v("时，自动为项目引入 vConsole，便于在移动设备调试。")]),s._v(" "),e("p",[s._v("当前该插件默认在 H5 项目模版启用。")]),s._v(" "),e("h3",{attrs:{id:"sentry"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#sentry"}},[s._v("#")]),s._v(" sentry")]),s._v(" "),e("p",[s._v("sentry 是一个实时的事件日志记录和聚合平台。当前我们也私有化部署了一套，可以通过"),e("a",{attrs:{href:"https://sentry.workplus.io/sentry/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://sentry.workplus.io/sentry/"),e("OutboundLink")],1),s._v("访问。")]),s._v(" "),e("p",[s._v("而该插件的功能由"),e("code",[s._v("@w6s/sentry-plugin")]),s._v("插件提供，主要是用于在项目打包后，上传前端资源文件，例如 js 的"),e("code",[s._v("sourcemap")]),s._v("文件。配置在"),e("code",[s._v("sentry.config.js")]),s._v("文件中，使用该插件前，需要在 sentry 上创建项目并获取"),e("code",[s._v("apiKey")]),s._v("。")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[s._v("module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Sentry options are required")]),s._v("\n  enable"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  project"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'your-project-name'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  apiKey"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sentry-auth-token'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),e("h3",{attrs:{id:"i18n"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#i18n"}},[s._v("#")]),s._v(" i18n")]),s._v(" "),e("p",[s._v("该插件使用的是一个叫"),e("a",{attrs:{href:"https://github.com/kazupon/vue-cli-plugin-i18n",target:"_blank",rel:"noopener noreferrer"}},[s._v("vue-cli-plugin-i18n"),e("OutboundLink")],1),s._v("的第三方 vue-cli 插件，该插件会注册一个名为"),e("code",[s._v("i18n:report")]),s._v("的"),e("code",[s._v("command")]),s._v("命令，该命令的主要作用就是检测当前的国际化配置中，哪些属性有遗漏或未被使用。有利于检测国际化配置的完整性，避免不必要的低级错误。")]),s._v(" "),e("p",[s._v("国际化文件，默认存放到"),e("code",[s._v("src/locales/")]),s._v("内，为保证统一性，请勿随意修改目录。")]),s._v(" "),e("h3",{attrs:{id:"style-resources-loader"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#style-resources-loader"}},[s._v("#")]),s._v(" style-resources-loader")]),s._v(" "),e("p",[s._v("该插件是通过"),e("code",[s._v("@w6s/style-resources-loader-plugin")]),s._v("实现。主要是依赖了"),e("a",{attrs:{href:"https://github.com/yenshih/style-resources-loader",target:"_blank",rel:"noopener noreferrer"}},[s._v("style-resources-loader"),e("OutboundLink")],1),s._v("模块。")]),s._v(" "),e("p",[s._v("该 loader 主要用于：")]),s._v(" "),e("ul",[e("li",[s._v("在所有样式文件中共享变量，mixin，函数，因此您无需手动 @import 它们；")]),s._v(" "),e("li",[s._v("覆盖其他库提供的样式文件中的变量（例如 element-ui），并自定义您自己的主题。")])]),s._v(" "),e("h2",{attrs:{id:"项目规范"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#项目规范"}},[s._v("#")]),s._v(" 项目规范")]),s._v(" "),e("h3",{attrs:{id:"eslint-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#eslint-2"}},[s._v("#")]),s._v(" eslint")]),s._v(" "),e("p",[s._v("具体规范配置，可查看"),e("a",{attrs:{href:"https://github.com/WorkPlusFE/eslint-config/blob/master/index.js",target:"_blank",rel:"noopener noreferrer"}},[s._v("@w6s/eslint-config"),e("OutboundLink")],1),s._v("。")]),s._v(" "),e("p",[s._v("主要规范包括：")]),s._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/vuejs/eslint-config-airbnb/blob/master/index.js",target:"_blank",rel:"noopener noreferrer"}},[s._v("@vue/eslint-config-airbnb"),e("OutboundLink")],1)]),s._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/eslint-config-typescript/blob/master/recommended.js",target:"_blank",rel:"noopener noreferrer"}},[s._v("@vue/eslint-config-typescript/recommended"),e("OutboundLink")],1)])]),s._v(" "),e("p",[s._v("关于 Airbnb 的 JavaScript 规范，可以查看"),e("a",{attrs:{href:"https://github.com/airbnb/javascript#airbnb-javascript-style-guide-",target:"_blank",rel:"noopener noreferrer"}},[s._v("这里"),e("OutboundLink")],1),s._v("。")]),s._v(" "),e("h3",{attrs:{id:"stylelint-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#stylelint-2"}},[s._v("#")]),s._v(" stylelint")]),s._v(" "),e("p",[s._v("具体规范配置，可查看"),e("a",{attrs:{href:"https://github.com/WorkPlusFE/stylelint-config/blob/master/index.js",target:"_blank",rel:"noopener noreferrer"}},[s._v("@w6s/stylelint-config"),e("OutboundLink")],1)]),s._v(" "),e("p",[s._v("主要规范包括：")]),s._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/airbnb/css#airbnb-css--sass-styleguide",target:"_blank",rel:"noopener noreferrer"}},[s._v("stylelint-config-airbnb"),e("OutboundLink")],1)]),s._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/constverum/stylelint-config-rational-order#stylelint-config-rational-order",target:"_blank",rel:"noopener noreferrer"}},[s._v("stylelint-config-rational-order"),e("OutboundLink")],1)])]),s._v(" "),e("h3",{attrs:{id:"commitlint"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#commitlint"}},[s._v("#")]),s._v(" commitlint")]),s._v(" "),e("p",[s._v("借助 "),e("a",{attrs:{href:"https://github.com/typicode/husky",target:"_blank",rel:"noopener noreferrer"}},[s._v("husky"),e("OutboundLink")],1),s._v("，我们可以在 git hook 中定义事件，用于进行多种检测。实际在每次代码提交到仓库前，都会执行 js 及样式的规范检测及自动修复。")]),s._v(" "),e("p",[s._v("除此之外，为了更好地管理项目的提交记录，我们还会检测提交代码时输入的"),e("code",[s._v("commit message")]),s._v("，使用的是"),e("a",{attrs:{href:"https://github.com/conventional-changelog/commitlint",target:"_blank",rel:"noopener noreferrer"}},[s._v('@commitlint/config-conventional"'),e("OutboundLink")],1),s._v("规范。")]),s._v(" "),e("p",[s._v("基本写法：")]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("type"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("scope?"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(": subject  "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#scope is optional")]),s._v("\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);