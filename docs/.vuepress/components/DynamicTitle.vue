<script setup>
import { reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter
const state = reactive({
  originTitle: '',
  recoverTimeout: null,
  config: {
    showIcon: '',
    showText: '(^_^)欢迎回来! ',
    hideIcon: '',
    hideText: '(●—●)不要走呀!',
    recoverTime: 2000,
  },
})

const hidden = () => {
  if (state.config.hideIcon !== '') {
    getIconElm().setAttribute('href', state.config.hideIcon)
  }
  document.title = state.config.hideText
  clearTimeout(state.recoverTimeout)
}

const visible = () => {
  if (state.config.showIcon !== '') {
    getIconElm().setAttribute('href', state.config.showIcon)
  }
  document.title = state.config.showText + state.originTitle
  state.recoverTimeout = setTimeout(() => {
    document.title = state.originTitle
  }, state.config.recoverTime)
}

const getIconElm = () => {
  let elm = document.querySelector('link[rel=icon]')
  if (elm === null) {
    elm = document.createElement('link')
    elm.setAttribute('rel', 'icon')
    document.head.appendChild(elm)
  }
  return elm
}

onMounted(() => {
  state.originTitle = document.title
  if (state.config.showIcon !== '') {
    getIconElm().setAttribute('href', state.config.showIcon)
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hidden()
    } else {
      visible()
    }
  })
})

watch(() => router, (to, from) => {
  if (to.path !== from.path) {
    state.originTitle = document.title
    clearTimeout(state.recoverTimeout)
  }
})
</script>
 
<template></template>
