<script setup>
import { onMounted } from 'vue'
import { loopFps } from '../utils/tools'

onMounted(loopFps)
</script>

<template>
  <div id="fps"></div>
</template>

<style scoped lang='scss'>
#fps {
  position: fixed;
  right: -15px;
  bottom: 10px;
  box-sizing: border-box;
  padding: 0 6px;
  width: 120px;
  text-align: center;
  user-select: none;
}
</style>