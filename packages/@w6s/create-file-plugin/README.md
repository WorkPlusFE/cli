# @w6s/create-file-plugin

create-file-plugin 插件的需求出发点是打包项目后，生成一个可以修改接口地址的配置文件，从而减少无意义的因为需要修改接口而重复打包的操作。

create-file-plugin 主要功能有：

- 打包后生成一个可以修改接口地址的配置文件，主要配置信息包括(打包项目时的分支名、commit 哈希值、打包时间和.env.production 中所有 VUE_APP\_开头的环境变量)

- 打包后将文档文件(默认 README.md)复制到 dist 下(方便运维大哥阅读)

## 使用方法

create-file-plugin 是可配置的，它暴露了 fileName 和 descriptionFile 两个配置项，如果你想配置它们，在 w6s.config.js 中可以这样:

```js
module.exports = {
  pluginOptions: {
    // create-file-plugin 配置
    outputConfigFile: {
      // 默认 config.json
      fileName: "serverConfig.json",
      // 默认项目更目录下的README.md
      descriptionFile: "docs/项目文档.xlsx",
    },
  },
};
```
