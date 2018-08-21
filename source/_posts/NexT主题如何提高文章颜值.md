---
title: NexT主题如何提高文章颜值
date: 2018-05-07 16:13
tags: [Hexo, NexT, 自定义样式]
categories: Hexo博客
---


- 博客搭建和主题配置教程: [Hexo博客相关分类](https://www.titanjun.top/categories/Hexo%E5%8D%9A%E5%AE%A2/)
- 博客主题配置好了, 也算穿上了华丽的外衣, 但是真正高质量的文章不但要有好的内容更要有美丽的外表结构
- 所以在提高外在美的同时, 我们也要提高文章的内在美
- 这里我们就介绍一些在NexT主题下提高文章颜值的方法

<!-- more -->

## 文章的模版文件（必读）
- Hexo博客新建文章的两种方式:
  - 直接在~/blog/source/_posts/下新建.md结尾的文件来写新的文章
  - 站点文件夹根目录, 终端输入`hexo new post <title>`新建的文章
- 关于文件最上方的参数, [Hexo变量](https://hexo.io/zh-cn/docs/variables.html#%E9%A1%B5%E9%9D%A2%E5%8F%98%E9%87%8F)

```objc
/* ！！！！！！！！！！
** 每一项的 : 后面均有一个空格
** 且 : 为英文符号
** ！！！！！！！！！！
*/

title:
/* 文章标题，可以为中文 */

date:
/* 建立日期，如果自己手动添加，请按固定格式
** 就算不写，页面每篇文章顶部的发表于……也能显示
** 只要在主题配置文件中，配置了 created_at 就行
** 那为什么还要自己加上？
** 自定义文章发布的时间
*/

updated:
/* 更新日期，其它与上面的建立日期类似
** 不过在页面每篇文章顶部，是更新于……
** 在主题配置文件中，是 updated_at
*/

permalink:
/* 若站点配置文件下的 permalink 配置了 title
** 则可以替换文章 URL 里面的 title（文章标题）
*/

categories:
/* 分类，支持多级，比如：
- technology
- computer
- computer-aided-art
则为technology/computer/computer-aided-art
（不适用于 layout: page）
*/

tags:
/* 标签
** 多个可以这样写[标签1,标签2,标签3]
** （不适用于 layout: page）
*/

description:
/* 文章的描述，在每篇文章标题下方显示
** 并且作为网页的 description 元数据
** 如果不写，则自动取 <!-- more -->
** 之前的文字作为网页的 description 元数据
** 建议每篇文章都务必加上！
*/

keywords:
/* 关键字，并且作为网页的 keywords 元数据
** 如果不写，则自动取 tags 里的项
** 作为网页的 keywords 元数据
*/

comments:
/* 是否开启评论
** 默认值是 true
** 要关闭写 false
*/

layout:
/* 页面布局，默认值是 post，默认值可以在
** 站点配置文件中修改 default_layout
** 另：404 页面可能用到，将其值改为 false
*/

type:
/* categories，目录页面
** tags，标签页面
** picture，用来生成 group-pictures
** quote？
** https://reuixiy.github.io/uncategorized/2010/01/01/test.html
*/

photos:
/* Gallery support，用来支持画廊 / 相册，用法如下：
- photo_url_1
- photo_url_2
- photo_url_3
https://reuixiy.github.io/uncategorized/2010/01/01/test.html
*/

link:
/* 文章的外部链接
** https://reuixiy.github.io/uncategorized/2010/01/01/test.html
*/

image:
/* 自定义的文章摘要图片，只在页面展示，文章内消失
** 此项只有参考本文 5.14 节配置好，否则请勿添加！
*/

sticky:
/* 文章置顶
** 此项只有参考本文 5.15 节配置好，否则请勿添加！
*/

password:
/* 文章密码，此项只有参考教程：
** http://shenzekun.cn/hexo的next主题个性化配置教程.html
** 第 24 节，配置好，否则请勿添加！
** 发现还是有 bug 的，就是右键在新标签中打开
** 然后无论是否输入密码，都能看到内容
*/
```

## `Markdown`语法总结
- `Markdown`的使用优点和基本语法这里就不在介绍了
- 下面给大家推荐几款`Markdown`编辑软件
  - [MWeb Mac中文破解版](http://www.sdifen.com/mweb229.html)
  - [MarkEditor正版](http://markeditor.com/app/markeditor)
  - [Markdown for mac](http://www.pc6.com/mac/133223.html)
  - [Markdown plus Mac版](http://www.pc6.com/mac/141060.html)
- 如果有些用 `Markdwon` 的语法却达不到预期效果（甚至产生奇怪的 `bugs`），或者用 `Markdwon` 的语法无法实现，这时就可以考虑用 `HTML` 和 `CSS`

### 分隔线和空行

```objc
/* 分隔线 */
<hr />
/* 注意事项 [6]：在XHTML 中，<hr> 必须被正确地关闭，比如 <hr /> */

/* 空行 */
<br />
/* 注意事项同上 */
```

### 引用

```objc
<blockquote>引用内容</blockquote>

/* 如果前后间隙很小，可以像下面这样写 */
<p><blockquote>引用内容</blockquote></p>
```

### 居中和右对齐

```objc
/* 居中 */
<center>内容</center>

/* 右对齐 */
<div style="text-align:right">内容</div>
```

### 字体大小和颜色

```objc
<font color="#xxxxxx" size="number">内容</font>
/* 详细请查看 http://www.w3school.com.cn/tags/tag_font.asp */
```

### Todo list

```objc
<ul>
<li><i class="fa fa-check-square"></i> 已完成</li>
<li><i class="fa fa-square"></i> 未完成</li>
</ul>
```

## 好玩写作样式
- 添加一些特殊的样式，可以增加文章的可读性
- 可以从样式中选几个自己觉得比较好的、经常会用的使用, 太多反而会适得其反

### 主题自带样式
先看一段效果图

1. <i class="fa fa-pencil"></i> 支持 Markdown
<i>Hexo 支持 GitHub Flavored Markdown 的所有功能，甚至可以整合 Octopress 的大多数插件。</i>
2. <i class="fa fa-cloud-upload"></i> 一件部署
<i>只需一条指令即可部署到 Github Pages，或其他网站。</i>
3. <i class="fa fa-cog"></i> 丰富的插件
<i>Hexo 拥有强大的插件系统，安装插件可以让 Hexo 支持 Jade，CoffeeScript。</i>

这是上述的源码:

```objc
1. <i class="fa fa-pencil"></i> 支持 Markdown
<i>Hexo 支持 GitHub Flavored Markdown 的所有功能，甚至可以整合 Octopress 的大多数插件。</i>
2. <i class="fa fa-cloud-upload"></i> 一件部署
<i>只需一条指令即可部署到 Github Pages，或其他网站。</i>
3. <i class="fa fa-cog"></i> 丰富的插件
<i>Hexo 拥有强大的插件系统，安装插件可以让 Hexo 支持 Jade，CoffeeScript。</i>
```

采用的是 [Font Awesome](https://fontawesome.com/icons?from=io) 的图标，下面给出一些简单的使用例子，更多请查看官网的 [使用示例](https://fontawesome.com/how-to-use/svg-with-js)

效果:

- <i class="fa fa-pencil"></i> 铅笔
- <i class="fa fa-cloud-upload"></i> 上传
- <i class="fa fa-download"></i> 下载

源码:

```objc
- <i class="fa fa-pencil"></i> 铅笔
- <i class="fa fa-cloud-upload"></i> 上传
- <i class="fa fa-download"></i> 下载
```

放大图效果:

- <i class="fa fa-download"></i> 下载
- <i class="fa fa-download fa-lg"></i> 下载变大 33%
- <i class="fa fa-download fa-2x"></i> 下载两倍大

源码:

```objc
- <i class="fa fa-download"></i> 下载
- <i class="fa fa-download fa-lg"></i> 下载变大 33%
- <i class="fa fa-download fa-2x"></i> 下载两倍大
```


### 代码块高亮

主题自带样式 代码块高亮

```
```[language] [title] [url] [link-text]

`代码`

```




- [language] 是代码语言的名称，用来设置代码块颜色高亮，非必须；
- [title] 是顶部左边的说明，非必须；
- [url] 是顶部右边的超链接地址，非必须；
- [link text] 如它的字面意思，超链接的名称，非必须。

亲测这 4 项应该是根据空格来分隔，而不是[]，故请不要加[]。除非如果你想写后面两个，但不想写前面两个，那么就必须加[]了，要这样写：[] [] [url] [link text]。

首先关于代码块颜色高亮，高亮的模式可以在主题配置文件中设置：

```python
# Code Highlight theme
# Available value:
#    normal | night | night eighties | night blue | night bright
# https://github.com/chriskempson/tomorrow-theme

highlight_theme: normal
```

要颜色正确高亮，代码语言的名称肯定要写对，各种支持语言的名称可以查看[这篇文章](https://almostover.ru/2016-07/hexo-highlight-code-styles/)。当然，如果你和我一样懒，可以在站点配置文件_config.yml中设置自动高亮：


```diff
highlight:
  enable: true
  line_number: true
# 代码自动高亮
-  auto_detect: false
+  auto_detect: true
```


- 红色-和绿色+的样式也是一种语言，叫diff，所以你只需在 [language] 这写diff，然后在相应代码前面加上-和+就行了
- 不过默认的-是绿色，+是红色，与 GitHub 上相反


### 文本居中引用
效果:

{% cq %}
我还年轻，
我渴望上路。
带着最初的激情，
追寻着最初的梦想，
感受着最初的体验，
我们上路吧!
{% endcq %}

源码:

```objc
{% cq %}
我还年轻，
我渴望上路。
带着最初的激情，
追寻着最初的梦想，
感受着最初的体验，
我们上路吧!
{% endcq %}
```

更多 NexT 主题自带的标签样式，请点击：http://theme-next.iissnan.com/tag-plugins.html

### 主题自带样式 note 标签

在主题配置文件`_config.yml`里有一个关于这个的配置，但官方文档没有提供 `HTML` 的使用方式，个人认为这种方式更简单，也不会产生一些奇怪的显示 `bugs`

```objc
# Note tag (bs-callout).
note:
  # 风格
  style: flat
  # 要不要图标
  icons: true
  # 圆角矩形
  border_radius: 3
  light_bg_offset: 0
```

效果如下:
<div class="note default"><p>default</p></div>

```objc
<div class="note default"><p>default</p></div>
```

<div class="note primary"><p>primary</p></div>

```objc
<div class="note primary"><p>primary</p></div>
```

<div class="note success"><p>success</p></div>

```objc
<div class="note success"><p>success</p></div>
```

<div class="note info"><p>info</p></div>

```objc
<div class="note info"><p>info</p></div>
```

<div class="note warning"><p>warning</p></div>

```objc
<div class="note warning"><p>warning</p></div>
```

<div class="note danger"><p>danger</p></div>

```objc
<div class="note danger"><p>danger</p></div>
```

<div class="note danger no-icon"><p>danger no-icon</p></div>

```objc
<div class="note danger no-icon"><p>danger no-icon</p></div>
```

里面的三种风格长啥样？开启图标长啥样？可以查看 [这个页面](https://github.com/iissnan/hexo-theme-next/pull/1697) ，更多的介绍也在这个页面，请自行查看


### 主题自带样式 label 标签
`label`标签不建议加载段首, 首先可以在主题配置文件中有配置，需要配置下

```objc
# Label tag.
label: true
```

然后效果如下（@ 前面的是`label`的名字，后面的是要显示的文字）

{% label default@default %}

```objc
{% label default@default %}
```

{% label primary@primary %}

```objc
{% label primary@primary %}

```

{% label success@success %}

```objc
{% label success@success %}

```

{% label info@info %}

```objc
{% label info@info %}
```

{% label warning@warning %}

```objc
{% label warning@warning %}

```

{% label danger@danger %}

```objc
{% label danger@danger %}

```

### 主题自带样式 tabs 标签
首先可以在主题配置文件中有配置，需要配置下

```objc
# Tabs tag.
tabs:
  enable: true
  transition:
    tabs: true
    labels: true
  border_radius: 0
```

效果：

{% tabs 选项卡, 2 %}
<!-- tab -->
**这是选项卡 1** 呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈……
<!-- endtab -->
<!-- tab -->
**这是选项卡 2**
<!-- endtab -->
<!-- tab -->
**这是选项卡 3** 哇，你找到我了！φ(≧ω≦*)♪～
<!-- endtab -->
{% endtabs %}

源码:

```objc
{% tabs 选项卡, 2 %}
<!-- tab -->
**这是选项卡 1** 呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈……
<!-- endtab -->
<!-- tab -->
**这是选项卡 2**
<!-- endtab -->
<!-- tab -->
**这是选项卡 3** 哇，你找到我了！φ(≧ω≦*)♪～
<!-- endtab -->
{% endtabs %}
```

然后上面源码中, 2表示一开始在第二个选项卡，非必须，若数值为-1则隐藏选项卡内容


### 主题自带样式 按钮

效果: {% btn https://www.titanjun.top, 点击下载百度, download fa-lg fa-fw %}

源码:

```objc
{% btn https://www.baidu.com, 点击下载百度, download fa-lg fa-fw %}
```

关于按钮的更多使用可以前往 [这个页面](https://almostover.ru/2016-01/hexo-theme-next-test/#Button-tag-test) 查看。

### 自定义样式 引用
首先由于是自定义的样式，故要自己将 CSS 代码加到custom.styl中

需加入`custom.styl`的代码：

```objc
// 自定义的引用样式
blockquote.question {
    color: #555;
    border-left: 4px solid rgb(16, 152, 173);
    background-color: rgb(227, 242, 253);
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    margin-bottom: 20px;
}
```

- 文字颜色改`color`的值
- 背景色改`background-color`的值
- 边框颜色和粗细改`border-left`的值

使用:

```objc
<blockquote class="question">内容</blockquote>
```

### 总结:
- 文章中所有内容均摘自大佬的文章, 想看原文的朋友可参考
- https://reuixiy.github.io/technology/computer/computer-aided-art/2017/06/09/hexo-next-optimization.html




