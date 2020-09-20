# 常见问题

## 如何控制 NodeJs 版本

推荐使用以下两个工具：

* [nvm - POSIX-compliant bash script to manage multiple active node.js versions](https://github.com/nvm-sh/nvm)
* [n - Interactively Manage Your Node.js Versions](https://github.com/tj/n)

## 如何更新 Yarn 版本

针对 MacOS，在 shell 中敲入以下内容即可：

```bash
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
```

## 如何设置淘宝源

在 shell 中敲入以下内容：

```bash
# 淘宝 npm 镜像
npm set registry https://r.npm.taobao.org
# node-gyp 编译依赖的 node 镜像
npm set disturl https://npm.taobao.org/dist

# node-sass 二进制包镜像
npm set sass_binary_site https://npm.taobao.org/mirrors/node-sass
# electron 二进制包镜像
npm set electron_mirror https://npm.taobao.org/mirrors/electron/
# puppeteer 二进制包镜像
npm set puppeteer_download_host https://npm.taobao.org/mirrors
# chromedriver 二进制包镜像
npm set chromedriver_cdnurl https://npm.taobao.org/mirrors/chromedriver
# operadriver 二进制包镜像
npm set operadriver_cdnurl https://npm.taobao.org/mirrors/operadriver
# phantomjs 二进制包镜像
npm set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs
# selenium 二进制包镜像
npm set selenium_cdnurl https://npm.taobao.org/mirrors/selenium
# node-inspector 二进制包镜像
npm set node_inspector_cdnurl https://npm.taobao.org/mirrors/node-inspector
```