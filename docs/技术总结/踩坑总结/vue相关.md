---
title: vue相关
lang: zh-CN
feed:
  enable: true
description: vue相关
---

# vue相关

> 本文作者：[onresize](https://github.com/onresize)

### 1.vue2中data为什么设计成函数而不是对象?
- 官方解释vue2中是通过 `Object.defineProperty` 对data中返回的对象进行遍历、用setter/getter监听对象的变化、如果data是使用对象的形式会存在引用内存地址的问题、多个vue组件共用data会造成数据污染、而用函数的形式存在作用域、就可以解决数据污染的问题

### 2.nextTick原理?
- nextTick是在vue中的定义是：在下一次dom更新之后刷新的一个工具方法、通常情况下属于微任务、vue就是通过虚拟dom和异步更新的策略来提高性能、对于数组更新会被放入一个队列中、而不是立马更新、它会被推迟到在下一个事件循环中执行
- nextTick优先使用 `promise` 来实现、如果浏览器不支持promise、则会用其他兜底方案、比如 `mutationObserver`、`setTimeout`

<!-- ### 3.动态组件 `<component />` 是怎么实现的? -->