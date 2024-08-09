---
title: 项目中npm包打补丁
lang: zh-CN
feed:
  enable: true
description: 项目中npm包打补丁
---

# 项目中npm包打补丁

> 本文作者：[onresize](https://github.com/onresize)

- [面试官：如果一个NPM包部分功能不满足需求，如何修改其部分功能](https://juejin.cn/post/7355383157556019239)

- [如何修改第三方npm包？](https://juejin.cn/post/7356534347509497919)

- 安装 patch-package：
```bash
npm install patch-package postinstall-postinstall --save-dev
```

- 用 npm hook 将应用补丁的步骤添加到 package.json 中的 scripts 字段：
```js
"scripts": {
  "postinstall": "patch-package"
}
```

- 使用 patch-package 生成一个补丁文件。这个命令会比较你对 node_modules 中 axios 的修改，并将这些修改保存为一个补丁文件
- axios依赖下修改代码打补丁
```bash
npx patch-package axios
```