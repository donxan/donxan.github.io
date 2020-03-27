---
title: HTML5学习笔记之表格标签
date: '2017-06-15 20:18'
tags:
  - HTML5标签
  - CSS
  - WebStorm
categories: HTML5
abbrlink: 9483b8e
image:
---





![image](http://upload-images.jianshu.io/upload_images/647982-151e7c132c68a833.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<!-- more -->


### 作用:
- 以表格形式将数据显示出来, 当数据量非常大的时候, 表格这种展现形式被认为是最为清晰的一种展现形式

### 格式:
- table定义表格
- tr定义行
- td定义单元格

### 表格中的属性

- `border`: 默认情况下表格的边框宽度为0看不到, 通过border属性给表格指定边框宽度
- `width`: 默认情况下表格的宽度是由内容自动计算出来的, 可以通过width属性指定表格的宽度
- `height`:默认情况下表格的高度是由内容自动计算出来的, 可以通过height属性指定表格的高度
- `cellspacing`: 外边距. 默认情况下单元格之间有2个像素的间隙, 可以通过cellpadding指定表格之间的间隙
- `cellpadding`: 内边距. 默认情况下单元格边缘距离内容有1个像素的内边距, 可以通过cellpadding属性指定单元格边缘和内容之间的内边距
- `align`: 规定表格相对周围元素的对齐方式, 它的取值有center、left、right
  - 给table设置align属性, 是让表格在浏览器中居左/居右/居中
  - 给tr设置align属性, 是让当前行中所有内容居左/居右/居中
  - 给td设置align属性,是让当前单元格中所有内容居左/居右/居中
  - 该属性仅仅作为了解, 企业开发中用css代替, 因为HTML仅仅用于说明语义
  - 如果td中设置了align属性, tr中也设置了align属性, 那么单元格中的内容会按照td中设置的来对齐
- `valign`: 规定表格相对周围元素的对齐方式, 它的取值有center、left、right
  - 给table设置valign属性, 无效
给tr设置valign属性, 是让当前行中所有内容居上/居中/居下
  - 给td设置valign属性,是让当前单元格中所有内容居上/居中/居下
  - 如果td中设置了valign属性, tr中也设置了valign属性, 那么单元格中的内容会按照td中设置的来对齐
- `bgcolor`:规定表格的背景颜色
  - 给table设置bgcolor属性, 是给整个表格设置背景颜色
  - 给tr设置bgcolor属性, 是给当前行设置背景颜色
  - 给td设置bgcolor属性, 是给当前单元格设置背景颜色
  - 该属性仅仅作为了解, 企业开发中用css代替, 因为HTML仅仅用于说明语义

#### 示例代码

```objc
<!--表格标签-->
<!--先定义一个表格, 然后通过tr告诉浏览器这个表格中一共有多少行, 然后再通过td告诉浏览器这一行中一共有多少个元素(一共有多少列)-->
<table border="1" width="500" cellpadding="5" cellspacing="10">
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

```

#### 展示样式

![Snip20170614_17.png](http://upload-images.jianshu.io/upload_images/4122543-cac6e5756352e691.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 表格中的其它标签

- 表单中有两种类型的单元格, 一种是标准单元格td, 一种是表头单元格th
- th标签: 给每一列设置标题, 单元格中的内容会自动加粗，居中
- caption标签:给整个表格设置标题
  - 一定要嵌套在talbe标签内部才有效

#### 示例代码

```objc
<table bgcolor="#5f9ea0" cellspacing="1px" width="1000" align="center">
    <caption>
        <h2>这周代码量排行榜</h2>
    </caption>
    <tr bgcolor="#8a2be2">
        <th>排名</th>
        <th>关键词</th>
        <th>趋势</th>
        <th>今日搜索</th>
        <th>最近一天</th>
        <th>最近一天相关链接</th>
    </tr>
    <tr bgcolor="#f0ffff" align="center">
        <td>1</td>
        <td>穷爸爸富爸爸</td>
        <td>上涨</td>
        <td>456</td>
        <td>234214</td>
        <td>
            <a href="#">贴吧</a>
            <a href="#">百度</a>
            <a href="#">杭州</a>
        </td>
    </tr>
    <tr bgcolor="#f0ffff" align="center">
        <td>2</td>
        <td>穷爸爸富爸爸</td>
        <td>上涨</td>
        <td>234</td>
        <td>3423542</td>
        <td>
            <a href="#">贴吧</a>
            <a href="#">百度</a>
            <a href="#">杭州</a>
        </td>
    </tr>
```
#### 展示样式


![Snip20170615_19.png](http://upload-images.jianshu.io/upload_images/4122543-70f5e09e43e7df60.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 表格的结构

- thead标签:用来存放当前列的表头, 如果没有加css页面默认将表头中的高度设置变小
- tbody标签:一般用来存放页面中的主体数据, 如果不写会自动加上
- tfoot标签:用来存放表格的页脚（脚注或表注), 如果没有加css页面默认将表头中的高度设置变小, 一般不会出现


#### 示例代码

```objc
<table bgcolor="#7fffd4" width="800" cellspacing="2" align="center">
    <caption>我是表格标题</caption>
    <thead>
    <tr align="center">
        <th>每一列的标题</th>
        <th>每一列的标题</th>
        <th>每一列的标题</th>
        <th>每一列的标题</th>
        <th>每一列的标题</th>
    </tr>
    </thead>
    <tbody>
    <tr align="center">
        <td>数据</td>
        <td>数据</td>
        <td>数据</td>
        <td>数据</td>
        <td>数据</td>
    </tr>
    </tbody>
    <tfoot>
    <tr align="center">
        <td>数据</td>
        <td>数据</td>
        <td>数据</td>
        <td>数据</td>
        <td>数据</td>
    </tr>
    </tfoot>
</table>
```

#### 展示样式


![Snip20170615_20.png](http://upload-images.jianshu.io/upload_images/4122543-00a3d46f21a7cce7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 注意事项
- 表格结构的意义主要是用于SEO, 便于搜索引擎指定哪部分的内容是需要抓取的重要内容, 一般情况下搜索引擎会优先抓取tbody中的内容
- 由于有一部分浏览器对talbe的这种结构支持不是很好, 所以在企业开发中一般都不用严格的按照这种结构来编写



> 对HTML5语言有兴趣的同学,给大家极力推荐:江哥的视频[HTML5 + 跨平台开发](http://study.163.com/course/introduction.htm?courseId=1003864040),只是不知道会不会继续更新