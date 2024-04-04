export const loopFps = () => {
  if (
    null == globalThis.localStorage.getItem('fpson') ||
    '1' == globalThis.localStorage.getItem('fpson')
  ) {
    var rAF =
        globalThis.requestAnimationFrame ||
        globalThis.webkitRequestAnimationFrame ||
        function (e) {
          globalThis.setTimeout(e, 1e3 / 60)
        },
      frame = 0,
      allFrameCount = 0,
      lastTime = Date.now(),
      lastFameTime = Date.now(),
      loop = function () {
        var e = Date.now(),
          a = e - lastFameTime,
          o = Math.round(1e3 / a)
        if (
          ((lastFameTime = e), allFrameCount++, frame++, e > 1e3 + lastTime)
        ) {
          if ((o = Math.round((1e3 * frame) / (e - lastTime))) <= 5)
            var n = '<span style="color:#bd0000">卡成ppt🤢</span>'
          else if (o <= 15) n = '<span style="color:red">电竞级帧率😖</span>'
          else if (o <= 25) n = '<span style="color:orange">有点难受😨</span>'
          else if (o < 35) n = '<span style="color:#9338e6">不太流畅🙄</span>'
          else if (o <= 45) n = '<span style="color:#08b7e4">还不错哦😁</span>'
          else n = '<span style="color:#39c5bb">十分流畅🤣</span>'
          ;(document.getElementById('fps').innerHTML = `FPS: ${o}🚀`),
            (frame = 0),
            (lastTime = e)
        }
        rAF(loop)
      }
    loop()
  } else document.getElementById('fps').style = 'display:none!important'
}
