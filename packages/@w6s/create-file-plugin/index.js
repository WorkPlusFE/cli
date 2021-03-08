const CreateFileWebpack = require("create-file-webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const CopyFilePlugin = require("copy-webpack-plugin");

const gitRevision = new GitRevisionPlugin();

const brachName = gitRevision.branch();
const commitHash = gitRevision.commithash();
const rootPath = process.cwd();

const setupCreateFilePlugin = (envObj, fileName) => {
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
    path: "dist",
    fileName,
    content: JSON.stringify({ ...baseConfigInfo, ...vueEnvObj }),
  });
};

module.exports = (api, projectOptions) => {
  const opts = projectOptions.pluginOptions.outputConfigFile || {};
  const fileName = opts.fileName || "config.json";
  const descriptionFile = opts.descriptionFile || "README.md";

  api.configureWebpack((webpackConfig) => {
    webpackConfig.plugins.push(
      setupCreateFilePlugin(process.env, fileName),
      new CopyFilePlugin([
        {
          from: `${rootPath}/${descriptionFile}`,
          to: `${rootPath}/${descriptionFile}`,
        },
      ])
    );
  });
};
