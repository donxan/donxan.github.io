---
title: JavaScript基本语法01
date: 2017-08-09 23:16:40
tags: [JavaScript, 语法]
categories: JavaScript笔记
image:
---

![JavaScript](https://titanjun.oss-cn-hangzhou.aliyuncs.com/javascript/javascropt.jpeg)


<!-- more -->





- `JavaScript`是一种属于网络的脚本语言,已经被广泛用于Web应用开发,常用来为网页添加各式各样的动态功能,为用户提供更流畅美观的浏览效果
- 通常`JavaScript`脚本是通过嵌入在`HTML`中来实现自身的功能的
  - `JavaScript`是一种解释性脚本语言（代码不进行预编译）
  - 主要用来向`HTML`（标准通用标记语言下的一个应用）页面添加交互行为 
  - 可以直接嵌入`HTML`页面，但写成单独的js文件有利于结构和行为的分离 
  - 跨平台特性，在绝大多数浏览器的支持下，可以在多种平台下运行（如`Windows`、`Linux`、`Mac`、`Android`、`iOS`等）。
- `Javascript`脚本语言同其他语言一样，有它自身的基本数据类型，表达式和算术运算符及程序的基本程序框架


## `Javascript`数据类型

- 基本数据类型
  * 1、数字(Number)：包括浮点数与整数
  * 2、字符串(String)：包括由任意数量字符组成的序列
  * 3、布尔值(Boolean)：包括true和false
  * 4、`Undefined`：当我们试图访问一个不存在的变量时，就会得到一个特殊的值`undefined`。除此之外，使用已定义却未赋值的变量也会如此，以为js会自动将变量在初始化之前的值设定为`undefined`。而`Undefined`类型的值只有一个，那就是undefined
  * 5、`Null`：只包含一个值的特殊数据类型。所谓的`null`值，通常是没有值或空值，不代表任何东西。`null`与`undefined`最大的不同在于，被赋予`null`的变量通常被认为是已经定义了的，只不过它不代表任何东西。
  * 6、`Symbol`: 是 ES6 引入了一种新的原始数据类型，表示独一无二的值

- 引用数据类型
  - 对象(Object)、
  - 数组(Array)、
  - 函数(Function)


## JavaScript语法

### JavaScript输出

- `JavaScript`可以通过不同的方式来输出数据：
  - 使用 `window.alert()` 弹出警告框。
  - 使用 `document.write()` 方法将内容写到 HTML 文档中。
  - 使用 `innerHTML` 写入到 HTML 元素。
  - 使用 `console.log()` 写入到浏览器的控制台。


```html
<script>
    // 使用 window.alert()
    // 弹出警告框来显示数据
    window.alert(5 + 6);
</script>


<script>
    // 写到 HTML 文档
    document.write(Date());
</script>



<script>
    // 操作 HTML 元素
    // 使用 "id" 属性来标识 HTML 元素，并 innerHTML 来获取或插入元素内容
    document.getElementById("demo").innerHTML = "段落已修改。";
</script>


<script>
    // 在控制台打印数据
    a = 5;
    b = 6;
    c = a + b;
    console.log(c);
</script>
```


### `JavaScript`注释

- `JavaScript`不会执行注释中的代码
- `JavaScript`中的注释语句和`iOS`中的一样
  - 单行注释以 `//` 开头
  - 多行注释以 `/*` 开始，以 `*/` 结尾

```js
// 这是单行注释


/**
这是多行注释
代码不会执行
*/
```

### 分号`;`

- 分号用于分隔 JavaScript 语句。
- 通常我们在每条可执行的语句结尾添加分号。
- 使用分号的另一用处是在一行中编写多条语句
- 也可能看到不带有分号的案例, 在`JavaScript`中，用分号来结束语句是可选的, 不加分号亦可


```js
// 有分号的情况
var num1 = 5;
console.log(num1);

// 不加分号的情况
var num1 = 5
console.log(num1)
```


## 数字`Number`

- `JavaScript`中不区分整数值和浮点数值，所有数字均用浮点数值表示
- JS采用`IEEE754`标准定义的64位浮点格式表示数字，这意味着它能表示的最大值是±1.7976031348623157×10308，最小值是±5×10-324
- 按照JS中的数字格式，能够表示的整数范围是-9007199254740992~9007199254740992（即 -253~253）
- 需要注意的是，JS中实际的操作（比如数组索引，位操作符）则是基于32位整数。


### 类型操作符`typeof`

当以下num定义后没有任何赋值的情况下num的类型是`Undefined`，值为`undefined`

```js
//定义了一个名为num的变量
var num;

//打印变量num的值
console.log(num);  // undefined

//打印变量的数据类型
//查看类型操作符typeof
console.log(typeof num);  //undefined
```

### 进制数

```js
//八进制数以0开头
num1 = 0377;
//打印出的是八进制0377的十进制形式
console.log(num1);

//十六进制数以0x开头
num1 = 0xff;
//打印出的是十六进制0xff的十进制形式
console.log(num1);
```

### 特殊值

- `Infinity`：代表的是超出js处理范围的数值，但它依然是一个数字
  - 任何数除以0结果为`Infinity`
  - `Infinity`与其他任何操作数执行任何算术运算的结果也是`Infinity`
- `NaN`：表示不是数字，但事实上它依然属于数字类型，只不过是一种特殊的数字罢了
  - 如果我们在算术运算中使用了不恰当的操作数，导致运算失败，就会得到`NaN`
  - `NaN`具有传染性，只要算术运算中存在一个`NaN`，整个运算就会失败


```js
num1 = 1e308;
console.log(num1); //1e+308

//超出表示范围
num1 = 1e309;
console.log(num1);  //Infinity

//任何数除以0结果为Infinity
console.log(10 / 0);  //Infinity
//Infinity与其他任何操作数执行任何算术运算的结果也是Infinity
console.log(num1 * 2);  //Infinity


//正负Infinity相加的结果？
//结果为NaN
console.log(Infinity + (-Infinity));  //NaN
console.log(typeof NaN);  //number

//如果我们在算术运算中使用了不恰当的操作数，导致运算失败，就会得到NaN
console.log(10 * 'f');  //NaN
//NaN具有传染性，只要算术运算中存在一个NaN，整个运算就会失败
console.log(1 + 2 + NaN);  //NaN
```


### `Math`运算

`JavaScript`用`Math`对象实现复杂的运算

```js
Math.pow(2,3)   //8；2的3次幂
Math.round(.6)  //1.0；四舍五入
Math.ceil(.6)   //1.0；向上取整
Math.floor(.6)  //0.0；向下取整
Math.abs(-5)    //5；求绝对值
Math.max(x,y,z) //返回最大值
Math.min(x,y,z) //返回最小值
Math.random()   //生成一个大于等于0小于1.0的伪随机数
Math.PI         //π；圆周率
Math.E          //e；自然对数的底数
Math.sqrt(3)    //3的平方根
Math.pow(3,1/3) //3的立方根
Math.sin(0)     //三角函数。Math.cos(),Math.tan(),Math.sin(30/180*Math.PI)
Math.log(10)    //10的自然对数
Math.log(100)/Math.LN10 //以10为底100的对数
Math.log(512)/Math.LN2 //以2为底512的对数
Math.exp(3)     //e的3次幂
```



## JavaScript布尔

在`JavaScript`中有布尔值和`falsy`值和`truthy`值
- 布尔（逻辑）只能有两个值：`true` 或 `false`
- 所有的`Falsy`值，当进行逻辑判断时均为`false`
- 除`Falsy`值之外的所有的值均为`Truthy`，当进行逻辑判断时均为`true`
  - `Infinity`、空数组、"0"都是`Truthy`值

```js
var br = true;
var br2 = false
console.log(br);
console.log(typeof br);

/*
Falsy值包括：
 * 1、数字:0
 * 2、数字:NaN
 * 3、空字符串:""
 * 4、布尔值:false
 * 5、undefined
 * 6、null
 */
```

### 判断函数

- `isNaN(info)`  判断值是否是NaN，如果`info===NaN`则返回`true`，否则返回`false`
- `isFinite()`检测是否是一个既非`Infinity`也非`NaN`的数字

```js
// isNaN函数
console.log(isNaN(NaN));//true
console.log(isNaN(parseInt("abc")));//true
console.log(isNaN(123));

// 	isFinite函数	
console.log(isFinite(Infinity));//false
console.log(isFinite(-Infinity));//false
console.log(isFinite(NaN));//false
console.log(isFinite(123));//true
```


## 字符串

js中一对双引号或单引号之间的任何都会被视为一个字符串

```js
var str = "https://titanjun.top";
var arr = "/";
//两个字符串相加，相当于拼接
var ret = str + arr;
console.log(ret);

//数字+字符串:将数字转换成字符串后相加拼接
var num = 10;
ret = str + num;
console.log(ret);

//字符串
var jsString = "Hello,JavaScript";
console.log(typeof jsString)  // string
//字符串长度
var s0 = jsString.length;  //16,
// 第一个字符
var s1 = jsString.charAt(0) ; //"H",
// 最后一个字符
var s2 = jsString.charAt(s0 - 1)  //"t",
//第2~4个字符
var s3 = jsString.substring(1, 4) //"ell",
//第2~4个字符
var s4 = jsString.slice(1, 4)  //"ell"
// 最后三个字符
var s5 = jsString.slice(-3)  //"ipt"
// 字符"a"首次出现的位置
var s6 = jsString.indexOf("a")  //7
// 字符"a"最后一次出现的位置
var s7 = jsString.lastIndexOf("a")  //9
// 字符"a"第二次出现的位置
var s8 = jsString.indexOf("a", 2)  //7
// 字符串分割成数组
var s9 = jsString.split(",")    //["Hello", "JavaScript"]
// 全文字符替换
var s10 = jsString.replace("e", "E")  //"HEllo,JavaScript"
// 全文转换为大写
var s11 = jsString.toUpperCase()  //"HELLO,JAVASCRIPT"
// 全文转换成小写
var s12 = jsString.toLowerCase()  //"hello,javascript"

//测试输出结果
var sArr = [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12]
for (var i = 0; i < sArr.length; i++) {
    console.log(sArr[i])
}
```


## 日期Date

- 日期对象用于处理日期和时间
- 格林尼治时间(GTM):是英国郊区皇家格林尼治天文台的时间，因为地球自转的原因，不同经度上的时间是不相同的，格林尼治天文台是经度为0的地方。世界上发生的重大时间都是以格林尼治时间时间为标准的。
- 世界协调时间(UTC):世界时间。1970年1月1日0点。
- `ECMAScript`中的`Date`类型是在早期`Java`中的`java.util.Date`类的基础上构建的。为此`Date`类型使用自UTC1970年1月1日午夜（零时）开始经过的毫秒数保存时间的。该Date类型保存的日期能够精确到1970年1月1日之前和之后的285616年


### 创建Date

创建时间使用构造函数法, `new Date()`, 不论`Date()`是否带参数，返回的都是当前时间

```js
//1、构造函数法--不传参数
var date1 = new Date()
console.log(typeof date1) //Object类型
console.log(date1)


//2、参数是一个表示时间的字符串
//格式：month day, year hours:minutes:seconds
//如果省略了小时、分钟、秒数，这些会被设置为0
var date2 = Date("2016-09-18");
console.log(typeof date2) //String类型
console.log(date2)


//3. 参数是毫秒数
//返回中国标准时间
var date3 = new Date(1000)
console.log(date3)


//4. 参数是(年,月,日,时,分,秒,毫秒)
//注意：年和月必须写，且月从0开始，日期从1开始
var date4 = new Date(2016,09,9,10,10,10,1000)
console.log(date4)
```

### Date对象方法

#### 获取时间

```js
var date = new Date();

//获取年份
console.log(date.getFullYear());
//获取月份，注意0表示1月，依次类推
console.log(date.getMonth());
//获取日期
console.log(date.getDate());
//获取星期
console.log(date.getDay());
//获取小时
console.log(date.getHours());
//获取分钟
console.log(date.getMinutes());
//获取秒数
console.log(date.getSeconds());
//获取毫秒数
console.log(date.getMilliseconds());
//获取日期对象所表示的日期距离1970-01-01的毫秒数
console.log(date.getTime());
```


#### 设置时间

```js
//设置年份
date.setFullYear(2015);
//设置月份
//注意：传入的月份大于11，则年份增加
date.setMonth(8);
//设置日期
//注意：如果传入的日期超过了该月应有的天数则会增加月份
date.setDate(29);

//注意：星期一般不用设置

//设置小时
//注意：如果传入的值超过23则增加日期
date.setHours(13);

//设置分钟
//注意：如果传入的值超过了59则增加小时数
date.setMinutes(56);

//设置秒数
//注意：传入的值超过59会增加分钟数
date.setSeconds(10);

//设置毫秒数
//注意：传入的值超过999会增加秒数
date.setMilliseconds(888);
console.log(date)

//设置距离1970-01-01的毫秒数
date.setTime(1308484904898);
console.log(date);
```


#### Date转换格式

```js
//转换成字符串
console.log(date.toString())
//日期部分转换为字符串
console.log(date.toDateString())
//把时间部分转换为字符串
console.log(date.toTimeString())
//包含年月日时分秒
console.log(date.toLocaleString());
//包含年月日
console.log(date.toLocaleDateString());
//包含时分秒
console.log(date.toLocaleTimeString());


//使用 ISO 标准返回字符串的日期格式
console.log(date.toISOString())
//JSON 数据格式返回日期字符串
console.log(date.toJSON())
//根据世界时，把 Date 对象转换为字符串
console.log(date.toUTCString())
```

#### parse

返回某日期距离1970年1月1日0点的毫秒数

```js
//Date.parse(dateString)
//参数：日期字符串  格式：2016-05-08  2015/05/08 12:00:00
//返回该日期距离1970年1月1日0点的毫秒数
console.log(Date.parse("2018-10-10"));
```


#### Date间运算

```js
var date1 = new Date("2018-10-10 10:10:10");
var date2 = new Date("2018-10-10 10:10:12");

//两个日期对象之间相差的毫秒数
console.log(date2 - date1) // 2000

//返回两个日期字符串拼接后的字符串
console.log(date2 + date1)  // Mon Oct 10 2016 10:10:12 GMT+0800 (CST)Mon Oct 10 2016 10:10:10 GMT+0800 (CST)
console.log(typeof (date2 + date1))  //string
```



## 数组Array

- 数组是值的有序集合
- `JavaScript`数组事务类型的:数组元素可以使任何类型, 同一数组中的不同元素也可以是不同类型
- 数组的元素也可以是对象或者其他数组
- `JavaScript`数组可能是稀疏的: 数组元素的索引不一定是连续的,之间可能有空缺
- 稀疏数组的`length`比任何元素的索引都要大
- `JavaScript`中的数组可以存储多个不同类型的数据

### 创建数组

#### 直接量创建

```js
// 字面量表示法
//1.1: 简单数组
var empty = [];   //空数组
var pram = [2, 3, 2]  //有三个数值的数组
var misc = [1.1, true, "a"] //三个不同元素的数组

// 1.2: 数组中的直接量不一定是常量,也可能是表达式
var base = 1024
var baseArr = [base, base + 1, base + 2, base + 3]

// 1.3: 包含对象或数组
var array3 = [[1, {x: 1, y: 2}], [2, {x: 3, y: 4}]]

//1.4: 忽略中间量中的某个值,省略的元素将被赋予undefined
var undef1 = [1, ,3] //三个元素,中间的为undefined
var undef2 = [, ,] //2个元素都是undefined
//注: 数组直接量的语法允许游客选的结尾的逗号,故[, ,]只有2个元素
```

#### Array()创建

```js
// 构造函数
// 空数组
var a = new Array()
//指定数组长度
var a1 = new  Array(10)
//显示创建
var a2 = new  Array(1, 2, 3, "a")
```

### 数组操作

```js
//3. 读写数组元素
//注: 1.数组是对象的特殊形式,故JavaScript的数组不存在越界报错的情况,只会取到undefined
var value = a2[3]

//4. 数组的长度
//length属性为可读可写
var arr = [1, 2, 3, 4, 5, 6]
var arrLength = arr.length  //6
arr.length = 4   //数组变为[1, 2, 3, 4]
arr.length = 0  // 删除所有元素,为[]
arr.length = 5  // 长度为5,但是没有元素,相当于new Array(5)

//5. 数组元素的添加和删除
//5.1: 索引值添加
var a0 = []
a0[0] = 3
a0[1] = "one"
//a0为[3, "one"]
```

### 数组的方法

主要介绍`ECMAScript`中的方法


#### join()

- 0.不改变原数组
- 1.将数组所有的元素都转化成字符串,并连接在一起,返回生成后的字符串(如不指定分隔符默认使用逗号)
- 2.join是String.split()的逆向操作

```js
var arr0 = [1, 2, 3, 4]
var join1 = arr0.join() // "1,2,3,4"
var join2 = arr0.join("") //"1234"
var join3 = arr0.join("-")  //"1-2-3-4"
console.log(join1,join2,join3)
```


#### reverse()

- 0.改变原数组
- 1.将数组中的元素颠倒顺序*/

```js
arr0.reverse()  //现在arr0为[4, 3, 2, 1]
console.log(arr0)
```


#### sort()

- 0.改变原数组
- 1.不带参数时,以字母表顺序排序
- 2.如果数组包含undefined,则会被排到数组的末尾
- 3.字母排序区分大小写,A < a

```js
var arr1 = new Array("tian", "quan", "jun")
arr1.sort() //arr1 = ["jun", "quan", "tian"]
console.log(arr1)

//条件比较
var  arr2 = new Array("ant", "Bug", "cat", "Dog")
arr2.sort()  //["Bug", "Dog", "ant", "cat"]
console.log(arr2)

//不区分大小写排序
arr2.sort(function (s, t) {
    var a = s.toLowerCase()
    var b = t.toLowerCase()
    if (a < b) return -1
    if (a > b) return 1
    return 0
})
console.log(arr2)
//["ant", "Bug", "cat", "Dog"]
```


#### concat()

创建并返回一个新数组

```js
//0.不改变原数组
var arr4 = [0, 2, 3]
var concat1 = arr4.concat() //[0, 2, 3]
var concat2 = arr4.concat(1, 4)  //[0, 2, 3, 1, 4]
var concat3 = arr4.concat([1, 4]) //[0, 2, 3, 1, 4]
var concat4 = arr4.concat([1, 4], [5, 6]) //[0, 2, 3, 1, 4, 5, 6]
var concat5 = arr4.concat(1, [4, [5, 6]]) //[0, 2, 3, 1, 4, [5, 6]]
var concatArr = [concat1, concat2, concat3, concat4, concat5]
console.log(concatArr)
```

#### slice()

* 注意:
* 1.返回数组的部分数组
* 2.不改变原数组
* 3.两个参数,分别表示始末位置,含左不含右
* 4.1表示第一个元素,-1表示倒数第一个元素
* 5.只有一个参数,默认以此参数开始,到最后一个元素结束

```js
var arr3 = [1, 2, 3, 4, 5]
var slice1 = arr3.slice(0,2) //[1, 2]
var slice2 = arr3.slice(3) //[4, 5]
var slice3 = arr3.slice(1,-2) //[2, 3]
var slice4 = arr3.slice(-3,-2)  //[3]
var sliceArr = [slice1, slice2, slice3, slice4]
console.log(sliceArr)
```

#### splice()

* 1.在数组中插入或删除元素的通用方法
* 2.会修改原数组,会改变数组的索引值
* 3.两个参数,参数一:起始位置;参数二:处理元素的个数(可省略)
* 4.若省略第二个参数,默认从起始位置到最后
* 5.如果没有元素就返回空数组

```js
var m = [1, 2, 3, 4, 5, 6, 7]
var splice1 = m.splice(4)  //返回[5, 6, 7], m 是[1, 2, 3, 4]
console.log(m)
var splice2 = m.splice(1, 2) //返回[2, 3], m 是[1, 4]
console.log(m)
var splice3 = m.splice(1, 1) //返回[4], m 是[1]
console.log(m)
var spliceArr = [splice1, splice2, splice3]
console.log(spliceArr)
```


#### push和pop

* 方法将数组当成栈使用
* 1.push方法在尾部添加一个或者多个元素,返回新的数组长度
* 2.pop删除数组的最后一个元素,减小数组的长度,返回删除的值
* 3.改变原数组的值和长度

```js
var m0 = []
var pp1 = m0.push(1, 2)  //[1, 2], 返回2
var pp2 = m0.pop()       //[1], 返回2
var pp3 = m0.push(3, 4)  //[1, 3, 4], 返回3
var pp4 = m0.pop()       //[1, 3],  返回4
var pp5 = m0.push([9,0]) //[1, 3, [9, 0]], 返回3
var pp6 = m0.pop()       //[1, 3], 返回[9, 0]
var pp7 = m0.pop()       //[1], 返回3
var ppArr = [pp1, pp2, pp3, pp4, pp5, pp6, pp7]
console.log(ppArr)
```

#### unshift和shift

* 1.unshift在头部添加一个或者多个元素,返回长度
* 2.shift删除数组的第一个元素,返回删除的元素
* 3.改变原数组,改变原数组的索引
* 4.unshift插入多个元素时,试一次性插入的

```js
var sh = []
var sh1 = sh.unshift(1)  //sh: [1], 返回: 1
var sh2 = sh.unshift(22) //sh: [1, 22], 返回: 2
var sh3 = sh.shift()     //sh: [22], 返回: 22
var sh4 = sh.unshift(3, [4, 5]) //sh: [3, [4, 5], 1], 返回:  3
var sh5 = sh.shift()      //sh: [[4, 5], 1], 返回: 3
var sh6 = sh.shift()      //sh: [1], 返回: [4, 5]
var shiftArr = [sh1, sh2, sh3, sh4, sh5, sh6]
console.log(shiftArr)
//注: unshift插入多个元素时,试一次性插入的,例如:
sh.unshift(3, 4)
// 结果: [3, 4]
sh.unshift(3)
sh.unshift(4)
//结果: [4, 3]
```

#### toString和toLocalString

* 1.toString()将数组元素转化成字符串后,用都好链接输出
* 2.toString()和join()不加参数的返回的值是一样的
* 3.toLocalString()是toString()的本地化版本

```js
var str0 = [1, 2, 3].toString() //返回: "1,2,3"
var str1 = ["a", "b", "c"].toString()  //返回: "a,b,c"
var str2 = [1, [2, "c"]].toString()  //返回: "1,2,c"
var str3 = [1, 2, 3].toLocaleString()  //返回: "1,2,3"
var strArr = [str0, str1, str2, str3, str4]
console.log(strArr)

```


### `ECMAScript5`

* 1.`ECMAScript5`定义了九个新的数组方法
* 2.大多数`ECMAScript5`数组方法的第一个参数是一个函数
* 2.第二个参数是可选的,如果有,则调用的函数被看作是第二个参数的方法
* 3.也就是说在调用函数时,传递进去的第二个参数作为它的this关键字的值来使用
* 4.`ECMAScript5`中的数组方法不会修改他们调用的原始数组
* 5.传递给这些方法的函数是可以改变这些数组的



#### forEach()

* 1.方法从头到尾遍历数组,为每个元素调用指定的函数
* 2.forEach使用三个参数调用该函数:数组元素,元素索引, 数组本身

```js
var data1 = [1, 2, 3, 4, 5]
//求和
var sum = 0
data1.forEach(function (value) {
    sum += value
})
//15

//每个元素本身自加1
data1.forEach(function (value, i, arr) {
    arr[i] = value + 1
})
//[2, 3, 4, 5, 6]
```

#### map()

* 1.返回一个新数组,不改变原数组
* 2.原数组若是稀疏数组,返回也是稀疏数组
* 3.具有相同的长度,相同的缺失元素

```js
var arr2 = data1.map(function (x) {
    return x * x
})
// [4, 9, 16, 25, 36]
```

#### filter()
逻辑判定,过滤数组

* 1.返回原数组的一个子集
* 2.返回原数组符合条件的元素,组成新数组
* 3.会将稀疏数组压缩,返回的是稠密数组


```js
var arr3 = data1.filter(function (x) {
    return x > 3
})
//[4, 5, 6]

var data2 = [1, 2, 3, 4, 5]
var arr4 = data2.filter(function (i) {
    return i % 2 == 0
})
//[2, 4]

var data3 = [1, 2, , , null, 5]
var arr5 = data3.filter(function (x) {
    return x !== undefined && x != null
})
console.log(arr5)
//[1, 2, 5]
```

#### every和some

数组的逻辑判定

* 1.对数组元素应用指定的函数进行判定
* 2.返回trur或者false
* 2.every()都为true返回true,否则返回false
* 3.some()都为false,返回false;有一个为true,返回true
* 4.一旦该方法确定了返回值,就会停止遍历数组
* 5.空数组,every()返回true,some()返回false


```js
var data4 = [1, 2, 3, 4, 5]
var sum1 = data4.every(function (x) {
    return x < 10
})
//sum1 = true
var sum2 = data4.every(function (x) {
    return x % 2 === 0
})
//sum2 = false

var sum3 = data4.some(function (x) {
    return x % 2 === 0
})
//sum3 = true
var sum4 = data4.some(isNaN)
//sum4 = false, data4不包含非整数值元素
```

#### reduce和reduceRigh

* 作用: 将数组元素进行组合生成单个值
* 1.reduce()需要两个参数;参数一:执行操作的函数;参数二:传递给函数的初始值
* 2.reduceRight()是倒叙操作,功能与reduce相同

```js
var data5 = [1, 2, 3, 4, 5]
var sn0 = data5.reduce(function (x, y) {
    return x + y
}, 0)
//15

var sn1 = data5.reduce(function (x, y) {
    return x * y
}, 1)
//120

var sn2 = data5.reduce(function (x, y) {
    return x > y ? x : y
})
```


#### indexOf和lastIndexOf

* 1.搜索整个数组中具有给定值的元素,返回找到的第一个元素的索引,如果没有找到就返回-1
* 2.indexOf(),从前向后搜索,lastIndexOf()从后向前搜索
* 3.参数一:元素值; 参数二: 搜索的起始位置(可省略,默认从头开始)

```js
var data6 = [0, 1, 2, 1, 0]
var index1 = data6.indexOf(1) //1, data6[1] = 1
var index2 = data6.indexOf(3) //-1, 没有值为3的元素
var index3 = data6.lastIndexOf(1) //3, data6[3] = 1
var index4 = data6.indexOf(2, 1)//2, data6[2] = 2
var index5 = data6.lastIndexOf(2, -1)//2, data6[2] = 2

```

### 判定一个位置对象是否为数组

```js
var data = [1, 2]
// var isA = data.isArray()
console.log(data.isArray())
```


## 类型间的转换

### Number()

将其他类型数据转成Number类型数据

```js
//1、Null-->Number
console.log(Number(null));//0

//2、Undefined-->Number
console.log(Number(undefined));//NaN

//3、Boolean-->Number
console.log(Number(true));//1
console.log(Number(false));//0

//4、String-->Number
//如果字符串中只有数字、小数点、(最前面空格 正负号)则转换成对应的十进制数
console.log(Number("123"));//123
console.log(Number("12.3"));//12.3
console.log(Number("+123"));//123
console.log(Number("-123"));//-123
console.log(Number("   123"));//123

//如果是一个空字符串，结果是0
console.log(Number(""));//0
console.log(Number("   "));//0

//如果字符串中含有非数字，非正负号，转换失败，结果NaN
console.log(Number("123abc"));//NaN
console.log(Number("123+456"));//NaN
console.log(Number("abc"));//NaN
```

### parseInt()

- 会试图将其收到的任何输入值(通常是字符串）转成整数类型，如果转换失败就返回NaN。
- 转换规则：如果第一个非空白字符(空格、换行、tab)是数字或者正负号则开始转换，直到碰到第一个非数字字符停止转换。如果第一个非空白字符不是数字或者正负号，转换失败，结果是NaN.


```js
console.log('-----parseInt------')
console.log(parseInt("123"));//123
console.log(parseInt("+123"));//123
console.log(parseInt("-123"));//-123
console.log(parseInt("  123"));//123
console.log(parseInt("12a3"));//12
console.log(parseInt("12.3"));//12
console.log(parseInt("12 3"));//12

//NaN
console.log(parseInt("true")); //NaN
console.log(parseInt("  .123")); //NaN
console.log(parseInt("+-123")); //NaN
```


### parseFloat()
 - 会试图将其收到的任何输入值(通常是字符串）转成浮点数类型，如果转换失败就返回NaN。

```js
console.log( parseFloat("   2.5a") );//2.5
console.log( parseFloat("  .56") ); //0.56
console.log( parseFloat("  -.23")); //- 0.23
console.log( parseFloat("   +.23 + .1") );//0.23
console.log( parseFloat("  3.14.956") ); //3.14
console.log( parseFloat("a3.14") ); //NaN
```

### String

其它基本类型转换成String类型


```js
//Null-->String
var str0 = "titan" + null;
console.log(typeof str0); //string
console.log(str0); //titannull

//Undefined-->String
var str1 = "jun" + undefined;
console.log(typeof str1); //string
console.log(str1); //junundefined

//Boolean-->String
var str2 = true.toString(); //true
console.log(typeof str2);//string
console.log(str2);//"true"
console.log(false.toString());//"false"


//Number-->String
var num = 10;
var str3 = num.toString();
console.log(typeof str3);//string
console.log(str3);//"10"
```

### Boolean()

- 其它基本类型转换成`Boolean`类型
- 绝大部分值在转换为布尔类型时都为`true`，但以下6中`falsy`值除外

```js
/**
 * 1、""
 * 2、null
 * 3、undefined
 * 4、0
 * 5、NaN
 * 6、false
 */
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(0));
console.log(Boolean(NaN));
console.log(Boolean(false));

// 都输出false
```


---










