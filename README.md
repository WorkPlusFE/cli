# @w6s/cli 

[![npm version](https://badge.fury.io/js/%40w6s%2Fcli.svg)](https://badge.fury.io/js/%40w6s%2Fcli) [![Build Status](https://travis-ci.org/WorkPlusFE/w6s-cli.svg?branch=master)](https://travis-ci.org/WorkPlusFE/w6s-cli)

A CLI for scaffolding starter projects.

👉 [查看 CLI 使用文档](https://open.workplus.io/cli/)

## 安装

版本要求：`nodejs >= 10`:

```bash
npm install -g @w6s/cli

# Or
yarn global add @w6s/cli
```

## 创建一个项目

```bash
# 进入某个文件路径
$ w6s init <project-name>
```

当前支持两种项目模版，`Admin`及`H5`，分别对应管理后台类型项目及轻应用 H5 端项目。

```bash
? Please select the type of project to create  (Use arrow keys)
❯ Admin 适用于管理后台类项目 
  H5 适用于移动端H5项目（轻应用）
```

选择后，将自动创建项目，可选择直接安装依赖并启动。

更多命令，请通过`w6s --help`进行查看。

## License

MIT
