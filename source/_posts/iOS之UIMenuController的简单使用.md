---
title: iOS之UIMenuController的简单使用
date: 2016-11-22 11:52:30
tags: [Objective-C, UIMenuController]
categories: iOS高阶功能
---

## UIMenuController须知
- 默认情况下, 有以下控件已经支持UIMenuController
    - UITextField
    - UITextView
    - UIWebView

<!-- more -->

## 让其他控件也支持UIMenuController(比如UILabel)
1. 自定义UILabel

```objc
- (void)setUp {
  // 1.设置label可以交互
  self.userInteractionEnabled = YES;  
  // 2.添加点击手势
  [self addGestureRecognizer:[[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(lableClick)]];
}
- (void)lableClick {
  // 3.设置label为第一响应者,只有成为响应者才能够将MenuController显示在其上面
  [self becomeFirstResponder];
  // 4.初始化UIMenuController
  UIMenuController *menuController = [UIMenuController sharedMenuController];  
  // 5.设置UIMenuController显示的位置
  // targetRect : 将要显示所在label的frame;
  // view : targetRect所在的坐标系参照物(父view或self)
  [menuController setTargetRect:self.frame inView:self.superview];
  // [menuController setTargetRect:self.bounds inView:self];作用同上  
  // 6.显示UIMenuController
  [menuController setMenuVisible:YES animated:YES];
}
```
2. 在UILable内重写2个方法

```objc
/**
 * 让label有资格成为第一响应者
 */
- (BOOL)canBecomeFirstResponder
{
    return YES;
}
/**
 * label能执行哪些操作(比如copy, paste等等)
 * @return  YES:支持这种操作
 */
- (BOOL)canPerformAction:(SEL)action withSender:(id)sender
{
    if (action == @selector(cut:) || action == @selector(copy:) || action == @selector(paste:)) return YES;

    return NO;
}
```

3.实现各种操作方法
```objc
- (void)cut:(UIMenuController *)menu
{
    // 将自己的文字复制到粘贴板
    UIPasteboard *board = [UIPasteboard generalPasteboard];

    // 清空文字
    self.text = nil;
}

- (void)copy:(UIMenuController *)menu
{
    // 将自己的文字复制到粘贴板
    UIPasteboard *board = [UIPasteboard generalPasteboard];
    board.string = self.text;
}

- (void)paste:(UIMenuController *)menu
{
    // 将粘贴板的文字 复制 到自己身上
    UIPasteboard *board = [UIPasteboard generalPasteboard];
    self.text = board.string;
}
```

## 自定义UIMenuController内部的Item(在cell中)
- 由于手动添加的MenuItem默认触发控制器中的方法,所以将MenuController的显示/隐藏,添加MenuItem写到控制器

1. 添加item

```objc
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  // 点击cell弹出UIMenuController
  // 1.如果menuController已经在显示,就隐藏他
  // 注意,如果有一个cell正在显示menuController,这时再点击另外一个cell,上一个cell的menuController会消失,当前点击cell会显示,这是因为上一个cell不再是第一响应者了,menuController会自动释放
  UIMenuController *menuController = [UIMenuController sharedMenuController];
  if (menuController.isMenuVisible) {
    [menuController setMenuVisible:NO animated:YES];  
  }else {
    // 2.显示MenuController
    // 先设置cell为第一响应者,同时不要忘记在cell中重写canBecomeFirstResponder和canPerformAction:withSender:
    JCMTopicCommentCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    [cell becomeFirstResponder];
    // 添加menuItem
    UIMenuItem *item01 = [[UIMenuItem alloc]initWithTitle:@"赞" action:@selector(zanClick:)];
    UIMenuItem *item02 = [[UIMenuItem alloc]initWithTitle:@"回复" action:@selector(responseClick:)];
    UIMenuItem *item03 = [[UIMenuItem alloc]initWithTitle:@"举报" action:@selector(reportClick:)];
    menuController.menuItems = @[item01,item02,item03];
    // 设置menuControoler显示位置
     CGRect showRect = CGRectMake(cell.x, cell.y + cell.height/2, cell.width, cell.height);
     [menuController setTargetRect:showRect inView:cell.superview];
    // 显示menuController [menuController setMenuVisible:YES animated:YES];  
  }
}
```
2. cell中实现两个方法

```objc
/**
 * 让label有资格成为第一响应者
 */
- (BOOL)canBecomeFirstResponder
{
    return YES;
}
/**
 * label能执行哪些操作(比如copy, paste等等)
 * @return  YES:支持这种操作
 */
- (BOOL)canPerformAction:(SEL)action withSender:(id)sender
{
    if (action == @selector(cut:) || action == @selector(copy:) || action == @selector(paste:)) return YES;
    return NO;
}
```
3. 处理方法的实现

```objc
#pragma mark - MenuControllerClick
// MenuController手动添加的item的方法实现必须放在controller中
- (void)zanClick:(UIMenuController *)menu {
    NSIndexPath *indexPath = [self.tableView indexPathForSelectedRow];
    NSLog(@"%s %@", __func__, [self commentInIndexPath:indexPath].content);
}
- (void)responseClick:(UIMenuController *)menu {
  NSIndexPath *indexPath = [self.tableView indexPathForSelectedRow];
  NSLog(@"%s %@", __func__, [self commentInIndexPath:indexPath].content);
}
- (void)reportClick:(UIMenuController *)menu {
  NSIndexPath *indexPath = [self.tableView indexPathForSelectedRow];
  NSLog(@"%s %@", __func__, [self commentInIndexPath:indexPath].content);
}```
