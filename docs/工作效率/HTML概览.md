---
title: HTML概览
lang: zh-CN
sidebar: false
contributors: false
lastUpdated: false
prev: 
next: 
feed:
  enable: true
description: HTML概览
---

<iframe :src="iframeSrc" class="box-iframe-html" frameborder="0"></iframe>

<script setup>
import { h, ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const isProd = process.env.NODE_ENV === 'production'
let iframeSrc = isProd ? 'https://onresize.github.io/web-blogs/pageCom/html5.html' : 'https://localhost:9008/web-blogs/pageCom/html5.html'
</script>

<style>
.box-iframe-html {
  position: absolute;
  left: 0;
  width: 100%;
  height: calc(100vh - 3.6rem);
  box-sizing: border-box;
  border: none;
}
</style>