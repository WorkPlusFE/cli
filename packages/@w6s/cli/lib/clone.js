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
    console.log('\n  # 开始创建项目，请正确填写各项内容 \n'.gray);
    return generate(name, template, destination);
  }
  console.log('');
  const spinner = ora(`获取 "${template}" 项目模版...`);

  const tmp = `/tmp/template${uid()}`; // unique backup
  spinner.start();

  return handleDownloadGitRepo(`workplus-templates/${template}`, tmp)
    .then(() => {
      spinner.text = `下载 "${template}" 成功`;
      spinner.succeed();
      console.log('\n  # 开始创建项目 \n'.gray);
      process.on('exit', () => {
        remove(tmp); // remove backup files
      });
    })
    .then(() => generate(name, tmp, destination));

};

const clone = (name, template, destination) => run(name, template, destination);

module.exports = clone;