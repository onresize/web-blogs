import { viteBundler } from '@vuepress/bundler-vite'
// import { webpackBundler } from '@vuepress/bundler-webpack'
import fs from 'fs'
import path from 'path'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import { feedPlugin } from '@vuepress/plugin-feed'
import viteCompression from 'vite-plugin-compression'
import navbar from './config/navbar'
import sidebar from './config/silder'

const author = 'onresize'
const domain = 'https://onresize.github.io/web-blogs/'
const tags = ['程序员', '编程', '前端']

const isProd = process.env.NODE_ENV === 'production'

function reWriteLog() {
  console.log = (function (log) {
    return isProd ? function () {} : log
  })(console.log)
}
reWriteLog() // 线上重写console.log

export default defineUserConfig({
  // 打包工具
  bundler: viteBundler({
    viteOptions: {
      server: {
        host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
        port: 9008,
        open: false,
        strictPort: true, // 若端口已被占用则会直接退出
        cors: true, // 配置 CORS
        hmr: {
          overlay: true, // 服务器错误是否显示在页面上
        },
        // 开启本地https服务: https://xiaoshen.blog.csdn.net/article/details/135893188
        https: {
          key: fs.readFileSync(
            path.resolve(__dirname, 'certs', 'localhost+3-key.pem')
          ),
          cert: fs.readFileSync(
            path.resolve(__dirname, 'certs', 'localhost+3.pem')
          ),
        },
      },
    },
    vuePluginOptions: {},
  }),
  dest: path.resolve(__dirname, '../../public'), // 指定 vuepress build 命令的输出目录
  // bundler: webpackBundler({}),
  base: '/web-blogs/',

  lang: 'zh-CN',

  title: 'onresize',
  description: '💻学习📝记录🔗分享',

  head: [
    // 站点图标
    ['link', { rel: 'icon', href: '/web-blogs/image.webp' }],
    // iframe优化
    ['link', { rel: 'dns-prefetch', href: '//onresize.github.io' }],
    ['link', { rel: 'preconnect', href: 'https://onresize.github.io' }],
    // googl分析
    [
      'script',
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-P1NFFNHRH2',
        async: true,
      },
    ],
    [
      'script',
      {},
      `
      globalThis.dataLayer = globalThis.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-P1NFFNHRH2');  
    `,
    ],
    [
      'script',
      {},
      `
    var _hmt = _hmt || [];
    (function() {
      var hm = document?.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?9eb20a946f6ada6ace9bb2de590f8ed3";
      var s = document?.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();  
    `,
    ],
    // SEO
    [
      'meta',
      {
        'http-equiv': 'Content-Security-Policy',
        content: 'upgrade-insecure-requests',
      },
      {
        name: 'keywords',
        content: 'onresize, 笔记, 博客, 记录',
      },
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
    logo: '/image.webp',

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

    editLink: true, // 是否启用 编辑此页 链接
    editLinkText: '在 GitHub 上编辑此页',
  }),

  plugins: [
    searchPlugin({
      isSearchable: (page) => page.path !== '/', // 排除首页
    }),
    viteCompression({
      verbose: true,
      disable: false, // 不禁用压缩
      deleteOriginFile: false, // 压缩后是否删除原文件
      threshold: 10240, // 文件小于 10kb 不进行压缩
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 文件类型
    }),
    // RSS订阅源生成
    feedPlugin({
      hostname: 'https://onresize.github.io/',
      atom: true,
      json: true,
      rss: true,
    }),
  ],
})
