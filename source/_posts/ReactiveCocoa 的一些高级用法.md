---
title: ReactiveCocoa 的一些高级用法
date: 2018-03-31 19:14:40
tags: [高级用法]
categories: ReactiveCocoa
---

- 之前已经有两篇文章介绍了`ReactiveCocoa`的一些见解和用法, 这里也就不再作介绍了
- 其中第一篇文章介绍了[ReactiveCocoa关于RACSingle的使用详解](http://www.titanjun.top/2018/03/19/ReactiveCocoa使用详解01/)
- 第二篇文章介绍了[ReactiveCocoa之集合使用详解](http://www.titanjun.top/2018/03/21/ReactiveCocoa之集合使用详解02/)
- 有兴趣的可以先去看看这两篇文章
- 接下来我们就着重介绍一些`Map`, `concat`等高级用法

<!-- more -->

## ReactiveCocoa常见操作介绍
### ReactiveCocoa操作须知
- 所有的信号`RACSignal`都可以进行操作处理，因为所有操作方法都定义在RACStream.h中，因此只要继承RACStream就有了操作处理方法。

### ReactiveCocoa操作思想
- 运用的是Hook（钩子）思想，Hook是一种用于改变API(应用程序编程接口：方法)执行结果的技术.
- Hook用处：截获API调用的技术。
- Hook原理：在每次调用一个API返回结果之前，先执行你自己的方法，改变结果的输出

## 高级操作

### ReactiveCocoa核心方法bind
- `ReactiveCocoa`操作的核心方法是`bind`（绑定）,而且RAC中核心开发方式，也是绑定，之前的开发方式是赋值，而用RAC开发，应该把重心放在绑定，也就是可以在创建一个对象的时候，就绑定好以后想要做的事情，而不是等赋值之后在去做事情。
- 在开发中很少使用bind方法，bind属于RAC中的底层方法，RAC已经封装了很多好用的其他方法，底层都是调用bind，用法比bind简单.
- bind方法简单介绍和使用
  - 需求: 监听文本框的内容, 每次输出的时候, 在内容后面品尚字符串`"jun"`, 并显示在`label`上

方式一: 在返回结果后, 拼接字符串
```objc
    @weakify(self)
    [_textField.rac_textSignal subscribeNext:^(NSString * _Nullable x) {
        @strongify(self)
        self.showLabel.text = [NSString stringWithFormat:@"%@+%@", x, @"jun"];
    }];

```

方式二: 在返回结果前, 拼接字符串, 用bind方法操作

```objc
    [[_textField.rac_textSignal bind:^RACSignalBindBlock _Nonnull{
        return ^RACSignal *(id value, BOOL *stop){
            return [RACReturnSignal return:[NSString stringWithFormat:@"输出: %@", value]];
        };
    }] subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
```

- `bind`方法介绍
  - `bind`方法参数:需要传入一个返回值是`RACStreamBindBlock`的`block`参数
  - `RACStreamBindBlock`是一个`block`的类型，返回值是信号，参数`（value,stop）`，因此参数的`block`返回值也是一个`block`
  - 如下:

```objc
typedef RACSignal * _Nullable (^RACSignalBindBlock)(ValueType _Nullable value, BOOL *stop);

```
- `RACStreamBindBlock`:
  - 参数一(value): 表示接收到信号的原始值，还没做处理
  - 参数二`*stop`: 用来控制绑定`Block`，如果`*stop` = yes,那么就会结束绑定。
  - 返回值：信号，做好处理，在通过这个信号返回出去，一般使用`RACReturnSignal`,需要手动导入头文件`RACReturnSignal.h`

```objc
@interface RACReturnSignal<__covariant ValueType> : RACSignal<ValueType>

+ (RACSignal<ValueType> *)return:(ValueType)value;

@end
```

- bind方法使用步骤:
  - 传入一个返回值`RACStreamBindBlock`的`block`
  - 描述一个`RACStreamBindBlock`类型的`bindBlock`作为`block`的返回值。
  - 描述一个返回结果的信号，作为`bindBlock`的返回值。
  - 注意：在`bindBlock`中做信号结果的处理
- bind底层实现:
  - 源信号调用bind,会重新创建一个绑定信号。
  - 当绑定信号被订阅，就会调用绑定信号中的`didSubscribe`，生成一个`bindingBlock`。
  - 当源信号有内容发出，就会把内容传递到`bindingBlock`处理，调用`bindingBlock(value,stop)`
  - 调用`bindingBlock(value,stop)`，会返回一个内容处理完成的信号`（RACReturnSignal）`。
  - 订阅`RACReturnSignal`，就会拿到绑定信号的订阅者，把处理完成的信号内容发送出来

### 映射(flattenMap,Map)
- `flattenMap`，`Map`用于把源信号内容映射成新的内容
- 在`Swift`中系统API就已经有了这些函数的用法, 详情可参考我的这篇文章[Swift函数式编程之Map&Reduce&Filter](http://www.titanjun.top/2017/05/19/Swift函数式编程之Map&Reduce&Filter/)
 
#### `flattenMap`
把源信号的内容映射成一个新的信号，信号可以是任意类型
- `flattenMap`使用步骤:
   - 传入一个`block`，`block`类型是返回值`RACStream`，参数`value`
   - 参数`value`就是源信号的内容，拿到源信号的内容做处理
   - 包装成`RACReturnSignal`信号，返回出去
- `flattenMap`底层实现:
   - 0.`flattenMap`内部调用`bind`方法实现的,`flattenMap`中`block`的返回值，会作为`bind`中`bindBlock`的返回值。
   - 1.当订阅绑定信号，就会生成`bindBlock`。
   - 2.当源信号发送内容，就会调用`bindBlock(value, *stop)`
   - 3.调用`bindBlock`，内部就会调用`flattenMap`的`block`，`flattenMap`的`block`作用：就是把处理好的数据包装成信号
   - 4.返回的信号最终会作为`bindBlock`中的返回信号，当做`bindBlock`的返回信号。
   - 5.订阅`bindBlock`的返回信号，就会拿到绑定信号的订阅者，把处理完成的信号内容发送出来

```objc
- (__kindof RACStream *)flattenMap:(__kindof RACStream * (^)(id value))block {
	Class class = self.class;

	return [[self bind:^{
		return ^(id value, BOOL *stop) {
			id stream = block(value) ?: [class empty];
			NSCAssert([stream isKindOfClass:RACStream.class], @"Value returned from -flattenMap: is not a stream: %@", stream);

			return stream;
		};
	}] setNameWithFormat:@"[%@] -flattenMap:", self.name];
}
```

简单使用
```objc
    @weakify(self)
    [[_textField.rac_textSignal flattenMap:^__kindof RACSignal * _Nullable(NSString * _Nullable value) {
        //源信号发出的时候，就会调用这个block。
        // 返回值：绑定信号的内容.
        return [RACReturnSignal return:[NSString stringWithFormat:@"flat输出: %@", value]];
    }] subscribeNext:^(id  _Nullable x) {
        @strongify(self)
        //订阅绑定信号, 每当原信号发送内容, 处理后, 就会调用这个black
        self.showLabel.text = x;
        NSLog(@"%@", x);
    }];
```

####  Map
Map作用:把源信号的值映射成一个新的值

- `Map`使用步骤:
  - 传入一个`block`,类型是返回对象，参数是`value`
  - `value`就是源信号的内容，直接拿到源信号的内容做处理
  - 把处理好的内容，直接返回就好了，不用包装成信号，返回的值，就是映射的值。
- `Map`底层实现:
  - `Map`底层其实是调用`flatternMap`, Map中`block`中的返回的值会作为`flatternMap`中block中的值。
  - 当订阅绑定信号，就会生成`bindBlock`。
  - 当源信号发送内容，就会调用`bindBlock(value, *stop)`
  - 调用`bindBlock`，内部就会调用`flattenMap`的`block`
  - `flattenMap`的`block`内部会调用`Map`中的`block`，把Map中的`block`返回的内容包装成返回的信号。
  - 返回的信号最终会作为`bindBlock`中的返回信号，当做`bindBlock`的返回信号。
  - 订阅`bindBlock`的返回信号，就会拿到绑定信号的订阅者，把处理完成的信号内容发送出来

```objc
- (__kindof RACStream *)map:(id (^)(id value))block {
	NSCParameterAssert(block != nil);

	Class class = self.class;
	
	return [[self flattenMap:^(id value) {
		return [class return:block(value)];
	}] setNameWithFormat:@"[%@] -map:", self.name];
}
```

简单使用

```objc
    //Map
    [[_textField.rac_textSignal map:^id _Nullable(NSString * _Nullable value) {
        return [NSString stringWithFormat:@"map输出: %@", value];
    }] subscribeNext:^(id  _Nullable x) {
        @strongify(self)
        self.showLabel.text = x;
        NSLog(@"%@", x);
    }];
    
    //对数组的处理
    NSArray *arr = @[@"2", @"3", @"a", @"g"];
    RACSequence *sequence = [arr.rac_sequence map:^id _Nullable(id  _Nullable value) {
        return [NSString stringWithFormat:@"-%@-", value];
    }];
    
    NSLog(@"%@", [sequence array]);
    
    /*输出: 
    2018-03-24 14:13:32.421337+0800 ReactiveObjc[9043:492929] (
        "-2-",
        "-3-",
        "-a-",
        "-g-"
    )
    */
```

#### `FlatternMap` 和 `Map`的区别
- `FlatternMap`中的`Block`返回信号。
- `Map`中的`Block`返回对象。
- 开发中，如果信号发出的值不是信号，映射一般使用`Map`
- 开发中，如果信号发出的值是信号，映射一般使用`FlatternMap`
- 信号中信号
  - 当一个信号需要返回另一个信号中的值的时候
  - 让我们来看看下面这个例子

```objc
#pragma 信号中信号
- (void)singleAndSingle {
    //创建信号中信号
    RACSubject *sonSingle = [RACSubject subject];
    RACSubject *single = [RACSubject subject];
    
    [[sonSingle flattenMap:^__kindof RACSignal * _Nullable(id  _Nullable value) {
        //sonSingle发送信号时, 才会调用
        return value;
    }] subscribeNext:^(id  _Nullable x) {
        //只有sonSingle的子信号, 大宋消息时, 才会调用
        NSLog(@"输出: %@", x);
    }];
    
    //信号中信号发送子信号
    [sonSingle sendNext:single];
    //子信号发送内容
    [single sendNext:@123];
}
```

### 组合
#### concat
按照某一固定顺序拼接信号，当多个信号发出的时候，有顺序的接收信号

```objc
//让我们先看一下一般的正常操作
- (void)setConcatAction {
    //当需要按顺序执行的时候: 先执行A, 在执行B
    RACSubject *subjectA = [RACSubject subject];
    RACSubject *subjectB = [RACReplaySubject subject];
    
    NSMutableArray *array = [NSMutableArray array];
    
    //订阅信号
    [subjectA subscribeNext:^(id  _Nullable x) {
        [array addObject:x];
    }];
    [subjectB subscribeNext:^(id  _Nullable x) {
        [array addObject:x];
    }];
    
    //发送信号
    [subjectB sendNext:@"B"];
    [subjectA sendNext:@"A"];
    [subjectA sendCompleted];
    
    //输出: [B, A]
    NSLog(@"%@", array);
}
```

- 很明显, 上述的结果并未达到我们的需求: 限制性A, 在执行B
- 下面我们看看使用`concat`后的执行情况

```objc
- (void)setConcatAction {
    //当需要按顺序执行的时候: 先执行A, 在执行B
    RACSubject *subC = [RACSubject subject];
    RACSubject *subD = [RACReplaySubject subject];
    
    NSMutableArray *array2 = [NSMutableArray array];
    
    //订阅信号
    [[subC concat:subD] subscribeNext:^(id  _Nullable x) {
        [array2 addObject:x];
    }];
    
    //发送信号
    [subD sendNext:@"D"];
    [subC sendNext:@"C"];
    [subC sendCompleted];
    
    //输出: [C, D]
    NSLog(@"%@", array2);
}
```

- 可以看到, 输出的结果和我们预想的一样, 顺序输出
- 那么, `concat`的底层到底是如何实现的呢?

```objc
- (RACSignal *)concat:(RACSignal *)signal {
	return [[RACSignal createSignal:^(id<RACSubscriber> subscriber) {
		RACCompoundDisposable *compoundDisposable = [[RACCompoundDisposable alloc] init];

		RACDisposable *sourceDisposable = [self subscribeNext:^(id x) {
			[subscriber sendNext:x];
		} error:^(NSError *error) {
			[subscriber sendError:error];
		} completed:^{
			RACDisposable *concattedDisposable = [signal subscribe:subscriber];
			[compoundDisposable addDisposable:concattedDisposable];
		}];

		[compoundDisposable addDisposable:sourceDisposable];
		return compoundDisposable;
	}] setNameWithFormat:@"[%@] -concat: %@", self.name, signal];
}
```

- `concat`底层实现:
  - 当拼接信号被订阅，就会调用拼接信号的`didSubscribe`
  - `didSubscribe`中，会先订阅第一个源信号`subjectA`
  - 会执行第一个源信号`subjectA`的`didSubscribe`
  - 第一个源信号`subjectA`的`didSubscribe`中发送值，就会调用第一个源信号`subjectA`订阅者的`nextBlock`, 通过拼接信号的订阅者把值发送出来.
  - 第一个源信号`subjectA`的`didSubscribe`中发送完成，就会调用第一个源信号`subjectA`订阅者的`completedBlock`,订阅第二个源信号`subjectB`这时候才激活`subjectB`
  - 订阅第二个源信号`subjectB`,执行第二个源信`subjectB`号的`didSubscribe`
  - 第二个源信号`subjectB`的`didSubscribe`中发送值,就会通过拼接信号的订阅者把值发送出来.

#### then
用于连接两个信号，当第一个信号完成，才会连接then返回的信号

```objc
- (RACSignal *)then:(RACSignal * (^)(void))block {
	NSCParameterAssert(block != nil);

	return [[[self
		ignoreValues]
		concat:[RACSignal defer:block]]
		setNameWithFormat:@"[%@] -then:", self.name];
}

//ignoreValues底层实现
- (RACSignal *)ignoreValues {
	return [[self filter:^(id _) {
		return NO;
	}] setNameWithFormat:@"[%@] -ignoreValues", self.name];
}
```

- 实现原理
  - 底层会调用`filter`过滤掉本身信号发出的值(`filter`后面会讲到)
  - 然后再使用`concat`连接`then`返回的信号
  - 下面是测试用例

```objc
- (void)setThenAction {
    RACSubject *subjectA = [RACReplaySubject subject];
    RACSubject *subjectB = [RACReplaySubject subject];
    
    //发送信号
    [subjectA sendNext:@"A"];
    [subjectA sendCompleted];
    [subjectB sendNext:@"B"];
    
    //订阅信号
    [[subjectA then:^RACSignal * _Nonnull{
        return subjectB;
    }] subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
    
    //这里只会输出: B
    //不会输出: A
}
```

#### merge
把多个信号合并为一个信号，任何一个信号有新值的时候就会调用

```objc
- (RACSignal *)merge:(RACSignal *)signal {
	return [[RACSignal
		merge:@[ self, signal ]]
		setNameWithFormat:@"[%@] -merge: %@", self.name, signal];
}

+ (RACSignal *)merge:(id<NSFastEnumeration>)signals {
	NSMutableArray *copiedSignals = [[NSMutableArray alloc] init];
	for (RACSignal *signal in signals) {
		[copiedSignals addObject:signal];
	}

	return [[[RACSignal
		createSignal:^ RACDisposable * (id<RACSubscriber> subscriber) {
			for (RACSignal *signal in copiedSignals) {
				[subscriber sendNext:signal];
			}

			[subscriber sendCompleted];
			return nil;
		}]
		flatten]
		setNameWithFormat:@"+merge: %@", copiedSignals];
}
```

- 底层实现
  - 1.合并信号被订阅的时候，就会遍历所有信号，并且发出这些信号。
  - 2.每发出一个信号，这个信号就会被订阅
  - 3.也就是合并信号一被订阅，就会订阅里面所有的信号。
  - 4.只要有一个信号被发出就会被监听。

```objc
- (void)setMergeAction {
    // 只要想无序的整合信号数据
    RACSubject *subjectA = [RACSubject subject];
    RACSubject *subjectB = [RACSubject subject];
    RACSubject *subjectC = [RACSubject subject];

    //合并信号
    RACSignal *single = [[subjectA merge:subjectB] merge:subjectC];
    
    //订阅信号
    [single subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
    
    //发出消息
    [subjectA sendNext:@"A"];
    [subjectC sendNext:@"C"];
    [subjectB sendNext:@"B"];
}

//输出结果(分别输出): A, C, B
```

#### zipWith
把两个信号压缩成一个信号，只有当两个信号同时发出信号内容时，并且把两个信号的内容合并成一个元组，才会触发压缩流的next事件
- 底层实现:
  - 1.定义压缩信号，内部就会自动订阅`subjectA`，`subjectB`
  - 2.每当`subjectA`或者`subjectB`发出信号，就会判断`subjectA`，`subjectB`有没有发出个信号，有就会把最近发出的信号都包装成元组发出。

```objc
- (void)setZipwithAction {
    // 只要想无序的整合信号数据
    RACSubject *subjectA = [RACSubject subject];
    RACSubject *subjectB = [RACSubject subject];
    
    //合并信号
    RACSignal *single = [subjectA zipWith:subjectB];
    
    //订阅信号
    [single subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
    
    //发出消息
    [subjectA sendNext:@"A"];
    [subjectB sendNext:@"B"];
    
    /* 输出:
     (A, B)
     */
}
```

#### combineLatest
- 将多个信号合并起来，并且拿到各个信号的最新的值
- 必须每个合并的信号至少都有过一次`sendNext`，才会触发合并的信号
- 这里我们考虑这样一个需求: 在登录页面, 只有在账号密码都输入的情况下, 登录按钮才可点击, 否则不可点击
- 正常情况下我们需要监听每一个文本框的输入
- 下面我们来看一下`combineLatest`控制登录按钮是否可点击

```objc
- (void)setCombineLatest {
    //把两个信号组合成一个信号,跟zip一样，没什么区别
    RACSignal *single = [_accountText.rac_textSignal combineLatestWith:_passwordText.rac_textSignal];
    
    [single subscribeNext:^(id  _Nullable x) {
        RACTupleUnpack(NSString *account, NSString *password) = x;
        
        _loginButton.enabled = account.length > 0 && password.length > 0;
    }];
}
```

- 底层实现：
  - 1.当组合信号被订阅，内部会自动订阅两个信号,必须两个信号都发出内容，才会被触发。(而zip, 是两个信号同事发出内容, 才会触发)
  - 2.把两个信号组合成元组发出。


#### reduce
聚合:用于信号发出是元组的内容，把信号发出元组的值聚合成一个值

> 这里我们把上面的代码, 使用`RACSingle`的一个类方法优化一下

```objc
- (void)setReduceAction {
    // reduce:把多个信号的值,聚合为一个值
    RACSignal *single = [RACSignal combineLatest:@[_accountText.rac_textSignal, _passwordText.rac_textSignal] reduce:^id (NSString *account, NSString *password){
        return @(account.length > 0 && password.length > 0);
    }];
    
    [single subscribeNext:^(id  _Nullable x) {
        _loginButton.enabled = [x boolValue];
    }];
}
```

- `RACSingle`类方法
  - 参数一: `(id<NSFastEnumeration>)`类型   
    - `NSFastEnumeration`我们在上一篇文章[ReactiveCocoa之集合使用详解02](https://www.titanjun.top/2018/03/21/ReactiveCocoa之集合使用详解02/)中简单介绍过
    - `NSFastEnumeration`: 是一个协议, 所有遵循该协议的类, 均可视为一个数组, 例如`NSArray`
    - 故这里, 应该传一个包含`RACSingle`信号的数组
  - 参数二: `(RACGenericReduceBlock)reduceBlock`是一个`black`

```objc
typedef ValueType _Nonnull (^RACGenericReduceBlock)();

//reduceblcok中的参数，有多少信号组合，reduceblcok就有多少参数，每个参数就是之前信号发出的内容
```

这里用一个宏, 急需将上面的代码简化一下

```objc
- (void)setReduceAction {

    RAC(_loginButton, enabled) = [RACSignal combineLatest:@[_accountText.rac_textSignal, _passwordText.rac_textSignal] reduce:^id (NSString *account, NSString *password){
        return @(account.length > 0 && password.length > 0);
    }];
}
```

上面用到了一个宏`RAC`, 这里暂不赘述, 以后会集中整理一下 RAC中的宏, 具体实现如下

```objc
#define RAC(TARGET, ...) \
    metamacro_if_eq(1, metamacro_argcount(__VA_ARGS__)) \
        (RAC_(TARGET, __VA_ARGS__, nil)) \
        (RAC_(TARGET, __VA_ARGS__))

/// Do not use this directly. Use the RAC macro above.
#define RAC_(TARGET, KEYPATH, NILVALUE) \
    [[RACSubscriptingAssignmentTrampoline alloc] initWithTarget:(TARGET) nilValue:(NILVALUE)][@keypath(TARGET, KEYPATH)]
```

### 过滤

#### filter
过滤信号, 过滤掉不符合条件的信号

```objc
- (void) filterAction{
    //filter
    //截取等于11位的字符
    [[_accountText.rac_textSignal filter:^BOOL(NSString * _Nullable value) {
        //类似手机号的输入, 只有等于11位的时候才返回true
        return value.length == 11;
    }]subscribeNext:^(NSString * _Nullable x) {
        //这里只会返回等于11位的字符
        NSLog(@"filter = %@", x);
    }];
}
```

`filter`底层是调用的`flatMap`方法, 如下:

```objc
- (__kindof RACStream *)filter:(BOOL (^)(id value))block {
	NSCParameterAssert(block != nil);

	Class class = self.class;
	
	return [[self flattenMap:^ id (id value) {
		if (block(value)) {
			return [class return:value];
		} else {
			return class.empty;
		}
	}] setNameWithFormat:@"[%@] -filter:", self.name];
}
```

#### ignore
忽略掉某些特定值的信号

```objc
- (void)setIgnoreAction {
    ///ignore
    //这里的测试只有第一个字符位: m的时候能看到效果
    [[_accountText.rac_textSignal ignore:@"m"] subscribeNext:^(NSString * _Nullable x) {
        NSLog(@"ignore = %@", x);
    }];
    
    //ignoreValues: 忽略所有信号
    [[_passwordText.rac_textSignal ignoreValues] subscribeNext:^(id  _Nullable x) {
        NSLog(@"allIgnore = %@", x);
    }];
}
```

`ignore`方法的底层都是调用的`filter`方法

```objc
//ignore
- (__kindof RACStream *)ignore:(id)value {
	return [[self filter:^ BOOL (id innerValue) {
		return innerValue != value && ![innerValue isEqual:value];
	}] setNameWithFormat:@"[%@] -ignore: %@", self.name, RACDescription(value)];
}

//ignoreValues
- (RACSignal *)ignoreValues {
	return [[self filter:^(id _) {
		return NO;
	}] setNameWithFormat:@"[%@] -ignoreValues", self.name];
}
```

#### distinctUntilChanged
- 当上一次的值和当前的值有明显的变化就会发出信号，否则会被忽略掉。
- 在开发中，刷新UI经常使用，只有两次数据不一样才需要刷新

```objc
//distinctUntilChanged
- (void)setdistinctUntilChanged {
    //创建信号
    RACSubject *subject = [RACSubject subject];

    //订阅
    [[subject distinctUntilChanged] subscribeNext:^(id  _Nullable x) {
        NSLog(@"distinctUntilChanged = %@", x);
    }];
    
    [subject sendNext:@12];
    [subject sendNext:@12];
    [subject sendNext:@23];
    
    /*输出结果:只会输出两次
     distinctUntilChanged = 12
     distinctUntilChanged = 23
     */
}
```

`distinctUntilChanged`底层是调用的`bind`高级用法

```objc
- (__kindof RACStream *)distinctUntilChanged {
	Class class = self.class;

	return [[self bind:^{
		__block id lastValue = nil;
		__block BOOL initial = YES;

		return ^(id x, BOOL *stop) {
			if (!initial && (lastValue == x || [x isEqual:lastValue])) return [class empty];

			initial = NO;
			lastValue = x;
			return [class return:x];
		};
	}] setNameWithFormat:@"[%@] -distinctUntilChanged", self.name];
}
```

#### take
从开始一共取N次的信号, 当遇到`sendCompleted`语句执行时, 会提前停止发送信号

```objc
- (void)setTakeAndTakeLast {
    //take
    RACSubject *subject1 = [RACSubject subject];
    [[subject1 take:2] subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
    
    [subject1 sendNext:@1];
    [subject1 sendNext:@2];
    [subject1 sendCompleted];
    [subject1 sendNext:@3];
    
    //分别输出: 1, 2
}

//如果上面发送信号的代码调整为
    [subject1 sendNext:@1];
    [subject1 sendCompleted];
    [subject1 sendNext:@2];
    [subject1 sendNext:@3];
    
    //那么输出结果将会,只输出: 1
```

#### takeLast
取调用`sendCompleted`之前的N次信号,前提条件，订阅者必须调用`sendCompleted`，否则不会执行任何操作

```objc
- (void)setTakeAndTakeLast {
    //takeLast
    RACSubject *subject1 = [RACSubject subject];
    [[subject1 takeLast:2] subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
    
    [subject1 sendNext:@1];
    [subject1 sendNext:@2];
    [subject1 sendNext:@3];
    [subject1 sendCompleted];
}
```

#### takeUntil
只要传入的信号发送完成或者`subject2`开始发送信号的时候,就不会再接收信号的内容

```objc
- (void)setTakeAndTakeLast {
    //takeUntil
    RACSubject *subject1 = [RACSubject subject];
    RACSubject *subject2 = [RACSubject subject];
    
    [[subject1 takeUntil:subject2] subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
    
    [subject1 sendNext:@11];
    [subject1 sendNext:@12];
//    [subject1 sendCompleted];
    [subject1 sendNext:@13];
    [subject2 sendNext:@"21"];
    [subject2 sendNext:@"22"];
    
    //这样会输出: 11, 12, 13
    //当sendCompleted取消注释的时候, 只会输出: 11, 12
}
```

#### switchToLatest
- 主要用于信号的信号, 有时候也会发出信号, 会在信号的信号中获取其发送的最新的信号
- 方法的底层是调用了`flattenMap`方法

```objc
- (RACSignal *)switchToLatest {
	return [[RACSignal createSignal:^(id<RACSubscriber> subscriber) {
		RACMulticastConnection *connection = [self publish];

		RACDisposable *subscriptionDisposable = [[connection.signal
			flattenMap:^(RACSignal *x) {
				NSCAssert(x == nil || [x isKindOfClass:RACSignal.class], @"-switchToLatest requires that the source signal (%@) send signals. Instead we got: %@", self, x);

				// -concat:[RACSignal never] prevents completion of the receiver from
				// prematurely terminating the inner signal.
				return [x takeUntil:[connection.signal concat:[RACSignal never]]];
			}]
			subscribe:subscriber];

		RACDisposable *connectionDisposable = [connection connect];
		return [RACDisposable disposableWithBlock:^{
			[subscriptionDisposable dispose];
			[connectionDisposable dispose];
		}];
	}] setNameWithFormat:@"[%@] -switchToLatest", self.name];
}
```

下面我们看一下具体的使用示例

```objc
- (void)setswitchToLatest {
    //信号的信号
    RACSubject *subject1 = [RACSubject subject];
    RACSubject *subject2 = [RACSubject subject];

    //获取信号中信号最近发出信号，订阅最近发出的信号
    [[subject1 switchToLatest] subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
    
    //发送信号
    [subject1 sendNext:subject2];
    [subject2 sendNext:@"信号中信号"];
    
    //最终结果输出: "信号中信号"
}
```

#### skip
跳过N个信号后, 再开始订阅信号
```objc
- (void)setSkipAction {
    //创建信号
    RACSubject *subject = [RACSubject subject];
    
    //订阅信号
    //要求跳过2个信号
    [[subject skip:2] subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
    
    //发送信号
    [subject sendNext:@1];
    [subject sendNext:@2];
    [subject sendNext:@3];
    [subject sendNext:@4];
    
    //因为上面跳过了两个信号, 所以这里只会输出: 3, 4
}
```

### 定时操作
#### interval
定时器, 每隔一段时间发出信号

```objc
    //RAC定时器, 每隔一段时间执行一次
    [[RACSignal interval:1 onScheduler:[RACScheduler mainThreadScheduler]] subscribeNext:^(NSDate * _Nullable x) {
        NSLog(@"定时器");
    }];
```
其中`RACScheduler`是`RAC`中管理线程的类

#### delay
延迟一段时间都发送信号

```objc
    //delay: 延迟执行
    [[[RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        [subscriber sendNext:@"delay"];
        return nil;
    }] delay:2] subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
```

#### timeout
超时, 可以让一个信号在一定时间后自动报错

```objc
    //timeout: 超时, 可以让一个信号在一定时间后自动报错
    RACSignal *single = [[RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        return nil;
    }] timeout:2 onScheduler:[RACScheduler currentScheduler]];
    
    [single subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    } error:^(NSError * _Nullable error) {
        //2秒后自动调用
        NSLog(@"%@", error);
    }];
```

### 重复操作
#### retry
重试 ：只要失败，就会重新执行创建信号中的block,直到成功.

```objc
- (void)setResertAction {
    //retry
    __block int i = 0;
    [[[RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        if (i == 5) {
            [subscriber sendNext:@12];
        } else {
            NSLog(@"发生错误");
            [subscriber sendError:nil];
        }
        i++;
        
        return nil;
    }] retry] subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    } error:^(NSError * _Nullable error) {
        NSLog(@"%@", error);
    }];
    
    
    /*输出结果
     2018-03-30 15:44:08.412860+0800 ReactiveObjc[4125:341376] 发生错误
     2018-03-30 15:44:08.461105+0800 ReactiveObjc[4125:341376] 发生错误
     2018-03-30 15:44:08.461897+0800 ReactiveObjc[4125:341376] 发生错误
     2018-03-30 15:44:08.462478+0800 ReactiveObjc[4125:341376] 发生错误
     2018-03-30 15:44:08.462913+0800 ReactiveObjc[4125:341376] 发生错误
     2018-03-30 15:44:08.463351+0800 ReactiveObjc[4125:341376] 12
     */
}
```

#### replay
重放：当一个信号被多次订阅,反复播放内容

```objc
    //replay
    RACSignal *single = [[RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        [subscriber sendNext:@23];
        [subscriber sendNext:@34];
        
        return nil;
    }] replay];
    
    [single subscribeNext:^(id  _Nullable x) {
        NSLog(@"第一次订阅-%@", x);
    }];
    
    [single subscribeNext:^(id  _Nullable x) {
        NSLog(@"第二次订阅-%@", x);
    }];
    
    /*输出结果:
     2018-03-30 15:51:20.115052+0800 ReactiveObjc[4269:361568] 第一次订阅-23
     2018-03-30 15:51:20.115195+0800 ReactiveObjc[4269:361568] 第一次订阅-34
     2018-03-30 15:51:20.115278+0800 ReactiveObjc[4269:361568] 第二次订阅-23
     2018-03-30 15:51:20.115352+0800 ReactiveObjc[4269:361568] 第二次订阅-34
     */
```

#### throttle
节流:当某个信号发送比较频繁时，可以使用节流, 在一定时间（1秒）内，不接收任何信号内容，过了这个时间（1秒）获取最后发送的信号内容发出。

```objc
    RACSubject *subject = [RACSubject subject];
    
    [[subject throttle:0.001] subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@", x);
    }];
    
    [subject sendNext:@10];
    [subject sendNext:@11];
    [subject sendNext:@12];
    [subject sendNext:@13];
    [subject sendNext:@14];
    [subject sendNext:@15];
    [subject sendNext:@16];
    [subject sendNext:@17];
    [subject sendNext:@18];
    
    //这里因为执行的速度非常快, 所以这里输出的结果只有最后一个: 18
```


- 以上就是RAC中的一些常用的高级用用法具体讲解和使用示例
- 如有不足之处, 还请多多指教, 后期会持续更新相关知识点
- 下面是RAC相关的两篇文章
  - [ReactiveCocoa使用详解01](http://www.titanjun.top/2018/03/19/ReactiveCocoa使用详解01/)
  - [ReactiveCocoa之集合使用详解02](http://www.titanjun.top/2018/03/21/ReactiveCocoa之集合使用详解02/)