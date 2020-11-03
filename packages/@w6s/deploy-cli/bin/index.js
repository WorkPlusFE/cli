#!/usr/bin/env node

const program = require("commander");
const { deploy } = require("../lib/index.js");

program
  .command("init")
  .description("init deploy config file.")
  .action(() => {
    console.log("init");
  });

program
  .command("dev")
  .description("deploy for dev.")
  .action(() => {
    deploy("dev");
  });

program
  .command("test")
  .description("deploy for test.")
  .action(() => {
    deploy("test");
  });

program.parse(process.argv);
