<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { useRoute } from 'vue-router';
import { Popper, PopperShape, MAX_Z_INDEX } from '@moefy-canvas/theme-popper'
import { Sakura } from '@moefy-canvas/theme-sakura'
import { devDependencies } from '../../../package.json'

console.log(`%cVuePress%c${devDependencies.vuepress}`, 'padding: 3px; color: white; background: #023047; border-radius: 5px 0 0 5px;', 'padding: 3px; color: white; background: #219EBC;border-radius: 0 5px 5px 0;')

const loadScript = (url) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  document.head.appendChild(script)
}

const themeConfig = {
  shape: PopperShape.Star,
  size: 1.75,
  numParticles: 10,
}

const canvasOptions = {
  opacity: 1,
  zIndex: MAX_Z_INDEX,
}

const el = document.createElement('canvas')
el.id = 'moefy-canvas'
document.body.appendChild(el)
let popper = null, sakura = null

// 花瓣散落特效
const loadSakura = () => {
  console.log('加载花瓣特效-----')
  popper?.unmount()
  sakura = new Sakura({ numPatels: 30 }, canvasOptions)
  sakura.mount(el)
}

// 点击颗粒特效
const loadPopper = () => {
  if (popper) return
  console.log('加载颗粒特效-----')
  sakura?.unmount()
  sakura = null
  popper = new Popper(themeConfig, canvasOptions)
  popper.mount(el)
}

loadPopper()
const route = useRoute()
// console.log('监听route:', route)
watch(() => route.path, (val) => {
  loadScript('/web-blogs/static/js/busuanzi.pure.mini.js') // 加载计数统计脚本
  // val === '/' ? loadSakura() : loadPopper()
},
  {
    flush: 'post',
    deep: true,
    immediate: true
  })

onMounted(() => { })

onUnmounted(() => {
  popper?.unmount()
  sakura?.unmount()
  popper = null
  sakura = null
})
</script>
 
<template>
  <DynamicTitle />
  <ParentLayout>
    <template #page-bottom>
      <div class="my-footer">
        <!-- <a href="https://onresize.github.io/rss.xml" title="订阅" target="_blank" class="icon-rss"></a> -->
        <span id="busuanzi_container_site_pv" class="visit-text">本站总访问量：<span id="busuanzi_value_site_pv"></span> 次</span>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang='scss'>
@font-face {
  font-family: QT;
  src: url("/web-blogs/static/font/thin-font/QT.ttf");
  font-display: swap;
}

.my-footer {
  text-align: center;
  width: 740px;
  height: 80px;
  margin: 10px auto;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon-rss {
    width: 30px;
    height: 30px;
    display: inline-block;
    background: url('/RSS.png') no-repeat center center;
    background-size: 100% 100%;
    transition: .3s;

    &:hover {
      filter: drop-shadow(1rem 1rem 100px #3EAF7C);
    }
  }

  .visit-text {
    color: #ADBAC7;
    font-family: 'QT' !important;
    font-weight: bold !important;
  }
}
</style>
