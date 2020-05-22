const SentryPlugin = require('webpack-sentry-plugin');
const { getGitSha, isLegalOptions, isProdEnv } = require('./utils');

const defaultPluginOptions = {
  deleteAfterCompile: true,
  suppressConflictError: true,
  include: '/dist/**/*.js',
  baseSentryURL: 'https://sentry.workplus.io/api/0',
  organization: 'sentry',
};

module.exports = (api, projectOptions) => {
  if (!isProdEnv()) return;

  const receivedOptions = projectOptions.pluginOptions.sentry || {};
  if (!receivedOptions.enable) return;
  if (!isLegalOptions(receivedOptions)) return;

  const sentryPluginOptions = {
    ...defaultPluginOptions,
    release: getGitSha(),
    ...receivedOptions,
  };

  api.chainWebpack(webpackConfig => {
    webpackConfig.plugin('SentryPlugin')
      .use(SentryPlugin, [sentryPluginOptions]);
  });
};
