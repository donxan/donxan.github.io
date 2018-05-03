---
title: Python数据类型详解01
date: 2018-04-10 16:45:56
tags: [Python, 数据类型, MacOS]
categories: Python基础
<!--copyright: true-->
---

- `Python`（英语发音：`/ˈpaɪθən/`）, 是一种面向对象、解释型计算机程序设计语言，由`Guido van Rossum`于1989年发明，第一个公开发行版发行于1991年。
- `Python`是纯粹的自由软件， 源代码和解释器`CPython`遵循 `GPL(GNU General Public License)`协议 。
- Python语法简洁清晰，特色之一是强制用空白符(white space)作为语句缩进
  - `Python` 是一种解释型语言： 这意味着开发过程中没有了编译这个环节。类似于PHP和Perl语言
  - `Python` 是交互式语言： 这意味着，您可以在一个`Python`提示符，直接互动执行写你的程序
  - `Python` 是面向对象语言: 这意味着`Python`支持面向对象的风格或代码封装在对象的编程技术
  - `Python`是初学者的语言：`Python` 对初级程序员而言，是一种伟大的语言，它支持广泛的应用程序开发，从简单的文字处理到 WWW 浏览器再到游戏

<!-- more -->

## Mac系统下搭建`Python`环境
- 首先到[Python官网](https://www.python.org/download) 下载安装最新版本的`Python`, 安装比较无脑,一路按下去就OK
  - 具体可参考[在Mac OS上搭建Python的开发环境](https://www.cnblogs.com/code-juggler/p/6344646.html)
- 安装`Python`开发软件, 推荐两款开发软件`Pycharm`和`Sublime Text`, 这里只介绍`Pycharm`的安装和破解方法
  - 首先到[这里下载](http://www.pc6.com/mac/500474.html)`Pycharm`软件
  - 然后[到这里](https://blog.csdn.net/u014044812/article/details/78727496)找软件的相关破解方法
- `Python`的开发环境和开发软件都搞定之后,下面我们就来看看`Python`的基本语法吧
- 测试代码详见 [GitHub地址](https://github.com/CoderTitan/PythonDemo)

## 基本语法
### 输出格式

`Python`的输出语法和`Swift`的输出一样

```objc
# 输出
print("Hello Python")
```

### 注释
- `python`中单行注释采用 # 开头。
- `python` 中多行注释使用三个单引号 `'''` 或三个双引号 `"""`

```objc

# 这里是单行注释


'''
这是多行注释，使用单引号。
这是多行注释，使用单引号。
这是多行注释，使用单引号。
'''

"""
这是多行注释，使用双引号。
这是多行注释，使用双引号。
这是多行注释，使用双引号。
"""

```

### 变量
`Python`中的变量不需要声明，变量的赋值操作既是变量声明和定义的过程。每个变量在使用前都必须赋值，变量赋值以后该变量才会被创建

```objc
 counter = 100 # 赋值整型变量
 miles = 1000.0 # 浮点型
 name = "John" # 字符串
```

Python允许你同时为多个变量赋值, 也可以为多个对象指定多个变量。例如：

```objc
a = b = c = 1 

# 多变量赋值
a, b, c = 1, 2, "jun" 
```

## 标准数据类型
- `Python`有五个标准的数据类型：
  - `Numbers`（数字）
  - `String`（字符串）
  - `List`（列表）
  - `Tuple`（元组）
  - `Dictionary`（字典）

### `Numbers`（数字）
- `Number`是不可被改变的数据类型, 当你指定一个值时，`Number`对象就会被创建
- `Python`支持四种不同的数值类型：
  - `int`（有符号整型）
  - `long`（长整型[也可以代表八进制和十六进制]）
  - `float`（浮点型）
  - `complex`（复数）
- 复数: 和数学中的复数含义一样, 复数由实数部分和虚数部分构成，可以用`a + bj`, 或者`complex(a, b)`表示， 复数的实部a和虚部b都是浮点型


int | long | float |	complex
---|---|---|---
10 | 51924361L | 	0.0	 | 3.14j
100 | 	-0x19323L | 	15.20 | 	45.j
-786 | 	0122L | 	-21.9 | 	9.322e-36j
080 | 	0xDEFABCECBDAECBFBAEl | 	32.3+e18 | 	.876j
-0490 | 	535633629843L | 	-90. | 	-.6545+0J
-0x260 | 	-052318172735L | 	-32.54e100 | 	3e+26J
0x69 | 	-4721885298529L | 	70.2-E12 | 	4.53e-7j

### `Python`字符串
- 字符串或串(String)是由数字、字母、下划线组成的一串字符
- 和`Swift`中的字符串一样, 每一个字符都有一个与之对应的索引
- `python`的字串列表有2种取值顺序:
  - 从左到右索引默认0开始的，最大范围是字符串长度少1
  - 从右到左索引默认-1开始的，最大范围是字符串开头
  - 获取某一部分字符串的格式: [头下标:尾下标]

```objc
# 字符串
str = 'Hello Python'

# 1. 输出完整字符串
print("完整字符串--" + str)
# 结果输出:

# 2. 输出第一个字符
print("第一个字符--" + str[0])

# 3. 输出第三到七个字符
print("第3-7个字符--" + str[2:6])

# 4. 输出低2个字符开始的所有字符
print("第2个开始的所有字符--" + str[1:])

# 5. 拼接字符串
# 像上面一样, 字符串用 `+`拼接
print("拼接--" + str)

# 6. 输出3次
# `*` 表示重复操作, 需要重复操作几次, 后面跟上次数即可
print(str * 3)

# 7. 输出最后一个字符
print("最后一个字符--" + str[-1])

# 8. 输出倒数第二个字符
print("倒数第二个字符--" + str[-2])

```

下面是以上语法的输出结果

```objc
/*
完整字符串--Hello Python
第一个字符--H
第3-7个字符--llo 
第2个开始的所有字符--ello Python
拼接--Hello Python
Hello PythonHello PythonHello Python
最后一个字符--n
倒数第二个字符--o
*/
```

### List（列表）
- `List`（列表） 是 `Python` 中使用最频繁的数据类型, 和`C`语言中的数组一样, 语法操作和上述字符串类似
- 列表可以完成大多数集合类的数据结构实现。它支持字符，数字，字符串甚至可以包含列表（所谓嵌套）。
- 列表用`[ ]`标识。是`python`最通用的复合数据类型
- 列表中的值得分割也可以用到变量[头下标:尾下标]，就可以截取相应的列表
  - 从左到右索引默认0开始的
  - 从右到左索引默认-1开始
  - 下标可以为空表示取到头或尾。
- 加号（+）是列表连接运算符，星号（*）是重复操作

```objc
# List 列表
list1 = [12, 34, 3.14, 5.3, 'titan']
list2 = [10, 'jun']

# 1.完整列表
print(list1)

# 2.列表第一个元素
print(list1[0])

# 3.获取第2-3个元素
print(list1[1:2])

# 4.获取第三个到最后的所有元素
print(list1[2:])

# 5.获取最后一个元素
print(list1[-1])

# 6.获取倒数第二个元素
print(list1[-2])

# 7.获取最后三个元素
print(list1[-3:-1])

# 8.合并列表
print(list1 + list2)

# 9.重复操作两次
print(list2 * 2)
```

上述语句输出结果如下

```objc
[12, 34, 3.14, 5.3, 'titan']
12
[34]
[3.14, 5.3, 'titan']
titan
5.3
[3.14, 5.3]
[12, 34, 3.14, 5.3, 'titan', 10, 'jun']
[10, 'jun', 10, 'jun']
```

### 元组
- 元组是另一个数据类型(`Python`中的元组和`Swift`中的元组类似)
- 元组用"()"标识。内部元素用逗号隔开
- 元素不能二次赋值，相当于只读列表

```objc
# 元组
tuple1 = (12, 34, 3.14, 5.3, 'titan')
tuple2 = (10, 'jun')

# 1.完整元组
print(tuple1)

# 2.元组一个元素
print(tuple1[0])

# 3.获取第2-3个元素
print(tuple1[2:3])

# 4.获取第三个到最后的所有元素
print(tuple1[2:])

# 5.获取最后一个元素
print(tuple1[-1])

# 6.获取倒数第二个元素
print(tuple1[-2])

# 7.获取最后三个元素
print(tuple1[-3:-1])

# 8.合并元组
print(tuple1 + tuple2)

# 9.重复操作两次
print(tuple2 * 2)

```

输出结果

```objc
(12, 34, 3.14, 5.3, 'titan')
12
(3.14,)
(3.14, 5.3, 'titan')
titan
5.3
(3.14, 5.3)
(12, 34, 3.14, 5.3, 'titan', 10, 'jun')
(10, 'jun', 10, 'jun')
```

> 这里注意下, 当截取某一范围的数据时, 类似[2:3], [-3:-1], 实际的取值范围是含左不含右, 等同于数学中的半开半闭区间(左闭右开)--[2, 3)

```objc
# 因元组的元素是只读的, 不能二次赋值, 所以请注意, 以下写法是错误的
# 运行会报错: TypeError: 'tuple' object does not support item assignment
tuple2[0] = 20
tuple2[1] = "titan"
```

### 字典
- 字典(`dictionary`)是除列表以外`python`之中最灵活的内置数据结构类型。
- 列表是有序的对象集合，字典是无序的对象集合。
- 两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过索引存取。
- 字典用"{ }"标识。字典由索引(key)和它对应的值value组成
- 这里的字典的key值, 不仅仅可以用字符串, 还可以用`Number`类型


```objc
# 字典
dict1 = {'name': 'jun', 'age': 18, 'score': 90.98}
dict2 = {'name': 'titan'}

# 完整字典
print(dict2)

# 1.修改或添加字典元素
dict2['name'] = 'brother'
dict2['age'] = 20
dict2[3] = '完美'
dict2[0.9] = 0.9
print(dict2)

# 2.根据键值获取value
print(dict1['score'])

# 3.获取所有的键值
print(dict1.keys())

# 4.获取所有的value值
print(dict1.values())

# 5.删除字典元素
del dict1['name']
print(dict1)

# 6.清空字典所有条目
dict1.clear()
print(dict1)

# 7.删除字典
dict3 = {2: 3}
del dict3
# 当该数组呗删除之后, 在调用会报错
# print(dict3)
```

上述语句的输出结果如下

```objc
{'name': 'titan'}
{'name': 'brother', 'age': 20, 3: '完美', 0.9: 0.9}
90.98
dict_keys(['name', 'age', 'score'])
dict_values(['jun', 18, 90.98])
{'age': 18, 'score': 90.98}
{}
```

### 集合
- 集合对象是由一组无序排列的值组成的序列，集合成员可以做字典中的键
- 集合`sets`有两种不同的类型：可变集合`set`和不可变集合`frozenset`

```objc
# 集合
s = {1, 2, 3, 4}

# 1. 输出
print(s)

# 2. 用set转化已存在的类型, 可以去重
# 集合不会存在相同的元素
myList = [1, 2, 3, 3, 4, 4, 4]
mySet = set(myList)
print(mySet)

# 3. 添加元素(已经存在的元素, 无法添加)
mySet.add(2)
print(mySet)
mySet.add(6)
print(mySet)

# 4.删除元素
mySet.remove(2)
print(mySet)

# 5.方法difference
set1 = {1, 2, 4}
set2 = {1, 2, 5, 6}
# 用set1和set2做difference
diff = set1.difference(set2)
print(diff)
# 输出: {4}

# 用set2和set1做difference
diff2 = set2.difference(set1)
print(diff2)
# 输出: {5, 6}

# 6. 返回相同的元素
inter = set1.intersection(set2)
print(inter)
# 输出: {1, 2}

# 7.合并集合
union1 = set1.union(set2)
print(union1)
# 输出: {1, 2, 4, 5, 6}

```

### 数据类型转换
- 有时候，我们需要对数据内置的类型进行转换，数据类型的转换，你只需要将数据类型作为函数名即可。
- 以下几个内置的函数可以执行数据类型之间的转换。这些函数返回一个新的对象，表示转换的值


函数 | 描述
---|---
int(x) | 将x转换为一个整数
long(x) | 将x转换为一个长整数
float(x) | 将x转换到一个浮点数
complex(real [,imag]) | 创建一个复数
str(x) | 将对象 x 转换为字符串
repr(x) | 将对象 x 转换为表达式字符串
eval(str) | 用来计算在字符串中的有效Python表达式,并返回一个对象
tuple(s) | 将序列 s 转换为一个元组
list(s) | 将序列 s 转换为一个列表
set(s) | 转换为可变集合
dict(d) | 创建一个字典。d 必须是一个序列 (key,value)元组。
frozenset(s) | 转换为不可变集合
chr(x) | 将一个整数转换为一个字符
unichr(x) | 将一个整数转换为Unicode字符
ord(x) | 将一个字符转换为它的整数值
hex(x) | 将一个整数转换为一个十六进制字符串
oct(x) | 将一个整数转换为一个八进制字符串


使用示例如下

```objc
# 数据类型转换
dic = {'name': 'jun', 'age': 18}
# 1.将x转换为一个整数
print(int(9.89))
print(int('9'))
# print(int('8.89')) # 这样的写法会报错

# 2.创建一个复数
print(complex(1, 2))
print(complex('3'))
print(complex(-2, -4))

# 3.转换为一个浮点型
print(float(9))
print(float('12.45'))

# 4.转换为字符串
print(str(9))
print(str(9.09))
print(str('89'))
print(str(dic))

# 5.转换为表达式字符串
print(repr(9.09))
print(repr(9 + 10))
print(repr(dic))

# 6.用来计算在字符串中的有效Python表达式,并返回一个对象
print(eval('3*9'))
print(eval("dic['age']*2"))

# 7.将序列转换为一个元组
list7 = [1, 2, 3]
print(tuple(list7))

# 8.将序列转换为一个列表
tuple8 = ('a', 's', 'd')
print(list(tuple8))

# 9.转换为可变集合
print(set(list7))

# 10.创建一个字典
dic10 = dict([('name', 'titan'), ('age', 17)])
print(dic10)

# 11.转换为不可变集合
print(frozenset({1, 2}))

# 12.将一个整数转换为一个字符
# 48对应字符'0'(参照ASCII码表)
print(chr(122))

# 13.将一个字符转换为它的整数值
print(ord('0'))

# 14.将一个整数转换为一个十六进制字符串
print(hex(10))

# 15.将一个整数转换为一个八进制字符串
print(oct(10))

```

- 对于`Python`语言, 我也是小白, 正在努力学习中, 文中如有不足之处, 还望多多指教
- 测试代码详见 [GitHub地址](https://github.com/CoderTitan/PythonDemo)
- 后期会持续更新相关文章




