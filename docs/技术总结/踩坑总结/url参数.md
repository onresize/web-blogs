---
title: url参数
lang: zh-CN
feed:
  enable: true
description: url参数
---

# url参数

> 本文作者：[onresize](https://github.com/onresize)

- #### new URLSearchParams()
- `get(name)`
```js
// const params = new URLSearchParams(window.location.search)
const params = new URLSearchParams('?name=John&age=28')
const name = params.get('name') // John
```

- `getAll(name)`
```js
const params = new URLSearchParams('?name=John&age=28&name=czn')
const name = params.getAll('name') // ['John', 'czn']
```

- `has(name)`
```js
const params = new URLSearchParams('?name=John&age=28&name=czn')
const name = params.has('name') // true
```

- `append(name, value)`
- 向URL中添加新的参数、key存在也继续添加、而不是覆盖
```js
const params = new URLSearchParams('?name=John');
params.append('age', '30');
params.append('name', 'czn');
console.log(params.toString()); // 输出：'name=John&age=30&name=czn'
```

- `set(name, value)`
- 设置指定参数的值、如果参数不存在则添加新参数、存在则覆盖
```js
const params = new URLSearchParams('?name=John');
params.set('name', 'Alice');
params.set('age', '30');
console.log(params.toString()); // 输出：'name=Alice&age=30'
```

- `delete(name)`
```js
const params = new URLSearchParams('?name=John&age=30');
params.delete('age');
console.log(params.toString()); // 输出：'name=John'
```

- `keys()`
```js
const params = new URLSearchParams('?name=John&age=30');
for (const key of params.keys()) {
  console.log(key); // 输出：'name', 'age'
}
```

- `values()`
```js
const params = new URLSearchParams('?name=John&age=30');
for (const value of params.values()) {
  console.log(value); // 输出：'John', '30'
}
```

- `entries()`
```js
const params = new URLSearchParams('?name=John&age=30');
for (const [key, value] of params.entries()) {
  console.log(`${key}: ${value}`); // 输出：'name: John', 'age: 30'
}
```

- `toString()`
```js
const params = new URLSearchParams('?name=John&age=30');
const paramString = params.toString();
console.log(paramString); // 输出：'name=John&age=30'
```

- #### URLSearchParams浏览器兼容性
<p align="center">
  <img src="/AA_mdPics/urlsearchparams.min.png" />
</p>


- #### new URL()
```js
const url = new URL(window.location.href) // 将字符串变成url对象
url.searchParams.set("name", "czn") // 设置key-value
url.searchParams.toString() // name=czn
url.searchParams.has("name") // true
url.searchParams.get("name") // czn
```
> 更多方法和 new URLSearchParams() 类似
