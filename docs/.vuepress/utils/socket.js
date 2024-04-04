import { io } from 'socket.io-client'

const socket = io('https://onresize.vercel.app:443', {
  withCredentials: true,
  // extraHeaders: {
  //   'my-custom-header': 'abcd',
  // },
  transports: ['websocket'],
})

// 显示用户数量的代码
const userNumber = (num) => {
  globalThis.onlineUsers = num
}

// 手动断开连接
const destNetWork = () => {
  // console.log('手动断开连接...')
  socket.disconnect()
}

socket.on('connect', () => {
  // console.log('服务已连接...')
})

socket.on('disconnect', () => {
  let count = globalThis.onlineUsers - 1
  globalThis.onlineUsers = count < 0 ? 0 : count
  // console.log('服务断开连接, 当前在线人数:', globalThis.onlineUsers)
  setTimeout(() => {
    document.getElementById('online_user').innerText = globalThis.onlineUsers
  }, 0)
})

socket.on('online-number', (data) => {
  userNumber(data)
})

export default destNetWork
