<script setup>
import { reactive, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { rTime } from '../utils/tools'

const state = reactive({
  list: [],
})

let Tim = null
const getRepoCommit = () => {
  let cacheList = JSON.parse(window.localStorage.getItem('cacheList')) || []

  if (!cacheList.length) return

  state.list = [cacheList[0]]
  Tim = setInterval(() => {
    state.list.push(cacheList[state.list.length])
    if (state.list.length >= 10) {
      clearTimeout(Tim)
      Tim = null
    }
  }, state.list.length * 100)
}

const route = useRoute()
watch(
  () => route.path,
  async (val) => {
    // console.log('监听route.path:', decodeURI(val) === '/技术总结/')
    await nextTick()
    getRepoCommit()
  },
  {
    flush: 'post',
    deep: true,
    immediate: true,
  }
)

onUnmounted(() => {
  clearTimeout(Tim)
  Tim = null
})
</script>

<template>
  <div class="flex-box">
    <transition-group name="fadeBox" tag="div">
      <div v-for="(item, i) in state.list" :key="i" class="box">
        <div class="item-row">
          <div>
            {{ item.message }}
          </div>
          <div>
            {{ rTime(item.committer.date) }}
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.fadeBox-move .item-row,
.fadeBox-enter-active .item-row,
.fadeBox-leave-active {
  transition: all 1s ease;
}

.fadeBox-leave-active .item-row {
  position: absolute;
}

.fadeBox-enter-from .item-row,
.fadeBox-leave-to .item-row {
  opacity: 0;
  transform: translateX(-50px);
}

.flex-box {
  width: 100%;
  height: 690px;
  .box {
    & + div {
      margin-top: 10px;
    }
    .item-row {
      min-width: 400px;
      height: 60px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      border-radius: 10px;
      user-select: none;

      &:nth-child(1) {
        transition-delay: 0.1s;
      }

      &:nth-child(2) {
        transition-delay: 0.2s;
      }

      &:nth-child(3) {
        transition-delay: 0.3s;
      }

      &:nth-child(4) {
        transition-delay: 0.4s;
      }

      &:nth-child(5) {
        transition-delay: 0.5s;
      }

      &:nth-child(6) {
        transition-delay: 0.6s;
      }

      &:nth-child(7) {
        transition-delay: 0.7s;
      }

      &:nth-child(8) {
        transition-delay: 0.8s;
      }

      &:nth-child(9) {
        transition-delay: 0.9s;
      }
      &:nth-child(10) {
        transition-delay: 1s;
      }
    }
  }
}
</style>
