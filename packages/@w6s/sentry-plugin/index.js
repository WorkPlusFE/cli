const SentryPlugin = require('webpack-sentry-plugin');
const { getGitSha, isLegalOptions } = require('./utils');

const defaultPluginOptions = {
  deleteAfterCompile: true,
  suppressConflictError: true,
  release: getGitSha(),
};

module.exports = (api, projectOptions) => {
  const receivedOptions = projectOptions.pluginOptions.sentry || {};
  if (!receivedOptions.enable) return;
  if (!isLegalOptions(receivedOptions)) return;

  const sentryPluginOptions = {
    ...defaultPluginOptions,
    ...receivedOptions,
  };

  api.chainWebpack(webpackConfig => {
    webpackConfig.plugin('SentryPlugin')
      .use(SentryPlugin, [sentryPluginOptions]);
  });
};

module.exports.defaultModes = {
  build: 'production',
};
