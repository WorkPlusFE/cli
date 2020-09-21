module.exports = {
  parallel: false,
  pluginOptions: {
    lintStyleOnBuild: true,
    mock: {
      entry: "mock/index.js",
      mockDir: "mock",
      prefix: "/mock",

      disable: false,
      log: true,
    },
    i18n: {
      locale: "zh-CN",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
    vconsole: {
      enable: process.env.NODE_ENV === "development",
    },
    styleResourcesLoader: {
      preProcessor: "scss",
      patterns: ["./styles/*/*.scss"],
    },
  },
  devServer: {
    port: 8088,
  },
};
