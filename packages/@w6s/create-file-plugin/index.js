const path = require('path');
const CreateFileWebpack = require('create-file-webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CopyFilePlugin = require('copy-webpack-plugin');
const { logger, isProd } = require('@w6s/cli-shared-utils');
const isGit = require('is-git-repository');

const getGitMessage = () => {
  try {
    if (!isGit()) {
      console.log('');
      logger.info(' 当前为非 Git 项目！');
      return {};
    };

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

const setupCreateFilePlugin = (envObj, fileName, outputDir) => {
  const gitMessage = getGitMessage();
  const baseConfigInfo = {
    PACK_TIME: new Date().toLocaleString(),
    ...gitMessage,
  };

  const vueEnvObj = {};
  for (const prop in envObj) {
    if (prop.includes('VUE_APP_')) {
      vueEnvObj[prop] = envObj[prop];
    }
  }

  return new CreateFileWebpack({
    path: outputDir,
    fileName,
    content: JSON.stringify({ ...baseConfigInfo, ...vueEnvObj }),
  });
};

module.exports = (api, projectOptions) => {
  if (!isProd()) return;

  const outputDir = projectOptions.outputDir || 'dist';
  const opts = projectOptions.pluginOptions.outputConfigFile || {};
  const fileName = opts.fileName || 'config.json';
  const descriptionFile = opts.descriptionFile || 'DEPLOY.md';

  api.configureWebpack((webpackConfig) => {
    webpackConfig.plugins.push(
      setupCreateFilePlugin(process.env, fileName, outputDir),
      // 文件默认输出到 output 目录
      new CopyFilePlugin([
        {
          from: `${descriptionFile}`,
        },
      ])
    );
  });
};
