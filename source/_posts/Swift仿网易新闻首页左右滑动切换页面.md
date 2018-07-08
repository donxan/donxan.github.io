---
title: Swift仿网易新闻首页左右滑动切换页面
date: 2017-06-12 20:12
tags: [Swift, 框架]
categories: Swift高阶功能
---

> 顶部标题左右滑动切换控制器是一种非常用的左右滚动切换效果,几乎每一个APP都有用到,在这里介绍一下我自己封装的一个Swift版本的简单框架;代码中注释相对详细,故文中没有做过多的解释;废话不多少,直接上效果图:

<!-- more -->

![效果图1.png](http://upload-images.jianshu.io/upload_images/4122543-91d007e59b3a6ce5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![效果图2.png](http://upload-images.jianshu.io/upload_images/4122543-047cf052039633e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 一.框架介绍

## [github地址](https://github.com/coderQuanjun/TJPageView)


![Snip20170612_18.png](http://upload-images.jianshu.io/upload_images/4122543-7f8bb034a432d133.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



```objc
TJTitleStyle.swift  //控制框架所有显示样式的参数值

TJTitleView.swift //顶部标题的处理view

TJContentView.swift //处理所有控制器的view

TJPageView.swift  //控制整体框架的总试图View
```

### TJTitleStyle.swift


```objc

    /// 是否是滚动的Title
    var isScrollEnable : Bool = false
    /// 普通Title颜色
    var normalColor : UIColor = UIColor(r: 0, g: 0, b: 0)
    /// 选中Title颜色
    var selectedColor : UIColor = UIColor(r: 255, g: 127, b: 0)
    /// Title字体大小
    var font : UIFont = UIFont.systemFont(ofSize: 14.0)
    /// 滚动Title的字体间距
    var titleMargin : CGFloat = 20
    /// title的高度
    var titleHeight : CGFloat = 44


    /// 是否显示底部滚动条
    var isShowBottomLine : Bool = false
    /// 底部滚动条的颜色
    var bottomLineColor : UIColor = UIColor.orange
    /// 底部滚动条的高度
    var bottomLineH : CGFloat = 2


    /// 是否进行缩放
    var isNeedScale : Bool = false
    var scaleRange : CGFloat = 1.2


    /// 是否显示遮盖
    var isShowCover : Bool = false
    /// 遮盖背景颜色
    var coverBgColor : UIColor = UIColor.lightGray
    /// 文字&遮盖间隙
    var coverMargin : CGFloat = 5
    /// 遮盖的高度
    var coverH : CGFloat = 25
    /// 设置圆角大小
    var coverRadius : CGFloat = 12

```

### TJPageCollectionLayout.swift自定义布局

> 代码如下,注释比较详尽,不做赘述

```objc
    //    在该方法中设定一些必要的layout的结构和初始需要的参数
    override func prepare() {
        super.prepare()

        //0.计算item的宽度和高度
        let itemW = ((collectionView?.bounds.width)! - sectionInset.left - sectionInset.right - minimumInteritemSpacing * CGFloat(cols - 1)) / CGFloat(cols)
        let itemH = ((collectionView?.bounds.height)! - sectionInset.top - sectionInset.bottom - minimumLineSpacing * CGFloat(rows - 1)) / CGFloat(rows)

        //1.获取一共多少个组
        let sectionCount = collectionView!.numberOfSections

        //2.获取每个组中有多少个item
        var prePageCount : Int = 0    //页数
        for i in 0..<sectionCount {
            let itemCount = collectionView!.numberOfItems(inSection: i)
            for j in 0..<itemCount {
                //2.1获取cell对应的indexPath
                let indexpath = IndexPath(item: j, section: i)
                //2.2根据indexPath创建UICollectionViewLayoutAttributes
                let attr = UICollectionViewLayoutAttributes(forCellWith: indexpath)
                // 2.3.计算j在该组中第几页
                let page = j / (cols * rows)
                let index = j % (cols * rows)
                //2.4设置attrs的frame
                let itemY = sectionInset.top + (itemH + minimumLineSpacing) * CGFloat(index / cols)
                let itemX = CGFloat(prePageCount + page) * collectionView!.bounds.width +  sectionInset.left + (itemW + minimumInteritemSpacing) * CGFloat(index % cols)
                attr.frame = CGRect(x: itemX, y: itemY, width: itemW, height: itemH)

                //2.5加入到数组中
                cellAttrs.append(attr)
            }
            prePageCount += (itemCount - 1) / (cols * rows) + 1
        }
        //计算最大宽度
        maxWidth = CGFloat(prePageCount) * collectionView!.bounds.width
    }

```

### TJPageCollectionView.swift
> 创建collectionView显示布局内容,设置代理方法和对外暴露的方法

#### 代理方法


```objc
protocol TJPageCollectionViewDateSource : class {
   //返回section的个数
    func numberOfSections(in pageCollectionView : TJPageCollectionView) -> Int

    //返回每个section中item的个数
    func pageCollectionView(_ collectionView : TJPageCollectionView, numberOfItemsInSection section : Int) -> Int

    //cell
    func pageCollectionView(_ pageCollectionView : TJPageCollectionView, _ collectionView : UICollectionView, cellForItemAt indexPath : IndexPath) -> UICollectionViewCell
}

protocol TJPageCollectionViewDelegate : class {
    //cell点击事件处理
    func pageCollectionView(_ pageCollectionView : TJPageCollectionView, didSelectorItemAt indexPath : IndexPath)
}

```


## 二.首页左右滑动调用方法

#### 1.设置显示样式

```objc
let style  = TJTitleStyle()
//是否可以滚动
style.isScrollEnable = true
//是否显示下划线
style.isShowBottomLine = true
//是否显示遮挡试图view
style.isShowCover = true

```

#### 2.初始化方法


```objc

/**初始化方法
* frame    : 坐标
* titles   : 标题数组
* style    : 样式
* childVcs : 自控制器数组
* parentVc : 父控制器
*/

let pageView = TJPageView(frame: frame, titles: titles, style: style, childVcs: childVcs, parentVc: self)

view.addSubview(pageView)

```


## 三.底部类似表情键盘布局调用方法

#### 1.初始化
```objc
// 1.设置显示样式
let style = TJTitleStyle()
style.isShowBottomLine = true

//2.设置cell布局Layout
let layout = TJPageCollectionLayout()
layout.cols = 7 // 列
layout.rows = 3 // 行
layout.minimumLineSpacing = 0
layout.minimumInteritemSpacing = 0
layout.sectionInset = UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10)

//3.创建collectionView
let pageCollection = TJPageCollectionView(frame: CGRect(x: 0, y: UIScreen.main.bounds.height - 250, width: UIScreen.main.bounds.width, height: 250), style: style, titles: ["普通", "粉丝"], isTitleInTop: false, layout: layout)
pageCollection.delegate = self
pageCollection.dataSource = self

//4.注册cell
pageCollection.register(nib: UINib(nibName: "EmoticonViewCell", bundle: nil), identifier: kEmoticonCellID)

//5.添加到视图中
view.addSubview(pageCollection)

```

#### 2.遵循协议


```objc
//MARK: TJCollectionViewDateSource
extension NextViewController : TJPageCollectionViewDateSource{
    func numberOfSections(in pageCollectionView: TJPageCollectionView) -> Int {
        return 5
    }
    func pageCollectionView(_ collectionView: TJPageCollectionView, numberOfItemsInSection section: Int) -> Int {
        return 40
    }
    func pageCollectionView(_ pageCollectionView: TJPageCollectionView, _ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: kEmoticonCellID, for: indexPath) as! EmoticonViewCell

        return cell
    }
}

//MARK: TJPageCollectionViewDelegate
extension NextViewController : TJPageCollectionViewDelegate{
    func pageCollectionView(_ pageCollectionView: TJPageCollectionView, didSelectorItemAt indexPath: IndexPath) {
        print(indexPath)

    }
}
```

---

> - 框架代码中可能还有不足之处,还望大神多多指教.

> - 菜鸟一枚,多多交流.

> - [github地址](https://github.com/coderQuanjun/TJPageView)
