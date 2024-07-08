---
title: echarts两种渲染方式的应用场景
lang: zh-CN
feed:
  enable: true
description: echarts两种渲染方式的应用场景
---

> 本文作者：[onresize](https://github.com/onresize)


### echarts渲染方式svg和canvas区别
- ECharts 支持使用 SVG 和 Canvas 两种方式来渲染图表。

`SVG 方式渲染图表：`
- 优点：SVG 图像可以被搜索引擎搜索、放大缩小而不影响质量、支持无限放大。
- 缺点：在移动设备上的性能不如 Canvas。

`Canvas 方式渲染图表：`
- 优点：在移动设备上性能更好，支持复杂的动画和过渡效果。
- 缺点：Canvas 生成的图像不能被搜索引擎搜索，放大或缩小可能会失真。

你可以在初始化 ECharts 实例时通过设置 renderer 参数来指定使用哪种渲染方式：
```js
var myChart = echarts.init(domElement, null, { renderer: 'canvas' });
// 或者
var myChart = echarts.init(domElement, null, { renderer: 'svg' });
```