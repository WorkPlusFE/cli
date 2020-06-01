const { checkNodeVersion } = require('./lib/checkNodeVersion');
const { hasYarn, isWindows, isLinux, isMac } = require('./lib/env');
const logger = require('./lib/logger');
const { resolvePkg, isPlugin } = require('./lib/pkg');

module.exports = {
  checkNodeVersion,
  hasYarn,
  isWindows,
  isLinux,
  isMac,
  logger,
  resolvePkg,
  isPlugin,
};