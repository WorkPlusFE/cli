const exec = require('child_process').execSync;

module.exports = function gitUser() {
  let name; let email;

  try {
    name = exec('git config --get user.name')
    email = exec('git config --get user.email')
  } catch (err) {
    console.log(err);
  }

  name = name && name.toString().trim()
  email = email && (` <${  email.toString().trim()  }>`)
  return (name || '') + (email || '')
};
