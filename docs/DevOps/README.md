# cli-deploy

项目发布是项目开发过程中，必不可少的一环。为了简化前端项目资源的部署步骤，避免繁琐的 shell 脚本编写及人为操作，`w6s-cli`根据常见的部署场景，提供了自动化部署的功能，支持开发、测试、生产多环境配置，一键即可自动完成部署。

[仓库地址](https://github.com/WorkPlusFE/cli/tree/master/packages/%40w6s/cli-deploy)

## 如何使用

要使用发布功能，可以单独安装`@w6s/cli-deploy`，或者使用`w6s-cli`提供的`deploy`命令。

### 安装

安装`@w6s/cli-deploy`：

```bash
yarn global add @w6s/cli-deploy
# or
npm install -g @w6s/cli-deploy
```

### 初始化配置文件

安装成功后，执行以下命令:

```bash
w6s-cli-deploy init
```

执行初始化命令后，会在当前目录生成`deploy.config.js`配置文件，具体配置内容和说明如下：

```js
module.exports = {
  envConfig: {
    // 名为 dev 的环境配置
    dev: {
      host: "192.168.0.1",
      port: 22,
      username: "root",
      password: "123456",
      distPath: "dist",
      uploadPath: "/home/workplus",
      privateKey: "",
      passphrase: "",
      preCommand: "npm run build",
    },
  },
};
```

所有的环境配置，都应添加到`envConfig`中，你可以根据实际情况，添加多个不同的环境配置。

以下为一个环境中可配置的所有字段的说明：

- `host`

服务器地址，如 192.168.0.1

- `port`

ssh 的端口，一般默认 22

- `username`

用户名，如 root

- `password`

服务器密码，非必须，执行部署命令可以手动输入以确保信息安全

- `uploadPath`

要部署到服务器的目录路径，应为绝对路径

- `privateKey`

本地私钥地址，应为绝对路径，非必填；若有值，将会带密钥的方式进行 ssh 链接，否则使用账号密码的方式

- `passphrase`

对应私钥的密码，非必须，可为空

- `preCommand`

发布前需执行的命令，非必须

- `distPath`

本地待上传的文件目录

### 自动化部署

`@w6s/cli-deploy`支持多环境发布，使用`deploy`命令，传入 env 环境名字，一键自动发布。

```sh
w6s-cli-deploy deploy --env <环境名称>
```
