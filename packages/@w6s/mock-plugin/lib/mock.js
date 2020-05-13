const express = require('express');
const mockjs = require('mockjs');

const logger = require('./logger');

module.exports = (api, options) => {
  // es6 polyfill
  require('@babel/register');

  const router = express.Router();
  const { entry, log: logEnable } = options;
  /* eslint import/no-dynamic-require:0  global-require: 0 */
  const routes = require(entry);

  for (const key in routes) {
    if (Object.prototype.hasOwnProperty.call(routes, key)) { 
      let template = routes[key];
      const [method, route] = key.split(' ');

      router[method.toLowerCase()](route, (req, res) => {
        logger(req.path, logEnable);
        const options = {
          path: req.path,
          query: req.query,
          body: req.body,
        };

        if (typeof template === 'function') {
          template = template(options);
        }

        res.send(mockjs.mock(template));
      });
    }
  }

  return router;
};
