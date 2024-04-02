---
title: npm私服搭建-verdaccio
lang: zh-CN
feed:
  enable: true
description: npm私服搭建-verdaccio
---

# npm私服搭建-verdaccio

> 本文作者：[onresize](https://github.com/onresize)

#### 本地windows安装

```bash
npm i verdaccio -g
```

#### 启动

```js
verdaccio
// 如果安装的时候有路径地址、直接复制这一串路径地址 再enter就能直接启动
// 会默认显示 http://localhost:4873/ 浏览器访问

# 指定开启端口 默认 4873
verdaccio --listen 9999
```

#### 设置npm源

```bash
npm adduser前需要切成这个私服的源才能publish发布包、 这里使用 nrm 添加这个私服的源
npm i -g nrm
nrm -v
nrm current // 当前源
nrm del cnpm // 删除cnpm源
nrm add ltnpm http://localhost:4873 // 添加 ltnpm源、地址为http://localhost:4873
nrm use ltnpm // 切换ltnpm源
nrm ls // 查看已安装的源
  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
* taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
```

```js
切换好源之后执行： npm adduser --registry http://localhost:4873/
设置好账户密码：我这里设置如下图
 账号：yzw
 密码：yzw123
 邮箱：2069814988@qq.com

# 指定安装源
npm install --registry http://localhost:4873

# 从本地仓库删除包
npm unpublish <package-name> --registry http://localhost:4873
```

![](/AA_mdPics/code0015.png)

```js
添加成功之后在需要发布的项目里执行：npm publish --registry http://localhost:4873/ 
```

```js
PS: 项目推送前、项目里的 package.json 每次需要手动修改 version版本、并且确保 private 为 false
"version": "0.1.1",
"private": false,
```

[视频参考](https://www.bilibili.com/video/BV1YY411v7Fq/)

[verdaccio文档](https://verdaccio.org/docs/what-is-verdaccio)

#### 如果想要用ip地址访问

```js
这里是windows本地安装的verdaccio、打开 C:\Users\Administrator\.config\verdaccio\config.yaml 文件
找到 listen相关的、把 - 0.0.0.0:4873 注释解开即可用ipv4地址访问
如果是线上Linux服务器则用： vim conf/config.yaml 进去编辑

ps: 这里切换成ip地址、npm源也得重新出创建、再重新adduser、publish
```

![](/AA_mdPics/code0016.png)

```text
npm私服就是切换了一个npm仓库、当源地址是私服的时候、可以进行离线(局域网下能直接访问)下载npm包
想要安装外网的包、把npm切换官方的源地址即可
```

