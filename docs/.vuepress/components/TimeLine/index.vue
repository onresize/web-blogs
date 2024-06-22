<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Timeline from './TimeLine.vue'
import { initImage } from '../../utils/img-lazy.js'

const isProd = process.env.NODE_ENV === 'production'
const timelineData = ref(
  [
    {
      desc: '原型链',
      date: '2023/03/10',
      imgUrl: `${
        isProd
          ? 'https://onresize.github.io/web-blogs'
          : 'https://localhost:9008'
      }/AA_mdPics/ms1.png`,
      color: 'green',
    },
    {
      desc: 'React 生命周期 v16.3 以前',
      date: '2023/07/19',
      imgUrl: `${
        isProd
          ? 'https://onresize.github.io/web-blogs'
          : 'https://localhost:9008'
      }/AA_mdPics/ms2.png`,
      color: 'red',
    },
    {
      desc: 'React 生命周期 only v16.3',
      date: '2023/11/07',
      imgUrl: `${
        isProd
          ? 'https://onresize.github.io/web-blogs'
          : 'https://localhost:9008'
      }/AA_mdPics/ms3.png`,
      color: 'blue',
    },
    {
      desc: 'setTimeout 和 setInterval 的区别',
      date: '2024/03/24',
      imgUrl: `${
        isProd
          ? 'https://onresize.github.io/web-blogs'
          : 'https://localhost:9008'
      }/AA_mdPics/ms4.png`,
      color: 'pink',
    },
    {
      desc: 'Service Worker的离线缓存',
      date: '2024/04/13',
      imgUrl: `${
        isProd
          ? 'https://onresize.github.io/web-blogs'
          : 'https://localhost:9008'
      }/AA_mdPics/ms5.png`,
    },
    {
      desc: '性能优化1',
      date: '2024/05/06',
      imgUrl: `${
        isProd
          ? 'https://onresize.github.io/web-blogs'
          : 'https://localhost:9008'
      }/AA_mdPics/ms6.png`,
      color: 'gray',
    },
    {
      desc: '性能优化2',
      date: '2024/05/12',
      imgUrl: `${
        isProd
          ? 'https://onresize.github.io/web-blogs'
          : 'https://localhost:9008'
      }/AA_mdPics/ms8.png`,
      color: 'gray',
    },
    {
      desc: '网络传输流程',
      date: '2024/06/17',
      imgUrl: `${
        isProd
          ? 'https://onresize.github.io/web-blogs'
          : 'https://localhost:9008'
      }/AA_mdPics/ms7.png`,
    },
  ].reverse()
)

onMounted(() => {
  initImage()
})
</script>

<template>
  <div class="u-card">
    <Timeline
      :timeline-data="timelineData"
      mode="center"
      width="66vw"
      line-style="dashed"
      position="left"
    >
      <template #desc="{ row }">
        <span>{{ row.date }}</span>
        <div class="desc-card">
          <img :data-src="row.imgUrl" alt="img" />
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
  overflow: hidden scroll;
  height: calc(100vh - 58px);

  .desc-card {
    padding: 10px 10px 3px 10px;
    border-radius: 5px;
    box-sizing: border-box;
    min-height: 250px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  }

  img {
    border-radius: 5px;
    height: 100%;
    object-fit: cover;
  }
}
</style>
