---
title: uniapp写APP整包升级更新
lang: zh-CN
feed:
  enable: true
description: uniapp写APP整包升级更新
---

# uniapp写APP整包升级更新

> 本文作者：[onresize](https://github.com/onresize)

[uni-app 整包升级/更新方案](https://ask.dcloud.net.cn/article/34972)&nbsp;
[uni-app 资源在线升级/热更新](https://ask.dcloud.net.cn/article/35667)
::: tip
注意：一定要使用plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) =>())，回调函数返回的wgtinfo对象的versionCode做判断，wgtinfo.version是版本字符串，wgtinfo.name是app应用名称
:::

```js
/**
  * app整包更新检测
  */
appUpgrade() {
  //#ifndef APP-PLUS
  uni.showToast({
    title: '目前只支持Android版本软件更新',
    icon: 'none'
  })
  //#endif
  //#ifdef APP-PLUS
  uni.getSystemInfo({
    success: sysInfo => {
      let platform = sysInfo.platform
      plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
        // app版本字符串如：1.1.0
        // this.appInfo.version = wgtinfo.version
        // app名称
        // this.appInfo.name = wgtinfo.name
        let params = {
          appid: plus.runtime.appid,
          // app整数版本号，如110，一定要用versionCode做判断
          version: wgtinfo.versionCode,
          platform: platform
        }
        this.$minApi.findUpgradeApp(params).then(appRes => {
          if (appRes.appid) {
            uni.showModal({
              title: "下载更新提示",
              content: appRes.note,
              showCancel: false,
              confirmText: '确定',
              success: sucRes => {
                if (sucRes.confirm) {
                  // openURL是打开本手机浏览器下载，不推荐使用该方法
                  // plus.runtime.openURL(appRes.url)
                  // 推荐使用如下方法，会自动下载调用系统应用商店打开apk进行安装，安装后重新打开
                  uni.downloadFile({
                    url: appRes.url,
                    success: downloadResult => {
                      if (downloadResult.statusCode === 200) {
                        plus.runtime.install(
                          downloadResult.tempFilePath, {
                            force: false
                          },
                          function() {
                            // console.log('install success...')
                            plus.runtime.restart()
                          },
                          function(e) {
                            // console.error('install fail...')
                          }
                        )
                      }
                    }
                  })
                }
              }
            })
          } else {
            uni.showToast({
              title: '已经是最新版本了。',
              icon: 'none'
            })
          }
        })
      })
    }
  })
  //#endif
}
```