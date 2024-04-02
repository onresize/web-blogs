---
title: CICD相关
lang: zh-CN
feed:
  enable: true
description: CICD相关
---

# CICD相关

> 本文作者：[onresize](https://github.com/onresize)

- #### `CI/CD (持续集成/持续部署)方案:`

```bash
1.使用官方gitlab自带runner搭建cicd（ps: gitlab在设置偏好中改中文字体）
2.私有化搭建gitlab（这样代码在自己服务器上更保险、推荐宝塔面板直接安装gitlab社区版、前提条件推荐物理内存最低4G）、再配置runner搭建cicd
3.使用github actions搭建cicd
```

- #### `多环境使用 gitLab 自带cicd`

```bash
准备：购买服务器(centos 7.6)、开放对应安全组端口号、ssh远程连接服务器终端
宝塔面板安装参考：https://www.bt.cn/bbs/thread-19376-1-1.html

# 我这里安装 gitlab runner 程序的服务器是 centos 7.6，如果是 ubuntu 需要用 apt-get
# 防止默认安装 git 1.x 版本
sudo yum install https://packages.endpointdev.com/rhel/7/os/x86_64/endpoint-repo.x86_64.rpm -y

# 安装 git、node 等
yum install nodejs npm git -y 
```

- #### `服务器安装git-runner（这里以mac演示）`

```bash
在 gitlab 仓库的设置 Settings - CI/CD - Runners 中，可以创建 Project runner，如下图
```

![](/AA_mdPics/code006.webp)

```bash
点击新建 runner
选择安装 gitlab runner 程序的服务器操作系统，我使用的是 CenterOs 服务器，选择 Linux
填写这个 runner 的 tag（我这里填的是 dev-zuo），部署任务 Job 与 tag 关联，可以指定仅这个 runner 可以触发该 Job 执行
可选的 Details，可以给这个 runner 加一个描述
```

![](/AA_mdPics/code007.webp)

`填写完上面的信息，点击创建 runner，会进入一个注册 runner 的引导页面，如下图`

![](/AA_mdPics/code008.webp)

`默认给的命令会有坑，如果完全按照官方给的执行，后面 CI/CD 会出现执行命令没权限的问题，建议直接使用 root, `[gitlab-runner的无权限问题](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000039202482)

```bash
服务器终端执行以下命令：

# 下载 gitlab-runner
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

# 给下载的 gitlab-runner 添加可执行权限
sudo chmod +x /usr/local/bin/gitlab-runner

# （有坑 - 不推荐）创建一个 GitLab Runner 用户
# useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash

# （有坑 - 不推荐） 安装、运行 gitlab-runner
# gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner

# 推荐直接使用 root 用户，方便命令执行，不然 CI/CD 时总是提示没权限
gitlab-runner install --working-directory /home/gitlab-runner --user root
gitlab-runner start
```

```bash
完成以上命令服务器就已经安装了 gitlab-runner 并启动

1.接着执行上图 Setp1
gitlab-runner register
  --url https://gitlab.com
  --token glrt-i8xxxxxxxx # 这里直接 copy 页面中的指令，不同的用户，token 会不一样
运行效果如下图，会让你选择一个 runner executor，指定运行 CI/CD 使用的环境，这里我选的 shell
2.继续执行上图 Setp2 (如果这一步没执行会导致、在gitlab仓库的设置 Settings - 构建 - 流水线的job一直处于pending状态)
gitlab-runner run 

查询当前用户：whoami
检查gitlab-runner是否真正运行：gitlab-runner status 
服务器上国内镜像安装nvm: curl -o- https://gitee.com/mirrors/nvm/raw/v0.39.0/install.sh | bash
```

![](/AA_mdPics/code009.webp)

```bash
- 配置步骤详解
# 在gitlab的组或项目中的设置-cicd-runner或获取：GitLab 地址
Enter the GitLab instance URL (for example, https://gitlab.com/): 
> 输入gitlab的服务URL、如果搭建了私有化gitlab就输入对应ip或域名地址

# 输入 GitLab Token
Enter the registration token: 
> 输入令牌,参考图中绿色部分所示

# 输入 Runner 的描述
Enter a description for the runner: 
> 这里的描述也是 runner 的名称

# 设置 Tag，可以用于指定在构建规定的 tag 时触发 ci
Enter tags for the runner (comma-separated)
> test

# 输入可选维护说明
Enter optional maintenance note for the runner: 
> runner 的描述内容，随便写

# 选择 runner 执行器，通常选择 shell
Enter an executor: docker+machine, docker-ssh+machine, custom, docker-windows, docker-ssh, ssh, kubernetes, docker, parallels, shell, virtualbox:
> shell

# 回车结束，安装gitlab-runner文件夹下会自动生成config.toml
```

`完成后，进入仓库 - 设置 - Runners 位置，即可看到 runner 状态，如下图`

![](/AA_mdPics/code010.webp)

`在runner的编辑图标进去编辑、按下面勾选操作
如果不选中 「运行未标签的作业」， CI/CD 任务会一直被阻塞挂起`

![](/AA_mdPics/code014.png)

 - #### `如果服务器安装1.x版本的git、执行以下命令更新2.x版本git、不然可能会出现 `fatal: git fetch-pack: expected shallow list` 错误`

```bash
服务器更新git(推荐更新至最新版本、防runner止执行jobs意外错误):
 -安装源: yum install http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
 -更新git软件: yum install git -y
 -检查版本测试: git --version
```

 - #### `在项目根目录下创建.gitlab-ci.yml文件 (这里以vue脚手脚项目为例)`

```bash
yml语法参考：https://docs.gitlab.com/ee/ci/yaml/#when
mac使用scp命令参考：https://blog.csdn.net/XreqcxoKiss/article/details/129299980

下面演示的是【多环境、多分支】main为发布环境、test为测试环境、执行不同的deploy job

如果npm run build执行失败、在脚本加上 'CI=false &&' 表示忽略npm warn那些警告、继续执行 
"build": "CI=false && vuepress build docs",
```

```yml
image: node:16

stages:
  - build
  - deploy

cache: # 缓存
  paths:
    - node_modules

build-job:
  stage: build
  script:
    - echo "执行build阶段-----------------------------"
    - nvm use 16.20.2
    - node -v
    - npm config set registry https://registry.npmmirror.com
    - npm config get registry
    - npm install
    - npm run build
  # 执行文件为dist
  artifacts:
    paths:
      - dist

deploy-job-main:
  stage: deploy
  image: ringcentral/sshpass:latest
  script:
    - echo "执行deploy阶段-------------main分支---------------"
    - git version
    - sshpass -p $PASSWORD scp -o StrictHostKeyChecking=no -r ./dist/* $CUSTOM_USERNAME@$CUSTOM_IP:/www/wwwroot/main/
  # main分支触发这个job
  only:
    - main

deploy-job-test:
  stage: deploy
  image: ringcentral/sshpass:latest
  script:
    - echo "执行deploy阶段--------------test分支--------------"
    - git version
    - sshpass -p $PASSWORD scp -o StrictHostKeyChecking=no -r ./dist/* $CUSTOM_USERNAME@$CUSTOM_IP:/www/wwwroot/test/
  # test分支触发这个job
  only:
    - test
```

`$PASSWORD、$CUSTOM_USERNAME、$CUSTOM_IP 为自定义的变量(分别是服务器密码、用户名、ip)，如下图`

![](/AA_mdPics/code011.png)

` 创建变量的时候取消勾选如下图、不然会导致main以外的分支执行这个yml文件的时候无法读取这些变量`

![](/AA_mdPics/code012.png)

`每次push提交代码就会执行.gitlab-ci.yml文件、下图为详细执行流程
如果一直处于pending状态、在服务器下执行 gitlab-runner run`

![](/AA_mdPics/code013.png)



- #### `使用github actions配置CI/CD`


`github actions相对简单点` [视频教程:](https://www.bilibili.com/video/BV1RE411R7Uy)
 
 `1.在Actions下、点击new workflow、选择 Skip this and set up a workflow yourself
 2.会默认跳转到编辑main.yml文件、写好对应文件保存即可
 以下为main.yml示例：`

```yml
# This is a basic workflow to help you get started with Actions

name: ci_deploy

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      - name: install Node.js
        uses: actions/setup-node@v2.5.0
        with:
          node-version: "14.X"
      - name: install dep
        run: npm install
      - name: build app
        run: npm run build
      - name: copy file via ssh password
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          password: ${{ secrets.REMOTE_PASS }}
          port: 22
          source: "docs/"
          target: ${{ secrets.REMOTE_TARGET }}
```

`对应的项目是vuepress文档项目
docs/ 为打包后要上传的文件
port: 22 为ssh默认端口、需要服务器安全组开放22端口
REMOTE_HOST、REMOTE_USER、REMOTE_PASS为自定义的变量分别代表、服务器IP、用户名、密码
添加变量在Settings --> secrets and variables --> Actions --> secrets --> Repository secrets`

`完成以上步骤后、当本地代码 push 时就会执行这个 main.yml 文件的脚本`

```bash
scp本地指定文件上传到服务器指定目录： 
scp -r ./docs/.vuepress/dist/* root@47.113.190.10:/www/wwwroot/47.113.190.10/docs/.vuepress/dist/
```

