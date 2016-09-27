const exec = require('child_process').execSync;

module.exports = function () {
  let name, email;

  try {
    name = exec('git config --get user.name')
    email = exec('git config --get user.email')
  } catch (e) {}

  name = name && name.toString().trim()
  email = email && (' <' + email.toString().trim() + '>')
  return (name || '') + (email || '')
}
