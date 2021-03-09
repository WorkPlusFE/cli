const { execSync } = require('child_process');

let hasYarn;
// env detection
exports.hasYarn = () => {
  if (hasYarn != null) {
    return hasYarn;
  }
  try {
    execSync('yarn --version', { stdio: 'ignore' });
    hasYarn = true;
    return true;
  } catch (e) {
    hasYarn = false;
    return false;
  }
};

// OS
exports.isWindows = process.platform === 'win32';
exports.isMac = process.platform === 'darwin';
exports.isLinux = process.platform === 'linux';

// node env
exports.isProd = () => process.env.NODE_ENV === 'production';