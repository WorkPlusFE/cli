const templateConfig = `module.exports = {
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
}`;

module.exports = templateConfig;
