---
title: nvm控制node版本基本使用
lang: zh-CN
feed:
  enable: true
description: nvm控制node版本基本使用
---

# nvm控制node版本基本使用

> 本文作者：[onresize](https://github.com/onresize)

### `1.安装nvm`
[下载地址](https://github.com/coreybutler/nvm-windows/releases/download/1.1.6/nvm-setup.zip)
- `ps: 下载安装安装不要用中文路径`

- 安装成功后在安装目录下找到`setting.txt`文件添加
```js
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

```bash
# 查看可下载的node版本、LTS为稳定版
nvm list available 
# or
nvm ls available 

# 安装 14.17.0 版本node
nvm install 14.17.0 

# 使用这个版本
nvm use 14.17.0

#查看npm版本
npm -v 

# 查看node版本
node -v 
```

```bash
# 查看已经安装的node版本
nvm ls 
# or
nvm list 
# or
nvm list installed 

nvm install < version >  # 安装指定node版本，如安装v14.15.4版本 既可以nvm install v14.15.4，又可以nvm install 14.15.4

nvm uninstall < version > # 删除已安装的指定版本，语法与install语法类似

nvm ls-remote  # 列出所有远程服务器的版本（官方node version list）

nvm current  # 显示当前使用的node版本

nvm use < version >  # 切换使用指定的node版本

nvm use [version] [arch]  # 切换指定的node版本和位数

nvm alias < name > < version >  # 给不同的版本号添加别名

nvm unalias < name > # 删除已定义的别名

nvm reinstall-packages < version > # 在当前版本node环境下，重新全局安装指定版本号的npm包

nvm on  # 打开nodejs控制

nvm off  # 关闭nodejs控制

nvm root  # [path] 设置和查看root路径

nvm proxy  # 查看设置与代理
```

### `2.安装指定node版本`

```bash
npm install -g n

# 安装指定版本node命令：
n v14.15.4 
# or
n 14.15.4  
```

`PS：已安装了node要卸载掉、才能正常切换版本`

### `3.node历史镜像`

```js
// 官网地址1:
https://nodejs.org/zh-cn/download/releases/

// 官网地址2：
https://nodejs.org/dist/

// 阿里镜像:
https://npm.taobao.org/mirrors/node/
```

- #### `nvm安装好、nvm use xxx版本后、npm -v会报错不是外部命令`
- `方案1`：历史镜像下载对应nvm下载的node版本的x64.zip、解压（解压之后node_moudes下就有对应node版本的npm版本包）放在nvm安装文件夹下（文件夹名改成v14.x.x类似的命名）、这样npm -v就正常（这种可用来下载nvm下载不了的历史版本、通过下载zip更换nvm下的对应版本文件夹、nvm ls 就能看到历史版本、npm也同时安装）

- `方案2`：历史镜像下载对应nvm下载的node版本的msi文件、安装c盘默认位置、这样nvm文件下对应node版本的文件夹会多出东西、npm -v就能正常使用（这种方式就不需要改文件夹名）