const cons = require('consolidate');

require('colors');

const logCompleteMsg = (opts, currentFolder) => {
  if (!opts) return;

  console.log('\n  执行以下命令启动项目: \n'.green);
  if (currentFolder) {
    console.log(`    cd ${opts.name}\n`);
  }
  console.log(`    yarn && yarn serve`);
  
  console.log(`\n  需了解更多，请查看开发文档：`);
  console.log('  https://open.workplus.io/dev/start/'.green);
  console.log('\n  🖖 Happy coding, Good luck!');
};

module.exports = {
  logCompleteMsg,
};
