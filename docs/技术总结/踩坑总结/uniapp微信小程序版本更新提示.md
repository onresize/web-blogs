---
title: uniapp微信小程序版本更新提示
lang: zh-CN
feed:
  enable: true
description: uniapp微信小程序版本更新提示
---

# uniapp微信小程序版本更新提示

> 本文作者：[onresize](https://github.com/onresize)

- App.vue
```js
onLaunch: function () {
  // #ifdef MP-WEIXIN
  this.updateWatch()
  // #endif
},
methods: {
  // 版本更新提示
  updateWatch() {
    const updateManager = uni.getUpdateManager() // 小程序版本更新管理器
    updateManager.onCheckForUpdate((res) => {
      // 检测新版本后的回调
      if (res.hasUpdate) {
        // 如果有新版本提醒并进行强制升级
        uni.showModal({
          content: '新版本已经准备好，是否重启应用？',
          showCancel: false,
          confirmText: '确定',
          success: (res) => {
            if (res.confirm) {
              updateManager.onUpdateReady((res) => {
                // 新版本下载完成的回调
                updateManager.applyUpdate() // 强制当前小程序应用上新版本并重启
              })
              updateManager.onUpdateFailed((res) => {
                // 新版本下载失败的回调
                // 新版本下载失败，提示用户删除后通过冷启动重新打开
                uni.showModal({
                  content: '下载失败，请删除当前小程序后重新打开',
                  showCancel: false,
                  confirmText: '知道了',
                })
              })
            }
          },
        })
      }
    })
  },
}
```

- app端可以手动实现访问一个连接去下载对应的安装包、

```js
updateConfirm() {
	// 下载更新包
	const platform = phoneInfo.systemInfo.platform.toLowerCase();
	const url = config.uploadUrl + this.updateObj.url;
    
	// type仅为我司定义
	if (type == 1) {
		this.$emit("cancelClickEvent");
		uni.setStorageSync("cancelUpdate", "true");
		uni.setStorageSync("widgetInfo", {});
		// 整包
		if (platform == "android") {
			plus.runtime.openURL(url); 	// 安卓打开网页下载
		} else {
			// ios打开应用商店 https://appstoreconnect.apple.com/
			// apple id  在 app conection 上传的位置可以看到
			const appleId = "xxxxxx"; // 这里替换成你的 apple id
			plus.runtime.launchApplication(
				{
					action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`,
				},
				function (e) {
					console.log(
						"Open system default browser failed: " +
							e.message
					);
				}
			);
		}
	} else if (type == 2) {
		//热更新
		plus.nativeUI.showWaiting(this.$t("dataDesc.updating"));
		uni.downloadFile({
			url: url,
			success: (downloadResult) => {
				if (downloadResult.statusCode === 200) {
					plus.runtime.install(
						downloadResult.tempFilePath,
						{
							force: false,
						},
						function () {
							console.log("install success...");
							plus.nativeUI.closeWaiting();
							// 更新版本信息
							uni.setStorageSync("widgetInfo", {});
							plus.runtime.restart();
						},
						function (e) {
							console.error("install fail...");
							plus.nativeUI.closeWaiting();
						}
					);
				}
			},
			fail: (error) => {
				console.log(error);
			},
		});
	}
}
```

