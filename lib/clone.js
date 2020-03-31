const download = require('download-git-repo');
const ora = require('ora');
const exists = require('fs').existsSync;
const colors = require('colors');
const uid = require('uid');
const generate = require('./generate.js');
const inquirer = require('inquirer');
const remove = require('rimraf').sync;

function run (name, template, destination) {
  if (exists(template)) {
    console.log('\n  #Begin generate project \n'.gray);
    generate(name, template, destination, (err) => {
      if (err) console.log(err);
      console.log('');
    });
  } else {
    const spinner = ora(`Downloading ${template}`);

    let tmp = '/tmp/template' + uid(); // unique backup
    spinner.start();
    download(`workplus-templates/${template}`, tmp, (err) => {
      if (err) return console.log(err);
      spinner.text = `Download ${template} successful`;
      spinner.succeed();
      console.log('\n  #Begin generate project \n'.gray);
      process.on('exit', () => {
        remove(tmp); //remove backup files
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
    }]).then(function(answers) {
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