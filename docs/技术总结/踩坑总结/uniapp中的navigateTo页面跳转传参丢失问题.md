---
title: uniapp中的navigateTo页面跳转传参丢失问题
lang: zh-CN
feed:
  enable: true
description: uniapp中的navigateTo页面跳转传参丢失问题
---

# uniapp中的navigateTo页面跳转传参丢失问题

> 本文作者：[onresize](https://github.com/onresize)

- URL直接传递
- 例如：`uni.navigateTo({ url: '/pages/salemanManage/my/myorder/particulars?id=' + this.orderInfo.id })`
- 弊端：url有长度限制，太长的字符串会传递失败。
- 处理方式： 使用encodeURIComponent进行编码。
- 参数传递：先JSON再编码
```js
detail(item) {
	uni.navigateTo({
		url: '/pages/salemanManage/homePage/salesReturn/detail?data=' + encodeURIComponent(JSON.stringify(item)),
	})
}
```
- 参数接收：先解码再JSON
```js
onLoad(option) {
	this.dataList = JSON.parse(decodeURIComponent(option.data))
}
```
- 注意：如果传递参数的字符串中存在特殊字符（如 #，%，？，&，=），则在接收参数之前需要先处理特殊字符，将其改为十六进制，否则会报错
- 解决方法：
- 在methods中添加方法：
```js
// 因为decodeURIComponent参数参数传递在接收时有特殊字符会报错，所以在接收前要处理特殊字符为十六进制
encodeSearchKey(key) {
	const encodeArr = [{
		code: '%',
		encode: '%25'
	},{
		code: '?',
		encode: '%3F'
	},{
		code: '#',
		encode: '%23'
	},{
		code: '&',
		encode: '%26'
	},{
		code: '=',
		encode: '%3D'
	}]
	return key.replace(/[%?#&=]/g, ($, index, str) => {
		for(const k of encodeArr) {
			if(k.code === $) {
				return k.encode
			}
			}
	})
}
```
- 在获取参数时：
```js
onLoad(option) {
	// 处理特殊字符
	let options = this.encodeSearchKey(option.data)
	this.dataList = JSON.parse(decodeURIComponent(options))
}
```
- 使用eventChannel
- 传递参数时：
```js
uni.navigateTo({
  url: 'pages/test?id=1',
  success: function(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('变量参数名', { data: 'data from starter page' })
  }
})
```
- 获取参数时：
```js
onLoad: function(option) {
  let self = this
  // APP-NVUE平台暂不支持以this.getOpenerEventChannel()方式获取eventChannel，请换用this.$scope.eventChannel来获取
  // #ifdef APP-NVUE
  const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
  // #endif
  // #ifndef APP-NVUE
  const eventChannel = this.getOpenerEventChannel();
  // #endif
  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
  eventChannel.on('变量参数名', function(data) {
    console.log(data.data) // 'data from starter page'
    self.a = data.data
  })
}
```

- <span style="color: red;">弊端：</span>页面刷新会数据丢失、这个问题状态持久化处理即可