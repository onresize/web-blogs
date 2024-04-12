;(function () {
  var s, t
  s = document.createElement('script')
  s.type = 'text/javascript'
  s.id = 'version-polling'
  s.src = '/web-blogs/static/js/version-polling.js'
  t = document.getElementsByTagName('script')[0]
  t.parentNode.appendChild(s, t)
  s.onload = function () {
    VersionPolling.createVersionPolling({
      appETagKey: '__APP_ETAG__',
      pollingInterval: 5 * 1000,
      silent: globalThis?.location?.port == '3080', // 3080端口下不检测
      onUpdate: (self) => {
        const result = confirm('页面有更新，点击确定刷新页面！')
        if (result) {
          self.onRefresh()
        } else {
          self.onCancel()
        }
      },
    })
  }
})()
