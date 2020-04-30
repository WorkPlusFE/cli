const fs = require('fs');

/* eslint import/no-dynamic-require:0  global-require:0 */
exports.toPlugin = id => ({ id, apply: require(id) });
exports.w6sConfigFileExists = configPath => fs.existsSync(configPath);
