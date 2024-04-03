---
title: CSS概览
lang: zh-CN
sidebar: false
contributors: false
lastUpdated: false
prev: 
next: 
feed:
  enable: true
description: CSS概览
---

<iframe :src="iframeSrc" class="box-iframe-css" frameborder="0"></iframe>

<script setup>
import { h, ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const isProd = process.env.NODE_ENV === 'production'
let iframeSrc = isProd ? 'https://onresize.github.io/web-blogs/pageCom/css.html' : 'https://localhost:9008/web-blogs/pageCom/css.html'
</script>

<style>
.box-iframe-css {
  position: absolute;
  left: 0;
  width: 100%;
  height: calc(100vh - 3.6rem);
  box-sizing: border-box;
  border: none
}
</style>