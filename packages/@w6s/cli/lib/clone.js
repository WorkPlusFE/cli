require('colors');

const download = require('download-git-repo');
const ora = require('ora');
const exists = require('fs').existsSync;
const uid = require('uid');
const inquirer = require('inquirer');
const remove = require('rimraf').sync;
const { logger } = require('@w6s/cli-shared-utils');

const generate = require('./generate.js');

const handleDownloadGitRepo = (source, dest) => new Promise((resolve) => {
  download(source, dest, (err) => {
    if (err) {
      throw new Error(err);
    }
    resolve();
  });
});

function run(name, template, destination) {
  if (exists(template)) {
    console.log('\n  #Begin generate project \n'.gray);
    return generate(name, template, destination);
  }
  console.log('');
  const spinner = ora(`Downloading "${template}" template...`);

  const tmp = `/tmp/template${uid()}`; // unique backup
  spinner.start();

  return handleDownloadGitRepo(`workplus-templates/${template}`, tmp)
    .then(() => {
      spinner.text = `Download "${template}" successful`;
      spinner.succeed();
      console.log('\n  #Begin generate project \n'.gray);
      process.on('exit', () => {
        remove(tmp); // remove backup files
      });
    })
    .then(() => generate(name, tmp, destination));

};

const clone = (name, template, destination, inPlace, isW6sClone) => {
  if (exists(destination)) {
    if (!isW6sClone) {
      console.log('');
    }
    logger.warn(`Project directory: ${destination}\n`);
    return inquirer.prompt([{
      type: 'confirm',
      message: inPlace
        ? 'Generate project in current directory?'
        : 'Target directory exists. Continue?',
      name: 'ok'
    }]).then((answers) => {
      if (answers.ok) {
        return run(name, template, destination);
      }
      return process.exit(1);
    });
  }
  return run(name, template, destination);
};

module.exports = clone;