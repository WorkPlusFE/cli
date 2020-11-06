#!/usr/bin/env node

// const program = require("commander");
const Deploy = require("../lib/deploy");
const deploy = new Deploy();

// program
//   .command("init")
//   .description("init deploy config file.")
//   .action(() => {
//     console.log("init");
//   });

// program.parse(process.argv);

deploy.start("dev");
