const defaultPluginOptions = {
  preProcessor: 'scss',
  patterns: ['./styles/*/*.scss'],
};

module.exports = (api, projectOptions) => {
  const currentPluginOptions = projectOptions.pluginOptions.styleResourcesLoader 
    || projectOptions.pluginOptions['style-resources-loader']
    || {};
  const pluginOptions = {
    ...defaultPluginOptions,
    ...currentPluginOptions,
  };
  api.chainWebpack((webpackConfig) => {
    [
      'normal',
      'normal-modules',
      'vue',
      'vue-modules'
    ].forEach((oneOf) => {
      webpackConfig.module.rule(pluginOptions.preProcessor).oneOf(oneOf)
        .use('style-resources-loader')
          .loader('style-resources-loader')
          .options({
            patterns: pluginOptions.patterns
          });
    });
  });
}
