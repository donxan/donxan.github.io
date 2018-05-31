---
title: Python中模块的使用
date: 2018-05-31 16:20:12
tags: [Python, Pillow, pip3]
categories: Python基础
---


- 做过开发工作的童鞋应该都知道, 在一个完整的项目中, 会有大量的代码, 而且慢慢代码量会越来越多, 代码也就越来越难以维护;
- 随着你的程序变得越来越长，你可能想要将它分割成几个更易于维护的文件。
- 你也可能想在不同的程序中使用顺手的函数，而不是把代码在它们之间中拷来拷去
- 为了解决类似问题, 我们把很多功能相似的函数分组, 分别放到不同的文件中,这样每个文件中的代码相对较少, 且函数功能相似;
- [GitHub代码示例目地址](https://github.com/CoderTitan/PythonDemo)

<!-- more -->

## 概述
### 模块简述

- 在`Python`中提供了一个方法可以从文件中获取定义，在脚本或者解释器的一个交互式实例中使用, 这样的文件被称为模块；
- 模块中的定义可以导入到另一个模块或主模块中（在脚本执行时可以调用的变量集位于最高级，并且处于计算器模式）
- 模块是包括 Python 定义和声明的文件。文件名就是模块名加上 .py 后缀。
- 模块的模块名（做为一个字符串）可以由全局变量 `__name__` 得到
- 模块主要分为内置模块, 三方模块和自定义模块

### 模块优点
- 提高了代码的可维护性
- 提高了代码的服用度, 当一个模块完毕, 可以被多个地方引用
- 可避免函数名和变量名的冲突

### 标准库模块
下面是一个使用`python`标准库中模块的例子

```objc
import sys

print('命令行参数如下:')
for i in sys.argv:
   print(i)

print('\n\nPython 路径为：', sys.path, '\n')


# 输出结果如下
命令行参数如下:
../GitHub/PythonDemo/PythonStudy/7-模块/1-模块概述.py

Python 路径为： ['/Users/../GitHub/PythonDemo/PythonStudy/7-模块', '/Users/../GitHub/PythonDemo/PythonStudy', '/Library/Frameworks/Python.framework/Versions/3.6/lib/python36.zip', '/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6', '/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/lib-dynload', '/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages', '/Applications/PyCharm.app/Contents/helpers/pycharm_matplotlib_backend'] 
```

- `argv`: 获取命令行参数的列表
- `import sys` 引入`python`标准库中的`sys.py`模块
- `import`: 这是引入一个模块的方法(后面会提到)
- `sys.path`: 包含了一个`Python`解释器自动查找所需模块的路径的列表
 

## 自定义模块
- `Python`中不但可以使用第三方模块和系统模块, 同时我们还可以使用自定义模块, 
- 在`Python`中一个`.py`文件就是一个模块
- 下面是我自定义的一个`Titan.py`模块, 代码如下

```objc
print('这是Titan模块')

# 定义变量
age = 20
name = 'titan'

# 定义方法
def sayGood():
    print('good')

def sayNice():
    print('nice')

def sayBad():
    print('bad')
```


## 导入模块

### `import`方式

在`Python`中导入另一个文件或者模块, 受用的语法是`import`

```objc
# 引入单个或多个模块
import module1[, module2[,... moduleN]

# 示例
# 一次导入多个模块
import time, random, os
# 一次导入一个模块
import calendar
```

<div class='note warning'><p>需要注意的是: </p></div>

- 一个模块只会被导入一次，不管你执行了多少次`import`, 可以防止模块被重复引用
- 引入任何模块时(包括自定义模块), 不用加`.py`后缀
- 当我们使用`import`语句的时候，`Python`解释器是怎样找到对应的文件的呢？
  - 这就涉及到`Python`的搜索路径，搜索路径是由一系列目录名组成的，`Python`解释器就依次从这些目录中去寻找所引入的模块。
  - 这看起来很像环境变量，事实上，也可以通过定义环境变量的方式来确定搜索路径。
  - 搜索路径是在`Python`编译或安装的时候确定的，安装新的库应该也会修改。搜索路径被存储在`sys`模块中的`path`变量


<div class="note info"><p>使用示例</p></div>

```objc
import Titan

Titan.sayBad()
Titan.sayGood()
print(Titan.name)

# 输出结果:
bad
good
titan
```

### `from…import`方式
从模块中导入一个指定的部分到当前的命名空间, 同样也可以导入一个模块中的多个部分(或者导入多个方法或变量), 格式如下:

```objc
from modname import name1[, name2[, ... nameN]]
```

<div class="note info"><p>使用示例</p></div>

```objc
from Titan import sayGood, sayBad, age

sayBad()
sayGood()
print(age)

# 输出结果:
bad
good
20
```

<div class="note warning"><p>需要注意的是:</p></div>

这种方式, 可能会导致和本文件中定义的方法或者变量重名, 这里需要注意


### `from…import*`方式
把一个模块中所有的内容, 全部倒入当前命名空间, 但是最好不要过多地使用

```objc
# 格式:
from modname import *

# 使用:
from Titan import *
sayGood()
print(age)
```

## 模块内置属性和函数
### `__name__`属性
- 除了包含函数定义外，模块也可以包含可执行语句, 这些语句一般用来初始化模块, 他们仅在第一次被导入的地方执行一次
- 模块就是一个可执行的`.py`文件, 一个模块呗另一个程序引用, 模块中的一些可执行语句便会执行
- 如果我们不想让模块中的某些代码执行, 可以用`__name__`属性来使程序仅调用模块中的一部分
- 现在我们将模块中的代码修改如下:

```objc
if __name__ == '__main__':
    print('这是Titan模块')
else:
    def sayGood():
        print('good')


    def sayNice():
        print('nice')


    def sayBad():
        print('bad')


    age = 20
    name = 'titan'
```

- `name`和`main`前后都是双下划线
- 每一个模块中都有一个`__name__`属性, 当其值等于`__main__`时, 表明该模块自身在执行, 否则被引入了其他文件
- 当前文件如果为程序的入口文件, 则`__name__`属性的值为`__main__`


### `dir()`函数
- 内置的函数`dir()` 可以找到模块内定义的所有名称, 以一个字符串列表的形式返回
- 如果没有给定参数，那么`dir()`函数会罗列出当前定义的所有名称

```objc
import Titan

print(dir(Titan))

# 输出结果:
['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'age', 'name', 'sayBad', 'sayGood', 'sayNice']


print(dir())
# 输出结果:
['Titan', '__annotations__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__']


# 这里定义一个新的变量
sum = 30
print(dir())
# 输出结果:
['Titan', '__annotations__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'sum']


# 把定义的变量删除后
del sum
print(dir())
# 输出结果:
['Titan', '__annotations__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__']
```

## 包
这里我们先思考这样一个问题: 在同一个项目中有两个或两个以上的开发者分别定义了相同名字的模块(当然狮子啊不同的目录中, 同一个目录下不可能创建出相同名字的文件), 那么模块该如何调用


<div class="note success"><p>解决</p></div>

- 为了解决上述模块命名的冲突, 引入了按照目录来组织模块的方法, 成为包
- 包是一种管理`Python`模块命名空间的形式，采用"点模块名称"
- 引入包以后, 只要顶层的包不与其他人的发生冲突, 那么模块就都不会与别人的发生冲突
- 所谓顶层的包指的是上一层的文件目录
- 同一个包可以包含多个模块
- 例如: 名为`A.B`的模块表示了名为`A`的包中名为`B`的子模块


<div class="note warning"><p>需要注意的是:</p></div>

在每一个包内(模块的同级目录下)必须要创建一个名为`__init__.py`的文件, 主要是为了避免一些滥竽充数的名字, 目前该文件内可以什么都不用写, 如图所示:

![包.png](http://p7hfnfk6u.bkt.clouddn.com/Snip20180531_1.png)

<div class="note success"><p>调用方法</p></div>

```objc
import a.Titan
import b.Titan
import b.coder

a.Titan.sayGood()
b.Titan.sayGood()
b.coder.sayGood()


# 输出结果:
good--a
good--b
good--coder
```

## 安装使用第三方模块
### `pip`简介
- 在`Python`中第三方库是通过`pip`安装和管理的, `pip`就像`iOS`中的`pod`一样, 负责安装和管理第三方库
- 在`Mac`和`Linux`系统中`pip`是默认安装过的, 一般无需重新安装, 如有问题, 请自行百度解决
- 在`Mac`系统中会有一个默认的`Python2.7`版本的, 我自己安装了一个3.6的版本, 自然默认也安装了`pip`
- 下面是一些`Python3.6`中`pip`的命令, 这里需要以`pip3`为命令头执行

```objc
# 查看当前pip版本
pip3 -V

# 安装第三方库
pip3 install ...

# 对pip进行升级
pip3 install --upgrade pip3
```

### 安装第三方库
- `Mac`系统安装第三方库, 直接打开终端执行安装命令即可
- `Pillow`已经是`Python`平台事实上的图像处理标准库了
- `PIL`功能非常强大，但`API`却非常简单易用

```objc
pip3 install Pillow
```

### 第三方模块的使用
#### 操作图像
下面是最常见的图像缩放操作示例代码

```objc
from PIL import Image

# 打开一个jpg图像文件，注意是当前路径:
im = Image.open('titan.jpg')

# 获得图像尺寸
w, h = im.size
print('image size: %sx%s' % (w, h))

# 缩放到50%:
im.thumbnail((w//2, h//2))
print('image to: %sx%s' % (w//2, h//2))

# 把缩放后的图像用jpeg格式保存:
im.save('jun.jpg', 'jpeg')
```

其他功能如切片、旋转、滤镜、输出文字、调色板等一应俱全, 代码如下:

```objc
from PIL import Image, ImageFilter

# 打开一个jpg图像文件，注意是当前路径:
im = Image.open('jun.jpg')
# 应用模糊滤镜:
im2 = im.filter(ImageFilter.BLUR)
im2.save('jun1.jpg', 'jpeg')
```

<div class='note warning'><p>相关参考</p></div>

- [GitHub代码示例目地址](https://github.com/CoderTitan/PythonDemo)
- [Pillow简单实用](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/0014320027235877860c87af5544f25a8deeb55141d60c5000)

---


