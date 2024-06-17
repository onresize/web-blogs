<script setup>
import { ref } from 'vue'
import Timeline from './TimeLine.vue'

const timelineData = ref([
  {
    desc: '原型链',
    date: '2023/03/10',
    imgUrl: new URL('./imgs/ms1.png', import.meta.url).href,
    color: 'green',
  },
  {
    desc: 'React 生命周期 v16.3 以前',
    date: '2023/07/19',
    imgUrl: new URL('./imgs/ms2.png', import.meta.url).href,
    color: 'red',
  },
  {
    desc: 'React 生命周期 only v16.3',
    date: '2023/11/07',
    imgUrl: new URL('./imgs/ms3.png', import.meta.url).href,
    color: 'blue',
  },
  {
    desc: 'setTimeout 和 setInterval 的区别',
    date: '2024/03/24',
    imgUrl: new URL('./imgs/ms4.png', import.meta.url).href,
    color: 'pink',
  },
  {
    desc: 'Service Worker的离线缓存',
    date: '2024/04/13',
    imgUrl: new URL('./imgs/ms5.png', import.meta.url).href,
  },
  {
    desc: '性能优化',
    date: '2024/05/06',
    imgUrl: new URL('./imgs/ms6.png', import.meta.url).href,
    color: 'gray',
  },
  {
    desc: '网络传输流程',
    date: '2024/06/17',
    imgUrl: new URL('./imgs/ms7.png', import.meta.url).href,
  },
])
</script>
<template>
  <div class="u-card">
    <Timeline
      :timeline-data="timelineData.reverse()"
      mode="center"
      width="66vw"
      line-style="dashed"
      position="left"
    >
      <template #desc="{ row }">
        <span>{{ row.date }}</span>
        <div class="desc-card">
          <img :src="row.imgUrl" alt="" />
        </div>
        <span class="mar-r">{{ row.desc }}</span>
      </template>
    </Timeline>
  </div>
</template>
<style lang="scss" scoped>
.u-card {
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  .desc-card {
    padding: 10px 0 10px 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
  img {
    border-radius: 5px;
  }
}
</style>
