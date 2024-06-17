import { defineClientConfig } from 'vuepress/client'
import Layout from './layouts/Layout.vue'
import FetchGithubCommit from './components/FetchGithubCommit.vue'
import DynamicTitle from './components/DynamicTitle.vue'
import DIframe from './components/DIframe.vue'
import TimeLine from './components/TimeLine/index.vue'

// @see: https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('FetchGithubCommit', FetchGithubCommit)
    app.component('DynamicTitle', DynamicTitle)
    app.component('DIframe', DIframe)
    app.component('TimeLine', TimeLine)
  },
  setup() {},
  layouts: {
    // 继承默认主题 、自定义
    Layout,
  },
  // 直接被放置在客户端 Vue 应用的根节点下、作为全局组件
  rootComponents: [],
})
