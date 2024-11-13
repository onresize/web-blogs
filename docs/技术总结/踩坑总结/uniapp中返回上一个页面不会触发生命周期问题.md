---
title: uniapp中返回上一个页面不会触发生命周期问题
lang: zh-CN
feed:
  enable: true
description: uniapp中返回上一个页面不会触发生命周期问题
---

# uniapp中返回上一个页面不会触发生命周期问题

> 本文作者：[onresize](https://github.com/onresize)

- 如果你要从<span style="color: red; font-weight: bold;">A页面</span>跳转到<span style="color: blue; font-weight: bold;">B页面</span>去做操作，然后B页面使用navigationBack方法返回的时候，发现上个页面被缓存(内存保活状态)，需要重新加载，<del>解决方案如下：</del>
- <span style="color: red; font-weight: bold;">A页面</span>，跳转的时候代码如下：
```js
handleCreateVip() {
  const that = this
  uni.navigateTo({ 
    url: '/pages/vip/vipUser/vipUserCreate?release=' + this.queryParams.releaseFishing,
      events: {
        updateBlanceData() {
           that.initPage() // 需要刷新页面的逻辑
         }
       }
   })
}
```

- 此时需要注意，在跳转时，将方法通过events进行注册，你要记住这里注册的方法名称 `"updateBlanceData"`，另外注意 `that = this` 这个，因为这里会有this的问题
- <span style="color: blue; font-weight: bold;">B页面</span>：
```js
onUnload() {
  const eventChannel = this.getOpenerEventChannel();
  eventChannel.emit('updateBlanceData')
}
```

- <span style="color: red; font-weight: bold;">A页面</span>跳转到<span style="color: blue; font-weight: bold;">B</span>，<span style="color: blue; font-weight: bold;">B页面</span>在 `navigateBack` 的过程其实就是卸载，因此调用A界面传递的方法，此时就能达到数据刷新的效果
- 另外：也可以在 `navigateBack` 方法中直接调用：
```js
modalConfirm() {
  const that = this
  uni.navigateBack({
    success() {
      const eventChannel = that.getOpenerEventChannel();
      eventChannel.emit('updateBlanceData')
    }
 })
}
```