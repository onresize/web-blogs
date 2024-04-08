---
title: link标签几个优化性能的使用方法
lang: zh-CN
feed:
  enable: true
description: link标签几个优化性能的使用方法
---

# link标签几个优化性能的使用方法

> 本文作者：[onresize](https://github.com/onresize)

- 使用场景：比如项目中iframe嵌入第三方网址、为了加快响应速度、可以使用link去做一些优化

### DNS预解析
- 提前将域名转化为ip地址、缩短请求资源的耗时
```html
<link rel="dns-prefetch" href="//example.com">
```

### Preconnect（预连接）
- 当访问一个站点时、会经过以下步骤：
1.DNS解析
2.TCP握手
3.如果时https协议的站点、会进行TLS握手
- 使用预连接后、浏览器会针对特定的域名、提前初始化执行上面三个步骤、节省我们访问第三方资源的耗时、
```html
<link rel="preconnect" href="//example.com">
<link rel="preconnect" href="//cdn.example.com" crossorigin>
```

### Prefetch（预拉取）
- 预拉取用于标识从当前网站跳转到下一个网站可能需要的资源、以及本网站应该获取的资源。这样可以在将来浏览器请求资源时提供更快的响应。
- 这里需要注意的是、使用了prefetch、资源仅仅被提前下载、下载后不会有任何操作、比如解析资源。
```html
<link rel="prefetch" href="//example.com/next-page.html" as="document" crossorigin="use-credentials">
<link rel="prefetch" href="/library.js" as="script">
```
- link标签里的as参数可以有以下取值：
```text 
audio: 音频文件
video: 视频文件  
Track: 网络视频文本轨道 
script: javascript文件
style: css样式文件
font: 字体文件   
image: 图片   
fetch: XHR、Fetch请求
worker: Web workers
embed: 多媒体<embed>请求 
object:  多媒体<object>请求
document: 网页
```

### Prerender（预渲染）
```html
<link rel="prerender" href="//example.com/next-page.html">
```
- `prerender` 比 `prefetch` 更进一步。不仅仅会下载对应的资源、还会对资源进行解析。解析过程中、如果需要其他的资源、可能会直接下载这些资源。这样、用户在从当前页面跳转到目标页面时、浏览器可以更快的响应。

- 用js方法使用：
```js
var hint = document.createElement("link");
hint.rel = "prefetch";
hint.as = "document";
hint.href = "/article/part3.html";
document.head.appendChild(hint);
```