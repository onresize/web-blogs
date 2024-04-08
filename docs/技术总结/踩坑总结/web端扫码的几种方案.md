---
title: web端扫码的几种方案
lang: zh-CN
feed:
  enable: true
description: web端扫码的几种方案
---

# web端扫码的几种方案

> 本文作者：[onresize](https://github.com/onresize)


### `http短轮询请求`
- 比如某信公众号的网页扫码登录, 通过不断间隔时间的请求来检测扫码状态
<p align="center">
<img src="/AA_mdPics/wxgz.png" />
</p>

### `长轮询`
- http请求发出去后, 一般会给服务器一定的时间去响应, 比如：30秒, 那么在这30秒内只要服务器收到了扫码请求, 就会立马返回给客户端网页, 如果超时那就立马发送系啊一次请求, 这样减少了http请求个数, 大部分情况, 用户都会在某个30秒区间内做扫码操作, 所以响应也是及时的
- 比如某度网盘的网页扫码登录
<p align="center">
<img src="/AA_mdPics/bdwp.png" />
</p>

### `websocket方案`
- 双向通信

### `SSE方案`
SSE：单向通信、只能服务端向客户端推送消息、因为流的本质上是下载
与`websocket`区别有以下几点不同：
 - SSE是http协议、websocket是单独的ws协议
 - SSE是单向传输、只能服务端向客户端推送、wesocket是双向的
 - SSE支持断点续传、websocket需要自己实现
 - SSE支持发送自定义类型
总体对比：websocket更强大、更灵活

##### SSE优点：
 - http协议、所有服务器软件都支持
 - 轻量化、使用简单
 - 默认支持断线重连
 - SSE一般用来传送文本、二进制数据需要编码后传送、websocket默认支持传送二进制数据
 - SSE支持自定义发送消息类型

##### SSE适合的场景：
 - 客户端接收实时通知、警报、服务器监控状态、日志信息等、chatGPT有用到这种技术

##### PS:
 - http请求头必须是 `Content-Type: text/event-stream`
 - 必须建立TCP长连接、即 `Connection：keep-alive`