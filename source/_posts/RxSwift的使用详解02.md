---
title: RxSwift的使用详解02
date: 2017-09-21 19:15:47
tags: [Swift, RxSwift, 响应式编程]
categories: RxSwift框架
---


- 上一篇: [RxSwift的使用详解01](https://www.titanjun.top/2017/09/15/RxSwift%E7%9A%84%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A301/)主要介绍了
  - RxSwift简单体验(在控件中的简单使用)
  - RxSwift常见操作(never, just, of, empty, creat等10个sequence的使用)
  - RxSwift中Subjects
  - 变换操作(map, flatMap等)和资源释放DisposeBag
  - UIBindingObserver创建自己的监听者
- 本文主要内容
  - 联合操作: 把多个Observable流合成单个Observable流
  - elementAt, single, skip等过滤和约束操作
  - toArray, reduce, concat等数学操作


---

<!-- more -->

## 联合操作 
- 联合操作就是把多个Observable流合成单个Observable流

### startWith
- 在发出事件消息之前，先发出某个特定的事件消息。
- 比如发出事件2 ，3然后我startWith(1)，那么就会先发出1，然后2 ，3.

```objc
//未添加startWith
Observable.of("2", "3").subscribe({ print($0) }).addDisposableTo(bag)
    /***输出顺序:
        next(2)
        next(3)
        completed
    ***/

//使用startWith
Observable.of("2", "3").startWith("1").subscribe({ print($0) }).addDisposableTo(bag)
        
    /*输出顺序:
         next(1)
         next(2)
         next(3)
         completed
     */
```

### merge
- 合并两个Observable流合成单个Observable流，根据时间轴发出对应的事件

```objc
let subject1 = PublishSubject<String>()
let subject2 = PublishSubject<String>()
Observable.of(subject1, subject2)
    .subscribe({ print($0) })
    .addDisposableTo(bag)
    
print("-------------------------")

Observable.of(subject1, subject2)
    .merge()
    .subscribe({ print($0) })
    .addDisposableTo(bag)
        
subject1.onNext("quan")
subject1.onNext("jun")
subject2.onNext("ya")
subject2.onNext("jie")
subject1.onNext("tian")
subject2.onNext("guo")
        
    /*输出事件:
         next(quan)
         next(jun)
         next(ya)
         next(jie)
         next(tian)
         next(guo)
     */
```

### zip
- 绑定超过最多不超过8个的Observable流，结合在一起处理。
- 注意Zip是一个事件对应另一个流一个事件

```objc
let subject3 = PublishSubject<String>()
let subject4 = PublishSubject<String>()
Observable.zip(subject3, subject4) { (sub3, sub4) -> String in
        sub3 + "+" + sub4
    }.subscribe({ print($0) })
    .addDisposableTo(bag)
        
subject3.onNext("quan")
subject3.onNext("jun")
subject4.onNext("ya")
subject4.onNext("jie")
subject3.onNext("tian")
subject4.onNext("guo")
        
    /*输出事件:
         将subject3和subject4压缩到一起共同处理
         next(quan+ya)
         next(jun+jie)
         next(tian+guo)
     */
```
        
### combineLatest
- 绑定超过最多不超过8个的Observable流，结合在一起处理。
- 和Zip不同的是combineLatest是一个流的事件对应另一个流的最新的事件，两个事件都会是最新的事件，可将下图与Zip的图进行对比

```objc
let subject5 = PublishSubject<String>()
let subject6 = PublishSubject<String>()
Observable.combineLatest(subject5, subject6) { (sub5, sub6) -> String in
        sub5 + "+" + sub6
    }.subscribe({ print($0) }).addDisposableTo(bag)

subject5.onNext("quan")
subject5.onNext("1")
subject6.onNext("ya")
subject6.onNext("2")
subject5.onNext("--")

    /*输出事件:
         将subject3的最新事件和subject4的最新事件一起处理
         next(1+ya)
         next(1+2)
         next(--+2)
     */
```
        
### switchLatest
- switchLatest可以对事件流进行转换，本来监听的subject1，我可以通过更改variable里面的value更换事件源。变成监听subject2了

```objc
let subject7 = BehaviorSubject(value: "love")
//BehaviorSubject: 接受订阅之前的最后一个事件
let subject8 = BehaviorSubject(value: "love to")
let variable = Variable(subject7)
variable.asObservable()
        .switchLatest()
        .subscribe({ print($0) })
        .addDisposableTo(bag)
        
subject7.onNext("ya")
subject7.onNext("jie")

variable.value = subject8
subject7.onNext("quan")
subject8.onNext("jun")
        
variable.value = subject7
subject8.onNext("jie")
subject7.onNext("guo")

    /*输出事件:
         next(love)
         next(ya)
         next(jie)
         next(love to)
         next(jun)
         next(quan)
         next(guo)
     */
```


## 过滤和约束
### distinctUntilChanged
- distinctUntilChanged就是当: 下一个事件与前一个事件是不同事件的事件才进行处理操作

```objc
Observable.of(1, 2, 1, 1, 1, 3, 3, 1)
        .distinctUntilChanged()
        .subscribe({ print($0) })
        .addDisposableTo(bag)
        
    /*输出顺序为:
         next(1)
         next(2)
         next(1)
         next(3)
         next(1)
         completed
     */
```

### elementAt
- 只处理在指定位置的事件

```objc
Observable.of(1, 2, 3, 4, 5)
        .elementAt(3)
        .subscribe({ print($0) })
        .addDisposableTo(bag)
    /*输出顺序为:
         next(4)
         completed
     */
```

### single
- 找出在sequence只发出一次的事件，如果超过一个就会发出error错误

#### 多个信号输出的情况

```objc
Observable.of(1, 2, 3, 4)
        .single()
        .subscribe({ print($0) })
        .addDisposableTo(bag)
        
    /*输出顺序为:
         next(1) //单一信号超过了一个,只会输出第一个,然后输出error
         error(Sequence contains more than one element.)
     */
```
        
#### 指定某唯一信号的情况

```objc
Observable.of(1, 2, 3, 4)
        .single({ $0 == 2 })
        .subscribe({ print($0) })
        .addDisposableTo(bag)
    /*输出顺序为:
         next(2)
         completed
     */

```


#### 指定某不唯一信号的情况

```objc

Observable.of(1, 4, 3, 4)
        .single({ $0 == 4 })
        .subscribe({ print($0) })
        .addDisposableTo(bag)
    
    /*输出顺序为:
         next(4) //单一信号超过了一个,只会输出第一个,然后输出error
         error(Sequence contains more than one element.)
     */
```

#### 找不到该信号的情况

```objc
Observable.of(1, 4, 3, 4)
        .single({ $0 == 2 })
        .subscribe({ print($0) })
        .addDisposableTo(bag)
    /*输出顺序为:
         没有对应的参数,然后输出error
         error(Sequence doesn't contain any elements.)
     */
```

### filter

- 过滤掉某些不符合要求的事件

```objc
Observable.of(1, 2, 3, 4, 5)
        .filter({ $0 > 3 })
        .subscribe({ print($0) })
        .addDisposableTo(bag)
    /*输出顺序为:
         next(4)
         next(5)
         completed
     */
```

### take

- 只处理前几个事件信号

```objc

Observable.of(1, 2, 3, 4, 5)
        .take(2)
        .subscribe({ print($0) })
        .addDisposableTo(bag)
    /*输出顺序为:
         next(1)
         next(2)
         completed
     */
```


### takeLast
- 只处理后几个事件信号

```objc
Observable.of(1, 2, 3, 4, 5)
        .takeLast(2)
        .subscribe({ print($0) })
        .addDisposableTo(bag)
    /*输出顺序为:
         next(4)
         next(5)
         completed
     */
```

### takeWhile
- 当条件满足的时候进行处理

```objc
Observable.of(1, 2, 3, 4, 5)
        .takeWhile({ $0 > 3 })
        .subscribe({ print($0) })
        .addDisposableTo(bag)
    /*输出顺序为:
         next(4)
         next(5)
         completed
     */
```

### takeUntil
- 接收事件消息，直到另一个sequence发出事件消息的时候.停止接收消息,输出completed

```objc
let subject1 = PublishSubject<String>()
let subject2 = PublishSubject<String>()
subject1.takeUntil(subject2)
        .subscribe({ print($0) })
        .addDisposableTo(bag)
subject1.onNext("quan")
subject1.onNext("jun")

subject2.onNext("ya")//停止接收消息
        
subject1.onNext("tian")
subject2.onNext("guo")

    /*输出顺序为:
         next(quan)
         next(jun)
         completed
     */
```


### skip
- 取消前几个事件

```objc
Observable.of(1, 2, 3, 4, 5)
        .skip(3)
        .subscribe({ print($0) })
        .addDisposableTo(bag)
        
    /*输出顺序为:
         next(4)
         next(5)
         completed
     */
```


### skipWhile
- 满足条件的事件消息都取消
  
```objc
Observable.of(1, 2, 3, 4, 5)
        .skipWhile({ $0 < 4 })
        .subscribe({ print($0) })
        .addDisposableTo(bag)
    /*输出顺序为:
         next(4)
         next(5)
         completed
     */
```

### skipWhileWithIndex
- 满足条件的都被取消，传入的闭包同skipWhile有点区别而已
- `skipWhile`的(<4)和`skipWhileWithIndex`的(<=3)的效果是一样的
  
```objc
Observable.of(1, 2, 3, 4, 5)
        .skipWhileWithIndex({ (element, index) -> Bool in
            index <= 3
        })
        .subscribe({ print($0) })
        .addDisposableTo(bag)
    
    /*输出顺序为:
         next(4)
         next(5)
         completed
     */
```


### skipUntil
- 直到某个sequence发出了事件消息，才开始接收当前sequence发出的事件消息

```objc
let subject3 = PublishSubject<String>()
let subject4 = PublishSubject<String>()
subject3.skipUntil(subject4)
        .subscribe({ print($0) })
        .addDisposableTo(bag)
subject3.onNext("quan")
subject4.onNext("jun")
        
subject4.onNext("ya")//开始接收消息
        
subject3.onNext("tian")
subject4.onNext("guo")
    
    /*输出顺序为:
         next(tian)
     */
```


## 数学操作
### toArray
- 将sequence转换成一个array，并转换成单一事件信号，然后结束
  
```objc
Observable.range(start: 1, count: 5)
        .toArray()
        .subscribe({ print($0) })
        .addDisposableTo(bag)
        
    /*输出顺序为:
         next([1, 2, 3, 4, 5])
         completed
     */
```
        
### reduce
- 用一个初始值，对事件数据进行累计操作。reduce接受一个初始值，和一个操作符号

```objc
Observable.of(10, 12, 34)
       .reduce(0, accumulator: +)
       .subscribe({ print($0) })
       .addDisposableTo(bag)
       
  /*输出顺序为:
         next(56)
         completed
     */
```
        
### concat
- concat会把多个sequence和并为一个sequence，并且当前面一个sequence发出了completed事件，才会开始下一个sequence的事件。
- 在第一sequence发出onCompleted完成之前，第二个sequence发出的事件都会被忽略

```objc
let subject1 = BehaviorSubject(value: "quan")
let subject2 = BehaviorSubject(value: "jun")
let variable = Variable(subject1)
variable.asObservable()
        .concat()
        .subscribe({ print($0) })
        .addDisposableTo(bag)
subject1.onNext("ya")
subject1.onNext("jie")
subject2.onNext("jun")  //subject2不被输出
        
variable.value = subject2  //subject1发出onCompleted()之前会继续输出subject1
        
subject1.onNext("guo")
subject2.onNext("tian")
        
subject1.onCompleted()  //subject1结束,开始输出subject2,此时subject2的值接受最后一个("tian")
        
subject2.onNext("love")
subject1.onNext("to love") //subject1将不再被输出
        
    /*输出顺序为:
        next(quan)
        next(ya)
        next(jie)
        next(guo)
        next(tian)
        next(love)
     */

```

## RxSwift的优点

- Composable 可组合，在设计模式中有一种模式叫做组合模式，你可以方便的用不同的组合实现不同的类
- Reusable 代码可重用，原因很简单，对应RxSwift，就是一堆Obserable
- Declarative 响应式的，因为状态不可变，只有数据变化
- Understandable and concise 简洁，容易理解。
- Stable 稳定，因为RxSwift写出的代码，单元测试时分方便
- Less stateful “无”状态性，因为对于响应式编程，你的应用程序就是一堆数据流
- Without leaks 没有泄漏，因为资源管理非常简单







