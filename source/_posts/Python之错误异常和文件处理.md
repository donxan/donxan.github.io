---
title: Python之错误异常和文件处理
date: 2018-05-22 21:56:12
tags: [Python, 错误异常, 文件]
categories: Python基础
---


- 之前的文章介绍的都是`Python`的一些语法和使用方法, 详情可参考[Python基础知识](https://www.titanjun.top/categories/Python%E5%9F%BA%E7%A1%80/) 
- 然而这里我们要说的是编程中我们最不想见到的, 但是却也是不得不面对的`Bug`
- 除此之外, 这里还会介绍一下`Python`中的文件读取

<!-- more -->

## 错误和异常
`Python` 中（至少）有两种错误：语法错误和异常（`syntax errors` 和 `exceptions` ）

### 语法错误
语法错误，也被称作解析错误, 使我们在学习`Python`过程中最常遇到的错误, 来看看下面两个错误示例:

```objc
if True
    print('titan')

# 错误信息:
File "../5-读文件.py", line 19
    if True
          ^
SyntaxError: invalid syntax
```

- 语法分析器指出错误出现的文件(`File`)和错误行(`line 19`)
- 在检测到错误的位置前面显示一个小“箭头”
- 错误是由箭头前面的标记引起的（或者至少是这么检测的）
- 此处错误是因为`Print`函数的前面, `if`语句后面少了一个冒号(`:`)


### 异常
- 在没有语法错误的情况下, 当我们执行当前程序的时候也可能会引发错误
- 运行期检测到的错误称为 异常，并且程序不会无条件的崩溃
- 异常能够编译通过, 但是不能运行成功; 而语法错误不能编译成功

```objc
print(1 / 0)
# 错误信息:
File "../5-读文件.py", line 22, in <module>
    print(1 / 0)
ZeroDivisionError: division by zero


print(1 + "12")
# 错误信息:
File "../5-读文件.py", line 22, in <module>
    print(1 + "12")
TypeError: unsupported operand type(s) for +: 'int' and 'str'


print(1 + ad * 2)
# 错误信息:
File "../5-读文件.py", line 22, in <module>
    print(1 + ad * 2)
NameError: name 'ad' is not defined
```

- 错误信息的第一行, 指出了异常出现的文件和错误行
- 第二行, 提示了是哪一条语句出现了错误
- 第三行, 指出了是哪一种异常信息;异常也有不同的类型，异常类型做为错误信息的一部分显示出来
- 以上三种异常分别为: 零除错误(`ZeroDivisionError`), 类型错误(`TypeError`) 和 命名错误(`NameError`)
- 相关异常信息[官方文档](https://docs.python.org/3/library/exceptions.html)


### 异常处理
- 我们都知道, 正常情况下, 程序执行过程中遇到错误或者异常, 程序便会中断执行, 这也就以为着后面的程序将无法执行
- 但是在`Python`中, 我们可以针对异常做出一些处理, 使之在遇到异常错误时, 继续执行后面的代码
- 异常类其实是`class`类, 所有的错误都是继承自`BaseException`

注意: 还有一些错误是无法跳过的, 比如内存错误

<div class='note info'><p>错误处理的语句 </p></div>

#### 第一种格式

```objc
# 格式:

try:
    语句t
except 错误码 as e:
    语句1
except 错误码 as e:
    语句2
except 错误码 as e:
    语句3
    ...
except 错误码 as e:
    语句n
else:
    语句e
```

<div class='note warning'><p>需要注意的是: </p></div>

- 语句中的`else`是可有可无的
- `except`语句中的`as e`也可以不加

```objc
# 错误处理的语句(else可有可无)
try.......except....else

# 格式:
try:
    语句t
except 错误码1:
    语句1
except 错误码2:
    语句2
else:
    语句3
```

#### 第二种格式
一个 `except` 子句可以在括号中列出多个异常的名字, 对于指定的一些异常做统一处理

```objc
try:
    print(7 / 0)
except (ZeroDivisionError, NameError):
    print('程序异常')
```

#### 第三种格式
无论遇到的是哪一种异常, 均做统一处理

```objc
try:
    print(7 / 0)
except :
    print('程序异常')
```

#### `try` 语句工作方式

- 首先，执行 `try` 子句 （在 `try` 和 `except` 关键字之间的部分）
- 如果没有异常发生， `except` 子句 在 `try` 语句执行完毕后就被忽略了
- 如果在 `try` 子句执行过程中发生了异常，那么该子句其余的部分就会被忽略
- 如果异常匹配于 `except` 关键字后面指定的异常类型，就执行对应的`except`子句。然后继续执行 `try` 语句之后的代码
- 如果发生了一个异常，在 `except` 子句中没有与之匹配的分支，它就会传递到上一级 `try` 语句中
- 如果最终仍找不到对应的处理语句，它就成为一个 未处理异常，终止程序运行，显示提示信息


#### 使用示例:
一个 `try` 语句可能包含多个 `except` 子句，分别指定处理不同的异常。至多只会有一个分支被执行。异常处理程序只会处理对应的 `try` 子句中发生的异常，在同一个 `try` 语句中，其他子句中发生的异常则不作处理

```objc
try:
    print(7 / 0)
except ZeroDivisionError:
    print('除数为0')
except NameError:
    print('没有改变量')
except SyntaxError:
    print('不知道')
```

一个 `except` 子句可以在括号中列出多个异常的名字

```objc
try:
    print(7 / 0)
except (ZeroDivisionError, NameError):
    print('程序异常')
```

最后一个 `except` 子句可以省略异常名称，以作为通配符使用。你需要慎用此法，因为它会轻易隐藏一个实际的程序错误！可以使用这种方法打印一条错误信息，然后重新抛出异常（允许调用者处理这个异常):

```objc
try:
    f = open('myfile.txt')
    s = f.readline()
    i = int(s.strip())
except OSError as err:
    print("OS error: {0}".format(err))
except ValueError:
    print("Could not convert data to an integer.")
except:
    print("Unexpected error:", sys.exc_info()[0])
    raise
```

`try … except` 语句可以带有一个 else子句，该子句只能出现在所有 except 子句之后。当 try 语句没有抛出异常时，需要执行一些代码，可以使用这个子句。例如:

```objc
try:
    print(7 / 0)
except ZeroDivisionError:
    print('除数为0')
except NameError:
    print('没有改变量')
else:
    print('代码OK')
```


### 抛出异常
`raise`语句允许程序员强制抛出一个指定的异常

```objc
raise NameError('TitanJun')

# 异常信息:
Traceback (most recent call last):
  File "../1-异常处理.py", line 95, in <module>
    raise NameError('TitanJun')
NameError: TitanJun
```

如果你需要明确一个异常是否抛出，但不想处理它，`raise` 语句可以让你很简单的重新抛出该异常:

```objc
try:
    raise NameError('TitanJun')
except NameError:
    print('NameError错误')
    raise

# 错误信息:
NameError错误
Traceback (most recent call last):
  File "../1-异常处理.py", line 97, in <module>
    raise NameError('TitanJun')
NameError: TitanJun
```


### 定义清理行为
- `try` 语句还有另一个可选的子句: `try--except--finally`，目的在于定义在任何情况下都一定要执行的功能
- 不管有没有发生异常，`finally`子句 在程序离开 `try` 后都一定会被执行
- 当 `try` 语句中发生了未被 `except` 捕获的异常（或者它发生在 `except` 或 `else` 子句中），在 `finally` 子句执行完后它会被重新抛出。 - `try `语句经由 `break`，`continue` 或 `return` 语句退 出也一样会执行 `finally` 子句


```objc
try:
    print(7 / 0)
except ZeroDivisionError:
    print('除数为0')
except NameError:
    print('没有改变量')
finally:
    print('我一定要执行')
    
# 输出:
除数为0
我一定要执行
```

### 预定义清理行为

有些对象定义了标准的清理行为，无论对象操作是否成功，不再需要该对象的时候就会起作用。以下示例尝试打开文件并把内容打印到屏幕上

```objc
for line in open("myfile.txt"):
    print(line)
```

这段代码的问题在于在代码执行完后没有立即关闭打开的文件。这在简单的脚本里没什么，但是大型应用程序就会出问题。`with` 语句使得文件之类的对象可以 确保总能及时准确地进行清理

```objc
with open("myfile.txt") as f:
    for line in f:
        print(line)
```

语句执行后，文件 `f` 总会被关闭，即使是在处理文件中的数据时出错也一样。其它对象是否提供了预定义的清理行为要查看它们的文档


## 文件读写
- 在`Python`中文件的读写, 通常以文本打开，这意味着，你从文件读出和向文件写入的字符串会被特定的编码方式（默认是UTF-8）编码。
- 模式后面的 `'b'` 以 二进制模式 打开文件：数据会以字节对象的形式读出和写入。
- 这种模式应该用于所有不包含文本的文件

### 读取文件
函数 `open()` 返回文件对象，通常的用法需要两个参数

```objc
def open(file, mode='r', buffering=None, encoding=None, errors=None, newline=None, closefd=True)

# 使用
path = r'/Users/xxx/text.txt'
file = open(path, 'r')
```

- 参数一: 一个含有文件名的字符串
- 参数二: 描述如何使用该文件的字符串, 默认为 `'r'`
  - `'r'`: 时表示只是读取文件
  - `'rb'`: 以二进制形式打开一个文件用于只读, 文件描述放在文件的开头
  - `'w'`: 表示只是写入文件（已经存在的同名文件将被删掉)
  - `'wb'`: 打开一个文件用于写入二进制, 如果该文件已经存在会覆盖, 如果不存在则创建新文件
  - `'w+'`: 打开一个文件用于读写
  - `'a'`: 表示打开文件进行追加，写入到文件中的任何数据将自动添加到末尾
  - `'r+'`: 表示打开文件进行读取和写入
  - `'b'`: 以 二进制模式 打开文件

### 文件对象方法
#### read()
- 要读取文件内容，需要调用 `file.read(size)`，该方法读取若干数量的数据并以字符串形式返回其内容
- `size` 是可选的数值，指定字符串长度, 如果没有指定 `size` 或者指定为负数，就会读取并返回整个文件。
- 当文件大小为当前机器内存两倍时，就会产生问题。反之，会尽可能按比较大的 `size` 读取和返回数据。
- 如果到了文件末尾，`file.read()`会返回一个空字符串

```objc
# 读取文件
str = file.read()
print(str)
```

#### readline()
- `file.readline()` 从文件中读取单独一行，字符串结尾会自动加上一个换行符（`\n`），只有当文件最后一行没有以换行符结尾时，这一操作才会被忽略。
- 这样返回值就不会有混淆，如果 `file.readline()` 返回一个空字符串，那就表示到达了文件末尾，如果是一个空行，就会描述为 `'\n'`，一个只包含换行符的字符串

```objc
file.readline()
```

#### 遍历文件对象
可以循环遍历文件对象来读取文件中的每一行。这是一种内存高效、快速，并且代码简介的方式

```objc
for line in file:
    print(line)
```

<div class='note primary'><p>如果你想把文件中的所有行读到一个列表中，你也可以使用 `list(file)` 或者 `file.readlines()`</p></div>

```objc
# 把文件读到列表中
print(list(file))
print(file.readlines())
```

#### 写入文件
- `write`: 将 `string` 的内容写入文件，并返回写入字符的长度
- `writelines`: 用于向文件中写入一序列的字符串, 没有返回值

```objc
# 写入文件
leng = file.write('我是一只小鸭子')
print(leng)
# 输出: 7


# 写入一个序列
file.writelines(['hello', 'Python'])
```

<div class='note warning'><p>想要写入其他非字符串内容，首先要将它转换为字符串</p></div>


#### tell/seek
- `tell`: 返回一个整数，代表文件对象在文件中的指针位置，该数值计量了自文件开头到指针处的比特数。
- 需要改变文件对象指针话话，使用 `file.seek(offset,from_what)`。
- 指针在该操作中从指定的引用位置移动 `offset` 比特，引用位置由 `from_what` 参数指定。 
- `from_what` 值为 0 表示自文件起始处开始，1 表示自当前文件指针位置开始，2 表示自文件末尾开始。
- `from_what` 可以忽略，其默认值为零，此时从文件头开始


```objc
l = file.readline()
print(l)

pos = file.tell()
print(pos)

# 输出:
b'https://www.titanjun.top/\n'
26
```

重新设置文件读取指针到开头

```objc
file.seek(5, 0)
print(file.readline())

# 输出:
b'https://www.titanjun.top/\n'
b'://www.titanjun.top/\n'
```

#### close
- 当你使用完一个文件时，调用 `file.close()` 方法就可以关闭它并释放其占用的所有系统资源。 
- 在调用 `file.close()` 方法后，试图再次使用文件对象将会自动失败

```objc
file.close()

file.read()

File "../5-读文件.py", line 64, in <module>
    file.read()
ValueError: read of closed file
```

#### 关键字`with`
- 用关键字 `with` 处理文件对象是个好习惯。
- 它的先进之处在于文件用完后会自动关闭，就算发生异常也没关系。
- 它是 `try-finally` 块的简写

```objc
with open(path, 'rb+') as file:
    str = file.read()
    print(str)
file.close()
```




