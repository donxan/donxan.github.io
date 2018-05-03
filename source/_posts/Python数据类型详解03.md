
---
title: Python数据类型详解03
date: 2018-04-19 15:14:12
tags: [Python, 数据类型, List, Tuple, Calendar]
categories: Python基础
---

- 第一篇[Python数据类型详解01](https://www.titanjun.top/2018/04/10/Python数据类型详解01/)中主要介绍了`Python`中的一些常用的数据类型的基础知识
- 第二篇[Python数据类型详解02](https://www.titanjun.top/2018/04/17/Python数据类型详解02/)文章中, 详细介绍了数字(`Number`)和字符串的一些函数和模块的使用
- 这篇文章主要介绍一些`Python`中的一序列(列表/元组/字典)

<!-- more -->

## 列表(List)
先回顾下上一篇[Python数据类型详解01](https://www.titanjun.top/2018/04/10/Python数据类型详解01/)文章中介绍的列表的基础知识

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

### 添加和删除列表元素
对列表的数据项进行修改或更新，你也可以使用append()方法来添加列表项

```objc
list1 = []          ## 空列表
list1.append('Google')   ## 使用 append() 添加元素
list1.append('Baidu')
print(list1)

//输出:
['Google', 'Baidu']
```

使用 `del` 语句来删除列表的元素

```objc
del list1[1]

//输出:
['Google']
```

### 列表脚本操作符
列表对 + 和 星号 的操作符与字符串相似。+ 号用于组合列表，星号 号用于重复列表

```objc
# 1. 脚本操作符
list1 = [1, 2, 3]
# 元素个数
print(len(list1))
# 重复
list2 = [2] * 3
print(list2)
# 是否包含某元素
if (3 in list1):
    print('3在列表内')
else:
    print('3不在列表内')
# 遍历列表
for x in list1 :
    print(x)
    
# 输出结果:
3
[2, 2, 2]
3在列表内
1
2
3
```

### 列表函数&方法
下面将会列出在列表中常用的函数和方法

函数表达式 | 输出结果 | 描述
--|--|--
`len(list1)` | 3 | 列表元素个数
`max([1, 2, 's'])` | s | 返回列表元素的最大值
`min([1, 2, 's'])` | 1 | 返回列表元素的最小值
`list(('q', 1)` | `['q', 1]` | 将元组转换为列表
`list1.append(2)` | [1, 2, 3, 2] | 在列表末尾添加新的对象
`list1.count(2)` | 2 | 统计某个元素在列表中出现的次数
`list1.index(3)` | 2 | 从列表中找出某个值第一个匹配项的索引位置
`list1.insert(1, 'jun')` | [1, 'jun', 2, 3, 2] | 将对象插入列表的指定位置
`list1.remove(3)` | [1, 'jun', 2, 2] | 移除列表中某个值的第一个匹配项
`list1.reverse()` | [2, 2, 'jun', 1] | 对列表的元素进行反向排列
`list1.sort()` | [2, 2, 'jun', 1] | 对原列表进行排序, 如果指定参数，则使用比较函数指定的比较函数


#### extend()方法
用于在列表末尾一次性追加另一个序列(元组和列表)中的多个值（用新列表扩展原来的列表）

```objc
list3 = [12, 'as', 45]
list4 = (23, 'ed')
list3.extend(list4)
print(list3)

//输出:
[12, 'as', 45, 23, 'ed']
```

#### pop()方法
用于移除列表中的一个元素（默认最后一个元素），并且返回该元素的值

```objc
list.pop(obj=list[-1])

//使用
list3 = [12, 'as', 45, 23, 'ed']
print(list3)
print(list3.pop())
print(list3)
print(list3.pop(2))
print(list3)

//输出:
ed
[12, 'as', 45, 23]
45
[12, 'as', 23]
```

## 元组
先回顾一下上篇文章介绍的元组的基础知识

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

### 元组运算符
与列表的运算符和操作类似, 如下:

```objc
# 计算元素个数
print(len((1, 2, 3)))
# 合并元组
tuple1 = (1, 2) + (4, 5)
print(tuple1)
# 重复
tuple2 = ('jun',) * 3
print(tuple2)
# 检测是否包含某元素
if (2 in tuple1):
    print('2在该元组内')
else:
    print('不在元组内')
# 遍历元组
for x in tuple1:
    print(x)

//输出:
3
(1, 2, 4, 5)
('jun', 'jun', 'jun')
2在该元组内
1
2
4
5
```

### 元组内置函数

```objc
tuple1 = (1, 2, 4, 5) 
# 元组中元素最大值
print(max(tuple1))
# 元组中元素最小值
print(min(tuple1))
# 列表转换为元组
print(tuple(['a', 'd', 'f']))

//输出:
5
1
('a', 'd', 'f')
```

## 字典
先看看上文中介绍到的字典的相关基础知识, 需要注意的是: 键必须不可变，所以可以用数字，字符串或元组充当，所以用列表就不行

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


### 内置函数

```objc
dic1 = {'name': 'titan', 'age':20}
# 计算字典元素个数，即键的总数
print(len(dic1))
# 字典(Dictionary) str() 函数将值转化为适于人阅读的形式，以可打印的字符串表示
print(str(dic1))
# 返回输入的变量类型，如果变量是字典就返回字典类型
print(type(dic1))

//输出:
2
{'name': 'titan', 'age': 20}
<class 'dict'>
```

### 内置方法

#### copy()方法
- `copy() `函数返回一个字典的浅复制
- 直接赋值和 `copy` 的区别

```objc
dict1 =  {'user':'runoob','num':[1,2,3]}
 
dict2 = dict1          # 浅拷贝: 引用对象
dict3 = dict1.copy()   # 浅拷贝：深拷贝父对象（一级目录），子对象（二级目录）不拷贝，还是引用
 
# 修改 data 数据
dict1['user']='root'
dict1['num'].remove(1)
 
# 输出
print(dict1)
print(dict2)
print(dict3)


# 输出结果
{'num': [2, 3], 'user': 'root'}
{'num': [2, 3], 'user': 'root'}
{'num': [2, 3], 'user': 'runoob'}
```

实例中 `dict2` 其实是 `dict1` 的引用（别名），所以输出结果都是一致的，`dict3` 父对象进行了深拷贝，不会随`dict1` 修改而修改，子对象是浅拷贝所以随 `dict1` 的修改而修改

#### fromkeys()方法
- `fromkeys()` 函数用于创建一个新字典，
- 参数一: 以序列`seq`中元素做字典的键
- 参数二: `value`为字典所有键对应的初始值(可选参数)

```objc
dict.fromkeys(seq[, value])

# 使用
dic2 = dict.fromkeys(['name', 'titan'])
print(dic2)
dic3 = dict.fromkeys(['name', 'titan'], 20)
print(dic3)

# 输出:
{'name': None, 'titan': None}
{'name': 20, 'titan': 20}
```

#### get() 和 setdefault()方法
- `get()` 函数返回指定键的值，如果值不在字典中返回默认值
- `setdefault()`和`get()` 方法类似, 如果键不存在于字典中，将会添加键并将值设为默认值(同事也会把键值对添加到字典中)
- 参数一: 字典中要查找的键。
- 参数二: 如果指定键的值不存在时，返回该默认值值(可选参数)

```objc
dict.get(key, default=None)

# 使用
dic5 = {'name': 'titan', 'age':20}
print(dic5.get('name'))
print(dic5.get('Sex', 'man'))
print(dic5.setdefault('name'))
print(dic5.setdefault('Sex', 'man'))
print(dic5)

# 输出结果:
titan
man
titan
man
{'name': 'titan', 'age': 20, 'Sex': 'man'}
```

#### update()方法
把字典的键/值对更新到另一个字典里(合并字典)

```objc
dict.update(dict2)

# 使用
dic6 = {'sex': 'new'}
dic5.update(dic6)
print(dic5)

# 输出:
{'name': 'titan', 'age': 20, 'Sex': 'man', 'sex': 'new'}
```

#### pop() 和 popitem() 方法
 - `pop()`: 删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。 否则，返回default值
 - `popitem()`: 随机返回并删除字典中的一对键和值。
如果字典已经为空，却调用了此方法，就报出KeyError异常

```objc
pop(key[,default])
popitem()

# 使用
print(dic5.pop('Sex'))
print(dic5)
print(dic5.popitem())
print(dic5)


# 输出:
man
{'name': 'titan', 'age': 20, 'sex': 'new'}
('sex', 'new')
{'name': 'titan', 'age': 20}
```

#### 其他方法

```objc
dic2 = {'name': 'titan', 'age':20}
# 判断键是否存在于字典中, 在True, 不在False
print(dic2.__contains__('name'))

# 以列表返回可遍历的(键, 值) 元组数组
print(dic2.items())

# 删除字典内所有元素
dic2.clear()
print(dic2)


# 输出结果:
True
dict_items([('name', 'titan'), ('age', 20)])
{}
```

## 日期和时间
- `Python` 提供了一个 `time` 和 `calendar` 
- 模块可以用于格式化日期和时间。
- 时间间隔是以秒为单位的浮点小数。
- 每个时间戳都以自从1970年1月1日午夜（历元）经过了多长时间来表示
- 在介绍时间之前, 先介绍一下什么时间元组

属性 | 描述 | 取值
--|--|--
tm_year | 4位数年 |	2018
tm_mon | 月 | 1 到 12
tm_mday | 日 | 1到31
tm_hour | 小时 |	0 到 23
tm_min	| 分钟 | 0 到 59
tm_sec	| 秒 | 0 到 61 (60或61 是闰秒)
tm_wday	| 礼拜几 | 0到6 (0是周一)
tm_yday	| 一年的第几日 | 1 到 366(儒略历)
tm_isdst | 夏令时 |	-1, 0, 1, -1是决定是否为夏令时的旗帜

获取时间的简单示例

```objc
# 日期和时间
import time

# 当前时间戳
ticks = time.time()
print(ticks)
# 本地时间
localTime = time.localtime()
print(localTime)
# 格式化时间
print(time.asctime(localTime))

# 输出结果:
1524051644.320941
time.struct_time(tm_year=2018, tm_mon=4, tm_mday=18, tm_hour=19, tm_min=40, tm_sec=44, tm_wday=2, tm_yday=108, tm_isdst=0)
Wed Apr 18 19:40:44 2018
```

### 格式化日期
先看几个简单示例

```objc
# 1.格式化日期
# 格式化成 2018-04-18 19:49:44 形式
newDate1 = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
print(newDate1)
# 格式化成 Wed Apr 18 19:50:53 2018 形式
newDate2 = time.strftime('%a %b %d %H:%M:%S %Y', time.localtime())
print(newDate2)
# 将时间字符串转化为时间戳
timeNum = time.mktime(time.strptime(newDate2, "%a %b %d %H:%M:%S %Y"))
print(timeNum)

# 输出结果:
2018-04-18 19:52:21
Wed Apr 18 19:52:21 2018
1524052341.0
```

- 这里介绍下上面用到的相关`Python`中时间和日期相关的格式化符号
  - `%y`: 两位数的年份表示（00-99）
  - `%Y`: 四位数的年份表示（000-9999）
  - `%m`: 月份（01-12）
  - `%d`: 月内中的一天（0-31）
  - `%H`: 24小时制小时数（0-23）
  - `%I`: 12小时制小时数（01-12）
  - `%M`: 分钟数（00=59）
  - `%S`: 秒（00-59）
  - `%a`: 本地简化星期名称
  - `%A`: 本地完整星期名称
  - `%b`: 本地简化的月份名称
  - `%B`: 本地完整的月份名称
  - `%c`: 本地相应的日期表示和时间表示
  - `%j`: 年内的一天（001-366）
  - `%p`: 本地A.M.或P.M.的等价符
  - `%U`: 一年中的星期数（00-53）星期天为星期的开始
  - `%w`: 星期（0-6），星期天为星期的开始
  - `%W`: 一年中的星期数（00-53）星期一为星期的开始
  - `%x`: 本地相应的日期表示
  - `%X`: 本地相应的时间表示
  - `%Z`: 当前时区的名称
  - `%%`: %号本身


### Time 模块
`Time` 模块包含了以下内置函数，既有时间处理相的，也有转换时间格式的

#### Time模块的属性
- `timezone`: 当地时区（未启动夏令时）距离格林威治的偏移秒数（>0，美洲;<=0大部分欧洲，亚洲，非洲）
- `tzname`: 包含一对根据情况的不同而不同的字符串，分别是带夏令时的本地时区名称，和不带的

```objc
print(time.timezone)
print(time.tzname)

# 输出结果
-28800
('CST', 'CST')
```


#### altzone()方法
返回格林威治西部的夏令时地区的偏移秒数。如果该地区在格林威治东部会返回负值（如西欧，包括英国）。对夏令时启用地区才能使用

```objc
print(time.altzone)

# 输出结果:
-28800
```

#### asctime()方法
接受时间元组并返回一个可读的形式为`"Tue Dec 11 18:07:14 2008"`（2008年12月11日 周二18时07分14秒）的24个字符的字符串

```objc
localTime = time.localtime()
print(localTime)
# 格式化时间
print(time.asctime(localTime))

# 输出结果:
time.struct_time(tm_year=2018, tm_mon=4, tm_mday=18, tm_hour=19, tm_min=40, tm_sec=44, tm_wday=2, tm_yday=108, tm_isdst=0)
Wed Apr 18 19:40:44 2018
```

#### ctime() 和 gmtime() 和 localtime()方法
- `ctime`: 把一个时间戳（按秒计算的浮点数）转化为`time.asctime()`的形式。
- `gmtime`: 将一个时间戳转换为UTC时区（0时区）的`struct_time`（`struct_time是在time`模块中定义的表示时间的对象）
- `localtime`: 类似`gmtime`，作用是格式化时间戳为本地的时间
- 如果参数未给或者为None的时候，将会默认`time.time()`为参数

```objc
time.ctime([ sec ])
time.gmtime([ sec ])
time.localtime([ sec ])

# 使用
print(time.ctime())
print(time.ctime(time.time() - 100))
print(time.gmtime())
print(time.gmtime(time.time() - 100))
print(time.localtime())
print(time.localtime(time.time() - 100))


# 输出结果:
Wed Apr 18 20:18:19 2018
Wed Apr 18 20:16:39 2018
time.struct_time(tm_year=2018, tm_mon=4, tm_mday=18, tm_hour=12, tm_min=25, tm_sec=44, tm_wday=2, tm_yday=108, tm_isdst=0)
time.struct_time(tm_year=2018, tm_mon=4, tm_mday=18, tm_hour=12, tm_min=24, tm_sec=4, tm_wday=2, tm_yday=108, tm_isdst=0)
time.struct_time(tm_year=2018, tm_mon=4, tm_mday=19, tm_hour=9, tm_min=45, tm_sec=19, tm_wday=3, tm_yday=109, tm_isdst=0)
time.struct_time(tm_year=2018, tm_mon=4, tm_mday=19, tm_hour=9, tm_min=43, tm_sec=39, tm_wday=3, tm_yday=109, tm_isdst=0)
```

#### gmtime()方法
- 接收`struct_time`对象作为参数，返回用秒数来表示时间的浮点数
- 如果输入的值不是一个合法的时间，将触发 `OverflowError` 或 `ValueError`
- 参数: 结构化的时间或者完整的9位元组元素

```objc
time.mktime(t)

# 使用
t = (2018, 4, 19, 10, 10, 20, 2, 34, 0)
print(time.mktime(t))
print(time.mktime(time.localtime()))

# 输出结果:
1524103820.0
1524104835.0
```

#### sleep()方法
推迟调用线程，可通过参数`secs`指秒数，表示进程推迟的时间

```objc
time.sleep(t)

# 使用
print(time.ctime())
time.sleep(3)
print(time.ctime())

# 输出结果:
Thu Apr 19 10:29:51 2018
Thu Apr 19 10:29:54 2018
```

#### strftime()方法
- 接收以时间元组，并返回以可读字符串表示的当地时间，格式由参数`format`决定, 上面已经简单介绍过了
- 参数`format` -- 格式字符串
- 参数`t` -- 可选的参数t是一个`struct_time`对象

```objc
time.strftime(format[, t])

# 使用
newDate1 = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
print(newDate1)

# 输出结果:
2018-04-19 10:35:22
```

#### strptime()方法
- 函数根据指定的格式把一个时间字符串解析为时间元组
- 参数一: 时间字符串
- 参数二: 格式化字符串

```objc
time.strptime(string[, format])

# 使用
structTime= time.strptime('20 Nov 2018', '%d %b %Y')
print(structTime)

# 输出结果:
time.struct_time(tm_year=2018, tm_mon=11, tm_mday=20, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=1, tm_yday=324, tm_isdst=-1)
```

#### tzset()方法
根据环境变量TZ重新初始化时间相关设置, 标准TZ环境变量格式：

```objc
std offset [dst [offset [,start[/time], end[/time]]]]
```

- `std` 和 `dst`: 三个或者多个时间的缩写字母。传递给 `time.tzname`.
- `offset`: 距`UTC`的偏移，格式： `[+|-]hh[:mm[:ss]] {h=0-23, m/s=0-59}`。
- `start[/time]`, `end[/time]`: `DST` 开始生效时的日期。格式为 `m.w.d` — 代表日期的月份、周数和日期。`w=1` 指月份中的第一周，而 `w=5` 指月份的最后一周。`start` 和 `end` 可以是以下格式之一：
  - `Jn`: 儒略日 `n (1 <= n <= 365)`。闰年日（2月29）不计算在内。
  - `n`: 儒略日 `(0 <= n <= 365)`。 闰年日（2月29）计算在内
  - `Mm.n.d`: 日期的月份、周数和日期。`w=1` 指月份中的第一周，而 `w=5` 指月份的最后一周。
  - `time`:（可选）`DST` 开始生效时的时间（24 小时制）。默认值为 02:00（指定时区的本地时间）

```objc
# 没有返回值
time.tzset()

# 使用
import time
import os

os.environ['TZ'] = 'EST+05EDT,M4.1.0,M10.5.0'
time.tzset()
print time.strftime('%X %x %Z')

os.environ['TZ'] = 'AEST-10AEDT-11,M10.5.0,M3.5.0'
time.tzset()
print time.strftime('%X %x %Z')

# 输出结果为：
13:00:40 02/17/09 EST
05:00:40 02/18/09 AEDT
```

### 日历（Calendar）模块
- 此模块的函数都是日历相关的，例如打印某月的字符月历。
- 星期一是默认的每周第一天，星期天是默认的最后一天。
- 介绍一下`Calendar`模块的相关函数

```objc
# 返回当前每周起始日期的设置, 默认情况下，首次载入caendar模块时返回0，即星期一
print(calendar.firstweekday())

# 是闰年返回True，否则为false
# calendar.isleap(year)
print(calendar.isleap(2016))

# 返回在Y1，Y2两年之间的闰年总数
# calendar.leapdays(y1,y2)
print(calendar.leapdays(2015, 2021))

# 返回一个元组, 第一个元素是该月的第一天是星期几(0-6, 0是星期日), 第二个元素是该月有几天
# calendar.monthcalendar(year,month)
print(calendar.monthrange(2018, 4))

# 返回给定日期是星期几(0-6, 0是星期一)
# calendar.weekday(year,month,day)
print(calendar.weekday(2018, 4, 19))

# 设置每周的起始日期
# calendar.setfirstweekday(weekday) 无返回值
calendar.setfirstweekday(3)
print(calendar.firstweekday())


# 输出结果:
0
True
2
(6, 30)
3
3
```

#### `calendar` 和 `prcal`方法
返回一个多行字符串格式的year年年历，3个月一行，间隔距离为`c`。 每日宽度间隔为`w`字符。每行长度为`21* W+18+2* C`。`l`是每星期行数

```objc
calendar.calendar(year,w=2,l=1,c=6)
calendar.prcal(year,w=2,l=1,c=6)

//使用
year18 = calendar.calendar(2018)
print(year18)

print(calendar.prcal(2018))
```

#### `month` 和 `prmonth`方法
返回一个多行字符串格式的`year`年`month`月日历，两行标题，一周一行。每日宽度间隔为`w`字符。每行的长度为`7* w+6`。`l`是每星期的行数

```objc
calendar.month(year,month,w=2,l=1)
calendar.prmonth(year,month,w=2,l=1)

//使用
monthTime = calendar.month(2018, 4)
print(monthTime)

print(calendar.prmonth(2018, 4))
```

#### `timegm`方法
和`time.gmtime`相反：接受一个时间元组形式，返回该时刻的时间戳（1970纪元后经过的浮点秒数）

```objc
calendar.timegm(tupletime)

# 使用
print(calendar.timegm(time.localtime()))

# 输出结果
1524150128
```


---

- 到这里, `Python`相关的数据类型(数字, 字符串, 元组, 列表和字典)基本都介绍完毕了
- `Python`中的常用的时间格式和时间相关的模块(`time`和`calendar`)也都介绍完了
- 文章中有些地方可能也不是很全面, 会继续努力
- 另外, 在`Python`中，其他处理日期和时间的模块还有：[datetime模块](https://docs.python.org/3/library/datetime.html#module-datetime) 和 [dateutil模块](http://labix.org/python-dateutil)
- 这两个模块这里也不再详细介绍了, `Python`相关文章后期会持续更新......