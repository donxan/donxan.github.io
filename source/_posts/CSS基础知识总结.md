---
title: CSS基础知识总结
date: '2018-08-20 17:16'
tags:
  - HTML5
  - CSS
  - WebStorm
categories: HTML5
abbrlink: 6b2d1dfa
---




> 这篇文章仅仅是对`CSS`的一个总结笔记, 方便后期使用时查找相关知识点

- `Cascading Style Sheets`层叠样式表，WEB标准中的表现标准语言，主要对网页信息的显示进行控制
- 样式通常存储在样式表中: 内部样式、表外部样式表、内联样式表（行内样式、嵌入式样式）
  - 外部样式表可以极大提高工作效率
  - 外部样式表通常存储在 CSS 文件中


<!-- more -->


## CSS样式

### 内部样式表

```html
<style type="text/css">
	/*css语句*/
</style>
```

使用`style`标记创建样式时，最好将该标记写在`<head></head>`


### 外部样式表

- 外部样式表通常存储在 CSS 文件中
- 在CSS文件中创建`xxx.css`文件

```html
<!--方法1-->
<link rel="stylesheet" type="text/css" href="目标文件的路径及文件名全称" />


<!--方法2-->
<style type="text/css">
    @import url(“目标文件的路径及文件名全称”);
</style>
```

<div class="note warning"><p>需要说明</p></div>

- 使用`link`元素导入外部样式表时，需要将该元素写在文档头部，即`<head>与</head>`中
- `@`和`import`之间没有空格, `url`和小括号之间也没有空格, 必须结尾以分号结束


<div class="note info"><p>`link`和`import`导入外部样式区别</p></div>

- 老祖宗的差别
	- `link`属于`XHTML`标签，而`@import`是`CSS`提供的一种方式。
	- `link`标签除了可以加载`CSS`外，还可以做很多其它事情，比如定义`RSS`、定义`rel`连接属性等，`@import`只能加载`css`
- 加载顺序的差别
	- 当一个页面被加载的时候（就是被浏览者浏览的时候)，`link`引用的`CSS`会同时被加载
	- 而`@import`引用的`CSS`会等到页面全部被下载完再被加载
	- 所以有时候浏览`@import`加载`CSS`的页面时开始会没有样式
- 兼容性的差别
	- `@import`是`CSS2.1`提出的，所以老的浏览器不支持
	- `@import`只在IE5以上的才能识别，而`link`标签无此问题。
- 使用DOM控制样式差别
	- 当使用`javascript`控制`dom`去改变样式的时候
	- 只能使用`link`标签，因为`@import`不是`dom`可以控制的
- 样式的优先级
  - 内联样式表优先级别最高
  - 内部样式表与外部样式表的优先级和书写的顺序的顺序有关，后书写的优先级别高


## CSS语法


![cssSelect](http://titanjun.oss-cn-hangzhou.aliyuncs.com/html5/cssSel.png)


- 每个CSS样式由3个部分组成，选择器，属性和值。
- 属性必须放在{}花括号中，属性和属性值用冒号连接。
- 每条声明用分号结束。
- 当一个属性有多个属性值的时候，属性值与属性值不分先后顺序。
- 在书写样式过程中，空格、换行等操作不影响属性显示。


### 简单属性使用

#### 常用属性介绍


- `width`：宽度
	- 设置元素的宽度值，值为数字；单位为px（像素)、em（字符）、%（百分比）
	- 默认值为auto（自动，通过浏览器自动计算出宽度值单位为像素）
	- 像素在浏览器中的概念：
	 像素数决定元素或文字在浏览器中显示的大小或位置，页面中的最小计量单位为1个像素，即1px。
- `height`：高度
	- 设置元素的高度值，值为数字；单位为px（像素)、em（字符）、%（百分比）
	- 默认值为auto（自动，通过浏览器自动计算出宽度值单位为像素）


### 背景设置

- `background-color`：背景颜色
	- 背景颜色；规定颜色值为颜色单词名称例如（red）或者十六进制值得颜色例如（#ff0000）或者为rgb值的颜色例如（rgb(255, 0, 0)）
	- 可以为所有元素设置背景色，这包括 body 一直到 em 和 a 等行内元素
- `background-image`: 背景图像
  - `background-image: url("");`
  - 元素的背景图像, 默认情况下，背景图像进行平铺重复显示，以覆盖整个元素实体
- `background-repeat`: 设置背景图像是否及如何重复
  - `repeat`: 背景图像将向垂直和水平方向重复,   这是默认
  - `repeat-x`: 只有水平位置会重复背景图像
  - `repeat-y`: 只有垂直位置会重复背景图像
  - `no-repeat`: `background-image`不会重复
  - `inherit`: 指定`background-repea`属性设置应该从父元素继承
- `background-attachment`: 设置背景图像是否固定或者随着页面的其余部分滚动
  - `scroll`: 背景图片随页面的其余部分滚动。这是默认
  - `fixed`: 背景图像是固定的
  - `inherit`: 指定设置应该从父元素继承
- `background-position`: 设置背景图像的起始位置
  - 设置方式
- `background-size`: (CSS3)指定背景图片大小
  - `length`: 设置背景图片高度和宽度。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为 auto(自动)
  - `percentage`: 将计算相对于背景定位区域的百分比。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为"auto(自动)"
  - `cover`: 此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。
  - `contain`: 此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小


```html
<!--如果仅指定一个关键字，其他值将会是"center"-->
background-position: left top;

<!--第一个值是水平位置，第二个值是垂直-->
<!--左上角是0％0％。右下角是100％100％-->
<!--如果仅指定了一个值，其他值将是50％, 默认值为：0％0％-->
background-position: 30% 20%;
```

设置背景图片样式的两种方式

```html
<!--第一种方式-->
    <style>
        div{
            background-image: url("http://pcatqk8cn.bkt.clouddn.com/cssSel.png");
            background-repeat: repeat-x;
            background-attachment: fixed;
            background-position: 30% 20%;
            width: 400px;
            height: 200px;
        }
    </style>


<!--简写属性, 合并在一个属性中-->
    <style>
        div{
            background: url("http://pcatqk8cn.bkt.clouddn.com/cssSel.png") repeat-x fixed 30% 20%;
            width: 400px;
            height: 200px;
        }
    </style>
```


### 文本设置

- `color`：文本颜色
	- 规定颜色值为颜色单词名称例如（red）或者十六进制值的颜色例如（#ff0000）或者为rgb值的颜色例如（rgb(255, 0, 0)）
	- 一般多为设置字体的颜色
- `text-align`: 对齐元素中的文本
  - `left/right/center`: 左右居中对齐
  - `justify`: 实现两端对齐文本效果
- `text-decoration`: 用来设置或删除文本的装饰
  - `none`:	默认。定义标准的文本。
  - `underline`: 定义文本下的一条线。
  - `overline`:	定义文本上的一条线。
  - `line-through`:	定义穿过文本下的一条线。
  - `blink`:	定义闪烁的文本
- `text-transform`: 属性控制文本的大小写
  - `capitalize`: 文本中的每个单词以大写字母开头。
  - `uppercase`: 定义仅有大写字母。
  - `lowercase`: 定义无大写字母，仅有小写字母
- `text-indent`: 属性规定文本块中首行文本的缩进
  - `length`: 定义固定的缩进; %: 定义基于父元素宽度的百分比的缩进
- `direction`: 设置文本方向
  - `ltr`: 默认, 从左到右; `rtl`: 从右到左
- `letter-spacing `: 设置字符间距
  - `normal`: 默认, 无; `length`: 字符间的固定间距


```css
    <style>
        p{
            /*设置文本颜色*/
            color: #ff4040;

            /*设置文本方向*/
            /*ltr: 默认, 从左到右; rtl: 从右到左*/
            direction: ltr;

            /*设置每一个字符间距, 可为负值, 默认0*/
            letter-spacing: 2px;

            /*设置单词(有空格)的间距, 默认0*/
            word-spacing: 20px;

            /*设置行高*/
            line-height: 80%;

            /*设置文本的水平对齐方式*/
            text-align: center;

            /*设置文本的垂直对齐方式*/
            vertical-align: center;

            /*设置或删除文本的修饰*/
            /*第一个是下划线的样式, 第二个是下划线的颜色*/
            text-decoration: line-through chartreuse;

            /*设置文本的首行缩进*/
            text-indent: 30%;
            
            /*设置文本中的字母显示大小写*/
            text-transform: uppercase;
        }
    </style>
```


### 文本字体设置

- `font-family`: 指定文本的字体系列
- `font-size`: 指定文本的字体大小
- `font-weight`: 设置文本的粗细; 默认400, bold: 700
- `font-style`: 属性指定文本的字体样式; `italic`: 斜体; `oblique`: 倾斜
- `font-variant`: 以小型大写字体或者正常字体显示文本; `small-caps`: 显示小型大写字母的字体
- `font`: 简写属性在一个声明中设置所有字体属性
  - 可设置的属性是（按顺序）： `font-style font-variant font-weight font-size/line-height font-family`

```css
<style>
    p.ex1{
        font:15px arial,sans-serif;
    }
 
    p.ex2{
        font:italic bold 12px/30px Georgia, serif;
    }
</style>
```


### 隐藏/显示元素

- 控制元素现实和隐藏的属性是: `Display`(显示) 与 `Visibility`（可见性）
- 在介绍属性之前先介绍元素的分类
- 块级元素(block)
    - 总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示;
    - 宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;
    - 块级元素主要有： `address , blockquote , center , dir , div , dl , fieldset , form , h1 , h2 , h3 , h4 , h5 , h6 , hr , isindex , menu , noframes , noscript , ol , p , pre , table , ul , li`
- 内联元素(inline)
    - 和相邻的内联元素在同一行;
    - 宽度(width)、高度(height)、内边距的`top/bottom(padding-top/padding-bottom)`和外边距的`top/bottom(margin-top/margin-bottom)`都不可改变，就是里面文字或图片的大小;
    - 内联元素主要有：`a , abbr , acronym , b , bdo , big , br , cite , code , dfn , em , font , i , img , input , kbd , label , q , s , samp , select , small , span , strike , strong , sub , sup ,textarea , tt , u , var`
- 可变元素(根据上下文关系确定该元素是块元素还是内联元素)：
    - `applet ,button ,del ,iframe , ins ,map ,object , script`



#### display

- CSS中块级、内联元素的应用：
    - 利用CSS我们可以摆脱上面表格里HTML标签归类的限制，自由地在不同标签/元素上应用我们需要的属性。
    - 主要用的CSS样式有以下几个：
    - `display:none` -- 隐藏元素
    - `display:block`  -- 显示为块级元素
    - `display:inline`  -- 显示为内联元素
    - `display:inline-block` -- 显示为内联块元素，表现为同行显示并可修改宽高内外边距等属性
    - 我们常将<ul>元素加上display:inline-block样式，原本垂直的列表就可以水平显示了


#### visibility

- 对于 CSS 里的 `visibility` 属性，通常其值被设置成 `visible` 或 `hidden`
- `visibility: hidden` 相当于 `display:none`，能把元素隐藏起来，但两者的区别在于：
    - `display:none` -- 元素不再占用空间。
    - `visibility: hidden` -- 使元素在网页上不可见，但仍占用空间。
    - `visibility: collapse` -- 一般的元素的表现与`hidden` 一样，也即其会占用空间。但如果该元素是与`table` 相关的元素，例如 `table row`、`table column`、`table column group`、`table column group` 等，其表现却跟 `display: none` 一样，也即其占用的空间会释放。
- 在不同浏览器下，对 `visibility: collapse` 的处理方式不同：
    - `visibility: collapse` 的上述特性仅在 `Firefox` 下起作用。
    - 在 IE 即使设置了 `visibility: collapse`，还是会显示元素。
    - 在 `Chrome` 下，即使会将元素隐藏，但无论是否是与 `table` 相关的元素，`visibility: collapse` 都与 `visibility: hidden` 没有什么区别，即仍会占用空间。


### 边框属性

- CSS边框属性允许你指定一个元素边框的样式和颜色
- `border-style`: 用来定义边框的样式


![BorderStyle](http://titanjun.oss-cn-hangzhou.aliyuncs.com/html5/borderstyle.png)

- `border-radius`: 设置边框圆切角
- `border-width`: 设置边框宽度
    - 设置具体的宽度: 2px
    - `thin`: 细边框, `medium`: 默认中等, `thick`: 粗边框, 没有具体的值定义
- `border-color`: 设置边框颜色
- `border-bottom`: 单独设置底部边框属性, 除此之外还有`border-left/right/top`属性
- `border-bottom-color`: 设置下边框的颜色, 类似的还有`border-bottom-style`、`border-bottom-width`
- 代码示例如下


```css
    <style>
        /*单独设置一部分边框*/
        .p1{
            /*设置底部边框简写方式, 顺序: width style color*/
            border-bottom: 2px solid #ff4040;

            /*上述代码等同于下面三行代码*/
            /*border-bottom-style: solid;*/
            /*border-bottom-color: #ff4040;*/
            /*border-bottom-width: medium;*/
        }

        /*设置整体的边框*/
        .p2{
            /*简写方式, 也是推荐方式*/
            border: 2px dashed darkviolet;
            /*设置圆切角*/
            border-radius: 10px;
            
            /*具体设置*/
            /*border-width: 2px;*/
            /*border-style: dashed;*/
            /*border-color: darkviolet;*/
        }
    </style>
```


### 内/外边距

- 外边距: 改变元素之间上下左右的间距
  - 设置所有间距顺序: `margin: top right bottom left`
  - 单独设置上下左右间距: `margin-top/bottom/left/right`
- 内边距: 改变元素中的内容和元素之间上下左右的间距
  - 内边距设置方式同上
- 设置方式, 以外边距为例
  - margin:10px 5px 15px 20px;
    - 上边距是 10px
    - 右边距是 5px
    - 下边距是 15px
    - 左边距是 20px
  - margin:10px 5px 15px;
    - 上边距是 10px
    - 右边距和左边距是 5px
    - 下边距是 15px
  - margin:10px 5px;
    - 上边距和下边距是 10px
    - 右边距和左边距是 5px
  - margin:10px;
    - 所有四个边距都是 10px

```css
    <style>
        /*单独设置内外边距*/
        .p3{
            background-color: #30a4e6;
            /*设置外边距*/
            margin-bottom: 12px;
            margin-top: 10px;
            
            /*设置内边距*/
            padding-left: 10px;
            padding-bottom: 20px;
        }
    </style>
```


### Float(浮动)

- CSS 的 Float（浮动），会使元素向左或向右移动，其周围的元素也会重新排列
- 元素的水平方向浮动，意味着元素只能左右移动而不能上下移动。
- 一个浮动元素会尽量向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止
- 属性: `float`, 可选值
  - `left` -- 元素向左浮动。
  - `right` -- 元素向右浮动。
  - `none` -- 默认值,  元素不浮动，并会显示在其在文本中出现的位置
- 清除浮动 - 使用`clear`
- 元素浮动之后，周围的元素会重新排列，为了避免这种情况，使用`clear`属性。
- `clear`属性指定元素两侧不能出现浮动元素
  - 属性: `clear`, 可选值
  - `left` -- 元素不允许向左浮动。
  - `right` -- 元素不允许向右浮动。
  - `none` -- 默认值, 允许元素浮动


### 列表样式

- 在HTML中，有两种类型的列表：
  - 无序列表 - 列表项标记用特殊图形（如小黑点、小方框等）
  - 有序列表 - 列表项的标记有数字或字母
- CSS列表属性作用如下：
  - 设置不同的列表项标记为有序列表
  - 设置不同的列表项标记为无序列表
  - 设置列表项标记为图像
- 所有的CSS列表属性
  - `list-style-image`: 将图象设置为列表项标志。
  - `list-style-position`: 设置列表中列表项标志的位置
    - `inside`: 列表项目标记放置在文本以内，且环绕文本根据标记对齐
    - `outside`: 默认值, 保持标记位于文本的左侧。列表项目标记放置在文本以外，且环绕文本不根据标记对齐
  - `list-style-type`: 设置列表项标志的类型
  - `list-style`: 简写属性, 把所有的属性设置在一个声明中, 顺序为: `type position image`


> `list-style-type`属性取值介绍

值 | 描述
--|--
none | 	无标记。
disc | 	默认。标记是实心圆。
circle | 	标记是空心圆。
square | 	标记是实心方块。
decimal | 	标记是数字。
decimal-leading-zero | 	0开头的数字标记。(01, 02, 03, 等。)
lower-roman	 | 小写罗马数字(i, ii, iii, iv, v, 等。)
upper-roman	 | 大写罗马数字(I, II, III, IV, V, 等。)
lower-alpha | 	小写英文字母The marker is lower-alpha (a, b, c, d, e, 等。)
upper-alpha | 	大写英文字母The marker is upper-alpha (A, B, C, D, E, 等。)
lower-greek | 	小写希腊字母(alpha, beta, gamma, 等。)
lower-latin | 	小写拉丁字母(a, b, c, d, e, 等。)
upper-latin | 	大写拉丁字母(A, B, C, D, E, 等。)
hebrew | 	传统的希伯来编号方式
armenian | 	传统的亚美尼亚编号方式
georgian | 	传统的乔治亚编号方式(an, ban, gan, 等。)
cjk-ideographic	 | 简单的表意数字
hiragana | 	标记是：a, i, u, e, o, ka, ki, 等。（日文片假名）
katakana | 	标记是：A, I, U, E, O, KA, KI, 等。（日文片假名）
hiragana-iroha | 	标记是：i, ro, ha, ni, ho, he, to, 等。（日文片假名）
katakana-iroha | 	标记是：I, RO, HA, NI, HO, HE, TO, 等。（日文片假名）


```css
    <style>
        ul{
            background-color: chartreuse;
            
            /*简写方式*/
            list-style: circle outside url("");
            
            /*分开设置*/
            /*list-style-position: outside;*/
            /*list-style-type: circle;*/
            /*list-style-image: url("");*/
        }

    </style>
```


### CSS选择器


#### 标签选择器

```css
/*元素名称{ 属性: 属性值; }*/
p{ color: red; }
```

- 说明：
  - 标签选择器：以文档语言对象类型作为选择器，即使用结构中元素名称作为选择器。例如body、div、p、img、em、strong、span等等。
  - 所有的页面元素都可以作为选择器
- 用法：
  - 如果想改变某个元素的默认样式时，可以使用元素选择器。
  - 统一文档某个元素显示效果时，可以使用类型选择器。


#### id选择器

```css
/*#id名{ 属性: 属性值;}*/
#menu{ color: red;  }
#top{ 
    width:300px;
    height:300px;
}
```


- 使用id选择器时，应该为元素定义id属性。
如：`<div id="top"></div>`
- id选择器的语法格式：“#”加上自定义的id名称。
- id名命名取英文名，不能使用关键字（所有的标记和属性都是关键字）
如：head标记
- 一个id名称只能对应文档中的一个具体元素对象。
因为id只能定义页面中某一个唯一的元素对象。
- id选择器最大的用处：创建网页的外围结构


#### class选择器


```css
/* .class类名{ 属性: 属性值;} */
.top{
    width:200px;
    height:500px;
}
```

- 说明：
  - 使用类选择器时，应该先为每个元素定义一个类名称。
  - 类选择器的语法格式是：`<div class="top"></div>`
- 用法：
  - class选择器更适合定义一类样式
- 注意：
  - 类名的第一个字符不能使用数字，它无法再Mozilla或Firefox中起作用。


#### *通配符

- 通配符选择器是一种全局选择器, 常用来重置样式
- 通配符的写法是`*`，其含义就是所有元素。

```css
/*   *{ 属性: 属性值;}   */
*{ padding:0; margin:0;}
```


#### 交集选择器

用于选择同时有多个选择器匹配的元素

```css
/* 选择器1选择器2{ 属性: 属性值; } */

h1.center { color:red; text-align:center; }

h1#center { color:red; text-align:center; }

```

- 第一种格式类似于：`h1.center`
	- 这种格式由标签选择器和类选择器组成。
- 第二种格式类似于：`h1#center`
	- 这种格式由标签选择器和id选择器组成。
- 两个选择器之间不能有空格，必须连续书写。
- 以上这两种格式组成的选择器，也就是前者所定义的标签类型和后者的类或者id的元素，称之为交集选择器。


#### 并集选择器

- 并集选择器是一种群组选择器
- 当有多个选择器应用相同的样式时，可以将选择器用`,`分隔，合并为一组。

```css
选择器1,选择器2,选择器3{ 属性: 属性值; }
```

#### 后代选择器

```
选择器1 选择器2{ 属性: 属性值; }
```

选择器1和选择器2用空格隔开，含义就是选择器1中包含的所有选择器2;


#### 子选择器

```
选择器1>选择器2{ 属性: 属性值; }
```

选择器1和选择器2用>连接，含义就是选择器1中所有子一级选择器2.


#### 伪类选择器

```css
a:link{属性：属性值;}超链接的初始状态;
a:visited{属性：属性值;}超链接被访问后的状态;
a:hover{属性：属性值;}鼠标悬停，即鼠标划过超链接时的状态;
a:active{属性：属性值;}超链接被激活时的状态，即鼠标按下时超链接的状态;
```

- 当这4个超链接伪类选择器联合使用时，应注意他们的顺序，正常顺序为：`a:link,a:visited,a:hover,a:active`,错误的顺序有时会使超链接的样式失效；
- 为了简化代码，可以把伪类选择符中相同的声明提出来放在a选择符中；
例如：`a{color:red;} a:hover{color:green;}` 表示超链接的三种状态都相同，只有鼠标划过变颜色




---










