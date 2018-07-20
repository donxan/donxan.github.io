---
title: R.Swift高效引用资源文件
date: 2018-07-20 15:15:47
tags: [Swift, R.Swift]
categories: 入坑指南
---




- 在iOS中当我们引用一张图片的时候, 我们需要创建一个`UIImage`对象去引用图片
- 当我们需要解析`json`或者`plist`文件的时候, 通常以`Bundle.main`的方式去解析

```Swift
let oldImage = UIImage(named: "yellow-image")
let jsonData = Bundle.main.path(forResource: "menuList", ofType: "json")
```



<!-- more -->



- 这里得到的`oldImage`和`jsonData`都是`Optional`类型, 那么这样就会有一个问题: 如果以上文件名字修改了或者输错了, 那么得到的结果就是空的, 后期处理的时候就可能会程序崩溃或者没有数据
- 而且类似方法接受的都是字符串对象, 所以即使传入的错误的字符串, 编译程序的时候也不会报错
- 为了完美的解决上面的问题, 这里介绍一个搞笑引用资源文件的框架[`R.Swift`](https://github.com/mac-cain13/R.swift)

### 什么是`R.Swift`
- [`R.Swift`](https://github.com/mac-cain13/R.swift)是一款基于`Swift`平台，针对`iOS`以及`tvOS`开发的资源引用框架
- 它所针对的问题，就是类似于上面提到的一样，避免使用字符串来构造某些资源实例
- `R.Swift`能够使用类似语法`R.资源类型.资源名称`来对某资源进行引用构建
- `R.Swift`有着动态生成代码的机制, 它具有以下优点：
  - 代码自动补全：就像输入其他的代码一样，`R.Swift`支持`IDE`的代码自动补全
  - 自动检测: 可以自动检测代码是否存在问题, 当我们的资源文件名修改的时候, 这是就会提示资源引用错误


### 安装和配置[`R.Swift`](https://github.com/mac-cain13/R.swift)

#### 安装
- 使用`CocoaPods`来对`R.Swift`进行安装
- 在你的` Podfile `文件中添加如下代码, 并在终端运行`pod install`

```
pod 'R.swift'
```

#### 配置信息

1. 如下图所示, 添加一个`New Run Script Phase`

![image](http://p7hfnfk6u.bkt.clouddn.com/RSwiftRun.png)


2. 将`Run Script`拖动到`Check Pods Manifest.lock`的下面, 并添加脚本

```
"$PODS_ROOT/R.swift/rswift" generate "$SRCROOT"
```


![image](http://p7hfnfk6u.bkt.clouddn.com/RSwiftadd.png)


3. `Command+B`编译项目，在项目代码目录下，会生成一个`R.generated.swift` 的文件，将它拖如项目中

<div class="note warning"><p>注意：</p></div>

- 不要勾选`Copy items if needed`选项，因为每次编译都会生成新的`R.generated.swift`文件，`copy`的话，旧的`R.generated.swift`将不会被覆盖
- 每当我们修改了资源，我们需要`Command + B`来编译一下项目从而让`R.Swift`自动进行配置更新
- 这里是坐着录得一个如何导入和配置`R.Swift`的[视频教程](https://vimeo.com/122888912)

4. 配置到此完成，这里我们可以看一下`R.generated.swift`文件的基本内容, 下面我们可以构建自己的项目了

```Swift
struct R: Rswift.Validatable {
  fileprivate static let applicationLocale = hostingBundle.preferredLocalizations.first.flatMap(Locale.init) ?? Locale.current
  fileprivate static let hostingBundle = Bundle(for: R.Class.self)
  
  static func validate() throws {
    try intern.validate()
  }
  

  /// This `R.file` struct is generated, and contains static references to 1 files.
  struct file {
    /// Resource file `menuList.json`.
    static let menuListJson = Rswift.FileResource(bundle: R.hostingBundle, name: "menuList", pathExtension: "json")
    
    /// `bundle.url(forResource: "menuList", withExtension: "json")`
    static func menuListJson(_: Void = ()) -> Foundation.URL? {
      let fileResource = R.file.menuListJson
      return fileResource.bundle.url(forResource: fileResource)
    }
    
    fileprivate init() {}
  }
  

  /// This `R.image` struct is generated, and contains static references to 3 images.
  struct image {
    /// Image `blueimage`.
    static let blueimage = Rswift.ImageResource(bundle: R.hostingBundle, name: "blueimage")
    /// Image `computers`.
    static let computers = Rswift.ImageResource(bundle: R.hostingBundle, name: "computers")
    /// Image `yellow-image`.
    static let yellowImage = Rswift.ImageResource(bundle: R.hostingBundle, name: "yellow-image")
    
    /// `UIImage(named: "blueimage", bundle: ..., traitCollection: ...)`
    static func blueimage(compatibleWith traitCollection: UIKit.UITraitCollection? = nil) -> UIKit.UIImage? {
      return UIKit.UIImage(resource: R.image.blueimage, compatibleWith: traitCollection)
    }
    
    /// `UIImage(named: "computers", bundle: ..., traitCollection: ...)`
    static func computers(compatibleWith traitCollection: UIKit.UITraitCollection? = nil) -> UIKit.UIImage? {
      return UIKit.UIImage(resource: R.image.computers, compatibleWith: traitCollection)
    }
    
    /// `UIImage(named: "yellow-image", bundle: ..., traitCollection: ...)`
    static func yellowImage(compatibleWith traitCollection: UIKit.UITraitCollection? = nil) -> UIKit.UIImage? {
      return UIKit.UIImage(resource: R.image.yellowImage, compatibleWith: traitCollection)
    }
    
    fileprivate init() {}
  }
  
  /// This `R.nib` struct is generated, and contains static references to 2 nibs.
  struct nib {
    /// Nib `ImageFontController`.
    static let imageFontController = _R.nib._ImageFontController()
    /// Nib `NibTableViewCell`.
    static let nibTableViewCell = _R.nib._NibTableViewCell()
    
    /// `UINib(name: "ImageFontController", in: bundle)`
    static func imageFontController(_: Void = ()) -> UIKit.UINib {
      return UIKit.UINib(resource: R.nib.imageFontController)
    }
    
    /// `UINib(name: "NibTableViewCell", in: bundle)`
    static func nibTableViewCell(_: Void = ()) -> UIKit.UINib {
      return UIKit.UINib(resource: R.nib.nibTableViewCell)
    }
    
    fileprivate init() {}
  }
  

  /// This `R.storyboard` struct is generated, and contains static references to 3 storyboards.
  struct storyboard {
    /// Storyboard `LaunchScreen`.
    static let launchScreen = _R.storyboard.launchScreen()
    /// Storyboard `Main`.
    static let main = _R.storyboard.main()
    /// Storyboard `NibHome`.
    static let nibHome = _R.storyboard.nibHome()
    
    /// `UIStoryboard(name: "LaunchScreen", bundle: ...)`
    static func launchScreen(_: Void = ()) -> UIKit.UIStoryboard {
      return UIKit.UIStoryboard(resource: R.storyboard.launchScreen)
    }
    
    /// `UIStoryboard(name: "Main", bundle: ...)`
    static func main(_: Void = ()) -> UIKit.UIStoryboard {
      return UIKit.UIStoryboard(resource: R.storyboard.main)
    }
    
    /// `UIStoryboard(name: "NibHome", bundle: ...)`
    static func nibHome(_: Void = ()) -> UIKit.UIStoryboard {
      return UIKit.UIStoryboard(resource: R.storyboard.nibHome)
    }
    
    fileprivate init() {}
  }

   fileprivate init() {}
}
```

### `R.Swift`的使用

#### `Images` - 图片

```Swift
//传统方式
let oldImage = UIImage(named: "yellow-image")
oldImageView.image = oldImage

//R.Swift方式
let newImage = R.image.yellowImage()
newImageView.image = newImage
```

#### `Custom fonts` - 字体
这里需要注意的一点是, 字体的引用需要引入一个`ttf`格式的字体文件, 不然无法编译除类似`acmeLight`的函数

```Swift
//传统方式
let lightFontTitle = UIFont(name: "Acme-Light", size: 22)

//R.Swift方式
let lightFontTitle = R.font.acmeLight(size: 22)
```


#### `Resource files` - 数据文件

```Swift
//传统方式
let jsonData = Bundle.main.path(forResource: "menuList", ofType: "json")
let jsonUrl1 = Bundle.main.url(forResource: "menuList", withExtension: "json")

//R.Swift方式
let jsonData2 = R.file.menuListJson.path()
let newUrl = R.file.menuListJson()
```



#### `Storyboards`

```Swift
//传统方式
let nibVC1 = UIStoryboard(name: "NibHome", bundle: nil).instantiateInitialViewController() ?? UIViewController()

let storyboard = UIStoryboard(name: "Main", bundle: nil)
let initialTabBarController = storyboard.instantiateInitialViewController() as? UITabBarController
let settingsController = storyboard.instantiateViewController(withIdentifier: "settingsController") as? SettingsControllerSettingsController


//R.Swift方式
let nibVC = R.storyboard.nibHome().instantiateInitialViewController() ?? UIViewController()

let storyboard = R.storyboard.main()
let initialTabBarController = R.storyboard.main.initialViewController()
let settingsController = R.storyboard.main.settingsController()
```



#### `Nibs`

```Swift
//传统方式
let nameOfNib = "CustomView"
let customViewNib = UINib(nibName: "CustomView", bundle: nil)
let rootViews = customViewNib.instantiate(withOwner: nil, options: nil)
let customView = rootViews[0] as? CustomView

let viewControllerWithNib = CustomViewController(nibName: "CustomView", bundle: nil)


//R.Swift方式
let nameOfNib = R.nib.customView.name
let customViewNib = R.nib.customView()
let rootViews = R.nib.customView.instantiate(withOwner: nil)
let customView = R.nib.customView.firstView(owner: nil)

let viewControllerWithNib = CustomViewController(nib: R.nib.customView)
```



#### `Reusable table view cells` - cell复用
这里是`UITableViewCell`的注册和使用为例, `UICollectionViewCell`亦同理

```Swift
//传统方式
let cellNib = UINib(nibName: "NibTableViewCell", bundle: nil)
tableView.register(cellNib, forCellReuseIdentifier: "NibTableViewCell")

func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "NibTableViewCell", for: indexPath)
    cell?.leftLabel.text = dataArr[indexPath.row]
    return cell ?? UITableViewCell()
}
         

//R.Swift方式
tableView.register(R.nib.nibTableViewCell(), forCellReuseIdentifier: R.nib.nibTableViewCell.name)

func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: R.nib.nibTableViewCell.name, for: indexPath) as? NibTableViewCell
    cell?.leftLabel.text = dataArr[indexPath.row]
    return cell ?? UITableViewCell()
}
```


> 更多关于`R.Swift`的使用可参考[官方文档`Examples.md`](https://github.com/mac-cain13/R.swift/blob/master/Documentation/Examples.md#images)


---

