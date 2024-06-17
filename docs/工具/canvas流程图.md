---
title: canvas流程图
lang: zh-CN
sidebar: false
contributors: false
lastUpdated: false
editLink: false
prev: 
next: 
feed:
  enable: true
description: canvas流程图
---

<iframe :src="iframeSrc" class="box-iframe" frameborder="0"></iframe>

<script setup>
import { h, ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const isProd = process.env.NODE_ENV === 'production'
let iframeSrc = isProd ? 'https://onresize.github.io/web-blogs/pageCom/flow/index.html' : 'https://localhost:9008/pageCom/flow/index.html'
</script>