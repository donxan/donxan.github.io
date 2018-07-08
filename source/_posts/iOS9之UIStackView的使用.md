---
title: iOS9之UIStackView的使用
date: 2017-06-10 17:12
tags: [Objective-C, UIStackView]
categories: iOS高阶功能
---

苹果在iOS9新增了一个简易的布局控件UIStackView,它是一个基于 Auto Layout 的抽象层从而使布局属性的创建简单化,它可以将一组 UIView 视图进行垂直或水平方向的排列。

- UIStackView 既可以用代码编写也可以在 Interface Builder 中设计(简易xib更方便适用)。
- 你可以在一个主 UIStackView 中嵌套 UIStackView 从而让视图精确放置到相应的位置

<!-- more -->

> 下面就具体介绍一下UIStackView的一些方法和属性

## 一.方法

### 1.初始化数组

```objc

//OC中

- (instancetype)initWithArrangedSubviews:(NSArray<__kindof UIView *> *)views;

//Swift

let stackView1 = UIStackView(arrangedSubviews: subViews)

```

### 2.添加子视图

```objc

//OC

- (void)addArrangedSubview:(UIView *)view;

//Swift

stackView.addArrangedSubview(UIView)

```

### 3.移除子视图

```objc

//OC

- (void)removeArrangedSubview:(UIView *)view;

//Swift

stackView1.removeArrangedSubview(UIView)

```

### 4.根据下标插入子视图

```objc

//OC

- (void)insertArrangedSubview:(UIView *)view atIndex:(NSUInteger)stackIndex;

//Swift

stackView1.insertArrangedSubview(UIView, atIndex: Int)

```

## 二.属性

### 1.布局方向

```objc

stackView.axis = .Horizontal

/**************/

Horizontal -> UILayoutConstraintAxisHorizontal

水平方向布局

Vertical  -> UILayoutConstraintAxisVertical

垂直方向布局

```

### 2.内容物填充样式

```objc

stackView.distribution = .FillEqually

/****************/

Fill -> UIStackViewDistributionFill

填充整个UIStackView，并且根据内部子视图尺寸对子视图尺寸进行动态调整。

Fill Equally -> UIStackViewDistributionFillEqually

根据视图大小平均分配UIStackView尺寸，等比例填充UIStackView，过程中会根据分配的大小改变子视图尺寸。

Fill Proportionally -> UIStackViewDistributionFillProportionally

根据之前的比例填充UIStackView。

Equal Spacing -> UIStackViewDistributionEqualSpacing

填充整个UIStackView，子视图没有占满UIStackView将会用空白平均填充子视图中间的间距，超出UIStackView将会根据arrangedSubviews数组下标压缩子视图。

Equal Centering -> UIStackViewDistributionEqualCentering

平均分配子视图得到每个视图的中心点，使用这个中心点来布局每个子视图，并且保持spacing距离，超出将会重新布局子视图，并压缩部分子视图。

```

### 3.视图填充样式

```objc

stackView.alignment = .Fill

/****************/

Fill -> UIStackViewAlignmentFill

视图纵向填充

Top -> UIStackViewAlignmentTop

视图向上对其(适用于Horizontal模式)

Center -> UIStackViewAlignmentCenter

视图居中对其

Bottom -> UIStackViewAlignmentBottom

视图向下对其(适用于Horizontal模式)

First Baseline -> UIStackViewAlignmentFirstBaseline

根据上方基线布局所有子视图的y值(适用于Horizontal模式)

Last Baseline -> UIStackViewAlignmentLastBaseline

根据下方基线布局所有子视图的y值(适用于Horizontal模式)

trailing -> UIStackViewAlignmentTrailing

视图向左对齐(适用于Vertical模式)

leading -> UIStackViewAlignmentLeading

视图向右对齐(适用于Vertical模式)

```

### 4.子控件之间最小距离

```objc

stackView.spacing = 0

/****************/

spacing -> CGFloat spacing

```

### 5.基线相对布局

```objc

public var baselineRelativeArrangement: Bool

```

> 如果YES，则从顶视图的最后基线到底视图的顶部测量两个视图之间的垂直间距。

### 6.边界相对布局

```objc

public var layoutMarginsRelativeArrangement: Bool

```

> 决定了 stack 视图平铺其管理的视图时是否要参照它的布局边距，选中 Layout Margins Relative 将相对于标准边界空白来调整subview位置



##Xib创建
- 择UIStackView控件直接拖到XIB中。可以选择Horizontal和Vertical两个方向的UIStackView，也可以在拖到XIB中之后手动修改。
- 父视图可以将UIStackView作为子视图来进行多层UIStackView嵌套，这也是苹果推荐的做法。

![示例图片1.png](http://upload-images.jianshu.io/upload_images/4122543-477dcb03e40d295a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> - 打开右侧设置面板来设置UIStackView的一些对应属性，达到更好的布局效果。

![示例图片2.png](http://upload-images.jianshu.io/upload_images/4122543-002b7b5799b9aeee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> - 除了上面的方法也可以在XIB中直接选择多个View，然后点击右下方的Stack按钮，系统会自动推断布局方式,平均分配空间布局，帮我们自动布局子视图，我们可以在系统布局之后在手动进行调整。

![示例图片3.png](http://upload-images.jianshu.io/upload_images/4122543-304660a3ee85070d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


> 作为一枚小菜鸟,不足之处还望大家多多指正,互相学起,共同进步!
