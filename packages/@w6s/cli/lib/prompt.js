const inquirer = require('inquirer');

function consolePrompt(message, choices) {
  const question = {
    message,
    choices,
    type: 'list',
    name: 'answer',
  };
  return inquirer
    .prompt([ question ])
    .then(({ answer }) => answer);
};

module.exports = consolePrompt;
