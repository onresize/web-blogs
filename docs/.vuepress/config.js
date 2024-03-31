import { viteBundler } from '@vuepress/bundler-vite'
// import { webpackBundler } from '@vuepress/bundler-webpack'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import navbar from './config/navbar'
import sidebar from './config/silder'

const author = 'onresize'
const domain = 'https://onresize.github.io/web-blogs/'
const tags = ['程序员', '编程', '前端']

export default defineUserConfig({
  // 打包工具
  bundler: viteBundler(),
  // bundler: webpackBundler({}),
  base: '/web-blogs/',

  lang: 'zh-CN',

  title: 'onresize',
  description: '💻学习📝记录🔗分享',

  head: [
    // 站点图标
    ['link', { rel: 'icon', href: '/web-blogs/image.png' }],
    // SEO
    [
      'meta',
      {
        name: 'keywords',
        content: 'onresize的笔记, 博客',
      },
    ],
    // 百度统计
    [
      'script',
      {},
      `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?9eb20a946f6ada6ace9bb2de590f8ed3";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();  
    `,
    ],
  ],

  markdown: {
    code: {
      lineNumbers: true, // 代码块显示行号
      // 支持 4 级以上的标题渲染
    },
  },

  // 主题
  theme: defaultTheme({
    logo: '/image.png',

    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',

    // GitHub 仓库位置
    repo: 'onresize/web-blogs',
    docsBranch: 'main',
    repoLabel: '📦️GitHub',

    docsDir: 'docs',

    navbar,
    sidebar,

    editLink: false, // 是否启用 编辑此页 链接
  }),

  plugins: [
    searchPlugin({
      // 排除首页
      isSearchable: (page) => page.path !== '/',
    }),
  ],
})
