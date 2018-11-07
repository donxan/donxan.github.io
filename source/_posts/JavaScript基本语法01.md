---
title: JavaScript基本语法01
date: 2017-08-09 23:16:40
tags: [JavaScript, 语法]
categories: JavaScript笔记
image:
---

![JavaScript](http://pggsan8q9.bkt.clouddn.com/javaScript.jpg)


<!-- more -->

> JavaScript 是一门高端的、动态的、弱类型的编程语言，适合面向对象和函数式的编程风格。

> JavaScript 语法源自 Java，一等函数（first-class function）来自于Scheme，基于原型（prototype-based）的继承来自于Self。




## 类型、值和变量
### 数字

- JavaScript 中不区分整数值和浮点数值，所有数字均用浮点数值表示
- JS采用IEEE754标准定义的64位浮点格式表示数字，这意味着它能表示的最大值是±1.7976031348623157×10308，最小值是±5×10-324
- 按照JS中的数字格式，能够表示的整数范围是-9007199254740992~9007199254740992（即 -253~253）
- 需要注意的是，JS中实际的操作（比如数组索引，位操作符）则是基于32位整数。

#### 数字展示格式

```js
0
2
100000
3.1415
.333333
9.02e10    //9.02 * 10的10次方
1.4E-8     //1.4 * 10的-8次方
```
#### JavaScript中的算术运算符

- JavaScript用Math对象实现复杂的运算

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


#### 日期和时间

- Date()构造函数，用于创建表示日期和时间的对象

```js
var then=new Date(2017,0,1);          //2017年1月1日
var later=new Date(2017,0,1,17,10,30);//2017年1月1日 17:10:30
var now=new Date();   //当前日期和时间
var elapsed=now-then; //日期减法，计算时间间隔的毫秒数
later.getFullYear();  //获取年份
later.getMonth();     //获取月份，从0开始计数，一月份是0
later.getDate();      //获取日期，从1开始计数，一号是1
later.getDay();       //星期几，0是星期日，5是星期五
later.getHours();     //获取小时
later.getMinutes();   //获取分钟
later.getSeconds();   //获取秒
later.getUTCHours();  //获取使用UTC表示的小时的时间

```

## 文本字符串

```js
//字符串
var jsString = "Hello,JavaScript";
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

## JavaScript之数组

- 数组是值的有序集合
- JavaScript数组事务类型的:数组元素可以使任何类型, 同一数组中的不同元素也可以是不同类型
- 数组的元素也可以是对象或者其他数组
- JavaScript数组可能是稀疏的: 数组元素的索引不一定是连续的,之间可能有空缺
- 稀疏数组的length比任何元素的索引都要大

### 创建数组

#### 直接量创建

```js

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

#### Array()创建数组

```js
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


#### sort()排序

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


#### push()和pop()

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

#### unshift()和shift()

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

#### toString()和toLocalString()

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


### `ECMAScript5`中数组的方法

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

#### every()和some()

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

#### reduce()和reduceRigh()

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


#### indexOf()和lastIndexOf()

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
