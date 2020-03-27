---
title: 'git push error:src refspec master does not match any解决'
tags:
  - git
  - github
categories: git
abbrlink: e0e25902
date: 2017-01-27 15:13:59
---

### 描述

在使用git 添加本地已有的git文件夹到GitHub时, 使用GitHub提示的命令:

git remote add origin https://github.com/xxx/xxx.git
git push -u origin master
第一步顺利执行, 第二步命令行报错:

error: src refspec master does not match any.
error: 无法推送一些引用到 'https://github.com/xxx/xxxxxx.git'

<!-- more -->

### 解决办法如下:

- 注意检查git config配置：

```
git config --global user.email "you@example.com"

git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.
```

- 上述如果没有问题，接下来：



```
git add .
git commit -m "your description"
git push origin master
```

最后可以通过git status 查看文件夹的状态.

如果你和我一样出现如下提示:

> 位于分支 master
> 无文件要提交，干净的工作区

那么就成功解决了。