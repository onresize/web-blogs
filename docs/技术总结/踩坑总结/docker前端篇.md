---
title: docker前端篇
lang: zh-CN
feed:
  enable: true
description: docker前端篇
---

# docker前端篇
> 本文作者：[onresize](https://github.com/onresize)

[docker中文指南](https://yeasy.gitbook.io/docker_practice)
<br />
[docker入门实践](https://docker.easydoc.net/)
<br />
[Harbor私服镜像存储仓库](https://goharbor.io/)
<br />
[笔记参考](https://gitee.com/onresize/docker-compose)

> 本文针对前端开发做的一篇docker入门总结

- #### Docker通常用于如下场景：
  - 将项目通过  `docker` 的方式部署到测试、预演、生产环境中
  - web应用的自动化打包和发布；
  - 自动化测试和持续集成、发布；

- #### Docker系统有两个程序：
- docker服务端和docker客户端。其中docker服务端是一个服务进程，管理着所有的容器。docker客户端则扮演着docker服务端的远程控制器，可以用来控制docker的服务端进程。大部分情况下，docker服务端和客户端运行在一台机器上。

- #### 安装 Docker Desktop
- 这里以 `windows` 为例： 
[桌面版](https://www.docker.com/products/docker-desktop)
- 安装好后、启动程序如果一直转圈显示启动引擎中、在对应的c盘下找到 `\用户\AppData\Roaming\Docker\settings.json` 文件、将 `useWindowsContainers`改为 `false`

- #### windows上 [Docker Desktop汉化](https://github.com/hongmengshikong/DockerDesktopChinese)

- #### 前端用docker打包脚手架项目dist镜像
1.根目录下创建 `Dockerfile` 文件、配置如下：
```bash
# nginx打包
FROM nginx:1.22.1
EXPOSE 80

# 替换服务器上的nginx默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html

# 将根目录打包好的buildBundle（默认是dist）文件夹下的所有文件复制到服务器下的指定目录
COPY ./buildBundle /usr/share/nginx/html

# 运行
CMD ["nginx", "-g", "daemon off;"]
```
2.根目录下创建 `nginx.conf` 文件、用于替换线上的 nginx 配置 
```bash
server {
  listen 80;
  listen [::]:80;
  server_name localhost;

  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
    index index.html index.htm;
  }

  # 配置反向代理
  location /api {
    add_header Cache-Control no-cache;
    add_header Pragma no-cache;
    add_header Expires 0;
    proxy_pass https://mock.mengxuegu.com/mock/62abda3212c1416424630a45;
  }

  error_page 404 /404.html;

  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }
}
```
3.在项目根目录下执行先打包成dist、再去执行 `docker build -t react-ts-vite-admin:1.0.0 .` 注意最后有个点、-t后面是`镜像名字:版本号`、打包好镜像后、可以在docker desktop的镜像中查看、也可以使用命令：`docker images` 查看

4.在docker desktop的镜像中点击右侧的start、设置对应的名字和端口号、之后会自动新建一个容器并运行nginx、在容器中就能看到详情、这个时候本地浏览器就能访问 `http://localhost:设置的端口号`、如下图：

<p align="center">
  <img src="/AA_mdPics/docker1.png">
</p>

- #### 发布到[docker hub镜像存储库](https://hub.docker.com/)
  - 先去docker hub注册账号
  - 第一次登录使用： `docker login -u <你的docker hub的用户名>`、接着输入密码、成功登录会显示Login Succeeded字样
  - 新建一个tag：`docker tag react-ts-vite-admin:1.0.0 onresize/react-ts-vite-admin:1.0.0`、这里react-ts-vite-admin:1.0.0是我本地的镜像、onresize/react-ts-vite-admin:1.0.0是要发布到docker hub的tag名称、根据实际替换
  - 推送到docker hub上： `docker push onresize/react-ts-vite-admin:1.0.0`
  - docker hub公开存储库后、别人就能用 `docker pull onresize/react-ts-vite-admin` 去拉取你的镜像运行、环境和你本地是一致的
  - 更新镜像可以通过 `docker push onresize/react-ts-vite-admin:tagname`、tagname换成指定的版本号、也可以通过docker desktop里面push更新

<p align="center">
  <img src="/AA_mdPics/dockhub.png">
</p>

代码示例：[react-ts-vite-admin](https://github.com/onresize/react-ts-vite-admin)

- #### 发布到[github packages](https://github.com/features/packages)
- 先去设置github的token、在账户设置里面:『Github头像』->『Settings』->『Developer Settings』->『Personal access tokens』、选择 Tokens (classic)、至少勾选 `read:packages` 和 `write:packages` 权限
- `执行以下命令`：
- 1.登入： `docker login ghcr.io -u github用户名 -p 刚才获取的token`
- 2.给镜像添加标签：`docker tag 镜像id ghcr.io/github用户名/镜像名:latest`、这里镜像id可以通过 `docker images` 查看
- 3.发布到github packages：`docker push ghcr.io/github用户名/镜像名:latest`、latest为最新版本、也可自行设置版本号
- 4.查看：访问 `https://github.com/github用户名?tab=packages`

- #### Docker-Compose
 - Docker-Compose 可以将多个服务集合到一起运行
 - 安装了docker desktop桌面端、就不需要再额外安装、内部已经包含了
 - 运行docker desktop后、终端输入 `docker-compose` 验证是否安装
 - 常用命令：
> 以下命令都需要在docker-compose.yml同级目录下运行
```bash
# 构建镜像
docker-compose build

# 构建镜像 并 启动镜像、终端命令行不会退出
docker-compose up

# -d表示退出并继续使用命令行
docker-compose up -d

# 查看运行状态
docker-compose ps

# 停止运行
docker-compose stop

# 重启
docker-compose restart

# 重启单个服务
docker-compose restart service-name

# 进入容器命令行
docker-compose exec service-name sh

# 查看容器运行log
docker-compose logs service-name
```

 例如: 同时启动 `node` 服务 和 `mongoDB`数据库服务 `docker-compose.yml` 文件如下：[代码示例](https://gitee.com/onresize/koa-node)
```yml
version: "3.8"

services:
  # mongodb服务
  mongodb:
    image: mongo:4.4.29
    container_name: mongodb
    # 总是会尝试重新启动、自启
    restart: always
    ports:
      - 27017:27017
    volumes:
      # 数据持久化、本地D盘数据地址映射挂载到容器内的 /data/db下、容器删除不会影响数据、数据存储在物理主机的D盘路径下
      - D:/mongoDB/mongodb4.4.29/data/db:/data/db
      
  # node服务
  nodejs:
    build: 
      context: .
      # 指定node程序Dockerfile、根目录下单独新建Dockerfile文件
      dockerfile: Dockerfile
    # 容器名  
    container_name: nodejs
    ports:
      - 3000:3000
    environment:
      # 设置连接mongodb数据库的地址变量、这里第二个mongodb是mongodb服务的容器名
      - MONGO_URL=mongodb://mongodb:27017/react-admin
    # 启动node程序在mongodb镜像启动之后运行  
    depends_on:
      - mongodb
```
 node程序的 `Dockerfile` 文件如下
```yml
# 使用官方的 Node.js 镜像作为基础镜像
FROM node:18.18.0

# 设置工作目录
WORKDIR /app

COPY package.json yarn.lock ./

# 安装 Node.js 依赖
RUN yarn

# 复制应用程序代码到工作目录
COPY . .

# 暴露应用程序运行的端口
EXPOSE 3000

# 运行应用程序的命令
CMD ["yarn", "koa"]
```
node程序中连接mongodb数据库的 `db.js` 文件
```js
const Mongoose = require('mongoose')

// 本地用127.0.0.1、线上用MONGO_URL变量
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/react-admin'
console.log('连接地址：', mongoUrl)
Mongoose.connect(mongoUrl)

Mongoose.connection.on('error', (err) => {
  console.log('连接数据库失败...', err)
})

Mongoose.connection.on('connected', () => {
  console.log('连接数据库成功...')
})

module.exports = Mongoose
```

- 注：当前使用环境如下：
```js
windows10系统
node: v18.18.0
mongo镜像：v4.4.29
mongoose: v8.3.1
```

- 本地操作数据库、mongoDB GUI工具下载地址：[MongoDB Compass](https://www.mongodb.com/try/download/compass)
- MongoDB客户端下载地址：[MongoDB Community Server](https://www.mongodb.com/try/download/community)

- #### 用 `docker-desktop` 拉取官方 `mongo` 镜像并按步骤运行
- 下图步骤2、3分别是mongodb的数据在本地物理机的存储路径、和映射挂载到容器中的路径
<p align="center">
  <img src="/AA_mdPics/docker-compose.min.png" />
</p>

- 本地开发、用 `docker-desktop` 拉取 `mongo` 镜像跑 `mongodb` 服务、用 `MongoDB Compass` 连接服务并操作数据