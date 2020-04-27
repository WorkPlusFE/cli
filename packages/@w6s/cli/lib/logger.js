require('colors');

const logCompleteMsg = (opts, name) => {
  console.log('');
  console.log('  #Generate successful \n'.gray);
  console.log('  To get started: \n'.green);
  console.log(`      cd ${  name}`);
  if (Array.isArray(opts.bash)) {
    opts.bash.forEach((item) => {
      console.log(`      ${  item}` );
    })
  }
  if (opts.readme) {
    console.log(`\n  Documentation can be found at ${  opts.readme.cyan  }\n`);
  }
  console.log('  🐳 All finished, Good luck!');
};

module.exports = {
  logCompleteMsg,
};
