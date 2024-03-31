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
  description: '',

  markdown: {
    code: {
      lineNumbers: true, // 代码块显示行号
      // 支持 4 级以上的标题渲染
    },
  },

  // 主题
  theme: defaultTheme({
    logo: '/image.png',

    lastUpdated: true,

    // GitHub 仓库位置
    repo: 'onresize/web-blogs',
    docsBranch: 'main',
    repoLabel: '📦️GitHub',

    head: [
      // 站点图标
      ['link', { rel: 'icon', href: '/image.png' }],
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
    // RSS订阅源
    [
      'feed',
      {
        canonical_base: 'https://onresize.github.io',
        count: 5000,
      },
    ],
    // https://github.com/ekoeryanto/vuepress-plugin-sitemap
    [
      'sitemap',
      {
        hostname: domain,
      },
    ],
    // Google 分析
    [
      '@vuepress/google-analytics',
      {
        ga: 'G-P1NFFNHRH2', // 补充自己的谷歌分析 ID，比如 UA-00000000-0
      },
    ],
    // https://github.com/lorisleiva/vuepress-plugin-seo
    [
      'seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: ($page) => $page.title,
        description: ($page) =>
          $page.frontmatter.description || $page.description,
        author: (_, $site) => $site.themeConfig.author || author,
        tags: ($page) => $page.frontmatter.tags || tags,
        type: ($page) => 'article',
        url: (_, $site, path) =>
          ($site.themeConfig.domain || domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image &&
          (($site.themeConfig.domain &&
            !$page.frontmatter.image.startsWith('http')) ||
            '') + $page.frontmatter.image,
        publishedAt: ($page) =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
      },
    ],
    // 点击特效
    [
      'cursor-effects',
      {
        size: 2, // size of the particle, default: 2
        shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
  ],
})
