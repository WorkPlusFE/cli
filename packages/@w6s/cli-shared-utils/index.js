const { checkNodeVersion } = require('./lib/checkNodeVersion');
const { hasYarn, isWindows, isLinux, isMac } = require('./lib/env');
const logger = require('./lib/logger');

module.exports = {
  checkNodeVersion,
  hasYarn,
  isWindows,
  isLinux,
  isMac,
  logger,
};