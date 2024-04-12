---
title: CSS概览
lang: zh-CN
sidebar: false
contributors: false
lastUpdated: false
editLink: false
prev: 
next: 
feed:
  enable: true
description: CSS概览
---

<iframe :src="iframeSrc" class="box-iframe" frameborder="0"></iframe>

<script setup>
import { h, ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const isProd = process.env.NODE_ENV === 'production'
let iframeSrc = isProd ? 'https://onresize.gitee.io/web-blogs/pageCom/css.html' : 'https://localhost:9008/web-blogs/pageCom/css.html'
</script>