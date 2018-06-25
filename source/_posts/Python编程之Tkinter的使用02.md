---
title: Python编程之Tkinter的使用02
date: 2018-06-25 19:16:40
tags: [Python, Tkinter]
categories: Python基础
image: 
---

![Tkinter](http://p7hfnfk6u.bkt.clouddn.com/Tkinter1.png)

<!--more-->




- `Tkinter`是`Python`的标准`GUI`库。`Python`使用 `Tkinter`可以快速的创建`GUI`应用程序。
- 由于`Tkinter`是内置到`python`的安装包中、只要安装好`Python`之后就能`import Tkinter`库、而且`IDLE`也是用`Tkinter`编写而成、对于简单的图形界面`Tkinter`还是能应付自如
- [上一篇文章](https://www.titanjun.top/2018/06/21/Python%E7%BC%96%E7%A8%8B%E4%B9%8BTkinter%E7%9A%84%E4%BD%BF%E7%94%A801/)介绍了`Tkinter`模块和`Button`, `Label`等部分控件
- 这里主要介绍`Listbox`, `Scale`, `Menu`, `Frame`等部分控件的使用
- [GitHub代码示例目地址](https://github.com/CoderTitan/PythonDemo)



## `Listbox`列表框
一个可以包含一个或多个文本项的列表框，可以设置为单选或多选

### 创建`Listbox`

```Python
lb = Listbox(window, selectmode = EXTENDED)
lb.pack()
```

- `selectmode`: 设置列表框的样式(默认值-`BROWSE`), 有四个可选项
  - `SINGLE`: 单选, 不能通过鼠标的移动选中新的`item`, 只能点选
  - `BROWSE`: 单选, 可以通过鼠标的移动选中新的位置(`item`并不会移动)
  - `MULTIPLE`: 多选, 但是只能通过鼠标点击进行多选
  - `EXTENDED`: 多选, 按住`Shift`可以实现连选, 按住`Control`可以实现多选 


### 添加元素
- `Listbox`使用`insert`来添加一个元素，其中参数一为添加的索引值, 参数二为要添加的元素
- 索引`ACTIVE`是向当前选中的`item`前插入一个（即使用当前选中的索引作为插入位置）
- 索引`END`是想最后添加一个元素

```Python
for item in ["good", "nice", "handsome", "vg", "vn"]:
    # 按顺序添加
    lb.insert(END, item)
# 在开始位置添加
lb.insert(ACTIVE, 'Titn')
# 在最后添加
lb.insert(END, 'jun')
# 在具体的索引出添加元素
lb.insert(2, 'lululu')
# 把列表当成一个元素添加
lb.insert(ACTIVE, [1, 2, 3])
# 添加元组
lb.insert(ACTIVE, ('che', '09'))
```

### 删除/选中

```Python
def selection_set(self, first, last=None):
```

- 该函数为选中操作的函数, 需要两个参数, 其中
- 参数1: 开始的索引值
- 参数2: 结束的索引值(可选值, 可不指定)
- 若不指定参数2, 则函数只对参数1的索引值进行操作
- 删除/取消选中/取值等函数类似

```Python
#删除  参数1为开始的索引，参数2为结束的索引，如果不指定参数2，只删除第一个索引处的内容
# lb.delete(1, 2)
# lb.delete(1)

#选中   参数1为开始的索引，参数2为结束的索引，如果不指定参数2，只选中第一个索引处的内容
lb.selection_set(2, 5)
lb.selection_set(0)

# 取消
lb.selection_clear(3, 4)
lb.selection_clear(0)

#获取到列表中的元素的个数
print(lb.size())

#从列表中取值  参数1为开始的索引，参数2为结束的索引，如果不指定参数2，只获取第一个索引处的内容
print(lb.get(1, 3))
print(lb.get(5))

#返回当前的索引项，不是item元素
print(lb.curselection())

# 判断某选项是否被选中
print(lb.selection_includes(3))
print(lb.selection_includes(5))
```

### 变量和事件绑定
- 变量绑定和之前的控件帮定变量一样
- `Listbox`不支持`command`属性来设置回调函数了，使用`bind`来指定回调函数

```Python
# 绑定变量
lbv = StringVar()
lb = Listbox(window, selectmode = SINGLE, listvariable = lbv)
lb.pack()

for item in ["good", "nice", "handsome", "jun", "titan"]:
    lb.insert(END, item)

# 打印当前列表中的选项
print(lbv.get())
print(lb.get(1))

# 设置选项(所有重新赋值)
# lbv.set((1, 2, 3))

# 绑定事件
def listboxAction(event):
    print(lb.get(lb.curselection()))

# 第一个参数表示操作样式, 这里是双击操作, 1代表鼠标左键
lb.bind('<Double-Button-1>', listboxAction)
```

### 滚动显示
`Listbox`的内容超过所容纳范围时, 内容需要滚动显示, 类似上文中提到的`Text`文本的多行显示, 这里就需要添加滚动条

<div class="note success"><p>效果图如下</p></div>

![Listbox](http://p7hfnfk6u.bkt.clouddn.com/Listbox.gif)

```Python
# 滚动
lb = Listbox(window, selectmode=EXTENDED)
for item in ["good", "nice", "handsome", "from", "thinter","good1", "nice1", "handsome1", "vg1", "vn1","good3", "nice3", "handsome3", "vg3", "vn3"]:
    lb.insert(END, item)

# 滚动条
sc = Scrollbar(window)
sc.pack(side = RIGHT, fill = Y)
lb.configure(yscrollcommand = sc.set)
lb.pack(side = LEFT, fill = BOTH)
# 额外给属性赋值
sc["command"] = lb.yview
```

## `Scale`拽指示器
供用户通过拖拽指示器改变变量的值，可以水平，也可以竖直, 下面是相关属性介绍
- `from_`: 设置最小值
- `to`: 设置最大值
- `resolution`: 步距, 每次移动增加的最小单位
- `orient`: 显示方向(水平-`HORIZONTAL`, 垂直-`Variable`)
- `variable`: 绑定变量
- `command`: 绑定回调函数
- `length`: 控件的长度(垂直方向上则是高度)
- `digits`: 控制显示的数字位数

```Python
scale = Scale(window, from_ = 0, to = 100, orient = HORIZONTAL, length = 200, label='choice:')
scale.pack()

# 设置初始值
scale.set(34)

# 取值
def showNumber(event):
    print(scale.get())

scale["command"] = showNumber
```

<div class="note success"><p>效果图如下</p></div>

![Scale](http://p7hfnfk6u.bkt.clouddn.com/Scale%E6%8E%A7%E4%BB%B6.png)


## `Spinbox`数值范围控制器
- 组件`Spinbox`和组件`Scale`类似, 都是根据需求显示一个范围内的内容
- 区别: `Spinbox`去能拖拽, 只能点击增加或减少; `Scale`可以拖拽选择

```Python
# 绑定变量
spinStr = StringVar()

# 事件监听
def updateAction():
    # 在最后拼接上'12'
    # spin1.insert(END, 12)
    print(spinStr.get())


'''属性介绍:
from_: 起始值
to: 最大值
increment: 步长
textvariable: 绑定变量
command: 绑定函数, 事件监听
values: 设置后, 每次更新值将使用values指定的值
'''

# spin = Spinbox(window, from_ = 0, to = 100, increment = 10, textvariable = spinStr, command = updateAction)
# spin.pack()

spin1 = Spinbox(window, values=[0, 10, 30, 50, 80, -9], increment = 10, textvariable = spinStr, command = updateAction, bg='red')
spin1.pack()
```


<div class="note success"><p>效果图如下</p></div>

![Spinbox](http://p7hfnfk6u.bkt.clouddn.com/Spinbox%E6%8E%A7%E4%BB%B6.png)


## `Menu`菜单
`Menu`是被用来显示在标题栏/窗口或者其他顶层窗口上的菜单栏

### 顶层菜单
添加菜单项, 单纯的添加之后没有任何效果
```Python
# 菜单条
menubar = Menu(window)
window.configure(menu=menubar)
```

下面给菜单添加菜单列表选项, 添加之后只有菜单列表, 但是每一个菜单却没有下拉列表

```Python
# 创建一个菜单选项
menu1 = Menu(menubar, tearoff=False)
# 想菜单条上添加菜单选项
menubar.add_cascade(label='语言', menu=menu1)

menu2 = Menu(menubar, tearoff=False)
menubar.add_cascade(label='颜色', menu=menu2)
```

给每一个菜单添加下拉列表和监听事件

```Python
def menuAction1():
    print('menubar')

# 菜单条
menubar = Menu(window)
window.configure(menu=menubar)


# 创建一个菜单选项
menu1 = Menu(menubar, tearoff=False)
# 菜单选项添加内容
for item in ['Python', 'PHP', 'CPP', 'C', 'Java', 'JavaScript', 'VBScript', 'Exit']:
    if item == 'Exit':
        # 添加分割线
        menu1.add_separator()
        menu1.add_command(label=item, command=window.quit)
    else:
        menu1.add_command(label=item, command=menuAction1)

# 想菜单条上添加菜单选项
menubar.add_cascade(label='语言', menu=menu1)


# 菜单2的事件处理
def menuAction2():
    print(menuStr.get())

menuStr = StringVar()

menu2 = Menu(menubar, tearoff=True)
for item in ['red', 'orange', 'blue', 'gray']:
    menu2.add_radiobutton(label=item, variable=menuStr, command=menuAction2)
# 添加到菜单列表
menubar.add_cascade(label='颜色', menu=menu2)

```

<div class="note success"><p>效果图如下</p></div>

![Menu](http://p7hfnfk6u.bkt.clouddn.com/Menu%E9%A1%B6%E5%B1%82%E8%8F%9C%E5%8D%95.png)


<div class="note warning"><p>tearoff 属性介绍</p></div>

- `tearoff`是控制菜单能否独立出来的属性, 取值有`True`和`False`
- `tearoff`设置为`True`以后，就是表明这个菜单是可以独立出来的，如果是`False`的话就不可以独立出来
- 我在`Mac`中尝试了一下, 发现没有什么效果; 在`Windows`系统中会有一条虚线, 点击虚线, 会跳出一个悬浮菜单; 有`Windows`系统的童鞋可以试一下


### 右键菜单

```Python
# 鼠标右键菜单
menubar2 = Menu(window)

menu3 = Menu(menubar2, tearoff=False)
for item in ['Python', 'PHP', 'CPP', 'C', 'Java', 'JavaScript', 'VBScript', 'Exit']:
    menu3.add_command(label=item)

menubar2.add_cascade(label='开发语言', menu=menu3)

# 用于显示菜单
def showMenu(event):
    print('window')
    # 鼠标点击处的坐标
    menubar2.post(event.x_root, event.y_root)

# window绑定鼠标事件
window.bind("<Button-2>", showMenu)
```


<div class="note success"><p>效果图如下</p></div>

![Menu](http://p7hfnfk6u.bkt.clouddn.com/Menu%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95.png)

### 添加删除菜单
菜单中每一项的删除和添加都是根据索引操作的

```Python
# 添加/删除菜单
def menuClick():
    print("menu3")

# 添加command项
menu3.insert_command(1, label='command', command=menuClick)

# 添加radiobutton项
menu3.insert_radiobutton(3, label='radiobutton', command=menuClick)

# 添加checkbutton项
menu3.insert_checkbutton(5, label='checkbutton', command=menuClick)

# 添加分割线
menu3.insert_separator(4)
# menu3.insert_separator(0)


# 删除
# 两个参数: 参数1为开始的索引，参数2为结束的索引，如果不指定参数2，只获取第一个索引处的内容
menu3.delete(2, 4)
menu3.delete(0)
```

## `Combobox`下拉控件

```Python
# 绑定变量
cv = StringVar()
combo = ttk.Combobox(window, textvariable=cv)
combo.pack()

# 设置下拉菜单数据(元组数据)
combo['value'] = ('杭州', '湖州', '温州', '嘉兴', '舟山')

# 设置默认值
combo.current(0)

# 绑定事件
def comboboxClick(event):
    print(cv.get())
    print(combo.get())

combo.bind('<<ComboboxSelected>>', comboboxClick)
```

<div class="note success"><p>效果图如下</p></div>

![Combobox](http://p7hfnfk6u.bkt.clouddn.com/Combobox.png)


## `Frame`布局
`Frame`就是屏幕上的一块矩形区域，多是用来作为容器（`container`）来布局窗体

```Python
# 第一层容器
frame = Frame(window)
frame.pack()

# 左边容器
leftFrame = Frame(frame)
Label(leftFrame, text='左上位置', bg='red', height=5, width=10).pack(side=TOP)
Label(leftFrame, text='左下位置', bg='yellow', height=5, width=10).pack(side=TOP)
leftFrame.pack(side=LEFT)

# 右边容器
rightFrame = Frame(frame)
Label(rightFrame, text='右上位置', bg='orange', height=5, width=10).pack(side=TOP)
Label(rightFrame, text='右下位置', bg='blue', height=5, width=10).pack(side=TOP)
rightFrame.pack(side=RIGHT)
```

<div class="note success"><p>效果图如下</p></div>

![Combobox](http://p7hfnfk6u.bkt.clouddn.com/Python-Frame.png)


- 至此, `Tkinter`的大部分组件已经基本都介绍完了
- 接下来将会介绍一些`Tkinter`涉及到的数据类型和布局方式
- 以及鼠标的点按事件和一些特殊的事件操作
- 未完待续.............










