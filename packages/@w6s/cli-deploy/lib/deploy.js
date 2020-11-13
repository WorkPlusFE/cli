/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require("fs");
const execa = require("execa");
const { NodeSSH } = require("node-ssh");
const inquirer = require("inquirer");
const ora = require("ora");
const { successLog, errorLog } = require("./log");
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
    return fs.existsSync(this.configPath);
  }

  // 初始化配置文件
  initConfigFile() {
    if (this.checkConfigFile()) {
      errorLog(`deploy.config.js 配置文件已存在.`);
      process.exit(1);
    }
    fs.writeFileSync(this.configPath, this.templateConfig);
    successLog(`初始化deploy.config.js配置文件成功.`);
  }

  // 检查要部署的环境的配置参数
  checkEnvConfig(env) {
    this.config = require(this.configPath);
    const currentEnv = this.config[env];
    if (!currentEnv) {
      errorLog(`未能找到部署环境 ${env} 的配置信息，请检查配置文件.`);
      process.exit(1);
    }
    const keys = Object.keys(currentEnv);
    keys.forEach((key) => {
      if (key === "password") return;
      if (!currentEnv[key]) {
        errorLog(`${key} 配置不正确.`);
        process.exit(1);
      }
    });
  }

  // 判断配置项的优先级
  getSelectiveSetup(env, setup) {
    const commonSetup = this.config[setup];
    const envSetup = this.config[env][setup];
    if (!commonSetup && !envSetup) {
      errorLog(`${setup}配置不正确.`);
      process.exit(1);
    }
    return envSetup || commonSetup;
  }

  // 打包项目
  async buildSource(env) {
    try {
      const buildCommand = this.getSelectiveSetup(env, "buildCommand");
      const spinner = ora("正在打包项目...").start();
      await execa.command(buildCommand);
      spinner.stop();
      successLog(`打包完成.`);
    } catch (error) {
      errorLog(error.message);
      process.exit(1);
    }
  }

  // 上传打包的项目
  async uploadDirectory(env) {
    try {
      const ssh = new NodeSSH();
      const privateKey = this.getSelectiveSetup(env, "privateKey");
      const passphrase = this.getSelectiveSetup(env, "passphrase");
      const distPath = this.getSelectiveSetup(env, "distPath");
      const { host, port, username, uploadPath } = this.config[env];
      let { password } = this.config[env];

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

      let spinner = ora(`正在连接远程服务器${host}...\n`).start();

      await ssh.connect({
        privateKey,
        passphrase,
        host,
        port,
        username,
        password,
      });
      spinner.stop();
      successLog("连接成功.");

      const options = {
        recursive: true,
        concurrency: 10,
        tick(localPath, remotePath, error) {
          if (error) {
            errorLog(`上传 ${localPath} 失败.`);
            process.exit(1);
          } else {
            spinner.text = `正在上传文件：${localPath}`;
          }
        },
      };

      spinner = ora("正在上传文件...").start();
      await ssh.putDirectory(`${this.cwd}/${distPath}/`, uploadPath, options);
      spinner.stop();
      successLog("部署完成.");
      ssh.dispose();
    } catch (error) {
      errorLog(error.message);
      process.exit(1);
    }
  }

  // 走你
  async start(env) {
    if (!this.checkConfigFile()) {
      errorLog("未找到配置文件deploy.config.js.");
      process.exit(1);
    }
    this.checkEnvConfig(env);
    await this.buildSource(env);
    await this.uploadDirectory(env);
  }
}

module.exports = Deploy;
