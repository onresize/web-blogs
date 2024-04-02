---
title: ESLint 和 oxlint
lang: zh-CN
feed:
  enable: true
description: ESLint 和 oxlint
---

# ESLint 和 oxlint

> 本文作者：[onresize](https://github.com/onresize)


使用以下命令搭建一个 Vue3 项目：

```bash
npm create vite@latest vue3-project
```

`引入ESLint`

```bash
npm init @eslint/config
```

进入交互式界面，可通过上下方向键选择，通过按回车键确定。

第一个问题是：

- 你希望用`ESLint `来干嘛？
- 我们选择最全面的那个：检查语法，发现问题，并强制统一代码样式

```js
$ npm init @eslint/config
? How would you like to use ESLint? … 
  To check syntax only
  To check syntax and find problems
❯ To check syntax, find problems, and enforce code style
```

第二个问题是：

- 你的项目用的是什么模块系统？
- 因为是运行在浏览器端，选择 `ESModule`

```js
? What type of modules does your project use? … 
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
```

第三个问题是：

- 你用的什么框架？（居然没有 Angular）
- 选择 `Vue`

```js
? Which framework does your project use? … 
  React
❯ Vue.js
  None of these
```

第四个问题是：

- 你是否使用 TypeScript？
- 选择 `Yes`

```js
? Does your project use TypeScript? › No / Yes
```

第五个问题是：

- 你的代码运行在什么环境？（这个可以多选）
- 选择 `Browser` 浏览器环境

```js
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
✔ Node
```

第六个问题是：

- 你想定义怎样的代码风格？
- 选择使用一个流行的代码风格

```js
? How would you like to define a style for your project? … 
❯ Use a popular style guide
  Answer questions about your style
```

第七个问题是：

- 你想使用哪个样式风格？
- `Airbnb` 用的人比较多，就选这个吧

```js
? Which style guide do you want to follow? … 
❯ Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo
```

第八个问题是：

- 配置文件用什么格式？
- 就选 JavaScript 吧（生成 `eslintrc.js` 文件）

```js
? What format do you want your config file to be in? … 
❯ JavaScript
  YAML
  JSON
```

完成！

主要给我们安装了以下依赖：

- `eslint-config-airbnb-base@15.0.0`
- `eslint-plugin-import@2.26.0`
- `eslint-plugin-vue@9.2.0`
- `eslint@8.20.0`
- `@typescript-eslint/parser@5.30.6`
- `@typescript-eslint/eslint-plugin@5.30.6`

并生成了一个 `eslintrc.cjs` 配置文件：

在 `package.json` 文件的 scripts 中配置 lint 脚本命令：

```json
"scripts": {
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "preview": "vite preview",

  // 配置 lint 脚本命令
  "lint": "eslint --ext .vue,.ts src/"
},
```

执行 lint 脚本命令：

```bash
npm run lint
```

出现了一堆报错：

```text
vue3-project/src/App.vue
  4:53  error  Missing semicolon  semi

/vue3-project/src/components/HelloWorld.vue
  2:26  error  Missing semicolon  semi
  4:31  error  Missing semicolon  semi
  6:21  error  Missing semicolon  semi

/vue3-project/src/main.ts
  1:32  error  Missing semicolon  semi
  2:21  error  Missing semicolon  semi
  3:28  error  Missing semicolon  semi
  5:29  error  Missing semicolon  semi

/vue3-project/src/vite-env.d.ts
  4:3   error  Expected 1 empty line after import statement not followed by another import  import/newline-after-import
  4:45  error  Missing semicolon                                                            semi
  5:48  error  Missing semicolon                                                            semi
  6:27  error  Missing semicolon                                                            semi

✖ 12 problems (12 errors, 0 warnings)
  12 errors and 0 warnings potentially fixable with the `--fix` option.
```

大部分都是说句尾没有分号，因为我们选择的是 Airbnb 代码规范，所以会有这个报错提示，不同的代码规范，内置的检查规则不一定完全相同。

在 scripts 中增加自动修复 ESLint 问题的脚本命令：

```json
"scripts": {
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "preview": "vite preview",
  "lint": "eslint --ext .vue,.ts src/",

  // 自动修复 ESLint 问题脚本命令
  "lint:fix": "eslint --ext .vue,.ts src/ --fix"
},
```

执行：

```bash
npm run lint:fix
```

执行自动修复的命令之后，所有分号都加上了，未使用的变量也自动移除了。

再次执行：

```bash
npm run lint
```

没有再报错。

[ESLint文档：](https://eslint.org/)&nbsp;
[oxlint(比Eslint快50~100倍, 开箱即用的默认规则, 不需要大量的自定义规则)](https://oxc-project.github.io/)