---
title: referrer
lang: zh-CN
feed:
  enable: true
description: referrer
---

# referrer

> 本文作者：[onresize](https://github.com/onresize)

`Referer是HTTP请求头的一个字段，包含了当前请求页面的来源页面的地址，通过该字段，我们可以检测访客是从哪里来的。Referer有以下作用`：[[0]](https://juejin.cn/post/6844903892170309640):
- <kbd class="green-text">交互优化</kbd>：在某些web应用的交互中，右上角会提供一个返回按钮，方便用户返回上一页。这种处理方式隐藏的一个问题是：如果用户从其他入口如分享链接等地方直接进来时，点击这个按钮是无法返回。因此在点击按钮时，我们可以判断document.referrer是否存在来优化交互：如果存在，则返回上一页；如果不存在，则直接返回首页。

- <kbd class="green-text">防盗链</kbd>：通过Referer字段，网站可以判断请求是否来自自己的网页。如果不是，则可以拒绝服务，或者返回一张错误图片等。

- <kbd class="green-text">统计分析</kbd>：通过Referer字段，可以统计用户从不同来源访问网站的情况，以便进行市场分析或者调整宣传策略等。
#### 在JavaScript中，我们可以通过Document.referrer来获取当前页面的Referer[[1]](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/referrer)。例如：
```js
console.log(document.referrer);
```

### `1.Referrer-Policy`
`Referrer Policy 可以有多个值，每个值都有其自己的含义和使用场景。以下是一些常见的 Referrer Policy 值`：[[2]](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy)
- no-referrer：请求不会包含 Referer 头部。
- no-referrer-when-downgrade：默认值。请求只会在从 HTTPS 网站到 HTTP 网站时省略 Referer 头部，其他情况都会包含。
- origin：请求只会包含当前页面的 origin，而不包含路径和查询参数。
- origin-when-cross-origin：如果请求和当前页面同源，则与 origin 相同，否则与完整的 URL 相同。
- same-origin：只会在请求同源资源时包含 Referer 头部。
- strict-origin：只会在请求同一站点的资源时包含完整的 URL，否则不包含 Referer 头部。
- strict-origin-when-cross-origin：如果请求和当前页面同源，则与 strict-origin 相同，否则只包含当前页面的 origin。
- unsafe-url：请求会包含完整的 URL，包括路径和查询参数。此值与不设置 Referrer Policy 的效果相同。

### `2.集成到HTMl`
```html
<meta name="referrer" content="origin">
```

### `3.什么情况下会丢失Referrer`
- 直接流量：访客是通过直接键入地址、点击收藏夹地址、以及点击即时通讯工具地址等，进入网页的，这种情况产生的流量属于直接流量，直接流量的请求中没有Referrer信息。
- 修改Location对象进行页面导航：Location对象是一个用于页面导航的非常实用的对象，可以通过修改其中的一部分来实现页面的跳转。然而，通过修改Location对象进行页面导航的方法，会导致在IE下丢失Referrer。
- window.open方式打开新窗口：在IE下，通过window.open方式打开新窗口，会导致Referrer丢失。但是在Chrome3.0+，Firefox3.5，Opera9.6，Safari3.2.2等浏览器中，会正常返回来源网页。

`对于上述场景中的某些情况，可以采取以下方法来解决Referrer丢失的问题：`
- 直接流量：由于这种流量的请求中没有Referrer信息，因此无法通过任何手段获取到。开发者可以考虑在页面中添加额外的信息，例如通过问卷调查等方式，获取访客的来源信息。
- 修改Location对象进行页面导航：开发者可以使用其他方法实现页面的跳转，例如通过window.location.href来实现。这种方式可以避免在IE下丢失Referrer的问题。
- window.open方式打开新窗口：开发者可以考虑在window.open的第三个参数中设置ref参数，将当前页面的URL作为Referrer传递给新开的窗口。