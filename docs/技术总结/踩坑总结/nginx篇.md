---
title: nginx篇
lang: zh-CN
feed:
  enable: true
description: nginx篇
---

<!-- [[toc]] -->

# nginx 篇

> 本文作者：[onresize](https://github.com/onresize)

`Nginx` 是一个轻量级的 web 服务器 、反向代理服务器及电子邮件（ `IMAP/POP3` ）代理服务器。

### `1.几个概念`

- #### `1.1、正向代理`
- 我们平常访问 google 是不通的，需要花钱买个 VPN，通过这个 VPN 就可以在自己电脑上访问 google、youtube 这样的网站了。这个 VPN 就可以说是我们的正向代理服务器。
- 这时候访问者的身份对 google 来说是隐藏的
<p align="center">
  <img src="/AA_mdPics/zxdl.webp" />
</p>

- #### `1.2、反向代理`
- 反向代理跟正向代理正好相反，正向代理隐藏的是请求者的身份，反向代理隐藏的是服务者的身份
<p align="center">
  <img src="/AA_mdPics/fxdl.webp" />
</p>
- 根据上图，请求会先到达这个反向代理服务器，它会把请求在转发到真正服务器，拿到结果后在返回。

### `2.Nginx 常用指令`

```bash
nginx -s stop       快速关闭Nginx，可能不保存相关信息，并迅速终止web服务。
nginx -s quit       平稳关闭Nginx，保存相关信息，有安排的结束web服务。
nginx -s reload     因改变了Nginx相关配置，需要重新加载配置而重载。
nginx -s reopen     重新打开日志文件。
nginx -c filename   为 Nginx 指定一个配置文件，来代替缺省的。
nginx -t            不运行，而仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件。
nginx -v            显示 nginx 的版本。
nginx -V            显示 nginx 的版本，编译器版本和配置参数。
```

### `3.Nginx 基本配置说明`

::: details
```bash
user nobody;
#启动进程,通常设置成和cpu的数量相等
worker_processes  1;

#全局错误日志及PID文件
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

#工作模式及连接数上限
events {
    #epoll是多路复用IO(I/O Multiplexing)中的一种方式,
    #仅用于linux2.6以上内核,可以大大提高nginx的性能
    use   epoll;

    #单个后台worker process进程的最大并发链接数
    worker_connections  1024;

    # 并发总数是 worker_processes 和 worker_connections 的乘积
    # 即 max_clients = worker_processes * worker_connections
    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么
    # 为什么上面反向代理要除以4，应该说是一个经验值
    # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000
    # worker_connections 值的设置跟物理内存大小有关
    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数
    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右
    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：
    # $ cat /proc/sys/fs/file-max
    # 输出 34336
    # 32000 < 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内
    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置
    # 使得并发总数小于操作系统可以打开的最大文件数目
    # 其实质也就是根据主机的物理CPU和内存进行配置
    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。
    # ulimit -SHn 65535

}


http {
    #设定mime类型,类型由mime.type文件定义
    include    mime.types;
    default_type  application/octet-stream;
    #设定日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    # sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，
    # 对于普通应用，必须设为 on,
    # 如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，
    # 以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile     on;
    # tcp_nopush     on;

    # 连接超时时间
    # keepalive_timeout  0;
    keepalive_timeout  65;
    tcp_nodelay     on;

    # 开启gzip压缩
    gzip  on;
    gzip_disable "MSIE [1-6].";

    # 设定请求缓冲
    client_header_buffer_size    128k;
    large_client_header_buffers  4 128k;


    # 设定虚拟主机配置
    server {
        # 侦听80端口
        listen    80;
        # 定义使用 www.nginx.cn访问
        server_name  www.nginx.cn;

        # 定义服务器的默认网站根目录位置
        root html;

        # 设定本虚拟主机的访问日志
        access_log  logs/nginx.access.log  main;

        # 默认请求
        location / {
            # 定义首页索引文件的名称
            index index.php index.html index.htm;

        }

        # 定义错误提示页面
        error_page   500 502 503 504 /50x.html;
        location = /50x.html {
        }

        # 静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
            # 过期30天，静态文件不怎么更新，过期可以设大一点，
            # 如果频繁更新，则可以设置得小一点。
            expires 30d;
        }

        # PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
        location ~ .php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include fastcgi_params;
        }

        # 禁止访问 .htxxx 文件
            location ~ /.ht {
            deny all;
        }

    }
}
```
:::

- ### `location 匹配规则`

#### 2.1、location 匹配命令：

- `~`：波浪线表示执行一个正则匹配，区分大小写
- `~*`：表示执行一个正则匹配，不区分大小写
- `^~`：^~表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
- `=` ：进行普通字符精确匹配
- `@` ："@" 定义一个命名的 location，使用在内部定向时，例如 error_page, try_files

#### 2.2、location 匹配的优先级(与 location 在配置文件中的顺序无关)

- `=`：精确匹配会第一个被处理。如果发现精确匹配，nginx 停止搜索其他匹配。
  普通字符匹配，正则表达式规则和长的块规则将被优先和查询匹配，也就是说如果该项匹配还需去看有没有正则表达式匹配和更长的匹配。
- `^~`：则只匹配该规则，nginx 停止搜索其他匹配，否则 nginx 会继续处理其他 location 指令。
  最后匹配理带有"~"和"~\*"的指令，如果找到相应的匹配，则 nginx 停止搜索其他匹配；当没有正则表达式或者没有正则表达式被匹配的情况下，那么匹配程度最高的逐字匹配指令会被使用。

#### 2.3、location 优先级官方文档

- `=` 前缀的指令严格匹配这个查询。如果找到，停止搜索。
- 所有剩下的常规字符串，最长的匹配。如果这个匹配使用^〜前缀，搜索停止。
- 正则表达式，在配置文件中定义的顺序。
- 如果第 3 条规则产生匹配的话，结果被使用。否则，使用第 2 条规则的结果。

例如：

```bash
location  = / {
  # 只匹配"/".
  [ configuration A ]
}

location  / {
  # 匹配任何请求，因为所有请求都是以"/"开始
  # 但是更长字符匹配或者正则表达式匹配会优先匹配
  [ configuration B ]
}

location ^~ /images/ {
  # 匹配任何以 /images/ 开始的请求，并停止匹配 其它location
  [ configuration C ]
}

location ~* .(gif|jpg|jpeg)$ {
  # 匹配以 gif, jpg, or jpeg结尾的请求.
  # 但是所有 /images/ 目录的请求将由 [Configuration C]处理.
  [ configuration D ]
}
```

- ### `全局变量`
- `$args` ： 这个变量等于请求行中的参数，同`$query_string`
- `$content_length` ： 请求头中的`Content-length`字段
- `$content_type` ： 请求头中的`Content-Type`字段
- `$document_root` ： 当前请求在`root`指令中指定的值
- `$host` ： 请求主机头字段，否则为服务器名称
- `$http_user_agent` ： 客户端`agent`信息
- `$http_cookie` ： 客户端`cookie`信息
- `$limit_rate` ： 这个变量可以限制连接速率
- `$$request_filename` ： 客户端请求的动作，通常为`GET`或`POST`
- `$remote_addr` ： 客户端的`IP`地址
- `$remote_port` ： 客户端的端口
- `$remote_user` ： 已经经过`Auth Basic Module`验证的用户名
- `$request_filename` ： 当前请求的文件路径，由`root`或`alias`指令与 URI 请求生成
- `$scheme` ： `HTTP`方法（如`http`，`https`）
- `$server_protocol` ： 请求使用的协议，通常是`HTTP/1.0`或`HTTP/1.1`
- `$server_addr` ： 服务器地址，在完成一次系统调用后可以确定这个值
- `$server_name` ： 服务器名称
- `$server_port` ： 请求到达服务器的端口号
- `$request_uri` ： 包含请求参数的原始 URI，不包含主机名，如`/foo/bar.php?arg=baz`
- `$uri` ： 不带请求参数的当前`URI`，`$uri`不包含主机名，如`/foo/bar.html`
- `$document_uri` ： 与`$uri`相同
- 假设请求为http://www.qq.com:8080/a/b/c.php，则:

```bash
$host：www.qq.com
$server_port：8080
$request_uri：http://www.qq.com:8080/a/b/c.php
$document_uri：/a/b/c.php
$document_root：/var/www/html
$request_filename：/var/www/html/a/b/c.php
```

- ### `主机名（server_name）匹配`
- 从上到下的优先级为从高到低

1. 明确的 `server_name` 名称，如 `www.qq.com`
2. 前缀通配符，如`*.qq.com` 或 `. qq.com`
3. 后缀通配符，如 `www.qq.*`
4. 正则表达式，如 `~[a-z]+\.qq\.com`

- ### `Location查找规则`
- 从上到下的优先级为从高到低

1. 等号类型，精确匹配，如 `location = / {}`
2. `^~` 类型，前缀匹配，不支持正则，如 `location ^~ /user {}`
3. `~` 和 `~*` 类型，正则匹配， `~` 区分大小写， `~*` 不区分大小写，如 `location ~ ^/user {}`
4. 常规字符串匹配类型，如 `location / {}` 或 `location /user {}`

- ### `Try_files规则`

```bash
try_files $uri $uri/ /index.php
```

假设请求为`http://www.qq.com/test`，则$uri 为 test

1. 查找 `/$root/test` 文件
2. 查找 `/$root/test/` 目录
3. 发起 `/index.php` 的内部"子请求"

- ### `Rewrite规则`

```bash
rewrite ^/images/(.*).(png|jpg|gif)$ /images?name=$1.$4 last;
```

- 上面的 `rewrite` 规则会将文件名改写到参数中
- `last` : 相当于`Apache`的标记，表示完成`rewrite`
- `break` : 停止执行当前虚拟主机的后续`rewrite`指令集
- `redirect` : 返回`302`临时重定向，地址栏会显示跳转后的地址
- `permanent` : 返回`301`永久重定向，地址栏会显示跳转后的地址

### `4.Nginx 配置实战`

#### `3.1、http 反向代理配置`

- 完成一个 http 反向代理。
- `注：conf / nginx.conf 是 nginx 的默认配置文件。你也可以使用 nginx -c 指定你的配置文件`
- <b>nginx.conf 配置如下：</b>

::: details
```bash
# 运行用户
# user somebody;

# 启动进程,通常设置成和cpu的数量相等
worker_processes 1;

# 全局错误日志
error_log D:/Tools/nginx-1.10.1/logs/error.log;
error_log D:/Tools/nginx-1.10.1/logs/notice.log notice;
error_log D:/Tools/nginx-1.10.1/logs/info.log info;

# PID文件，记录当前启动的nginx的进程ID
pid D:/Tools/nginx-1.10.1/logs/nginx.pid;

# 工作模式及连接数上限
events {
  worker_connections 1024; # 单个后台worker process进程的最大并发链接数
}

# 设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
  # 设定mime类型(邮件支持类型),类型由mime.types文件定义
  include D:/Tools/nginx-1.10.1/conf/mime.types;
  default_type application/octet-stream;

  # 设定日志
  log_format main '[$remote_addr] - [$remote_user] [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';

  access_log D:/Tools/nginx-1.10.1/logs/access.log main;
  rewrite_log on;

  # sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，
  # 必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.
  sendfile on;
  # tcp_nopush     on;

  # 连接超时时间
  keepalive_timeout 120;
  tcp_nodelay on;

  # gzip压缩开关
  # gzip  on;

  #设定实际的服务器列表
  upstream zp_server1 {
    server 127.0.0.1:8089;
  }

  # HTTP服务器
  server {
    # 监听80端口，80端口是知名端口号，用于HTTP协议
    listen 80;

    # 定义使用www.xx.com访问
    server_name www.helloworld.com;

    # 首页
    index index.html

    # 指向webapp的目录
    root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp;

    # 编码格式
    charset utf-8;

    # 代理配置参数
    proxy_connect_timeout 180;
    proxy_send_timeout 180;
    proxy_read_timeout 180;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarder-For $remote_addr;

    # 反向代理的路径（和upstream绑定），location 后面设置映射的路径
    location / {
      proxy_pass http://zp_server1;
    }

    # 静态文件，nginx自己处理
    location ~ ^/(images|javascript|js|css|flash|media|static)/ {
      root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp\views;
      # 过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
      expires 30d;
    }

    # 设定查看Nginx状态的地址
    location /NginxStatus {
      stub_status on;
      access_log on;
      auth_basic "NginxStatus";
      auth_basic_user_file conf/htpasswd;
    }

    # 禁止访问 .htxxx 文件
    location ~ /\.ht {
      deny all;
    }

    # 错误处理页面（可选择性配置）
    # error_page   404              /404.html;
    # error_page   500 502 503 504  /50x.html;
    # location = /50x.html {
    #     root   html;
    # }
  }
}

```
:::

好了，让我们来试试吧：

1. `启动 webapp，注意启动绑定的端口要和 nginx 中的 upstream 设置的端口保持一致。`
2. `更改 host：在 C:\Windows\System32\drivers\etc 目录下的 host 文件中添加一条 DNS 记录`

```bash
127.0.0.1 www.helloworld.com
```

3. `启动前文中 startup.bat 的命令`
4. `在浏览器中访问 www.helloworld.com，不出意外，已经可以访问了。`

#### `3.2、负载均衡配置`

- 上一个例子中，代理仅仅指向一个服务器。
- 但是，网站在实际运营过程中，多半都是有多台服务器运行着同样的 app，这时需要使用负载均衡来分流。
- nginx 也可以实现简单的负载均衡功能。
- 假设这样一个应用场景：将应用部署在 `192.168.1.11:80` 、 `192.168.1.12:80` 、 `192.168.1.13:80` 三台 linux 环境的服务器上。网站域名叫 www.helloworld.com，公网 IP 为 `192.168.1.11` 。- 在公网 IP 所在的服务器上部署 nginx，对所有请求做负载均衡处理。
- <b>nginx.conf 配置如下：</b>

::: details
```bash
http {
  #设定mime类型,类型由mime.type文件定义
  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  #设定日志格式
  access_log /var/log/nginx/access.log;

  #设定负载均衡的服务器列表
  upstream load_balance_server {
    #weigth参数表示权值，权值越高被分配到的几率越大
    server 192.168.1.11:80 weight=5;
    server 192.168.1.12:80 weight=1;
    server 192.168.1.13:80 weight=6;
  }

  #HTTP服务器
  server {
    #侦听80端口
    listen 80;

    #定义使用www.xx.com访问
    server_name www.helloworld.com;

    #对所有请求进行负载均衡请求
    location / {
      #定义服务器的默认网站根目录位置
      root /root;
      #定义首页索引文件的名称
      index index.html index.htm;
      #请求转向load_balance_server 定义的服务器列表
      proxy_pass http://load_balance_server;

      # 以下是一些反向代理的配置(可选择性配置)
      # proxy_redirect off;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
      proxy_set_header X-Forwarded-For $remote_addr;
      # nginx跟后端服务器连接超时时间(代理连接超时)
      proxy_connect_timeout 90;
      # 后端服务器数据回传时间(代理发送超时)
      proxy_send_timeout 90;
      # 连接成功后，后端服务器响应时间(代理接收超时)
      proxy_read_timeout 90;
      # 设置代理服务器（nginx）保存用户头信息的缓冲区大小
      proxy_buffer_size 4k;
      # proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
      proxy_buffers 4 32k;
      # 高负荷下缓冲大小（proxy_buffers*2）
      proxy_busy_buffers_size 64k;
      # 设定缓存文件夹大小，大于这个值，将从upstream服务器传
      proxy_temp_file_write_size 64k;

      # 允许客户端请求的最大单文件字节数
      client_max_body_size 10m;
      # 缓冲区代理缓冲用户端请求的最大字节数
      client_body_buffer_size 128k;
    }
  }
}
```
:::

#### `3.3、网站有多个 webapp 的配置`

- 当一个网站功能越来越丰富时，往往需要将一些功能相对独立的模块剥离出来，独立维护。这样的话，通常，会有多个 webapp。
- 举个例子：假如 www.helloworld.com 站点有好几个 webapp，finance（金融）、product（产品）、admin（用户中心）。访问这些应用的方式通过上下文(context)来进行区分:
  `www.helloworld.com/finance/`&nbsp;
  `www.helloworld.com/product/`&nbsp;
  `www.helloworld.com/admin/`

我们知道，http 的默认端口号是 80，如果在一台服务器上同时启动这 3 个 webapp 应用，都用 80 端口，肯定是不成的。所以，这三个应用需要分别绑定不同的端口号。
那么，问题来了，用户在实际访问 www.helloworld.com 站点时，访问不同 webapp，总不会还带着对应的端口号去访问吧。所以，你再次需要用到反向代理来做处理。
配置也不难，来看看怎么做吧：

```bash
http {
  # 此处省略一些基本配置

  upstream product_server {
    server www.helloworld.com:8081;
  }

  upstream admin_server {
    server www.helloworld.com:8082;
  }

  upstream finance_server {
    server www.helloworld.com:8083;
  }

  server {
    # 此处省略一些基本配置
    # 默认指向product的server
    location / {
      proxy_pass http://product_server;
    }

    location /product/ {
      proxy_pass http://product_server;
    }

    location /admin/ {
      proxy_pass http://admin_server;
    }

    location /finance/ {
      proxy_pass http://finance_server;
    }
  }
}

```

#### `3.4、https 反向代理配置`

- 一些对安全性要求比较高的站点，可能会使用 HTTPS（一种使用 ssl 通信标准的安全 HTTP 协议）。
- 这里不科普 HTTP 协议和 SSL 标准。但是，使用 nginx 配置 https 需要知道几点：
- HTTPS 的固定端口号是 443，不同于 HTTP 的 80 端口 SSL 标准需要引入安全证书，所以在 nginx.conf 中你需要指定证书和它对应的 key 其他和 http 反向代理基本一样，只是在 Server 部分配置有些不同。

```bash
 # HTTP服务器
server {
  # 监听443端口。443为知名端口号，主要用于HTTPS协议
  listen 443 ssl;

  # 定义使用www.xx.com访问
  server_name www.helloworld.com;

  # ssl证书文件位置(常见证书文件格式为：crt/pem)
  ssl_certificate cert.pem;
  # ssl证书key位置
  ssl_certificate_key cert.key;

  # ssl配置参数（选择性配置）
  ssl_session_cache shared:SSL:1m;
  ssl_session_timeout 5m;
  # 数字签名，此处使用MD5
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  location / {
    root /root;
    index index.html index.htm;
  }
}
```

#### `3.5、静态站点配置`

- 有时候，我们需要配置静态站点(即 html 文件和一堆静态资源)。
- 举例来说：如果所有的静态资源都放在了 /app/dist 目录下，我们只需要在 nginx.conf 中指定首页以及这个站点的 host 即可。
- 配置如下：

```bash
worker_processes 1;

events {
  worker_connections 1024;
}

http {
  include mime.types;
  default_type application/octet-stream;
  sendfile on;
  keepalive_timeout 65;

  gzip on;
  gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/javascript image/jpeg image/gif image/png;
  gzip_vary on;

  server {
    listen 80;
    server_name static.zp.cn;

    location / {
      root /app/dist;
      index index.html;
      # 转发任何请求到 index.html
    }
  }
}
```

- 然后，添加 HOST：
- 127.0.0.1 static.zp.cn
- 此时，在本地浏览器访问 static.zp.cn ，就可以访问静态站点了。

#### `3.6、搭建文件服务器`

- 有时候，团队需要归档一些数据或资料，那么文件服务器必不可少。使用 Nginx 可以非常快速便捷的搭建一个简易的文件服务。
- Nginx 中的配置要点：
  - `将 autoindex 开启可以显示目录，默认不开启。`
  - `将 autoindex_exact_size 开启可以显示文件的大小。`
  - `将 autoindex_localtime 开启可以显示文件的修改时间。`
  - `root 用来设置开放为文件服务的根路径。`
  - `charset 设置为 charset utf-8,gbk;，可以避免中文乱码问题（windows 服务器下设置后，依然乱码，本人暂时没有找到解决方法）。`
- 一个最简化的配置如下：

```bash
# 显示目录
autoindex on;
# 显示文件大小
autoindex_exact_size on;
# 显示文件时间
autoindex_localtime on;
server {
  # windows 服务器下设置后，依然乱码，暂时无解
  charset utf-8,gbk;
  listen 9050 default_server;
  listen [::]:9050 default_server;
  server_name _;
  root /share/fs;
}
```

#### `3.7、跨域解决方案`

- web 领域开发中，经常采用前后端分离模式。这种模式下，前端和后端分别是独立的 web 应用程序，例如：后端是 Java 程序，前端是 React 或 Vue 应用。
- 各自独立的 web app 在互相访问时，势必存在跨域问题。解决跨域问题一般有两种思路：

1. CORS
   在后端服务器设置 HTTP 响应头，把你需要运行访问的域名加入加入 Access-Control-Allow-Origin 中。

2. jsonp
   把后端根据请求，构造 json 数据，并返回，前端用 jsonp 跨域。

- 这两种思路，本文不展开讨论。
- 需要说明的是，nginx 根据第一种思路，也提供了一种解决跨域的解决方案。
- 举例：www.helloworld.com 网站是由一个前端 app ，一个后端 app 组成的。前端端口号为 9000， 后端端口号为 8080。
- 前端和后端如果使用 http 进行交互时，请求会被拒绝，因为存在跨域问题。来看看，nginx 是怎么解决的吧：
- 首先，在 enable-cors.conf 文件中设置 cors ：

```bash
# allow origin list
set $ACAO '*';
# set single origin
if ($http_origin ~* (www.helloworld.com)$) {
  set $ACAO $http_origin;
}
if ($cors = "trueget") {
 add_header 'Access-Control-Allow-Origin' "$http_origin";
 add_header 'Access-Control-Allow-Credentials' 'true';
 add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
 add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
}
if ($request_method = 'OPTIONS') {
  set $cors "${cors}options";
}
if ($request_method = 'GET') {
  set $cors "${cors}get";
}
if ($request_method = 'POST') {
  set $cors "${cors}post";
}
```

接下来，在你的服务器中 include enable-cors.conf 来引入跨域配置：

```bash
# ----------------------------------------------------
# 此文件为项目 nginx 配置片段
# 可以直接在 nginx config 中 include（推荐）
# 或者 copy 到现有 nginx 中，自行配置
# www.helloworld.com 域名需配合 dns hosts 进行配置
# 其中，api 开启了 cors，需配合本目录下另一份配置文件
# ----------------------------------------------------

upstream front_server{
  server www.helloworld.com:9000;
}

upstream api_server{
  server www.helloworld.com:8080;
}

server {
  listen       80;
  server_name  www.helloworld.com;
  location ~ ^/api/ {
    include enable-cors.conf;
    proxy_pass http://api_server;
    rewrite "^/api/(.*)$" /$1 break;
  }
  location ~ ^/ {
    proxy_pass http://front_server;
  }
}
```

### `5.如何开启http2`

::: tip
HTTP2.0 标准中，虽然没有强制提出要使用加密（HTTPS）但是目前主流浏览器，Chrome、Firefox 等都已经公开宣布只支持加密的 HTTP2，所以目前互联网上能见到的 HTTP2 基本都是基于 HTTPS 协议的。所以目前来说，要开启 HTTP2，就必须设置 HTTPS
:::

- #### `前提`
- `注意根据自己实际项目信息修改`
- 项目已经 build、并且已经启动了、https 相关证书已放在`/etc/nginx/cert`目录下

::: details
```bash
# 开启gzip
gzip on;

##
# HTTPS配置
##
#以下属性中，以ssl开头的属性表示与证书配置有关。
server {
  #配置HTTPS的默认访问端口为443。
  #如果未在此处配置HTTPS的默认访问端口，可能会造成Nginx无法启动。
  #如果您使用Nginx 1.15.0及以上版本，请使用listen 443 ssl代替listen 443和ssl on。
  # 默认HTTP 1.1
  # listen 443 ssl;

  # 开启HTTP2
  listen 443 ssl http2;

  #填写证书绑定的域名
  server_name fuxiaochen.com;

  #填写证书文件名称
  ssl_certificate /etc/nginx/cert/fuxiaochen.com.pem;
  #填写证书私钥文件名称
  ssl_certificate_key /etc/nginx/cert/fuxiaochen.com.key;

  ssl_session_timeout 5m;
  #表示使用的加密套件的类型
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  #表示使用的TLS协议的类型，您需要自行评估是否配置TLSv1.1协议。
  ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;

  ssl_prefer_server_ciphers on;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_read_timeout 60;
    proxy_connect_timeout 60;
    proxy_redirect off;

    # Allow the use of websockets
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location /_next/static {
    add_header Cache-Control "public, max-age=3600, immutable";
    proxy_pass http://127.0.0.1:3000/_next/static;
  }
}

##
# HTTP配置
##

server {
  listen 80;
  #填写证书绑定的域名
  server_name fuxiaochen.com;
  #将所有HTTP请求通过rewrite指令重定向到HTTPS。
  rewrite ^(.*)$ https://$host$1;
}
```
:::

### `6.如何开启http3`
```bash
listen 443 ssl http2; # 代表开启HTTP/2
listen 443 quic; # 代表开启HTTP/3
ssl_early_data on; # 开启0-RTT
add_header Alt-Svc 'h3=":443"; ma=86400'; # 通知浏览器可以使用HTTP/3
ssl_protocols TLSv1.3; #HTTP/3需要TLSv1.3支持
 
brotli on; #启用
brotli_comp_level 6; #压缩等级，默认6，最高11，太高的压缩水平可能需要更多的CPU
brotli_min_length 1k; #指定压缩数据的最小长度，只有大于或等于最小长度才会对其压缩。这里指定1k
brotli_types text/plain application/javascript application/x-javascript text/javascript text/css application/xml application/json image/svg application/font-woff application/vnd.ms-fontobject application/vnd.apple.mpegurl image/x-icon image/jpeg image/gif image/png image/bmp; #指定允许进行压缩类型
brotli_static always; #是否允许查找预处理好的、以.br结尾的压缩文件，可选值为on、off、always
brotli_window 512k; #窗口值，默认值为512k
```

### `7.最佳实践`

::: details
```bash
server {
  listen 80;
  server_name test.com;
  resolver 8.8.8.8 # 谷歌的域名解析地址
  charset utf-8; # 防止中文文件名乱码

  # weight=9 表示根据服务器权重、例如：10 次请求中大概 1 次访问到 8888 端口，9 次访问到 8887 端口：
  # 不写weight、则是默认轮询策略
  upstream test.com {
    server 192.168.1.12:8887 weight=9;
    server 192.168.1.13:8888 weight=1;
  }

  # 负载均衡
  location /api {
    proxy_pass http://test.com;
  }

  location / {
    root /usr/local/app/dist; # vue 打包后的文件夹、pc 的 html 路径
    try_files uri uri/ /index.html @rewrites; # 默认目录下的 index.html，如果都不存在则重定向

    # 前端SPA脚手架项目配置 history 模式的刷新空白、上面这种写法做了一些重定向处理
    # try_files $uri $uri/ /index.html;

    expires -1; # 首页一般没有强制缓存
    add_header Cache-Control no-cache;

    if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
      root /usr/local/app/mobile; # mobile 的 html 路径
    }

    index index.html index.htm;
  }

  # 重定向设置
  location @rewrites {
    rewrite ^(.+)$ /index.html break;
  }

  # 反向代理
  # 所有 /api 下的接口访问都代理到本地的 8888 端口
  # 例如你本地运行的 java 服务的端口是 8888，接口都是以 /api 开头
  location /api {
    proxy_pass http://127.0.0.1:8888;
  }

  resolver_timeout 5s; # 设超时时间
  # 正向代理
  location / {
    # 当客户端请求我的时候，我会把请求转发给它
    # host 要访问的主机名 request_uri 请求路径
    proxy_pass http://hostrequest_uri;
  }

  location ~ ^/index.html {
    # 匹配 index.html 页面 除了 127.0.0.1 以外都可以访问
    deny 192.168.1.1;
    deny 192.168.1.2;
    allow all;
  }

  # 所有静态请求都由nginx处理，存放目录为 html
  location ~ \.(gif|jpg|jpeg|png|bmp|swf|css|js) {
    root /usr/local/resource;
    expires 10h; # 设置过期时间为10小时、10d: 10天内访问都走缓存、而不会去请求nginx
  }

  # 图片防盗链
  location ~* \.(gif|jpg|jpeg|png|bmp|swf) {
    valid_referers none blocked server_names ~\.google\. ~\.baidu\. *.qq.com; # 只允许本机 IP 外链引用，将百度和谷歌也加入白名单有利于 SEO
    if (invalid_referer) {
      return 403;
      #  rewrite ^/ http://$host/logo.png;
    }
  }

  # 匹配到对应静态资源、优先级比 '/' 高
  location ^~ /img/ {
    default_type application/octet-stream;
    # 显示出文件的确切大小，单位是bytes
    autoindex_exact_size on;
    alias D:/Nginx/nginx-1.22.1/html/img/;
  }

  # 匹配到mp4资源
  location /mp4 {
    # 关闭目录浏览下载功能(文件自动索引功能)、默认是关闭
    autoindex off;
    add_header Content-Disposition "attachment; filename=$request_uri.mp4";
    add_header Content-Type video/mp4;
    alias D:/Nginx/nginx-1.22.1/html/mp4/;
  }

  # 匹配到m3u8资源
  location /m3u8/ {
    types {
      application/vnd.apple.mpegurl m3u8;
      video/mp2t ts;
    }
    alias D:/Nginx/nginx-1.22.1/html/m3u8/;
  }

  # 静态资源服务器
  location /download {
    alias /usr/share/nginx/static; # 静态资源目录

    autoindex on; # 开启静态资源列目录，浏览目录权限
    autoindex_exact_size off; # on(默认)显示文件的确切大小，单位是byte；off显示文件大概大小，单位KB、MB、GB
    autoindex_localtime off; # off(默认)时显示的文件时间为GMT时间；on显示的文件时间为服务器时间
  }

  # nginx 可以禁止指定的浏览器和爬虫框架访问：
  # http_user_agent 为浏览器标识
  # 禁止 user_agent 为baidu、360和sohu，~*表示不区分大小写匹配
  if (http_user_agent ~* 'baidu|360|sohu') {
    return 404;
  }
  # 禁止 Scrapy 等工具的抓取
  if (http_user_agent ~* (Scrapy|Curl|HttpClient)) {
    return 403;
  }
  # 根据请求类型过滤、非指定请求全返回 403
  if ( request_method !~ ^(GET|POST|HEAD) ) {
    return 403;
  }

  # 根据状态码过滤、当访问出现 502、503 的时候就能返回 50x.html 中的内容、404 返回 404.html的内容
  error_page 404 /404.html;
  error_page 502 503 /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }

  # 访问限制
  location ^~ /a/ {
    root html/;
    index index.html index.htm;
    # allow 允许
    allow 127.0.0.1;
    # deny  拒绝
    deny all;
  }

  # 开启gzip 压缩、搭配前端vite、webpack配置开启 gizp 压缩
  gzip on;

  # 设置gzip所需的http协议最低版本 （HTTP/1.1, HTTP/1.0）
  gzip_http_version 1.1;

  # 设置压缩级别，压缩级别越高压缩时间越长  （1-9）
  gzip_comp_level 4;

  # 设置压缩的最小字节数， 页面Content-Length获取
  gzip_min_length 1000;

  # 设置压缩文件的类型  （text/html)
  gzip_types text/plain application/javascript text/css;

}

server {
  listen 80;
  server_name admin.test.com; # 二级域名

  # 单域名重定向
  # if (host = 'www.sherlocked93.club') {
  #   return 301 https://www.sherlocked93.clubrequest_uri;
  # }

  # 全局非 https 协议时重定向
  if (scheme != 'https') {
    return 301 https://server_namerequest_uri;
  }

  # 或者全部重定向
  # return 301 https://server_name$request_uri;

  location / {
    root /usr/local/app/admin; # 二级域名的 html 路径
    index index.html;
  }
}
```
:::


### `8.一个nginx配置多个项目的几种方式`
- 文件目录如下
```text
-----------------------
|-- html
|  |-- index.html
|  |-- pc
|  |  |-- dist1
|  |  |  |-- index.html
|  |  |-- dist2
|  |  |  |-- index.html
-----------------------
```
- 1. 同ip同端口、不同路径
::: details
```bash
http {
  server {
    # 项目1
    location / {
      root html;
      index index.html index.htm;
    }

    # 项目2
    location /dist1 {
      root html/pc;
      try_files $uri $uri/ /dist1/index.html;
      index index.html index.htm;
    }

    # 项目3
    location /dist2 {
      root html/pc;
      try_files $uri $uri/ /dist2/index.html;
      index index.html index.htm;
    }
  }
}
```
:::

- 2. 同ip、不同端口
::: details
```bash
http {
  server {
    listen 8888;
    server_name localhost;

    location / {
      root html/pc/dist1;
      index index.html index.htm;
    }
  }

  server {
    listen 9999;
    server_name localhost;

    location / {
      root html/pc/dist2;
      index index.html index.htm;
    }
  }
}
```
:::

### `9.vite.config.js与nginx配置代理`
- vite.config配置
```bash
server: {
    port: 9090,
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法
    proxy: {
      "/api": {
        target: "http://xx.xx.xx.x1:8090", //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/web": {
        target: "http://xx.xx.xx.x2:8090", //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/web/, ""),
      },
    },
  },
```

- nginx配置
```bash 
location ^~ /api/ {
	proxy_pass http://xx.xx.xx.x1:8090/api/;  # 转发地址
}
		
location ^~ /web/ {
	proxy_pass http://xx.xx.xx.x2:8090/;  # 转发地址
}
```