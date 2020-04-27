require('colors');

const download = require('download-git-repo');
const ora = require('ora');
const exists = require('fs').existsSync;
const uid = require('uid');
const inquirer = require('inquirer');
const remove = require('rimraf').sync;

const generate = require('./generate.js');

function run (name, template, destination) {
  if (exists(template)) {
    console.log('\n  #Begin generate project \n'.gray);
    generate(name, template, destination, (err) => {
      if (err) console.log(err);
      console.log('');
    });
  } else {
    const spinner = ora(`Downloading ${template}`);

    const tmp = `/tmp/template${uid()}`; // unique backup
    spinner.start();
    download(`workplus-templates/${template}`, tmp, (err) => {
      if (err) {
        throw new Error(err);
      }
      spinner.text = `Download ${template} successful`;
      spinner.succeed();
      console.log('\n  #Begin generate project \n'.gray);
      process.on('exit', () => {
        remove(tmp); // remove backup files
      });

      generate(name, tmp, destination, (err) => {
        if (err) console.log(err);
        console.log('');
      });
    });
  }  
};

function clone (name, template, destination, inPlace) {
  if (exists(destination)) {
    inquirer.prompt([{
      type: 'confirm',
      message: inPlace
        ? 'Generate project in current directory?'
        : 'Target directory exists. Continue?',
      name: 'ok'
    }]).then((answers) => {
      if (answers.ok) {
        console.log('');
        run(name, template, destination);
      }
    });
  } else {
    run(name, template, destination);
  }
};

module.exports = clone;