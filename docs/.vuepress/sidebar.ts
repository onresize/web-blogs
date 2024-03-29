import { SidebarConfig4Multiple } from 'vuepress/config'
import selfStudySideBar from './sidebars/selfStudySideBar'
// @ts-ignore
export default {
  '/技术总结/': selfStudySideBar,
  // 降级，默认根据文章标题渲染侧边栏
  '/': 'auto',
} as SidebarConfig4Multiple
