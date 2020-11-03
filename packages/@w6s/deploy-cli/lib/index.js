const fs = require("fs");
const { NodeSSH } = require("node-ssh");
const ora = require("ora");
const chalk = require("chalk");
const inquirer = require("inquirer");

const projectPath = process.cwd();
const configFilePath = `${projectPath}/deploy.config.js`;

function checkConfigFile() {
  return fs.existsSync(configFilePath) ? true : false;
}

async function putDirectory(envName) {
  const ssh = new NodeSSH();
  const config = require(configFilePath);
  const { privateKey, passphrase } = config;
  let { host, port, username, password, putPath } = config[envName];
  const failed = [];
  const successful = [];

  try {
    if (!password) {
      const res = await inquirer.prompt([
        { type: "password", message: "Enter your password:", name: "password" },
      ]);
      password = res.password;
    }

    let spinner = ora(`正在连接远程服务器 ${host}...`).start();
    await ssh.connect({
      privateKey,
      passphrase,
      host,
      port,
      username,
      password,
    });
    spinner.stop();

    spinner = ora("连接成功！正在上传文件...").start();
    const status = await ssh.putDirectory(`${projectPath}/dist/`, putPath, {
      recursive: true,
      concurrency: 10,
      tick: function (localPath, remotePath, error) {
        if (error) {
          failed.push(localPath);
        } else {
          spinner.text = "正在上传文件：" + localPath;
          successful.push(localPath);
        }
      },
    });
    spinner.stop();
    ssh.dispose();
    status
      ? console.log(chalk.green("上传完成！"))
      : console.log(chalk.red("上传文件失败！"));
  } catch (err) {
    console.log(chalk.red(err.message));
    process.exit(1);
  }
}

function deploy(envName) {
  const exitConfigFile = checkConfigFile();
  if (exitConfigFile) {
    checkConfigFile();
    putDirectory(envName);
  } else {
    console.log(chalk.red("配置文件deploy.config.js不存在！"));
    process.exit(1);
  }
}

module.exports = {
  deploy,
};
