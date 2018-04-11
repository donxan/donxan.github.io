---
title: iOS之Scanner字符串扫描类
date: 2017-09-09 22:14:40
tags: [Swift, Scanner, iOS扫描器]
categories: 高级用法
---


>  注:  本文主要语法为Swift4.0

-  Scanner继承自NSObject，遵守NSCopying协议。是一个用于扫描指定字符串的抽象类
-  可以创建Scanner时制定他的String属性，然后scanner会按照你的要求从头到尾扫描这个字符串的每个字符
- 扫描操作从上次扫描的位置开始，并且继续往后扫描直到指定的内容出现为止（如果有的话）

<!-- more -->

## 1. 部分属性的相关解释

```objc
 open var string: String { get }
 // (只读)返回当前被扫描的字符串

open var scanLocation: Int
// 当前扫描的位置，默认是从0开始的。通过设置这个属性值，可以自定义扫描的位置

open var charactersToBeSkipped: CharacterSet?
// 这个集合是用来设置我们需要跳过扫描的一个字符集合

open var caseSensitive: Bool
// 是否大小写敏感

    
public init(string: String)
// 用给定扫描字符串初始化
```

## 2. 部分方法的相关解释

### 2-1 以下方法的作用都是
- 扫描该类型的字符串,并将扫描结果赋值给result
- 判断该字符串的第一个字符(默认第一个,可根据scanLocation属性设置)是否为该类型

```objc

    open func scanInt32(_ result: UnsafeMutablePointer<Int32>?) -> Bool

    @available(iOS 2.0, *)
    open func scanInt(_ result: UnsafeMutablePointer<Int>?) -> Bool

    open func scanInt64(_ result: UnsafeMutablePointer<Int64>?) -> Bool

    @available(iOS 7.0, *)
    open func scanUnsignedLongLong(_ result: UnsafeMutablePointer<UInt64>?) -> Bool

    open func scanFloat(_ result: UnsafeMutablePointer<Float>?) -> Bool

    open func scanDouble(_ result: UnsafeMutablePointer<Double>?) -> Bool

```

#### 2-1-1 包含纯数字的字符串

```objc
var int1: Int = 0
var int64: Int64 = 0
var int32: Int32 = 0
var float1: Float = 0.0
var double1: Double = 0.0
//判断字符串包含的类型(输出结果为true)
print(Scanner(string: "987").scanInt(&int1))
print(Scanner(string: "897").scanInt64(&int64))
print(Scanner(string: "99").scanInt32(&int32))
print(Scanner(string: "90.99").scanFloat(&float1))
print(Scanner(string: "98.09").scanDouble(&double1))
//输出扫描后的结果
int1 = 98
int64 = 897
int32 = 99
float = 90.99
double = 98.09

```

#### 2-1-2  非纯数字的字符串

``` objc
var int1: Int = 0
let scanner = Scanner(string: "m998k23l")
scanner.scanLocation = 1
print(scanner.scanInt(&int1)) // true
//int1 = 998

var double1: Double = 0.0
let scanner = Scanner(string: "ms9.98k45l")
scanner.scanLocation = 1
print(scanner.scanDouble(&double1)) false
//double1 = 0.0

```


### 2-2 以下方法的作用都是

- 扫描字符串前缀是否是"0x"或者"0X",返回true或false
- 将0x(0X)字符后面符合十六进制数的字符串转化成十进制数(可运用到UIColor关于十六进制数的转化)

```objc
    open func scanHexInt32(_ result: UnsafeMutablePointer<UInt32>?) -> Bool // Optionally prefixed with "0x" or "0X"

    @available(iOS 2.0, *)
    open func scanHexInt64(_ result: UnsafeMutablePointer<UInt64>?) -> Bool // Optionally prefixed with "0x" or "0X"

    @available(iOS 2.0, *)
    open func scanHexFloat(_ result: UnsafeMutablePointer<Float>?) -> Bool // Corresponding to %a or %A formatting. Requires "0x" or "0X" prefix.

    @available(iOS 2.0, *)
    open func scanHexDouble(_ result: UnsafeMutablePointer<Double>?) -> Bool // Corresponding to %a or %A formatting. Requires "0x" or "0X" prefix.

```

#### 2-2-1 代码示例

```objc 
print(Scanner(string: "xdd").scanHexInt64(&uint64))  //false
print(Scanner(string: "0xdd").scanHexInt64(&uint64))  //true
print(uint64) //221
print(Scanner(string: "0xax").scanHexInt32(&uint32))  //true
print(uint32)  // 10
print(Scanner(string: "0X991").scanHexFloat(&float1))  //true
print(float1)  //2449.0
print(Scanner(string: "0X99").scanHexDouble(&double1))  //true
print(double1)  //153.0

```


### 2-3 从给定的字符串中找到相同的字符

```objc
open func scanString(_ string: String, into result: AutoreleasingUnsafeMutablePointer<NSString?>?) -> Bool
```
> 代码示例

```objc
var sstring: NSString?
let scan = Scanner(string: "32jingki")
while !scan.isAtEnd{ // 判断是否扫描到最后
    scan.scanLocation += 1
    print(scan.scanLocation)
    scan.scanString("i", into: &sstring)
    print(sstring)
}

```

### 2-4 Scanner的其他方法

```objc
open func scanCharacters(from set: CharacterSet, into result: AutoreleasingUnsafeMutablePointer<NSString?>?) -> Bool
////从scan中扫描出string放入result中，如果不需要存储string，则result传NULL


open func scanUpTo(_ string: String, into result: AutoreleasingUnsafeMutablePointer<NSString?>?) -> Bool
//从scan中扫描出string之外的数据放入result中，如果不需要存储string，则result传NULL


open func scanUpToCharacters(from set: CharacterSet, into result: AutoreleasingUnsafeMutablePointer<NSString?>?) -> Bool
//从scan中扫描出set之外的数据放入result中，如果不需要存储string，则result传NULL

```


## 2-5  关于使用Scanner处理UIColor十六进制数值的问题
- 可在UIColor的extension中添加扩展方法

```objc
    /** 十六进制颜色扩充
     */
    convenience init?(hex : String, alpha : CGFloat = 1.0) {
        //1.判断字符串长度是否符合
        guard hex.characters.count >= 6 else {
            return nil
        }
        //2.将字符串转成大写
        var tempHex = hex.uppercased()
        //3.判断开头
        if tempHex.hasPrefix("0x") || tempHex.hasPrefix("##") || tempHex.hasPrefix("0X") {
            //去掉开头
            tempHex = tempHex.dropFirst(2)
        }
        if tempHex.hasPrefix("#") {
            tempHex = tempHex.dropFirst()
        }
        //4.分别截取RGB
        var range = NSRange(location: 0, length: 2)
        let rHex = (tempHex as NSString).substring(with: range)
        range.location = 2
        let gHex = (tempHex as NSString).substring(with: range)
        range.location = 4
        let bHex = (tempHex as NSString).substring(with: range)
        //5.将字符串转化成数字  emoji也是十六进制表示(此处也可用Float类型)
        var r : UInt32 = 0, g : UInt32 = 0, b : UInt32 = 0
        //创建扫描器,将字符串的扫描结果赋值给:r,g,b
        Scanner(string: rHex).scanHexInt32(&r)
        Scanner(string: gHex).scanHexInt32(&g)
        Scanner(string: bHex).scanHexInt32(&b)
        
        self.init(r : CGFloat(r), g : CGFloat(g), b : CGFloat(b))
    }


    /**RGB三原色
     */
    convenience init(r : CGFloat, g : CGFloat, b : CGFloat, alpha : CGFloat = 1.0) {
        self.init(red: r / 255.0, green: g / 255.0, blue: b / 255.0, alpha: alpha)
    }

```