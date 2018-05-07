---
title: ReactiveCocoa使用详解01
date: 2018-03-19 21:58:09
tags: [函数式, 响应式, RACSingle, RACSubject]
categories: ReactiveCocoa
---


[ReactiveCocoa](https://github.com/ReactiveCocoa)（简称为RAC）,是由`Github`开源的一个应用于iOS和OS开发的函数式响应式编程框架，它提供了一系列用来组合和转换值流的 API

<!-- more -->

## 什么是响应式变成思想?
学习一个框架之前, 首先要了解这个框架的编程思想, 这里在介绍响应式编程思想之前, 先介绍一下之前接触过的编程思想

### 面向对象
- 万物皆对象
  - 是一类以对象作为基本程序结构单位的程序设计语言
  - 典型的面向对象的编程语言有`C++`, `C#`, `Java`等

### 面向过程
- 一种以过程为中心的编程思想
- C语言就是一门面向过程的语言

### 链式编程思想
- 是将多个操作（多行代码）通过点号(.)链接在一起成为一句代码,使代码可读性好
- 链式编程特点：方法的返回值是block, block必须有返回值（本身对象），block参数（需要操作的值）
- 典型框架：masonry框架。 

### 函数式编程思想
- 万物皆是流
  - 不需要考虑调用顺序，只需要知道考虑结果
  - 类似于蝴蝶效应，产生一个事件，会影响很多东西，这些事件像流一样的传播出去，然后影响结果
  - 代表：KVO运用

### 函数式编程思想
- 是把操作尽量写成一系列嵌套的函数或者方法调用
- 特点: 每个方法必须有返回值（本身对象）,把函数或者Block当做参数,block参数（需要操作的值）block返回值（操作结果）
- 代表：ReactiveCocoa

### `ReactiveCocoa`编程思想
- 函数式编程 `Functional Programming`
- 响应式编程 `Reactive Programming`

所以, `ReactiveCocoa`被描述为函数响应式编程（FRP）框架, 下面具体介绍一下`RAC`的一些常见类


## RACSiganl 信号类
- `ReactiveCocoa` 中最核心的概念之一就是信号`RACStream`。`RACStream`中有两个子类——`RACSignal` 和 `RACSequence`; 这里我们就主要说一下`RACSignal`; 
- 在`ReactiveCocoa`整个库中，`RACSignal`占据着比较重要的位置，而`RACSignal`的变换操作更是整个`RACStream`流操作核心之一
- 下面让我们俩看一下`RACSignal`被订阅的完整过程


```objc
- (void)test2 {
    //创建信号
    RACSignal *single = [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        //发送消息
        [subscriber sendNext:@"a"];
        [subscriber sendNext:@"b"];
        //发送完成
        [subscriber sendCompleted];
        
        //清空数据
        return [RACDisposable disposableWithBlock:^{
            //当订阅者被消耗的时候就会执行
            //当订阅者发送完成,或者error的时候也会执行
            NSLog(@"RACDisposable的block");
        }];
    }];
    
    //订阅信号
    RACDisposable *disposable = [single subscribeNext:^(id  _Nullable x) {
        NSLog(@"value = %@", x);
    } error:^(NSError * _Nullable error) {
        NSLog(@"error: %@", error);
    } completed:^{
        NSLog(@"completed");
    }];
    
    //释放
    [disposable dispose];
}

```

- 在此之前先看一下`RACSignal`的一些子类
  - `RACDynamicSignal`: 动态信号，使用一个 `block` 来实现订阅行为，我们在使用 `RACSignal` 的 `+createSignal:` 方法时创建的就是该类的实例
  - `RACEmptySignal`：空信号，用来实现 `RACSignal` 的 `+empty` 方法；
  - `RACReturnSignal`：一元信号，用来实现 `RACSignal` 的 `+return:`方法；
  - `RACErrorSignal`：错误信号，用来实现 `RACSignal` 的 `+error:` 方法；
  - `RACChannelTerminal`：通道终端，代表 `RACChannel` 的一个终端，用来实现双向绑定

> `RACSignal`在创建信号的时候，底层会调用`RACDynamicSignal`的`createSignal`的方法, 如下:

```objc
+ (RACSignal *)createSignal:(RACDisposable * (^)(id<RACSubscriber> subscriber))didSubscribe {
	return [RACDynamicSignal createSignal:didSubscribe];
}

```

这里的block是一个 `id<RACSubscriber>` 类型的`subscriber`, 而这个`RACSubscriber`, 我们可以点进去看一些底层实现,  协议方法如下:


```objc
@protocol RACSubscriber <NSObject>
@required

/// Sends the next value to subscribers.
- (void)sendNext:(nullable id)value;

/// Sends the error to subscribers.
- (void)sendError:(nullable NSError *)error;

/// Sends completed to subscribers.
- (void)sendCompleted;

/// Sends the subscriber a disposable that represents one of its subscriptions.
- (void)didSubscribeWithDisposable:(RACCompoundDisposable *)disposable;

```

- RACSignal底层实现：
  - 1.创建信号，首先把`didSubscribe`保存到信号中，还不会触发。
  - 2.当信号被订阅，也就是调用`signal`的`subscribeNext:nextBlock`
    - 2.1 `subscribeNext`内部会创建订阅者`subscriber`，并且把`nextBlock`保存到`subscriber`中。
    - 2.2 `subscribeNext`内部会调用`siganl的didSubscribe`
    - 2.3 当信号订阅完成, 不在发送数据的时候, 最好调用完成发送的`[subscriber sendCompleted];`
    - 订阅完成的时候, 内部会自动调用`[RACDisposable disposable]`取消订阅信号
  - 3.`siganl`的`didSubscribe`中调用`[subscriber sendNext:@1];`
    - 3.1 `sendNext`底层其实就是执行`subscriber`的`nextBlock`


## 信号提供者: `RACSubject`
- 信号提供者，自己可以充当信号，又能发送信号
- 先订阅, 在发送信号
- 使用场景:通常用来代替代理/通知

### `RACSubject`简单使用

```objc
- (void)setRacSubject1 {
    //先订阅, 在发送信号
    //1. 创建信号
    RACSubject *subject = [RACSubject subject];
    
    //2. 订阅
    //内部创建RACSubscriber
    [subject subscribeNext:^(id  _Nullable x) {
        NSLog(@"第一个订阅者--%@", x);
    }];
    
    [subject subscribeNext:^(id  _Nullable x) {
        NSLog(@"第二个订阅者---%@", x);
    }];

    //3. 发送信号
    //遍历所有的订阅者, 执行nextBlock
    [subject sendNext:@2];
    
    /** 打印结果
     2018-03-17 20:18:19.782119+0800 ReactiveObjc[23883:1420936] 第一个订阅者--2
     2018-03-17 20:18:19.784715+0800 ReactiveObjc[23883:1420936] 第二个订阅者---2
     */
}

```

- RACSubject:底层实现和RACSignal不一样 
  - 1.调用`subscribeNext`订阅信号，只是把订阅者保存起来，并且订阅者的`nextBlock`已经赋值了。
  - 2.调用`sendNext`发送信号，遍历刚刚保存的所有订阅者，一个一个调用订阅者的`nextBlock` 

### `RACReplaySubject`简单使用
- 重复提供信号类，RACSubject的子类
- 先发送信号，再订阅信号；
- 使用场景
  - 1. 如果一个信号每被订阅一次，就需要把之前的值重复发送一遍，使用重复提供信号类。
  - 2. 可以设置`capacity`数量来限制缓存的`value`的数量，即只缓充最新的几个值


```objc
- (void)setReplaySubject {
    //创建信号
    RACReplaySubject *replySub = [RACReplaySubject subject];
    
    //发送信号
    [replySub sendNext:@23];
    [replySub sendNext:@34];
    
    //订阅信号
    // 遍历值，让一个订阅者去发送多个值
    // 只要订阅一次，之前所有发送的值都能获取到.
    [replySub subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
    
    /**
     2018-03-19 12:01:14.112253+0800 ReactiveObjc[5130:446958] 23
     2018-03-19 12:01:14.112511+0800 ReactiveObjc[5130:446958] 34
     */
}
```

- `RACReplaySubject`的底层实现
  - 1. 订阅信号时，内部保存了订阅者，和订阅者响应block
  - 2. 当发送信号的，遍历订阅者，调用订阅者的nextBlock
  - 3. 发送的信号会保存起来，当订阅者订阅信号的时，会将之前保存的信号，一个一个作用于新的订阅者，保存信号的容量由`capacity`决定，这也是有别于RACSubject的



### 替代代理/通知
- 这里我们设想一个反向传值的场景, vc里面有一个自定义的view, 当点击该`View`的时候, 更换vc的背景颜色
- 通常我们的做法是使用代理/通知/block


#### 下面看一下代理的简单使用
 在自定义View中设置协议

```objc
#import <UIKit/UIKit.h>

@class SubjectView;
@protocol SubjectDelegate <NSObject>

@optional
- (void)viewWithTap:(SubjectView *)subView;

@end

@interface SubjectView : UIView

@property (nonatomic, weak) id<SubjectDelegate> delegate;


@end

```

在vc中, 遵循代理, 并实现代理方法

```objc
/// 代理方法
-(void)viewWithTap:(SubjectView *)subView{
    NSLog(@"完成代理, 点击了view");
    
    UIColor *color = [UIColor colorWithRed:(arc4random() % 255) / 255.0 green:(arc4random() % 255) / 255.0 blue:(arc4random() % 255) / 255.0 alpha:1.0];
    self.view.backgroundColor = color;
}

```

#### `RACSubject`代替代理
在自定义`SubjectView.h`文件中


```objc
#import <UIKit/UIKit.h>
#import <ReactiveObjC.h>

@interface SubjectView : UIView

@property (nonatomic, strong) RACSubject *subject;

@end

```

在自定义`SubjectView.m`文件中

```objc
#import "SubjectView.h"

@implementation SubjectView

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    //发送信号
    [_subject sendNext:self];
}

@end

```

下面看一下在vc中的操作

```objc
- (void)setupSubjectView {
    SubjectView *subV = [[SubjectView alloc]init];
    subV.backgroundColor = [UIColor redColor];
    subV.frame = CGRectMake(100, 100, 100, 100);
    RACSubject *subject = [RACSubject subject];
    [subject subscribeNext:^(id  _Nullable x) {
        NSLog(@"完成代理, 点击了view");
        
        UIColor *color = [UIColor colorWithRed:(arc4random() % 255) / 255.0 green:(arc4random() % 255) / 255.0 blue:(arc4random() % 255) / 255.0 alpha:1.0];
        self.view.backgroundColor = color;
    }];
    subV.subject = subject;
    [self.view addSubview:subV];
}
```

- 相关ReactiveObjc的知识点, 后期会持续更新...
- 推荐文章: [iOS ReactiveCocoa 最全常用API整理](http://www.cocoachina.com/ios/20160729/17236.html)