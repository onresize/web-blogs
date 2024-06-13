const spawn = require('cross-spawn')

// 获取命令行参数
function getArgs() {
  const args = {}
  process.argv.slice(2, process.argv.length).forEach((arg) => {
    // long arg
    if (arg.slice(0, 2) === '--') {
      const longArg = arg.split('=')
      const longArgFlag = longArg[0].slice(2, longArg[0].length)
      const longArgValue = longArg.length > 1 ? longArg[1] : true
      args[longArgFlag] = longArgValue
    }
    // flags
    else if (arg[0] === '-') {
      const flags = arg.slice(1, arg.length).split('')
      flags.forEach((flag) => {
        args[flag] = true
      })
    }
  })
  return args
}

const { repo } = getArgs()

process.env.repo = repo
console.repo = repo

const childProcess = spawn('npm', ['run', 'build'], { stdio: 'inherit' })
// 监听子进程的 'close' 事件
childProcess.on('close', (code) => {
  console.log(`子进程退出，退出码：${code}`)
})
