---
title: Swift基本语法01
date: 2016-12-25 15:23:03
tags: [Swift, 语法]
categories: Swift学习笔记
---


- 在Swift中规定：在定义一个标识符时必须明确说明该标识符是一个常量还是变量
- 使用let来定义常量，定义之后不可以修改
- 使用var来定义变量，定义之后可以修改

<!-- more -->

## 常量&变量

### 变量的基本使用

```Swift
    import UIKit
    let a : Int = 10
    // 错误写法,当一个标识符定义为常量时是不可以修改的
    // a = 20
    var b : Int = 20
    //因为b定义为变量,因此是可以修改的
    b = 30
```

### 常量和变量的使用注意:

- 常量使用注意：
    - 优先使用常量
    - 常量的本质
- 注意：
 - 在开发中let/var在选择时优先使用常量，防止不小被修改掉（let）
 - 如果一个标识符不需要修改，但是声明称了变量，那么编译器会报警告
- 常量的本质：
    - 含义：指向的内存地址不可以修改，但是可以通过内存地址，找到对应的对象，之后修改对象内部的属性

```Swift
    /*
     OC中创建对象：
        UIView *view = [[UIView alloc] init];
        view = [[UIView alloc] init];
     Swift中创建对象：
        var view : UIView = UIView()
     */
    /*
     变量的做法
        var view : UIView = UIView()
        view = UIView()
     */
    // 创建常量View
    let view = UIView()
    // view = UIView() 错误做法
    view.alpha = 0.5
    // Swift中创建结构体：结构体类型()
    view.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
    // Swift中调用方法，统一使用点语法
    view.backgroundColor = UIColor.red
```

### 创建对象补充

创建UIView对象，并且在UIView中添加UIButton


```Swift
    import UIKit
    // 1.创建UIView对象
    // OC : [[UIView alloc] initWithFrame:CGRect]
    let viewRect = CGRect(x: 0, y: 0, width: 100, height: 100)
    let view : UIView = UIView(frame: viewRect)
    // 2.设置UIView的属性
    view.backgroundColor = UIColor.orange
    // 3.创建UIButton
    let btn : UIButton = UIButton(type: .custom)
    // 4.设置UIButton的属性
    btn.frame = CGRect(x: 0, y: 0, width: 50, height: 50)
    btn.backgroundColor = UIColor.purple
    /*
     Swift中枚举类型：
     1> 如果可以根据上下文推导出类型可以直接.具体的类型
     2> 如果根据上下文推导不出具体的类型，则需要：类型.具体的类型
     */
    btn.setTitle("按钮", for: .normal)
    btn.setTitleColor(UIColor.white, for: .normal)
    // 5.将btn添加到UIView中
    view.addSubview(btn)
```

## Swift中数据类型
### Swift类型的介绍
- Swift中的数据类型也有:整型/浮点型/对象类型/结构体类型等等
    - 先了解整型和浮点型
    - 整型
        - 有符号
            - Int8 : 有符号8位整型
            - Int16 : 有符号16位整型
            - Int32 : 有符号32位整型
            - Int64 : 有符号64位整型
            - Int ： 和平台相关(默认,相当于OC的NSInteger)
        - 无符号
            - UInt8 : 无符号8位整型
            - UInt16 : 无符号16位整型
            - UInt32 : 无符号32位整型
            - UInt64 : 无符号64位整型
            - UInt : 和平台相关(常用,相当于OC的NSUInteger)(默认)
    - 浮点型
        - Float : 32位浮点型
        - Double : 64浮点型(默认)

```Swift
    // 定义一个Int类型的变量m,并且赋值为10
    var m : Int = 10
    // 定义一个Double类型的常量n,并且赋值为3.14
    let n : Double = 3.14
```

### Swift中的类型推导

- Swift是强类型的语言
    - Swift中任何一个标识符都有明确的类型
    - 注意:
        - 如果定义一个标识符时有直接进行赋值,那么标识符后面的类型可以省略.
        - 因为Swift有类型推导,会自动根据后面的赋值来决定前面的标识符的数据类型
        - 可以通过option+鼠标左键来查看变量的数据类型

```Swift
    import UIKit
    let m = 20
    let n = 30.5
    // 错误写法 :
    // Swift中没有隐式转化，不会自动将一个Int类型转成Double类型，因此不同类型之间不能进行运算
    // let result = m + n
    // 正确做法
    // 1> 将Int类型转成Double ： Double(标识符)
    // 2> 将Double类型转成Int ： Int(标识符)
    let result1 = Double(m) + n
    let result2 = m + Int(n)
```


## 逻辑分支
### 分支的介绍
- 分支即if/switch/三目运算符等判断语句
- 通过分支语句可以控制程序的执行流程


### if分支语句
- 和OC中if语句有一定的区别
    - 判断句可以不加()
    - 在Swift的判断句中必须有明确的真假
        - 不再有非0即真
        - 必须有明确的Bool值
        - Bool有两个取值:false/true

```Swift
    // 演练一:
    let a = 10
    // 错误写法:
    //if a {
    //    print("a")
    //}
    // 正确写法
    if a > 9 {
        print(a)
    }
    // 演练二:
    let score = 87
    if score < 60 {
        print("不及格")
    } else if score <= 70 {
        print("及格")
    } else if score <= 80 {
        print("良好")
    } else if score <= 90 {
        print("优秀")
    } else {
        print("完美")
    }
```


### guard的使用
- guard是Swift2.0新增的语法
    - 它与if语句非常类似，它设计的目的是提高程序的可读性
    - guard语句必须带有else语句，它的语法如下：
        - 当条件表达式为true时候跳过else语句中的内容，执行语句组内容
        - 条件表达式为false时候执行else语句中的内容，跳转语句一般是return、break、continue和throw

```Swift
    guard 条件表达式 else {
        // 条换语句
        break
    }
    语句组
    //---例子---
        var age = 18
    func online(age : Int) -> Void {
        guard age >= 18 else {
            print("回家去")
            return
        }
        print("可以上网")
    }
    online(age)
```

### switch分支
#### switch的介绍
- Switch作为选择结构中必不可少的语句也被加入到了Swift中
    - 只要有过编程经验的人对Switch语句都不会感到陌生
    - 但苹果对Switch进行了大大的增强，使其拥有其他语言中没有的特性

#### switch的简单使用

- 基本用法和OC用法一致
    - 不同之处:
        - switch后可以不跟()
        - case后可以不跟break(默认会有break)
    - 例子:

```Swift
     let sex = 0
     switch sex {
     case 0 :
         print("男")
    case 1 :
         print("女")
     default :
         print("其他")
     }
 ```
 
- 简单使用补充:
    - 一个case判断中,可以判断多个值
    - 多个值以,隔开
    
 ```Swift
     let sex = 0
     switch sex {
     case 0, 1:
         print("正常人")
     default:
         print("其他")
     }
 ```
 
- 简单使用补充:
    - 如果希望出现之前的case穿透,则可以使用关键字fallthrough

```Swift
    let sex = 0
    switch sex {
    case 0:
        fallthrough
    case 1:
        print("正常人")
    default:
        print("其他")
    }
```

#### switch支持区间判断

- 什么是区间?
    - 通常我们指的是数字区间:0~10,100~200
    swift中的区间常见有两种
    - 半开半闭区间:0..<10 表示:0~9,不包括10
        闭区间:0…10 表示:0~10

```Swift
    let score = 88
    switch score {
    case 0..<60:
        print("不及格")
    case 60..<80:
        print("几个")
    case 80..<90:
        print("良好")
    case 90..<100:
        print("优秀")
    default:
        print("满分")
    }
```

## 循环使用

### 循环的介绍
- 在开发中经常会需要循环
- 常见的循环有:for/while/do while.
- 这里我们只介绍for/while,因为for/while最常见
### for循环的写法
- 区间for循环

```Swift
    for i in 0..<10 {
        print(i)
    }
    for i in 0...10 {
        print(i)
    }
    //特殊写法:如果在for循环中不需要用到下标i
    for _ in 0..<10 {
    print("hello")
    }
```

> [Swift中遍历方法for in 和 forEach的区别](http://www.jianshu.com/p/0f75c23773b5)


### while和do while循环
- while循环
    - while的判断句必须有正确的真假,没有非0即真
    - while后面的()可以省略

```Swift
    var a = 0
    while a < 10 {
        a++
    }

    //--do while循环:使用repeat关键字来代替了do--
        let b = 0
    repeat {
        print(b)
        b++
    } while b < 20
```
