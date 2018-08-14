---
title: Swift之Facebook的POP动画使用和实战
date: 2017-10-17 21:18:38
tags: [Swift, Facebook POP]
categories: iOS动画
image: 
---

![image](http://upload-images.jianshu.io/upload_images/4122543-a85faa1b734ebc00.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<!-- more -->



- [POP](https://github.com/facebook/pop)是一个来自于Facebook，在iOS与OSX上通用的极具扩展性的动画引擎。它在基本的静态动画的基础上增加的弹簧动画与衰减动画，使之能创造出更真实更具物理性的交互动画。
- `Pop Animation`在使用上和`Core Animation`很相似，都涉及`Animation`对象以及`Animation`的载体的概念
- 关于`Core Animation`的相关详解, 可参考我的上一篇文章[Core Animation(核心动画)](http://blog.csdn.net/ShmilyCoder/article/details/78219044)
- 不同的是`Core Animation`的载体只能是`CALayer`，而`Pop Animation`可以是任意基于`NSObject`的对象
- [POP](https://github.com/facebook/pop) 使用 `Objective-C++` 编写，`Objective-C++` 是对 `C++` 的扩展
- [GitHub项目地址](https://github.com/coderQuanjun/POPAnimationDemo)





## POP自我介绍
- [POP](https://github.com/facebook/pop) 目前由四部分组成：1. Animations；2. Engine；3. Utility；4. WebCore。
- [POP](https://github.com/facebook/pop) 动画极为流畅，主要在于Enimator 里，POP 通过 CADisplayLink 高达 60 FPS 的特性，打造了一个游戏级的动画引擎。
- CADisplayLink 是类似 NSTimer 的定时器，不同之处在于，NSTimer 用于我们定义任务的执行周期、资料的更新周期，他的执行受到 CPU 的阻塞影响，而 CADisplayLink 则用于定义画面的重绘、动画的演变，他的执行基于 frames 的间隔。
 - 通过 CADisplayLink，Apple 允许你将 App 的重绘速度设定到和屏幕刷新频率一致，由此你可以获得非常流畅的交互动画，这项技术的应用在游戏中非常常见，著名的 Cocos-2D 也应用了这个重要的技术。
 - [WebCore](https://opensource.apple.com/source/WebCore/) 里包含了一些从 Apple 的开源的网页渲染引擎里拿出的源文件，与 Utility 里的组件一并，提供了 POP 的各项复杂计算的基本支持

## POP参数介绍
- POP默认支持三种动画，但同时也支持自定义动画
  - `POPBasicAnimation`   //基础动画
  - `POPSpringAnimation`  //弹簧动画
  - `POPDecayAnimation`   //衰减动画
  - `POPCustomAnimation`  //自定义动画

### 相关属性介绍

#### 属性简单介绍
- POP动画大部分属性和CoreAnimation(核心动画)的含义和用法一样
- 具体可参考[Core Animation(核心动画)](http://blog.csdn.net/ShmilyCoder/article/details/78219044)
- 每种动画的特殊属性会在下文中继续介绍


#### 动画可配置属性
- CALayer层各属性(比较简单,就不加注释了)

```objc
/**
 Common CALayer property names.
 */
extern NSString * const kPOPLayerBackgroundColor;
extern NSString * const kPOPLayerBounds;
extern NSString * const kPOPLayerCornerRadius;
extern NSString * const kPOPLayerBorderWidth;
extern NSString * const kPOPLayerBorderColor;
extern NSString * const kPOPLayerOpacity;
extern NSString * const kPOPLayerPosition;
extern NSString * const kPOPLayerPositionX;
extern NSString * const kPOPLayerPositionY;
extern NSString * const kPOPLayerRotation;
extern NSString * const kPOPLayerRotationX;
extern NSString * const kPOPLayerRotationY;
extern NSString * const kPOPLayerScaleX;
extern NSString * const kPOPLayerScaleXY;
extern NSString * const kPOPLayerScaleY;
extern NSString * const kPOPLayerSize;
extern NSString * const kPOPLayerSubscaleXY;
extern NSString * const kPOPLayerSubtranslationX;
extern NSString * const kPOPLayerSubtranslationXY;
extern NSString * const kPOPLayerSubtranslationY;
extern NSString * const kPOPLayerSubtranslationZ;
extern NSString * const kPOPLayerTranslationX;
extern NSString * const kPOPLayerTranslationXY;
extern NSString * const kPOPLayerTranslationY;
extern NSString * const kPOPLayerTranslationZ;
extern NSString * const kPOPLayerZPosition;
extern NSString * const kPOPLayerShadowColor;
extern NSString * const kPOPLayerShadowOffset;
extern NSString * const kPOPLayerShadowOpacity;
extern NSString * const kPOPLayerShadowRadius;

```
 - UIVIew层

```objc
/**
 Common UIView property names.
 */
extern NSString * const kPOPViewAlpha;
extern NSString * const kPOPViewBackgroundColor;
extern NSString * const kPOPViewBounds;
extern NSString * const kPOPViewCenter;
extern NSString * const kPOPViewFrame;
extern NSString * const kPOPViewScaleX;
extern NSString * const kPOPViewScaleXY;
extern NSString * const kPOPViewScaleY;
extern NSString * const kPOPViewSize;
extern NSString * const kPOPViewTintColor;

```
- 其他层视图层

```objc
/**
 Common UINavigationBar property names.
 */
extern NSString * const kPOPNavigationBarBarTintColor;

/**
 Common UIToolbar property names.
 */
extern NSString * const kPOPToolbarBarTintColor;

/**
 Common UITabBar property names.
 */
extern NSString * const kPOPTabBarBarTintColor;

/**
 Common UILabel property names.
 */
extern NSString * const kPOPLabelTextColor;

```
> 以上仅仅列出了常用的一些属性,更多控件/更多参考框架里面类
POPAnimatableProperty.h


#### POPBasicAnimation可配置的属性与默认值为

```objc
POPBasicAnimation *basic = [POPBasicAnimation linearAnimation];
basic.fromValue = @(0);//从0开始    basic.toValue = @(3*60);//180秒后结束
basic.duration = 3*60;//持续3分钟
[lab pop_addAnimation:basic forKey:nil];

```


```objc
let basic1 = POPBasicAnimation(propertyNamed: kPOPLayerPositionX)
basic1?.fromValue = redView.layer.position.x
basic1?.toValue = 300
basic1?.beginTime = CFTimeInterval() + 1.0
redView.pop_add(basic1, forKey: "position.x")

```

## POPBasicAnimation基础动画

### 先看一下效果, 其动画效果如下

![image](http://upload-images.jianshu.io/upload_images/4122543-1efeb167ad71b59d.gif?imageMogr2/auto-orient/strip)

### 示例代码

```objc
let basic1 = POPBasicAnimation(propertyNamed: kPOPLayerPositionX)
basic1?.toValue = 300
//开始时间
basic1?.beginTime = CFTimeInterval() + 1.0
redView.pop_add(basic1, forKey: "position.x")
```

### 可以看到，添加一个动画最少仅需三步

- 1）定义一个`animation`对象，并指定对应的动画属性（`kPOPLayerPositionX`）
- 2）设置初始值结束值(初始值可以不指定，会默认从当前值开始）
- 3）添加到想产生动画的对象上


### Core Animation 和 POP 运行动画对比
- 由于 POP 是基于定时器定时刷新添加动画的原理，那么如果将动画库运行在主线程上，会由于线程阻塞的问题导致动画效果出现卡顿、不流畅的情况。
- 更为关键的是，你不能将动画效果放在子线程，因为你不能将对 view 和 layer 的操作放到主线程之外
- POP 受主线程阻塞的影响很大，在使用过程中，应避免在有可能发生主线程阻塞的情况下使用 POP ，避免制作卡顿的动画效果，产生不好的用户体验


## POPSpringAnimation弹性动画
### 属性介绍
- `velocity`: 设置动画开始速度
- `springBounciness`: 振幅, 可以设置的范围是0-20，默认为4。值越大振动的幅度越大
- `springSpeed`: 速度, 可以设置的范围是0-20，默认为12.值越大速度越快，结束的越快
- `dynamicsMass`: 质量, 质量越大，动画的速度越慢，振动的幅度越大，结束的越慢
- `dynamicsTension`: 拉力 拉力越大，动画的速度越快，结束的越快
- `dynamicsFriction`: 摩擦力, 摩擦力越大，动画的速度越慢，振动的幅度越小。

> 注意: 以上的六个属性中一般只会设置`springBounciness`和`springSpeed`, 如有特殊需求才会设置其他属性

### 代码示例

```objc
let spring = POPSpringAnimation(propertyNamed: kPOPViewScaleXY)
//注意: 这里改变的是x和y的比例,参数赋值也要传两个; 若只需要其中一个,则可设置
//`spring?.fromValue = 0.4`即可
spring?.fromValue = CGSize(width: 0.3, height: 0.3)
spring?.toValue = CGSize(width: 2, height: 2)
spring?.springSpeed = 5
spring?.springBounciness = 15
lightBlue.pop_add(spring, forKey: "scale")

```


## POPDecayAnimation
- `POPDecayAnimation`提供一个过阻尼效果（其实`Spring`是一种欠阻尼效果）可以实现类似`UIScrollView`的滑动衰减效果（是的你可以靠它来自己实现一个`UIScrollView`）

> 属性介绍
- `deceleration` （负加速度, 衰减系数(越小则衰减得越快)） 是一个你会很少用到的值，默认是就是我们地球的 0.998，如果你开发APP给火星人用，那么这个值你使用 0.376 会更合适
- `velocity` 也是必须和你操作的属性有相同的结构，如果你操作的是 bounds, 传CGRect类型;如果 velocity 是负值，那么就会反向递减

> 代码示例

```objc
let decay = POPDecayAnimation(propertyNamed: kPOPViewSize)
decay?.velocity = CGSize(width: 300, height: pictureBtn.frame.height)
//延迟1秒后执行
decay?.beginTime = CACurrentMediaTime() + 1.0
pictureBtn.pop_add(decay, forKey: "size")

```

## 自定义属性
POP默认支持的三种动画都继承自`POPPropertyAnimation`,  `POPPropertyAnimation`中定义了一个叫`property`的属性（之前没有用到它是因为POP根据不同的默认动画属性帮你生成了默认的`property`这个属性则是用来驱动POP的动画效果中的重要一环

### 实力模块

```objc
if let proper = POPAnimatableProperty.property(withName: "prop", initializer: { (prop) in
    guard let prop = prop else { return }
    //read
    prop.readBlock = { (obj, values) in
                
    }
            
    //write
    prop.writeBlock = {(obj, values) in
                
    }
    prop.threshold = 0.01
            
}) as? POPAnimatableProperty {
    anim.property = proper
}
```

### 属性介绍
> 其组成就是一个readBlock一个writeBlock和一个threashold
- `readBlock`告诉POP当前的属性值
- `writeBlock`中修改变化后的属性值
- `threashold`决定了动画变化间隔的阈值 值越大`writeBlock`的调用次数越少

POPAnimatableProperty其实是POP中一个比较重要的东西 像上面提到的POP自带的动画属性 查看源代码可以看到也只是POP自动帮你设置好了POPAnimatableProperty而已 其作用就是当动画的某个时间片被触发时 告诉系统如何根据当前时间片做出变化

> 还是以一个实际的例子来说明如何使用自定义属性 比如我们要实现一个像系统的时钟APP里秒表计时的一个效果

![计时器效果](http://upload-images.jianshu.io/upload_images/4122543-070c23772942ed82.gif?imageMogr2/auto-orient/strip)

### 完整代码示例

```objc
if let proper = POPAnimatableProperty.property(withName: "prop", initializer: { (prop) in
    guard let prop = prop else { return }
    //read
    prop.readBlock = { (obj, values) in
        guard let array = values else { return }
        print(array[0])
    }
    
    //write
    prop.writeBlock = {(obj, values) in
        guard let button = obj as? UIButton, let array = values else { return }
        let value = array[0]
        button.setTitle(String(format: "%02d:%02d:%02d", Int(value / 60), Int(value.truncatingRemainder(dividingBy: 60)), Int((value * 100).truncatingRemainder(dividingBy: 100))), for: .normal)
    }
    prop.threshold = 0.01
    
}) as? POPAnimatableProperty {
    if let popBasic = POPBasicAnimation.linear() {
        //秒表用线性的时间函数初始化
        popBasic.property = proper
        popBasic.fromValue = 0 //从0开始
        popBasic.toValue = 18  //到18秒
        popBasic.duration = 18 //持续18秒
        popBasic.beginTime = CACurrentMediaTime() + 2 //延迟2秒开始
        pictureBtn.pop_add(popBasic, forKey: "linear")
    }
}

```

<div class="note warning"><p>注意:</p></div>

- 在Swift4.0版本(4.0之前版本未知)中,初始化出来的对象都是可选类型
- [POP](https://github.com/facebook/pop)官方的建议是添加`if`条件判断,详情可到GitHub上查看示例
- 正如上段代码所示: 闭包中涉及的可选类型都添加了`guard`判断


## 类似微博中间发布按钮弹出动画
### 先看一下效果吧
![微博动画效果图](http://upload-images.jianshu.io/upload_images/4122543-737cf17a9cb95542.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

> 动画分为两个部分
> 
- 中间六个按钮依次执行动画弹出
- 上面标题图片最后动画落下

### 下面来看一下部分的核心代码
#### 六个按钮的弹出和消失动画

```objc
for i in 0..<titles.count {
    let button = BaseButton()
    button.setTitle(titles[i], for: .normal)
    button.setImage(UIImage(named: images[i]), for: .normal)
    button.addTarget(self, action: #selector(buttonClick(button:)), for: .touchUpInside)
    addSubview(button)
    
    //计算X/Y
    let row = i / maxCols
    let col = i % maxCols
    let buttonX = btnStsrtX + CGFloat(col) * (xMargin + buttonW)
    let buttonEndY = btnStartY + CGFloat(row) * buttonH
    let buttonStartY = buttonEndY - kScreenHeight
    
    //按钮动画
    let popSpring = POPSpringAnimation(propertyNamed: kPOPViewFrame)
    popSpring?.fromValue = CGRect(x: buttonX, y: buttonStartY, width: buttonW, height: buttonH)
    popSpring?.toValue = CGRect(x: buttonX, y: buttonEndY, width: buttonW, height: buttonH)
    popSpring?.springBounciness = kSpringFactor
    popSpring?.springSpeed = kSpringFactor
    popSpring?.beginTime = CACurrentMediaTime() + kAnimationDelay * Double(i)
    button.pop_add(popSpring, forKey: "spring")
}

```

#### 最上部分标语的弹出和消失

```objc
//z执行动画
let imagePOP = POPSpringAnimation(propertyNamed: kPOPViewCenter)
imagePOP?.fromValue = CGPoint(x: kScreenWidth * 0.5, y: 0.2 * kScreenHeight - kScreenHeight)
imagePOP?.toValue = CGPoint(x: kScreenWidth * 0.5, y: 0.2 * kScreenHeight)
imagePOP?.springSpeed = kSpringFactor
imagePOP?.springBounciness = kSpringFactor
imagePOP?.beginTime = CACurrentMediaTime() + Double(btnCount) * kAnimationDelay
imagePOP?.completionBlock = { popAnim, finished in
    //所有动画执行完毕,回复View点击事件
    kRootView?.isUserInteractionEnabled = true
    self.isUserInteractionEnabled = true
}
topImage.pop_add(imagePOP, forKey: nil)

```

---

> 以上是类似微博动画的部分核心代码, 具体代码详见[GitHub项目](https://github.com/coderQuanjun/POPAnimationDemo), 喜欢请star


- 折叠图片
- 音量震动条
- 活动指示器
- 微博动画
- 倒计时-计时器
- 类似QQ信息条数的粘性动画
- 类似雷达-水波纹动画

> 注: 项目持续更新中......