const async = require('async');
const Metalsmith = require('metalsmith');
const inquirer = require('inquirer');
const gituser = require('./git-user.js');
const render = require('consolidate').handlebars.render;

/**
 * Build.
 */
module.exports = function generate (src, dest, done) {
  var metalsmith = Metalsmith(src)
    .use(ask)
    .use(template)
    .clean(false)
    .source('.') // current directory
    .destination(dest)
    .build(function(err){
      if (err) return done(err);
      done();
    });
};

/**
 * Prompt plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function ask(files, metalsmith, done){
  let questions = [{
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: 'workplus project'
  },{
    type: 'input',
    name: 'description',
    message: 'Project description',
    default: 'A workplus project.'
  },{
    type: 'input',
    name: 'author',
    message: 'Author',
    default: gituser
  }];
  let metadata = metalsmith.metadata();

  inquirer.prompt(questions, (answers) => {
    questions.forEach((item)=>{
      metadata[item.name] = answers[item.name];
    })
    done();
  });
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function template(files, metalsmith, done){
  var keys = Object.keys(files);
  var metadata = metalsmith.metadata();

  async.each(keys, run, done);

  function run(file, done){
    var str = files[file].contents.toString();
    render(str, metadata, function(err, res){
      if (err) return done(err);
      files[file].contents = new Buffer(res);
      done();
    });
  }
}
