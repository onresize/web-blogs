---
title: 图片转base64
lang: zh-CN
sidebar: false
contributors: false
lastUpdated: false
editLink: false
prev: 
next: 
feed:
  enable: true
description: 图片转base64
---

<iframe :src="iframeSrc" class="box-iframe" frameborder="0"></iframe>

<script setup>
import { h, ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const isProd = process.env.NODE_ENV === 'production'
let iframeSrc = isProd ? 'https://onresize.github.io/web-blogs/pageCom/img_base64/index.html' : 'https://localhost:9008/pageCom/img_base64/index.html'
</script>