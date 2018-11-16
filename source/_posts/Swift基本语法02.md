---
title: Swift基本语法02
date: 2016-12-28 11:44:30
tags: [Swift3.0, 语法]
categories: Swift学习笔记
---

> 上一篇介绍了Swift的常量/变量和循环,详情见: [Swift语法](https://www.titanjun.top/categories/Swift%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/)


<!-- more -->

## 字符串的介绍
- 字符串在任何的开发中使用都是非常频繁的
    - OC和Swift中字符串的区别
        - 在OC中字符串类型时NSString,在Swift中字符串类型是String
        - OC中字符串@””,Swift中字符串””
    - 使用 String 的原因
        - String 是一个结构体，性能更高
        - NSString 是一个 OC 对象，性能略差
        - String 支持直接遍历
        - Swift 提供了 String 和 NSString 之间的无缝转换

```Swift
// 1> 定义不可变字符串 : 使用let修饰
// let str : String = "hello swift"
let str = "Hello Swift"
// str = "hello Objective-C"
// 2> 定义可变字符串 : 使用var修饰
var strM = "Hello World"
strM = "Hello China"
```

## 字符串的使用

- 获取字符串的长度
    - 获取字符集合,再获取集合的count属性


> let length = str.characters.count

### 字符串的拼接

两个字符串的拼接

```Swift
let str1 = "字符串"
let str2 = "拼接"
// OC拼接方式 NSString stringwithFormat:@"%@%@", str1, str2
let str3 = str1 + str2
```

- 字符串和其他数据类型的拼接


```Swift
let name = "tqj"
let age = 19
let height = 1.87

let infoStr = "my nams is \(name), age is \(age), height is \(height)"
```

- 字符串的格式化::比如时间:01:02

```Swift
let min = 3
let second = 4
let timeStr = String(format: "%02d:%02d", min, second)
```

### 字符串的判断

判断字符串是否为空

```Swift
let str = "1"
//输出false
print(str.isEmpty)

let str = ""
//输出为true
print(str.isEmpty)
```

其他判断和操作(Swift3.0特性)

```Swift
//判断是否包含某字符
let str = "Hello, playground"
let is1 = str.contains("ell")
//输出true
print(is1)

//指定字符串的替换
let str2 = str.replacingOccurrences(of: "Hello", with: "HELLO")
print(str2)   
//输出HELLO, playground

//转为大写
let s1 = str.localizedUppercase
//转为小写
let s2 = str.localizedLowercase

```


### 字符串的截取 

- Swift中提供了特殊的截取方式
    - 该方式非常麻烦
    - Index创建较为麻烦
- 简单的方式是将String转成NSString来使用
    - 在标识符后加:as NSString即可

```Swift
let urlString = "www.titanjun.top"

// 4.1.方式一:
// 将String类型转成NSString类型,再进行截取: as NSString
let header1 = (urlString as NSString).substring(to: 3)
let range1 = NSMakeRange(4, 5)
let middle1 = (urlString as NSString).substring(with: range1)
let footer1 = (urlString as NSString).substring(from: 10)
```

swift截取方式

```Swift
// 4.2.方式二:
let headerIndex = urlString.index(urlString.startIndex, offsetBy: 3)
let header2 = urlString.substring(to: headerIndex)

let startIndex = urlString.index(urlString.startIndex, offsetBy: 4)
let endIndex = urlString.index(urlString.startIndex, offsetBy: 9)
let range = Range(startIndex..<endIndex)
let middle2 = urlString.substring(with: range)

let footerIndex = urlString.index(urlString.endIndex, offsetBy: -3)
let footer2 = urlString.substring(from: footerIndex)
```

### drop方式截取

```swift
// 获取截取之后的字符串
let path = "https://www.titanjun.top"
let str1 = path.dropFirst()
// ttps://www.titanjun.top

let str2 = path.dropLast()
// https://www.titanjun.to

let str3 = path.dropFirst(5)
// ://www.titanjun.top

let str4 = path.dropLast(3)
// https://www.titanjun.
```


## 数组的使用

### 数组的介绍

- 数组（Array）是一串有序的由相同类型元素构成的集合
    - 数组中的集合元素是有序的，可以重复出现
    - Swift中的数组
        - swift数组类型是Array，是一个泛型集合
### 数组的初始化
- 数组分成:可变数组和不可变数组
    - 使用let修饰的数组是不可变数组
    - 使用var修饰的数组是可变数组

```Swift
// 1> 定义不可变数组
let array : [Any] = ["why", 18, 1.88]
// 2> 定义可变数组: 使用var修饰
var arrayM = [Any]()
```

### 对数组的基本操作

```Swift
// 增删改查
// 2.1.添加元素
arrayM.append("why")
// 2.2.删除元素
arrayM.remove(at: 0)
// 2.3.修改元素
arrayM[0] = "yz"
// 2.4.获取元素
let item = arrayM[1]
```

### 数组的遍历

```Swift
// 3.1.获取数组的长度
let count = array.count

// 3.2.对数组进行遍历(可以获取到下标值)
for i in 0..< count {
    print(array[i])
}
// 3.3.对数组进行遍历(设置遍历区间)
for item in array {
    print(item)
}
// 3.3.对数组进行遍历(不需要获取下标值)
for item in array[0..<2] {
    print(item)
}
// 3.5.对数组进行遍历(既获取下标值,又获取元素)
for (index, item) in array.enumerated() {
    print(index)
    print(item)
}
```

### 数组的合并

```Swift
// 如果两个数组中存放的是相同的元素,那么在swift中可以对两个数组进行相加,直接合并
let array1 = ["why", "yz"]
let array2 = ["lmj", "lnj"]
let array3 = [12, 20, 30]

let resultArray = array1 + array2
// let result = array1 + array3 错误写法

// 不建议一个数组中存放多种类型的数据
var array3 = [2, 3, "why"]
var array4 = ["yz", 23]
array3 + array4
```


## 字典

### 字典的介绍

- 字典允许按照某个键来访问元素
    - 字典是由两部分集合构成的，一个是键（key）集合，一个是值（value）集合
    - 键集合是不能有重复元素的，而值集合是可以重复的，键和值是成对出现的
    - Swift中的字典
        - Swift字典类型是Dictionary，也是一个泛型集合
### 字典的初始化
- Swift中的可变和不可变字典
    - 使用let修饰的数组是不可变字典
    - 使用var修饰的数组是可变字典

```Swift
    // 定义一个可变字典
    var dict1 : [String : Any] = [String : Any]()
    // 定义一个不可变字典
    let dict2 : [String : Any] = ["name" : "why", "age" : 18]
```

### 字典的基本使用

```Swift
// 2.1.添加元素
dictM["name"] = "why"
dictM["age"] = 18
dictM["height"] = 1.88

// 2.2.删除元素
dictM.removeValue(forKey: "height")
dictM
// 2.3.修改元素
dictM["name"] = "lmj"
dictM.updateValue("lnj", forKey: "name")
dictM
// 2.4.查找元素
dictM["age"]
```

### 字典的遍历

```Swift
// 3.1.遍历字典中所有的key
for key in dict.keys {
    print(key)
}

// 3.2.遍历字典中所有的value
for value in dict.values {
    print(value)
}

// 3.3.遍历字典中所有的key/value
for (key, value) in dict {
    print(key, value)
}
```

### 字典的合并

```Swift
var dict1 : [String : Any] = ["name" : "why", "age" : 18]
let dict2 : [String : Any] = ["height" : 1.88, "phoneNum" : "+86 110"]

//let resultDict = dict1 + dict2字典不可以相加合并，只能遍历
for (key, value) in dict2 {
    dict1[key] = value
}
```

## 元组的使用

### 元组的介绍
- 元组是Swift中特有的,OC中并没有相关类型
- 它是什么呢?
    - 它是一种数据结构，在数学中应用广泛
        类似于数组或者字典
    - 可以用于定义一组数据
    - 组成元组类型的数据可以称为“元素”

### 元组的定义

元组的常见写法

```Swift
// 3.使用元组保存信息(取出数据时,更加方便)
// 3.1.写法一:
let infoTuple0 = ("why", 18, 1.88)
let tupleName = infoTuple0.0
let tupleAge = infoTuple0.1
infoTuple0.0
infoTuple0.1
infoTuple0.2

// 3.2.写法二:
let infoTuple1 = (name : "why",age : 18, height : 1.88)
infoTuple1.age
infoTuple1.name
infoTuple1.height

// 3.3.写法三:
let (name, age, height) = ("why", 18, 1.88)
name
age
height
```


## 可选类型

### 可选类型的介绍

- 注意:
    - 可选类型时swift中较理解的一个知识点
    - 暂时先了解,多利用Xcode的提示来使用
    - 随着学习的深入,慢慢理解其中的原理和好处
- 概念:
    - 在OC开发中,如果一个变量暂停不使用,可以赋值为0(基本属性类型)或者赋值为空(对象类型)
    - 在swift开发中,nil也是一个特殊的类型.因为和真实的类型不匹配是不能赋值的(swift是强类型语言)
    - 但是开发中赋值nil,在所难免.因此推出了可选类型
- 可选类型的取值:
    - 空值
    - 有值

### 定义可选类型

- 定义一个可选类型有两种写法
    - 最基本的写法
    - 语法糖(常用)

```Swift
// 错误写法
// let string : String = nil
// 正确写法:
// 注意:name的类型是一个可选类型,但是该可选类型中可以存放字符串.
// 写法一:定义可选类型
let name : Optional<String> = nil
// 写法二:定义可选类型,语法糖(常用)
let name : String? = nil
```


### 可选类型的使用

```Swift
    // 演练一:给可选类型赋值
    // 定义可选类型
    var string : Optional<String> = nil
    // 给可选类型赋值
    // 错误写法:因此该可选类型中只能存放字符串
    string = 123
    // 正确写法:
    string = "Hello world"
    // 打印结果
    print(string)
    // 结果:Optional("Hello world")\n
    // 因为打印出来的是可选类型,所有会带Optional
    // 演练二:取出可选类型的值
    // 取出可选类型的真实值(解包)
    print(string!)
    // 结果:Hello world\n
    // 注意:如果可选类型为nil,强制取出其中的值(解包),会出错
    string = nil
    print(string!) // 报错
    // 正确写法:
    if string != nil {
        print(string!)
    }
    // 简单写法:为了让在if语句中可以方便使用string
    // 可选绑定
    if let str = string {
        print(str)
    }
```

### 真实应用场景

目的:让代码更加严谨

```Swift
    // 1.将字符串类型转成Int类型
    let str = "123"
    let result : Int? = Int(str) // nil/Int
    // 2.根据文件名称,读取路径
    let path : String? = Bundle.main.path(forResource: "123.plist", ofType: nil)
    // 3.根据string,创建URL
    let url = URL(string: "http://www.520it.com/小码哥")
    // 4.从字典中取内容
    let dict : [String : Any] = ["name" : "why", "age" : 18]
    dict["name"]
    dict["height"]
```

## 类型转化

### 类型转化

- 常见的类型转化符号
    - as : 将实例转成某一种类型

### 例子

```Swift
    // 1.定义数组
    let array : [AnyObject] = [12, "why", 1.88]
    // 2.取出第二个元素
    let objc = array[1]
    // 3.将objc转成真正的类型来使用
    // 3.1.as? 将AnyObject转成可选类型,通过判断可选类型是否有值,来决定是否转化成功了
    let age = objc as? Int
    print(age) // 结果:Optional(12)
    // 3.2.as! 将AnyObject转成具体的类型,但是注意:如果不是该类型,那么程序会崩溃
    let age1 = objc as! Int
    print(age1) // 结果:12
```

## try throw

throw catch 是 Xcode 7.0 对错误处理的一个非常大的变化

代码示例

```Swift
// 2. 反序列化
// 1.获取json文件路径
        let jsonPath = NSBundle.mainBundle().pathForResource("MainVCSettings.json", ofType: nil)
        // 2.加载json数据
        let jsonData = NSData(contentsOfFile: jsonPath!)
        // 3.序列化json
        do{//解析成功
             // throw是Xcode7最明显的一个变化, Xcode7之前都是通过传入error指针捕获异常, Xocode7开始通过try/catch捕获异常
            let dictArray = try NSJSONSerialization.JSONObjectWithData(jsonData!, options: NSJSONReadingOptions.MutableContainers)

            // 遍历字典时候需要明确指明数组中的数据类型
            for dict in dictArray  as! [[String:String]]
            {
                 // 由于addChildVC方法参数不能为nil, 但是字典中取出来的值可能是nil, 所以需要加上!
                addChildViewController(dict["vcName"]!, title: dict["title"]!, imageName: dict["imageName"]!)
            }
        }catch{//解析失败
            print(error)
            addChildViewController("HomeTableViewController", title: "首页", imageName: "tabbar_home")
            addChildViewController("MessageTableViewController", title: "消息", imageName: "tabbar_message_center")
            addChildViewController("DiscoverTableViewController", title: "发现", imageName: "tabbar_discover")
            addChildViewController("ProfileTableViewController", title: "我", imageName: "tabbar_profile")
        }
```

如果能确保代码执行正确，可以强行 try!

```Swift
let array = try! NSJSONSerialization.JSONObjectWithData(jsonData, options: NSJSONReadingOptions.MutableContainers)
```
>不过需要注意的是，一旦解析错误，程序会直接崩溃！


---
