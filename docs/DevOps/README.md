# w6s-cli

<a href="https://www.npmjs.com/package/@w6s/cli"><img alt="npm" src="https://img.shields.io/npm/v/@w6s/cli.svg?style=flat-square"></a> 

`@w6s/cli`是团队内部指定使用的 cli 工具，除了用于快速创建项目初始架构，还包含一些常用的功能，例如启动静态文件服务、设置配置等。

## 安装

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

安装成功后，在 shell 中键入`w6s`，即可看到相关功能说明，如下：


```bash
Usage: w6s <command> [options]

Options:
  -V, --version    output the version number
  -h, --help       display help for command

Commands:
  init <app-name>  create a new project
  serve            http-server like, start a local static server
  deploy           push static resources to the server
  qrcode           draw QRcode in terminal window
  mirror           set NPM mirrors to Taobao sources, such as electron, node-sass
  env              print debugging information about your environment
  help [command]   display help for command
```

## 文件静态服务

用于启动一个静态文件服务，常用于应用打包后的本地调试。

详细使用方法，可通过输入`w6s serve --help`进行查看。

## 资源发布

w6s-cli 集成了`@w6s/cli-deploy`的功能，详细说明文档，请查看[cli-deploy](/DevOps/deploy.html)。

## 设置包管理器 mirror

wip.

## 生成二维码

用于生成二维码，例如一个应用的访问地址，通过输入`ws6 qrcode <app-url>`，即可在 shell 上生成二维码，方便手机扫码调试。

详细使用方法，可通过输入`w6s qrcode --help`进行查看。

## 显示环境配置

输出当前设备的一些软件或工具的版本信息，例如：

```bash
Environment Info:

System:
  OS: macOS 10.15.4
  CPU: (4) x64 Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz
Binaries:
  Node: 10.16.0 - ~/.nvm/versions/node/v10.16.0/bin/node
  Yarn: 1.22.4 - ~/.nvm/versions/node/v10.16.0/bin/yarn
  npm: 6.9.0 - ~/.nvm/versions/node/v10.16.0/bin/npm
Browsers:
  Chrome: 85.0.4183.102
  Edge: Not Found
  Firefox: 57.0
  Safari: 13.1
```
