---
title: 如何监听localStorage中的值的变化
lang: zh-CN
feed:
  enable: true
description: 如何监听localStorage中的值的变化
---

# 如何监听localStorage中的值的变化

> 本文作者：[onresize](https://github.com/onresize)

```js
function dispatchEventStorage() {
  const signSetItem = localStorage.setItem
  localStorage.setItem = function (ley, val) {
    let setEvent = new Event('setItemEvent')
    setEvent.key = key
    setEvent.newVal = val
    window.dispatchEvent(setEvent)
    signSetItem.apply(this, arguments)
  }
}
dispatchEventStorage()

window.addEventListener('setItemEvent', (e) => {
  // TODO...
})
```