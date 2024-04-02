---
title: node程序中打断点
lang: zh-CN
feed:
  enable: true
description: node程序中打断点
---

# node程序中打断点

> 本文作者：[onresize](https://github.com/onresize)

```js
执行脚本: node --inspect-brk app.js

会显示对应的 ws://127.0.0.1:9229/xxx
浏览器打开 http://127.0.0.1:9229, 再打开控制台会显示一个node的logo在控制台上、点击后执行node程序、进入对应的断点
```