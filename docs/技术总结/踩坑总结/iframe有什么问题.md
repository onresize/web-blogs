---
title: iframe有什么问题
lang: zh-CN
feed:
  enable: true
description: iframe有什么问题
---

# iframe有什么问题

> 本文作者：[onresize](https://github.com/onresize)

 - iframe是一种天然的沙箱、web容器

- 增加使用体验、使用[iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer)让第三方页面嵌入后、随着第三方页面自适应大小、同时还可以与其通信

- 存在的问题：`强制缓存`、`内部非dom节点相关`、`触碰事件`

#### 1.强制缓存问题
- 如下图：在本地创建了两个html文件、`1.html` 里面用iframe嵌套了 `2.html`、本地开启`http-server`服务、会发现被iframe包裹的页面重复请求是来自内存、证明iframe有强制换成问题、而直接访问的 `1.html` 是304协商缓存

<p align="center">
  <img src="/AA_mdPics/cache.min.png" />
</p>

#### 2.内部非dom节点相关
- iframe的 `2.html` 页面、在 `1.html` 里无法用dom去操作iframe内部的 `2.html` 页面的节点、例如在 `2.html` 中添加一个input框、之后在 `1.html` 页面中去尝试获取这个`input` 框节点、会发现操作不了
- 这里比如 `Vue` 中的 `keepALive` 组件的实现、就是通过将真实dom缓存在内存中来实现的、这里iframe是无法被 `KeepAlive` 缓存的

#### 3.触碰事件
- 比如说 `web` 端给 `iframe` 添加点击事件、只有 `iframe` 的边框才能点击、它内部的是的区域不能点击