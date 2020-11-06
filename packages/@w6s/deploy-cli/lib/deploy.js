const fs = require("fs");
const execa = require("execa");
const { NodeSSH } = require("node-ssh");
const inquirer = require("inquirer");

class Deploy {
  constructor() {
    // 当前进程的工作目录
    this.cwd = process.cwd();
    // 配置文件的配置参数
    this.config = null;
  }

  // 检查是否存在配置文件
  checkConfigFile() {
    const configFile = `${this.cwd}/deploy.config.js`;
    if (!fs.existsSync(configFile)) {
      console.log("配置文件不存在，请使用deploy-cli init 初始化配置文件...");
      process.exit(1);
    }
    this.config = require(configFile);
  }

  // 检查要部署的环境的配置参数
  checkModeConfig(mode) {
    const currentMode = this.config[mode];
    if (!currentMode) {
      console.log("当前部署环境名字未配置...");
      process.exit(1);
    }
    const keys = Object.keys(currentMode);
    keys.forEach((key) => {
      if (key === "password") return;
      if (!currentMode[key]) {
        console.log(`${key} 配置不正确...`);
      }
    });
  }

  // 打包项目
  async buildSource(script) {
    try {
      console.log("开始打包....");
      await execa.command(script);
      console.log("打包完成...");
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  }

  // 上传打包的项目
  async uploadDirectory(mode) {
    try {
      const ssh = new NodeSSH();
      const failed = [];
      const successful = [];
      const { privateKey, passphrase } = this.config;
      let {
        host,
        port,
        username,
        password,
        distPath,
        uploadPath,
      } = this.config[mode];

      if (!password) {
        const res = await inquirer.prompt([
          {
            type: "password",
            message: "请输入服务器密码:",
            name: "password",
          },
        ]);
        password = res.password;
      }

      console.log("正在连接远程服务器...");

      await ssh.connect({
        privateKey,
        passphrase,
        host,
        port,
        username,
        password,
      });

      console.log("连接成功，正在上传文件...");

      const options = {
        tick: function (localPath, remotePath, error) {
          if (error) {
            failed.push(localPath);
          } else {
            console.log(`正在上传文件：${localPath}`);
            successful.push(localPath);
          }
        },
      };

      const status = await ssh.putDirectory(
        `${this.cwd}/${distPath}/`,
        uploadPath,
        options
      );

      status ? console.log("上传完成！") : console.log("上传文件失败！");
      ssh.dispose();
    } catch (error) {
      console.log("未能连接上服务器...");
      process.exit(1);
    }
  }

  // Go
  async start(mode) {
    this.checkConfigFile();
    this.checkModeConfig(mode);
    await this.buildSource(this.config[mode].buildCommand);
    await this.uploadDirectory(mode);
  }
}

module.exports = Deploy;
