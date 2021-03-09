const SentryPlugin = require('webpack-sentry-plugin');
const { isProd } = require('@w6s/cli-shared-utils');
const { getGitSha, isLegalOptions } = require('./utils');

const defaultPluginOptions = {
  deleteAfterCompile: true,
  suppressConflictError: true,
  include: /\.js/ig,
  baseSentryURL: 'https://sentry.workplus.io/api/0',
  organization: 'sentry',
};

module.exports = (api, projectOptions) => {
  if (!isProd()) return;

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
