---
title: package.json文件结构
lang: zh-CN
feed:
  enable: true
description: package.json文件结构
---

# package.json文件结构

> 本文作者：[onresize](https://github.com/onresize)

- 手动修改 `^`、`~`、`无符号`
> - 符号 `^`：表示主版本固定的情况下，可更新最新版。例如：`vuex: "^3.1.3"`，3.1.3及其以上的3.x.x都是满足的
> - 符号 `~`：表示次版本固定的情况下，可更新最新版。如：`vuex: "~3.1.3"`，3.1.3及其以上的3.1.x都是满足的
> - `无符号`：无符号表示固定版本号，例如：`vuex: "3.1.3"`，此时一定是安装3.1.3版本

[vue的package.json文件的详细说明](https://blog.csdn.net/m0_65084430/article/details/139630480)