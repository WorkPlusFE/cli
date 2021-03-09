const CreateFileWebpack = require("create-file-webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const CopyFilePlugin = require("copy-webpack-plugin");
const { logger, isProd } = require("@w6s/cli-shared-utils");

const getGitMessage = () => {
  try {
    const gitRevision = new GitRevisionPlugin();

    const BRANCH_NAME = gitRevision.branch();
    const COMMIT_HASH = gitRevision.commithash();

    return { BRANCH_NAME, COMMIT_HASH };
  } catch (error) {
    logger.error(error);
    return {};
  }
};

const rootPath = process.cwd();

const setupCreateFilePlugin = (envObj, fileName) => {
  const gitMessage = getGitMessage();
  const baseConfigInfo = {
    PACK_TIME: new Date().toLocaleString(),
    ...gitMessage,
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
  if (!isProd) return;

  const opts = projectOptions.pluginOptions.outputConfigFile || {};
  const fileName = opts.fileName || "config.json";
  const descriptionFile = opts.descriptionFile || "DEPLOY.md";

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
