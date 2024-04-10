<script setup>
// defineProps defineEmits defineExpose withDefaults
import { reactive } from 'vue'

const props = defineProps({
  iframeSrc: ''
})

</script>
 
<template>
  <iframe :src="'https://onresize.github.io/react-ts-vite-admin/SandPack?codeType=' + props.iframeSrc" class="iframe-box"
    title="page for document" loading="lazy" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midipayment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
</template>
 
<style scoped lang='scss'>
.iframe-box {
  width: 100%;
  height: 500px;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e7ed;
  border-radius: 10px;
}
</style>