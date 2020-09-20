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
# 进入某个文件路径，若不传入项目名称，将在当前目录创建
$ w6s init <project-name>
```

当前支持两种项目模版，`Admin`及`H5`，分别对应管理后台类型项目及轻应用 H5 项目。

```bash
? 请选择项目类型  (Use arrow keys)
❯ 管理后台项目 
  移动端H5轻应用项目 
```

选择后，将自动创建项目，可选择直接安装依赖并启动。

更多命令，请通过`w6s --help`进行查看。

## License

MIT
