---
title: Python编程之Tkinter的使用01
date: 2018-06-21 19:16:40
tags: [Python, Tkinter]
categories: Python基础
image: 
---

![Tkinter](http://p7hfnfk6u.bkt.clouddn.com/Tkinter1.png)
<!--more-->


`Python`提供了多个图形开发界面的库，几个常用`Python GUI`库如下：
- `Tkinter`：`Tkinter`模块(Tk 接口)是`Python`的标准 Tk GUI 工具包的接口`.Tk`和`Tkinter`可以在大多数的`Unix`平台下使用, 同样可以应用在`Windows`和`Macintosh`系统里。`Tk8.0`的后续版本可以实现本地窗口风格,并良好地运行在绝大多数平台中。
- `wxPython`：`wxPython`是一款开源软件，是`Python`语言的一套优秀的`GUI`图形库，允许`Python`程序员很方便的创建完整的、功能健全的`GUI`用户界面。
- `Jython`：`Jython`程序可以和`Java`无缝集成。除了一些标准模块，`Jython`使用`Java`的模块。`Jython` 几乎拥有标准的`Python`中不依赖于`C` 语言的全部模块。比如，`Jython`的用户界面将使用 `Swing`，`AWT`或者`SWT`。`Jython` 可以被动态或静态地编译成`Java`字节码

## `Tkinter`介绍
- `Tkinter`是`Python`的标准`GUI`库。`Python`使用 `Tkinter`可以快速的创建`GUI`应用程序。
- 由于`Tkinter`是内置到`python`的安装包中、只要安装好`Python`之后就能`import Tkinter`库、而且`IDLE`也是用`Tkinter`编写而成、对于简单的图形界面`Tkinter`还是能应付自如

<div class='note warning'><p>需要注意: `Python3.x`版本使用的库名为 `tkinter`,即首写字母`T`为小写 </p></div>

```python
import tkinter
```

- 创建一个GUI程序
  - 1、导入`tkinter`模块
  - 2、创建控件
  - 3、指定这个控件的`master`，即这个控件属于哪一个
  - 4、告诉`GM(geometry manager)`有一个控件产生了


### 主窗口
- 在`iOS`中每一个`APP`都有一个主窗口`window`, 该`window`就是所有视图嘴地城最基础的视图`View`
- 在`Python`中童谣也会有一个主窗口, 下面看一下`tkinter`生成主窗口的方法

```python
# 主窗口
import tkinter

# 创建主窗口
window = tkinter.Tk()

# 设置标题
window.title('Titanjun')

# 设置窗口大小
window.geometry('400x400')

# 进入消息循环
window.mainloop()
```

<div class="note success"><p>效果如下</p></div>

![window](http://p7hfnfk6u.bkt.clouddn.com/Python%E4%B8%BB%E7%AA%97%E5%8F%A3.png)


主窗口除了上述方法之外还有以下方法

```python
# 框体大小的可调性, 分别表示x, y方向的可变性
window.resizable(0, 0)

# 退出
window.quit()

# 刷新页面
window.update()
```

## `Tkinter`组件
- `Tkinter`的提供各种控件，如按钮，标签和文本框，一个`GUI`应用程序中使用, 这些控件通常被称为控件或者部件
- 目前有15种Tkinter的部件, 下面是对这些部件以及一个简短的介绍


控件 | 描述
---|---
`Label` |	标签控件, 可以显示文本和位图
`Button` | 按钮控件, 在程序中显示按钮
`Entry` |	输入控件；用于显示简单的文本内容
`Checkbutton` | 多选框控件；用于在程序中提供多项选择框
`Frame` |	框架控件；在屏幕上显示一个矩形区域，多用来作为容器
`Canvas` | 画布控件；显示图形元素如线条或文本
`Listbox` | 列表框控件；在`Listbox`窗口小部件是用来显示一个字符串列表给用户
`Menubutton` |	菜单按钮控件，由于显示菜单项。
`Menu` |	菜单控件；显示菜单栏,下拉菜单和弹出菜单
`Message`	 |	消息控件；用来显示多行文本，与`label`比较类似
`Radiobutton`	 |	单选按钮控件；显示一个单选的按钮状态
`Scale` |	范围控件；显示一个数值刻度，为输出限定范围的数字区间
`Scrollbar` |	滚动条控件，当内容超过可视化区域时使用，如列表框
`Text` |	文本控件；用于显示多行文本
`Spinbox`	 |	输入控件；与`Entry`类似，但是可以指定输入范围值
`PanedWindow`	 |	一个窗口布局管理的插件，可以包含一个或者多个子控件
`LabelFrame` | 一个简单的容器控件, 常用与复杂的窗口布局
`tkMessageBox` |	用于显示你应用程序的消息框

> 如果之前做过H5前端开发或者iOS等页面相关开发工作的, 应该能到, 其实这些组件和其他开发语言提供的组件功能相似, 属性也类似, 下面我们先看一下一些通用的属性介绍



属性值 | 属性描述
---|---
`bg` | 控件的背景颜色
`fg` | 组件中的字体颜色
`font` | 设置文本的字体样式和字号
`height` | 设置控件高度
`width` | 设置控件宽度
`bd` | 设置控件边框的大小, 默认2个像素
`relief` | 设置边框样式, 有falt, sunken, raised, groove, ridge, 默认flat
`text` | 设置文本内容
`anchor` | 瞄点, 控制文本的位置, 默认居中(可选: n北, e东, s南, w西, center居中, ne   se, sw, nw)
`justify` | 显示多行文本的时候,设置不同行之间的对齐方式(left, right, center)
`wraplength` | 根据宽度限制控件每行显示的字符的数量
`underline` | 下划线, 默认没有; 取值就是带下划线的字符串索引，为 0 时，第一个字符带下划线
`padx` | 在x轴方向上的内边距(padding)，是指控件的内容与控件边缘的距离
`pady` | 在y轴方向上的内边距(padding)


### `Label`控件
- `Label`控件用以显示文字和图片. 
- `Label`通常被用来展示信息, 而非与用户交互
- `Label`也可以绑定点击等事件, 只是通常不这么用

```python
label = tkinter.Label(window,
                      text="我是一只小鸭子",
                      bg='#999999',
                      fg='white',
                      font=('黑体', 13),
                      justify='center',
                      height=5,
                      width=30,
                      anchor='n',
                      # wraplength=30
                      underline=3,
                      bd=3,
                      relief='flat'
                      )
#显示出来
label.pack()
```

<div class='note success'><p>显示效果</p></div>

![Label](http://p7hfnfk6u.bkt.clouddn.com/Label%E6%95%88%E6%9E%9C.png)

<div class='note info'><p>部分属性介绍</p></div>

- `anchor`: 文本在空间中的显示位置(按上北下南, 左西右东规则), 可选值有(n北  e东  s南  w西  center居中  ne西北   se东南   sw西南   nw东北)方向
- `image`: 显示的图片


### `Button`控件
- `Button`控件是一个标准的`Tkinter`小部件，用于各种按钮, 如果用鼠标点击按钮，可能会开始一些操作
- `Button`可以显示文本和图片
- 按钮只能以单一字体显示文本, 文本可以跨越多行

```Python
# 设置标题
window.title('Titanjun')

# 设置窗口大小
window.geometry('400x400')

# 创建按钮
button1 = tkinter.Button(window,
                         text='按钮1',
                         bg='orange',
                         height=3,
                         width=20,
                         bd=3,
                         relief='sunken',
                         activebackground='orange',
                         activeforeground='white',
                         command=action1
                         )
button1.pack()


button2 = tkinter.Button(window, text='Titanjun', height=3, command=window.quit())
button2.pack()

# 进入消息循环
window.mainloop()
```

<div class='note success'><p>效果样式</p></div>

![Button](http://p7hfnfk6u.bkt.clouddn.com/Python%E6%8C%89%E9%92%AE.png)

<div class='note info'><p>部分属性介绍</p></div>

- `activebackground`: 当鼠标放上去时，按钮的背景色
- `activeforeground`: 当鼠标放上去时，按钮的文本颜色
- `highlightcolor`: 要高亮的颜色
- `image`: 按钮上要显示的图片
- `state`: 设置按钮组件状态,可选的有(normal(默认), active, disabled)
- `command`: 按钮的绑定函数方法, 接受一个函数名，注意函数名不要加引号


### `Entry`输入
输入控件, 用于显示简单的文本内容, 和`iOS`中的`UITextField`一样, 示例如下

```Python
vari = tkinter.Variable()
entry = tkinter.Entry(window, textvariable=vari)
entry.pack()

# 设置值
vari.set('very good')
# 取值
print(vari.get())
print(entry.get())

# 只读输入框
vari2 = tkinter.Variable()
entry2 = tkinter.Entry(window, textvariable=vari2, state='disabled')
entry2.pack()

# 设置值
vari2.set('very bad')
print(vari2.get())

# 密码输入框, 无论输入什么都显示密文
vari3 = tkinter.Variable()
entry3 = tkinter.Entry(window, textvariable=vari3, show='@', bg='red', fg='white')
entry3.pack()
```

<div class='note success'><p>效果样式</p></div>

![Button](http://p7hfnfk6u.bkt.clouddn.com/Python%E8%BE%93%E5%85%A5%E6%A1%86.png)

<div class='note info'><p>监听输入框内文字的改变</p></div>

- 这里我们需要通过设置一下三个选项
- `validate`: 设置输入框的监听状态
  - `focus`:当`Entry`组件获得或失去焦点的时候验证 
  - `focusin`: 当`Entry`组件获得焦点的时候验证 
  - `focusout`: 当`Entry`组件失去焦点的时候验证 
  - `key`:当输入框被编辑的时候验证 
  - `all`: 当出现上边任何一种情况的时候验证 
- `validatecommand`: 接受一个判断输入框内的文字是否符合要求的函数, 该函数只能返回 True 或 False 表示验证的结果
- `invalidcommand`: 指定的函数只有在`validatecommand`的返回值为`False`的时候才被调用

```Python
# 主窗口
import tkinter

# 验证输入的文字
def varileText():
    text = entry4.get()
    if text == '1':
        print('对喽')
        return True
    print('错漏')
    return False

#
def testInvaild():
    print('invaildCommanf被调用')
    return True

# 创建主窗口
window = tkinter.Tk()
# 设置标题
window.title('Titanjun')
# 设置窗口大小
window.geometry('400x400')


# 验证输入的内容是否符合要求
vari4 = tkinter.Variable()
entry4 = tkinter.Entry(window, textvariable=vari4, validate='key', validatecommand=varileText, invalidcommand=testInvaild)
entry4.pack()

# 进入消息循环
window.mainloop()
```

### `Text`多行文本
- `Text`文本组件用于显示和处理多行文本。
- 在`Tkinter`的所有组件中，`Text`组件显得异常强大和灵活，它适用于处理多任务
- 当创建一个`Text`组件的时候里面是没有内容的。为了给其插入内容，可以使用`insert()`以及`INSERT`或`END`索引号

#### 插入文本/控件/图片

```Python
text = Text(window, bg='yellow', width=40, height=10)
#INSERT索引表示在光标处插入
text.insert(INSERT,'I Love')
#END索引号表示在最后插入
text.insert(END,' you')
text.pack()

def show():
    print('好了, 你赢了')

# text还可以插入按钮  图片等
b1 = Button(text, text='点我点我', command=show)
# 在text创建组件的命令
text.window_create(INSERT, window=b1)
```

#### 索引值
- `Indexes`(索引)是用来指向`Text`组件中文本的位置，跟`python`的序列索引一样，`Text`的组件索引也是对应实际字符之间的位置
- 值得注意的是： 行号以1开始 列号以0开始
- 例如: 2.4表示第2行第4列的字符

```Python
from tkinter import *
root = Tk()
text1=Text(root,width=30,height=3)
text1.insert(INSERT,'index的练习')
#1.2到1.5的范围之间
print(text1.get(1.2,1.5))
```

#### Text中的Tags
`Tags`通常用于改变Text组件中内容的样式和功能，你可以修改文本的字体，尺寸和颜色，另外`Tags`还允许你将文本、嵌入的组件和图片与键盘相关联，除了`user-defined tags`(用户自定义的`Tags`)

```Python
text.insert(INSERT, '自定义标签的名字')

#第一个参数为自定义标签的名字
#第二个参数为设置的起始位置，第三个参数为结束位置
#第四个参数为另一个位置
text.tag_add('tag1', '1.7', '1.12', '1.14')

#用tag_config函数来设置标签的属性(这里不要用简写, 否则报错)
text.tag_config('tag1', font=17, background='blue', foreground='red')
# text.tag_config('tag1', bg='yellow', fg='red')
#新的tag会覆盖旧的tag
```

#### 带滚动条

```Python
text = Text(window, bg='yellow', width=100, height=10)
# 添加右侧滚动条
scroll = Scrollbar()
# side放到窗体的那一侧   fill填充
scroll.pack(side=RIGHT, fill=Y)
text.pack(side=RIGHT, fill=Y)
# 两者关联
scroll.config(command=text.yview)
text.config(yscrollcommand=scroll.set)

str = '''致橡树--舒婷

..........此处省略N个字...........

'''

text.insert(INSERT, str)
```

<div class='note success'><p>效果样式</p></div>

![Button](http://p7hfnfk6u.bkt.clouddn.com/%E6%BB%9A%E5%8A%A8Text.png)


### Checkbutton多选按钮
- `Checkbutton`可以表示两种状态：`On`和`Off`，可以设置回调函数，每当点击此按钮时回调函数被调用
- 这里有一个示例: 选择不同的复选框, 会有不同的文本显示

```Python
def update():
    message = ''
    if tag1.get() == True:
        message += 'titan \n'
    if tag2.get() == True:
        message += 'jun \n'
    if tag3.get() == True:
        message += 'coder \n'

    #清除text中的所有内容
    text.delete(0.0, END)
    # 插入新的文本内容
    text.insert(INSERT, message)

# 要绑定的变量
tag1 = BooleanVar()
check1 = Checkbutton(window, text = 'Titan', variable = tag1, command = update)
check1.pack()

tag2 = BooleanVar()
check2 = Checkbutton(window, text = 'Juned', variable = tag2, command = update)
check2.pack()

tag3 = BooleanVar()
check3 = Checkbutton(window, text = 'Coder', variable = tag3, command = update)
check3.pack()


text = Text(window, bg = 'orange', width = 50, height = 5)
text.pack()
```

<div class='note success'><p>效果样式</p></div>

![Checkbutton](http://p7hfnfk6u.bkt.clouddn.com/puthon%E5%A4%8D%E9%80%89%E6%A1%86.png)


### Radiobutton单选框
`Radiobutton`为单选按钮，即在同一组内只能有一个按钮被选中，每当选中组内的一个按钮时，其它的按钮自动改为非选中态，与其他控件不同的是：它有组的概念 

```Python
def selectorAction():
    print(tag.get())

# 一组单选框要绑定同一个变量
tag = IntVar()
radio1 = Radiobutton(window, text = 'one', value = 23, variable = tag, command = selectorAction)
radio1.pack()
radio2 = Radiobutton(window, text = 'two', value = 32, variable = tag, command = selectorAction)
radio2.pack()
radio3 = Radiobutton(window, text = 'ten', value = 10, variable = tag, command = selectorAction)
radio3.pack()
```

<div class='note success'><p>效果样式</p></div>

![Checkbutton](http://p7hfnfk6u.bkt.clouddn.com/python%E5%8D%95%E9%80%89%E6%A1%86.png)



> 未完待续, 后期会继续更新其他控件的相关介绍..........

---
