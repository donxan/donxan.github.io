---
title: Swift函数式编程之高级用法
date: 2017.05.19 16:57:03
tags: [Swift, 语法, filter, reduce]
categories: 高级用法
---

- 什么是函数式编程呢?
  - 函数式编程其实是一种编程思想, 代码写出来只是它的表现形式.
  - 在面向对象的编程思想中, 我们将要解决的一个个问题, 抽象成一个个类, 通过给类定义属性和方法, 让类帮助我们解决需要处理的问题.(其实面向对象也叫命令式编程, 就像给对象下一个个命令)
  - 而在函数式编程中, 我们则通过函数描述我们要解决的问题, 以及解决问题需要怎样的方案.
  - 函数本身可以作为变量, 作为参数, 作为返回值(这样说有一点抽象, 下面的解决方案中就是将函数作为函数的参数)

<!-- more -->

### 1. Map的介绍
> map用于将每个数组元素通过某个方法进行转换

- Map在此处并非地图的意思, 它的含义是映射
  - 将一个元素映射成另外一种元素(类似于字典中的Key/Value映射)
  - 其实Swift系统本身是有映射的函数, 可以将一个集合映射成另外一个集合
  - map 方法接受一个闭包作为参数， 然后它会遍历整个数组，并对数组中每一个元素执行闭包中定义的操作。然后再返回一个操作后的数组；相当于对数组中的所有元素做了一个映射

> #### 示例分析:
##### 实例一

```objc

let arr = [1,2,3,4,5,6]
let arr2 = arr.map({ $0 * 3})
//[3, 6, 9, 12, 15, 18]
let arr3 = arr.flatMap({ $0 + 2 })
//[3, 4, 5, 6, 7, 8]

```

### 2. flatMap
- 我们对同样的数组使用 flatMap 进行处理， 得到了同样的结果。 那 flatMap 和 map 到底有什么区别呢？

#### 实例二

```objc
let numbersCompound = [[1,2,3],[4,5,6]];
var res = numbersCompound.map { $0.map{ $0 + 2 } }
// [[3, 4, 5], [6, 7, 8]]
var flatRes = numbersCompound.flatMap { $0.map{ $0 + 2 } }
// [3, 4, 5, 6, 7, 8]
```

- flatMap 依然会遍历数组的元素，并对这些元素执行闭包中定义的操作。 但唯一不同的是，它对最终的结果进行了所谓的 “降维” 操作。 本来原始数组是一个二维的， 但经过 flatMap 之后，它变成一维的了。

> 下面咱们再来看一下 flatMap 的定义, 还是抛去 @noescape, rethrows 这些无关逻辑的关键字：

```objc
func flatMap(transform: (Self.Generator.Element) throws -> T?) -> [T]
func flatMap(transform: (Self.Generator.Element) -> S) -> [S.Generator.Element]
```
- 和 map 不同， flatMap 有两个重载。 参照我们刚才的示例， 我们调用的其实是第二个重载：flatMap 的闭包接受的是数组的元素，但返回的是一个 SequenceType 类型，也就是另外一个数组
> 下面让我们来看看flatMap 的另一种重载情况

```objc
func flatMap
(transform: (Self.Generator.Element) -> T?) -> [T]
```

- 从定义中我们看出， 它的闭包接收的是 Self.Generator.Element 类型， 返回的是一个 T? 。 我们都知道，在 Swift 中类型后面跟随一个 ?， 代表的是 Optional 值。 也就是说这个重载中接收的闭包返回的是一个 Optional 值。 更进一步来说，就是闭包可以返回 nil。

#### 实例三

```objc
let optionalArray: [String?] = ["AA", nil, "BB", "CC"];
print（optionalArray）
//[Optional("AA"), nil, Optional("BB"), Optional("CC")]

var optionalResult = optionalArray.flatMap{ $0 }
// ["AA", "BB", "CC"]
```

- flatMap 的返回结果中， 成功的将原数组中的 nil 值过滤掉了。 再仔细观察，你会发现更多。 使用 flatMap 调用之后， 数组中的所有元素都被解包了

#### 关于$0的解释
- $0代表传入的元素本身，而不是下标
- $0.0代表传入的元组的第一个值，如果元组被命名过了，则可以直接带名字
- $0.age代表传入的模型的age属性

```objc
//元组类型
let a1 = [(1,2),(2,3),(3,4),(4,5),(5,6),(6,7)]
let a2 = a1.map({ $0.0 * 2 })

//模型类型
let ageArr = modelArr.map({ $0.age })
let nameArr = modelArr.map({ $0.name })

```

### 3. zip的使用
> 3-1. zip 是将两个序列的元素，一一对应合并成元组，生成一个新序列。比如

```objc
let a = [1, 2, 3, 4]
let b = ["a", "b", "c", "d", "e"]
let c = zip(a, b).map { $0 }
// c = [(1, "a"), (2, "b"), (3, "c"), (4, "d")]
```
生成的序列，如同原始两个序列的相互咬合，因此函数的名字为 zip。zip 的英文有拉链的意思。生成的序列 count 为原始序列的最小值。

> 3-2. zip 生成的序列通常会进行下一步处理。比如

```objc
func loadColors(colors: [UIColor]) {
    zip(self.colorButtons, colors).forEach { (bt, color) in
        bt.color = color
    }
}
```
上面这段的语句，为颜色按钮分别赋予颜色值。相当于：

```objc
func loadColors(colors: [UIColor]) {
    let minCount = min(colors.count, self.colorButtons.count)
    for i in 0 ..< minCount {
        self.colorButtons[i].color = colors[i]
    }
}
```
再举一段代码。

```objc
let colors = [UIColor.red, UIColor.blue, UIColor.white]
let buttons = zip(0 ..< colors.count, colors).map { (i, color) in
    let button = ColorButton(color: color)
    button.tag = i
    return button
}
```
这段代码，创建了颜色按钮，并用索引设置了对应的 tag。

最后

> 3-3. 这些简单的函数，配合起来可以达到一些高级的功能。比如:

```objc
let a = ["a", "b", "c", "d"]
let b = ["A", "B", "C", "D"]
let c = zip(a, b).flapMap { [$0, $1] }
// c = ["a", "A", "b", "B", "c", "C", "d", "D"]
```
这里将两个序列的元素，间隔地插入，合并成一个序列。

> 3-4. zip和速记+来通过添加两个冲突的值来解析重复的键

```objc
let keyNames2 = ["a", "b", "c", "a", "b"]
let dict = Dictionary(zip(keyNames2, repeatElement(1, count: keyNames2.count)), uniquingKeysWith: +)
//["b": 2, "a": 2, "c": 1]
```

### 二、Filter的使用
> filter用于选择数组元素中满足某种条件的元素

#### 代码实例

```objc
let arr = [1,2,3,4,5,6]
let arr2 = arr.filter({ $0 < 5 })
//[1, 2, 3, 4]

```

### 三、Reduce的使用
> reduce方法把数组元素组合计算为一个值
- 先看一段传统代码

```objc
let moneyArray = [2,4,6,7,9,4,10] 
var sum = 0
for money in moneyArray {
    sum = sum + money
}

//再看看数字相乘
var product = 1
for money in moneyArray {
    product = product * money
}

```

- Swift中reduct在Array类中的定义为

```objc
reduce(initial: T, combine: (T, Int) throws -> T)
```
- 接收两个参数，一个为类型U的初始值，另一个为把类型为U的元素和类型为T的元素组合成一个类型为U的值的函数。最终结果整个数组就变成了一个类型为U的值。

#### reduce简化代码

```objc
sum = moneyArray.reduce(0,{$0 + $1})

//Swift中操作符可用着函数，可简化成：
sum = moneyArray.reduce(0,+)
```
> 需要注意的是combine函数的两参数类型不同，$0为计算结果类型，$1为数组元素类型

### 四、总结
> 1、需要说明的是数据比较大的时候，高阶函数会比传统实现更快，因为它可以并行执行（如运行在多核上），除非真的需要更高定制版本的map，reduce和filter，否则可以一直使用它们以获得更快的执行速度。

> 2、我确信当你使用map，filter，reduct的代码质量会更好。但也需要在合适的场景中使用它们，不要指望用它们来解决任何问题。没有放之四海而皆准的真理。


> 详情参考[http://blog.csdn.net/fish_yan_/article/details/51785441](http://blog.csdn.net/fish_yan_/article/details/51785441)
> 详情参考[http://www.cocoachina.com/swift/20150619/12173.html](http://www.cocoachina.com/swift/20150619/12173.html)

