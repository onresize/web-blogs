---
title: http缓存
lang: zh-CN
feed:
  enable: true
description: http缓存
---

# http缓存

> 本文作者：[onresize](https://github.com/onresize)

- ### 请求头
<p align="left">
  <img src="/AA_mdPics/request.min.png" />
</p>

- ### 响应头
<p align="left">
  <img src="/AA_mdPics/response.min.png" />
</p>

:::tip
注：http缓存只针对 get 请求、对其他请求无效
:::
- web缓存主要包括两部分：`浏览器缓存` 和 `http缓存`

- 浏览器缓存：`localStorage（<5M）, sessionStorage（<5M）, cookie（<4kb）`、本文重点是http缓存
- http缓存分为两种：`强缓存` 和  `协商缓存`

[node代码示例](https://gitee.com/onresize/koa-node)

### `1.强缓存`
- 直接从内存或磁盘中读取目标资源、无需和服务器通讯
- #### 1.1.基于 `Expires` 字段实现的强缓存 
```js
// 服务端设置静态资源的 Expires 字段、设置过期时间
// 前端请求静态载资源的时候、调试面板第二次请求开始会显示来自内存或磁盘、减少http请求来达到优化点
```
- 对于强缓存来说、Expires 已经不是实现强缓存的首选、因为 Expires 判断是否过期是通过设置的时间和本地时间作比较、如果本地改变时区那时间就不准确了、这样就可能出现资源无法被缓存活永远被缓存的情况
- #### 1.2.强缓存首选：`cache-control` 字段代替 `Expires` 字段、`Cache-control` 这个字段在http1.1中被增加
- `Cache-control` 的使用方法页很简单，只要在资源的响应头上写上需要缓存多久就好了，单位是秒。例：
<br >

koa服务设置强缓存
```js
router.get('/getCaptcha', async (ctx) => {
 ctx.set('Cache-Control', 'max-age=10') // max-age=10表示 10s 之内请求都走缓存
})
```

express服务设置强缓存
```js
router.get('/getCaptcha', (req, res) => {
  res.writeHead(200, {
      'Cache-Control':'max-age=10'
  });
})
```

http服务设置强缓存
```js
let server = http.createServer((req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=86400')
  // or
  // res.writeHead(200, { 'Cache-Control': 'max-age=100' })
})
```

<p align="center">
<img src="/AA_mdPics/hc1.png" />
</p>

- `Cache-Control: max-age=N`，N就是需要缓存的秒数。从第一次请求资源的时候开始，往后N秒内，资源若再次请求，则直接从磁盘（或内存中读取），不与服务器做任何交互
- `Cache-control` 中因为max-age后面的值是一个滑动时间，从服务器第一次返回该资源时开始倒计时。 所以也就不需要比对客户端和服务端的时间，解决了Expires所存在的巨大漏洞 
- `Cache-control` 有 `max-age、s-maxage、no-cache、no-store、private、public` 这六个属性
  - `max-age`: 决定客户端资源被缓存多久

  - `s-maxage`: 决定代理服务器缓存的时长
  - `no-cache`: 表示是强制进行协商缓存
  - `no-store`: 是表示禁止任何缓存策略
  - `public`: 表示资源即可以被浏览器缓存也可以被代理服务器缓存
  - `private`: 表示资源只能被浏览器缓存
- 注意：`no-cache` 和 `no-store` 是一组互斥属性、`public` 和 `private`也是一组互斥属性、互斥属性不能同时出现在`Cache-Control`响应头中、`max-age` 和 `s-maxage` 并不互斥、可以一起使用

- Cache-control 如何设置多个值呢? 用逗号分割如： `Cache-control:max-age=10000,s-maxage=200000,public`
- 在 `Cache-control` 不支持的时候、还是要使用 `Expires`

### `2.协商缓存`

- 2.1.基于 `last-modified` 的协商缓存
<!-- ```js
// 1.首先需要在服务器端读出文件修改时间
// 2.将读出来的修改时间赋给响应头的 last-modified 字段
// 3.最后设置 Cache-control:no-cache
``` -->

- 2.2.基于 `ETag` 的协商缓存

`koa服务` 设置get请求协商缓存
```js
const koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');

const app = new koa()
app.use(static(__dirname + '/public'))
app.use(require('koa2-cors')()) // 允许跨域访问

// 使用中间件设置协商缓存
app.use(conditional());
app.use(etag());

router.get('/test', (ctx) => {
 ctx.body = '测试'
})

app.listen(3000, () => {
  console.log('koa服务已启动port：http://localhost:3000/')
})
```

`express服务` 设置get请求协商缓存
```js
const express = require('express')
const app = express()
app.use(express.static('public'))


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true') // 允许跨域携带凭证
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')   // 中文乱码解决
  next()
})

const etag = require('etag')

app.get('/test', (req, res) => {
  const hash = etag(content)
  // 协商缓存
  res.set({
    ETag: hash,
    'Cache-Control': 'no-cache',
  })

  if (req.headers['if-none-match'] === hash) {
    res.status(304).end()
  } else {
    res.send('测试')
  }
})

app.listen(3000, () => {
  console.log('express服务已启动port：http://localhost:3000/')
})
```
node 内置的 `http服务` 设置get请求协商缓存
```js
const fs = require('fs')
const path = require('path')
const http = require('http')
const etag = require('etag')

const server = http.createServer((req, res) => {
  const { url, method } = req
  // 设置跨域响应头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  
  if (url === '/' && method == 'GET') {
    // 静态资源
    fs.readFile(path.join(__dirname, 'public/index.html'), (err, data) => {
      if (err) throw err
      res.StatusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else if (url === '/test' && method === 'GET') {
    // 协商缓存
    const etagValue = etag('test123')
    res.setHeader('ETag', etagValue)

    // 检查是否命中缓存
    if (req.headers['if-none-match'] === etagValue) {
      res.writeHead(304, 'Not Modified')
      res.end()
    } else {
      // 发送响应数据
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(
        JSON.stringify({
          name: '测试',
        })
      )
    }
  }
})

server.listen(3000, () => {
  console.log('http服务已启动port：http://localhost:3000/')
})
```

### `3.如何判断get请求是否做了协商缓存`
在没有勾选停用缓存的情况下、如果GET请求的code码为304、则一定做了协商缓存、其次如果code码不是304、在多次请求同一个接口时、首次接口的大小和后面请求的大小不一致、也是做了协商缓存、如下图所示：红框和黄框的文件大小区别
<p align="left">
  <img src="/AA_mdPics/hello.min.png" />
</p>

### `4.总结`
- 关于强缓存、`cache-control` 是 `Expires` 的完全替代方案、在可以使用 `cache-control` 的情况下不要使用 `expires`
- 关于协商缓存、`etag` 并不是 `last-modified` 的完全替代方案、而是补充方案、具体用哪一个、取决于业务场景
- <u>所有返回304状态码的资源都是</u>` 协商缓存`、<u>所有标注（从内存中读取/从磁盘中读取）的资源都是</u>` 强缓存`
- 统一有后端设置 或 Nginx做配置
- 强缓存的应用场景适合不经常变动的资源请求如：图片、css、js文件、而对于经常更新的资源请求、可以设置304协商缓存做优化