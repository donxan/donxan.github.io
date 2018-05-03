
---
title: Python的面向对象和正则表达式
date: 2018-05-03 21:56:12
tags: [Python, 面向对象, 正则表达式]
categories: Python基础
---

- 之前的几篇文章主要介绍了`Python`中的一些数据类型和主要函数用法, 可参考[Python相关文章](https://www.titanjun.top/categories/Python%E5%9F%BA%E7%A1%80/), 这篇文章主要介绍面向对象和正则表达式
- `Python`和`Objective-C`一样是一门面向对象的的开发语言, 对于做过iOS开发的童鞋, 肯定对OC也是相当熟悉了, 这里也不做过多介绍了

<!--more-->

## 创建类
使用 `class` 语句来创建一个新类，`class` 之后为类的名称并以冒号结尾:

```objc
class ClassName:
   '类的帮助信息'   #类文档字符串
   class_suite  #类体
```

下面是一个具体的`Python` 类的示例:

```objc
class Person:
    '人类的基类'

    empCount = 0

    def __init__(self, name, sex):
        self.name = name
        self.sex = sex
        Person.empCount += 1

    def displayCount(self):
        print("被调用次数: %d" % Person.empCount)


    def displayPerson(self):
        print("姓名:", self.name, ',', "性别:", self.sex)
```

- 上述示例中:
  - `empCount` 变量是一个类变量，它的值将在这个类的所有实例之间共享, 可以在内部类或外部类使用 `Person.empCount` 访问
  - `__init__()`: 类的构造函数或初始化方法，当创建了这个类的实例时就会调用该方法(和OC中相同)
  - `displayCount`和`displayPerson`: 类的实例方法, 可通过初始化后的对象访问
  - `self`: 代表类的实例, 而不是类本身


### 创建实例对象
- 在实例化类的方式中, 每一种语言都有不同的初始化方式, 在OC中用`[[Person alloc] init]`, 在`Swift`中用`Person()`, 在`Java`和`JavaScript`中则是使用关键字`new`
- 但是在 `Python` 中并没有类似关键字, 其初始化方式和`Swift`的方式类似

```objc
# 1.创建第一个对象
person1 = Person("titan", 'man')
# 2.创建第二个对象
person2 = Person('jun', 'woman')
```

### 属性访问
在`Python`中属性和实例方法的访问都是通过点语法的形式, 如下:

```objc
# 1.创建第一个对象
person1 = Person("titan", 'man')
person1.displayPerson()

# 2.创建第二个对象
person2 = Person('jun', 'woman')
person2.displayPerson()
person2.displayCount()
print(Person.empCount)


# 输出结果:
姓名: titan , 性别: man
姓名: jun , 性别: woman
被调用次数: 2
2
```

### 相关函数
关于属性操作的相关函数, 添加/修改/删除类的属性

```obj
# 3.增加类的属性
person1.age = 19
print(person1.age)

# 4.修改属性值
person1.age = 20
print(person1.age)

# 5.删除属性
del person1.age
# 此处条用age属性会报错
# print(person1.age)
```

这里在介绍一些相关函数操作

```objc
# 6.常用函数
# 6.1.检查是否存在一个属性
print(hasattr(person1, 'age')) #False
print(hasattr(person1, 'name')) #True

# 6.2.访问对象的属性
print(getattr(person1, 'name'))  #titan

# 6.3.设置一个属性(如果属性不存在，会创建一个新属性)
setattr(person2, 'age', 17)
print(person2.age) #17

# 6.4.删除属性
delattr(person2, 'age')
```

### 内置类属性
- `__name__`: 类名
- `__doc__` : 类的文档字符串
- `__dict__` : 类的属性（包含一个字典，由类的数据属性组成）
- `__module__`: 类定义所在的模块（类的全名是`__main__.className`，如果类位于一个导入模块`mymod`中，那么`className.- __module__ `等于 `mymod`）
- `__bases__ `: 类的所有父类构成元素（包含了一个由所有父类组成的元组）

```objc
# Python内置类属性
# 1.类的文档字符串
print(Person.__doc__)
# 输出结果: 人类的基类

# 2.类的所有父类构成元素
print(Person.__bases__)
# 输出结果: (<class 'object'>,)

# 3.类名
print(Person.__name__)
# 输出结果: Person

# 4. 类定义所在的模块
print(Person.__module__)
# 输出结果: __main__

# 2.类的属性(字典)
print(Person.__dict__)

'''输出结果
{
'__module__': '__main__', 
'__doc__': '人类的基类', 
'empCount': 2, 
'__init__': <function Person.__init__ at 0x1041a7510>, 
'displayCount': <function Person.displayCount at 0x1041a76a8>, 
'displayPerson': <function Person.displayPerson at 0x1041a7730>, 
'__dict__': <attribute '__dict__' of 'Person' objects>, 
'__weakref__': <attribute '__weakref__' of 'Person' objects>
}
'''
```

### 私有属性和方法
- `__private_attrs`：两个下划线开头，声明该属性为私有，不能在类的外部被使用或直接访问。在类内部的方法中使用时 `self.__private_attrs`
- 在类的内部，使用 `def` 关键字可以为类定义一个方法，与一般函数定义不同，类方法必须包含参数`self`, 且为第一个参数
- `__private_method`：两个下划线开头，声明该方法为私有方法，不能在类地外部调用。在类的内部调用 `self.__private_methods`

```objc

```

### 下划线说明
- `__foo__`: 定义的是特殊方法，一般是系统定义名字 ，类似 `__init__()` 之类的。
- `_foo`: 以单下划线开头的表示的是 `protected` 类型的变量，即保护类型只能允许其本身与子类进行访问，不能用于 `from module import *`
- `__foo`: 双下划线的表示的是私有类型(`private`)的变量, 只能是允许这个类本身进行访问了。


## Python 正则表达式
- 正则表达式是一个特殊的字符序列，它能帮助你方便的检查一个字符串是否与某种模式匹配。
- `Python` 自1.5版本起增加了 `re` 模块，它提供 `Perl` 风格的正则表达式模式
- `re` 模块使 `Python` 语言拥有全部的正则表达式功能
- `compile` 函数根据一个模式字符串和可选的标志参数生成一个正则表达式对象, 该对象拥有一系列方法用于正则表达式匹配和替换
- `re` 模块也提供了与这些方法功能完全一致的函数，这些函数使用一个模式字符串做为它们的第一个参数

### `re.match` 和 `re.search`函数
- `re.match`: 尝试从字符串的起始位置匹配一个模式，匹配成功`re.match`方法返回一个匹配的对象，否则`match()`就返回`none`
- `re.search`: 扫描整个字符串并返回第一个成功的匹配, 匹配成功`re.search`方法返回一个匹配的对象，否则返回`None`

#### 函数语法：

```objc
re.match(pattern, string, flags=0)
re.search(pattern, string, flags=0)
```

#### 函数参数
- `pattern`: 匹配的正则表达式
- `string`: 要匹配的字符串
- `flags`: 标志位，用于控制正则表达式的匹配方式，如：是否区分大小写，多行匹配等等
- 正则表达式修饰符-可选标志, 部分介绍如下, 详细介绍可参见文章最后附录部分
  - `re.I` 忽略大小写
  - `re.L` 表示特殊字符集 `\w, \W, \b, \B, \s, \S` 依赖于当前环境
  - `re.M` 多行模式
  - `re.S` 即为 . 并且包括换行符在内的任意字符（. 不包括换行符）
  - `re.U` 表示特殊字符集 `\w, \W, \b, \B, \d, \D, \s, \S` 依赖于 `Unicode` 字符属性数据库
  - `re.X` 为了增加可读性，忽略空格和`#`后面的注释

#### 匹配对象的相关方法
- `group(num=0)`: 匹配的整个表达式的字符串，group() 可以一次输入多个组号，在这种情况下它将返回一个包含那些组所对应值的元组
- `groups()`: 返回一个包含所有小组字符串的元组，从 1 到 所含的小组号

```objc
# 正则表达式
# 1. re.match函数
match = re.match('https', 'https :// www .titanjun .top')
print(match)
print(match.group())
print(match.groups())
print(match.span())

match2 = re.match('www', 'https://www.titanjun.top')
print(match2)
# print(match2.group())

print('-------华丽分割线--------')


# 2. re.search
str = 'https :// www .titanjun .top'
search1 = re.search(r'www', str, re.M | re.I)
print(search1)
print(search1.span())
print(search1.group())
print(search1.groups())

# 输出结果:
<_sre.SRE_Match object; span=(0, 5), match='https'>
https
()
(0, 5)
None
-------华丽分割线--------
<_sre.SRE_Match object; span=(10, 13), match='www'>
(10, 13)
www
()
```

### `re.sub`方法
用于替换字符串中的匹配项

#### 函数语法：

```objc
re.sub(pattern, repl, string, count=0, flags=0)
```

#### 函数参数
- `pattern`: 正则中的模式字符串。
- `repl`: 替换的字符串，也可为一个函数。
- `string`: 要被查找替换的原始字符串。
- `count`: 模式匹配后替换的最大次数，默认 0 表示替换所有的匹配

```objc
# 3. sub替换函数
subStr = '2018-05-03 # 文章的写作日期'
# 删除注释
subStr2 = re.sub('#.*$', '', subStr)
print(subStr2)

# 时间上替换-
# \D: 代表任意非数字
subStr3 = re.sub('\D', '.', subStr2)
print(subStr3)
print(re.sub('\D', '.', subStr2, 2))


# 输出结果:
2018-05-03 
2018.05.03.
2018.05.03
```

### `re.compile` 函数
用于编译正则表达式，生成一个正则表达式`Pattern`对象，供 `match()` 和 `search()` 这两个函数使用

#### 函数语法

```objc
re.compile(pattern[, flags])
```

#### 函数参数
- `pattern`: 一个字符串形式的正则表达式
- `flags`: 可选，表示匹配模式，比如忽略大小写，多行模式等

```objc
# 4. compile 函数
pattern = re.compile(r'\d+')  # 用于匹配至少一个数字
print(pattern.match('titan0929'))
print(pattern.match('titan0929', 5, 7)) # 从第5个字符开始匹配
m = pattern.match('0929titan')
print(m.group())
print(m.start())
print(m.end())
print(m.span())


# 输出结果:
None
<_sre.SRE_Match object; span=(5, 7), match='09'>
0929
0
4
(0, 4)
```

- 当匹配成功时返回一个 Match 对象，其中：
  - `group([group1, …])`: 方法用于获得一个或多个分组匹配的字符串，当要获得整个匹配的子串时，可直接使用 `group()` 或 `group(0)`
  - `start([group])`:  方法用于获取分组匹配的子串在整个字符串中的起始位置（子串第一个字符的索引），参数默认值为 0；
  - `end([group])` 方法用于获取分组匹配的子串在整个字符串中的结束位置（子串最后一个字符的索引+1），参数默认值为 0；
  - `span([group])`: 方法返回所匹配成功的范围,  `(start(group), end(group))`


### `findall`函数
在字符串中找到正则表达式所匹配的所有子串，并返回一个列表，如果没有找到匹配的，则返回空列表

#### 函数语法

```objc
findall(string[, pos[, endpos]])
```

#### 函数参数
- `string`: 待匹配的字符串。
- `pos`: 可选参数，指定字符串的起始位置，默认为 0。
- `endpos`: 可选参数，指定字符串的结束位置，默认为字符串的长度

```objc
# 5. findall
pattern2 = re.compile(r'\d+')  # 用于匹配至少一个数字
fin1 = pattern2.findall('titanjun09-www123titan29')
fin2 = pattern2.findall('titan123jun45www90', 6, 16)
print(fin1)
print(fin2)

# 输出结果:
['09', '123', '29']
['23', '45']
```


### `split`函数
按照能够匹配的子串将字符串分割后返回列表

#### 函数语法

```objc
re.split(pattern, string[, maxsplit=0, flags=0])
```

#### 函数参数
- `pattern`: 匹配的正则表达式
- `string`: 要匹配的字符串
- `maxsplit`: 分隔次数，maxsplit=1 分隔一次，默认为 0，不限制次数
- `flags`: 标志位，用于控制正则表达式的匹配方式，如：是否区分大小写，多行匹配等等

```objc
# 6. split
split1 = re.split('\W+', 'https://www.titanjun.top')
print(split1)
split2 = re.split('\W+', 'https://www.titanjun.top', 1)
print(split2)

# 输出结果:
['https', 'www', 'titanjun', 'top']
['https', 'www.titanjun.top']
```


---

## 附录

### 正则表达式修饰符 - 可选标志
正则表达式可以包含一些可选标志修饰符来控制匹配的模式。修饰符被指定为一个可选的标志。多个标志可以通过按位 `OR(|)` 它们来指定

修饰符	| 描述
---|---
`re.I`	| 	使匹配对大小写不敏感
`re.L`	| 	做本地化识别（`locale-aware`）匹配
`re.M`	| 	多行匹配，影响 `^`和 `$`
`re.S`	| 	使 . 匹配包括换行在内的所有字符
`re.U`	| 	根据`Unicode`字符集解析字符。这个标志影响 `\w, \W, \b, \B.`
`re.X`	| 	该标志通过给予你更灵活的格式以便你将正则表达式写得更易于理解。


### 正则表达式模式
- 模式字符串使用特殊的语法来表示一个正则表达式：
  - 字母和数字表示他们自身
  - 标点符号只有被转义时才匹配自身，否则它们表示特殊的含义
  - 反斜杠本身需要使用反斜杠转义
  - 由于正则表达式通常都包含反斜杠，所以最好使用原始字符串来表示, 模式元素(如 `r'\t'`，等价于 `'\\t'`)匹配相应的特殊字符
- 下表列出了正则表达式模式语法中的特殊元素, 如果你使用模式的同时提供了可选的标志参数，某些模式元素的含义会改变

模式 | 描述
---|---
`^` | 	匹配字符串的开头
`.` | 	匹配任意字符，除了换行符，当re.DOTALL标记被指定时，则可以匹配包括换行符的任意字符。
`[...]` | 	用来表示一组字符,单独列出：`[amk]` 匹配 `'a'`，`'m'`或`'k'`
`[^...]` | 	不在`[]`中的字符：`[^abc]` 匹配除了`a,b,c`之外的字符。
`re*` | 	匹配0个或多个的表达式。
`re+`| 		匹配1个或多个的表达式。
`re?` | 	匹配0个或1个由前面的正则表达式定义的片段
`re{ n}` | 	精确匹配 n 个前面表达式。例如， `o{2}` 不能匹配 `"Bob"` 中的 `"o"`，但是能匹配 `"food"` 中的两个 `o`
`re{ n,}` | 匹配 n 个前面表达式。例如， `o{2,}` 不能匹配`"Bob"`中的`"o"`，但能匹配 `"foooood"`中的所有 `o`,`"o{1,}"` 等价于 `"o+"`。`"o{0,}"` 则等价于` "o*"`。
`re{ n, m}` | 	匹配 n 到 m 次由前面的正则表达式定义的片段
`(re)` | 		匹配括号内的表达式，也表示一个组
`(?imx)` | 		正则表达式包含三种可选标志：i, m, 或 x 。只影响括号中的区域。
`(?-imx)` | 		正则表达式关闭 i, m, 或 x 可选标志。只影响括号中的区域。
`(?: re)` | 	类似 `(...)`, 但是不表示一个组
`(?imx: re)` | 	在括号中使用i, m, 或 x 可选标志
`(?-imx: re)` | 在括号中不使用i, m, 或 x 可选标志
`(?#...)` | 	注释.
`(?= re)` | 	前向肯定界定符。如果所含正则表达式，以 ... 表示，在当前位置成功匹配时成功，否则失败。但一旦所含表达式已经尝试，匹配引擎根本没有提高；模式的剩余部分还要尝试界定符的右边。
`(?! re)` | 	前向否定界定符。与肯定界定符相反；当所含表达式不能在字符串当前位置匹配时成功
`(?> re)` | 	匹配的独立模式，省去回溯。
`\w` | 	匹配字母数字及下划线
`\W` | 	匹配非字母数字及下划线
`\s` | 	匹配任意空白字符，等价于 `[\t\n\r\f]`
`\S` | 	匹配任意非空字符
`\d` | 	匹配任意数字，等价于 `[0-9]`
`\D` | 	匹配任意非数字
`\A` | 	匹配字符串开始
`\Z` | 	匹配字符串结束，如果是存在换行，只匹配到换行前的结束字符串。
`\z` | 	匹配字符串结束
`\G` | 	匹配最后匹配完成的位置。
`\b` | 	匹配一个单词边界，也就是指单词和空格间的位置。例如， `'er\b'` 可以匹配`"never"` 中的 'er'，但不能匹配 "verb" 中的 'er'。
`\B` | 	匹配非单词边界。`'er\B'` 能匹配 `"verb"` 中的 `'er'`，但不能匹配 `"never"` 中的 `'er'`。
`\n, \t` 等 | 	匹配一个换行符。匹配一个制表符。等
`\1...\9` | 	匹配第n个分组的内容。
`\10` | 	匹配第n个分组的内容，如果它经匹配。否则指的是八进制字符码的表达式。


### 正则表达式实例

#### 字符类

实例 |	描述
--|--
`[Pp]ython` |		匹配 `"Python"` 或 `"python"`
`rub[ye]` |		匹配 `"ruby"` 或 `"rube"`
`[aeiou]` |		匹配中括号内的任意一个字母
`[0-9]` |		匹配任何数字。类似于 `[0123456789]`
`[a-z]` |		匹配任何小写字母
`[A-Z]` |		匹配任何大写字母
`[a-zA-Z0-9]` |		匹配任何字母及数字
`[^aeiou]` |		除了`aeiou`字母以外的所有字符
`[^0-9]` |		匹配除了数字外的字符


#### 特殊字符类
实例 |	描述
--|--
`.` |		匹配除 `"\n"` 之外的任何单个字符。要匹配包括 `'\n'` 在内的任何字符，请使用象 `'[.\n]'` 的模式。
`\d` |		匹配一个数字字符。等价于 `[0-9]`。
`\D` |		匹配一个非数字字符。等价于 `[^0-9]`。
`\s` |		匹配任何空白字符，包括空格、制表符、换页符等等。等价于 `[ \f\n\r\t\v]`。
`\S` |		匹配任何非空白字符。等价于 `[^ \f\n\r\t\v]`。
`\w` |		匹配包括下划线的任何单词字符。等价于`'[A-Za-z0-9_]'`。
`\W` |		匹配任何非单词字符。等价于 `'[^A-Za-z0-9_]'`。



- 正则表达式符号使用小总结：
  - `[ ]`：方括号。匹配需要的字符集合，如[1-3]或[123]都是匹配1、2或者3。
  - `^`：脱字符号。方括号中加入脱字符号，就是匹配未列出的所有其他字符，如`[^a]`匹配除a以外的所有其他字符。
  - `\`：反斜杠。和`python`字符串使用规则一样，可以匹配特殊字符本身，如`\d`表示匹配0到9的任意一个数字字符，而`\\d`则表示匹配`\`d本身。
  - `*`：星号。匹配前一个字符0到n次，如`pytho*n`可以匹配`pythn`、`pytoon`、`pythooooon`等。还有其它匹配重复字符的如`？、+`或`{m,n}`，其中`{n,m}`可以灵活使用，它表示匹配n次到m次