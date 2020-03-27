---
title: HTML5学习笔记之音视频标签
date: '2017-06-16 20:01'
tags:
  - HTML5标签
  - CSS
  - WebStorm
categories: HTML5
abbrlink: d95c95af
image:
---





![image](http://upload-images.jianshu.io/upload_images/647982-0d0c0be17835a633.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<!-- more -->


## video标签

### 作用: 播放视频

### video标签格式1:

```html
<video src="">
</video>
```

#### video标签的属性
- src: 告诉video标签需要播放的视频地址
- autoplay: 告诉video标签是否需要自动播放视频
- controls:告诉video标签是否需要显示控制条
- poster: 告诉video标签视频没有播放之前显示的占位图片
- loop: 告诉video标签循环播放视频. 一般用于做广告视频
- preload: 告诉video标签预加载视频, 但是需要注意preload和autoplay相冲, 如果设置了autoplay属性, 那么preload属性就会失效
- muted:告诉video标签视频静音
- width/height: 和img标签中的一模一样


### video标签格式2

```html
<video>
  <source src="" type=""></source>
  <source src="" type=""></source>
</video>
```


- 第二种格式存在的意义
  - 由于视频数据非常非常的重要, 所以五大浏览器厂商都不愿意支持别人的视频格式, 所以导致了没有一种视频格式是所有浏览器都支持的这个时候W3C为了解决这个问题, 所以推出了第二个video标签的格式
  - video标签的第二种格式存在的意义就是为了解决浏览器适配问题. video 元素支持三种视频格式, 我们可以把这三种格式都通过source标签指定给video标签, 那么以后当浏览器播放视频时它就会从这三种中选择一种自己支持的格式来播放
- 注意点:
  - 当前通过video标签的第二种格式虽然能够指定所有浏览器都支持的视频格式, 但是想让所有浏览器都通过video标签播放视频还有一个前提条件, 就是浏览器必须支持HTML5标签, 否则同样无法播放
  - 在过去的一些浏览器是不支持HTML5标签的, 所以为了让过去的一些浏览器也能够通过video标签来播放视频, 那么我们以后可以通过一个JS的框架叫做html5media来实现
  

#### 代码示例

```objc
<video width="200" height="100" poster="http://www.youname.com/images/first.png" autoplay="autoplay" preload="none" controls="controls">
    <!--楚乔传,好像是第4集-->
    <source src="https://v.qq.com/x/cover/dhzimk1qzznf301/t0024jjys1q.html?ptag=baidu.aladdin.tv" >
    <source src="http://www.youname.com/images/first.ogg" />
</video>

```

  
## audio标签

- 作用: 播放音频
- 注意点:
  - audio标签的使用和video标签的使用基本一样
  - video中能够使用的属性在audio标签中大部分都能够使用, 并且功能都一样
  - 只不过有3个属性不能用,`height/width/poster`
- 格式:


```html
<audio src="">
</audio>

<audio>
<source src="" type="">
</audio>
```



## 三.详情和概要标签
### 作用:
- 利用summary标签来描述概要信息, 利用details标签来描述详情信息
- 默认情况下是折叠展示, 想看见详情必须点击

###  格式:

```html
<details>
    <summary>概要信息</summary>
    详情信息
</details>
```


### 示例代码

```html
<!--详情和概要标签-->
<details>
    <summary>概要信息</summary>
    这里是详情: 是假的呢举案说法南石道街开发病那都是独守空房技能速度加快非农数据的看法山东矿机第三方看似简单妇女节看电视呢房间看电视开始的减肥纳斯达克今年初vdsfw的看法今年圣诞节开放男
</details>
```

![Snip20170615_9.png](http://upload-images.jianshu.io/upload_images/4122543-3bd310e521eed10e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## marquee标签

### 作用: 
跑马灯效果

### 格式:

```html
<marquee>内容</marquee>
```

### 属性:

- direction: 设置滚动方向 left/right/up/down
- scrollamount: 设置滚动速度, 值越大就越快
- loop: 设置滚动次数, 默认是-1, 也就是无限滚动
- behavior: 设置滚动类型 slide滚动到边界就停止, alternate滚动到边界就弹回

### 注意点:
> marquee标签不是W3C推荐的标签, 在W3C官方文档中也无法查询这个标签, 但是各大浏览器对这个标签的支持非常好

### 示例代码

```html
<!--跑马灯-marquee标签-->
<marquee direction="left" scrollamount="5">跑马灯</marquee>
<marquee direction="right" scrollamount="3">marquee</marquee>
<marquee direction="up" scrollamount="1">标签</marquee>
<marquee direction="down" scrollamount="1">down</marquee>

```

![Snip20170615_10.png](http://upload-images.jianshu.io/upload_images/4122543-6bc10b374b5e362e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 注: 实际的效果中,这三个是一直在滚动的,只是图片看不到效果,自己亲自实践感受下吧!


## HTML中被废弃的标签

> 由于HTML现在只负责语义而不负责样式.但是HTML一开始有一部分标签连样式也包揽了, 所以这部分标签都被废弃了


```html
b、u、i、s 
- 以上标签自己带有样式, 有浓厚的样式作用, 今后一般都只作为CSS钩子使用
- 原则: 不到万不得已,切记不要使用如上标签. 大家可以到BAT的网站查看源代码, 几乎看不到以上标签
```

- b(Bold)作用: 将文本字体加粗
  - 格式:`<b>将文本字体加粗</b>`
- u(Underlined)作用: 为文本添加下划线
  - 格式: `<u>为文本添加下划线</u>`
- i(Italic)作用: 显示斜体文本效果
  - 格式: `<i>显示斜体文本效果</i>`
- s(Strikethrough)作用: 为文本添加删除线
  - 格式: `<s>为文本添加删除线</s>`
  

> 为了弥补 b、u、i、s标签的不足, W3C又推出了一组新的标签, 这些标签在显示上看似和buis没什么区别, 但是在语义上却有重大区别

- strong作用: 着重内容
  - 格式:`<strong>着重内容</strong>`
- ins(Inserted)作用: 新插入的文本
  - 格式:`<ins>新插入的文本</ins>`
- em(Emphasized)作用:强调内容
  - 格式:`<em>强调内容</em>`
- del(Deleted)作用: 已删除的文本
  - 格式:`<del>已删除的文本</del>`



 示例代码

```html
<!--新增标签-->
<strong>着重内容</strong>
<ins>新插入的内容</ins>
<em>强调的内容</em>
<del>已经删除的内容</del>

```

![Snip20170615_11.png](http://upload-images.jianshu.io/upload_images/4122543-595238b7fcc8c71f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



> 对HTML5语言有兴趣的同学,给大家极力推荐:江哥的视频[HTML5 + 跨平台开发](http://study.163.com/course/introduction.htm?courseId=1003864040),只是不知道会不会继续更新