const fs = require('fs');
const { resolvePkg, isPlugin, logger } = require("@w6s/cli-shared-utils");

const idToPlugin = (id) => ({
  id: id.replace(/^.\//, 'built-in:'),
  apply: require(id),
});

/* eslint import/no-dynamic-require:0  global-require:0 */
exports.toPlugin = id => ({ id, apply: require(id) });
exports.w6sConfigFileExists = configPath => fs.existsSync(configPath);

exports.getRootProjectPlugins = (ctx) => {
  const pkg = resolvePkg(ctx);
  return Object.keys(pkg.devDependencies || {})
    .concat(Object.keys(pkg.dependencies || {}))
    .filter(isPlugin)
    .map(id => {
      if (
        pkg.optionalDependencies &&
        id in pkg.optionalDependencies
      ) {
        let apply = () => {};
        try {
          apply = require(id);
        } catch (e) {
          logger.warn(`Optional dependency ${id} is not installed.`);
        }

        return { id, apply };
      } 
        return idToPlugin(id);
      
    });
};
