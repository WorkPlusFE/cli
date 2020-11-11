# 项目发布

部署是项目开发几乎必不可少的一环，为了简化部署项目的操作以此提高开发的效率，w6s 手脚架根据常见的部署场景集成自动化部署的功能，仅需稍作配置即可通过一“键”部署。

## 如何使用

### 安装

```bash
yarn global add @w6s/cli-deploy
# or
npm install -g @w6s/cli-deploy
```

### 初始化部署配置文件

```bash
w6s-cli-deploy init
```

执行初始化命令后会在根目录生成一个 deploy.config.js 配置文件，具体配置内容和说明如下：

```js
module.exports = {
  // 本地私钥地址，非必填
  privateKey: "",
  // 私钥的密码，非必填
  passphrase: "",
  // 打包命令
  buildCommand: "npm run build",
  // 打包出来的目录名
  distPath: "dist",

  // 环境配置相关信息，以下是配置的开发环境的示例例子
  dev: {
    // 服务器地址，如192.168.0.1
    host: "192.168.0.1",
    // ssh的端口，一般默认22
    port: "22",
    // 用户名，如root
    username: "root",
    // 服务器密码，非必填，执行部署命令可以手动输入以确保信息安全
    password: "",
    // 要部署到服务器的路径
    uploadPath: "/home/workplus",
  },
};
```

### 多环境支持

```js
module.exports = {
  privateKey: "",
  passphrase: "",
  buildCommand: "npm run build",
  distPath: "dist",

  dev: {
    //...
  }
  // 新增一个部署环境，名为test
  test: {
    host: "192.168.0.1",
    port: "22",
    username: "root",
    password: "",
    uploadPath: "/home/workplus",
  },
};
```

### 定制化支持

```js
module.exports = {
  privateKey: "",
  passphrase: "",
  buildCommand: "npm run build",
  distPath: "dist",
  // 定制化部署环境custom
  custom: {
    host: "192.168.0.1",
    port: "22",
    username: "root",
    password: "",
    uploadPath: "/home/workplus",
    // 以下四个配置项在环境内声明时都会覆盖外层同名配置
    privateKey: "",
    passphrase: "",
    buildCommand: "npm run build",
    distPath: "dist",
  },
};
```

### 执行自动化部署

```sh
w6s-cli-deploy deploy <部署环境的名字>
```
