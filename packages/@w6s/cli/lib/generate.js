const async = require('async');
const Metalsmith = require('metalsmith');
const inquirer = require('inquirer');
const { render } = require('consolidate').underscore;
const path = require('path');
const metadata = require('read-metadata');
const exists = require('fs').existsSync;
const validateName = require('validate-npm-package-name');

const gituser = require('./git-user');

/**
 * Prompt plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */
const ask = (opts) => (files, metalsmith, done) => {
  const questions = [{
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: opts.name,
    validate(name){
      const its = validateName(name)
      if (!its.validForNewPackages) {
        const errors = (its.errors || []).concat(its.warnings || [])
        return `Sorry, ${  errors.join(' and ')  }.`
      }
      return true
    }
  },{
    type: 'input',
    name: 'description',
    message: 'Project description',
    default: opts.description
  },{
    type: 'input',
    name: 'author',
    message: 'Author',
    default: gituser
  }];
  const metadata = metalsmith.metadata();

  inquirer.prompt(questions)
    .then((answers) => {
      questions.forEach((item)=>{
        metadata[item.name] = answers[item.name];
      })
      done();
    });
};

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */
function template(files, metalsmith, done){
  const keys = Object.keys(files);
  const metadata = metalsmith.metadata();

  function run(file, done){
    const currentFile = files[file];
    const str = currentFile.contents.toString();

    // do not attempt to render files that do not have mustaches
    if (!/<%=([^]+)%>/g.test(str)) {
      /* eslint consistent-return: 0 */
      return done();
    }
    render(str, metadata, (err, res) => {
      if (err) {
        done(err);
      } else {
        /* eslint no-buffer-constructor: 0 */
        currentFile.contents = Buffer.from(res);
        done();
      }
    });
  }

  async.each(keys, run, done);
}

/**
 * Build.
 */
const generate = (name, src, dest) => new Promise((resolve, reject) => {
  const templateSrc = path.join(src, 'template');
  const json = path.join(src, 'template.json');
  let opts = {};
  if (exists(json)) {
    opts = metadata.sync(json);
  }
  // w6s init 
  if (!opts.name) {
    opts.name = name;
  }

  Metalsmith(templateSrc)
    .use(ask(opts))
    .use(template)
    .clean(false)
    .source('.') // current directory
    .destination(dest)
    .build((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('');
        console.log('  #Generate successful \n'.gray);
        resolve(opts);
      }
    });
});

module.exports = generate;
