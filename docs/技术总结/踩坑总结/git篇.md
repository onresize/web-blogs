---
title: git篇
lang: zh-CN
feed:
  enable: true
description: git篇
---

# git篇

> 本文作者：[onresize](https://github.com/onresize)

<p align="center">
  <img src="/AA_mdPics/code001.png" />
</p>

<p align="center">
    <img src="/AA_mdPics/git.png" />
</p>

### `1.git pull = (git fetch + git merge)`

```js
`git pull`其实就是`git fetch`和`git merge`的组合
git fetch：将远程最新的代码拉取到本地、不会自动合并、因为没有合并、所以代码没变化、但是会获取到最新的提交信息等内容
git pull：会先拉取远程最新内容、会自动合并（相当与执行完`git fetch`, 再执行`git merge`）
```

### `2.git rebase 和 git merge`

```js
# 这两者区别在于提交记录的处理方式
git rebase <分支名>
git rebase --continue // 如果rebase过程中有冲突、处理完冲突后、执行命令继续rebase的过程
git rebase --abort // 如果rebase过程中有冲突、执行命令中断reabase过程、并返回到rebase开始之前的状态
rebase如何使用（这里说明两种演示）例如:
 - 当前dev分支开发了新的页面、在 `git add .` --> `git commit -m fix:xx` 先不push操作、之后执行`git rebase master`、意思就是将当前dev分支的修改移动到master分支上、再切回master分支、执行`git rebase dev` 就会把刚才dev分支的代码同步到master本地分支上

 - 当前dev分支修改了东西、添加并推送同步至远程后、执行`git rebase master`、意思就是将dev分支的修改变基到master分支、切换至master分支、执行`git merge dev`、意思是将dev分支修改的代码合并至master分支、这样也可以了让提交记录干净整洁

// 将dev分支的提交合并到master分支、并会重新创建一个新的合并提交（如果代码冲突、手动解决并重新提交）
git checkout master
git merge dev
git merge --abort // 终止合并

PS: 在公共仓库下、和别人共享共用同一个分支时、应该避免去使用`git rebase`对已经推送到远程仓库的代码进行操作、以免引起混乱、最好的做法是用`git merge`将远程仓库的更新合并到本地分支、解决冲突
```

### `3.git reset 和 git revert`

```js
// 两个都是用于撤销更改、版本回退
`git reset`：主要是在需要撤销的版本上直接更改
`git revert`：是在需要撤销的版本上更改、并新建一个提交信息

// 项目中推荐使用 `git revert` 进行版本回退、这样有记录可查

// 一下命名执行后都会在终端直接进入一个新的提交信息VIM编辑界面、这个新的提交信息包括了回退的修改
git revert HEAD  //（windows下先按任意英文键才能输入、按ctrl + c停止、`:wq`是保存并退出、`:wa!`是放弃更改并退出）
git revert <commitID> // 回退为对于提交id的版本

git revert --continue // 继续执行撤销
git revert --abort // 终止撤销
git revert --skip // 跳过此次撤销的提交
```

### `4.git reset 的 --soft 和 --hard 和 --mixed 和 --merge`

```js
`git reset`的三种模式 soft、mixed、hard (PS: <commitID> 为`git log`查看的提交信息id、:wq退出)

// 输出10行提交信息日志
git log -10 --oneline

# 撤销commit提交、会保留工作区和暂存区的更改
git reset --soft <commitID>

# 撤销之前的提交、会重置暂存区、但保留工作区的更改 `git reset` 的默认模式、简写: git reset
git reset --mixed <commitID>

# 强力重置模式、彻底撤销之前的提交、会重置暂存区和工作区的内容为指定提交的内容（版本回退、回退到任意哪个commitID都行）
git reset --hard <commitID>

// 以上三种模式如果不用<commitID>的方式、可以用HEAD, 具体如下：
git reset --hard HEAD^ // 撤销为上一个版本、一个^表示回退一次提交、^^表示回退两次提交、以此类推
git reset --hard HEAD~1 // HEAD~后面的数字表示撤销为上几个版本

// 恢复合并、一般在 `git merge --abort` 取消合并之后、再执行命令恢复合并
git reset --merge

// PS: 在windows终端上^表示换行、如果出现more?、可以原命令上多写一个^符号、或者用引号包裹如：'HEAD^'
具体解决方案如下：
  git reset --hard 'HEAD^'
  // 或
  git reset --hard^^
  // 或
  git reset --hard HEAD~  或者 git reset --hard HEAD~1  //把^换成~, ~ 后面的数字表示回退几次提交，默认是一次
```

### `5.git cherry-pick`

```js
// 中文翻译：摘樱桃
// 举个例子：在`mian`分支上将`dev`分支的某个指定的commit摘取到`mian`分支
git chekout main
git log // 查看要摘取的提交信息的id
git cherry-pick <commitID>
// 有冲突、解决冲突后提交

PS: `git cherry-pick`不会修改原提交历史、而是创建一个新的提交来应用当前分支指定提交的更改
```

### `6.git stash`

| 命令                      | 说明                                                                                                          |
| :------------------------ | ------------------------------------------------------------------------------------------------------------- |
| git add . 、git stash     | 提交到暂存区                                                                                                  |
| git stash                 | 暂存工作区修改的内容：保存到暂存区（可以提 N 次）                                                             |
| git stash pop             | 恢复暂存的工作区内容：从暂存区取出（最近一次）是 `git stash apply`（恢复） 和 `git stash drop`（删除） 的综合 |
| git stash list            | 查询工作区所有 stash 的列表                                                                                   |
| git stash apply stash@{2} | 查询后，恢复第二次提交的                                                                                      |
| git stash clear           | 清空暂存区的所有 stash                                                                                        |

```js
git stash：暂存代码到工作区、可以提交多次(用法：git add . --> git stash)
git stash pop: 提出暂存区的代码(git stash apply（恢复） + git stash drop（删除）的组合)
git stash clear: 清空暂存区的所有stash

// 应用场景：
- 当在本地dev分支开发某个功能一半的时候、有个main分支更紧急的任务需要处理、这个时候可以用git add . git stash 将dev的分支添加并提交到暂存区、切换main分支去处理、等处理完之后、就可以切回dev分支进行git stash pop提取出原先提交到暂存区的代码 (提交到暂存区保存在本地git下)
```

### `7.修改仓库已经push的commit信息`

```js
git commit --amend // 修改最近一次push的提交信息、输入命令后会进入 vim 编辑模式、按下任意字母键去修改commit信息、ctrl + c 退出编辑、按下 :wq 、再 enter 退出并保存编辑
git push --force // 强制推送到远程仓库、简写： git push -f

```

```js
git commit --amend -m '修改commit信息' // 这种方式会直接修改远程仓库的 commit 信息、区分上面的 vim 编辑模式、这种方式 push 后不会新建一个提交信息
git push -f
```

### `8.忽略pre-commit的提交规范约束`

```js
// 当项目集成了 cz-git, husky 这种约定式规范提交信息、在终端用命令 git commit -m 的时候会被约束阻断 commit
git commit --no-verify -m '提交信息' // 会忽略规范提交的 pre-commit hook、进行提交
```

### `9.解决每次推送gitlab, 都需要提供用户名和个人访问令牌`

```js
- 每次都要复制/粘贴访问 token 非常麻烦。
- 那么是否有一个保存配置选项可以永久保存访问 token ，以便我自动进行身份验证?

// 解决办法：在第一次push前输入以下命令
git config credential.helper store

在您输入凭据后，下次 git 将自动从 .git-credentials（路径： /Users/username） 获取它们
```

### `10.git相关配置`
```js
// 查看git配置有没有刚刚设置的这一项
git config -list // 简写: git config -l 

// 设置上传所有文件最大上限为（1G） 1000 * 1024 * 1024 
git config http.postBuffer 1048576000

// 全局开启SSL验证
git config --global http.sslVerify true

// 全局关闭SSL验证
git config --global http.sslVerify false

// 记录用户信息（记住用户名和密码，后期拉取不用重复输入密码）
git config --global credential.helper store

// 设置禁用忽略大小写、默认是忽略文件大小写
git config core.ignorecase false

// 设置提交代码时的用户信息
git config --global user.name "用户名"
git config --global user.email "用户邮箱"

// Git退出当前账号命令
// 这两个命令可以分别用于清除Git中配置的用户名和邮箱
git config --unset-all user.name
git config --unset-all user.email

// Git退出之前的账号
// 如果我们需要退出Git之前保存的账号，可以使用以下命令清除Git中的用户名和邮箱配置信息
git config --global --unset-all user.name
git config --global --unset-all user.email

// Git退出当前登录
// Git退出当前登录可以通过删除Git的凭证缓存来实现。Git在缓存凭证的过程中，会在用户HOME目录下的~/.git-credentials文件中保存凭证信息，我们可以通过删除这个文件来清除凭证信息
// 如果Git的凭证缓存没有启用，我们可以在退出Git账号后切换到另一个账号来达到退出当前登录的目的
rm ~/.git-credentials


// 查看该项目账号密码邮箱
git config user.name
git config user.password
git config user.email
 
// 查看全局账号密码邮箱
git config --global user.name
git config --global user.password
git config --global user.email
 
// 更改当前文件夹下：
git config user.name "账号"
git config user.password "密码"
git config user.email "邮箱"
 
// 更改全局账号密码邮箱：
git config --global user.name "账号"
git config --global user.password "密码"
git config --global user.email "邮箱"

// 修改Git的网络设置
// 注意修改成自己的IP和端口号
git config --global http.proxy http://127.0.0.1:7890 
git config --global https.proxy http://127.0.0.1:7890

// 查看代理
git config --global --get http.proxy
git config --global --get https.proxy

// 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

// git 无法将空文件夹上传至远程仓库
// 解决办法：在空文件夹下创建一个 .gitkeep 空文件
```

### `11.git add常用命令`
```js
git add .
git add -A
```

### `12.git commit常用命令`
```js
git commit
git commit -m
```

### `13.本地git仓库同时关联gitee和github`
```js
// 创建了gitee仓库并关联、再创建github仓库、选择已有仓库的代码、例：
git remote add github https://xxx.git  // 相反操作把 github 改成 gitee
git remote -v // 查看当前本地仓库关联的远程仓库、就会出现 github 和 gitee 两个仓库地址
显示一个是origin（默认仓库地址）、另一个是github仓库地址

// 关联两个仓库后、默认push是提交到默认仓库、另外一个仓库需要指定仓库分支名 例：
git push github master

// 报错 fatal: unable to access 'https://github.com/…/.git/'
解决方法：执行下面命令
1.git config --global --unset http.proxy
2.git config --global --unset https.proxy
3.ipconfig/flushdns // 清理DNS缓存

修改远程仓库地址：
git remote set-url origin <新远程仓库地址>
    
// 上面方案这样设置后、push代码需要分别push两次、用以下方案解决：
- 设置远程push地址：
1. git remote set-url --add origin <地址> // 给origin添加远程push地址、这样一次push就能同时push到两个地址上面
2. git remote set-url --delete origin <地址> // 如果要删除远程仓库地址

// 当执行git remote -v查看有多个地址源、分别github、origin、gitee这种可以执行下面命令删除指定源地址
git remote rm github // 命令行的 github 为要删除的地址、也可以是 origin 或 gitee
```

### `14.git flow 工作流`
```text
// TODO
```

- ### `Git GUI工具推荐`
  [sourceTree](https://www.sourcetreeapp.com/)&nbsp;
  [Github Desktop](https://desktop.github.com/)&nbsp;
  [Lazygit](https://github.com/jesseduffield/lazygit/releases)
