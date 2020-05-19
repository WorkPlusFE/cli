const VConsolePlugin = require('vconsole-webpack-plugin');

module.exports = (api, projectOptions) => {
  const vconsole = projectOptions.pluginOptions.vconsole || {};

  api.configureWebpack((webpackConfig) => {
    webpackConfig.plugins.push(new VConsolePlugin({
      enable: false,
      ...vconsole,
    }));
  });
};
