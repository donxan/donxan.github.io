---
title: iOS之UITableView设置全屏分隔线
date: 2016-11-20 13:41:14
tags: [Objective-C, UITableView]
categories: iOS高阶功能
---

## UICollectionView基础
#### 首先系统的分隔线有以下几种
```
tableView.separatorStyle = UITableViewCellSeparatorStyleNone;

-UITableViewCellSeparatorStyleNone //隐藏系统分隔线
-UITableViewCellSeparatorStyleSingleLine //单分隔线
-UITableViewCellSeparatorStyleSingleLineEtched //被侵蚀的单分隔线
```

<!-- more -->

#### 自定义分隔线（首先要隐藏系统的分隔线）
1. 通过xib或者代码在cell底部添加一条高度为1的UIView或者UILable分隔线。
2. 通过drawRect：方法自绘一条分割线

```
// 自绘分割线
- (void)drawRect:(CGRect)rect{
    CGContextRef context = UIGraphicsGetCurrentContext();

    CGContextSetFillColorWithColor(context, [UIColor whiteColor].CGColor);
    CGContextFillRect(context, rect);

    CGContextSetStrokeColorWithColor(context, [UIColor colorWithRed:0xE2/255.0f green:0xE2/255.0f blue:0xE2/255.0f alpha:1].CGColor);
    CGContextStrokeRect(context, CGRectMake(0, rect.size.height - 1, rect.size.width, 1));
}
```
3.重写cell的setFrame：方法
```
- (void)setFrame:(CGRect)frame{
    frame.size.height -= 1;//设置分隔线

    //设置cell的左右间距
    frame.origin.x = 5;//左间距为5
    frame.size.width = [UIScreen mainScreen].bounds.size.width - 2 * frame.origin.x;

    // 给cellframe赋值
    [super setFrame:frame];
}
```
4.利用系统属性设置(separatorInset, layoutMargins)设置
- 对tableView的separatorInset, layoutMargins属性的设置
```
-(void)viewDidLoad {
  [super viewDidLoad];
  //1.调整(iOS7以上)表格分隔线边距
  if ([self.tableView respondsToSelector:@selector(setSeparatorInset:)]) {
      self.tableView.separatorInset = UIEdgeInsetsZero;
  }
  //2.调整(iOS8以上)view边距(或者在cell中设置preservesSuperviewLayoutMargins,二者等效)
  if ([self.tableView respondsToSelector:@selector(setLayoutMargins:)]) {
      self.tableView.layoutMargins = UIEdgeInsetsZero;
  }
}
```
- 对cell的LayoutMargins属性的设置
```
//对cell的设置可以写在cellForRowAtIndexPath里,也可以写在willDisplayCell方法里
-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *ID = @"cell";
    FSDiscoverSpecialCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
    if (cell == nil) {
        cell = [[FSDiscoverSpecialCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:ID];
    }

   //2.调整(iOS8以上)tableView边距(与上面第2步等效,二选一即可)
    if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)]) {
        cell.preservesSuperviewLayoutMargins = NO;
    }
   //3.调整(iOS8以上)view边距
    if ([cell respondsToSelector:@selector(setLayoutMargins:)]) {
        [cell setLayoutMargins:UIEdgeInsetsZero];
    }
    return cell;
}
```

## 三种方法优缺点比较：

- 方法1一般使用系统的cell，或者对cell没有特殊要求的情况下使用系统的分隔线；

- 方法2是比较好用的,但是有些情况下系统自带的cell就足够用了,仅仅为了分隔线却还必须再自定义cell,添加一个view,设置背景颜色和frame,又显得麻烦;

- 方法3比较取巧,但是也需要自定义cell,在某些情况下不允许改变tableView的背景色,使用场景有限;

- 方法4不需要自定义cell,对系统(iOS7,iOS8以上)做个简单判断即可.
