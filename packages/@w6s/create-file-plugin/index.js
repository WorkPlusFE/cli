const CreateFileWebpack = require("create-file-webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const CopyFilePlugin = require("copy-webpack-plugin");

const gitRevision = new GitRevisionPlugin();

const brachName = gitRevision.branch();
const commitHash = gitRevision.commithash();
const rootPath = process.cwd();

const setupCreateFilePlugin = (envObj, path, fileName) => {
  const baseConfigInfo = {
    BRANCH_NAME: brachName,
    COMMIT_HASH: commitHash,
    PACK_TIME: new Date().toLocaleString(),
  };

  const vueEnvObj = {};
  for (const prop in envObj) {
    if (prop.includes("VUE_APP_")) {
      vueEnvObj[prop] = envObj[prop];
    }
  }

  return new CreateFileWebpack({
    path,
    fileName,
    content: JSON.stringify({ ...baseConfigInfo, ...vueEnvObj }),
  });
};

module.exports = (api, projectOptions) => {
  const opts = projectOptions.pluginOptions.outputConfigFile || {};
  const path = opts.path || "dist";
  const fileName = opts.fileName || "config.json";

  api.configureWebpack((webpackConfig) => {
    webpackConfig.plugins.push(
      setupCreateFilePlugin(process.env, path, fileName),
      new CopyFilePlugin([
        {
          from: `${rootPath}/README.md`,
          to: `${rootPath}/${path}/README.md`,
        },
      ])
    );
  });
};
