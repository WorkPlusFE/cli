const mockMiddleware = require('./lib/mockMiddleware');
const defaultConfig = require('./lib/default.config');

module.exports = (api, options) => {
  let mockOptions = (options.pluginOptions && options.pluginOptions.mock) || {};
  mockOptions = {
    ...defaultConfig,
    ...mockOptions,
  };

  // disable mock server
  if (mockOptions.disable || process.env.NODE_ENV !== 'development') return;

  mockOptions.entry = api.resolve(mockOptions.entry);
  mockOptions.mockDir = api.resolve(mockOptions.mockDir);

  api.configureDevServer((app) => {
    app.use(mockMiddleware(mockOptions));
  });
};
