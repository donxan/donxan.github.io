---
title: Swift4.0新特性之String和Array和Dictionary
date: 2017-07-19 21:16:40
tags: [Swift4.0, String, Array, Dictionary]
categories: Swift学习笔记
---

> - 推荐: [Swift 编程语言](https://www.cnswift.org)
> - 原文链接: [What’s New in Swift 4?](https://www.raywenderlich.com/163857/whats-new-swift-4)
> - Guards翻译组: [中文地址](http://www.jianshu.com/p/3bedf1de5cb3)
> - Swift 4是苹果计划在2017年秋季推出的最新版本，值得关注的是其提供了与Swift 3代码很好的兼容性，并最大限度的保持了ABI稳定性.

<!-- more -->

---

## String
> 字符串已经像之前的2.0版一样, 改为了Collection类型 。此变化消除了字符串对字符数组的依赖

### 创建空字符串的两种方式,可用isEmpty判断是否为空

```objc
let SwiftString = "Hello"
var emptyString = ""               // empty string literal
var anotherEmptyString = String()

```

### 字符和字符串
#### 遍历字符串

```objc
for char in SwiftString {
    print(char)
}
```

#### 通过 Character类型创建单个字符

```objc
let char : Character = "H"
```

#### String值可以通过传入 Character来构造：

```objc
let charArr : [Character] = ["H", "e", "l", "l", "o"]
print(String(char)) // H
print(String(charArr)) // Hello
```

#### 拼接字符串

```objc
//方式一:
let addString = String(charArr) + String(char) //HelloH
//方式二:
var addString2 = "Why"
addString2 += String(charArr) //"WhyHello"
```

### 字符串个数

```objc
let count1 = SwiftString.count //5(类型: String.CharacterView.IndexDistance)
let count2 = SwiftString.characters.count // 5(Int型)
count1:
```

### 是否为空
```objc
let isStr = SwiftString.isEmpty //false
```

### 去掉某一个或几个字符
```objc
let text1 = SwiftString.dropFirst()//"ello"
let text2 = SwiftString.dropLast()//"Hell"
let text3 = SwiftString.dropFirst(2)//"llo"
let text4 = SwiftString.dropLast(2)//"Hel"
//注:以上皆为String.SubSequence类型
let text5 = String(text1) //"ello"---text5为String类型
```

### 倒叙
```objc
let text6 = String(SwiftString.reversed()) //"olleH"
```

### 字符串分割数组
```objc
let swiftString2 = "one two three"
let StrArr = swiftString2.split(separator: " ") //["one", "two", "three"]
//let StrArr: [String.SubSequence]
```

### 删除不符合ASCII编码的字符
```objc
let swiftString3 = "quanjun 🐷,"
let qj = swiftString3.filter { (char) -> Bool in
    return char.unicodeScalars.reduce(true, { $0 && $1.isASCII })
}
print(qj)  //"quanjun ,"
```

### 字符串索引
- Swift 的字符串不能通过整数值索引
- 使用 index(before:) 和 index(after:) 方法来访问给定索引的前后。要访问给定索引更远的索引，你可以使用 index(_:offsetBy:) 方法而不是多次调用这两个方法。
- Swift 4添加了Substring类型，用于引用String的子序列。
- String和Substring都实现了StringProtocol，两者几乎具有相同的功能：


#### startIndex和endIndex
```objcobjc
let greeting = "Guten Tag!"
//startIndex属性来访问 String中第一个 Character的位置
print(greeting[greeting.startIndex])
print(greeting[greeting.index(after: greeting.startIndex)])
//endIndex属性就是 String中最后一个字符后的位置。endIndex属性并不是字符串下标脚本的合法实际参数
//greeting[greeting.endIndex] //会报错
print(greeting[greeting.index(before: greeting.endIndex)])
//注: 如果 String为空，则 startIndex与 endIndex相等

let index = greeting.index(greeting.startIndex, offsetBy: 2)
print(greeting[index])
let indesString = greeting[greeting.startIndex...index]  //"Gut"
//注:indesString : Substring类型
print(String(indesString)) //"Gut"
```

#### 使用 characters属性的 indices属性来创建所有能够用来访问字符串中独立字符的索引范围 Range。
```objc
for index in greeting.characters.indices {
    print("\(greeting[index]) ", terminator: "")//不换行输出
}
```

### 多行字符串
- 注:你可以在多行字面量中使用单个双引号 " 。要在多行字符串中包含 """ ，你必须用反斜杠（ \ ）转义至少其中一个双引号

```objc
let rowsString = """
                我是一只小鸭子
                咿呀咿呀哟
                \"""
                """
print(rowsString)
```

## Array
- Swift 的 Array类型被桥接到了基础框架的 NSArray类上。
- Swift 数组的类型完整写法是 Array<Element>， Element是数组允许存入的值的类型。你同样可以简写数组的类型为 [Element]。

### 创建确定大小且元素都设定为相同默认值的数组。
```objc
/*Array*/
//默认值（叫做 repeating）和新数组元素的数量（叫做 count)
var array1 = Array(repeating: 1, count: 2)
var array2 = Array(repeating: 3, count: 2)
```

### 连接两个数组来创建数组(类型必须一致)
```objc
var array3 = array1 + array2
print(array3) //[1, 1, 3, 3]
```

### 数组个数
```objc
print(array3.count)  //5
```

### 判断数组个数是否为0
```objc
print(array3.isEmpty)  //false
print(array3.count == 0)  //false
```

###  添加
```objc
array3.append(4) //[1, 1, 3, 3, 4]
array3 += [5]  //[1, 1, 3, 3, 4, 5]
array3 += [6, 5]  //[1, 1, 3, 3, 4, 5, 6, 5]
```

### 取值
```objc
print(array3[0]) // 1
array3[1] = 9 // [1, 9, 3, 3, 4, 5, 6, 5]

//用下标改变一个范围的值，就算替换与范围长度不同的值的合集也行
array3[2...4] = [0, 8] //[1, 9, 0, 8, 5, 6, 5]
```
### 遍历
```objc
for item in array3 {
    print(item)
}
//元组输出
for (index, item) in array3.enumerated() {
    print("\(index)---\(item)")
}
//倒叙输出
for item in array3.reversed() {
    print(item)
}

//forEach遍历,如同for-in
let arr = [1, 9, 3, 3, 4, 5, 6, 5]
arr.forEach { (x) in
    print(x)
}
```
### 删除和插入
```objc
array3.remove(at: 1)  //[1, 0, 8, 5, 6, 5]
array3.removeFirst()  //[0, 8, 5, 6, 5]
array3.removeLast()   //[0, 8, 5, 6]
array3.removeFirst(2) //[5,6]
array3.removeLast(1)  //[5]
array3.removeAll()    //[]
```

### 获取元素在数组中的索引

```Swift
let arr = ["1", "2", "4", "3", "6", "2"]
//获取最后一个元素索引
let index0 = arr.endIndex           //6

//获取第一个元素索引
let index1 = arr.startIndex         //0

//获取指定某元素索引
let index2 = arr.index(of: "3")     //3

//当数组中有多个相同元素时, 返回指定元素的第一个的索引
let index3 = arr.index(of: "2")     //1

//返回指定某索引的后一个索引, 等同于4+1
let index4 = arr.index(after: 4)    //5

//返回指定某索引的前一个索引, 等同于4-1
let index5 = arr.index(before: 8)   //7

//根据元素内的某属性获取索引
let strArr = [("a", "1"), ("b", "2"), ("s", "3")]
let index = strArr.index(where: { $0.0 == "b" })
//返回值是一个可选值: Optional(1)
```

## Dictionary and Set

- 至于Collection类型，Set和Dictionary并不那么最直观的
- Swift 的 Dictionary桥接到了基础框架的 NSDictionary类。

### 首先列表可以是从一系列键值对（元组）创建一个字典:

```objc
//Dictionary
let keyNames = ["a", "b", "c", "d", "e"]
let valueNames = [1, 2, 4, 5, 6]

//public init<S>(uniqueKeysWithValues keysAndValues: S) where S : Sequence, S.Element == (Key, Value)
//对于该方法的具体解释,可以点进去看一下官方的讲解
let nameDic = Dictionary(uniqueKeysWithValues: zip(keyNames, valueNames))
print(nameDic)
//["b": 2, "e": 6, "a": 1, "d": 5, "c": 4]
```

### 在初始化Dictionary时, 你现在可以使用你喜欢的方式来处理重复的键,同时避免覆盖键值对，且不会出现任何问题：

```objc
let keyNames2 = ["a", "b", "c", "a", "b"]

//public init<S>(_ keysAndValues: S, uniquingKeysWith combine: (Value, Value) throws -> Value) rethrows where S : Sequence, S.Element == (Key, Value)
//对于该方法的具体解释,可以点进去看一下官方的讲解
let nameDic2 = Dictionary(zip(keyNames2, repeatElement(1, count: keyNames2.count)), uniquingKeysWith: +)
print(nameDic2)
//["b": 2, "a": 2, "c": 1]
```


### Dictionary 和 Set现在都可以将结果 通过filter函数 过滤到原始类型的新对象中：
```objc
let nameDic3 = nameDic.filter({ $0.value < 5 })
print(nameDic3)
//["b": 2, "a": 1, "c": 4]
```

### Dictionary为直接映射其值提供了一种非常有用的方法:：
```objc
//将value值Int转化为字符串
let nameDic4 = nameDic3.mapValues({ "\($0)" })
print(nameDic4)
//["b": "2", "a": "1", "c": "4"]
```

### 在Dictionary上访问某个值时，常见的做法是使用nil-coalescing operator给出默认值
```objc
let nameDic5 = nameDic4["d", default : "unknown"]
```

### 我们可以从Sequence"中初始化Dictionary，并将其分组为bucket:：
```objc
//注: 当通过特定模式对数据进行分组时，这相当方便。
let name2 = ["Proxima", "Centauri A", "Centauri B", "Barnard", "Wolf"]
let nameDic6 = Dictionary(grouping: name2, by: { $0.first! })
print(nameDic6)
//["B": ["Barnard"], "W": ["Wolf"], "P": ["Proxima"], "C": ["Centauri A", "Centauri B"]]
```
> 涉及Zip的用法,详见[Swift语法之Zip详解](http://www.jianshu.com/p/8c39bbacceb2)

### 预留空间
 * Sequence和Dictionary现在都具有明确保留容量的能力
 * 在这些类型上，Reallocation可能是一项代价高昂的任务。
 * 如果你知道需要存储的数据量时, 使用reserveCapacity(_:)可以提高性能且便捷

```objc
var name3 : [String : Int] = [ : ]
print(name3.capacity) // 0
name3.reserveCapacity(10) //储备 10元素的能力
print(name3.capacity) // 12

```
