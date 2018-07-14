---
title: Python中常用的模块
date: 2018-07-14 19:20:12
tags: [Python, os, random]
categories: Python基础
---


- 上一篇文章中记录了[Python中模块的使用](https://www.titanjun.top/2018/05/31/Python中模块的使用/), 这里就是记录一些常用的模块
- 最近学习中发现, 之前接触的模块好多却都忘记了怎么使用
- 这里就简单总结一下`os`, `random`等模块的使用吧
- [GitHub代码示例目地址](https://github.com/CoderTitan/PythonDemo)

<!-- more -->


## `os`模块

 `os`模块简单的来说它是一个`Python`的系统编程的操作模块，可以处理文件和目录, 这些我们日常手动需要做的操作


### 环境变量


```Python
# 1. 获取操作系统的类型
print(os.name)
# 输出: posix

'''操作系统的类型
nt -> windows
posix -> Linux/Unix
OS -> Mac(内核是Linux)
'''


# 2. 输出操作系统详细的信息
print(os.uname())
# 输出:
# posix.uname_result(sysname='Darwin', nodename='xxx.local', release='17.5.0', version='Darwin Kernel Version 17.5.0: Mon Mar  5 22:24:32 PST 2018; root:xnu-4570.51.1~1/RELEASE_X86_64', machine='x86_64')

# 3. 获取操作系统中的环境变量(输出一个字典)
print(os.environ)


# 4. 获取指定的环境变量
# 参数为上述操作系统环境变量中字典的某一个键值对的键值
os.environ.get('PYTHONPATH')


# 5. 获取当前工作目录, 即当前python脚本所在的目录
print(os.getcwd())


# 6. 返回指定目录下的所有的文件, 返回一个列表
print(os.listdir(path))


# 7. 在制定目录下增删目录
# 在当前目录下创建文件
# 在制定的路径下创建
os.mkdir(r'/Users/xxx/titan')
# 默认在当前目录下
os.mkdir('jun')

# 删除目录
os.rmdir('jun')
os.rmdir('r'/Users/xxx/titan'')


# 8. 获取文件属性
print('文件属性:', os.stat('titan'))
'''输出:
文件属性: os.stat_result(st_mode=16877, st_ino=10797606, st_dev=16777224, st_nlink=2, st_uid=501, st_gid=20, st_size=68, st_atime=1527059854, st_mtime=1527058920, st_ctime=1527058920)
'''


# 9. 重命名
# os.rename('jun', 'titan')


# 10. 删除普通文件
# os.remove(path)

```

### os模块中的常用值

```Python
#curdir  表示当前文件夹   .表示当前文件夹  一般情况下可以省略
print(os.curdir)

#pardir  表示上一层文件夹   ..表示上一层文件夹  不可省略!
print(os.pardir)

#os.mkdir('../../../man')#相对路径  从当前目录开始查找
#os.mkdir('/home/sy/man1')#绝对路径  从根目录开始查找

#name 获取代表操作系统的名称字符串
print(os.name) #posix -> linux或者unix系统  nt -> window系统

#sep 获取系统路径间隔符号  window ->\    linux ->/
print(os.sep)

#extsep 获取文件名称和后缀之间的间隔符号  window & linux -> .
print(os.extsep)

#linesep  获取操作系统的换行符号  window -> \r\n  linux/unix -> \n
print(repr(os.linesep))

```

### 处理文件路径

```Python
# 1. 拼接路径
p1 = '/xxx/GitHub/PythonDemo/PythonStudy'
p2 = '6-os模块/jun.txt'
print(os.path.join(p1, p2))
# 输出: /xxx/GitHub/PythonDemo/PythonStudy/6-os模块/jun.txt


# 2. # 拆分路径
path2 = r'/xxx/GitHub/PythonDemo/PythonStudy/6-os模块/jun.txt'
print('拆分路径:', os.path.split(path2))
# 输出一个元组: ('/xxx/GitHub/PythonDemo/PythonStudy/6-os模块', 'jun.txt')


# 3. 获取扩展名, 返回一个元组
os.path.splitext(path2)
# 输出: ('/xxx/GitHub/PythonDemo/PythonStudy/6-os模块/jun', '.txt')


# 4. 是否是目录
print('是否是目录:', os.path.isdir(path2))
# 是否是目录: False


# 5. 判断文件是否存在
print('文件是否存在:', os.path.isfile(path2))
# 文件是否存在: False


# 6. 判断目录是否存在
path3 = r'/Users/quanjunt/Documents/Quanjun/GitHub/PythonDemo/PythonStudy/6-os模块'
print('判断目录是否存在:', os.path.exists(path3))
# 输出: False


# 7.  获取文件大小(字节)
print('文件大小:', os.path.getsize(path3))
# 文件大小: 170


# 8. 获取文件名
print('文件名:', os.path.basename(path2))
# 输出: jun.txt


# 9. 获取文件路径中的目录部分
print('文件目录:', os.path.dirname(path2))
# 输出: /xxx/GitHub/PythonDemo/PythonStudy/6-os模块
```


## `random`模块
`random`是`python`产生伪随机数的模块，随机种子默认为系统时钟

### 基本用法

```Python
# 首先要先导入模块
import random

# 1.从序列的元素中随机挑选一个元素
random.choice((1, 3, 5, 2))
random.choice("titanjun")

# 2. 从指定范围内，按指定基数递增的集合中获取一个随机数
print(random.randrange(10, 100, 3))

# 3. 随机生成的一个实数，它在[0,1)范围内
random.random()

# 随机生成指定范围[a,b]的整数
print(random.randint(1, 6))

# 随机生成指定范围[a,b)的整数
print(random.randrange(2, 8))

# 随机生成指定范围[a,b)的指定步长的数
print(random.randrange(1, 10, 3))

# 随机生成指定序列中的指定个数的元素(返回列表)
print(random.sample('titanjun', 4))

# 将序列的所有元素随机排序
list1 = [1, 2, 3, 4]
random.shuffle(list1)
print(list1)

# 随机生成一个在该范围内的实数
print(random.uniform(2, 5))
```

### 随机生成6位验证码

```Python
checkCode = ''
for i in range(6):
    temp = random.randint(0, 9)
    checkCode += str(temp)
print("6位随机验证码:", checkCode)
```


















