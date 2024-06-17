---
home: true
title: null
heroText: .
heroImage: /image.webp
tagline: 💻学习📝记录🔗分享
actions:
  - text: ✨开始阅读 →
    link: /技术总结/
features:
  - title: 简洁至上⭐️
    details: 以 markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
  - title: vue驱动⭐️
    details: 享受 vue + vite 的开发体验，在 markdown 中使用 vue 组件，同时可以使用 vue 来开发自定义主题。
  - title: 高性能⭐️
    details: vuePress2.0 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
    footer: null
---

<!-- <div class="home-bg-container">
  <div class="home-bg"></div>
</div> -->

<div class="g-c-box">
  <div class="g-container">
    <div class="g-bg"></div>
    <div class="g-circle"></div>
  </div>
</div>

<style>
body {
  background: transparent !important;
}

.home .features {
  /* border-top: 1px solid #eaecef !important; */
  border-top: 1px dashed rgba(0, 0, 0, 0.05) !important;
}

.home-bg-container {
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
}
 
.home-bg {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.home-bg:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: url('/bg-heading.png') repeat;
  background-size: auto; */
  /* background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z+AAAABmJLR0QA/wD/A+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKUlEQVQImU3IMREAIAgAwJfNkQCEsH8cijjpMf6vnXlQaIiJF+omEBfmqIEZLe2jzcAAAAASUVORK5CYII=); */
}

#main-title {
  /* color: #ADBAC7 !important; */
  color: #f5f5f5 !important;
}

.feature > h2,
.feature > p {
  /* color: #96A7B7 !important; */
  color: #f5f5f5 !important;
}
.actions a {
    color: #f5f5f5 !important;
}

.g-c-box {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  background: #000 !important;
}

.g-container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -2;
  top: 0;
  left: 0;
  overflow: hidden;
}

.g-bg {
  width: 100%;
  height: 100%;
  background: url('/bg.png');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.g-circle {
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  width: 400px;
  height: 400px;
  background: url('/circle.png');
  /* filter: invert(0.8); */
  background-size: cover;
  animation: scale 8s infinite;
}

@keyframes scale {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  30% {
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
  }
}
</style>