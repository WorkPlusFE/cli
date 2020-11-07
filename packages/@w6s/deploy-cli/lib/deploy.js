/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require("fs");
const execa = require("execa");
const { NodeSSH } = require("node-ssh");
const inquirer = require("inquirer");
const templateConfig = require("../template/deploy.config");

class Deploy {
  constructor() {
    // 当前进程的工作目录
    this.cwd = process.cwd();
    // 配置文件路径
    this.configPath = `${this.cwd}/deploy.config.js`;
    // 配置文件的配置参数
    this.config = null;
    // 配置文件模板
    this.templateConfig = templateConfig;
  }

  // 检查是否存在配置文件
  checkConfigFile() {
    if (fs.existsSync(this.configPath)) {
      return true;
    }
    return false;
  }

  // 初始化配置文件
  initConfigFile() {
    if (this.checkConfigFile()) {
      console.log(`已存在配置文件，无需重复生成...`);
      process.exit(1);
    }
    fs.writeFileSync(this.configPath, this.templateConfig);
    console.log(`已生成deploy.config.js配置文件...`);
  }

  // 检查要部署的环境的配置参数
  checkModeConfig(mode) {
    this.config = require(this.configPath);
    const currentMode = this.config[mode];
    if (!currentMode) {
      console.log("当前部署环境名字未配置...");
      process.exit(1);
    }
    const keys = Object.keys(currentMode);
    keys.forEach(key => {
      if (key === "password") return;
      if (!currentMode[key]) {
        console.log(`${key} 配置不正确...`);
        process.exit(1);
      }
    });
  }

  // 打包项目
  async buildSource(mode) {
    try {
      console.log("开始打包....");
      await execa.command(this.config[mode].buildCommand);
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
      const { privateKey, passphrase } = this.config;
      const { host, port, username, distPath, uploadPath } = this.config[mode];
      let { password } = this.config[mode];

      if (!password) {
        const res = await inquirer.prompt([
          {
            type: "password",
            message: "请输入服务器密码:",
            name: "password"
          }
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
        password
      });

      console.log("连接成功，正在上传文件...");

      const options = {
        recursive: true,
        concurrency: 10,
        tick(localPath, remotePath, error) {
          if (error) {
            console.log(`上传 ${localPath} 失败.`);
            process.exit(1);
          } else {
            console.log(`正在上传文件：${localPath}`);
          }
        }
      };

      await ssh.putDirectory(`${this.cwd}/${distPath}/`, uploadPath, options);
      console.log("上传完成！");
      ssh.dispose();
    } catch (error) {
      console.log("未能连接上服务器...");
      process.exit(1);
    }
  }

  // 走你
  async start(mode) {
    if (!this.checkConfigFile()) {
      console.log("未找到配置文件deploy.config.js...");
      process.exit(1);
    }
    this.checkModeConfig(mode);
    await this.buildSource(mode);
    await this.uploadDirectory(mode);
  }
}

module.exports = Deploy;
