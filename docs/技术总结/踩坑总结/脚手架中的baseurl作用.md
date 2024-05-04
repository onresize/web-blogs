---
title: 脚手架中的baseurl作用
lang: zh-CN
feed:
  enable: true
description: 脚手架中的baseurl作用
---

# 脚手架中的baseurl作用

> 本文作者：[onresize](https://github.com/onresize)

- #### 路由的 basename
React Router v6中的 `basename`：相当于给路由统一加上一个前缀
```jsx
function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" /> {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
  );
}
```

- #### Vue-Router中的 base
- 这个 `base` 默认不设置取的是 `vue.config.js` 中的 `publicPath`、手动设置会替换掉这个 `publicPath`、`base` 的作用和 `publicPath` 都是用来添加部署项目静态文件路径前缀、`base` 优先级更高、存在以下几种情况：
- 当 `base` 不设置时、默认取的就是 `vue.config.js` 中的 `publicPath`
- `base` 和 `publicPath` 同时设置相同的路径都生效
- 只设置 `base` 时、部署静态文件路径前缀取值也是用的 `base` 的值
```js
// vue-router v3.x
const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

// vue-router v4.x
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: '/admin/',
  routes
})
```

- #### axios 中的 baseURL
`axios` 实例上的 `baseURL` 可以用来指定请求默认地址、也可以用来指定本地环境下的反向代理匹配规则
```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

- #### vite 和 webpack 中的 baseUrl
- 用来指定服务器部署的文件路径前缀、比如：服务器用 `/admin` 路径访问、那么发布的时候也要指定这个url为 `/admin`、这里url分别指的是下面的 `base`、`publicPath` 配置

`vite.config.js`
```js
export default defineConfig(() => {
  return {
    base: '/', 
  }
})
```

`vue.config.js`
```js
module.exports = defineConfig({
  publicPath: "/",
})
```