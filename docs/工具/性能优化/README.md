---
title: 性能优化
lang: zh-CN
sidebar: false
contributors: false
lastUpdated: false
editLink: false
prev: 
next: 
feed:
  enable: true
description: 性能优化
---

### <p align="center">⚡️⚡️⚡️⚡️⚡️ 持续更新...</p>

### 1️⃣.开启代码文件压缩、gzip压缩和brotli压缩区别?
- <span class="red_span">gzip压缩在http和https协议下都可以正常生效</span>、它不依赖传输协议、只要服务器和客户端都支持gzip压缩、就能生效、需要注意的是、启动gzip压缩、减少了客户端http传输的内容大小提高访问速度、相应的服务器启用了gzip压缩、会增加服务器的cpu占用率和消耗
- 需要服务器 `nginx` 和 `客户端` 都开启才能生效
- brotli压缩相比gzip压缩能更高效的压缩网页中的各类文件大小，提高加载速度、<span class="red_span">需要注意的是brotli压缩要在https协议下才能生效</span>、兼容性方面gzip压缩会更好些
- 验证是否开启了压缩在请求静态资源文件的响应标头中的`Content-Encoding`会显示对应的压缩、gzip 或 br

1.1`nginx.conf`、gzip压缩和brotli压缩可以共存
- nginx开启brotli压缩需要先安装 ngx_brotli 模块
```bash
yum -y install git
#先下载brotli
git clone https://github.com/google/ngx_brotli.git

#进入目录
cd ngx_brotli
# 使用 Git 子模块命令来初始化并更新 ngx_brotli 模块的依赖项：
git submodule update --init
```

```sh
http {
    # 开启gzip 压缩
    gzip on;

    # 设置gzip所需的http协议最低版本 （HTTP/1.1, HTTP/1.0）
    gzip_http_version 1.1;

    # 设置压缩级别，压缩级别越高压缩时间越长  （1-9）
    gzip_comp_level 4;

    # 设置压缩的最小字节数， 页面Content-Length获取
    gzip_min_length 1000;

    # 设置压缩文件的类型  （text/html)
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 启用 Brotli 压缩
    brotli on;

    # 设置 Brotli 压缩级别
    brotli_comp_level 6;

    # 设置启用压缩的最小文件大小
    brotli_min_length 20;

    # 指定要压缩的文件类型
    brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # 配置 Brotli 压缩的缓冲区大小
    brotli_buffers 16 8k;
}
```

1.2`vite.config.js`、需要开启gzip或者brotli压缩任选一种配置
```js
import viteCompression from 'vite-plugin-compression'

export default ({ mode }) =>
  defineConfig({
    plugins: [
      // 压缩
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 默认 false、设置为 true 来禁用压缩
        threshold: 10240, // 只处理大于此大小的资源(单位：字节)、默认为 0
        deleteOriginFile: false, // 压缩后是否删除源文件
        algorithm: 'gzip', // 启动gzip压缩
        ext: '.gz'
        // algorithm: 'brotliCompress', // 启动brotli压缩
        // ext: '.br', // 输出文件扩展名
      })
    ]
  })
```


### 2️⃣.开启http强缓存或协商缓存
<!-- ### 3️⃣.
### 4️⃣.
### 5️⃣.
### 6️⃣.
### 7️⃣.
### 8️⃣.
### 9️⃣.
### 🔟. -->

<style>
  .red_span {
    color: red;
    font-weight: bold;
  }
</style>