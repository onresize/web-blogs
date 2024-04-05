---
title: import和require自动导入总结
lang: zh-CN
feed:
  enable: true
description: import和require自动导入总结
---

# import和require自动导入总结

> 本文作者：[onresize](https://github.com/onresize)


[关于浅析export * from 与 export { default } from用法](https://blog.csdn.net/weixin_43131046/article/details/124248280)


- #### `vue2 script代码抽离`
```vue
// 主页面 index.vue
<template>
...
</template>

<script>
// export { default } from "./index.js";
export { renderScript as default } from "./index.js";
</script>
```

```js
// 抽离的script文件 index.js
// export default = {methods() {}}
export const renderScript = {
    data() {
        return {}
    },
    methods() {},
}
```

### `1.require`

```js
// 导出、a.js
exports.str = '暴露的属性'
fucntion test() { }

module.exports = { test }
```

```js
// 导入
const { test, str } = require('./a.js')
```

### `2.import`

```js
// 导出、b.js
export function test() { }
export default function() { }
export const name = 'zs'
```

```js
import _, { test, name } from './b.js' // default优先级更高、不能颠倒顺序
```

### `3.require 和 import区别`
- require是浅拷贝：修改会影响到原数据，import是引用：基本类型修改不会影响原数据、但是对象修改属性会影响
- 两者性能import较高
- 导入require 对应导出为 exports/module.exports (CommonJs标准)、导入import对应的export (ES标准)
- import为异步加载、require为同步加载
- 在一个文件模块中、export import可以有多个、export default仅有一个
- export方式导出、导入时要加{}、export default不需要

### `4.require方式的统一导出`

```js
module.exports = {
  sm2: require('./sm2/index'),
  sm3: require('./sm3/index'),
  sm4: require('./sm4/index'),
}
```

### `5.import 方式及统一导出`

```js
import A from './a'
import B from './b'

export { A, B }

相当于如下

export { default as A } from './a'
export { default as B } from './b'
```



### `6.require.context  和  import.meta.globEager 两种方式的自动导入`

```js
require.context('@/components/view', false, /\.vue$/)
// require.context()返回的是一个webpack上下文环境、本质是一个函数、有id、keys、resolve属性

// 语法：
require.context(directory, useSubdirectories, regExp)
1.directory： 检索目录
2.useSubdirectories： 是否检索子文件夹、方法默认的值为false
3.regExp：匹配文件正则表达式

// 应用场景： 常用来组件内引入多个组件
```

- #### `webpack项目使用 require.context 自动导入, main.js 代码示例：`

```js
import Vue from 'vue'
const requireComponents = require.context('../views/components', true, /\.vue/)
// requireComponents.keys()返回的是对应正则匹配那些文件的路径组成的数组、例：
[
    "./array/arrayEqual.js",
    "./object/deepClone.js",
    "./object/isEmptyObject.js",
    "./object/isPlainObject.js"
]

requireComponents.keys().forEach(fileName => {
  // 组件实例
  const reqCom = requireComponents(fileName)
  // 截取路径作为组件名
  const reqComName =reqCom.name|| fileName.replace(/\.\/(.*)\.vue/,'$1')
  Vue.component(reqComName, reqCom.default || reqCom)
})
```



- #### `当使用vite时, 使用 import.meta.glob 自动导入`

```js
// require 自动导入实现
const files = require.context('.', false, /\.ts$/);
const modules = {};
files.keys().forEach((key) => {
     if (key === './index.ts') { return; }
     modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
});
export default modules;
```

```js
// import 自动导入实现
const files = import.meta.glob("./*.ts") // 异步加载
// const files = import.meta.glob("./*.ts", { eager: true }) // 配置 {eager: true} 则为同步加载
const modules: any = {};

for (const key in files) {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        modules[key.replace(/(\.\/|\.ts)/g, '')] = files[key].default
    }
}
export default modules;
```

- PS: 注意 `import.meta.globEager` 已经弃用，请使用 [import.meta.glob](https://cn.vitejs.dev/guide/migration-from-v2#importmetaglob) 来代替！