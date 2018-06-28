---
title: Python之高阶函数
date: 2018-06-28 16:45:12
tags: [Python, 高阶函数, map, reduce, filter]
categories: Python基础
---


- 做过`Swift`开发的童鞋都知道, 在`Swift`中有许多的高阶函数(`Map`, `Filter`, `Reduce`, `Zip`等), 这些在开发中让我们节省大量代码
- `Python`中同样有许多的内置函数, 但是这里也只介绍几个常用的高阶函数

<!-- more -->


### `map`映射
根据提供的函数对指定序列做映射, 并返回映射后的序列

```Python
map(function, iterable, ...)
```

#### 参数/返回值
- `function` -- 函数, 序列中的每个元素需要执行的操作, 可以是匿名函数
- `iterable` -- 一个或多个序列
- `Python 2.x`中返回列表, `Python 3.x`中返回`map`类


#### 使用示例

```Python
# 调用外部函数
def square(x):
    return x ** 2

res = map(square, [1, 2, 3, 4])
print(res)
print(list(res))

# 使用匿名函数
res1 = map(lambda x: x * 3, [1, 2, 3, 4])
print(list(res1))

# 使用内置函数
res2 = map(str, [2, 3, 4, 5])
print(list(res2))

# 多个序列
res3 = map(lambda x, y: x * y, [1, 2, 3, 4], [3, 2, 4, 1])
print(list(res3))

'''输出结果
<map object at 0x1041a5da0>
[1, 4, 9, 16]
[3, 6, 9, 12]
['2', '3', '4', '5']
[3, 4, 12, 4]
'''
```


### `reduce`
- 函数会对参数序列中元素进行累积
- 函数将集合中的所有数据进行下列操作：用传给`educe`中的函数`function`先对集合中的第1、2个元素进行操作，得到的结果再与第三个数据用`function`函数运算，最后得到一个结果
- 在`Python3`中，`reduce`函数已经被从全局名字空间里移除了，它现在被放置在`fucntools`模块里，如果想要使用它，则需要通过引入`functools`模块来调用`reduce`函数

```Python
reduce(function, iterable[, initializer])
```

#### 参数/返回值
- `function` -- 函数, 序列中的每个元素需要执行的操作, 可以是匿名函数
- `iterable` -- 需要执行操作的序列
- `initializer` -- 可选，初始参数
- 最后返回函数的计算结果, 和初始参数类型相同

#### 使用示例

```Python
# 求元素的和
def mySum(x, y):
    return x + y

list1 = [1, 2, 3, 4]
red = reduce(mySum, list1)
print(red)

red2 = reduce(mySum, list1, 2)
print(red2)

# 匿名函数
red3 = reduce(lambda x, y: x * y, list1)
print(red3)

red4 = reduce(lambda x, y: x * y, list1, 3)
print(red4)

red5 = reduce(lambda x, y: x + y, ['1', '2', '3', '4'], '数字: ')
print(red5)

'''输出结果:
10
12
24
72
数字: 1234
'''
```


### `filter`过滤
用于过滤序列，过滤掉不符合条件的元素，返回由符合条件元素组成的新列表

```Python
filter(function, iterable)
```

#### 参数/返回值

- `function` -- 过滤操作执行的函数
- `iterable` -- 需要过滤的序列
- 序列的每个元素作为参数传递给函数进行判，然后返回`True`或`False`，最后将返回`True`的元素放到新列表中
- `Python 2.x`中返回的是过滤后的列表, 而`Python 3.x`中返回到是一个`filter`类


#### 使用示例

```Python
def isOdd(x):
    if x % 2 == 1:
        return True
    return False

list2 = [1, 2, 3, 4, 5, 6]
fil0 = filter(isOdd, list2)
print(fil0)
print(list(fil0))

# 匿名函数
fil = filter(lambda x: x % 2 == 0, list2)
print(list(fil))

'''输出结果:
<filter object at 0x1039e20f0>
[1, 3, 5]
[2, 4, 6]
'''
```


### `sorted`排序
- 在列表中有一个内置的排序函数`sort()`, 对列表的对象进行排序, 没有返回值
- `sorted()`函数对所有可迭代的对象进行排序操作
- `sort`与`sorted`区别：
  - `sort`是应用在`list`上的方法，`sorted`可以对所有可迭代的对象进行排序操作。
  - `list`的`sort`方法返回的是对已经存在的列表进行操作，而内建函数`sorted`方法返回的是一个新的`list`，而不是在原来的基础上进行的操作


```Python
list.sort(cmp=None, key=None, reverse=False)
sorted(iterable[, cmp[, key[, reverse]]])
```

#### 参数/返回值
- `iterable` -- 可迭代对象
- `cmp` -- 比较的函数，这个具有两个参数，参数的值都是从可迭代对象中取出，此函数必须遵守的规则为，大于则返回1，小于则返回-1，等于则返回0。
- `key` -- 主要是用来进行比较的元素，只有一个参数，具体的函数的参数就是取自于可迭代对象中，指定可迭代对象中的一个元素来进行排序。
- `reverse` -- 排序规则，`reverse = True`降序，`reverse = False`升序(默认）
- `sort`没有返回值, `sorted`返回重新排序的列表

#### 使用示例
使用`sort()`排序

```Python
# 用sort
list3 = [3, 7, 2, 5, 0, 4]
list3.sort()
print(list3)

aList = ['123', 'Google', 'Runoob', 'Taobao', 'Facebook']
aList.sort(reverse=True) # 降序
print(aList)


def takeSecond(elem):
    return elem[1]

random = [(2, 2), (3, 4), (4, 1), (1, 3)]

# 指定第二个元素排序
random.sort(key=takeSecond)
print(random)

'''输出结果:
[0, 2, 3, 4, 5, 7]
['Taobao', 'Runoob', 'Google', 'Facebook', '123']
[(4, 1), (2, 2), (1, 3), (3, 4)]
'''
```

使用`sorted()`函数排序时

```Python
list4 = sorted(list3)
print(list4)

#按绝对值大小排序
list5 = [4,-7,2,6,-3]
#key接受函数来实现自定义排序规则
list6 = sorted(list5, key=abs)
print(list6)

# 将序排列
print(sorted(list5, key=abs, reverse=True))

#函数可以自己写
def myLen(str):
    return len(str)

list7 = ['b333','a1111111','c22','d5554']
list8 = sorted(list7, key=myLen) # 默认升序排序
print(list8)

# 匿名函数
list9 = sorted(list7, key=lambda x: len(x), reverse=True)
print(list9)

'''输出结果:
[0, 2, 3, 4, 5, 7]
[2, -3, 4, 6, -7]
[-7, 6, 4, -3, 2]
['c22', 'b333', 'd5554', 'a1111111']
['a1111111', 'd5554', 'b333', 'c22']
'''
```

### `enumerate`
- 用于将一个可遍历的数据对象(如列表、元组或字符串)组合为一个索引序列，同时列出数据和数据下标，一般用在`for`循环当中
- `Python 2.3`以上版本可用，`2.6`添加`start`参数

```Python
enumerate(sequence, [start=0])
```

#### 参数/返回值
- `sequence` -- 一个序列、迭代器或其他支持迭代对象
- `start` -- 下标起始位置
- 函数返回`enumerate`(枚举) 对象

#### 使用示例

```Python
seasons = ['Spring', 'Summer', 'Fall', 'Winter']
sea1 = enumerate(seasons)
print(sea1)
print(list(sea1))

# 自定义起始索引
sea2 = list(enumerate(seasons, start=1))
print(sea2)

# 普通的 for 循环
i = 0
for element in seasons:
     print(i, seasons[i])
     i +=1

# for 循环使用 enumerate
for i, ele in enumerate(seasons):
    print(i, ele)


'''输出结果:
<enumerate object at 0x103a46438>
[(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')]
[(1, 'Spring'), (2, 'Summer'), (3, 'Fall'), (4, 'Winter')]
0 Spring
1 Summer
2 Fall
3 Winter

0 Spring
1 Summer
2 Fall
3 Winter
'''
```

### `zip`
- 用于将可迭代的对象作为参数，将对象中对应的元素打包成一个个元组，然后返回由这些元组组成的对象，这样做的好处是节约了不少的内存
- 如果各个迭代器的元素个数不一致，则返回列表长度与最短的对象相同
- 函数有一个参数, 接受一个或多个序列
- 函数利用`*`号操作符，可以将元组解压为列表
- `zip`方法在`Python 2.x`中返回一个列表, 在`Python 3.x`中返回一个对象

```Python
zip([iterable, ...])
```

#### 使用示例

```Python
a = [1, 2, 3]
b = ['a', 'b', 'c']
c = [4, 5, 6, 7]

zip1 = zip(a, b)
print(zip1)
print(list(zip1))

# 两个列表不同元素个数, 元素个数与最短的列表一致
zip2 = zip(a, c)
print(list(zip2))

# `*`号操作符，可以将元组解压为列表
a1, c1 = zip(*zip(a, c))
print(a1)
print(c1)


'''输出结果:
<zip object at 0x103a41408>
[(1, 'a'), (2, 'b'), (3, 'c')]
[(1, 4), (2, 5), (3, 6)]
(1, 2, 3)
(4, 5, 6)
'''
```


### `reverse`
- `reverse()`函数用于将列表中的元素反向排列
- 该函数没有参数没有返回值
- 使用示例如下

```Python
list31 = [1, 2, 3, 4]
list31.reverse()
print(list31)

# 输出:
[4, 3, 2, 1]
```















