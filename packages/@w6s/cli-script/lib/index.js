const path = require('path');
const Service = require('@vue/cli-service');
const { toPlugin, w6sConfigFileExists } = require('./utils');

const babelPlugin = toPlugin('@vue/cli-plugin-babel');
const eslintPlugin = toPlugin('@vue/cli-plugin-eslint');
const typeScriptPlugin = toPlugin('@vue/cli-plugin-typescript');
const vConsolePlugin = toPlugin('@w6s/vconsole-plugin');
const styleResourcesLoaderPlugin = toPlugin('@w6s/style-resources-loader-plugin');
const sentryPlugin = toPlugin('@w6s/sentry-plugin');
const mockPlugin = toPlugin('@w6s/mock-plugin');
const i18nPlugin = toPlugin('vue-cli-plugin-i18n');

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
      vConsolePlugin,
      sentryPlugin,
      styleResourcesLoaderPlugin,
      mockPlugin,
      i18nPlugin,
    ],
  })
);

exports.runService = (command, args, rawArgv) => createService().run(command, args, rawArgv);
