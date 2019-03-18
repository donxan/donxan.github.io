---
title: Swift 5.0新特性更新
date: 2019-01-28 15:20:40
tags: [Swift5.0, dynamicCallable]
categories: Swift学习笔记
image:
---



![Swift](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/swift.jpg?x-oss-process=style/titanjun)

<!-- more -->


- 期待已久的`Swift 5.0`终于来啦, `Swift 5.0`是`Swift`中最备受关注的一个版本, 传说中`ABI`稳定的版本
- 随着`Xcode Bate 10.2`的发布, `Swift 5.0`也发布了测试版, 相信也带来了很多优化和改进
- 下面运行环境都是在`Xcode Bate 10.2`环境中进行的


## 新特性

### dynamicCallable

- [SE-0216](https://github.com/apple/swift-evolution/blob/master/proposals/0216-dynamic-callable.md)
- `@dynamicCallable`为`Swift`添加了一个新属性, 允许使用一个简单的语法糖调用函数一样调用命名类型
- 如果需要添加`@dynamicCallable`属性, 就必须要实现以下方法中的一个或者两个


```swift
func dynamicallyCall(withArguments args: [Int]) -> Double

func dynamicallyCall(withKeywordArguments args: KeyValuePairs<String, Int>) -> Double
```

<div class="note warning"><p>注意点</p></div>

- 除了接受各种输入外，您还可以为各种输出提供多个重载, 自定义返回值, 可以是`String`, `Int`等等......
- `KeyValuePairs`的使用和介绍, 没有使用过的[可参考](https://www.titanjun.top/2018/06/06/Swift%204.2%20%E6%96%B0%E7%89%B9%E6%80%A7%E6%9B%B4%E6%96%B0/#KeyValuePairs)


下面看一个例子, `RandomNumberGenerator`生成一个随机数

<div class="note info"><p>`Swift 5.0`之前的定义和调用方式</p></div>


```swift
// 定义方式
struct RandomNumberGenerator {
    func generate(numberOfZeroes: Int) -> Double {
        let maximum = pow(10, Double(numberOfZeroes))
        return Double.random(in: 0...maximum)
    }
}


// 调用方式
let random = RandomNumberGenerator()
let num = random.generate(numberOfZeroes: 2)
print(num)
```

<div class="note info"><p>在`Swift 5.0`使用`@dynamicCallable`属性</p></div>


```swift
// 定义方式
@dynamicCallable
struct RandomNumberGenerator {
    func dynamicallyCall(withArguments args: [Int]) -> Double {
        let numberOfZeroes = Double(args.first ?? 0)
        let maximum = pow(10, numberOfZeroes)
        return Double.random(in: 0...maximum)
    }
}


// 调用方式
let random = RandomNumberGenerator()
let num = random(2)
// random(2)等同于random.dynamicallyCall(withArguments: [2])
print(num)
```

<div class="note warning"><p>`@dynamicCallable`使用注意事项</p></div>

- 可以将它应用于结构，枚举，类和协议。
- 如果你实现`withKeywordArguments:`并且没有实现`withArguments:`，你仍然可以在没有参数标签的情况下调用
- 如果你的实现`withKeywordArguments:`或`withArguments:`时标记为`throw`，则调用该类型也将被抛出`throw`
- 扩展名无法添加`@dynamicCallable`，只能添加到主要类型上
- 仍然可以为你定义的类型添加其他方法和属性，并且能够正常使用


### [WritableKeyPath](https://developer.apple.com/documentation/swift/writablekeypath?language=objc)

- [SE-0227](https://github.com/apple/swift-evolution/blob/master/proposals/0227-identity-keypath.md)
- 添加引用标识键路径的功能，该路径指的是应用它的整个输入值
- `Swift`中的每个值都有一个特殊的伪属性.self，它指的是整个值


```
let id = \Int.self  
var x = 1
print(id)   ////Swift.WritableKeyPath<Swift.Int, Swift.Int>
x.self = 2
print(x)   //2
print(x.self)  //2

print(x[keyPath: id])  //2
x[keyPath: id] = 3
print(x[keyPath: id])  //3
```

### 可选参数

在`Swift 5`之前，可以编写一个带有可变参数的枚举, 但是在`Swift 5`开始, 调用时会报错, 如下


```swift
enum X {
    // 此处定义切没有调用时不会报错
    case foo(bar: Int...) 
}

func baz() -> X {
    // 此处调用时会报错
    return .foo(bar: 0, 1, 2, 3) 
} 
```

在`Swift 5`之后, 上述定义改成数组参数, 而不是可变参数, 如下

```swift
enum X {
    case foo(bar: [Int]) 
} 

func baz() -> X {
    return .foo(bar: [0, 1, 2, 3]) 
} 
```


### Raw Strings

#### `\`处理

- [SE-0200](https://github.com/apple/swift-evolution/blob/master/proposals/0200-raw-string-escaping.md)增加了创建原始字符串的功能，其中反斜杠和引号被解释为文字符号，而不是转义字符或字符串终止符
- 单行字符串文字可以用反斜杠填充, 以保证原字符串, 否则会报错

```swift
// 文字引用类型
// 错误写法
let quote = "Alice: "How long is forever?" White Rabbit: "Sometimes, just one second.""
// 正确写法
let quote1 = "Alice: \"How long is forever?\" White Rabbit: \"Sometimes, just one second.\""


// 正则表法式类型
// 错误写法
let ucCaseCheck = "enum\s+.+\{.*case\s+[:upper:]"
// 正确写法
let ucCaseCheck = "enum\\s+.+\\{.*case\\s+[:upper:]"
```

#### `#`处理

- 要使用原始字符串, 可使用`#`将字符串包裹起来
- `#`字符串开头和结尾的符号成为字符串分隔符的一部分，因此如下`Swift`理解`“rain”`和`“Spain”`周围的独立引号应该被视为文字引号而不是结束字符串
- 原始字符串也允许使用反斜杠, 但是将反斜杠视为字符串中的文字字符，而不是转义字符

```Swift
let rain = #"The "rain" in "Spain" falls mainly on the Spaniards."#

let keypaths = #"Swift keypaths such as \Person.name hold uninvoked references to properties."#

let answer = 42
let dontpanic = #"The answer to life, the universe, and everything is \#(answer)."#
```

<div class="note warning"><p>注意</p></div>

- 上面使用`\#(answer)`引用变量而不是`\(answer)`, 因为在用`#`包裹的字符串中反斜杠将会被失败别为文字字符而不是转义字符, 所以必须额外的添加`#`


#### `##`处理

- 在字符串的开头和结尾使用`#`处理, 在字符串中可以使用反斜杠等特殊字符, 那如果字符串中需要使用`#`, 又该如何处理??
- 使用`#`包裹字符串, 默认会以`#`为字符串的结束符号, `#`后面的文字将不再处理, 在这种情况下, 我们会使用`##`处理
- 注意: 字符串的开头和结尾的标识必须一样


```Swift
let str = ##"My dog said "woof"#gooddog"##

```

#### 多行字符串

原始字符串与`Swift`的多行字符串系统完全兼容 - 只需用于`#"""`启动，然后`"""#`结束

```Swift
let multiline = #"""
    The answer to life,
    the universe,
    and everything is \#(answer).
    """#
```

### `try?`嵌套

先看下面代码

```swift
struct User {
    var id: Int

    init?(id: Int) {
        if id < 1 {
            return nil
        }

        self.id = id
    }

    func getMessages() throws -> String {
        // complicated code here
        return "No messages"
    }
}
```

在`Swift4.2`及其之前的版本中

```swift
let user = User(id: 1)
// 这里得到的message的类型是: let messages: String??
let messages = try? user?.getMessages()

// 如果我们想得到非可选值就需要
print((messages ?? "") ?? "")
// 或者多次强解, 当然不建议强解写法
print(messages!!)
```

- 在`Swift4.2`及其之前的版本中, 上面返回的是一个2层嵌套的可选值, 如果有多层嵌套处理起来也是相当更麻烦的
- 在`Swift 5`中就完美的解决了这个问题, 如果当前值是可选的, 那么`try?`将不会将值包装在可选值中, 因此最终结果只是一个`String?`
- 因此在`Swift 5`中无论有多少可嵌套的可选最后, 返回值永远只是一个可选值
- 同样，如果你使用了可选的链接`as?`，你仍然只有一个级别的可选性

```Swift
let user = User(id: 1)
// 类型: let messages: String?
let messages = try? user?.getMessages()

print(messages ?? "")
```

### `isMultiple`

- [SE-0225](https://github.com/apple/swift-evolution/blob/master/proposals/0225-binaryinteger-iseven-isodd-ismultiple.md)为整数类型添加了一个方法`isMultiple`
- 该方法可以检查一个证书是否为另一个整数的倍数

```Swift
let rowNumber = 4

if rowNumber.isMultiple(of: 2) {
    print("Even")
} else {
    print("Odd")
}

// 该方法等效于
if rowNumber % 2 == 0 {}
```

### `count`

- [SE-0220](https://github.com/apple/swift-evolution/blob/master/proposals/0220-count-where.md)
- 在`Swift`之前的版本中, 有一个函数`filter`可以过滤出数组中符合条件的的元素, 组成一个新的数组, 详细使用可参考[Swift函数式编程之高级用法](https://www.titanjun.top/2017/05/19/Swift%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E4%B9%8B%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95/)
- 在`Swift 5`中新增了一个函数`count(where:)`, 可以获取数组中符合条件的元素的个数


```Swift
let arr = [1, 2, 34, 5, 6, 7, 8, 12, 45, 6, 9]

let filter = arr.filter({ $0 > 10 })
print(filter)  //[34, 12, 45]

let count = arr.count(where: { $0 > 10 })
print(count)  // 3
```

### `compactMapValues`

- 在`Swift4.x`的版本有两个函数`compactMap`和`mapValues`
- `compactMap`: 返回一个操作后得到的新的数组, 类似`flatMap`
- `mapValues`: 字典中的函数, 对字典的`value`值执行操作, 返回改变`value`后的新的字典

```Swift
let times = [
    "first": 2,
    "second": 43,
    "three": 12,
    "four": 3
]

let compact = times.compactMap({ $0.value > 10 })
print(compact)
// [true, false, true, false]

let mapValues = times.mapValues({ $0 + 2 })
print(mapValues)
// ["second": 45, "first": 4, "three": 14, "four": 5]
```

- [SE-0218](https://github.com/apple/swift-evolution/blob/master/proposals/0218-introduce-compact-map-values.md)在`Swift 5`中新增了一个函数`compactMapValues`
- `compactMapValues`是将上述两个方法的功能合并在一起, 返回一个对`value`操作后的新字典, 并且自动过滤不符合条件的键值对

```Swift
let times1 = [
    "Hudson": "38",
    "Clarke": "42",
    "Robinson": "35",
    "Hartis": "DNF"
]

let comMap2 = times1.compactMapValues({ Int($0) })
print(comMap2)
// ["Clarke": 42, "Robinson": 35, "Hudson": 38]
```

### `SubSequence`

- [`Sequence`](https://developer.apple.com/documentation/swift/sequence?language=objc)协议不再具有`SubSequence`关联类型。先前返回`SubSequence`的`Sequence`方法现在会返回具体类型
- 使用`SubSequence`的`Sequence`扩展应该修改为类似地使用具体类型，或者修改为[`Collection`](https://developer.apple.com/documentation/swift/collection?language=objc)的扩展，在[`Collection`](https://developer.apple.com/documentation/swift/collection?language=objc)中`SubSequence`仍然可用



```swift
// swift 5不在支持
extension Sequence {
    func dropTwo() -> SubSequence {
        return self.dropFirst(2)
    }
}


// 建议改为
extension Sequence {
    func dropTwo() -> DropFirstSequence<Self> { 
        return self.dropFirst(2)
    }
}

// 或者
extension Collection {
    func dropTwo() -> SubSequence {
        return self.dropFirst(2)
    }
}
```



## 其他相关更新

### [SE-0214](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fapple%2Fswift-evolution%2Fblob%2Fmaster%2Fproposals%2F0214-DictionaryLiteral.md)

`DictionaryLiteral`类型重命名为`KeyValuePairs`


### [SE-0238](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fapple%2Fswift-evolution%2Fblob%2Fmaster%2Fproposals%2F0238-package-manager-build-settings.md)

- 在使用`Swift 5`软件包管理器时，`Targets`可以声明一些常用的针对特定目标的`build settings`设置
- 新设置也可以基于平台和构建配置进行条件化处理。包含的构建设置支持`Swift`和`C`语言定义，`C`语言头文件搜索路径，链接库和链接框架


### [SE- 0236](https://github.com/apple/swift-evolution/blob/master/proposals/0236-package-manager-platform-deployment-settings.md)

- 在使用`Swift 5`时, 可以自定义所支持的最低版本号, 如果该项目的依赖包所支持的最低版本大于项目的最低版本号, 则项目会报错


### [SR-695](https://link.juejin.im/?target=https%3A%2F%2Fbugs.swift.org%2Fbrowse%2FSR-695)

在`Swift 5`中不再支持返回`Self`的类方法

```swift
// 不在支持
class Base { 
    class func factory() -> Self { /*...*/ }
} 
```

### [SR-631](https://bugs.swift.org/browse/SR-631)

不同文件中的扩展名无法相互识别


```swift
class FirstClass { }

extension FirstClass {
    class SecondClass { }
}

// 这里将会报错: "SecondClass is not a member type of FirstClass"
extension FirstClass.SecondClass { 
    class ThirdClass { }
}
```

### [SR-7251](https://bugs.swift.org/browse/SR-7251)

在`Swift 5`中, 在所声明的类里面, 所声明的变量名不能和类名一样


```swift
struct S {}
extension S {
  static var i: Int { return 0 }
  struct i {} // error: “i”的声明无效
}

// 下面的方式是没有问题的
struct S1<T> {}
extension S1 {
  static var i: Int { return 0 }
  struct i {} // This is fine!
}
```



### 参考文献

- [Swift 5官方文档](https://developer.apple.com/documentation/xcode_release_notes/xcode_10_2_beta_release_notes/swift_5_release_notes_for_xcode_10_2_beta?language=objc)
- [What’s new in Swift 5.0](https://www.hackingwithswift.com/articles/126/whats-new-in-swift-5-0)




---


