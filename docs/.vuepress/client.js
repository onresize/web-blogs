import { defineClientConfig } from 'vuepress/client'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({
  layouts: {
    // 继承默认主题 、自定义
    Layout,
  },
})
