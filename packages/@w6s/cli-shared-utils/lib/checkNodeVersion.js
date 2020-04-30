const semver = require('semver');
const logger = require('./logger');

function checkNodeVersion (wanted) {
  if (!semver.satisfies(process.version, wanted)) {
    logger.error(
      `You are using Node ${process.version}, but @w6s/cli-script ` +
      `requires Node ${wanted}.\nPlease upgrade your Node version.`
    )
    process.exit(1)
  }
}

module.exports = {
  checkNodeVersion,
};
