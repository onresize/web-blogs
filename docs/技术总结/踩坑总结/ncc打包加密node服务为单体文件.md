---
title: ncc打包加密node服务为单体文件
lang: zh-CN
feed:
  enable: true
description: ncc打包加密node服务为单体文件
---

# ncc打包加密node服务为单体文件

> 本文作者：[onresize](https://github.com/onresize)


#### 用途

```js
// 加密打包、避免源码暴露
优点：单体文件、有node环境就能直接运行、不需要安装依赖
```

#### 安装

```bash
npm i -g  @vercel/ncc

# 验证是否安装
ncc -v

# 查看是否全局安装
npm list -g
```

#### 打包命令

```js
# 指定打包根目录下的mp4ToFlv.js文件及依赖到outMp4ToFlv文件夹
"scripts": {
	"build": "ncc build mp4ToFlv.js -m -o outMp4ToFlv"
}
```

