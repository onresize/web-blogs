---
title: 选中dom元素跳转ide源码工具
lang: zh-CN
feed:
  enable: true
description: 选中dom元素跳转ide源码工具
---
# 选中dom元素跳转IDE源码工具
>
> 本文作者：[onresize](https://github.com/onresize)
>


- ### [1.code-inspector](https://github.com/zh-lx/code-inspector) ![github star:](https://img.shields.io/github/stars/zh-lx/code-inspector?color=white&label=Stars&logo=github&style=social)
- webpack、vite项目中常用、但不限于webpack、vite项目 [中文文档](https://inspector.fe-dev.cn/)
- 使用方法：
<p align="center">
  <img src="/AA_mdPics/code-inspector.min.png" style="border-radius: 6px;" />
</p>

- `vue.config.js`
```js
const { codeInspectorPlugin } = require("code-inspector-plugin");

configureWebpack: {
  plugins: [
		codeInspectorPlugin({
			bundler: "webpack",
		}),
	],
}
```

- ### [2.devtools-next](https://github.com/vuejs/devtools-next) ![github star:](https://img.shields.io/github/stars/vuejs/devtools-next?color=white&label=Stars&logo=github&style=social)
- 针对vue3_vite项目中使用 [官方文档](https://devtools-next.vuejs.org/guide/vite-plugin)

- `vite.config.js`
```js
import VueDevTools from "vite-plugin-vue-devtools";

 plugins: [
    VueDevTools(),
 ]
```
