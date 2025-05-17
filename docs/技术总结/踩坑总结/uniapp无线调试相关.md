---
title: uniapp无线调试相关
lang: zh-CN
feed:
  enable: true
description: uniapp无线调试相关
---

# uniapp无线调试相关

> 本文作者：[onresize](https://github.com/onresize)

- 无线调试需要安卓真机设备安卓11版本以上
1.插线连接USB、手机开发者模式下打开无限调试模式、第一次需要插数据线、先在工具中将安卓adb无线连接如下图：
<p align="center">
    <img src="/AA_mdPics/h1.png" />
</p>
2.运行 adb tcpip 5555 （端口号）
3.拔出USB线、运行 adb connect 手机IP（192.168.127.30、连接局域网wifi设置中查看IP）、接着跑安卓app就能看到如下图：
<p align="center">
    <img src="/AA_mdPics/h2.png" />
</p>