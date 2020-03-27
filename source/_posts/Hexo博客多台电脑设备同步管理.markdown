---
title: Hexo博客多台电脑设备同步管理
tags:
  - Hexo
  - 多设备
  - 同步管理
categories: Hexo博客
abbrlink: 3ac2f657
date: 2018-04-12 16:55:45
---

- 最近一直在折腾Hexo博客, 玩的可谓是不亦乐乎啊; 这里就整理一下之前遗留的一些问题和一些个性化配置
- 如有遇到搭建个人博客时遇到的问题, 这里可参考我的之前的两篇相关博客
  - [基于GitHub和Hexo搭建个人博客](https://www.titanjun.top/2018/03/08/%E5%9F%BA%E4%BA%8EGitHub%E5%92%8CHexo%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/)
  - [NexT主题配置个性化设置](https://www.titanjun.top/2018/04/03/NexT%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE%E4%B8%AA%E6%80%A7%E5%8C%96%E8%AE%BE%E7%BD%AE/)

<!-- more -->

## 个性化配置

### 返回顶部按钮显示滚动进度
- 打开主题配置文件 `~themes/next/_config.yml` 找到`sidebar`字段
- 把`scrollpercent`的属性改为`true`即可, 如下:


```objc
sidebar:
# Sidebar Position - 侧栏位置（只对Pisces | Gemini两种风格有效）
  position: left        //靠左放置
  #position: right      //靠右放置

# Sidebar Display - 侧栏显示时机（只对Muse | Mist两种风格有效）
  #display: post        //默认行为，在文章页面（拥有目录列表）时显示
  display: always       //在所有页面中都显示
  #display: hide        //在所有页面中都隐藏（可以手动展开）
  #display: remove      //完全移除

  offset: 12            //文章间距（只对Pisces | Gemini两种风格有效）

  b2t: false            //返回顶部按钮（只对Pisces | Gemini两种风格有效）

  scrollpercent: true   //返回顶部按钮的百分比
```

## 多设备管理博客
正常情况下, 我们博客的相关配置信息都是在本地的, 并未上传服务器, 这样当我们想在其他设备, 比如公司的电脑或者原电脑重装了系统, 那么我们便无法再维护我们的博客了
### 环境配置
- 首先你需要在电脑上配置相关环境
  - 安装`Node.js`
  - 安装`git`
  - 安装`hexo`
- 具体安装方式, 可参考这里[基于GitHub和Hexo搭建个人博客](https://www.titanjun.top/2018/03/08/%E5%9F%BA%E4%BA%8EGitHub%E5%92%8CHexo%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/)

### 创建分支
- `hexo`生成的静态博客文件都是上传到`GitHub`上的, 且默认放在`master`分支上, 而一些相关的配置文件都在本地
- `hexo`的源文件（部署环境文件）可以都放在`hexo`分支上（可以新创建一个`hexo`分支），换新电脑时，直接`git clone hexo`分支

#### 对`username.github.io`仓库新建`hexo`分支
在`Github`的`username.github.io`仓库上新建一个`hexo`(分支名字可自定义)分支, 在下图箭头位置输入分支名字,回车即可创建成功

![GitHub新建分支.png](https://upload-images.jianshu.io/upload_images/4122543-a8884eab55430542.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800)

#### 设置默认分支
切换到该`hexo`分支，并在该仓库`->Settings->Branches->Default branch`中将默认分支设为`hexo`，`save`保存

![Snip20180412_1.png](https://upload-images.jianshu.io/upload_images/4122543-61af6e01e50d7837.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800)

### 配置文件上传导`Github`
该步骤需要在搭建博客的电脑上操作(博客配置文件和主题配置文件所在的电脑上操作)

#### 克隆`hexo`分支
- 将上述新建的`hexo`分支克隆到本地, 在终端中`cd`进入该`username.github.io`文件目录
- 在当前目录使用`Git Bash`执行`git branch`命令查看当前所在分支，应为新建的分支`hexo`
- 如果用`Sourcetree`软件管理代码的话, 克隆到本地的项目可能没有`username.github.io`层级, 所有文件都在根目录下, 操作上都不影响, 只需要记住操作要在文件的根目录下即可

```objc
$ git branch
*hexo
```

#### 上传部署文件
- 先将本地博客的部署文件（`Hexo`目录下的全部文件）全部拷贝进`username.github.io`文件目录中去
- 然后安装要用到的一些插件, 有的可能不需要, 但都安装了貌似没有任何影响

```objc
npm install hexo-generator-index --save
npm install hexo-generator-archive --save
npm install hexo-generator-category --save
npm install hexo-generator-tag --save
npm install hexo-server --save
npm install hexo-deployer-git --save
npm install hexo-deployer-heroku --save
npm install hexo-deployer-rsync --save
npm install hexo-deployer-openshift --save
npm install hexo-renderer-marked@0.2 --save
npm install hexo-renderer-stylus@0.2 --save
npm install hexo-generator-feed@1 --save
npm install hexo-generator-sitemap@1 --save
npm install hexo-generator-search --save
npm install hexo-generator-searchdb --save
```

- 最后就是讲所有的文件都提交到`hexo`分支
- 提交时考虑以下注意事项
  - 将themes目录以内中的主题的.git目录删除（如果有），因为一个git仓库中不能包含另一个git仓库，否则提交主题文件夹会失败
  - 后期需要更新主题时在另一个地方`git clone`下来该主题的最新版本，然后将内容拷到当前主题目录即可
- 最后用终端或者管理工具将所有文件提交到`hexo`分支 
> `master`分支和`hexo`分支各自保存着一个版本，`master`分支用于保存博客静态资源，提供博客页面供人访问；`hexo`分支用于备份博客部署文件，供自己维护更新，两者在一个`GitHub`仓库内也不会有任何冲突  


### 同步到其他电脑
- 将新电脑的生成的`ssh key`添加到`GitHub`账户上
  - `ssh key`的配置方式可参考[基于GitHub和Hexo搭建个人博客](https://www.titanjun.top/2018/03/08/%E5%9F%BA%E4%BA%8EGitHub%E5%92%8CHexo%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/)
- 在新电脑上克隆`username.github.io`仓库的`hexo`分支到本地，此时本地`git`仓库处于`hexo`分支
- 切换到`username.github.io`目录，执行`npm install`(由于仓库有一个`.gitignore`文件，里面默认是忽略掉 `node_modules`文件夹的，也就是说仓库的`hexo`分支并没有存储该目录，所以需要`install`下)
  - 如果`node_modules`文件没有丢失, 可不执行该操作
- 到这里了就可以开始在自己的电脑上写博客了！
- 需要注意的是每次更新博客之后, 都要把相关修改上传到`hexo`分支
- 每次换电脑更新博客的时候, 在修改之前最好也要`git pull`拉取一下最新的更新

> 说到这里所有的相关问题基本也都解决了
