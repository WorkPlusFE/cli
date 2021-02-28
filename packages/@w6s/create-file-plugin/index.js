const CreateFileWebpack = require("create-file-webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const CopyFilePlugin = require("copy-webpack-plugin");

const gitRevision = new GitRevisionPlugin();

const brachName = gitRevision.branch();
const commitHash = gitRevision.commithash();
const rootPath = process.cwd();

const setupCreateFilePlugin = (envObj) => {
  const baseConfig = {
    branch_name: brachName,
    commit_hash: commitHash,
    pack_time: new Date().toLocaleString(),
  };

  const vueEnvObj = {};
  for (const prop in envObj) {
    if (prop.includes("VUE_APP_")) {
      vueEnvObj[prop] = envObj[prop];
    }
  }

  return new CreateFileWebpack({
    path: "./dist",
    fileName: "config.json",
    content: JSON.stringify({ ...baseConfig, ...vueEnvObj }),
  });
};

module.exports = (api) => {
  api.configureWebpack((webpackConfig) => {
    webpackConfig.plugins.push(
      setupCreateFilePlugin(process.env),
      new CopyFilePlugin([
        {
          from: `${rootPath}/README.md`,
          to: `${rootPath}/dist/README.md`,
        },
      ])
    );
  });
};
