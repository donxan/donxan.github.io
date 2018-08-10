---
title: RxSwift的使用详解01
date: 2017-09-15 20:15:47
tags: [Swift, RxSwift, 响应式编程]
categories: RxSwift框架
---

- [RxSwift](https://github.com/ReactiveX/RxSwift)是`Swift`函数响应式编程的一个开源库，由`Github`的[ReactiveX](https://github.com/ReactiveX)组织开发、维护
- 其他语言像C#, Java 和 JS 也有，`Rx.Net`、`RxJava`、[rxjs](https://github.com/ReactiveX/rxjs)
- `RxSwift`的目的是让数据/事件流和异步任务能够更方便的序列化处理，能够使用`Swift`进行响应式编程


<!-- more -->

## RxSwift简介

- 推荐: [RxSwift官方文档](https://github.com/ReactiveX/RxSwift)
- 中文: [RxSwift官方文档的中文翻译](https://github.com/jhw-dev/RxSwift-CN)


### `RxSwift`做了什么
  - `RxSwift`把我们程序中每一个操作都看成一个事件
  - 比如一个`TextField`中的文本改变，一个按钮被点击，或者一个网络请求结束等，每一个事件源就可以看成一个管道，也就是`sequence`
  - 比如`TextField`，当我们改变里面的文本的时候，这个`TextField`就会不断的发出事件，从他的这个`sequence`中不断的流出，我们只需要监听这个`sequence`，每流出一个事件就做相应的处理。
  - 同理，`Button`也是一个`sequence`，每点击一次就流出一个事件。

### `RxSwift`的核心思想
- `sequence`，`Observable`表示可监听或者可观察，也就是说RxSwift的核心思想是可监听的序列。
- 并且，`Observable sequence`可以接受异步信号，也就是说，信号是可以异步给监听者的

  - `Observable(ObservableType)` 和 `SequenceType`类似
  - `ObservableType.subscribe` 和 `SequenceType.generate`类似
  - 由于`RxSwift`支持异步获得信号，所以用`ObservableType.subscribe`，这和`indexGenerator.next()`类似

- 其中`SequenceType`是`Swift2.3`以前版本,之后的版本没有该协议)中的一个协议，比如`Swift`中的`Array`就遵循这个协议，通过这个协议，你可以这样的去操作一个Array

```objc
let array = [1,2,3,4,5]
let array2 = array.filter({$0 > 1}).map({$0 * 2})//4 6 8 10
var indexGenerator = array2.generate()
let fisrt = indexGenerator.next() // 4
let seoncd = indexGenerator.next() //6 
```


### ObservableType

`RxSwift`中，`ObservableType.subscribe`的回调（新的信号到来）一共有三

```objc
enum Event<Element>  {
    case Next(Element)      // 新的信号到来
    case Error(ErrorType)   // 信号发生错误，序列不会再产生信号
    case Completed          // 序列发送信号完成，不会再产生新的信号
}
protocol ObserverType {
    func on(event: Event<Element>) //监听所有的信号
}
```


### 取消监听

> `Observable`分为两种

- 在有限的时间内会自动结束`Completed/Error`,比如一个网络请求当作一个序列，当网络请求完成的时候，`Observable`自动结束，资源会被释放
- 信号不会自己结束，最简单的比如一个Timer，每隔一段时间发送一个新的信号过来，这时候需要手动取消监听，来释放相应的资源
- 比如一个`label.rx.text`是一个`Obserable`，通常需要这样调用`addDisposableTo(disposeBag)`来让其在`deinit`，也就是所有者要释放的时候，自动取消监听

```
class Observable<Element> {
    func subscribe(observer: Observer<Element>) -> Disposable //调用Disposable的方法来取消

}
```

> 当然，除了手动释放，`RxSwift`提供了一些操作符，比如 `takeUntil`来根据条件取消

```
sequence
    .takeUntil(self.rx_deallocated) //当对象要释放的时候，取消监听
    .subscribe {
        print($0)
    }
```

## `RxSwift`简单体验
- 首先创建`deinit`属性，也就是所有者要释放的时候，自动取消监听

```objc
fileprivate lazy var bag = DisposeBag()
```

### `RxSwift`监听按钮的点击
- 传统方式: 
- 

```objc
button1.addTarget(self, action: #selector(btn1Click(_:)), for: .touchUpInside)
```

- `RxSwift`方式

```objc
button1.rx.tap.subscribe { (event) in
    self.button1.setTitle("按钮1", for: .normal)
    print("button1")
}.addDisposableTo(bag)
        
button2.rx.tap.subscribe { (event) in
    self.textField2.text = "按钮2被点击了"
}.addDisposableTo(bag)
```

### `RxSwift`监听`UITextField`的文字改变
- 传统做法,设置`textField2.delegate = self`
- `RxSwift`方式

#### 用on方法实现

```objc
subscribe(<#T##on: (Event<Int>) -> Void##(Event<Int>) -> Void#>)
```

```objc
textField1.rx.text.subscribe { (event: Event<String?>) in
    //将UITextField文字改变的内容显示在Label中
    self.label1.text = event.element!    
    print(event.element!!)
}.addDisposableTo(bag)
        
textField2.rx.text.subscribe { (event: Event<String?>) in
    print(event.element)//报警告
    //输出: Optional(Optional("jun"))
}.addDisposableTo(bag)
```

#### 用`onNext`方法实现

```objc
subscribe(on: (Event<Int>) -> Void)
```

```objc
textField1.rx.text.subscribe(onNext: { (str: String?) in
    self.label1.text = str!
}).addDisposableTo(bag)
```        

### `RxSwift`改变`Label`中文字

```objc
label1.rx.observe(String.self, "text").subscribe(onNext: { (str: String?) in
    print(str!)
}).addDisposableTo(bag)
        
label2.rx.observe(CGRect.self, "frame").subscribe(onNext: { (rect: CGRect?) in
    print(rect!.width)
}).addDisposableTo(bag)
```

### `RxSwift`监听`UIScrollView`的滚动

```objc
scrollView.contentSize = CGSize(width: 1000, height: 0)
scrollView.rx.contentOffset
            .subscribe(onNext: { (point : CGPoint) in
                print(point)
            }).addDisposableTo(bag)


```

## `RxSwift`常见操作
- `addDisposableTo(disposeBag)`方法是让其`deinit`，也就是所有者要释放的时候，自动取消监听

```
//创建bag
let bag = DisposeBag()
```

### never
- never就是创建一个sequence,但是不发出任何事件信号

```objc
let neverSqu = Observable<String>.never()
neverSqu.subscribe { (_) in
    //该语句不会执行
    print("This will never be printed")
}.addDisposableTo(bag)
//调用Disposable的方法来取消

```

### empty
- empty就是创建一个空的sequence,只能发出一个complected事件

```objc
Observable<Int>.empty().subscribe { (event) in
    //该语句只会执行一次
    //输出: completed
    print(event)
}.addDisposableTo(bag)
```
        
### just
- `just`是创建一个`sequence`只能发出一种特定的事件，能正常结束

```objc
Observable<Int>.just(3).subscribe { (event) in
    print(event)
    /*该语句只会执行两次,分别输出
     1) next(3),语句结果
     2) completed, 结束事件
    */
}.addDisposableTo(bag)
        
Observable.just("jun").subscribe { (event) in
    print(event)
    /*该语句只会执行两次,分别输出
     1) next(jun),语句结果
     2) completed, 结束事件
    */
}.addDisposableTo(bag)
```    
        
### of

- of是创建一个`sequence`能发出很多种事件信号

```objc
Observable.of("a", "b", "2", "5.3")
    .subscribe(onNext: { print($0) })
    .addDisposableTo(bag)
    //会分别输出 "a", "b", "2", "5.3"

Observable.of("a", "b", "2", "5.3").subscribe(onNext: { (event) in
    print(event)
    /*该语句只会执行4次,分别输出
     1) next(a),语句结果
     2) next(b),语句结果
     3) next(2),语句结果
     4) next(3.5),语句结果
     */
}, onError: nil, onCompleted: nil, onDisposed: nil).addDisposableTo(bag)
   //每一个闭包都设置设置了 一个默认值,故可以省略
```
        
### from
- from就是从数组中创建sequence

```objc
Observable.from(["a", "b", "2", "5.3"]).subscribe { (event) in
    print(event)
    /*该语句只会执行5次,分别输出
     1) next(a),语句结果
     2) next(b),语句结果
     3) next(2),语句结果
     4) next(3.5),语句结果
     5) completed, 结束事件
     */
}.addDisposableTo(bag)
```

### create
- 我们也可以自定义可观察的sequence，那就是使用create
- create操作符传入一个观察者observer，然后调用observer的onNext，onCompleted和onError方法。返回一个可观察的obserable序列

#### 自定义方法创建observable的creat
##### 无参创建creat

```objc
fileprivate func myobserable() -> Observable<Any> {
    return Observable.create({ (observal: AnyObserver<Any>) -> Disposable in
        observal.onNext("abc")
        observal.onNext("12")
        observal.onCompleted()
        return Disposables.create()
    })
}
```

##### 添加参数创建creat

```objc
fileprivate func myJunst(element: String) -> Observable<String> {
    return Observable.create({ (observal: AnyObserver<String>) -> Disposable in
        observal.onNext(element)
        observal.onCompleted()
        return Disposables.create()
    })
}
```

#### 在函数内调用自定义方法

```objc
myobserable().subscribe(onNext: { print($0) }).addDisposableTo(bag)
//该语句只会执行2次,分别输出"abc", "12"
 
        
myJunst(element: "jun").subscribe(onNext: { print($0) }).addDisposableTo(bag)
//该语句只会执行2次,分别输出"jun"

```

### range(给定范围, 依次显示)
- range就是创建一个sequence，他会发出这个范围中的从开始到结束的所有事件
- Observable<Int>,必须指定数据类型

```objc
Observable<Int>.range(start: 1, count: 4).subscribe { (event: Event<Int>) in
    print(event)
    /*该语句只会执行5次,分别输出
     1) next(1),语句结果
     2) next(2),语句结果
     3) next(3),语句结果
     4) next(4),语句结果
     5) completed, 结束事件
     */
}.addDisposableTo(bag)
```

### repeatElement(重复执行)
创建一个sequence，发出特定的事件n次

```objc
Observable.repeatElement("quanjun")
    .take(3)
    .subscribe(onNext: { print($0) })
    .addDisposableTo(bag)
    //该语句只会执行3次,每次都输出"quanjun" 

```

### generate(类似于for循环)
- generate是创建一个可观察sequence，当初始化的条件为true的时候，他就会发出所对应的事件

```objc
let generate = Observable.generate(initialState: 0, condition: { $0 < 5 }, iterate: { $0 + 2 })
generate.subscribe({ print($0) }).addDisposableTo(bag)
        
        /*1> 输出顺序:
         next(0)
         next(2)
         next(4)
         completed
         
         2> 以上代码可以理解为for循环处理逻辑
        for (Int i = 0; i < 5; i++) {
            print(i)
        }
        */
```
        
### error(发出错误信号)
- 创建一个可观察序列，但不发出任何正常的事件，只发出error事件并结束

```objc
 let error = NSError(domain: "错误", code: 10, userInfo: nil) as Error
 Observable<Any>.error(error)
            .subscribe({ print($0) })
            .addDisposableTo(bag)
        
//输出: error(Error Domain=错误 Code=10 "(null)")
```


## RxSwift中Subjects
- `Subjects`是什么?
  - `Subjet`是`observable`和`Observer`之间的桥梁，一个`Subject`既是一个`Obserable`也是一个`Observer`，他既可以发出事件，也可以监听事件
  
### `PublishSubject`

- 当你订阅PublishSubject的时候，你只能接收到订阅他之后发生的事件。subject.onNext()发出onNext事件，对应的还有onError()和onCompleted()事件


```objc
let pSubject = PublishSubject<String>()
pSubject.subscribe { (event: Event<String>) in
        print("2--", event)
    }.addDisposableTo(bag)
print("1--------------")
        
pSubject.onNext("T")
pSubject.onNext("Q")
        
pSubject.subscribe { (event: Event<String>) in
         print("3--", event)
    }.addDisposableTo(bag)
pSubject.onNext("J")
        
    /*输出顺序为:
         1--------------
         2-- next(T)
         2-- next(Q)
         2-- next(J)
         3-- next(J)
     */

```

### ReplaySubject
- 当你订阅ReplaySubject的时候，你可以接收到订阅他之后的事件，但也可以接受订阅他之前发出的事件，接受几个事件取决与bufferSize的大小
- `createUnbounded() `表示接受所有事件
- `create(bufferSize: 4)` 表示可接受到的订阅他之前的事件的个数,但是订阅他之后的事件一定会触发

#### `createUnbounded() `表示接受所有事件

```objc
let rSubject = ReplaySubject<String>.createUnbounded()
rSubject.onNext("T")
rSubject.onNext("Q")
rSubject.subscribe { (event: Event<String>) in
         print("0--", event)
    }.addDisposableTo(bag)
        
rSubject.onNext("J")

/*输出顺序为:
     0-- next(T)
     0-- next(Q)
     0-- next(J)
  */
```

#### `create(bufferSize: 4)` 表示可接受到的订阅他之前的事件的个数

```objc
let rSubject1 = ReplaySubject<String>.create(bufferSize: 1)
rSubject1.onNext("T")
rSubject1.onNext("Q")
rSubject1.subscribe { (event: Event<String>) in
            print("4--", event)
        }.addDisposableTo(bag)
        
rSubject1.onNext("J")

/*输出顺序为:
     4-- next(Q)
     4-- next(J)
  */
  
```

### BehaviorSubject
- 当你订阅了BehaviorSubject，你会接受到订阅之前的最后一个事件,订阅之后的事件一定会触发

```objc
let bSubject = BehaviorSubject(value: "G")
bSubject.subscribe { (event: Event<String>) in
        print("5--", event)
    }.addDisposableTo(bag)
        
bSubject.onNext("Y")
bSubject.onNext("Q")
        
bSubject.subscribe { (event: Event<String>) in
        print("6--", event)
    }.addDisposableTo(bag)
        
bSubject.onNext("J")

/*输出顺序为:
         5-- next(G)
         5-- next(Y)
         5-- next(Q)
         6-- next(Q)
         5-- next(J)
         6-- next(J)
 */

```

### Variable
- Variable是BehaviorSubject一个包装箱，就像是一个箱子一样，使用的时候需要调用asObservable()拆箱，里面的value是一个BehaviorSubject，他不会发出error事件，但是会自动发出completed事件。
- 1> 相当于对BehaviorSubject进行装箱
- 2> 如果想将Variable当成Obserable, 让订阅者进行订阅时, 需要调用asObserable拆箱转成Obserable
- 3> 如果Variable打算发出事件, 直接修改对象的value即可
- 4> 当事件结束时,Variable会自动发出completed事件

```objc
let variable = Variable("S")
variable.asObservable().subscribe { (event) in
        print("7--", event)
    }.addDisposableTo(bag)
        
variable.value = "D"
variable.value = "Q"
        
variable.asObservable().subscribe { (event) in
        print("8--", event)
    }.addDisposableTo(bag)
        
variable.value = "j"

/*输出顺序为:
         7-- next(S)
         7-- next(D)
         7-- next(Q)
         8-- next(Q)
         7-- next(j)
         8-- next(j)
         7-- completed
         8-- completed
  */

```


## RxSwift细节理解

### 变换操作

#### map

- 通过传入一个函数闭包把原来的sequence转变为一个新的sequence的操作

```objc
Observable.of(1, 2, 3, 4)
        .map({ $0 * $0 })
        .subscribe(onNext: { print($0) })
        .addDisposableTo(bag)
        
/* 输出顺序为:
    1
    4
    9
    16
 */
```

#### flatMap
- 将一个sequence转换为一个sequences，当你接收一个sequence的事件，你还想接收其他sequence发出的事件的话可以使用flatMap，她会将每一个sequence事件进行处理以后，然后再以一个sequence形式发出事件

##### 首先创建一个struct

```objc
struct Student {
    var score: Variable<Double>
}
```

##### flatMap执行代码

```objc
let stu1 = Student(score: Variable(80))
let stu2 = Student(score: Variable(100))
        
let student = Variable(stu1)
student.asObservable().flatMap { (stu: Student) -> Observable<Double> in
    return stu.score.asObservable()
}.subscribe { (event) in
    print(event)
}.addDisposableTo(bag)
        
student.value = stu2
stu1.score.value = 10
stu2.score.value = 20
        
    /* 输出顺序为:
         next(80.0)
         next(100.0)
         next(10.0)
         next(20.0)
         completed
     */

```

#### flatMapLatest
- flatMapLatest只会接收最新的value事件，将上例代码改为flatMapLatest

```objc
let stu3 = Student(score: Variable(70))
let stu4 = Student(score: Variable(60))

let student1 = Variable(stu3)
student1.asObservable().flatMapFirst { (stu) -> Observable<Double> in
    return stu.score.asObservable()
}.subscribe { (event: Event<Double>) in
    print(event)
}.addDisposableTo(bag)
student1.value = stu4
stu3.score.value = 10
stu4.score.value = 20
        
    /* 输出顺序为:
         next(70.0)
         next(10.0)
         completed
     */

```

### 释放资源
- 当监听一个事件序列的时候，有消息事件来了，我们做某些事情。但是这个事件序列不再发出消息了，我们的监听也就没有什么存在价值了，所以我们需要释放我们这些监听资源，其实也就是每种编程语言中的内存资源释放。
- OC和Swift中也一样，在你不需要用某些变量的时候，你需要把这些变量所占用的内存空间释放掉。
- 释放某一个监听的时候我们可以手动调用释放方法

#### dispose

- 相当于MRC中手动调用release操作
- 注意: 因为观察者已经销毁, 所有后面无法接受事件
 
```objc
let testVariable = Variable("jun")
testVariable.asObservable().subscribe { (event : Event<String>) in
    print(event)
}.dispose()

testVariable.value = "tian"

    /* 输出顺序为:
         next(jun)
         completed
     */

```


#### Dispose Bags
- 除了上面手动的方法，还有一种是自动的方式
- 推荐大家使用这种方式，这种方式就好像iOS中的ARC方式似得，会自动去释放资源。
```objc
fileprivate lazy var bag = DisposeBag()
```

在代码结尾调用`.addDisposableTo(bag)`方法


### UIBindingObserver
- UIBindingObserver这个东西很有用的，创建我们自己的监听者，有时候RxCocoa(RxSwiftz中对UIKit的一个扩展库)给的扩展不够我们使用
- 比如一个UITextField有个isEnabled属性，我想把这个isEnabled变为一个observer，我们可以这样做：

```objc
extension Reactive where Base: UITextField {
    var inputEnabled: UIBindingObserver<Base, Result> {
        return UIBindingObserver(UIElement: base) { textFiled, result in
            textFiled.isEnabled = result.isValid
        }
    }
}
```

> 后续会继续更新相关方面知识,敬请期待