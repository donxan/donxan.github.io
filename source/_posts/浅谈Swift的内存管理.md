---
title: 浅谈Swift的内存管理
date: 2020-01-01 00:00:00
tags: [Swift5.1.2, weak, unowned, 内存管理]
categories: Swift学习笔记
image:
---


![Swift](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/swift.jpg?x-oss-process=style/titanjun)

<!-- more -->

- 原文博客地址: [浅谈Swift的内存管理](https://www.titanjun.top/浅谈Swift的内存管理.html)
- 2020年的第一篇博客, 算是2020年开了个好头, 希望能够继续坚持下去, 继续记录分享更多更高质量的文章
- 今年期待已久的`Swift5.0`稳定版就已经发布了, 感兴趣的小伙伴可看我的这篇博客:[Swift 5.0新特性更新](https://www.titanjun.top/Swift%205.0%E6%96%B0%E7%89%B9%E6%80%A7%E6%9B%B4%E6%96%B0.html)
- 这篇博客可主要分享`Swift`的内存管理的相关介绍和剖析, 测试环境: `Xcode 11.2.1`, `Swift 5.1.2`



## 内存管理

- 和`OC`一样, 在`Swift`中也是采用基于引用计数的`ARC`内存管理方案(针对堆空间的内存管理)
- 在`Swift`的`ARC`中有三种引用
  - 强引用(`strong reference`)：默认情况下，代码中涉及到的引用都是强引用
  - 弱引用(`weak reference`)：通过`weak`定义弱引用
  - 无主引用(`unowned reference`)：通过`unowned`定义无主引用


### weak

- 弱引用(`weak reference`)：通过`weak`定义弱引用
    - 必须是可选类型的`var`，因为实例销毁后，`ARC`会自动将弱引用设置为`nil`
    - `ARC`自动给弱引用设置`nil`时，不会触发属性观察
- 在介绍`weak`弱引用之前, 先看一下下面一段代码

```swift
class Animal {
    deinit {
        print("Animal deinit")
    }
}

func test() {
    let animal = Animal()
}

print("will deinit")
test()
print("did deinit")
```

上面这段代码中在`test`函数调用结束之后, 该作用的内存就会被回收, `animal`对象自然就会被销毁, 毫无疑问上面的输出结果应该是

```swift
will deinit
Animal deinit
did deinit
```

同样下面这段代码, 同样也是在`a1`对象被置为`nil`的时候内存会被回收, 对象就会被销毁

```swift
var a1: Animal? = Animal()
print("will deinit")
a1 = nil
print("did deinit")
```

- 下面是一个被`weak`修饰的弱引用对象, 
- 我们都知道, 被`weak`修饰的弱引用对象, 在对象销毁的时候, 会被自动置为`nil`
- 所以被`weak`修饰的弱引用对象必须是可选类型的`var`, 两个条件缺一不可

```swift
weak var a2: Animal? = Animal()

// 以下两种方式都会报错的
weak var a2: Animal = Animal()
weak let a2: Animal? = Animal()
```

### unowned

- 无主引用(`unowned reference`)：通过`unowned`定义无主引用
- 不会产生强引用，实例销毁后仍然存储着实例的内存地址(类似于OC中的`unsafe_unretained`）
- 试图在实例销毁后访问无主引用，会产生运行时错误（如下野指针)
    

```
Fatal error: Attempted to read an unowned reference but object 0x0 was already deallocate
```

<div class="note warning"><p>需要注意的是</p></div>

`weak`、`unowned`只能用在类实例上面, 如下所示


```swift
// 该协议表示只能被类遵守, AnyObject代表所有的类实例
protocol Liveable: AnyObject {}
class Person {}

weak var p0: Person?
weak var p1: AnyObject?
// 所有能遵循Liveable协议的肯定都是类
weak var p2: Liveable?

unowned var p10: Person?
unowned var p11: AnyObject?
unowned var p12: Liveable?
```


## 循环引用

- `weak`、`unowned`都能解决循环引用的问题，`unowned`要比`weak`少一些性能消耗
- 在生命周期中可能会变为`nil`的使用`weak`
- 初始化赋值后再也不会变为`nil`的使用`unowne`
- 说道循环引用就自然想到了闭包


### 闭包的循环引用

闭包表达式默认会对用到的外层对象产生额外的强引用（对外层对象进行了`retain`操作）, 看一下下面的代码中`deinit`会被调用吗?


```swift
class Person {
    var fn: (() -> ())?
    func run() { print("run") }
    deinit { print("deinit") }
}

func test() {
    let p = Person()
    p.fn = { 
        p.run()
    }
}

test()
```


- 上面代码中, `p`对象强引用着`fn`闭包, `fn`闭包也强引用着`p`对象, 自然就造成了循环引用问题
- 最后没有任何输出结果, 我们看一下上述代码的汇编执行过程


![weak](https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/weak.png)

- 从上面汇编代码可以看出, 整个过程经历了
- 一次`init`引用计数为: 1
- 一次`retain`引用计数会加(1), 结果为: 2
- 一次`release`引用计数会减(1), 结果为: 1
- 那么最后的引用计数就是1, 所以`p`对象肯定没有被释放
- 下面是使用解决循环引用的情况
    - 在闭包表达式的捕获列表里, 声明`weak`或`unowned`引用，用以解决循环引用问题


```swift
// 使用weak
func test() {
    let p = Person()
    p.fn = { [weak p] in
        p?.run()
    }
}

// 使用unowned
func test() {
    let p = Person()
    p.fn = { [unowned p] in
        p.run()
    }
}
```

- 上述两种方式都可以解决循环引用的问题, 运行后就发现`Person`对象调用了`deinit`
- 这里我们再看一下汇编代码如下, 从下面汇编代码中可以很明显看到, 引用计数最后为0, 对象被释放

![weak](https://titanjun.oss-cn-hangzhou.aliyuncs.com/swift/weak1.png)


<div class="note success"><p>下面这段代码其实是等价的</p></div>


```swift
func test() {
    let p = Person()
    p.fn = { [unowned p] in
        p.run()
    }
}

// 和上面等价代码
func test() {
    let p = Person()
    p.fn = { [unowned ownedP = p, weak weakP = p] in
        ownedP.run()
        // weakP?.run()
    }
}
```

<div class="note warning"><p>特别注意点</p></div>

这里要区分捕获列表和参数列表, 下面看看`fn`有参数的情况下


```swift
class Person {
    var fn: ((Int) -> ())?
    func run() { print("run") }
    deinit { print("deinit") }
}

func test() {
    let p = Person()
    p.fn = {
        (num) in
        print("num = \(num)")
    }
}
```

那么闭包的参数列表和捕获列表同时存在的情况如下代码所示

```swift
func test() {
    let p = Person()
    p.fn = {
        [weak p](num) in
        print("num = \(num)")
        p?.run()
    }
}
```

### self的循环引用

- 如果想在引用闭包的同时引用`self`, 这个闭包必须是`lazy`的
- 因为实例在初始化完毕之后才能引用`self`


```swift
class Person {
    lazy var fn: (() -> ()) = {
        self.run()
    }
    func run() { print("run") }
    deinit { print("deinit") }
}

func test() {
    let p = Person()
    p.fn()
}

test()
```

- 上面代码中如果`fn`闭包去掉`lazy`, 编译器会直接报错
- 在`Swift`中, 为了保证初始化的安全, 设定了两段式初始化, 在所有的存储属性被初始化完成之后, 初始化器才能够使用`self`
- 而且在上述`fn`闭包中, 如果`fn`内部用到了实例成员(属性和方法), 则编译器会强制要求明确写出`self`
- `lazy`既保证只有在使用的时候才会被初始化一次
- 但是上述代码同样存在循环引用的问题, `Person`对象强引用着`fn`闭包, `fn`闭包也强引用着`self`
- 同样使用`weak`和`unowned`解决循环引用的问题


```swift
// weak解决循环引用
lazy var fn: (() -> ()) = {
    [weak self] in
    self?.run()
}

// unowned解决循环引用
lazy var fn: (() -> ()) = {
    [unowned self] in
    self.run()
}
```

另外再看看下面这种情况, 是都存在循环引用的问题

```swift
class Student {
    var age: Int = 2
    lazy var getAge: Int = {
        self.age
    }()
    deinit { print("deinit") }
}

func test() {
    let p = Student()
    print(p.getAge)
}

test()

/* 输出结果
2
deinit
*/
```



通过输出结果看一看出调用了`deinit`, 说明对象最终被释放, 并未出现循环引用的问题, 下面比较一下

```swift
// 存在循环引用
class Person {
    lazy var fn: (() -> ()) = {
        self.run()
    }
    func run() { print("run") }
    deinit { print("deinit") }
}

// 不存在循环引用
class Student {
    var age: Int = 2
    lazy var getAge: Int = {
        self.age
    }()
    deinit { print("deinit") }
}
```

- 上述两种写法的区别, 本质上说
- `Person`对象中的`fn`闭包属于闭包赋值
- `Student`对象那个中的`getAge`属于闭包调用(类似函数调用)
- 相当于在在`Student`对象调用`getAge`结束之后, 作用域内的变量就会被释放

```swift
// getAge也可以写成如下形式
lazy var getAge: Int = {
    return self.age
}()

// 也可以理解为
lazy var getAge: Int = self.age
```

## 内存访问冲突

在`Swift`中的内存访问冲突主要在两个访问满足下列条件时发生
- 至少一个是写入操作
- 它们访问的是同一块内存
- 它们的访问时间重叠(比如在同一个函数内)
- 对比看看以下两个函数操作

```swift
// 不存在内存访问冲突
var number = 1
func plus(_ num: inout Int) -> Int {
    return num + 1
}
number = plus(&number)

// 存在内存访问冲突
var step = 1
func increment(_ num: inout Int) {
    num += step
}
increment(&step)
```

上面第二部分代码就是同时对`step`变量执行读写操作, 运行时会报出如下错误


```
Simultaneous accesses to 0x100002028, but modification requires exclusive access.
```

再看下面对于结构体和元组的使用, 这里先定义一个全局函数和一个结构体

```swift
// 改变两个传入参数的值, 读取并修改传入参数的值
func balance(_ x: inout Int, _ y: inout Int) {
    let sum = x + y
    x = sum / 2
    y = sum - x
}

// 定义Player结构体
struct Player {
    var name: String
    var health: Int
    var energy: Int
    mutating func shareHealth(with teammate: inout Player) {
        balance(&teammate.health, &health)
    }
}
```

再看下面的使用示例, 两者都会有一个内存访问冲突的错误


```swift
// 这里读写的是同一个maria
var maria = Player(name: "Maria", health: 50, energy: 10)
balance(&maria.health, &maria.energy)

// 这里读写的是同一个tuple
var tuple = (health: 10, energy: 20)
balance(&tuple.health, &tuple.energy)
```

但是有时候的确会有上面这种访问同一块内存的需求, 如果下面的条件满足, 就说明重叠访问结构体的属性是安全的
- 访问的是实例存储属性, 不是计算属性或者类属性
- 结构体是局部变量而非全局变量
- 结构体要么没有被闭包捕获要么只被非逃逸闭包捕获


```swift
// 这里可以在局部作用域内定义成局部变量, 就不会有问题了
func test() {
    var maria = Player(name: "Maria", health: 50, energy: 10)
    var tuple = (health: 10, energy: 20)
    balance(&tuple.health, &tuple.energy)
    balance(&maria.health, &maria.energy)
}
```


## 指针


```swift
class Person {}
var person = Person()
```

- 在`Swift`中`class`声明的类(`Person`)是引用类型, 初始化的`person`对象其本质上就是一个指针变量
- 而`person`里面存储的就是这个指针变量的地址值, 也就可以根据这个地址值去访问被分配的内存空间
- 指针在某种意义上被定性为不安全的, 举个例子:
  - 当前指针变量的地址值对应的空间只有32个字节, 但有可能访问的是超过32个字节的空间, 这样就可能会出问题的


### 指针分类

在`Swift`中也有专门的指针类型，这些都被定性为`Unsafe`（不安全的），常见的有以下4种类型
- `UnsafePointer<Pointee>`, 类似于C语言中的`const Pointee *`, 只能访问内存不能修改内存, 这里的`Pointee`是指泛型
- `UnsafeMutablePointer<Pointee>`类似于C语言中的`Pointee *`, 可以访问和修改内存, 这里的`Pointee`是指泛型 
- `UnsafeRawPointer`类似于`const void *`, 不支持泛型
- `UnsafeMutableRawPointer`类似于`void`, 不支持泛型


下面看一下具体的使用示例


```swift
var age = 10
func sum1(_ ptr: UnsafeMutablePointer<Int>) {
    // 通过访问pointee属性, 获取ptr指针的内存地址所存储的值
    // UnsafeMutablePointer的pointee属性是可读可写的
    ptr.pointee += 10
}
func sum2(_ ptr: UnsafePointer<Int>) {
    // UnsafePointer的pointee属性是只读的
    // ptr.pointee += 10
    print(ptr.pointee)
}
func sum3(_ num: inout Int) {
    // 
    num += 10
}

// 和inout输入输出参数一样接受变量的地址值
sum1(&age)
sum2(&age)
sum3(&age)
print(age)


func sum4(_ ptr: UnsafeMutableRawPointer) {
    // 可读可写, 取值
    print("age = ", ptr.load(as: Int.self))
    // 可读可写, 赋值
    ptr.storeBytes(of: 50, as: Int.self)
}
func sum5(_ ptr: UnsafeRawPointer) {
    // 只读, 取值
    print("age = ", ptr.load(as: Int.self))
}

sum4(&age)
sum5(&age)
```


### 获得变量的指针

`Swift`中有可以直接获取变量的指针的方法

```swift
// 获取可变的变量指针, value参数接受变量地址
@inlinable public func withUnsafeMutablePointer<T, Result>(to value: inout T, _ body: (UnsafeMutablePointer<T>) throws -> Result) rethrows -> Result
// 获取不可变的变量指针, value参数接受变量
@inlinable public func withUnsafePointer<T, Result>(to value: T, _ body: (UnsafePointer<T>) throws -> Result) rethrows -> Result
// 获取不可变的变量指针, value参数接受变量地址
@inlinable public func withUnsafePointer<T, Result>(to value: inout T, _ body: (UnsafePointer<T>) throws -> Result) rethrows -> Result
```


上述方法中返回值默认是变量的指针地址, 也可以是其他的数据类型, 主要取决于`body`闭包的返回值, 返回值类型由闭包中的`Result`泛型决定


```swift
var age = 10
var ptr1 = withUnsafeMutablePointer(to: &age) { $0 }   // UnsafeMutablePointer<Int>
var ptr2 = withUnsafePointer(to: &age) { $0 }          // UnsafePointer<Int>
ptr1.pointee = 22
print(ptr2.pointee) // 22
print(ptr2)         // 0x0000000100008310

var ptr3 = withUnsafeMutablePointer(to: &age) { UnsafeMutableRawPointer($0) }   // UnsafeMutableRawPointer
var ptr4 = withUnsafePointer(to: &age) { UnsafeRawPointer($0) }                 // UnsafeRawPointer
// as参数是需要存储什么类型的数据
ptr3.storeBytes(of: 33, as: Int.self)
print(ptr4.load(as: Int.self)) // 33
print(ptr4)         // 0x0000000100008310
```


### 创建指针

- 之前获取到的指针都是根据已经存在的内存获取的
- 这里就看看重新分配一块内存指向堆空间


#### malloc

`Swift`提供了`malloc`直接分配内存创建指针的方式


```swift
// 根据需要分配的内存大小创建一个指针
public func malloc(_ __size: Int) -> UnsafeMutableRawPointer!
// 释放内存
public func free(_: UnsafeMutableRawPointer!)


// 下面这两个函数, 是赋值和取值的函数, 之前简单介绍过
// 参数一: 需要存储的值
// 参数二: 偏移量, 从第几个字节开始存储, 默认从第一个
// 参数三: 需要存储的值的类型
@inlinable public func storeBytes<T>(of value: T, toByteOffset offset: Int = 0, as: T.Type)

// 参数一: 偏移量, 从第几个字节开始存储, 默认从第一个
// 参数二: 需要存储的值的类型
@inlinable public func load<T>(fromByteOffset offset: Int = 0, as type: T.Type) -> T
```

代码示例如下


```swift
// 创建指针
var ptr = malloc(16)
// 存储值
ptr?.storeBytes(of: 10, as: Int.self)
// 这里toByteOffset参数如果传0, 就会覆盖前8个字节的数据
ptr?.storeBytes(of: 12, toByteOffset: 8, as: Int.self)
// 取值
print(ptr?.load(as: Int.self) ?? 0)
print(ptr?.load(fromByteOffset: 8, as: Int.self) ?? 0)
// 销毁, 释放内存
free(ptr)
```

#### allocate

使用`allocate`方式创建指针, 代码示例如下


```
// byteCount: 需要申请的字节数, alignment: 对其字节数
var ptr2 = UnsafeMutableRawPointer.allocate(byteCount: 16, alignment: 1)
// 存储
ptr2.storeBytes(of: 9, as: Int.self)

// 根据字节偏移存储
// 这里的ptr3是ptr2偏移8个字节的新的指针地址
var ptr3 = ptr2.advanced(by: 8)  // UnsafeMutableRawPointer
ptr3.storeBytes(of: 12, as: Int.self)

// 上面这种方式等价于
ptr2.storeBytes(of: 12, toByteOffset: 8, as: Int.self)

// 取值同样
print(ptr2.load(as: Int.self))
// 下面这两种取值方式也是一样的
print(ptr2.advanced(by: 8).load(as: Int.self))
print(ptr2.load(fromByteOffset: 8, as: Int.self))

// 释放内存
ptr2.deallocate()
```

<div class="note warning"><p>这里需要注意的地方</p></div>

- 只有`UnsafeMutableRawPointer`才有`allocate`分配方法, `UnsafeRawPointer`是没有这个方法的
- 下面说到的`UnsafeMutablePointer<T>`类型也是, `UnsafePointer<T>`没有`allocate`分配方法



```swift
// capacity: 容量, 即可以存储3个Int类型的数据, 也就是24个字节
var ptr = UnsafeMutablePointer<Int>.allocate(capacity: 3)
// 初始化内存, 用10初始化钱8个字节
ptr.initialize(to: 10)
// 用10初始化前两个容量的内存, 即16个字节
ptr.initialize(repeating: 10, count: 2)
// 使用successor获取下一个存储位, 也就是下一个Int的位置
var ptr1 = ptr.successor()  //  UnsafeMutablePointer<Int>
ptr1.initialize(to: 20)
// 存储第三个Int值
ptr.successor().successor().initialize(to: 30)

// 取值的两种方式
print(ptr.pointee)        // 第一个值
print((ptr + 1).pointee)  // 第二个值
print((ptr + 2).pointee)  // 第三个值

// 下面这种方式和上面等价
print(ptr[0])
print(ptr[1])
print(ptr[2])

// 前面如果使用了initialize, 则必须调用反初始化
// 而且count要和上面allocate(capacity: 3)的capacity一致, 否则会造成内存泄露的问题
ptr.deinitialize(count: 3)
ptr.deallocate()
```


### 指针之间的转换

前面提到过`Swift`中的指针类型有四种
- `UnsafePointer<Pointee>`类似于`const Pointee *`
- `UnsafeMutablePointer<Pointee>`类似于`Pointee *`
- `UnsafeRawPointer`类似于`const void *`
- `UnsafeMutableRawPointer`类似于`void *`
- 那么上面的类型, 能否通过其中的一种创建另外一种指针呢, 下面我们来看一下


#### init

`UnsafeMutableRawPointer`中有一个初始化方法可以根据`UnsafeMutablePointer`创建自身

```swift
public init<T>(_ other: UnsafeMutablePointer<T>)

var ptr = UnsafeMutablePointer<Int>.allocate(capacity: 3)
var ptr1 = UnsafeMutableRawPointer(ptr)
```


#### assumingMemoryBound

反过来, `UnsafeMutableRawPointer`也提供了一个方法用于创建`UnsafePointer`

```swift
public func assumingMemoryBound<T>(to: T.Type) -> UnsafePointer<T>

var ptr = UnsafeMutableRawPointer.allocate(byteCount: 16, alignment: 1)
var ptr1 = ptr.assumingMemoryBound(to: Int.self)
// 初始化前8个字节
ptr1.pointee = 11
// 初始化后8个字节
// 特别注意, 这里的(ptr + 8)是指ptr向后偏移8个字节, 要和之前的区分开
(ptr + 8).assumingMemoryBound(to: Int.self).pointee = 12

ptr.deallocate()
```


#### unsafeBitCast

`unsafeBitCast`是忽略数据类型的强制转换，不会因为数据类型的变化而改变原来的内存数

```swift
// 把第一个参数类型转成第二个参数类型
@inlinable public func unsafeBitCast<T, U>(_ x: T, to type: U.Type) -> U


var ptr = UnsafeMutableRawPointer.allocate(byteCount: 16, alignment: 1)
unsafeBitCast(ptr, to: UnsafeMutablePointer<Int>.self).pointee = 13
// 注意, 这里的(ptr + 8)是指ptr向后偏移8个字节, 要和之前的区分开
unsafeBitCast(ptr + 8, to: UnsafeMutablePointer<Double>.self).pointee = 14.23

ptr.deallocate()
```


---





