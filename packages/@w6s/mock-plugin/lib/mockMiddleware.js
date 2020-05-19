const { parse } = require('url');
const bodyParser = require('body-parser');
const { pathToRegexp } = require('path-to-regexp');
const { logger } = require('@w6s/cli-shared-utils');
const watcher = require('./watcher');

let mockRouteMap = {};
let time = 0;

function parseKey(key) {
  let method = 'get';
  let path = key;
  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    const [m, p] = splited;
    method = m.toLowerCase();
    path = p;
  }
  return { method, path };
};

function pathMatch(options = {}) {
  return (path) => {
    const keys = [];
    const re = pathToRegexp(path, keys, options);
    return (pathname, params = {}) => {
      const m = re.exec(pathname);
      if (!m) return false;
      let key; let param;
      for (let i = 0; i < keys.length; i += 1) {
        key = keys[i];
        param = m[i + 1];
        /* eslint no-continue:0 no-param-reassign:0 */
        if (!param) continue;
        params[key.name] = decodeURIComponent(param);
        if (key.repeat) params[key.name] = params[key.name].split(key.delimiter);
      }
      return params;
    };
  };
};

function registerRoute(mockModule, prefix) {
  mockRouteMap = {};

  Object.keys(mockModule).forEach((key) => {
    const { method, path } = parseKey(key);
    const currentPath = prefix + path;
    const handler = mockModule[key];
    const regexp = new RegExp(`^${  currentPath.replace(/(:\w*)[^/]/gi, '(.*)')  }$`);
    const route = { path: currentPath, method, regexp };
    if (typeof handler === 'function') {
      route.handler = mockModule[key];
    } else {
      route.handler = (req, res) => res.json(mockModule[key]);
    }
    if (!mockRouteMap[method]) {
      mockRouteMap[method] = [];
    }
    if (time > 0) {
      logger.info(`CreateRoute: path: ${currentPath} method:${route.method}`, 'MOCK');
    }
    mockRouteMap[method].push(route);
  });
  if (time > 0) {
    logger.done('Done: Hot Mocker file replacement success!', 'MOCK');
  }

  time += 1;
};

function matchRoute(req) {
  const path = req.url;
  const method = req.method.toLowerCase();
  const uri = path.replace(/\?.*$/, '');
  const routerList = mockRouteMap[method];
  return routerList && routerList.find((item) => item.path === uri || item.regexp.test(uri));
}

module.exports = (options) => {
  const { mockDir, entry, prefix } = options;
  watcher(mockDir, entry, (mockModule) => {
    registerRoute(mockModule, prefix);
  });

  return (req, res, next) => {
    const route = matchRoute(req);
    if (route) {
      // match url
      logger.info(`${route.method.toUpperCase()} ${route.path}`, 'MOCK');
      let bodyParserMethd = bodyParser.json();
      const contentType = req.get('Content-Type');
      if (contentType === 'text/plain') {
        bodyParserMethd = bodyParser.raw({ type: 'text/plain' });
      } else if (contentType === 'application/x-www-form-urlencoded') {
        bodyParserMethd = bodyParser.urlencoded({ extended: false });
      }
      bodyParserMethd(req, res, () => {
        const result = pathMatch({ sensitive: false, strict: false, end: false });
        const match = result(route.path);
        req.params = match(parse(req.url).pathname);
        try {
          route.handler(req, res, next);
        } catch (err) {
          console.log(err);
          next(err);
        }
      });
    } else {
      next();
    }
  };
};



