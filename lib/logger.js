const colors = require('colors');

exports.logCompleteMsg = (opts) => {
  console.log('');
  console.log('  Generate successful \n');
  console.log('  To get started: \n'.green);
  console.log('    cd yourProject and\n');
  for(var i in opts) {
    console.log('    $ ' + opts[i] + '\n');
  }
}
