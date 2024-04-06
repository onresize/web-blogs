---
title: worker
lang: zh-CN
feed:
  enable: true
description: worker
---

# worker

> 本文作者：[onresize](https://github.com/onresize)
- `查看浏览器的worker线程(复制地址栏打开) --> chrome://inspect`

### 1.webWorker
- Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建Worker 线程，将一些任务分配给后台运行。在主线程运行的同时，Worker线程在后台运行，两者互不干扰(主线程代码异常不会影响到其他线程)。等到 Worker线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被Worker 线程负担了，主线程（通常负责 UI交互）就会很流畅，不会被阻塞或拖慢，生命周期：<u>页面关闭就销毁了</u>
- `应用场景`：主要用于复杂计算、图像处理、视频解码
- `特点`：<u>需要遵守<span class="red-txt">同源策略</span>、没有直接访问主线程 `DOM` 和 `JS运行环境` 的能力、无法读取本地文件、但可以使用 navigator 和 location 对象</u>

- ### `1.1.基本使用`
::: details
- 主线程js
```js
// 引入worker脚本文件
const worker = new Worker('worker.js');
// 监听message事件
worker.addEventListener('message', (event) => {
  console.log(event.data);
});

const data = {
  title: '有大量数据需要处理',
  num: 60,
}
// worker.postMessage()方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。
// 发送消息         
worker.postMessage(JSON.stringify(data));

```

- worker线程js
```js
// worker文件
self.addEventListener('message', (event) => {
  // 获取主线程发送过来的消息
  console.log(event.data);
  const { num, title } = JSON.parse(event.data);
  console.log(title); //有大量数据需要处理
  //递归
  function fn(n) {
    if (n === 1 || n === 2) {
      return 1;
    }

    return fn(n - 1) + fn(n -2);
  }

  const newNum = fn(num);
  const newData = {
    title: '已处理完毕',
    num: newNum
  }
  // 处理完毕发送到主线程
  self.postMessage(JSON.stringify(newData));
})

```

- worker 线程中加载脚本
```js
importScripts('./script1.js'); // 加载一个脚本

importScripts('script1.js', 'script2.js'); // 同时加载多个脚本
```

- worker 错误处理
```js
worker.onerror((event) => {
 	console.log(event)
});

worker.onmessageerror((event) => {
 	console.log(event)
});
```

- 为了节省系统资源可以使用完worker后关闭worker
```js
// 主线程
worker.terminate();

// worker线程、self 代表全局对象、不能访问window
self.close();

// worker 线程会被立即杀死，不会有任何机会让它完成自己的操作或清理工作
```
- 嵌入式worker
```js
<script id="worker" type="javascript/worker">
// 这段代码不会被 JS 引擎直接解析，因为类型是 'javascript/worker'

// 在这里写 Worker 线程的逻辑
</script>
<script>
    var workerScript = document.querySelector('#worker').textContent
    var blob = new Blob(workerScript, {type: "text/javascript"})
    var worker = new Worker(window.URL.createObjectURL(blob))
</script>
```
- 也可以通过下面方式来使用
```js
var myTask = `
    onmessage = function (e) {
        var data = e.data;
        console.log('worker:', data);
    };
`;

var blob = new Blob([myTask]);
var myWorker = new Worker(window.URL.createObjectURL(blob));
```

- vite项目导入脚本作为worker
`脚本可以通过 ?worker 或 ?sharedworker 后缀导入为 web worker`
```js
// 在生产构建中将会分离出 chunk
import Worker from './shader.js?worker'
const worker = new Worker()
```

```js
// sharedworker
import SharedWorker from './shader.js?sharedworker'
const sharedWorker = new SharedWorker()
```

```js
// 内联为 base64 字符串
import InlineWorker from './shader.js?worker&inline'
```
:::

### 2.sharedWorker
- SharedWorker 接口代表一种特定类型的 worker，可以从几个浏览上下文中访问，例如几个窗口、iframe 或其他 worker。但这些浏览上下文必须同源、生命周期：<u>页面关闭就销毁了</u>
- `应用场景`：多个窗口、或iframe之间通信
- `特点`：<u>需要遵守<span class="red-txt">同源策略</span>、没有直接访问主线程 `DOM` 和 `JS运行环境` 的能力、不支持IE、兼容性在Safari和移动端不是很好</u>

- ### `2.1.基本使用`
::: details
```js
// main.js（主线程）
const myWorker = new SharedWorker('./sharedWorker.js');

myWorker.port.start(); // 开启端口

myWorker.port.addEventListener('message', msg => {
    console.log(msg.data);
})
```

- 如果采用 onmessage 方法，则默认开启端口，不需要再手动调用 `SharedWorker.port.start()` 方法
```js
// main.js（主线程）
const myWorker = new SharedWorker('./sharedWorker.js');

myWorker.port.onmessage = msg => {
    console.log(msg.data);
};
```
以上两种方式效果是一样的
:::

- ### `2.2.案例：同源下 index.vue文件 和 numberAdd.html文件 共享一个SharedWorker线程实现通信`
::: details
- index.vue
```js
<script setup>
import { ref } from "vue";
const num = ref(0);

// 创建共享进程实例对象
let SW = new SharedWorker("/js/sharedWorker.js");
// 启动端口
SW.port.start();

// 监听接收从SharedWorker传过来的结果，并将其展示到页面中
SW.port.addEventListener("message", (e) => {
  num.value = e.data;
  console.log("vue端接收到sharedWorker中广播的消息：", e.data);
});
</script>
```
- /js/sharedWorker.js
```js
num = 0; // 进行操作的数据，默认值为0
let portsArr = []; // 用来存储各个脚本的MessagePort对象
/**
 * self指向的是SharedWorkerGlobalScope
 */
self.addEventListener("connect", (e) => {
  // 下面三个输出语句只在建立连接的时候输出
  console.log(e); // MessageEvent对象
  console.log(e.ports); // [MessagePort]
  console.log(e.ports[0]); // {MessagePort}

  let port = e.ports[0]; // 获取连接上的MessagePort对象

  port.addEventListener("message", (e) => {
    // 判断是不是断开连接
    if (e.data == "close") {
      // 断开指定端口的连接
      deletePort(port);
    } else {
      e.data == "reset" ? (num = 0) : e.data == "add" ? num++ : e.data == "sub" ? num-- : null;
      // 调用广播方法，让所有界面更新数据
      send(num);
    }
  });

  if (!portsArr.includes(port)) {
    // 将连接的MessagePort存储到数组中
    portsArr.push(port);
  }

  // 启动端口
  port.start();
});

// 广播已连接的端口
function send(number) {
  // 遍历已经连接的MessagePort对象，让所有相关的Html页面都收到来自sharedWorker线程发送的信息
  portsArr.forEach((port) => {
    // 将计算完的结果返回到各个主线程中
    port.postMessage(number);
  });
}

// 将已连接的端口删除
function deletePort(port) {
  // 获取指定MessagePort对象索引
  const index = portsArr.findIndex((item) => item === port);
  console.log(index);
  // 通过按位比较判断指定值是否存在在数组中，正数则表示存在，负数表示不存在
  if (~index) {
    this.portsArr.splice(index, 1);
  }
}

```
- numberAdd.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style></style>
</head>

<body>
  <h1>点击按钮+1</h1>
  <div>结果：num = <span>0</span></div>
  <input type="button" value="+1" />
  <input type="button" value="重置">
  <input type="button" value="关闭连接">

  <script>
    let num = document.getElementsByTagName("span")[0];
    let btn = document.getElementsByTagName("input");
    // 创建共享进程实例对象
    let SW = new SharedWorker("./js/sharedWorker.js");
    // 启动端口
    SW.port.start();

    // 点击按钮，进行加法操作
    btn[0].addEventListener("click", () => {
      console.log("点击按钮，num加1");
      SW.port.postMessage("add"); // 告诉SharedWorker线程进行加法操作
    });

    // 重置
    btn[1].addEventListener('click', () => {
      console.log("重置");
      SW.port.postMessage('reset')
    })

    btn[2].addEventListener('click', () => {
      console.log("断开SharedWorker连接")
      // 让SharedWorker线程删除这边的端口
      SW.port.postMessage('close')
      // 关闭与sharedWorker线程的连接
      SW.port.close()
    })

    // 监听接收从SharedWorker传过来的结果，并将其展示到页面中
    SW.port.addEventListener("message", (e) => {
      num.innerHTML = e.data;
      console.log(e.data);
    });
  </script>
</body>

</html>
```
:::

### 3.serviceWorker
- serviceWorker 一旦注册就会常驻后台、即使当前页面已经关闭了也会一直运行（浏览器插件运行就是这个原理、生命周期: <u>不依赖标签页面</u>）
- `应用场景`：离线访问、资源缓存、网络请求拦截与处理、后台数据同步、推送通知、性能优化