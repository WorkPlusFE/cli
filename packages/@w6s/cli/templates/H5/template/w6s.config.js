module.exports = {
  pluginOptions: {
    mock: {
      entry: 'mock/index.js',
      mockDir: 'mock',
      prefix: '/mock',

      disable: false,
      log: true,
    }
  }
  devServer: {
    port: 8881
  },
};
