---
title: Tkinter之组件布局和事件绑定
date: 2018-06-26 14:46:20
tags: [Python, Tkinter]
categories: Python基础
image: 
---



![Tkinter](http://p7hfnfk6u.bkt.clouddn.com/Tkinter1.png)

<!--more-->



- [前面的一些文章](https://www.titanjun.top/categories/Python基础/)介绍了`Tkinter`模块和大部分组建的使用
- 这里主要介绍数据的操作和组件布局等
- [GitHub代码示例目地址](https://github.com/CoderTitan/PythonDemo)


## 数据显示
在`tkinter`中的数据展示方式有两种表格数据和树状数据, 但是都用到同一个组件`Treeview`, 下面介绍组建的使用

### 表格数据

- 表格数据, 顾名思义就是用表格形式展示数据
- 要使用`Treeview`首先要引用`tkinter`中的`ttk`模块

```Python
from tkinter import ttk

# 此处省略window的相关代码

# 创建表格
tree = ttk.Treeview(window)
tree.pack()

# 定义列title(接受一个元组)
tree["columns"] = ('name', 'sex', 'age', 'height', 'weight')

# 设置列宽度
tree.column('name', width=100)
tree.column('sex', width=50)
tree.column('age', width=50)
tree.column('height', width=80)
tree.column('weight', width=80)

# 设置表头(列名)
tree.heading('name', text='姓名')
tree.heading('sex', text='性别')
tree.heading('age', text='年龄')
tree.heading('height', text='身高(CM)')
tree.heading('weight', text='体重(KG)')

# 添加数据
tree.insert('', 0, text='line1', values=('Titan', 'M', 20, 180, 80))
tree.insert('', 1, text='line2', values=('Jun', 'M', 19, 170, 65))
tree.insert('', 2, text='line3', values=('Coder', 'M', 20, 170, 70))
tree.insert('', 3, text='line4', values=('Che', 'W', 18, 165, 45))
# 上面第一个参数为第一层级, 这里目前用不到, 后面树状结构中会用到
```

<div class="note success"><p>效果图如下</p></div>

![表格数据](http://p7hfnfk6u.bkt.clouddn.com/Treeview1.png)


### 树状数据
树状数据这里指的是,类似文件夹的层级目录一样

```Python
# 创建表格
tree = ttk.Treeview(window)
tree.pack()

# 添加一级树枝
treeA1 = tree.insert('', 0, '浙', text='浙江', values=('A1'))
treeA2 = tree.insert('', 1, '鲁', text='山东', values=('A2'))
treeA3 = tree.insert('', 2, '苏', text='江苏', values=('A3'))

# 添加二级树枝
treeA1_1 = tree.insert(treeA1, 0, 'H', text='杭州', values=('A1_1'))
treeA1_2 = tree.insert(treeA1, 1, 'Z', text='舟山', values=('A1_2'))
treeA1_3 = tree.insert(treeA1, 2, 'J', text='嘉兴', values=('A1_3'))

treeA2_1 = tree.insert(treeA2, 0, 'N', text='济南', values=('A2_1'))
treeA2_2 = tree.insert(treeA2, 1, 'L', text='临沂', values=('A2_2'))
treeA2_3 = tree.insert(treeA2, 2, 'Q', text='青岛', values=('A2_3'))
treeA2_4 = tree.insert(treeA2, 3, 'Y', text='烟台', values=('A2_4'))


# 三级树枝
treeA1_1_1 = tree.insert(treeA1_1, 0, 'G', text='江干', values=('A1_1_1'))
treeA1_1_1 = tree.insert(treeA1_1, 1, 'X', text='萧山', values=('A1_1_2'))
```

<div class="note warning"><p>注意事项</p></div>

- `insert`: 参数介绍
  - 参数1: 上一层级的目录
  - 参数2: 当前数据在当前层级的中的索引值
  - 参数3: 当前数据的标识, 所有层及数据的该标识不能相同, 否则报错
  - 参数4: 显示的数据
- 注: 所有数据的参数3(标识)不能相同


<div class="note success"><p>效果图如下</p></div>

![树状数据](http://p7hfnfk6u.bkt.clouddn.com/Treeview2.png)


## 布局方式
- 所谓布局，就是指控制窗体容器中各个控件（组件）的位置关系。
- 在`tkinter`中目前存在的布局方式有三种: 绝对布局(`place`), 相对布局(`pack`)和表格布局(`grid`)

### 绝对布局
- 绝对布局: 窗口的变化对位置没有影响
- 这里先介绍`place`布局涉及到的相关属性和函数

#### 属性介绍

属性名 | 属性简析 | 取值 | 取值说明
---|---|---|---
`anchor` | 锚点, 当可用空间大于所需求的尺寸时，决定组件被放置于容器的何处 | N、E、S、W、NW、NE、SW、SE、`CENTER`(默认值) | 表示八个方向以及中心
`x、y` | 组件左上角的x、y坐标 | 整数，默认值0 | 绝对位置坐标，单位像素
`relx/rely` | 组件相对于父容器的x、y坐标 | 0~1之间浮点数 | 相对位置，0.0表示左边缘（或上边缘），1.0表示右边缘（或下边缘）
`width/height`	| 组件的宽度、高度	| 非负整数	| 单位像素
`relwidth、relheight`	| 组件相对于父容器的宽度、高度	| 0~1之间浮点数	 | 与`relx(rely)`取值相似
`bordermode` | 如果设置为`INSIDE`，组件内部的大小和位置是相对的，不包括边框；如果是`OUTSIDE`，组件的外部大小是相对的，包括边框	 | `INSIDE`(默认)、`OUTSIDE`	 | 可以使用常量`INSIDE`、`OUTSIDE`，也可以使用字符串形式`inside`、`outside`


```Python
# 创建四个label
label1 = Label(window, text='11111', bg='red')
label2 = Label(window, text='22222', bg='yellow')
label3 = Label(window, text='33333', bg='blue')
label4 = Label(window, text='44444', bg='orange')

# 绝对布局
label1.place(x=10, y=10, width=200)
label2.place(x=30, y=30)
label3.place(x=60, y=61)
label4.place(x=91, y=91, width=200, height=50)
```

如下图组件位置固定
<div class="note success"><p>如下图组件位置固定</p></div>

![place布局](http://p7hfnfk6u.bkt.clouddn.com/place.png)

#### 相关函数
`place`类提供了下列函数（使用组件实例对象调用）

- `place_slaves()`: 以列表方式返回本组件的所有子组件对象
- `place_configure(option=value)`: 给`place`布局管理器设置属性，使用属性`option=value`方式设置
- `propagate(boolean)`: 设置为`True`表示父组件的几何大小由子组件决定(默认值)，反之则无关
- `place_info()`: 返回`place`提供的选项所对应得值
- `grid_forget()`: `Unpack`组件，将组件隐藏并且忽略原有设置，对象依旧存在，可以用`pack(option, …)`，将其显示
- `location(x, y)`: `x/y`为以像素为单位的点，函数返回此点是否在单元格中，在哪个单元格中。返回单元格行列坐标，(-1, -1)表示不在其中
- `size()`: 返回组件所包含的单元格，揭示组件大小


### 相对布局
#### 属性介绍
- 相对布局: 组件位置或大小的变化会随着窗口的变化而变化
- 这里先介绍`pack`布局涉及到的相关属性和函数

属性名 | 属性简析 | 取值 | 取值说明
---|---|---|---
`fill` | 设置组件是否向水平或垂直方向填充 | `X、Y、BOTH和NONE` | `fill=X`(水平方向填充),`BOTH`(水平和垂直),`NONE`不填充
`expand` | 设置组件是否展开 | YES、NO（1、0）| `expand=YES`
`side` | 设置组件的对齐方式 | `LEFT、TOP、RIGHT、BOTTOM` | 值为左、上、右、下
`ipadx/ipady` | 设置x方向（或者y方向）内部间隙（子组件之间的间隔） | 可设置数值，默认是0 | 非负整数，单位为像素
`padx/pady` |	设置x方向（或者y方向）外部间隙（与之并列的组件之间的间隔） | 可设置数值，默认是0 | 非负整数，单位为像素
`anchor` | 锚选项，当可用空间大于所需求的尺寸时，决定组件被放置于容器的何处 |	N、E、S、W、NW、NE、SW、SE、CENTER（默认值为CENTER）	| 表示八个方向以及中心

<div class='note warning'><p>需要注意的是</p></div>

`expand`: 设置组件是否展开，当值为YES时，`side`选项无效。组件显示在父容器中心位置；若`fill`选项为`BOTH`,则填充父组件的剩余空间。默认为不展开

```Python
# 创建四个label
label1 = Label(window, text='11111', bg='red')
label2 = Label(window, text='22222', bg='yellow')
label3 = Label(window, text='33333', bg='blue')
label4 = Label(window, text='44444', bg='orange')


# 布局
label1.pack(side=LEFT, fill=Y)
label2.pack(side=RIGHT, fill=Y)
label3.pack(side=TOP, fill=X)
label4.pack(side=BOTTOM, fill=X)
```


<div class="note success"><p>效果如图</p></div>

![pack](http://p7hfnfk6u.bkt.clouddn.com/pack.png)

#### 函数介绍
`pack`类提供了下列函数（使用组件实例对象调用）
- `pack_slaves()`: 以列表方式返回本组件的所有子组件对象
- `pack_configure(option=value)`: 给`pack`布局管理器设置属性，使用属性`option=value`方式设置
- `propagate(boolean)`: 设置为  True    表示父组件的几何大小由子组件决定（默认值），反之则无关。
- `ack_info()`:	返回pack提供的选项所对应得值。
- `pack_forget()`:	`Unpack`组件，将组件隐藏并且忽略原有设置，对象依旧存在，可以用`pack(option, …)`，将其显示。
- `location(x, y)`:	x, y为以像素为单位的点，函数返回此点是否在单元格中，在哪个单元格中。返回单元格行列坐标，(-1, -1)表示不在其中
- `size()`:	返回组件所包含的单元格，揭示组件大小


### 表格布局
- `grid`布局又被称作网格布局，是最被推荐使用的布局。
- 程序大多数都是矩形的界面，我们可以很容易把它划分为一个几行几列的网格，然后根据行号和列号，将组件放置于网格之中
- 使用`grid`布局时，需要在里面指定两个参数，分别用`row` 表示行，`column`表示列
- 需要注意的是`row`和`column`的序号都从0开始

#### 属性介绍

属性名 | 属性简析 | 取值 | 取值说明
---|---|---|---
`row/column` | `row`为行号，`column`为列号，设置将组件放置于第几行第几列 | 取值为行、列的序号，不是行数与列数 | `row`和`column` 的序号都从0 开始
`sticky` | 设置组件在网格中的对齐方式 | `N、E、S、W、NW、NE、SW、SE、CENTER` | 类似于`pack`布局中的锚选项
`rowspan` | 组件所跨越的行数 | 跨越的行数	 | 取值为跨越占用的行数，而不是序号
`columnspan` | 组件所跨越的列数 | 跨越的列数	 | 取值为跨越占用的列数，而不是序号
`ipadx/ipady` | 设置x方向（或者y方向）内部间隙（子组件之间的间隔） | 可设置数值，默认是0 | 非负整数，单位为像素
`padx/pady` |	设置x方向（或者y方向）外部间隙（与之并列的组件之间的间隔） | 可设置数值，默认是0 | 非负整数，单位为像素


```Python
# 创建四个label
label1 = Label(window, text='11111', bg='red')
label2 = Label(window, text='22222', bg='yellow')
label3 = Label(window, text='33333', bg='blue')
label4 = Label(window, text='44444', bg='orange')

# 布局
label1.grid(row=0, column=0)
label2.grid(row=0, column=1)
label3.grid(row=1, column=0)
label4.grid(row=1, column=1)
```

<div class="note success"><p>效果如图</p></div>

![grid](http://p7hfnfk6u.bkt.clouddn.com/grid.png)

#### 函数介绍
`grid`类提供了下列函数（使用组件实例对象调用）：

函数名 | 描述
---|---
`grid_slaves()` | 	以列表方式返回本组件的所有子组件对象。
`grid_configure(option=value)` | 给`grid`布局管理器设置属性
`grid_propagate(boolean)` | 	设置为`True`表示父组件的几何大小由子组件决定(默认值)，反之则无关。
`grid_info()`	 | 返回`grid`提供的选项所对应得值。
`grid_forget()`	 | 将组件隐藏并且忽略原有设置，对象依旧存在
`grid_location(x, y)` | `x/y`为以像素为单位的点，函数返回此点是否在单元格中
`size()`  | 返回组件所包含的单元格，揭示组件大小


## 鼠标和键盘事件
- 一个`Tkinter`应用生命周期中的大部分时间都处在一个消息循环中
- 它等待事件的发生: 事件可能是按键按下, 鼠标点击, 鼠标移动等. 
- `Tkinter`提供了用以处理相关事件的机制, 处理函数可以被绑定给各个控件的各种事件
- 如果相关事件发生, `handler`函数会被触发, 事件对象`event`会传递给`handler`函数

```Python
button.bind(event, handler) 
```

### 鼠标点击事件

```Python
def buttonAction(event):
    print(event.x, event.y)

button = Button(window, text='这是一个按钮')
button.bind('<Button-4>', buttonAction)
button.pack()
```


<div class='note info'><p>其中`event`的事件类型和描述如下</p></div>

Event | Description
---|---
`<Button-1>` | 鼠标左键
`<Button-3>` | 鼠标右键
`<Button-2>` | 鼠标中键
`<Button-4>` | 鼠标向上滚动
`<Button-5>` | 鼠标向下滚动
`<Double-Button-1>` | 鼠标左键双击
`<Double-Button-3>` | 鼠标右键双击
`<Double-Button-2>` | 鼠标中键双击
`<Triple-Button-1>` | 鼠标左键三击
`<Triple-Button-3>` | 鼠标右键三击
`<Triple-Button-2>` | 鼠标中键三击


### 鼠标在某个按键被按下后的移动事件

```Python
label = Label(window, text='https://www.titanjun.top', bg='orange')
label.place(x=100, y=50, height=30)

def labelAction(event):
    print(event.x, event.y)
label.bind('<B1-Motion>', labelAction)
```

<div class='note info'><p>其中`event`的事件类型和描述如下</p></div>

Event | Description
---|---
`<B1-Motion>` | 左键移动
`<B3-Motion>` | 右键移动
`<B2-Motion>` | 中键移动


### 按钮点击释放事件

```Python
label = Label(window, text='https://www.titanjun.top', bg='orange')
label.place(x=100, y=50, height=30)

def labelAction(event):
    print(event.x, event.y)
label.bind('<ButtonRelease-1>', labelAction)
```

<div class='note info'><p>其中`event`的事件类型和描述如下</p></div>

Event | Description
---|---
`<ButtonRelease-1>` | 释放鼠标左键
`<ButtonRelease-3>` | 释放鼠标右键
`<ButtonRelease-2>` | 释放鼠标中键

<div class='note warning'><p>需要注意的是</p></div>

- 以上鼠标操作中, 苹果鼠标没有中键这一说, 所以在苹果鼠标操作中
- 正常鼠标的中键操作(例如`<Button-2>`等`-2`操作), 响应苹果鼠标的右键操作
- 正常鼠标的右键操作(例如`<Button-3>`等`-3`操作), 在苹果鼠标中无响应


### 鼠标进入/离开控件事件

```Python
# 按钮点击释放事件
label3 = Label(window, text='加油: https://www.titanjun.top', bg='yellow')
label3.place(x=100, y=150, height=30)

def labelAction(event):
    print(event.x, event.y)
label3.bind('<Leave>', labelAction)
```


<div class='note info'><p>其中`event`的事件类型和描述如下</p></div>

Event | Description
---|---
`<Enter>` | 鼠标光标进入控件时触发
`<Leave>` | 鼠标光标离开控件时触发


### 键盘响应事件

```Python
# 响应所有的按键
label = Label(window, text='https://www.titanjun.top', bg='orange')
# 设置焦点
label.focus_set()
label.place(x=100, y=50, height=30)

def labelAction(event):
    print(event.char, event.keycode)
label.bind('<Key>', labelAction)
```

<div class='note primary'><p>其中`event`的事件类型和描述如下</p></div>


Event | Description
---|---
`<Key>` | 响应所有的按键(按下)
`<KeyRelease>`| 响应所有的按键(松开)
`<FocusIn>` | 控件或控件的子空间获得键盘焦点.
`<FocusOut>` | 控件丢失键盘焦点 (焦点移动到另一个控件).


### 指定按键操作

Event | Description
---|---
`<Return>/<Enter>` | 只有回车键响应
`<Escape>` | esc键
`<space>` | 空格键
`<Tab>` | Tab键
`<Up>/<Down>/<Left>/<Right>` | 上下左右键
`<Shitf_L>/<Shift_R>` | 左右`Shift`键(类似有左右两个键的, 添加`_L/_R`区分)
`<BackSpace>` |   退格
`<a>/<b>` | 指定的小写字母键
`<A>/<Z>` | 指定的大写字母键
`<Control-Alt-a>` | 组合键(可识别任意组合键)


<div class='note warning'><p>需要注意的是</p></div>

识别组合键时, 一般是按下组合键的最后一个键才会触发操作

### `event`事件的相应参数

时间属性 | 描述
---|---
`char` | 从键盘输入的和按键事件的相关字符
`keycode` | 从按键输入的和按键事件的键代码(ASCII码)
`keysym` | 从按键输入的和按键事件的键符号(即字符)
`num` | 按键数字(1, 2, 3)表明按下的是哪个鼠标键
`widget` | 触发这个事件的小构件对象
`x和y` | 当前鼠标在小构件中以像素为单位的位置
`x_root和y_root` | 当前鼠标相对于屏幕左上角的以像素为单位的位置


---
