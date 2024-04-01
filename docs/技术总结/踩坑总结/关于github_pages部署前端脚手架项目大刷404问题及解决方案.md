---
title: 关于github_pages部署前端脚手架项目大刷404问题及解决方案
lang: zh-CN
feed:
  enable: true
description: 关于github_pages部署前端脚手架项目大刷404问题及解决方案
---
# 关于github_pages部署前端脚手架项目大刷404问题及解决方案
>
> 本文作者：[onresize](https://github.com/onresize)
>

- #### `问题描述`
```text
当通过vite/webpack打包好后、通过github actions去自动部署github pages,
生成的域名后面默认会带上仓库名的路径, 不管脚手架项目用 history 还是 hash 路由模式,
通过流水线去自动 build --> deploy 生成的 github pages 访问链接、除了主页, 其他路由都会
在浏览器大刷的情况下访问404
```

- #### `解决思路`
```text
这里是针对 github actions 部署 github pages 的方式, 正常项目通常通过 nginx 去做 try_files 配置
思路如下：
通过流水线任务, 在 build 之后, copy一份入口 index.html 文件重命名为 404.html
这样当浏览器大刷的情况下, 实际访问 404.html 同样达到访问入口文件一样的效果
```

- #### `github actions自动部署任务如下`
```yml
name: Deploy React-project site to Pages

on:
  push:
    branches: [master] # 本地push执行

  workflow_dispatch: # 仓库手动点击执行

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Not needed if lastUpdated is not enabled
      # - uses: pnpm/action-setup@v3 # Uncomment this if you're using pnpm
      # - uses: oven-sh/setup-bun@v1 # Uncomment this if you're using Bun
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18 # 指定node版本、精确版本例如： 18.18.0
          cache: yarn # or pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: 执行安装依赖
        run: yarn # or pnpm install / yarn install / bun install
      - name: 执行打包 🔧
        run: yarn build:tsc # or pnpm build / yarn build / bun run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./buildBundle # 打包文件为buildBundle

  # Deployment job
  deploy:
    environment:
      name: github-pages 🚀
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```
- ### `在流水线执行打包任务 yarn build:tsc 的时候, 项目中执行了一个自定义的 copyfile 的node脚本如下`
```json
	"scripts": {
		"preinstall": "npx npm-only-allow@latest --PM yarn",
		"dev": "vite",
		"build:lint": "npm run lint-fix && vite build --mode production",
		"build:tsc": "tsc && vite build --mode production && npm run copyfile",
		"copyfile": "node ./script/build-copy.mjs",
	},
```
```js
import fs from "fs";
import chalk from "chalk";

// 将buildBundle下的入口文件, 复制并重命名为404.html
fs.copyFileSync("buildBundle/index.html", "buildBundle/404.html"); 
console.log(chalk.green("copy successfully!"));
```
[实践过程：](https://github.com/onresize/react-ts-vite-admin/issues/13#issuecomment-2028547442)