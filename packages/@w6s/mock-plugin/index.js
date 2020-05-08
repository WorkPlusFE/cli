require('colors');

const express = require('express');
const chokidar = require('chokidar');

const mock = require('./lib/mock');
const defaultConfig = require('./lib/default.config');
const logger = require('./lib/logger');

module.exports = (api, options) => {
  let mockOptions = (options.pluginOptions && options.pluginOptions.mock) || {};
  mockOptions = {
    ...defaultConfig,
    ...mockOptions,
  };

  // disable mock server
  if (mockOptions.disable) return;

  mockOptions.entry = api.resolve(mockOptions.entry);
  mockOptions.mockDir = api.resolve(mockOptions.mockDir);

  api.configureDevServer((app) => {
    const {prefix} = mockOptions;

    app.use(prefix, express.json());
    app.use(prefix, express.urlencoded({ extended: true }));

    app.use(prefix, mock(api, mockOptions));

    chokidar.watch(mockOptions.mockDir, {
      ignoreInitial: true
    }).on('all', (event, path) => {
      if (event === 'add' || event === 'change') {
        try {
          app.use(prefix, mock(api, mockOptions));
          logger(`\n > Mock Server hot reload success! changed  ${path}`.green, mockOptions.log)
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
};

module.exports.defaultModes = {
  mock: 'development',
};
