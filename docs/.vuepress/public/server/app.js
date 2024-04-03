const os = require('os')
const express = require('express')
const app = express()
const IP_SET = new Set() // 用于存储 IP 地址

const networkInterfaces = os.networkInterfaces()

function getLocalIP() {
  for (const iface of Object.values(networkInterfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address
      }
    }
  }
  return '127.0.0.1'
}

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true') // 允许跨域携带凭证
  'Access-Control-Allow-Headers', // 可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  // 中文乱码解决
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use((req, res, next) => {
  const ip = getLocalIP()
  console.log('本地ip地址:', ip)
  IP_SET.add(ip)
  // 输出当前在线人数
  res.send(
    JSON.stringify({
      data: IP_SET.size,
    })
  )
})

app.listen(3999, () => console.log('Server is running on port 3999'))
