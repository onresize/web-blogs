---
title: nrm切换包管理器源基本使用
lang: zh-CN
feed:
  enable: true
description: nrm切换包管理器源基本使用
---

# nrm切换包管理器源基本使用

> 本文作者：[onresize](https://github.com/onresize)

##### 什么是 [nrm](https://github.com/Pana/nrm)

npm 的源管理器，切换下载安装 项目依赖 时的源地址。默认包含 npm yarn tencent cnpm taobao npmMirror，支持添加、删除公司内部搭建的私有 npm 源地址。 一般在国内，使用 taobao 或者 cnpm 源， 安装依赖时速率较快。

##### 安装

```bash
npm install -g nrm
```

##### 使用

```bash
# 查看所有源列表
nrm ls

# 切换源
mrm use cnpm

# 添加源
nrm add <registry> <url>   // registry 为源名、url 为源地址
# 例如： nrm add cnpm https://registry.npmmirror.com

# 删除源
nrm del <registry>
    
# 查看所有源的响应速率
nrm test 
```

