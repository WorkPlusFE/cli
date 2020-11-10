const ora = require("ora");
const chalk = require("chalk");

function successLog(message) {
  ora().succeed(chalk.greenBright.bold(message));
}

function errorLog(message) {
  ora().fail(chalk.redBright.bold(message));
}

module.exports = {
  successLog,
  errorLog
};
