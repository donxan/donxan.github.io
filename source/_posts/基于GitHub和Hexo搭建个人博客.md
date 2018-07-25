---
title: 基于GitHub和Hexo搭建个人博客
date: 2018-03-08 20:13
tags: [Hexo, Github, HTTPS]
categories: Hexo博客
image: 
---


![Hexo博客](http://p7hfnfk6u.bkt.clouddn.com/Snip20180508_10.png)


<!-- more -->



本文是使用Mac电脑, 基于GitHub和Hexo搭建个人博客, 搞了两三天, 反复尝试了无数次, 踩了无数坑搭建起来的, 主要跟大家分享一点小经验, 希望对大家能有帮助!



## github博客简介

github 是全球最大的社交编程及代码托管网站，GitHub可以托管各种git库，并提供一个web界面，但与其它像SourceForge或Google Code这样的服务不同，GitHub的独特卖点在于从另外一个项目进行分支的简易性。这里着重写如何使用Github的page功能搭建个人博客!

> 使用github pages服务搭建博客的好处有：

- 全是静态文件，访问速度快；
- 免费方便，不用花一分钱就可以搭建一个自由的个人博客，不需要服务器不需要后台；
- 可以随意绑定自己的域名，不仔细看的话根本看不出来你的网站是基于github的；
- 数据绝对安全，基于github的版本管理，想恢复到哪个历史版本都行；
- 博客内容可以轻松打包、转移、发布到其它平台；

## 准备工作
- 有一个[github账号](https://github.com/login?return_to=%2Fjoin%3Fsource%3Dheader-home)，没有的话去[GitHub注册](https://github.com/join?source=header-home)一个
- 安装了[node.js](https://nodejs.org/en/)、npm，并了解相关基础知识
- 安装了git 

## 环境搭建
### 安装Node.js
- 用来生成静态页面, 到[Node.js官网](https://nodejs.org/en/)，下载最新版本, 根据提示一路安装即可
- `Node.js`默认会安装 npm
- 也可以使用`Homebrew`进行命令安装, 详情参考[React Native中文网](https://reactnative.cn/docs/0.51/getting-started.html#content)安装方法

### 安装Git
- 用来将本地Hexo内容提交到Github上。下载的Xcode自带Git，这里不再赘述。
- 如果没有Xcode可以参考[Hexo官网](https://hexo.io/docs/)上的安装方法
- 通用版的[Git安装](https://www.git-scm.com/download/win), 无法下载的童鞋，可以去网上搜索下载

### 安装Hexo
当Node.js和Git都安装好后就可以正式安装Hexo了，终端执行如下命令：

```objc
sudo npm install -g hexo
```

此时, 会提示你输入管理员密码(电脑密码), 开始安装

## 本地搭建 hexo 静态博客
- 在电脑中新建一个文件夹, 文件夹名字随意, 如MyBlog
- 在终端, cd 进入该文件夹
- 终端运行 git, 生成hexo模板，可能要翻墙

```objc
hexo init
```

 安装完模板, 安装npm

```objc
npm install
```

最后, 开启hexo服务器

```objc
hexo s
```

此时，浏览器中打开网址http://localhost:4000，能看到如下页面：

![Snip20180303_1.png](http://upload-images.jianshu.io/upload_images/4122543-dfe49f13bcfd743d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

## 将博客与Github关联
### 在GitHub上配置SSH key
为什么要配置这个呢？因为你提交代码肯定要拥有你的github权限才可以，但是直接使用用户名和密码太不安全了，所以我们使用ssh key来解决本地和服务器的连接问题。

#### 首先检查本机是否存在的ssh密钥
- 如果存在, 直接进行步骤1.3, 否则执行步骤1.2生成新的密钥
- 打开终端输入, 注意`~/.ssh`之间没有空格

```objc
cd ~/.ssh
```
如果提示：No such file or directory 说明你是第一次使用git, 或者之前没有安装过SSh密钥

#### 生成新的ssh key
注意后面添加自己注册GitHub的邮箱地址, 打开终端输入

```objc
ssh-keygen -t rsa -C "邮件地址"
```

- 输入命令后, 然后连续回车, 默认会在相应路径下（~/.ssh/id_rsa.pub）生成id_rsa和id_rsa.pub两个文件
- 打开'访达', 选择进入文件夹(快捷键Command+Shift+G), 输入~/.ssh, 进入该文件夹

#### 将ssh key添加到Github中
打开用户目录，找到.ssh\id_rsa.pub文件，记事本打开并复制里面的内容，打开你的github主页，进入个人设置 -> SSH and GPG keys -> New SSH key：

将刚复制的内容粘贴到key那里，title随便填，保存

#### 测试SSH配置是否成功
```objc
ssh -T git@github.com  
```
如果提示`Are you sure you want to continue connecting (yes/no)?`，输入`yes`，然后会看到：

```objc
Hi XXXX! You've successfully authenticated, but GitHub does not provide shell access.
```

看到这个信息说明SSH已配置成功！

#### 更改GitHub用户名和邮箱
```objc
$ git config --global user.name XXXX// 你的github用户名，非昵称
$ git config --global user.email  "xxx@qq.com"// 填写你的github注册邮箱
```

### 关联Github
#### 新建XXX.github.io 的项目
 在 Github 上创建名字为 XXX.github.io 的项目，XXX为必须和自己的 github 用户名一模一样
 
####  修改`_config.yml`文件配置
- 打开本地的 MyBlog 文件夹项目内的_config.yml 配置文件
- 将其中的 type 设置为git，repository 是你 github.io 仓库的 git 地址, 如下所示
- 此处切记, 每一个毛好的后面都要加一个空格, 垂直方向一定要对齐, 否则可能会报错

```objc
deploy:
  type: git
  repository: https://github.com/CoderTitan/CoderTitan.github.io.git
  branch: master
```

#### 将配置文件上传GitHub
- 打开终端, cd到MyBlog文件夹下, 以下命令均在MyBlog文件夹下执行

在blog文件夹目录下执行生成静态页面命令：

```objc
hexo generate     或者：hexo g
```

此时若出现如下报错：

```objc
ERROR Local hexo not found in ~/blog
ERROR Try runing: 'npm install hexo --save'
```

则执行命令：

```objc
npm install hexo --save
```

再执行配置命令：

```objc
hexo deploy           或者：hexo d
```

报错一: 若执行命令hexo deploy仍然报错：无法连接git或找不到git，则执行如下命令来安装hexo-deployer-git：
  
```objc
npm install hexo-deployer-git --save
```

报错二: 若执行命令hexo d报以下错误:

```objc
ERROR Plugin load failed: hexo-server
//或者类似的错误
ERROR Plugin load failed: hexo-renderer-sass

```

则执行响应的命令:

```objc
sudo npm install hexo-server
//或者
sudo npm install hexo-renderer-sass
```

解决玩错误之后, 最后在执行
```objc
hexo d
```

> 几个注意的地方：
> 1. 注册的邮箱一定要验证，否则不会成功；
> 2. 仓库名字必须是：`username.github.io`，其中`username`是你的用户名；
> 3. 仓库创建成功不会立即生效，需要过一段时间，大概10-30分钟，或者更久，我的等了半个小时才生效；
> 4. hexo d命令执行成功后，浏览器中打开网址`http://XXX.github.io`（将XXX换成你的用户名）能看到和打开http:`//localhost:4000`时一样的页面

## 安装theme主题
- 搭建好的默认的主题真的是很丑, 所以这里我们先替换一个好看的主题, 大家更可以到[官方主题](https://hexo.io/themes/)去选择自己喜欢的主题样式
- 示例主题: [Random](hexo-theme-random)

终端cd到 MyBlog 目录下执行如下命令：

```objc
git clone https://github.com/stiekel/hexo-theme-random.git themes/random
```

修改_config.yml中的theme: landscape改为theme: random，然后重新执行hexo g来重新生成

终端cd到MyBlog目录下执行如下命令(每次部署文章的步骤)：

```objc
hexo clean           //清除缓存文件 (db.json) 和已生成的静态文件 (public)

hexo g             //生成缓存和静态文件
 
hexo d             //重新部署到服务器
```

## 域名绑定
- 现在使用的域名是Github提供的二级域名`XXX.github.io`，也可以绑定为自己的个性域名。
- 购买域名，可以到[GoDaddy官网](https://sg.godaddy.com/zh/)，现在 `GoDaddy`已经有中文版了，虽然国家显示是新加坡，但不影响使用, 还可使用支付宝支付
- 也可以到[阿里万网](https://wanwang.aliyun.com/?utm_content=se_1010380)购买, 我是在万网买的，可直接在其网站做域名解析

### 域名解析
如果将域名指向一个域名，实现与被指向域名相同的访问效果，需要增加CNAME记录。登录万网，在你购买的域名后边点击：解析, 如下图

![Snip20180303_4.png](http://upload-images.jianshu.io/upload_images/4122543-952aa0a8a84a089f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


进入解析页面后点击添加解析, 向你的 DNS 配置中添加 3 条记录, 如下图
注意CNAME记录添加的是username.github.io.(不要忘记后面的.), 可能最后一个点不显示(我的就不显示)

![Snip20180303_5.png](http://upload-images.jianshu.io/upload_images/4122543-b2435667d603f844.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 设置GitHub配置信息
- 打开你的XXX.github.io项目地址, 找到设置页面
- 滚动到下方找到`GitHub Pages`模块, 在`Custom domain`, 输入你购买的域名, 点击Save保存

### 创建CNAME文件
- 在/MyBlog/themes/landscape/source目录下新建文件名为：CNAME文件，注意没有后缀名！直接将自己的域名写入
- `CNAME`一定要大写

```objc
//在终端cd到该目录下, 然后输入命令, 即可创建该文件
touch CNAME
```

- 完成上述步骤后, 终端cd到MyBlog目录下执行如下命令重新部署：
- 最后, 等十分钟左右，刷新浏览器，用你自己域名访问下试试

```objc
$ hexo clean

$ hexo g

$ hexo d
```

> #### 至此也算终于大功告成了, 感受一下: https://www.titanjun.top

