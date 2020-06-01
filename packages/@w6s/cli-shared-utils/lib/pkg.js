const fs = require('fs');
const path = require('path');
const readPkg = require('read-pkg');

const pluginRE = /^(@vue\/|vue-|@[\w-]+(\.)?[\w-]+\/vue-)cli-plugin-/;

exports.resolvePkg = function (context) {
  if (fs.existsSync(path.join(context, 'package.json'))) {
    return readPkg.sync({ cwd: context });
  }
  return {};
};

exports.isPlugin = id => pluginRE.test(id);
