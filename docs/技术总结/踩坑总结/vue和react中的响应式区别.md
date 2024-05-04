---
title: vue和react中的响应式区别
lang: zh-CN
feed:
  enable: true
description: vue和react中的响应式区别
---

# vue和react中的响应式区别

> 本文作者：[onresize](https://github.com/onresize)

### ✨vue中的响应式更新
#### 1.依赖收集
- `vue2` 中使用 `Object.defineProperty()` 方法对对象进行拦截监听、而 `vue3` 使用 `proxy API` 对对象拦截、当渲染一个组件时、通过 `getter` 监听到模板哪些数据被访问、并记录下它们的依赖关系

#### 2.变化通知
- 当监听的属性发生变化时、通过 `setter` 触发回调（副作用函数）去更新视图

#### 3.优化策略
- `vue` 中用了虚拟DOM、依赖跟踪、异步更新这些技术、确保大量的状态更新时尽可能减少DOM操作、比如: `v-for` 中为什么不建议用可迭代对象索引作为key、当数组更新渲染时、根据这个key来最小化dom操作的更新、如果这个key用的是所以、可能造成渲染错误、和增加了真实DOM的渲染更新

### ✨react中的响应式更新
#### 1.虚拟DOM Diffing
- react不会直接追踪每个变量的变化、而是通过 `props` 和 `state` 去驱动数组的更新、当 `props` 和 `state` 变化时、组件会重新渲染并生成一个新的虚拟DOM树、props是通过 `Object.is` 来比较自身是否变化

#### 2.差异比较
- react会将新旧DOM树进行一个比对(diff算法、增量更新算法)、找出最小化的DOM更改、然后应用这些更改到真实DOM上来完成页面的渲染更新

### ✨两者响应式对比

| 框架         | Vue                                             | React                                                      |
| ------------ | ----------------------------------------------- | ---------------------------------------------------------- |
| 数据绑定方式 | 基于对象属性的getter/setter拦截（双向数据绑定） | 单向数据流（props向下传递，状态变化触发重新渲染）          |
| 响应式原理   | 依赖收集 + 变化通知                             | 组件生命周期方法、state变更触发重渲染                      |
| 虚拟DOM      | 提供                                            | 提供                                                       |
| DOM更新策略  | 自动追踪变化并最小化DOM操作                     | 使用虚拟DOM diff算法进行高效更新                           |
| 优化技术     | 依赖跟踪、异步更新队列等                        | shouldComponentUpdate, PureComponent, React.memo等组件优化 |

