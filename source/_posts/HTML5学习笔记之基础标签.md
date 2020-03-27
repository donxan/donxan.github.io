---
title: HTML5学习笔记之基础标签
date: '2017-06-15 20:17'
tags:
  - HTML5标签
  - CSS
  - WebStorm
categories: HTML5
abbrlink: 7ab2d054
---

HTML5学习笔记之基础标签
<!-- more -->

## 列表标签

### 无序列表(unordered list)
- 无序 : 没有先后之分
- 给一堆内容添加无序列表语义(一个没有先后顺序整体), 列表中的条目是不分先后
- ul应用场景:
  - 导航条
  - 商品列表等
  - 新闻列表

#### 格式:
- li 英文是 list item, 翻译为列表项


```objc
    <h4>中国城市列举(CN)</h4>
<ul>
    <li>北京</li>
    <li>上海</li>
    <li>广州</li>
    <li>杭州</li>
</ul>

```

![Snip20170614_4.png](http://upload-images.jianshu.io/upload_images/4122543-6170aa7da4bd362f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 注意:

- ul是一个组标签, 一定是一坨一坨的出现, 也就是说li标签不能单独存在, 必须包裹在ul里面
- 由于ul和li是一个整体, 所以ul里面不推荐包裹其它标签, 永远记住ul里面最好只写li标签
- 虽然ul中推荐只能写li标签, 但是li标签是一个容器标签, li标签中可以添加任意标签, 甚至可以添加ul标签
- 其实ul还有一个type属性, 可以修改先导符号的样式, 取值有disc、square、circle几种

取值 | 说明
---|---
disc | 项目符号显示为实体圆心,默认值
square | 项目符号显示为实体方心
circle | 项目符号显示为空心圆



```html
<h4>课程安排</h4>
<ul>
    <li>
        上午
        <ul>
            <li>HTML5</li>
            <li>CSS</li>
        </ul>
    </li>
    <li>
        下午
        <ul>
            <li>OC</li>
            <li>Swift</li>
        </ul>
    </li>

</ul>
```

![Snip20170614_5.png](http://upload-images.jianshu.io/upload_images/4122543-3e921651c9eb3c47.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 有序列表(ordered list)

- 作用: 给一堆内容添加有序列表语义(一个有顺序整体), 列表中的条目有先后之分
- ol应用场景:
  - xxx排行榜
  - 其实ol应用场景并不多, 因为能用ol做的用ul都能做
  - ul的常见属性start、type属性, 可以修改先导符号的样式和序号

取值 | 说明
---|---
1 | 使用数字作为项目符号
A/a | 使用大写/小写字母作为项目符号
I/i | 使用大写/小写罗马数字作为项目符号


```html
<h4>中国房价排行榜</h4>
<ol>
    <li>北京</li>
    <li>上海</li>
    <li>杭州</li>
    <li>广州</li>
    <li>深圳</li>
</ol>

```

![Snip20170614_6.png](http://upload-images.jianshu.io/upload_images/4122543-13f9b32478195bac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 定义列表(definition list)

- 给一堆内容添加列表语义, 通过dt罗列出列表的条目, 然后再通过dd给每个条目进行相应的描述
- dl应用场景:
  - 网站底部相关信息
  - 但凡看到一堆内容都是用于描述某一个内容的时候就要想到dl

#### 格式:

- dt英文definition title, 翻译为定义标题
- dd英文definition description, 翻译为定义描述信息

```objc
<dl>
    <dt>北京</dt>
    <dd>国家的首都</dd>
    <dt>杭州</dt>
    <dd>坑爹,房价上涨最快的地方</dd>
</dl>

![Snip20170614_7.png](http://upload-images.jianshu.io/upload_images/4122543-2d304b7b5f58b8c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```


![Snip20170614_9.png](http://upload-images.jianshu.io/upload_images/4122543-4429f20791990a71.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 注意事项:
- dl是一个`组标签`, 一定是一坨一坨的出现, 也就是说`dt`和`dd`标签不能单独存在, 必须包裹在`dl`里面
- 由于`dl`和`dt`、`dd`是一个整体, 所以`dl`里面不推荐包裹其它标签
- `dd`和`dt`和`li`标签一样是容器标签, 里面可以添加任意标签
- 定义列表非常灵活, 可以给一个`dt`配置多个`dd`, 但是最好不要出现多个`dt`对应一个`dd`, `dd`的语义是描述离它最近的一个`dt`, 所以其它`dt`相当于没有描述, 而定义列表存在的意义就是既可以列出每一个条目又可以对每一个条目进行描述
- 定义列表非常灵活, 可以将多个`dt+dd`组合拆分为多个`dl`


### 列表对比

类型 | 说明 | 项目符号
---|---|--
无序列表 | 以`<ul>`标签来实现, 以`<li>`标签表示列表项 | 通过type属性设置项目符号: disc（默认）、square和circle
有序列表 | 以`<ol>`标签来实现, 以`<li>`标签表示列表项 | 通过type属性设置项目顺序: 1(数字，默认)、A(大写字母)、a(小写字母)、I(大写罗马数字)和i(小写罗马数字) 
定义列表 | 以`<dl>`标签是实现, 以`<dt>`标签定义列表项, 以`<dd>`标签定义内容 | 无项目符号和显示顺序




## H/P/Hr/br标签

### H系列标签

- 用于给文本添加标题语义(Header 1~Header 6)
- 格式: `<h1>xxxxxx</h1>`
- 注意点:
  - H标签是用来给文本添加标题语义的, 而不是用来修改文本的样式的
  - H标签一共有6个, 从H1~H6, 最多就只能到6, 超过6则无效
  - 被H系列标签包裹的内容会独占一行
  - 在H系列的标签中, H1最大, H6最小
  - 在企业开发中, 一定要慎用H系列的标签, 特别是H1标签. 在企业开发中一般情况下一个界面中只能出现一个H1标签(和SEO有关)


### P标签(Paragraph)

- 告诉浏览器哪些文字是一个段落
- 格式: `<p>xxxxxxxx</p>`
- 在浏览器中会单独占一行

### Hr标签(Horizontal Rule)

- 在浏览器上显示一条分割线
- 格式: `<hr />`
- 注意点:
  - 在浏览器中会单独占一行
  - 通过我的观察发现HR标签可以写/也可以不写
    - 如果不写/那么就是按照HTML的规范来编写
    - 如果写上/那么就是按照XHTML的规范来编写.
  - 由于hr标签是用来修改样式的, 所以不推荐使用. 今后开发中添加水平线一般都使用CSS盒子来做


### br标签(Break)

- 作用: 让内容换行
- 格式: `<br/>`
- 注意点:
  - br的意思是不另起一个段落进行换行, 而网页中99.99%需要换行时都是因为另起了一个段落, 所以应该用p来做


### 字体样式标签

- 加粗：`<strong>…</strong>`、`<b>..</b>`
- 斜体：`<em>…</em>`、`<i></i>`

```html
<strong>徐志摩人物简介</strong>
<p>
   <em>1910</em>年入杭州学堂<br/>
   <em>1918</em>年赴美国克拉大学学习银行学<br/>
</p>
```

### 注释和特殊符号

特殊符号 | 字符实体 | 示例
--|--|--
空格 | `&nbsp;` | `<a href="#">百度</a>&nbsp; &nbsp;<a href="#">新浪</a>`
大于号(>) | `&gt;` | 如果时间`&gt;`晚上6点，就坐车回家
小于号(<) | `&lt;` | 如果时间`&lt;`早上7点，就走路去上学
引号(") | `&quot;` | W3C规范中，HTML的属性值必须用成对的`&quot;`引起来
版权符号© | `&copy;` | `&copy;` 2003-2013


### HTML注释(Annotation)

#### 什么是注释

- 注释格式: `<!--被注释的内容-->`
- 注意点:
  - 被注释的内容不会在浏览器中显示, 注释是写给我们自己看的
    - 注释不能嵌套使用
- 快捷键: `ctrl + /`

`<!--<!--被注释的内容-->-->`


#### 示例代码

```objc
<h1>标题1</h1>
<h2>标题2</h2>
<h3>标题3</h3>
<h4>标题4</h4>
<h5>标题5</h5>
<h6>标题6</h6>
<h7>我是假的,标题7</h7>

<!--我是注释-->
<hr />

<p>告诉浏览器哪些文字是一个段落</p>

<!--下面是分割线-->
<hr />

```


![Snip20170614_10.png](http://upload-images.jianshu.io/upload_images/4122543-1ebb54835bf8f28b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## img标签(image)

- 作用: 在网页上插入一张图片
- 格式: `![image](http://note.youdao.com/favicon.ico)`
- 标签的属性
  - 写在标签中K="V"这种格式的文本我们称之为标签属性
- 常见的图像格式
  - JPG: Internet上被广泛支持，采用的是有损压缩，会造成图像失真，压缩之后体积小，且比较清晰，适合在网页中应用
  - GIF: 网页中使用最广泛、最普遍的，不仅支持透明色还支持动画，因此在网页中使用非常广泛
  - PNG: 兼有GIF和JPG的优势，同时具备GIF文件不具备的特性，唯一遗憾的是,PNG是一种新兴的图像格式，存在部分旧版本浏览器不支持的问题
  - BMP: Windows操作系统中使用的比较多，不支持文件压缩，也不适用与web页面



### 属性介绍


属性名称 | 作用
---|---
src(source)	 | 告诉浏览器需要插入的图片路径, 以便于浏览器到该路径下找到需要插入的图片
alt(alternate)	 | 规定图像的替代文本, 只有在src指定的路径下找不到图片,才会显示alt指定的文本
title | 悬停文本(介绍这张图片, 只有在鼠标移动到图片上时才会显示)
height | 设置图片显示的高度
width | 设置图片显示的宽度



### 示例代码
img标签添加的图片默认不是占一整行空间
如果想让图片等比拉伸,只写高度或者宽度即可

```objc
<!--图片标签-->
![](http://note.youdao.com/favicon.ico)
![有道云笔记](http://note.youdao.com/favicon.ico)
![有道云笔记](http://note.youdao.com/favicon.ico)
![有道云笔记](http://note.youdao.com/favicon.ico)
![有道云笔记](http://note.youdao.com/favicon.ico)
![有道云笔记](http://note.youdao.com/favicon.ico)
<img src="" alt="找不到图片">

```



### 运行结果

![Snip20170614_12.png](http://upload-images.jianshu.io/upload_images/4122543-9ff009b644bc64cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## a标签(anchor)

- 页面间链接
  - 从一个页面链接到另外一个页面
- 锚链接
  - 从A页面的甲位置跳转到A页面的乙位置
  - 从A页面的甲位置跳转到B页面的乙位置
  - 在目标标签中设置id属性=值，链接处href="[路径]#值"
  - 设置<a name=”值”>目标处</a>，在链接处链接处href="[路径]#值"
- 注意事项:
  - 在a标签之间一定要写上文字, 如果没有, 那么在页面上找不到这个标签
a标签也叫做超级链接或超链接
- 格式: 

```
<a href="目标窗口位置">链接文本或图像</a>
```



### a标签的属性


属性名称 | 	作用
---|---
href(hypertext reference) | 	指定跳转的目标地址
target | 告诉浏览器是否保留原始界面, _blank保留, _self不保留
title | 悬停文本(介绍这个链接, 只有在鼠标移动到超链接上时才会显示)

### 代码示例

```objc
<!--a标签-->
<a href="http://www.jianshu.com/u/5bd5e9ed569e">我的简书</a>
<a href="http://www.jianshu.com/u/5bd5e9ed569e" title="我的简书">我的简书</a>
<a href="http://www.jianshu.com/u/5bd5e9ed569e" title="我的简书" target="_blank">我的简书</a>

```


![Snip20170614_13.png](http://upload-images.jianshu.io/upload_images/4122543-b60bbd6bcf56af2c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### base标签和a标签结合使用
- 如果每个a标签都想在新页面中打开,那么逐个设置a标签的`target`属性比较麻烦, 这时我们可以使用base和a标签结合的方式,一次性设置有a标签都在新页面中打开
  - 格式: `<base target="_blank" />`
- 注意事项:
  - `base`必须嵌套在`head`标签里面
  - 如果标签上指定了`target`,`base`中也指定了`target`,那么会按照标签上指定的来执行

### a标签其它用法
- 假链接(本质是跳转到当前页面)
  - 格式`<a href="#">我的简书</a>`
  - 格式`<a href="javascript:">我的简书</a>`
    - 跳转到当前页面指定位置(锚点链接)
    - 1.格式`<a href="#location">`跳转到指定位置`</a>`
    - 2.在页面的指定位置给任意标签添加一个id属性
      - 例如 `<p id="location">`这个是目标`</p>`
  - 跳转到指定页面的指定位置
    - 格式: `<a href="01-锚点链接.html#location">跳转到指定位置</a>`
    - 只需要在01-锚点链接.html页面添加一个id位置即可
  - 下载(极力不推荐使用)
    - 例如`<a href="girl.zip">`下载福利资源`<a/>`


> 对HTML5语言有兴趣的同学,给大家极力推荐:江哥的视频[HTML5 + 跨平台开发](http://study.163.com/course/introduction.htm?courseId=1003864040),只是不知道会不会继续更新


---
