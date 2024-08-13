---
title: scp一键部署
lang: zh-CN
feed:
  enable: true
description: scp一键部署
---

> 本文作者：[onresize](https://github.com/onresize)

- 通过scp一键部署到服务器指定目录下 `deploy.js`
```js
const scp = require('scp2')
const ora = require('ora')
const chalk = require('chalk') //设置命令颜色的
const spinner = ora(chalk.blue('正在部署到服务器...')) //显示加载

spinner.start()
scp.scp(
  './dist/',
  {
    host: '127.0.0.0', // 服务器的地址
    port: 22, // 服务器端口， 一般为 22
    username: 'root', // 用户名
    password: 'root123', // 密码
    path: '/export/server/tengine/html/mes/' //服务器存放文件路径
  },
  err => {
    if (!err) {
      console.log(chalk.green(`部署完成!`))
    } else {
      console.log(chalk.red(`部署失败!`))
    }
    spinner.stop()
  }
)
```

- 添加框架脚本 `package.json`
```json
"scripts": {
	"deploy": "node ./scripts/deploy.js",
	"build": "vue-cli-service build --report && npm run deploy",
}
```

- 建议安装的版本
```json
"chalk": "^4.1.2",
"ora": "^5.1.0",
"scp2": "^0.5.0"
```

[更多参考：](https://blog.csdn.net/csdn_yudong/article/details/125722842)