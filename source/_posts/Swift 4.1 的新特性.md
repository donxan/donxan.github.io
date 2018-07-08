---
title: Swift 4.1 的新特性
date: 2018-04-24 21:16:40
tags: [Swift4.1, Equatable, Hashable]
categories: Swift学习笔记
---

- 苹果公司在 3.29 正式发布了正式版的`Xcode 9.3`和`Swift 4.1`, 让我们看看`Swift 4.1`带来了哪些新功能和新亮点
- 测试需要Xcode9.3, 请确保你的Xcode是最新的9.3版本
- `Swift 4.1`与`Swift 4.0`是源代码兼容的，所以如果你已经使用`Xcode`中的`Swift Migrator`将你的项目迁移到`Swift 4.0`，那么新特性不会破坏你的代码
- 下面在`Xcode9.3`下新建一个`Playground`工程, 测试我们的代码

<!-- more -->

#### 条件一致性(Conditional Conformance)
- 条件一致性使类型参数满足特定条件的泛型类型的协议一致性 [[ SE-0143 ]](https://github.com/apple/swift-evolution/blob/master/proposals/0143-conditional-conformances.md)
- 在Swift 4中，如果数组、字典或者可选类型的元素类型遵循`Equatable`，你是可以在数组之间、字典之间和可选类型之间进行比较的, 如下示例:

```objc
// Int类型的数组
let arr1 = [1, 2, 3]
let arr2 = [1, 2, 3]
print(arr1 == arr2)

// 比较value值为Int的字典
let dic1 = ["age": 19, "score": 60]
let dic2 = ["age": 19, "score": 60]
print(dic1 == dic2)

// 比较Int?
let age1 = dic1["age"]
let age2 = dic2["age"]
print(age1 == age2)

/// 以上输出结果都是: true
```

这里如果我们把`Int`都换成`Int?`类型, 在`Swift4.0`中是不能编译通过的, 如下:

```objc
// Int类型的数组
let arr1: [Int?] = [1, 2, 3]
let arr2: [Int?] = [1, 2, 3]
print(arr1 == arr2)

// 比较value值为Int的字典
let dic1: [String: Int?] = ["age": 19, "score": 60]
let dic2: [String: Int?] = ["age": 19, "score": 60]
print(dic1 == dic2)

// 比较Int?
let age1 = dic1["age"]
let age2 = dic2["age"]
print(age1 == age2)
```

- 在这些实例中, 我们用`==`测试相等性, 在Swift4.0中, `Int`类型遵循`Equatable`协议, 可以比较, 但是`Int?`类型却没有遵循`Equatable`协议
- 但是在Swift4.1中, 完美的解决了这个问题, 上述代码可比那已通过, 且都输出: `true`
- 在`Swift 4.0`中`[Set<Int>]`之间可以直接对比，但是`[[Int]]`不能。现在`Swift 4.1`中，`[[Int]]`也能直接对比
- 总的来说，`Swift 4.1`的`Array`、`Dictionary`和`Optional`，只要他们的元素都遵循了`Equatable`和`Hashable`，那么他们也遵循`Equatable`和`Hashable`

#### 合成 `Equatable` 和 `Hashable`
- 如果对象相等，则这两个对象的 `hash` 值一定相等
- 如果两个对象 `hash` 值相等，这两个对象不一定相等。
- `Swift` 中 `Hashable` 一定是 `Equatable`，因为前者继承了后者。
在`Swift 4`中，若遵循`Equatable`协议的时候，我们必须实现`Equatable`协议的`==`方法, `Equatable`协议如下:

```objc
public protocol Equatable {

    /// Returns a Boolean value indicating whether two values are equal.
    ///
    /// Equality is the inverse of inequality. For any values `a` and `b`,
    /// `a == b` implies that `a != b` is `false`.
    ///
    /// - Parameters:
    ///   - lhs: A value to compare.
    ///   - rhs: Another value to compare.
    public static func == (lhs: Self, rhs: Self) -> Bool
}
```

在Swift4.0中, 必须实现`Equatable`协议的方法

```objc
struct Name: Equatable {
    var name1 = "name1"
    var name2 = "name2"

    static func == (lhs: Name, rhs: Name) -> Bool {
        return lhs.name1 == rhs.name1 &&
            lhs.name2 == rhs.name2
    }
}
```

在`Swift 4.1`，只需要加上`Equatable`即可, 不需要实现任何协议方法

```objc
struct Name: Equatable {
    var name1 = "name1"
    var name2 = "name2"

}
```

#### `JSON`编码时支持`Camel Case`和`Snake Case`之间的转换

- `Swift 4.0`引入了`Codable`，但是有个麻烦的问题：如果`JSON`数据的`key`命名格式是`snake_case`的话，我们必须创建自己的`CodingKeys`来告诉苹果怎么转换。在`Swift 4.0`中
- 但是在`Swift 4.1`中，苹果给`JSONDecoder`引入了一个属性`keyDecodingStrategy`；对应的`JSONEncoder`引入了一个属性`keyEncodingStrategy`。这样我们就不需要设置定义`CodingKeys`了。只需要在`decoding`的时候把`keyDecodingStrategy`设置为`.convertFromSnakeCase`；在`encoding`的时候把`keyEncodingStrategy`设置为`.convertToSnakeCase`
- 下面是分别针对数组/字典/集合的解析形式

```objc
struct Student: Codable, Hashable {
  let firstName: String
  let averageGrade: Int
}

let cosmin = Student(firstName: "Cosmin", averageGrade: 10)
let george = Student(firstName: "George", averageGrade: 9)
let encoder = JSONEncoder()

// Encode an Array of students
let students = [cosmin, george]
do {
  try encoder.encode(students)
} catch {
  print("Failed encoding students array: \(error)")
}

// Encode a Dictionary with student values
let studentsDictionary = ["Cosmin": cosmin, "George": george]
do {
  try encoder.encode(studentsDictionary)
} catch {
  print("Failed encoding students dictionary: \(error)")
}

// Encode a Set of students
let studentsSet: Set = [cosmin, george]
do {
  try encoder.encode(studentsSet)
} catch {
  print("Failed encoding students set: \(error)")
}

// Encode an Optional Student
let optionalStudent: Student? = cosmin
do {
  try encoder.encode(optionalStudent)
} catch {
  print("Failed encoding optional student: \(error)")
}
```

#### `Hashable Index Types`(哈希化索引)
扩展 `Key-path` 表达式在标准库中的使用范围。让标准库中所有的索引类型都符合 `Hashable` 协议，这样，`[Int]`、`String` 和所有其它标准集合使用 `key-path` 下标时，表现都是一样的

```objc
let swiftString2 = "one two three"
let charact1 = \String.[swiftString2.startIndex]
print(swiftString2[keyPath: charact1])

let arr = [1, 2, 3, 4]
let value2 = \[Int].[1]
print(arr[keyPath: value2])

//输出结果:
o
2
```

#### `compactMap`的用法

在`Swift 4.0`中，我们经常使用`flatMap`来过滤`nil`，也可以进行降维操作, 详情可参考[Swift函数式编程之高级用法](https://www.titanjun.top/2017/05/19/Swift%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E4%B9%8B%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95/)

```objc
let arr = [1, 2, nil, 3, 4, nil]
let arr1 = arr.flatMap({ $0 })
print(arr1)

//这样使用会有类似的警告
'flatMap' is deprecated: Please use compactMap(_:) for the case where closure returns an optional value
Use 'compactMap(_:)' instead

//Swift4.1中的用法
let arr = [1, 2, nil, 3, 4, nil]
let arr2 = arr.compactMap({ $0 })
print(arr2)
```

> 主要是因为在`Swift4.0`中`flatMap`有很多重载, 可能会引起歧义, 所以在`Swift4.1`中把`flatMap`重命名为`compactMap`


#### 除了协议中的 weak 和 unowned。
- 当你在`Tune`协议中定义了两个属性`key`和`pitch`, `pitch`可能为`nil`, 所以你在协议中可以用`weak`修饰
- 但是如果在协议本身中定义的话，`weak`和`unowned`都没有实际意义, 所以在`Swift4.1`中就已经去掉了这些关键字, 并且在协议中使用这些关键字将会爆出警告

```objc
class Key {}
class Pitch {}

// Swift 4
protocol Tune {
    unowned var key: Key { get set }
    weak var pitch: Pitch? { get set }
}
// Swift 4.1
protocol Tune {
    var key: Key { get set }
    var pitch: Pitch? { get set }
}
```

#### `UnsafeMutableBufferPointer`的改变

```objc
//Swift4.0
let buffer = UnsafeMutableBufferPointer<Int>(start: UnsafeMutablePointer<Int>.allocate(capacity: 10),
                                             count: 10)
let mutableBuffer = UnsafeMutableBufferPointer(start: UnsafeMutablePointer(mutating: buffer.baseAddress),
                                               count: buffer.count)

//Swift4.1
let buffer = UnsafeMutableBufferPointer<Int>.allocate(capacity: 10)
let mutableBuffer = UnsafeMutableBufferPointer(mutating: UnsafeBufferPointer(buffer))
```

> 相对`Swift4.0`的改变, `Swift4.1`这点改变键值太微不足道了, 传说中`Swift5`的`API`会趋于稳定, 但是估计改变可能也是非常大的, 坐等`Swift5`发布...

#### 参考文档
- [What’s New in Swift 4.1?](https://www.raywenderlich.com/187826/whats-new-in-swift-4-1)
