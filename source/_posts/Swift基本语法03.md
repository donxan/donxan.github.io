---
title: Swift基本语法03
date: 2016-12-30 22:16:13
tags: [Swift, 语法]
categories: Swift学习笔记
---

## willSet和didSet

- 属性观察器控制和响应属性的变化，当属性被设置的时候回调用属性观察器，主要有以下几个特点：
  - 属性改变之前触发willSet方法，属性改变之后触发didSet方法
  - 在给属性添加观察者之前必须要明确申明属性的类型，否则编译器会报错
  - 属性初始化时，willSet和didSet都不会调用，只有在设置属性值时才会调用
  - 当设置的值和原来的值一样时，willSet和didSet也会被调用
  - willSet有一个newValue参数，didSet有一个oldvalue参数
<Excerpt in index | 首页摘要>
<!-- more -->

> 代码如下

```swift
var age:Int = 18{
    didSet{
        print("didSet   \(oldValue)")
    }
    willSet{
        print("willSet  \(newValue)")
    }    
}
```

使用

```swift
/**
 *  age重新赋值并打印     */
age = 10;
print("   \(age)")
/*输出
willSet 10
didSet  18
10
*/
age = 100
print("   \(age)")
/*输出
willSet 100
didSet  10
100
*/
age = 200
print("   \(age)")
/*输出
willSet 200
didSet  100
200
*/
age = 18
print("    \(age)")
/*输出
willSet 18
didSet  200
18
*/
```

> 实例应用
 - cell内部,模型赋值

```swift
class HomeViewCell: UICollectionViewCell {

    // MARK: 控件属性
    @IBOutlet weak var albumImageView: UIImageView!
    @IBOutlet weak var liveImageView: UIImageView!
    @IBOutlet weak var nickNameLabel: UILabel!
    @IBOutlet weak var onlinePeopleLabel: UIButton!

    // MARK: 定义属性
    var anchorModel : AnchorModel?{
        didSet{
            albumImageView.setImage(anchorModel!.isEvenIndex ? anchorModel?.pic74 : anchorModel?.pic51, "home_pic_default")
            liveImageView.isHidden = anchorModel?.live == 0
            nickNameLabel.text = anchorModel?.name
            onlinePeopleLabel.setTitle("\(anchorModel?.focus ?? 0)", for: .normal)
        }
    }

}

```

## Swift中的set和get方法
- OC中我们常重写set和get方法来改变UI，Swift中重写set和get方法是下面这种。
  - 先定义一个变量，当调用set方法的时候，系统会有一个newValue，将newVaule赋值给我们定义的变量，然后从get方法里面返回去。
  - Swift中一般重写比较少

> 代码示例

```swift
//定义一个变量
var _tittle: String?

    var tittle: String?{

        get{
            return  _tittle + "123"
        }
        set{
            _tittle = newValue + "789"
        }
    }
```


## swift单例

- 单例模式单例模式是设计模式中最简单的一种，甚至有些模式大师都不称其为模式，称其为一种实现技巧
- 因为设计模式讲究对象之间的关系的抽象，而单例模式只有自己一个对象
- 下面看看swift中的几种实现方式：

### 静态常量

一句话搞定，静态常理。所有地方用到的都是同一个

```swift
class SingleOne {

    //单例
    static let shareSingleOne = SingleOne()

}
```




### dispatch_once

使用`dispatch_once`可以保证其中的代码只执行一次

```swift
class SingleTwo {

    //单例
    class func shareSingleTwo()->SingleTwo{
        struct Singleton{
            static var onceToken : dispatch_once_t = 0
            static var single:SingleTwo?
        }
        dispatch_once(&Singleton.onceToken,{
            Singleton.single=shareSingleTwo()
        })
        return Singleton.single!
    }
}
```


### 全局常量


```swift
//全局的常量
let single = SingleThree()

class SingleThree {

    class var sharedInstance : SingleThree {
        return single
    }
}
```


### 静态常量

在方法内定义静态常量

```swift
class SingleFour {

    static var sharedInstance : SingleFour {
        struct Static {
            static let instance : SingleFour = SingleFour()
        }
        return Static.instance
    }
}
```
