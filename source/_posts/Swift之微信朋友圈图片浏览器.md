---
title: Swift之微信朋友圈图片浏览器
date: 2017-10-28 19:19:19
tags: [Swift, CATransition, UIBesizationv]
categories: Swift高阶功能
---

> 最近闲来无事,突然对微信, 微博, QQ等社交APP的九宫格的图片浏览功能非常感兴趣, 最近就尝试着研究了一下:

> 这里先附上[Demo地址](https://github.com/coderQuanjun/JunPhotoBrowseDemo)


<!-- more -->

- 在介绍项目之前, 先介绍三个基础知识
  - `CATransition`转场动画
  - `ViewController`自定义转场
  - `UIBesization`贝塞尔曲线

## CATransition转场动画
> 示例代码

```objc
//4. 转场动画
let transition = CATransition()
transition.type = transitionType
transition.subtype = isNext ? kCATransitionFromRight : kCATransitionFromLeft
transition.duration = 1
downloadImage(url: imageURL)
baseImage.layer.add(transition, forKey: "transition")
```

更多关于该动画的详细介绍, 可参考[iOS出门必备之CoreAnimation(核心动画)](http://www.jianshu.com/p/2b2f49399b7e)中第七种CA动画, 故这里不多做介绍

## `ViewController`自定义转场
> 从iOS7开始，苹果更新了自定义ViewController转场的API,会用到的几个协议`protocol`:

- 描述ViewController转场的：
  - `UIViewControllerTransitioningDelegate`
  - `UINavigationControllerDelegate`
  - `UITabBarControllerDelegate`
- 定义动画内容的
  - `UIViewControllerAnimatedTransitioning`
  - `UIViewControllerInteractiveTransitioning`
- 表示动画上下文的
  - `UIViewControllerContextTransitioning`

### 描述ViewController转场的

-  为什么苹果要引入这一套API？因为在iOS7之前，做转场动画很麻烦，要写一大堆代码在ViewController中。
-  引入这一套API之后，在丰富功能的同时极大程度地降低了代码耦合，实现方式就是将之前在ViewController里面的代码通过protocol分离了出来。
- 顺着这个思路往下想，实现自定义转场动画首先需要找到ViewController的delegate。
- 苹果告诉我们切换ViewController有三种形式：
  - `UITabBarController`内部切换
  - `UINavigationController`切换
  - `present  ViewController`
  - 这三种方式是不是需要不同的protocol呢？

### 详解Protocol
- `UIViewControllerTransitioningDelegate` 自定义模态转场动画时使用。
  - 设置`UIViewController`的属性`transitioningDelegate`

  ```
  weak open var transitioningDelegate: UIViewControllerTransitioningDelegate?
  ```

- `UINavigationControllerDelegate` 自定义navigation转场动画时使用
  - 设置`UINavigationController`的属性`delegate`

  ```
  weak open var delegate: UINavigationControllerDelegate?
  ```

- `UITabBarControllerDelegate`自定义tab转场动画时使用
  - 设置`UITabBarController`的属性`delegate`

  ```
  weak open var delegate: UITabBarControllerDelegate?
  ```

实际上这三个protocol干的事情是一样的只不过他们的应用场景不同罢了。我们下面以UINavigationControllerDelegate为例，其他的类似

- `UINavigationControllerDelegate`主要的方法

```objc
    @available(iOS 7.0, *)
    optional public func navigationController(_ navigationController: UINavigationController, interactionControllerFor animationController: UIViewControllerAnimatedTransitioning) -> UIViewControllerInteractiveTransitioning?


    @available(iOS 7.0, *)
    optional public func navigationController(_ navigationController: UINavigationController, animationControllerFor operation: UINavigationControllerOperation, from fromVC: UIViewController, to toVC: UIViewController) -> UIViewControllerAnimatedTransitioning?

```

- 两个方法分别返回`UIViewControllerInteractiveTransitioning`和`UIViewControllerAnimatedTransitioning`，它们的任务是描述动画行为（转场动画如何执行，就看它俩的）。
- 从名字可以看出，这两个`protocol`的区别在于是否是`interactive`的。如何理解？
- `interactive`动画可以根据输入信息的变化改变动画的进程。例如iOS系统为`UINavigationController`提供的默认右滑退出手势就是一个`interactive` 动画，整个动画的进程由用户手指的移动距离控制


### `UIViewControllerInteractiveTransitioning`协议
> 定义了两个属性可以做到平滑过渡
- `completionCurve`: 交互结束后剩余动画的速率曲线
- `completionSpeed`: 交互结束后动画的开始速率由该参数与原来的速率相乘得到，实际上是个缩放参数，这里应该使用单位变化速率(即你要的速率/距离)。
- 注意：
  - `completionSpeed`会影响剩余的动画时间，而不是之前设定的转场动画时间剩下的时间；
  - 当`completionSpeed`很小时剩余的动画时间可能会被拉伸得很长，所以过滤下较低的速率比较好。
  - 如果不设置两个参数，转场动画将以原来的速率曲线在当前进度的速率继续。
  - 不过从实际使用效果来看，往往不到0.5s的动画时间，基本上看不出什么效果来

### 定义动画内容的`UIViewControllerAnimatedTransitioning`
- 必须实现的方法

```objc
//返回动画的执行时间
public func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval

//处理具体的动画  
public func animateTransition(using transitionContext: UIViewControllerContextTransitioning)

```

### 表示动画上下文`UIViewControllerContextTransitioning`

- `UIViewControllerContextTransitioning提供了一系列方法`
- 是唯一一个我们不需要实现的Protocol
- 下面是一些我们常用的属性和方法:

```objc
//转场动画发生在该View中    
public var containerView: UIView { get }

//上报动画执行完毕
public func completeTransition(_ didComplete: Bool)

//根据key返回一个ViewController。我们通过`FromViewControllerKey`找到将被替换掉的VC，通过`ToViewControllerKey`找到将要显示的VC
public func viewController(forKey key: UITransitionContextViewControllerKey) -> UIViewController?

//根据key返回一个view, 我们通过from找到将要消失的view, 根据to找到将要弹出的view
@available(iOS 8.0, *)
public func view(forKey key: UITransitionContextViewKey) -> UIView?

```

### `UIViewControllerTransitioningDelegate`自定义模态转场时使用

```objc
// 该方法是告诉系统,弹出动画交给谁来处理
func animationController(forPresented presented: UIViewController, presenting: UIViewController, source: UIViewController) -> UIViewControllerAnimatedTransitioning? {
    isPresent = true
    return self
}

// 该方法是告诉系统,消失动画交给谁来处理
func animationController(forDismissed dismissed: UIViewController) -> UIViewControllerAnimatedTransitioning? {
    isPresent = false
    return self
}

```

## 图片浏览器项目介绍
### 项目结构`Alamofire + MVVM`
![框架结构](http://upload-images.jianshu.io/upload_images/4122543-20b3afa03d389bb7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

![图片浏览器.gif](http://upload-images.jianshu.io/upload_images/4122543-a54d1b9e6d553950.gif?imageMogr2/auto-orient/strip)

### 自定义`ViewController`的弹出和消失动画

#### 自定义`ViewController`弹出和消失的Protocol

```objc
//MARK: 自定义协议
protocol JunBrowsePresentDelefate: NSObjectProtocol {
    /// 1. 提供弹出的imageView
    func imageForPresent(indexPath: IndexPath) -> UIImageView

    /// 2. 提供弹出的imageView的frame
    func startImageRectForpresent(indexPath: IndexPath) -> CGRect

    /// 3.提供弹出后imageView的frame
    func endImageRectForpresent(indexPath: IndexPath) -> CGRect
}

protocol JunBrowserDismissDelegate {
    /// 1.提供推出的imageView
    func imageViewForDismiss() -> UIImageView

    /// 2. 提供推出的indexPath
    func indexPathForDismiss() -> IndexPath
}

```

### 遵循协议
- `UIViewControllerTransitioningDelegate`告诉系统弹出/消失动画的处理页面
- `UIViewControllerAnimatedTransitioning`
  - 需要返回动画的执行时间
  - 需要在弹出和消失页面的时候分别执行不同的动画

```objc
//MARK: UIViewControllerTransitioningDelegate
extension PhotoBrowseAnimation: UIViewControllerTransitioningDelegate {
    // 该方法是告诉系统,弹出动画交给谁来处理
    func animationController(forPresented presented: UIViewController, presenting: UIViewController, source: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        isPresent = true
        return self
    }

    // 该方法是告诉系统,消失动画交给谁来处理
    func animationController(forDismissed dismissed: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        isPresent = false
        return self
    }
}


//MARK: 继承AnimatedTransitioning协议
extension PhotoBrowseAnimation: UIViewControllerAnimatedTransitioning {
    //返回动画的执行时间
    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return 0.6
    }

    //处理具体的动画
    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
        isPresent ? presentAnimation(transitionContext) : dismissAnimation(transitionContext)
    }
}

```

### 图片列表界面
#### 在点击需要展示的imageView的时候,调用下面的方法

```objc
// MARK:- 弹出照片浏览器
extension JunScrollViewController {
    fileprivate func presentPhotoBrowse(indexPath: IndexPath) {
        //1. 创建图片浏览器
        let photoBrowseVC = BrowseViewController(images: imageVM.imageArray, currentIndexP: indexPath)
        //2. 设置弹出样式为自定义
        photoBrowseVC.modalPresentationStyle = .custom
        //3. 设置转场动画代理
        photoBrowseVC.transitioningDelegate = photoAnimation
        //4. 设置broseAnimation的属性
        photoAnimation.setProperty(indexPath: indexPath, self, photoBrowseVC)
        //5. 弹出图片浏览器
        present(photoBrowseVC, animated: true, completion: nil)
    }
}

```

#### 遵循并实现自定义的协议方法

```objc
//MARK: JunBrowsePresentDelefate
extension JunScrollViewController: JunBrowsePresentDelefate {
    func imageForPresent(indexPath: IndexPath) -> UIImageView {
        let imageV = UIImageView()
        imageV.contentMode = .scaleAspectFill
        imageV.clipsToBounds = true
        //设置图片
        imageV.kf.setImage(with: URL(string: imageVM.imageArray[indexPath.item].pic74), placeholder: UIImage(named: "coderJun"))
        return imageV
    }

    func startImageRectForpresent(indexPath: IndexPath) -> CGRect {
        // 1.取出cell
        guard let cell = imageCollection.cellForItem(at: indexPath) else {
            return CGRect(x: imageCollection.bounds.width * 0.5, y: kScreenHeight + 50, width: 0, height: 0)
        }

        // 2.计算转化为UIWindow上时的frame
        return imageCollection.convert( cell.frame, to: UIApplication.shared.keyWindow)
    }

    func endImageRectForpresent(indexPath: IndexPath) -> CGRect {
        //1. 取出对应的image的url
        let imageUrl = URL(string: imageVM.imageArray[indexPath.item].pic74)!

        //2.从缓存中取出image
        var image = KingfisherManager.shared.cache.retrieveImageInDiskCache(forKey: imageUrl.absoluteString)
        if image == nil {
            image = UIImage(named: "coderJun")
        }

        // 3.根据image计算位置
        let imageH = kScreenWidth / image!.size.width * image!.size.height
        let y: CGFloat = imageH < kScreenHeight ? (kScreenHeight - imageH) / 2 : 0

        return CGRect(x: 0, y: y, width: kScreenWidth, height: imageH)
    }
}

```

### 在图片展示界面
- 遵循并实现相关dismiss协议方法
- 该协议主要实现viewController返回到该图片对应的`IndexPath`所在的位置

```objc
//MARK: JunBrowserDismissDelegate
extension JunTranstionPhotoController: JunBrowserDismissDelegate{
    func imageViewForDismiss() -> UIImageView {
        let imageV = UIImageView()
        imageV.contentMode = .scaleAspectFill
        imageV.clipsToBounds = true

        //设置图片
        imageV.image = baseImage.image
        imageV.frame = baseImage.convert(baseImage.frame, to: UIApplication.shared.keyWindow)

        return imageV
    }

    func indexPathForDismiss() -> IndexPath {
        return IndexPath(item: currentIndex, section: 0)
    }
}

```

---
### GitHub[Demo地址](https://github.com/coderQuanjun/JunPhotoBrowseDemo)

-  注意:  
  - 这里只是列出了主要的核心代码,具体的代码逻辑请参考demo
  - 文中相关介绍有的地方如果有不是很详细或者有更好建议的,欢迎联系小编
