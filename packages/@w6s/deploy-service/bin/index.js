#!/usr/bin/env node

const program = require("commander");
const Deploy = require("../lib/deploy");
const packageInfo = require("../package.json");

const deploy = new Deploy();

program.version(packageInfo.version);

program
  .command("init")
  .description("初始化配置文件")
  .action(() => {
    deploy.initConfigFile();
  });

program
  .command("deploy")
  .option("--mode <mode>", "mode为部署环境名字")
  .description("执行部署操作")
  .action(option => deploy.start(option.mode));

program.parse(program.argv);
