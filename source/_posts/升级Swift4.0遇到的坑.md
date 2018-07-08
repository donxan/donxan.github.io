---
title: 升级Swift4.0遇到的坑
date: 2017-08-25 15:06:40
tags: [Swift4.0, Error, 入坑]
categories: Swift学习笔记
---

- 并不是所有库都能做到及时支持`Swift4.0`，更何况是在现在连`Xcode9`也还是beta的状态
- 所以我们仅能做到将自己的业务代码（主工程代码）部分升级到`Swift4.0`，然后同时保留各种pod库在`Swift3.2`版本。
- 没办法，谁叫`Swift4.0`也还无法做到API兼容呢（但愿能在`Swift5`之前实现吧）。
- 至于我说的同时使用两个版本的`Swift`，这是没问题的，Xcode9支持在项目中同时使用`Swift3.2`和`Swift4.0`。

<!-- more -->

## 修改Swift版本
### 指定主工程的Swift版本为4.0

![Xcode图示.png](http://upload-images.jianshu.io/upload_images/4122543-1a9aeacc47b262a5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 修改pod库
- 在Podfile文件的最下方加入如下代码，指定pod库的Swift版本为3.2(这样会使得所有的第三方pod库的Swift版本都为3.2)


```objc
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['SWIFT_VERSION'] = '3.2'
    end
  end
end
```

## 主工程中的代码修改
### Swift3.2到Swift4.0的改变

- 1). `Swift4.0`中对于扩展的属性(包括实例属性、`static`属性、`class`属性)，都只能使用get方法，不可使用set方法
- 2). `Swift4.0`中不再允许复写扩展中的方法(包括实例方法、`static`方法、`class`方法)
  - 比如:自定义的协议方法在`extension`中实现,若某个类遵循了该协议,其子类便不能重写该协议方法
  - 解决的方法是: 在每个需要该协议的类里面都重新遵循该协议,实现协议方法
  - 个人想到的办法,不知道有没有其他解决办法可以提供一下
- 3). `swift3`使用`#selector`指定的方法，只有当方法权限为private时需要加`@objc`修饰符，现在`Swift4.0`全都要加`@objc`修饰符
- 4). 自定义的`protocol`协议中,有`optional`修饰的非必须实现的方法,需要用`@objc`修饰

- 5). 字体方面的一些重命名

```objc
NSFontAttributeName --- .font
//或者NSAttributedStringKey.font

NSForegroundColorAttributeName --- .foregroundColor
//NSAttributedStringKey.foregroundColor

NSStrikethroughStyleAttributeName --- .strikethroughStyle
//NSAttributedStringKey.strikethroughStyle

//字符串类型的,添加rawValue
NSAttributedStringKey.font.rawValue

//等等等等..........

//大部分类似以下,涉及富文本的方法均已改为了NSAttributedStringKey类型
addAttributes(_ attrs: [NSAttributedStringKey : Any] = [:], range: NSRange)
```

## 一些的报错问题
### "Closure cannot implicitly capture a mutating self parameter"错误

> 在struct中，如果我们在闭包中使用self，就会得到Closure cannot implicitly capture a mutating self parameter的错误提示。比如：


```objc

struct RecordModel {
    /// 定义一个闭包
    var action: (() -> ())?
    var height = 10

    self.action = {
        self.height = 20
        //Closure cannot implicitly capture a mutating self parameter报错
    }
}
```
> 并且由`于RecordModel`的类型是`struct`，我们也没发在`action`闭包里添加截获列表。那么是不是就必须使用`class`了？答案是否定的。有两种方式可以解决这个问题。

#### 方案一：为`closure`增加一个inout类型的参数

```objc

struct RecordModel {
    /// 定义一个闭包
    var action: ((_ inSelf: inout RecordModel) -> ())?
    var height = 10

    self.action = { (inSelf) in
        inSelf.height = 20
    }
}

```
> 根据inout类型的说明，我们知道，实际上这相当于增加了一个隐藏的临时变量，self被复制，然后在closure(闭包)中使用，完成后，再复制回self。也就是说，这个方法有额外的内存开销。如果是struct较大的情形，这么做并不划算。

#### 方案二：使用`UnsafeMutablePointer<Pointee>`

- 这次采用直接指针的方式对于struct来进行操作，采用指针的好处是self不会被多次复制，性能较高。缺点是你需要自行确定你的代码的安全。

```objc

struct RecordModel {
    /// 定义一个闭包
    var action: (() -> ())?
    var height = 10

    let selfPointer = UnsafeMutablePointer(&self)
    self.action = {
        selfPointer.pointee.height = 20

    }
}

```

#### 结论

`Closure cannot implicitly capture a mutating self parameter`错误的原因是在进出`closure(闭包)`之后，self的一致性没办法得到保证，所以编译器默认不允许在`struct的closure(闭包)`中使用self。如果我们确定这么做是安全的，就可以通过上面的两种方式解决这个问题。其中，方法二的性能更好一些。

#### 注意
> #### 这里可以记一下指针和swift变量之间的关系：

- `UnsafePointer对应let`
- `UnsafeMutablePointer对应var`
- `AutoreleasingUnsafeMutablePointer对应unowned UnsafeMutablePointer`，用于inout的参数类型
- `UnsafeRawPointer对应let Any`，raw系列都是对应相应的Any类型
- `UnsafeBufferPointer是non-owning的类型（unowned`），用于collection的elements, buffer系列均如此


### `Declarations from extensions cannot be overridden yet` 错误

这个错误大致是因为,协议方法是在`extension`里面的,不能被重写

> 解决办法:(仅供参考,如有更好的建议还望多多指教)
- 小编想到的解决办法就是在每一个需要此协议的类里面,重新遵循代理,实现该协议方法

### `"Method 'initialize()' defines Objective-C class method 'initialize', which is not permitted by Swift"`

报错原因: 在于已经废弃的initialize方法,示例如下

 - 方法交叉(Method Swizzling)
 - 有时为了方便，也有可能是解决某些框架内的 bug，或者别无他法时，需要修改一个已经存在类的方法的行为。方法交叉可以让你交换两个方法的实现，相当于是用你写的方法来重载原有方法，并且还能够是原有方法的行为保持不变。


```objc
extension UIViewController {
    public override class func initialize() {//此处报错

    //此处省略100行代码

    }
}

```
- initialize该方法已经被Swift4.0废弃
- 在Swift3.0还勉强可以使用,但是会有警告;但是在4.0已经被完全废弃

> 替代方法:

 - 在 app delegate 中实现方法交叉
 - 像上面通过类扩展进行方法交叉，而是简单地在 app delegate 的 application(_:didFinishLaunchingWithOptions:) 方法调用时调用该方法


```objc
extension UIViewController {
    public override class func initializeOnceMethod() {

    //此处省略100行代码

    }
}

//在AppDelegate的方法中调用:
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]? = nil) -> Bool {
    //此处省略100行代码
    UIViewController.initializeOnceMethod()

}
```

### `'dispatch_once' is unavailable in Swift: Use lazily initialized globals instead`
> 报错原因: `dispatch_once在Swift4.0`也已经被废弃


```objc
extension UITableView {
    struct once{
        static var onceTaken:Int = 0
    }
    dispatch_once(&once.onceTaken) { () -> Void in
    //在这里dispatch_once就会报错
        //此处省略1000000行代码    
    }
}
```

<div class="note success"><p>解决方法: 通过给DispatchQueue添加扩展实现</p></div>


```objc
extension DispatchQueue {
    private static var _onceTracker = [String]()
    public class func once(token: String, block: () -> ()) {
        objc_sync_enter(self)
        defer {
            objc_sync_exit(self)
        }
        if _onceTracker.contains(token) {
            return
        }
        _onceTracker.append(token)
        block()
    }

    func async(block: @escaping ()->()) {
        self.async(execute: block)
    }

    func after(time: DispatchTime, block: @escaping ()->()) {
        self.asyncAfter(deadline: time, execute: block)
    }
}

```
> 使用字符串token作为once的ID，执行once的时候加了一个锁，避免多线程下的token判断不准确的问题。
使用的时候可以传token

```objc
 DispatchQueue.once(token: "tableViewOnce") {
     print( "Do This Once!" )  
 }
```
> 或者使用UUID也可以：

```objc
private let _onceToken = NSUUID().uuidString

DispatchQueue.once(token: _onceToken) {  
    print( "Do This Once!" )  
}
```

> - 后续又遇到别的问题会继续更新
> - 文章中如有解释不足之处,还望多多指教
