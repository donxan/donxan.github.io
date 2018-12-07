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


---

