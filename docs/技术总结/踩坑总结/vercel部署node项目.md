---
title: vercel部署node项目
lang: zh-CN
feed:
  enable: true
description: vercel部署node项目
---

# vercel部署node项目

> 本文作者：[onresize](https://github.com/onresize)

- `node项目根目录下创建vercel.json文件、代码如下：`
```json
{
    "version": 2,
    "builds": [
        {
            "src": "app.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "app.js"
        }
    ]
}

```
- ### `步骤`
- `1.本地全局安装vercel`
```bash
npm i -g vercel
```

- `2.登录vercel、在node项目路径下终端输入以下命令`
```bash
vercel login
```

- `3.部署到vercel中、部署完成终端会输出预览地址和部署地址`
```bash
vercel
```

- `4.部署到vercel正式环境中`
```bash
vercel --prod
```