const path = require('path');
const chokidar = require('chokidar');
const { logger } = require('@w6s/cli-shared-utils');

const rootPath = path.join(__dirname, '..');

module.exports = (mockDir, entry, callback) => {
  chokidar.watch(mockDir, {
    ignoreInitial: false
  }).on('all', (event) => {
    if (event === 'add' || event === 'change') {
      try {
        delete require.cache[require.resolve(entry)];

        /* eslint global-require:0 import/no-dynamic-require:0 */
        require("@babel/register")({
          root: rootPath,
          ignore: [/node_modules/],
        });
        const mockModule = require(entry);

        if (callback && typeof callback === 'function') {
          callback(mockModule);
        }
      } catch (err) {
        logger.error(`Done: Hot Mocker file replacement failed!\n${err.stack}`);
      }
    }
  });
};
