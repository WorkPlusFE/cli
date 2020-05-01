require('colors');

const logCompleteMsg = (opts) => {
  if (!opts) return;

  console.log('  To get started: \n'.green);
  console.log(`      cd ${  opts.name}\n`);
  if (Array.isArray(opts.bash)) {
    opts.bash.forEach((item) => {
      console.log(`      ${  item}` );
    })
  }
  if (opts.readme) {
    console.log(`\n  Documentation can be found at ${  opts.readme.cyan  }`);
  }
  console.log('\n 🖖 Happy coding, Good luck!');
};

module.exports = {
  logCompleteMsg,
};
