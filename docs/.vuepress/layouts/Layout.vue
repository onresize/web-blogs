<script setup>
import { watch } from 'vue'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { useRoute } from 'vue-router';

const loadScript = (url) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  document.head.appendChild(script)
}

const route = useRoute()
watch(() => route.path, async (val) => {
  loadScript('/web-blogs/static/js/busuanzi.pure.mini.js')
},
  {
    flush: 'post',
    deep: true,
  })
</script>
 
<template>
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