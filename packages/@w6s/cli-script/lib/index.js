const path = require('path');
const Service = require('@vue/cli-service');
const { toPlugin, w6sConfigFileExists } = require('./utils');

const babelPlugin = toPlugin('@vue/cli-plugin-babel');
const eslintPlugin = toPlugin('@vue/cli-plugin-eslint');
const typeScriptPlugin = toPlugin('@vue/cli-plugin-typescript');

const context = process.cwd();

// w6s.config.js
const configPath = path.resolve(context, 'w6s.config.js');
if (configPath && w6sConfigFileExists(configPath)) {
  process.env.VUE_CLI_SERVICE_CONFIG_PATH = configPath;
}

const createService = () => (
  new Service(context, {
    projectOptions: {
      compiler: true,
      lintOnSave: 'default',
    },
    plugins: [
      babelPlugin,
      eslintPlugin,
      typeScriptPlugin,
    ],
  })
);

exports.runService = (command, args, rawArgv) => createService().run(command, args, rawArgv);
