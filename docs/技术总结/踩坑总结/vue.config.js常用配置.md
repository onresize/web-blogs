---
title: vue.config.js常用配置
lang: zh-CN
feed:
  enable: true
description: vue.config.js常用配置
---

# vue.config.js常用配置

> 本文作者：[onresize](https://github.com/onresize)

```js
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // 默认：'/',部署应用包时的基本 URL，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，如果是部署在一个子路径上，比如在https://www.my-app.com/my-app/，则设置publicPath: /my-app/。这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，方便迁移。
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 默认：'dist', 当运行vue-cli-service build时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入--no-clean 可关闭该行为)。
  outputDir: "dist",
  // 默认：'', 放置生成的静态资源 (js、css、img、fonts)的 (相对于 outputDir 的) 目录
  assetsDir: "",
  // 默认：'index.html', 指定生成的index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: "index.html",
  // 默认：true, 默认情况下，生成的静态资源在它们的文件名中包含了hash 以便更好的控制缓存。然而，这也要求index的 HTML 是被 Vue CLI自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为false 来关闭文件名哈希。
  filenameHashing: true,
  // 默认：undefined, 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 可以是对象或字符串，类似：
  pages: {
    index: {
      // page 的入口
      entry: "src/index/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: "src/subpage/main.js",
  },
  // 默认：default (可选值：‘warning’ | ‘default’ | ‘error’), 是否在开发环境下通过eslint-loader在每次保存时lint代码。这个值会在 @vue/cli-plugin-eslint被安装之后生效。
  lintOnSave: default,
  // 默认：false, 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,
  // 默认：[], 默认情况下babel-loader会忽略所有 node_modules中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  // 默认：true, 如果你不需要生产环境的 source map，可以将其设置为false 以加速生产环境构建。
  productionSourceMap: true,
  // 默认：undefined, 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  crossorigin: undefined,
  // 默认：false, 在生成的 HTML 中的<link rel="stylesheet"> 和<script>标签上启用Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
  integrity: false,
  // 如果这个值是一个对象，则会通过 webpack-merge合并到最终的配置中。
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  // 调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象
  // 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
  // 有些 webpack 选项是基于 vue.config.js 中的值设置的，所以不能直接修改。
  // 例如你应该修改 vue.config.js 中的 outputDir 选项而不是修改 output.path；你应该修改 vue.config.js 中的 publicPath 选项而不是修改 output.publicPath。
  // 这样做是因为 vue.config.js 中的值会被用在配置里的多个地方，以确保所有的部分都能正常工作在一起。
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  },
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象：
  //   configureWebpack: config => {
  //     if (process.env.NODE_ENV === 'production') {
  //       // 为生产环境修改配置...
  //     } else {
  //       // 为开发环境修改配置...
  //     }
  //   }
  // });
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig实例。允许对内部的webpack配置进行更细粒度的修改。
  // Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。
  // 它允许我们更细粒度的控制其内部配置。接下来有一些常见的在 vue.config.js 中的 chainWebpack 修改的例子。
  // 当你打算链式访问特定的 loader 时，vue inspect 会非常有帮助。
  // 对于 CSS 相关 loader 来说，我们推荐使用 css.loaderOptions 而不是直接链式指定 loader。这是因为每种 CSS 文件类型都有多个规则，而 css.loaderOptions 可以确保你通过一个地方影响所有的规则。
  chainWebpack: config  => {
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
      // 你还可以再添加一个 loader
      .use('other-loader')
        .loader('other-loader')
        .end()
  },
  // 如果你想要替换一个已有的基础 loader，例如为内联的 SVG 文件使用 vue-svg-loader 而不是加载这个文件：
  // chainWebpack: config => {
  //   const svgRule = config.module.rule('svg')
 
  //   // 清除已有的所有 loader。
  //   // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
  //   svgRule.uses.clear()
 
  //   // 添加要替换的 loader
  //   svgRule
  //     .use('vue-svg-loader')
  //       .loader('vue-svg-loader')
  // }
 
  css: {
    // 默认：true, 默认情况下，只有 *.module.[ext]结尾的文件才会被视作CSS Modules 模块。设置为 false后你就可以去掉文件名中的.module并将所有的 *.(css|scss|sass|less|styl(us)?)文件视为 CSS Modules模块。
    // 如果你在 css.loaderOptions.css里配置了自定义的 CSS Module选项，则 css.requireModuleExtension必须被显式地指定为true或者false，否则我们无法确定你是否希望将这些自定义配置应用到所有 CSS文件中。
    requireModuleExtension: true,
    // 默认：生产环境下是 true，开发环境下是 false, 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript中的inline代码)。
    // 同样当构建 Web Components组件时它总是会被禁用 (样式是 inline 的并注入到了 shadowRoot 中)。当作为一个库构建时，你也可以将其设置为false免得用户自己导入 CSS。
    // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取。
    extract: true,
    // 默认：false, 是否为 CSS 开启 source map。设置为true之后可能会影响构建的性能。
    sourceMap: false,
    // 支持的 loader 有, css-loader,postcss-loader,sass-loader,less-loader,stylus-loader
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    },
    devServer: {
      host: "0.0.0.0",
      port: 8888,
      open: true,
      // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过vue.config.js 中的 devServer.proxy 选项来配置。
      proxy: "http://localhost:6666",
      proxy: {
        "/dev-api": {
          target: "http://localhost:6666",
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            ["^/dev-api"]: "",
          },
        }
      }
    },
     // 是否为 Babel 或 TypeScript 使用 thread-loader
    parallel: require('os').cpus().length > 1,
    // 向 PWA 插件传递选项
    pwa: {},
    // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。例如
    pluginOptions: {
      foo: {
      // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
      }
    }
  }
```