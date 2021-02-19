const latestVersion = require('latest-version');

async function getCliScriptLastVersion() {
  const version = await latestVersion('@w6s/cli-script');
  return version;
};

async function getJsSdkLastVersion() {
  const version = await latestVersion('@w6s/sdk');
  return version;
};

module.exports = {
  getCliScriptLastVersion,
  getJsSdkLastVersion,
};
