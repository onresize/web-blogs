<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
</script>
 
<template>
  <ParentLayout>
    <template #page-bottom>
      <!-- <div class="my-footer">
        <a href="https://onresize.github.io/rss.xml" title="订阅" target="_blank" class="icon-rss"></a>
      </div> -->
    </template>
  </ParentLayout>
</template>
 
<style lang='scss'>
.my-footer {
  text-align: center;
  width: 740px;
  height: 80px;
  margin: 10px auto;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon-rss {
    width: 30px;
    height: 30px;
    display: inline-block;
    background: url('/RSS.png') no-repeat center center;
    background-size: 100% 100%;
    transition: .3s;

    &:hover {
      filter: drop-shadow(1rem 1rem 100px #3EAF7C);
    }
  }
}
</style>