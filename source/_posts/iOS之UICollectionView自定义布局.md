---
title: iOS之UICollectionView自定义布局
date: 2016-11-15 10:22:30
tags: [Objective-C, UICollectionView]
categories: iOS高阶功能
---

## UICollectionView基础
- `UICollectionViewFlowLayout`：视图布局对象（流水布局：一行排满，自动排到下行），继承自`UICollectionViewLayout`。`UICollectionViewLayout`内有一个`collectionView`属性，所有的视图布局对象都继承自`UICollectionViewLayout`。
- 若我们要自定义布局对象，我们一般继承`UICollectionViewFlowLayout`，然后重写里面的一些方法就可以了。
- 需要实现三个协议: `UICollectionViewDataSource`（数据源）、`UICollectionViewDelegateFlowLayout`（视图布局），自定义布局需要实现`UICollectionViewDataSource`、`UICollectionViewDelegate`两个协议即可。

<!-- more -->

#### 一、自定义线性布局
- **首先要继承与流水布局UICollectionViewFlowLayout**

```objc
#import <UIKit/UIKit.h>

@interface LineCollectionViewLayout : UICollectionViewFlowLayout

@end
```
- **重写相应的方法**

```objc
#import "LineCollectionViewLayout.h"

@implementation LineCollectionViewLayout

- (instancetype)init{
    if (self = [super init]) {
    }
    return self;
}

/**
 * 用来做布局的初始化操作（不建议在init方法中进行布局的初始化操作）
 - 注意：一定要调用[super prepareLayout]
 */
- (void)prepareLayout{
    [super prepareLayout];
    // 水平滚动
    self.scrollDirection = UICollectionViewScrollDirectionHorizontal;
    // 设置内边距
    CGFloat inset = (self.collectionView.frame.size.width - self.itemSize.width) * 0.5;
    self.sectionInset = UIEdgeInsetsMake(0, inset, 0, inset);
}

/**
 * 这个方法的返回值是一个数组（数组里面存放着rect范围内所有元素的布局属性）
 * 这个数组中存放的都是UICollectionViewLayoutAttributes对象
 * 这个方法的返回值决定了rect范围内所有元素的排布（frame）*/
/**
 UICollectionViewLayoutAttributes *attrs;
 1.一个cell对应一个UICollectionViewLayoutAttributes对象
 2.UICollectionViewLayoutAttributes对象决定了cell的frame
 */
- (NSArray *)layoutAttributesForElementsInRect:(CGRect)rect{
    // 获得super已经计算好的布局属性
    NSArray *array = [super layoutAttributesForElementsInRect:rect];
    // 计算collectionView最中心点的x值
    CGFloat centerX = self.collectionView.contentOffset.x + self.collectionView.frame.size.width * 0.5;
    // 在原有布局属性的基础上，进行微调
    for (UICollectionViewLayoutAttributes *attrs in array) {
        // cell的中心点x 和 collectionView最中心点的x值 的间距
        CGFloat delta = ABS(attrs.center.x - centerX);

        // 根据间距值 计算 cell的缩放比例
        CGFloat scale = 1 - delta / self.collectionView.frame.size.width;

        // 设置缩放比例
        attrs.transform = CGAffineTransformMakeScale(scale, scale);
    }

    return array;
}

/**
 * 当collectionView的显示范围发生改变的时候，是否需要重新刷新布局
 * 一旦重新刷新布局，就会重新调用下面的方法：
 1.prepareLayout
 2.layoutAttributesForElementsInRect:方法
 */
- (BOOL)shouldInvalidateLayoutForBoundsChange:(CGRect)newBounds{
    return YES;
}

/**
 * 这个方法的返回值，就决定了collectionView停止滚动时的偏移量
 * proposedContentOffset：原本情况下，collectionView停止滚动时最终的偏移量
 * velocity：滚动速率，通过这个参数可以了解滚动的方向
 */
- (CGPoint)targetContentOffsetForProposedContentOffset:(CGPoint)proposedContentOffset withScrollingVelocity:(CGPoint)velocity{
    // 计算出最终显示的矩形框
    CGRect rect;
    rect.origin.y = 0;
    rect.origin.x = proposedContentOffset.x;
    rect.size = self.collectionView.frame.size;

    // 获得super已经计算好的布局属性
    NSArray *array = [super layoutAttributesForElementsInRect:rect];

    // 计算collectionView最中心点的x值
    CGFloat centerX = proposedContentOffset.x + self.collectionView.frame.size.width * 0.5;

    // 存放最小的间距值
    CGFloat minDelta = MAXFLOAT;
    for (UICollectionViewLayoutAttributes *attrs in array) {
        if (ABS(minDelta) > ABS(attrs.center.x - centerX)) {
            minDelta = attrs.center.x - centerX;
        }
    }
    // 修改原有的偏移量
    proposedContentOffset.x += minDelta;
    return proposedContentOffset;
}

@end
```

#### 自定义环形布局
- **同样要继承与流水布局UICollectionViewFlowLayout**

```objc
#import <UIKit/UIKit.h>

@interface CircleCollectionViewLayout : UICollectionViewFlowLayout

@end
```
- **重写相应的方法**

```objc
#import "CircleCollectionViewLayout.h"

@interface CircleCollectionViewLayout()
/** 布局属性 */
@property (nonatomic, strong) NSMutableArray *attrsArray;
@end

@implementation CircleCollectionViewLayout

/** 懒加载 */
- (NSMutableArray *)attrsArray
{
    if (!_attrsArray) {
        _attrsArray = [NSMutableArray array];
    }
    return _attrsArray;
}

- (void)prepareLayout
{
    [super prepareLayout];

    [self.attrsArray removeAllObjects];

    NSInteger count = [self.collectionView numberOfItemsInSection:0];
    for (int i = 0; i < count; i++) {
        NSIndexPath *indexPath = [NSIndexPath indexPathForItem:i inSection:0];
        UICollectionViewLayoutAttributes *attrs = [self layoutAttributesForItemAtIndexPath:indexPath];
        [self.attrsArray addObject:attrs];
    }
}

- (NSArray *)layoutAttributesForElementsInRect:(CGRect)rect
{
    return self.attrsArray;
}

/**
 * 这个方法需要返回indexPath位置对应cell的布局属性
 */
- (UICollectionViewLayoutAttributes *)layoutAttributesForItemAtIndexPath:(NSIndexPath *)indexPath
{
    NSInteger count = [self.collectionView numberOfItemsInSection:0];
    CGFloat radius = 70;
    // 圆心的位置
    CGFloat oX = self.collectionView.frame.size.width * 0.5;
    CGFloat oY = self.collectionView.frame.size.height * 0.5;

    UICollectionViewLayoutAttributes *attrs = [UICollectionViewLayoutAttributes layoutAttributesForCellWithIndexPath:indexPath];

    attrs.size = CGSizeMake(50, 50);
    if (count == 1) {
        attrs.center = CGPointMake(oX, oY);
    } else {
        CGFloat angle = (2 * M_PI / count) * indexPath.item;
        CGFloat centerX = oX + radius * sin(angle);
        CGFloat centerY = oY + radius * cos(angle);
        attrs.center = CGPointMake(centerX, centerY);
    }

    return attrs;
}

@end
```
### 对自定义布局的使用

```objc
 // 创建布局
    CircleCollectionViewLayout *layout = [[CircleCollectionViewLayout alloc] init];

    // 创建CollectionView
    CGFloat collectionW = self.view.frame.size.width;
    CGFloat collectionH = 200;
    CGRect frame = CGRectMake(0, 150, collectionW, collectionH);
    UICollectionView *collectionView = [[UICollectionView alloc] initWithFrame:frame collectionViewLayout:layout];
    collectionView.dataSource = self;
    collectionView.delegate = self;
    [self.view addSubview:collectionView];
    self.collectionView = collectionView;

    // 注册
    [collectionView registerNib:[UINib nibWithNibName:NSStringFromClass([PhotoCell class]) bundle:nil] forCellWithReuseIdentifier:photoId];
 ```  

- 增加 touchesBegan：方法，通过点击让两种布局相互转换


```objc
- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
    if ([self.collectionView.collectionViewLayout isKindOfClass:[LineCollectionViewLayout class]]) {
        [self.collectionView setCollectionViewLayout:[[CircleCollectionViewLayout alloc] init] animated:YES];
    } else {
        LineCollectionViewLayout *layout = [[LineCollectionViewLayout alloc] init];
        layout.itemSize = CGSizeMake(100, 100);
        [self.collectionView setCollectionViewLayout:layout animated:YES];
    }
}
```
