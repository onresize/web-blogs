---
title: 项目生成md目录树
lang: zh-CN
feed:
  enable: true
description: 项目生成md目录树
---
# 项目生成md目录树
>
> 本文作者：[onresize](https://github.com/onresize)
>

- #### `方法一：mddir`

`安装`

```bash
npm i mddir -g
```

`使用`

```js
// 在当前目录使用命令，默认生成到当前目录
mddir

// 保存到相对目录
mddir ~/Documents/whatever

// 保存到绝对目录
mddir /absolute/path
```

- #### `方法二：treer`

`安装`

```bash
npm i treer -g
```

`使用`

```js
// 忽略指定文件夹
treer -i 'node_modules'

// 保存目录结构到文件
treer -e 'directoryList.md'

// 忽略指定目录并保存
treer -i 'node_modules' -e 'directoryList.md'
```

- #### `方法三：tree命令`

```js
// 当前目录生成到根目录下list.txt
tree .> list.txt
```

