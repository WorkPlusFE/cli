const MIRRORS_CONFIG = {
  'taobao-mirror': '{{shell}} registry https://r.npm.taobao.org',
  'node-gyp': '{{shell}} disturl https://npm.taobao.org/dist',
  'node-sass': '{{shell}} sass_binary_site https://npm.taobao.org/mirrors/node-sass',
  'electron': '{{shell}} electron_mirror https://npm.taobao.org/mirrors/electron/',
  'puppeteer': '{{shell}} puppeteer_download_host https://npm.taobao.org/mirrors',
  'chromedriver': '{{shell}} chromedriver_cdnurl https://npm.taobao.org/mirrors/chromedriver',
  'operadriver': '{{shell}} operadriver_cdnurl https://npm.taobao.org/mirrors/operadriver',
  'phantomjs': '{{shell}} phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs',
  'selenium': '{{shell}} selenium_cdnurl https://npm.taobao.org/mirrors/selenium',
  'node-inspector': '{{shell}} node_inspector_cdnurl https://npm.taobao.org/mirrors/node-inspector',
};

exports.getMirrorByType = (package, mirrors) => {
  const shell = package.toLowerCase() === 'yarn' ? 'yarn config set' : 'npm set';
  return mirrors.map((mirror) => MIRRORS_CONFIG[mirror].replace('{{shell}}', shell));
};