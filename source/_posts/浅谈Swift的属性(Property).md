---
title: 浅谈Swift的属性(Property)
date: 2019-12-20 18:20:40
tags: [Swift5.1.2, Property, 属性]
categories: Swift学习笔记
image:
---


![Swift](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/swift.jpg?x-oss-process=style/titanjun)

<!-- more -->


- 今年期待已久的`Swift5.0`稳定版就已经发布了, 感兴趣的小伙伴可看我的这篇博客:[Swift 5.0新特性更新](https://www.titanjun.top/2019/01/28/Swift%205.0%E6%96%B0%E7%89%B9%E6%80%A7%E6%9B%B4%E6%96%B0/)
- 这篇博客可主要分享`Swift`的属性的相关介绍和剖析, 测试环境: `Xcode 11.2.1`, `Swift 5.1.2`


## 属性分类


在`Swift`中, 严格意义上来讲属性可以分为两大类: 实例属性和类型属性

- 实例属性(`Instance Property`): 只能通过实例去访问的属性
    - 存储实例属性(`Stored Instance Property`): 存储在市里的内存中, 每个实例都只有一份
    - 计算实例属性(`Computed Instance Property`)
- 类型属性(`Type Property`): 只能通过类型去访问的属性
    - 存储类型属性(`Stored Type Property`): 整个程序运行过程中就只有一份内存(类似全局变量)
    - 计算类型属性(`Computed Type Property`)
    - 类型属性可以通过`static`关键字定义; 如果是类也可以通过`class`关键字定义
- 实例属性属于一个特定类型的实例，每创建一个实例，实例都拥有属于自己的一套属性值，实例之间的属性相互独立
- 为类型本身定义属性，无论创建了多少个该类型的实例，这些属性全局都只有唯一一份，这种属性就是类型属性


## 实例属性

上面提到`Swift`中跟市里相关的属性可以分为两大类:存储属性和计算属性

- 存储属性(`Stored Property`)
    - 类似于成员变量，系统会为其分配内存空间，存储属性存储在实例的内存中
    - 存储属性可以是变量存储属性(用关键字`var`定义)，也可以是常量存储属性(用关键字`let`定义)
    - 结构体和类可以定义存储属性, 枚举不可以定义存储属性
- 计算属性(`Computed Property`)
    - 计算属性其本质就是方法(函数), 系统不会为其分配内存空间, 所以计算属性不会占用实例对象的内存
    - 计算属性不直接存储值，而是提供一个`getter`和一个可选的`setter`，来间接获取和设置其他属性或变量的值
    - 枚举、绝构体和类都可以定义计算属性


### 存储属性

- 在`Swift`中存储属性可以是`var`修饰的变量, 也可以是`let`修饰的常量
- 但是在创建类或结构体的实例时, 必须为所有的存储属性设置一个合适的初始值, 否则会报错的
- 可以在定义属性的时候, 为其设置一个初始值
- 可以在`init`初始化器里为存储实行设置一个初始值

```swift
struct Person {
    // 定义的时候设置初始值
    var age: Int = 24
    var weight: Int
}

// 使用init初始化器设置初始值
var person1 = Person(weight: 75)
var person2 = Person(age: 25, weight: 80)
```

- 上面两个属性是会占用实例的内存空间的
- 可以使用`MemoryLayout`获取数据类型占用的内存大小

```swift
// Person结构体实际占用的内存大小
MemoryLayout<Person>.size         // 16
// 系统为Person分配的内存大小
MemoryLayout<Person>.stride       // 16
// 内存对其参数
MemoryLayout<Person>.alignment    // 8
```

<div class="note primary"><p>还有一种使用方式, 输出结果一致</p></div>


```swift
var person = Person(weight: 75)

MemoryLayout.size(ofValue: person)
MemoryLayout.stride(ofValue: person)
MemoryLayout.alignment(ofValue: person)
```


### 计算属性

- 枚举、绝构体和类都可以定义计算属性
- 计算属性不直接存储值，而是提供一个`getter`和一个可选的`setter`，来间接获取和设置其他属性或变量的值
- 计算属性其本质就是方法(函数), 系统不会为其分配内存空间, 所以计算属性不会占用实例对象的内存


```swift
struct Square {
    var side: Int
    var girth: Int {
        set {
            side = newValue / 4
        }
        get {
            return side * 4
        }
    }
}

// 其中set也可以使用下面方式
set(newGirth) {
    side = newGirth / 4
}
```

下面我们先看一下`Square`所占用的内存大小, 这里方便查看都去掉了`print`函数

```swift
var squ = Square(side: 4)

MemoryLayout.size(ofValue: squ)        // 8
MemoryLayout.stride(ofValue: squ)      // 8
MemoryLayout.alignment(ofValue: squ)   // 8
```

从上面输出结果可以看出, `Square`只占用8个内存大小, 也就是一个`Int`占用的内存大小, 如果还是看不出来, 可以看一下下面这个

```swift
struct Square {
    var girth: Int {
        get {
            return 4
        }
    }
}

// 输出结果0
print(MemoryLayout<Square>.size)   // 0
```

- 从上面两个输出结果可以看出, 计算属性并不占用内存空间
- 此外, 计算属性虽然不直接存储值, 但是却需要`get、set`方法来取值或赋值
- 其中通过`set`方法修改其他相关联的属性的值; 如果该计算属性是只读的, 则不需要`set`方法, 传入的新值默认值`newValue`, 也可以自定义
- 通过`get`方法获取该计算属性的值, 即使是只读的, 计算属性的值也是可能发生改变的
- 定义计算属性只能使用`var`, 不能使用`let`
- 下面我们通过汇编的方式来看一下执行过程, 在下图中勾上`Always Show Disassembly`, 右断点时`Xcode`就会在运行过程中自动跳到断点的汇编代码中

![Disassembly](https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/always.png
)


```swift
var squ = Square(side: 4)
var c = squ.girth    // 在此处加上断点时
```

上述代码的执行流程, 通过汇编的方式看, 核心代码如下所示

![Square1](https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/square1.png)

下面是在iOS模拟器环境下一些汇编常用的指令

```objc
// 将rax的值赋值给rdi
movq   %rax, %rdi
// 将rbp-0x18这个地址值赋值给rsi
leaq   -0x18(%rbp), %rsi
// 函数跳转指令
callq  0x100005428 
```


从上图可以看到上面代码对应的汇编代码, 其核心代码大概可以分为四部分

1. `Square`调用`init`初始化器, 即`Square`的初始化(详细汇编代码可进入`callq  0x100001300`中查看)
2. 讲已经出初始化的`Square`的对象的内存地址赋值给一个全局变量, 即`squ`
3. 调用`Square`对象里面`girth`计算属性的`getter`方法, 获取`girth`的值
4. 把获取的`girth`的值赋值给一个全局变量

> 如上图中中断点位置, 当断点执行到此处时, 执行`si`命令即可查看`getter`函数的的执行过程, 如下图所示, 其中`imulq`是执行乘法指令


```objc
// 把rdx和rax的相乘的结果在赋值给rax
imulq  %rdx, %rax
```



![Square1](https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/square2.png)

下面再看一下, 计算属性的赋值操作, 代码如下

```
var squ = Square(side: 4)
squ.girth = 12;
print(squ.side)   // 3
```

对应的汇编代码如下, 执行流程和上面的取值操作类似, 不同的是赋值操作最后执行的是`girth`的`setter`方法

```objc
0x1000010c9 <+25>: callq  0x100001300               ; SwiftLanguage.Square.init(side: Swift.Int) -> SwiftLanguage.Square at main.swift:11
0x1000010ce <+30>: leaq   0x6123(%rip), %rsi        ; SwiftLanguage.squ : SwiftLanguage.Square
0x1000010d5 <+37>: xorl   %ecx, %ecx
0x1000010d7 <+39>: movq   %rax, 0x611a(%rip)        ; SwiftLanguage.squ : SwiftLanguage.Square
0x1000010de <+46>: movq   %rsi, %rdi
0x1000010e1 <+49>: leaq   -0x20(%rbp), %rsi
0x1000010e5 <+53>: movl   $0x21, %edx
0x1000010ea <+58>: callq  0x10000540a               ; symbol stub for: swift_beginAccess
0x1000010ef <+63>: movl   $0xc, %edi
0x1000010f4 <+68>: leaq   0x60fd(%rip), %r13        ; SwiftLanguage.squ : SwiftLanguage.Square
0x1000010fb <+75>: callq  0x100001200               ; SwiftLanguage.Square.girth.setter : Swift.Int at main.swift:14
```

- 只读计算属性, 只有`get`没有`set` 
- 只读计算属性的值, 则是根据关联值的变化而变化, 不可被赋值


```swift
// 你可以这样写
struct Square {
    var side: Int
    var girth: Int {
        get {
            return side * 4
        }
    }
}

// 也可以这样写
var girth: Int {
    return side * 4
}

// 还可以这样写
var girth: Int { side * 4 }


var squ = Square(side: 4)
// 不可赋值修改
//squ.girth = 12;
print(squ.girth)
```

### 枚举的rawValue

枚举的`rawValue`的本质就是计算属性, 而且是只读的计算属性


```swift
enum Test: Int {
    case test1 = 1
    case test2 = 2
}

var c = Test.test1.rawValue
print(c)    // 1
```

至于如何确定, 那么久简单粗暴点, 看汇编

![Square](https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/square3.png)

- 上图中可以看到获取`rawValue`的值, 其实就是调用的`rawValue`的`getter`方法
- 另外如下所示, 我们对`rawValue`进行重新赋值, 会报错


```swift
Test.test1.rawValue = 2
// 这里报错: Cannot assign to property: 'rawValue' is immutable
```

那么我们就可以根据`rawValue`的计算属性修改`rawValue`的值


```swift
enum Test: Int {
    case test1 = 1
    case test2 = 2
    
    var rawValue: Int {
        switch self {
        case .test1:
            return 10
        case .test2:
            return 20
        }
    }
}

var c = Test.test1.rawValue   // 10
```

### 延迟存储属性

- 使用`lazy`可以定义一个延迟存储属性(`Lazy Stored Property`), 延迟存储属性只有在第一次使用的时候才会进行初始化
- `lazy`属性修饰必须是`var`, 不能是`let`
- `let`修饰的常量必须在实例的初始化方法完成之前就拥有值


```swift
class Car {
    init() {
        print("Car init")
    }
    
    func run() {
        print("Car is runing")
    }
}

class Person {
    lazy var car  = Car()
    init() {
        print("Person init")
    }
    
    func goOut() {
        car.run()
    }
}

let person = Person()
print("--------")
person.goOut()

// 输出结果
// Person init
// --------
// Car init
// Car is runing
```

上述代码, 在初始化`car`的时候如果没有`lazy`, 则输出结果如下

```swift
/*
Car init
Person init
--------
Car is runing
*/
```

- 这也就证明了延迟存储属性只有在第一次使用的时候才会被初始化
- 此外还有一种复杂的延迟存储属性, 有点类似于`OC`中的懒加载
- 下面代码中实际上是一个闭包, 可以吧相关逻辑处理放在闭包中处理


```
class Preview {
    lazy var image: Image = {
        let url = "https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/square3.png"
        let data = Data.init(contentsOf: url)
        return Image(data: data)
    }()
}
```


### 属性观察器

在`Swift`中可以为非`lazy`的并且只能是`var`修饰的存储属性设置属性观察器, 形式如下


```swift
struct Person {
    var age: Int {
        willSet {
            print("willSet", newValue)
        }
        didSet {
            print("didSet", oldValue, age)
        }
    }
    
    init() {
        self.age = 3
        print("Person init")
    }
}

var p = Person()
p.age = 10
print(p.age)

/* 输出结果
Person init
willSet 10
didSet 3 10
10
*/
```

- 在存储属性中定义`willSet`或`didSet`观察者，来观察和响应属性值的变化, 从上述输出结果我们也可以看到
    - `willSet`会传递新值, 在存储值之前被调用, 其默认的参数名是`newValue`
    - `didSet`会传递旧值, 在存储新值之后立即被调用, 其默认的参数名是`oldValue`
- 当每次给存储属性设置新值时，都会调用属性观察者，即使属性的新值与当前值相同
- 在初始化器中设置属性和在定义属性是设置初始值都不会触发`willSet`或`didSet`


## 类型属性

- 存储类型属性(`Stored Type Property`): 整个程序运行过程中就只有一份内存(类似全局变量)
- 计算类型属性(`Computed Type Property`): 不占用系统内存
- 类型属性可以通过`static`关键字定义; 如果是类也可以通过`class`关键字定义
- 存储类型属性可以声明为变量或常量，计算类型属性只能被声明为变量
- 存储类型属性必须设置初始值, 因为存数类型属性没有`init`初始化器去设置初始值的方式
- 存储类型属性默认就是延迟属性(`lazy`), 不需要使用`lazy`修饰符标记, 只会在第一次使用的时候初始化, 即使是被多个线程访问, 也能保证只会被初始化一次


```swift
// 在结构体中只能使用static
struct Person {
    static var weight: Int = 30
    static let height: Int = 100
}

// 取值
let a = Person.weight
let b = Person.height

// 赋值
Person.weight = 12
// let修饰的不可被赋值
//Person.height = 10
```

<div class="note info"><p>在类中可以使用`static`和`class`</p></div>




```swift
class Animal {
    static var name: String = "name"
    class var age: Int {
        return 10
    }
}

// 取值
let a1 = Animal.name
let a2 = Animal.age

// 赋值
Animal.name = "animal"
// class定义的属性是只读的
// Animal.age = 20
```




### `static`

- 可以修饰`class`、`struct`、`enum`类型的属性或者方法
- 被修饰的`class`中的属性和方法不可以在子类中被重写, 重写会报错
- 修饰存储属性
- 修饰计算属性
- 修饰类型方法


```swift
struct Person {
    // 存储属性
    static var weight: Int = 30
    // 计算属性
    static var height: Int {
        get { 140 }
    }
    // 类型方法
    static func goShoping() {
        print("Person shoping")
    }
}
```


### `class`

- 只能修饰类的计算属性和方法
- 不能修饰类的存储属性
- 修饰的计算属性和方法可以被子类重写


```swift
class Animal {
    // 计算属性
    class var height: Int {
        get { 140 }
    }
    // 类型方法
    class func running() {
        print("Person running")
    }
}
```


### 内存分析

先看下下面这行代码的内存地址

```swift
var num1 = 3
var num2 = 5
var num3 = 7
```


- 看到的核心汇编代码如下所示, 就是把3, 5, 7分别赋值给了三个全局变量
- 在汇编语言中, `rip`作为指令指针,
- `rip`中存储着`CPU`下一条要执行的指令的地址
- 一旦`CPU`读取一条指令, `rip`会自动指向下一条指令(存储下一条指令的地址)
- 比如下面代码中第二条指令中的`rip`存储的地址就是第三条指令的地址`0x10000138c`


```objc
0x10000137f <+15>:  xorl   %ecx, %ecx
// $0x3赋值给num1, 则num1的地址值就是: 0x10000138c + 0x5e6c = 0x1000071F8
0x100001381 <+17>:  movq   $0x3, 0x5e6c(%rip)        ; lazy cache variable for type metadata for Swift.Array<Swift.UInt8> + 4
// $0x5赋值给num2, 则num2的地址值就是: 0x100001397 + 0x5e69 = 0x100007200
0x10000138c <+28>:  movq   $0x5, 0x5e69(%rip)        ; SwiftLanguage.num1 : Swift.Int + 4
// $0x7赋值给num3, 则num3的地址值就是: 0x1000013a2 + 0x5e66 = 0x100007208
0x100001397 <+39>:  movq   $0x7, 0x5e66(%rip)        ; SwiftLanguage.num2 : Swift.Int + 4
0x1000013a2 <+50>:  movl   %edi, -0x1c(%rbp)
```


- 从上面三个内存地址可以看出三个全局变量的内存地址是相邻的
- 并且彼此相差8个字节, 因为每一个`Int`就占用8个字节
- 下面再看一下类型属性和全局变量的内存地址


```swift
class Animal {
    static var age: Int = 10
}

var num1 = 3
Animal.age = 7
var num2 = 5
```

<div class="note info"><p>相关汇编代码如图所示</p></div>



![property](https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/property.png)


根据图中的相关核心代码, 分别计算出`num1`, `age`和`num2`的内存地址如下

```objc
// $0x3赋值给num1, 则num1的地址值就是: 0x100000fd3 + 0x6785 = 0x100007330

// 通过register命令得到rax的地址为0x100007338, 即为age所在的内存地址

// $0x5赋值给num2, 则num2的地址值就是: 0x100001027 + 0x6319 = 0x100007340

/*
0x100007330
0x100007338
0x100007340
*/
// 上述三个内存地址同样也是相邻, 并且彼此相差8个字节
```


<div class="note success"><p>所以</p></div>

类型属性也可以理解为全局变量, 不同的是全局变量可以直接访问, 类型属性必须通过类名访问, 有一定的访问限制而已


### 线程安全

- 上面有提到, 存储类型属性默认就是延迟属性(`lazy`), 不需要使用`lazy`修饰符标记, 只会在第一次使用的时候初始化
- 即使是被多个线程访问, 也能保证只会被初始化一次, 是线程安全的



![property](https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/property.png)


- 从图中可以看出, 在断点处给类型属性`age`赋值之前, 执行了很多汇编代码
- 其中最重要的一条函数跳转指令`callq`


```objc
// 进入查看具体执行的那些操作
0x100000fda <+26>:  callq  0x1000010d0  ; SwiftLanguage.Animal.age.unsafeMutableAddressor : Swift.Int at main.swift
```

将断点加在此处, 执行`si`指令即可进入该模块


![property1](https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/property1.png)


- 这里看到`swift_once`, 自然就能够联想到`dispatch_once`和`OC`中的单例模式
- 那就继续向下看, 看看`swift_once`里面到底是如何操作的, 还是在`swift_once`加上断点, 并执行`si`指令, 如下图所示


![property2](https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/property2.png)


<div class="note success"><p>所以</p></div>

- 类型属性的线程安全最终就是通过`dispatch_once`实现的
- 属性的赋值操作相当于就是放在`dispatch_once`里面执行的, 保证`age`的初始化操作永远只被执行一次, 类似`OC`中的单例


---







