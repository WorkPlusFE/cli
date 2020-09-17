const path = require('path');
const Service = require('@vue/cli-service');
const { toPlugin, w6sConfigFileExists, getRootProjectPlugins } = require('./utils');

const babelPlugin = toPlugin('@vue/cli-plugin-babel');
const eslintPlugin = toPlugin('@vue/cli-plugin-eslint');
const typeScriptPlugin = toPlugin('@vue/cli-plugin-typescript');
const vConsolePlugin = toPlugin('@w6s/vconsole-plugin');
const styleResourcesLoaderPlugin = toPlugin('@w6s/style-resources-loader-plugin');
const sentryPlugin = toPlugin('@w6s/sentry-plugin');
const mockPlugin = toPlugin('@w6s/mock-plugin');
const stylelintPlugin = toPlugin('@w6s/stylelint-plugin');
const i18nPlugin = toPlugin('vue-cli-plugin-i18n');

const context = process.cwd();
let hasW6sConfigFile = false;

// w6s.config.js
const configPath = path.resolve(context, 'w6s.config.js');
if (configPath && w6sConfigFileExists(configPath)) {
  process.env.VUE_CLI_SERVICE_CONFIG_PATH = configPath;
  hasW6sConfigFile = true;
}

const createService = (command) => {
  let inlineOptions = {};

  if (hasW6sConfigFile) {
    // 跟vue-cli保持一致，build 与 test 命令默认为 production 的 node 环境，其他均为 development
    if (command.toLowerCase() === 'build' || command.toLowerCase() === 'test') {
      process.env.NODE_ENV = 'production';
    } else {
      process.env.NODE_ENV = 'development';
    }
    inlineOptions = require(configPath);
  }
  
  const projectPlugins = getRootProjectPlugins(context) || [];
  const inlinePlugins = [
    babelPlugin,
    typeScriptPlugin,
    vConsolePlugin,
    sentryPlugin,
    styleResourcesLoaderPlugin,
    mockPlugin,
    stylelintPlugin,
    i18nPlugin,
    eslintPlugin,
    ...projectPlugins,
  ];

  return new Service(context, {
    projectOptions: {
      compiler: true,
      lintOnSave: 'default',
    },
    inlineOptions: {
      ...inlineOptions,
      parallel: false, // disable thread-loader
    },
    plugins: inlinePlugins,
  });
};

exports.runService = (command, args, rawArgv) => createService(command).run(command, args, rawArgv);
