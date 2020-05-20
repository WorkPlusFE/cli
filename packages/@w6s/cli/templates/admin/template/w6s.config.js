const sentryConfig = require('./sentry.config');
const path = require('path');

module.exports = {
  pluginOptions: {
    mock: {
      entry: 'mock/index.js',
      mockDir: 'mock',
      prefix: '',

      disable: false,
      log: true,
    },
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
    sentry: {
      enable: true,
      ...sentryConfig,
    },
    styleResourcesLoader: {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    },
  },
  devServer: {
    port: 8881,
  },
};
