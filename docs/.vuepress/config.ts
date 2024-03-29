import { defineConfig } from 'vuepress/config'
import navbar from './navbar'
import sidebar from './sidebar'
import footer from './footer'
import extraSideBar from './extraSideBar'

const author = 'onresize'
const domain = 'https://onresize.github.io/web-blogs/'
const tags = ['程序员', '编程', '前端']

export default defineConfig({
  base: '/web-blogs/',
  title: 'onresize',
  description: '',
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
  permalink: '/:slug',
  // 监听文件变化，热更新
  extraWatchFiles: ['.vuepress/*.ts', '.vuepress/sidebars/*.ts'],
  markdown: {
    // 开启代码块的行号
    lineNumbers: true,
    // 支持 4 级以上的标题渲染
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'],
  },
  // @ts-ignore
  plugins: [
    ['@vuepress/back-to-top'],
    // Google 分析
    [
      '@vuepress/google-analytics',
      {
        ga: 'G-P1NFFNHRH2', // 补充自己的谷歌分析 ID，比如 UA-00000000-0
      },
    ],
    ['@vuepress/medium-zoom'],
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
    // https://github.com/ekoeryanto/vuepress-plugin-sitemap
    [
      'sitemap',
      {
        hostname: domain,
      },
    ],
    // https://github.com/IOriens/vuepress-plugin-baidu-autopush
    ['vuepress-plugin-baidu-autopush'],
    // https://github.com/zq99299/vuepress-plugin/tree/master/vuepress-plugin-tags
    ['vuepress-plugin-tags'],
    // https://github.com/webmasterish/vuepress-plugin-feed
    [
      'feed',
      {
        canonical_base: domain,
        count: 10000,
        // 需要自动推送的文档目录
        posts_directories: [],
      },
    ],
    // https://github.com/tolking/vuepress-plugin-img-lazy
    ['img-lazy'],
    // https://github.com/moefyit/vuepress-plugin-cursor-effects
    [
      'cursor-effects',
      {
        size: 2, // size of the particle, default: 2
        shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
  ],
  // 主题配置
  themeConfig: {
    logo: '/image.png',
    nav: navbar,
    sidebar,
    lastUpdated: '上一次更新',
    // GitHub 仓库位置
    repo: 'onresize/web-blogs',
    docsBranch: 'main',
    repoLabel: '📦️GitHub',

    smoothScroll: true,

    // 编辑链接
    // editLinks: true,
    // editLinkText: "完善页面",

    // @ts-ignore
    // 底部版权信息
    // footer,
    // 额外右侧边栏
    // extraSideBar,
  },
})
