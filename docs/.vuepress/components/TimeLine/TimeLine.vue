<script setup>
import { ref, computed, watchEffect } from 'vue'
const ColorStyle = {
  // 颜色主题对象
  blue: '#1677ff',
  green: '#52c41a',
  red: '#ff4d4f',
  gray: '#00000040',
}

const props = defineProps({
  timelineData: {
    type: Array,
    default: () => [],
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  lineStyle: {
    type: String,
    default: 'solid',
  },
  mode: {
    type: String,
    default: 'left',
  },
  position: {
    type: String,
    default: 'left',
  },
})

const desc = ref()
const dotsHeight = ref([])
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const len = computed(() => {
  return props.timelineData.length
})
function getDotsHeight() {
  for (let n = 0; n < len.value; n++) {
    dotsHeight.value[n] = getComputedStyle(
      desc.value[n].firstElementChild || desc.value[n],
      null
    ).getPropertyValue('line-height')
  }
}
watchEffect(
  () => {
    getDotsHeight()
  },
  { flush: 'post' }
)
watchEffect(
  () => {
    if (props.mode === 'center') {
      for (let n = 0; n < len.value; n++) {
        if ((n + 1) % 2) {
          // odd
          if (props.position === 'left') {
            desc.value[n].classList.add('alternate-left-desc')
          } else {
            desc.value[n].classList.add('alternate-right-desc')
          }
        } else {
          // even
          if (props.position === 'left') {
            desc.value[n].classList.add('alternate-right-desc')
          } else {
            desc.value[n].classList.add('alternate-left-desc')
          }
        }
      }
    }
  },
  { flush: 'post' }
)
</script>
<template>
  <div class="m-timeline-area" :style="`width: ${totalWidth};`">
    <div class="m-timeline">
      <div
        :class="[
          'm-timeline-item',
          { last: index === timelineData.length - 1 },
        ]"
        v-for="(data, index) in timelineData"
        :key="index"
      >
        <span
          :class="`u-tail ${mode}-tail`"
          :style="`border-left-style: ${lineStyle};`"
        ></span>
        <div
          :class="`m-dot ${mode}-dot`"
          :style="`height: ${dotsHeight[index]}`"
        >
          <slot name="dot" :index="index">
            <span
              class="u-dot"
              v-if="data.color === 'red'"
              :style="{ borderColor: ColorStyle.red }"
            ></span>
            <span
              class="u-dot"
              v-else-if="data.color === 'gray'"
              :style="{ borderColor: ColorStyle.gray }"
            ></span>
            <span
              class="u-dot"
              v-else-if="data.color === 'green'"
              :style="{ borderColor: ColorStyle.green }"
            ></span>
            <span
              class="u-dot"
              v-else-if="data.color === 'blue'"
              :style="{ borderColor: ColorStyle.blue }"
            ></span>
            <span
              class="u-dot"
              v-else
              :style="{ borderColor: data.color || ColorStyle.blue }"
            ></span>
          </slot>
        </div>
        <div ref="desc" :class="`u-desc ${mode}-desc`">
          <slot name="desc" :row="data" :index="index">{{
            data.desc || '--'
          }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.m-timeline-area {
  .m-timeline {
    .m-timeline-item {
      position: relative;
      padding-bottom: 30px;
      .u-tail {
        position: absolute;
        top: 12px;
        width: 0;
        height: 100%;
        border-left-width: 2px;
        border-left-color: #e8e8e8;
      }
      .left-tail {
        left: 5px;
      }
      .center-tail {
        left: 0;
        right: 0;
        margin: 0 auto;
      }
      .right-tail {
        right: 5px;
      }
      .m-dot {
        position: absolute;
        display: flex;
        align-items: center;
        .u-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-width: 2px;
          border-style: solid;
          border-radius: 50%;
          background: #fff;
        }
      }
      .left-dot {
        left: 6px;
        transform: translateX(-50%);
      }
      .center-dot {
        left: 50%;
        transform: translateX(-50%);
      }
      .right-dot {
        right: 6px;
        transform: translateX(50%);
      }
      .u-desc {
        font-size: 14px;
        line-height: 1.5714285714285714;
        word-break: break-all;
      }
      .left-desc {
        margin-left: 25px;
      }
      .center-desc {
        width: calc(50% - 12px);
      }
      .alternate-left-desc {
        text-align: end;
      }
      .alternate-right-desc {
        margin-left: calc(50% + 12px);
      }
      .right-desc {
        margin-right: 25px;
        text-align: end;
      }
    }
    .last {
      .u-tail {
        display: none;
      }
    }
  }
}
</style>
