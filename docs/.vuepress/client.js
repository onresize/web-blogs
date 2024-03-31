import { defineClientConfig } from 'vuepress/client'
import Layout from './layouts/Layout.vue'
import Fps from './components/Fps.vue'

// @see: https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // app.component('Fps', Fps)
  },
  setup() {},
  layouts: {
    // 继承默认主题 、自定义
    Layout,
  },
  // 直接被放置在客户端 Vue 应用的根节点下、作为全局组件
  rootComponents: [Fps],
})
