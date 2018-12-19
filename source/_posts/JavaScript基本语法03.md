---
title: JavaScript基本语法03
date: 2018-12-14 15:16:40
tags: [JavaScript, 语法]
categories: JavaScript笔记
image:
---

![JavaScript](https://titanjun.oss-cn-hangzhou.aliyuncs.com/javascript/javascropt.jpeg)



<!-- more -->

- 书接上文[JavaScript基本语法](https://www.titanjun.top/categories/JavaScript%E7%AC%94%E8%AE%B0/), 记录了`JavaScript`的记录了相关数据类型和函数等相关语法
- 这里主要记录浏览器对象模型(`BOM`), `window`对象和文档对象模型(`DOM`)




## BOM

- `BOM`:浏览器对象模型（`Browser Object Model`)，是一个用于访问浏览器和计算机屏幕的对象集合。我们可以通过全局对象`window`来访问这些对象。
- 所有浏览器都支持`window`对象, 它表示浏览器窗口
- 所有`JavaScript`全局对象、函数以及变量均自动成为`window`对象的成员
- 全局变量是`window`对象的属性
- 全局函数是`window`对象的方法


### Window

- `window.document`: 是一个BOM对象，表示的是当前所载入的文档(即页面)，但它的方法和属性同时也属于DOM对象所涵盖的范围
- `window.frames`: 是当前页面中所有框架的集合
- `window.navigator`: 用于反应浏览器及其功能信息的对象
- `window.screen`: 提供浏览器以外的环境信息
- `window.location`: 用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面
- `window.history`: 获取浏览器的历史记录
- 以上对象在编写时可以一般不使用`window`这个前缀


#### Screen

`Screen`中的相关属性的使用如下

```js
// 提供浏览器以外的环境信息
console.log(window.screen)
// 输出: Screen { availWidth: 2560, availHeight: 1417, width: 2560, height: 1440, colorDepth: 24, pixelDepth: 24, top: 0, left: 0, availTop: 23, availLeft: 0 }

// 返回屏幕的宽度，以像素计，减去界面特性，比如窗口任务栏
console.log(screen.availWidth)
// 输出: 2560

// 返回访问者屏幕的高度，以像素计，减去界面特性，比如窗口任务栏
console.log(screen.availHeight)
// 输出: 1417

// 返回总宽度 * 高度
console.log(screen.width + "*" + screen.height)
// 输出: 2560*1440

// 返回色彩深度
console.log(screen.colorDepth)
// 输出: 24

// 返回色彩分辨率
console.log(screen.pixelDepth)
// 输出: 24
```


#### Location

- 用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面
- 常用的属性使用和介绍

```js
console.log(window.location)

// 返回web主机的域名和端口号
console.log(location.host)
// localhost:63342

// 返回 web 主机的域名
console.log(location.hostname)
// localhost

// 返回当前页面的路径和文件名
console.log(location.pathname)

// 返回 web 主机的端口 （80 或 443）
console.log(location.port)

// 返回所使用的 web 协议（http:// 或 https://）
console.log(location.protocol)

// 返回当前页面的 URL
console.log(location.href)

// 设置需要跳转的页面的URL
window.location.href = "https://www.titanjun.top/"
```


常用的相关方法介绍

```js
// 在浏览器中默认是会缓存浏览记录的
// 刷新当前页面, 会缓存
window.location.reload()

// 刷新当前页面, 不带缓存
window.location.reload(true)

// 加载新的页面
window.location.assign("greenWindow.html")
window.location.assign("https:www.titanjun.top")

// 替换当前页面(注意：不会再浏览器的历史记录表中留下记录)
window.location.replace("greenWindow.html")
window.location.replace("https:www.titanjun.top")
```


#### History

包含浏览器的历史记录

```js
// 获取历史记录的长度
console.log(history.length)

// 回到上一页面
window.history.back()

// 进入到下一页面
window.history.forward()

// go() 里面的参数表示跳转页面的个数 
// 例如 history.go(2) 表示前进一个页面
window.history.go(2)
// history.go(-1) 表示后退一个页面
window.history.go(-1)
```


### Window相关方法

#### open&close

`window.close()`: 关闭窗口

```
// 用于打开一个新的浏览器窗口或查找一个已命名的窗口
open(url?: string, target?: string, features?: string, replace?: boolean)
```

参数 | 描述
--|--
`url` | 	一个可选的字符串，声明了要在新窗口中显示的文档的 URL。如果省略了这个参数，或者它的值是空字符串，那么新窗口就不会显示任何文档
`target` | 	一个可选的字符串，该字符串是一个由逗号分隔的特征列表，其中包括数字、字母和下划线，该字符声明了新窗口的名称。这个名称可以用作标记 `<a>` 和 `<form>` 的属性 target 的值。如果该参数指定了一个已经存在的窗口，那么`open()` 方法就不再创建一个新窗口，而只是返回对指定窗口的引用。在这种情况下，`features`将被忽略。
`features` | 一个可选的字符串，声明了新窗口要显示的标准浏览器的特征。如果省略该参数，新窗口将具有所有标准特征。在窗口特征这个表格中，我们对该字符串的格式进行了详细的说明
`replace` | 一个可选的布尔值。`true`装载到窗口的URL在窗口的浏览历史中创建一个新条目，`false`替换浏览历史中的当前条目


`window`中方法`open()`常用的特性

属性 | 值 | 描述
--|--|--
width | 数值 | 新窗口的宽度, 不能超过100
height | 数值 | 新窗口的高度, 不能超过100
top | 数值 | 距离屏幕上方的像素
left | 数值 | 距离屏幕左侧像素
toolbar | yes/no | 是否显示工具栏, IE浏览器有效
location | yes/no | 是否显示地址栏, IE浏览器有效
fullscreen | yes/no | 全屏显示


#### onload/onunload

`onload`加载事件和`onunload`卸载事件


```html
<body>
	<button onclick="func()">跳转</button>
	<script type="text/javascript">
		//onunload事件
		//当页面完全卸载再触发，只有IE支持
		window.onunload = function() {
			alert("确定关闭");
		};
		function func() {
			window.location.href = "red.html";
		}

		//load事件
		//当页面加载完成的时候会触发该事件	
		window.onload = function() {
			alert("我在界面加载完后才显示");
		};

		alert("页面加载中");
	</script>
</body>
```

#### onscroll

当窗口发生滚动会触发该事件


```html
<body style="height:3000px">
	<h1>我是顶部</h1>
	<button onclick="goOn()" style="position: fixed;right: 50px;bottom: 50px">返回顶部</button>

	<script type="text/javascript">
		//当窗口发生滚动会触发该事件
		window.onscroll = function() {
			console.log("滚动");

			//打印滚动高度
			var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
			console.log(scrollTop);
		};

		//返回顶部
		function goOn() {
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		}
	</script>
</body>
```


#### onresize

当浏览器发生缩放的时候就会反复触发resize事件



```html
<body>
	<script type="text/javascript">
		//当浏览器发生缩放的时候就会反复触发resize事件		
		window.onresize = function() {
			var w = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;

			var h = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;

			console.log(document.documentElement.clientWidth, document.body.clientWidth, window.innerWidth, w);

			console.log(document.documentElement.clientHeight, document.body.clientHeight, window.innerHeight, h);
		};
	</script>
</body>

```



### JS弹窗

在`JavaScript`中创建三种消息框：警告框、确认框、提示框


#### 警告框

- 警告框经常用于确保用户可以得到某些信息。
- 当警告框出现后，用户需要点击确定按钮才能继续进行操作


![Alert](
https://titanjun.oss-cn-hangzhou.aliyuncs.com/javascript/jsAlert.png?x-oss-process=style/titanjun)


```html
<body>
    <button onclick="showAlert()">点击显示警告框</button>

    <script type="text/javascript">
        function showAlert() {
            alert('你好, 这是一个警告框!')
        }
    </script>
</body>

```



#### 确认框

- 确认框通常用于验证是否接受用户操作。
- 当确认卡弹出时，用户可以点击 "确认" 或者 "取消" 来确定用户操作。
- 当你点击 "确认", 确认框返回`true`， 如果点击 "取消", 确认框返回`false`

![confirm](https://titanjun.oss-cn-hangzhou.aliyuncs.com/javascript/jsconfirm.png?x-oss-process=style/titanjun)



```html
<body>
    <button onclick="showConfirm()">点击显示确认框</button>

    <script type="text/javascript">
        function showConfirm() {
            var action = ''

            var con = confirm('你好, 这是一个警告框!')
            if (con == true) {
                action = '选择了确认'
            } else {
                action = '选择了取消'
            }

            console.log(action)
        }
    </script>
</body>
```


#### 提示框

- 提示框经常用于提示用户在进入页面前输入某个值。
- 当提示框出现后，用户需要输入某个值，然后点击确认或取消按钮才能继续操纵。
- 如果用户点击确认，那么返回值为输入的值。如果用户点击取消，那么返回值为`null`


![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/javascript/jsproptm.png?x-oss-process=style/titanjun)


```html
<body>
    <button onclick="showPrompt()">点击显示提示框</button>

    <script type="text/javascript">
        function showPrompt() {
            var action = ''

            var person = prompt('请输入你的名字', 'titanjun')
            if (person != null && person != "") {
                action = "你好: " + person
            }

            console.log(action)
        }
    </script>
</body>
```


### JS计时器

- 在`JavaScript`中有两种计时方式, 间歇性计时器和延迟性定时器
- `setInterval()`和`setTimeout()`是`HTML DOM Window`对象的两个方法
- 两个方法可以不使用`window`前缀，直接使用函数


#### setInterval

- 间隔指定的毫秒数不停地执行指定的代码
- 第一个参数是函数, 第二个参数间隔的毫秒数, 1000 毫秒是一秒


```js
// time不是定时器的名字, 只是定时器的编号, 是一个number类型
var time = window.setInterval(function () {
    console.log("titanjun.top")
}, 1000)
console.log(typeof time)
```

- 在开启定时器后, 如何让定时器停止工作?
- `clearInterval()`方法用于停止`setInterval()`方法执行的函数代码
- 一旦定时器停止工作后, 就必须重新启动定时器, 且定时器不能暂停, 只能停止和重启
- 要使用`clearInterval()`方法, 在创建计时方法时你必须使用全局变量


```html
<body>
    <button onclick="closeInterver()">关闭定时器</button>

    <script type="text/javascript">
        //setInterval(函数名,时间)
        // 功能：创建一个间歇性定时器，每间隔参数二时间执行一次参数一函数
        // 返回值：定时器的id，可以通过该id关闭定时器
        // time不是定时器的名字, 只是定时器的编号, 是一个number类型
        var time = window.setInterval(function () {
            console.log("titanjun.top")
        }, 1000)
        console.log(typeof time)

        // 关闭定时器
        function closeInterver() {
            //注：js中没有恢复定时器一说，当你停止定时器之后，定时器就会被删掉，想要继续的话，直接新建一个定时器。
            window.clearInterval(time)
        }
    </script>
</body>
```


#### setTimeout

在指定的毫秒数后执行指定代码, 且只执行一次


```html
<body>
    <script type="text/javascript">
        //setTimeout(函数名，时间)
        //功能：参数2时间以后再执行参数1函数
        //返回值：定时器的id

        alert("创建定时器，3秒后执行名为func的函数");
        var timer = setTimeout(function () {
            console.log("titanjun.top")
        }, 3000)


        // 关闭定时器
        function closeTimer() {
            window.clearTimeout(timer)
        }
    </script>
</body>
```


## DOM

- 当网页被加载时，浏览器会创建页面的文档对象模型（`Document Object Model`）
- `DOM`是访问HTML和操作`HTML`的标准
- 通过可编程的对象模型，`JavaScript`获得了足够的能力来创建动态的`HTML`
  - `JavaScript`能够改变页面中的所有`HTML`元素
  - `JavaScript`能够改变页面中的所有`HTML`属性
  - `JavaScript`能够改变页面中的所有`CSS`样式
  - `JavaScript`能够对页面中的所有事件做出反应
- `HTML DOM`模型被构造为对象的树


![domlisten](https://titanjun.oss-cn-hangzhou.aliyuncs.com/javascript/domlisten.png?x-oss-process=style/titanjun)


- DOM节点层级关系(DOM树)
  -  1、父节点(`parent node`)：父节点拥有任意数量的子节点
  -  2、子节点(`child node`)：子节点只能拥有一个父节点
  -  3、兄弟节点(`sibling node`)：拥有相同父节点的同级节点
  -  4、根节点(`root node`)：一个`HTML`文档一般只有一个根节点，根节点没有父亲节点，是最上层的节点
  -  祖先节点：包含子节点的节点都可以叫做祖先节点，其中包括了父节点
  -  后代节点：一个节点内包含的所有节点，叫做后代节点，其中包括了子节点
- DOM节点的分类
  -  1、文档节点
  -  2、标签(元素)节点
  -  3、属性节点
  -  4、文本节点
  -  5、注释节点


![domcategory](https://titanjun.oss-cn-hangzhou.aliyuncs.com/javascript/domcategory.png?x-oss-process=style/titanjun)


### 获取HTML标签

在`JavaScript`中需要操作`HTML`标签, 首先要获取该标签, 这里介绍三种方法

- 通过`id`找到`HTML`元素
- 通过标签名找到`HTML`元素
- 通过类名找到`HTML`元素
- 通过`name`属性找到`HTML`元素

```html
<body>
    <!--id div-->
    <div id="idDiv"></div>

    <!--classs div-->
    <div class="class1"></div>
    <div class="class1"></div>
    <div class="class1"></div>
    <div class="class1"></div>

    <!--input-->
    <input type="text" name="inputText">
    <input type="text" name="inputText">
    <input type="text" name="inputText">

    <!--JavaScript-->
    <script type="text/javascript">

        // 1. 根据元素id获取元素节点
        console.log('-------getElementById--------')
        var idDiv = document.getElementById('idDiv')
        console.log(idDiv)
        console.log(typeof idDiv)


        // 2. 根据元素class属性获取元素节点, 返回数组
        // 获取相同class属性的元素节点列表, 注意：此方法不支持IE8以下
        console.log('-----------getElementsByClassName------------------')
        var classDivs = document.getElementsByClassName('class1')
        for (var i = 0; i < classDivs.length; i++) {
            console.log(classDivs[i])
        }


        // 3.根据标签名来获取元素节点的结合, 返回数组
        console.log('-----------getElementsByTagName------------------')
        var tagNameDics = document.getElementsByTagName('div')
        for (var i = 0; i < tagNameDics.length; i++) {
            console.log(tagNameDics[i])
        }


        // 4. 根据name属性值来获取元素节点的集合, 返回数组
        console.log('------------getElementsByName--------------------')
        var nameDivs = document.getElementsByName('inputText')
        for (var i = 0; i < nameDivs.length; i++) {
            console.log(nameDivs[i])
        }
    </script>
</body>
```


### 获取属性节点

- 标签的属性分官方定义的属性和自定义属性
- 官方定义的属性可用点语法获取属性值
- 自定义属性只能通过`getAttribute`方法



```html
<body>
    <input type="text"  id="in" placeholder="titanjun.top" blog="titanjun">

    <script type="text/javascript">

        var input = document.getElementById('in')
        console.log(input)

        // 1. 获取官方定义的属性节点可以直接使用点语法, 用法: 元素节点.属性名
        // 得到元素对应的属性值
        var inType = input.type
        console.log(inType)
        console.log(input.placeholder)

        // 修改元素对应的属性值
        input.placeholder = "https://www.titanjun.top"


        console.log('-----------getAttribute-----------')
        // 2. getAttribute方法, 可获取官方定义的属性和自定义的属性
        console.log(input.getAttribute('placeholder'))
        var blog = input.getAttribute('blog')
        console.log(blog)


        console.log('-----------setAttribute-----------')
        // 修改元素对应的属性名
        input.setAttribute('blog', 'titan')
        console.log(input)


        console.log('-----------removeEventListener-----------')
        // 移除元素节点中的某个属性节点, 某些低版本浏览器不支持
        input.removeAttribute('blog')
        console.log(input)

    </script>
</body>
```


### 获取文本节点

- `innerHTML`: 从对象的开始标签到结束标签的全部内容,不包括本身Html标签
- `outerHTML`: 除了包含innerHTML的全部内容外, 还包含对象标签本身
- `innerText`: 从对象的开始标签到结束标签的全部的文本内容

```html
<body>
    <div id="box">
        这是一个div盒子
    </div>

    <script type="text/javascript">
        var jsDiv = document.getElementById('box')

        // 1. 元素节点.innerHTML
        //从对象的开始标签到结束标签的全部内容,不包括本身Html标签
        console.log('--------innerHTML--------')
        var inner = jsDiv.innerHTML
        console.log(jsDiv)
        console.log(typeof jsDiv)

        // 2. 元素节点.outerHTML
        //除了包含innerHTML的全部内容外, 还包含对象标签本身
        console.log('--------innerHTML--------')
        var outer = jsDiv.outerHTML
        console.log(outer)
        console.log(typeof outer)

        // 3. 元素节点.innerText
        //从对象的开始标签到结束标签的全部的文本内容
        console.log('--------innerHTML--------')
        var text = jsDiv.innerText
        console.log(text)
        console.log(typeof text)

        // 修改
        jsDiv.innerText = "https://www.titanjun.top"
        jsDiv.innerHTML = "<h2>https://www.titanjun.top</h2>"
    </script>
</body>
```


### 读写行间样式表

获取像是表中的样式属性的属性值, 常用有两种方式

- 方法一: 元素节点.style.样式属性名
- 方法二: 元素节点.style["样式属性名"]

```html
<body>
    <div id="box" style="width: 100px; height: 100px; background-color: red"></div>
    <button onclick="changeColor()">换颜色</button>

    <script type="text/javascript">
        // 获取元素节点
        var jsDiv = document.getElementById('box')

        // 获取style属性节点
        var divStyle = jsDiv.style
        // console.log(divStyle)


        // 获取像是表中的样式属性的属性值
        console.log(divStyle.width)
        console.log(jsDiv.style["height"])


        // 设置样式表中样式属性的属性值
        // 元素节点.style.样式属性名 = 样式属性值
        // background-color --- backgroundColor
        jsDiv.style.backgroundColor = 'green'

        function changeColor() {
            var r = parseInt(Math.random() * 256);
            var g = parseInt(Math.random() * 256);
            var b = parseInt(Math.random() * 256);

            var colorStr = "rgb(" + r + ", " + g + ", " + b + ")";
            jsDiv.style.backgroundColor = colorStr
        }
    </script>
</body>
```

- 设置样式表中样式属性的属性值时, 样式属性名遵循驼峰命名规则
- `HTML`中的-号去掉，-号后面的单词首字母大写
- 一般情况下, `css`的样式属性中出现"-"好, 则对应的`style`属性是: 去掉"-"号后面单词的第一个字母大写. 如果没有"-"号, 则两者一样


CSS样式属性 | Style对象属性
--|--
color     |         color
font-size    |      fontSize
font-family    |    fontFamily
background-color |  backgroundColor
background-image |  backgroundImage
display | display



### 节点常用属性

- 在`DOM`中，每个节点都是一个对象
- 对象拥有方法和属性，并可通过`JavaScript`进行访问和操作
- 三个重要的节点属性是：`nodeName`, `nodeValue`, `nodeType`


节点类型 |   nodeName |   nodeType  |  nodeValue
--|--|--|--
元素节点 |  元素名称   |     1     |     null
属性节点  |  属性名称   |     2     |    属性值
文本节点  |   #text     |    3       |  文本内容不包括html
注释节点  |  #comment   |  8      |   注释内容
文档节点  |  #document  |  9   |   null



```html
<body>
    <div id="box1">
        <p>我是第一个P</p>
        <p>我是第二个P</p>
        <p>我是第三个P</p>
        <p>我是第四个P</p>
    </div>
    <div id="box2"></div>
    <div id="box3"></div>
    <input id="put" type="text" name="in" placeholder="https://www.titanjun.top">

    <script type="text/javascript">
        // 节点共有的属性：nodeName、nodeType、nodeValue
        var div1 = document.getElementById('box1')
        console.log(div1)
        console.log(div1.nodeName, div1.nodeType, div1.nodeValue)


        // 1. 获取当前元素节点的所有的子节点
        var childNodesArr = div1.childNodes
        console.log(childNodesArr)

        // 2. 获取当前元素节点的第一个子节点
        var firstChildNode = div1.firstChild
        console.log(firstChildNode)

        // 3. 获取当前节点的最后一个节点
        var lastChhildNode = div1.lastChild
        console.log(lastChhildNode)

        // 4. 获取该节点文档的根节点, 相当于document
        var rootNode = div1.ownerDocument
        console.log(rootNode)

        // 5. 获取当前节点的父节点
        var parentNode = div1.parentNode
        console.log(parentNode)

        // 6. 获取当前节点的前一个同级节点
        var div2 = document.getElementById('box2')
        var previousNode = div2.previousSibling
        console.log(previousNode)

        // 7. 获取当前节点的后一个同级节点
        var nextNode = div2.nextSibling
        console.log(nextNode)

        // 8. 获取当前节点的所有属性节点
        var jsInput = document.getElementById('put')
        console.log(jsInput.attributes)
    </script>
</body>
```


### 节点动态操作


```html
<body>
    <div id="box">
        <p>titanjun</p>
        <p>titanking</p>
    </div>

    <script type="text/javascript">

        // 创建元素节点
        var div1 = document.createElement('div')
        div1.id = 'box1'
        console.log(div1)

        // 将一个新节点添加到某个节点的子节点列表的末尾上
        //父节点.appendChild(子节点)
        document.body.appendChild(div1)

        // 将新节点添加到父节点的某个子节点的前面
        var jsP = document.createElement('p')
        jsP.innerHTML = "https://www.titanjun.top"

        //父节点.insertBefore(新节点, 子节点)
        var jsD = document.getElementById('box')
        jsD.insertBefore(jsP, jsD.childNodes[3])
        console.log(jsD)


        // 创建文本节点
        var jsStr = document.createTextNode('/titanjun.top')
        // 添加文本节点
        var jsP2 = jsD.childNodes[1]
        jsP2.appendChild(jsStr)


        // 替换节点, 将父节点中的某个子节点替换成新的节点
        var replaceDiv = document.createElement('div')
        replaceDiv.id = 'box2'
        //父节点.replaceChild(新节点, 子节点)
        div1.parentNode.replaceChild(replaceDiv, div1)


        // 复制节点
        // 只复制本身
        var copyDiv1 = jsD.cloneNode()
        console.log(copyDiv1)
        // 复制本身和子节点
        console.log(jsD.cloneNode(true))


        // 删除节点, 删除父节点下对应的子节点
        //父节点.removeChild(子节点)
        replaceDiv.parentNode.removeChild(replaceDiv)

        // 参照物父元素
        //当某个元素的父元素或以上元素都未进行CSS定位时，则返回body元素，也就是说元素的偏移量（offsetTop、offsetLeft）等属性是以body为参照物的
        //当某个元素的父元素进行了CSS定位时（absolute或者relative），则返回父元素，也就是说元素的偏移量是以父元素为参照物的
        //当某个元素及其父元素都进行CSS定位时，则返回距离最近的使用了CSS定位的元素
        var temp = jsD.childNodes[1].offsetParent
        console.log(temp)
    </script>
</body>
```



---







