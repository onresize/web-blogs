---
title: sessionStorage能在多个标签页之间共享数据吗
lang: zh-CN
feed:
  enable: true
description: sessionStorage能在多个标签页之间共享数据吗
---

# sessionStorage能在多个标签页之间共享数据吗?

- <b><h3>localStorage</h3></b>
```js
在同一个网站下, localStorage能在不同标签页之间共享数据
```

- <b><h3>sessionStorage</h3></b>
```js
同一网站下, sessionStorage不能在多个窗口或标签页之间共享数据, 但是当通过window.open或连接打开新页面时(不能是新窗口),
新页面会复制前面一页的sessionStorage
```

[参考](https://juejin.cn/post/7362080157190570010)