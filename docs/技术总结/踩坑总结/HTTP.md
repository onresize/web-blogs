---
title: HTTP
lang: zh-CN
feed:
  enable: true
description: HTTP
---

# HTTP

> 本文作者：[onresize](https://github.com/onresize)


### `http1.0 和 http1.1 的区别`
- 连接方式: http1.0为短连接, http1.1支持持久化连接, 浏览器每次请求都要与服务器建议一个TCP连接, 默认开启, 如果浏览器没有断开操作, TCP连接就会一直保持
- 状态响应码: http1.1中加入了大量状态码
- 缓存处理: http1.0中主要使用header中的`If-Modified-Since,Expires`来作为缓存判断的标准, http1.1则引入更多的缓存策略如： `Entity tag, If-Unmodified-Since, If-Match, If-None-Match`
- 带宽优化: http1.0中, 存在一些浪费带宽的现像, 例如客户端只需要某个对象的一部分, 而服务器却将整个对象返回过来, 并且不支持断点续传, http1.1则在请求头引入`range`字段, 它可以允许请求资源的某个部分
- host处理: http1.1在请求头中加入了`host`字段

### `http2.0 的主要变化`
[[ 如何开启http2.0? ]](/web-blogs/技术总结/踩坑总结/nginx篇.html#_5-如何开启http2)
- #### 二进制格式
- http1.x中使用的是`明文`协议, 他的主要格式分为三部分(请求头, 消息主体, 状态行), 因为这种协议解析是基于文本的,  存在多样性缺陷, 所以http2.0决定采用二进制格式
- #### 头部压缩
- http1.x中, 消息主体可以通过 gzip 压缩, 但是请求头和状态行没办法进行压缩, 这样会造成不必要的带宽浪费, 所以在http2.0中引入了头部压缩技术
- #### 多路复用
- 浏览器在同域名的限制下, 最多同时建立6个TCP连接, 如果其中一个请求响应卡住了, 那么就会导致后面的请求一直待响应, 造成阻塞, http2.0中就用到了多路复用的技术, 所有的请求都是通过一个TCP连接来并发完成的
- #### http2.0 的缺陷
- http2.0最惊艳的就是多路复用, 虽然有种种好处, 但是他是建立在TCP连接的基础上, 在连接频繁的情况下, 有可能会对TCP连接造成压力, 很容易造成性能瓶颈

### `http3.0`
[[ 如何开启http3.0? ]](/web-blogs/技术总结/踩坑总结/nginx篇.html#_6-如何开启http3)
- #### QUIC 协议：

- QUIC协议是基于`UDP`的传输协议的, 这种传输协议相对`TCP`来说要好一些, QUIC有在UDP协议上做优化, UDP协议一直以来定位都是不可靠连接, 会出现丢包的可能性比较高

#### 总结 http2.0 和 http3.0 的异同点

  | 特性         | HTTP2              | HTTP3         |
  | ------------ | :----------------- | ------------- |
  | 传输层协议   | TCP                | 基于UDP的QUIC |
  | 默认加密     | 否                 | 是            |
  | 独立的数据流 | 否                 | 是            |
  | 队头阻塞     | 存在TCP对头阻塞    | 无            |
  | 报头压缩     | HPACK              | QPACK         |
  | 握手时延迟   | TCP+TLS 的 1-3 RTT | 0-1 RTT       |
  | 连接迁移     | 无                 | 有            |
  | 服务器推送   | 有                 | 有            |
  | 多路复用性   | 有                 | 有            |
  | 流量控制     | 有                 | 有            |
  | 数据重传     | 有                 | 有            |
  | 拥塞控制     | 有                 | 有            |

### `浏览器输入域名后的域名解析过程`  
  - 当浏览器输入域名时、浏览器会先去解析域名、获取对应的ip地址、再去向这个ip发送请求
  - 浏览器解析域名时、会先在本机上的hosts文件查找、如果找到了、就会向hosts文件中对应的ip地址发送请求
  - 如果hosts文件找不到、就会向DNS发出域名解析的请求、再向DNS返回的ip地址发出请求
- ##### 例：phpStudy开启nginx服务下创建的一个 `www.baidu.com` 的网站、如下图：
<p align="center">
  <img src="/AA_mdPics/server.min.png" />
</p>

- hosts文件下 `www.baidu.com` 自动对应了 `127.0.0.1` 这个ip
<p align="center">
  <img src="/AA_mdPics/host.min.png" />
</p>

- edge打开 `www.baidu.com` 的效果（注：不要挂梯子）
<p align="center">
  <img src="/AA_mdPics/edge.min.png" />
</p>

- 常用场景：客户端主机hosts文件添加对应的ip、自定义的域名映射关联、去访问内网网站
- 总之：hosts文件主要用于自定义域名和ip地址之间的映射关系、比如：本地开发用域名测试联调、没有添加ip映射的主机起到网站屏蔽作用