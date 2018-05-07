---
title: ReactiveCocoa之集合使用详解02
date: 2018-03-21 22:48:29
tags: [函数式, 响应式, RACTuple, RACSequence]
categories: ReactiveCocoa
---

- 上一篇[ReactiveCocoa使用详解01](https://www.titanjun.top/2018/03/19/ReactiveCocoa%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A301/)提到了, `RACStream`中有两个子类——`RACSignal` 和 `RACSequence`
- 上一篇文章中只介绍了, 关于`RACSignal`的使用和底层实现原理
- 这里我们就主要学习一下`RACSequence`的使用和底层实现
- GitHub上的[Demo地址](https://github.com/CoderTitan/RACObjcDemo)
 
<!-- more -->

## 关于RACTuple
- 这里在介绍`RACSequence`之前，我们先来看看`RACTuple`的介绍和实现吧! 在RAC中`RACTuple`是`ReactiveCocoa`的元组类
- 在Swift中, 元组类是一种很重要也很常用的类型, 是一种以下标访问成员变量的类型

```objc
//swift中的元组
let tuple = (3, 2, "a")
print(tuple)
//输出: (3, 2, "a")

let tuple1 = tuple.0
let tuple2 = tuple.2
print(tuple1, tuple2)
//输出: 3 a

```

### RAC中的元组--`RACTuple`
在RAC中`RACTuple`是继承自`NSObject`, 并遵循协议`NSCoding`, `NSCopying`, `NSFastEnumeration`的类, 如下

```objc
@interface RACTuple : NSObject <NSCoding, NSCopying, NSFastEnumeration>

//元组成员的个数
@property (nonatomic, readonly) NSUInteger count;

@property (nonatomic, readonly, nullable) id first;
@property (nonatomic, readonly, nullable) id second;
@property (nonatomic, readonly, nullable) id third;
@property (nonatomic, readonly, nullable) id fourth;
@property (nonatomic, readonly, nullable) id fifth;
@property (nonatomic, readonly, nullable) id last;

```

使用参考
```objc
RACTuple *tuple = RACTuplePack(@1, @2, @"32", @23, @"jun", @2.3, @4.56, @100);
NSLog(@"%lu", (unsigned long)tuple.count);
NSLog(@"%@--%@--%@", tuple.first, tuple.last, tuple[6]);

/*输出:
2018-03-19 20:19:49.139932+0800 ReactiveObjc[23307:1441026] 8
2018-03-19 20:19:49.140112+0800 ReactiveObjc[23307:1441026] 1--100--4.56
*/
```



`RACTuple`透过底层看上去, 其实就是一个`NSArray`在进行操作, 无非是针对该数组进行了一些不同的封装和处理


```objc
@interface RACTuple ()

- (instancetype)initWithBackingArray:(NSArray *)backingArray NS_DESIGNATED_INITIALIZER;

@property (nonatomic, readonly) NSArray *backingArray;

@end

```

- 下面我们看一下`RACTuple`提供的类方法和实例方法
- 一共3个实例方法, 3个类方法, 如下

```objc
/// 类方法
+ (instancetype)tupleWithObjectsFromArray:(NSArray *)array;
+ (instancetype)tupleWithObjectsFromArray:(NSArray *)array convertNullsToNils:(BOOL)convert;
+ (instancetype)tupleWithObjects:(id)object, ... NS_REQUIRES_NIL_TERMINATION;

/// 实例方法
- (nullable id)objectAtIndex:(NSUInteger)index;
- (NSArray *)allObjects;
- (__kindof RACTuple *)tupleByAddingObject:(nullable id)obj;
```

- 下面我们一个一个简单介绍下

```objc
+ (instancetype)tupleWithObjectsFromArray:(NSArray *)array {
	return [self tupleWithObjectsFromArray:array convertNullsToNils:NO];
}

+ (instancetype)tupleWithObjectsFromArray:(NSArray *)array convertNullsToNils:(BOOL)convert {
	if (!convert) {
		return [[self alloc] initWithBackingArray:array];
	}

	NSMutableArray *newArray = [NSMutableArray arrayWithCapacity:array.count];
	for (id object in array) {
		[newArray addObject:(object == NSNull.null ? RACTupleNil.tupleNil : object)];
	}

	return [[self alloc] initWithBackingArray:newArray];
}
```

- 这两个方法都是根据传入的array初始化为`RACTuple`内部的`NSArray`
- 然而这两个初始化方法唯一的不同点就在于`convert`参数, 区别在于是否把`NSNull`转换成`RACTupleNil`类型
- 这里还有一个需要注意的就是`RACTupleNil`, 是一个单例

```objc
+ (RACTupleNil *)tupleNil {
	static dispatch_once_t onceToken;
	static RACTupleNil *tupleNil = nil;
	dispatch_once(&onceToken, ^{
		tupleNil = [[self alloc] init];
	});
	
	return tupleNil;
}
```

最后一个类方法, 与NSArray的类方法相同, 如下:

```objc
+ (instancetype)arrayWithObjects:(ObjectType)firstObj, ... NS_REQUIRES_NIL_TERMINATION;
+ (instancetype)tupleWithObjects:(id)object, ... NS_REQUIRES_NIL_TERMINATION;
```

简单使用:
```objc
    NSArray *arr = [NSArray arrayWithObjects:@1, NSNull.null, @2, @"jun", nil];
    RACTuple *tuple1 = [RACTuple tupleWithObjectsFromArray:arr];
    RACTuple *tuple2 = [RACTuple tupleWithObjectsFromArray:arr convertNullsToNils:YES];
    NSLog(@"%@", tuple1.second);
    NSLog(@"%@", tuple2.second);
    
    RACTuple *tuple3 = [RACTuple tupleWithObjects:@1, @3.4, @"jun", nil];
    NSLog(@"%lu", (unsigned long)tuple3.count);

/*输出结果:
2018-03-19 20:59:14.995245+0800 ReactiveObjc[24150:1545073] <null>
2018-03-19 20:59:14.995557+0800 ReactiveObjc[24150:1545073] (null)
2018-03-19 20:59:14.995866+0800 ReactiveObjc[24150:1545073] 3
*/
```

### `RACTuple`的相关类--`RACTupleUnpackingTrampoline`
关于`RACTuple`还有2个相关的类，`RACTupleUnpackingTrampoline`和`RACTupleSequence`

这里我们先看一下, 该类的属性和方法

```objc
@interface RACTupleUnpackingTrampoline : NSObject

+ (instancetype)trampoline;
- (void)setObject:(nullable RACTuple *)tuple forKeyedSubscript:(NSArray *)variables;

@end
```
可以看到只有一个单例和一个示例方法, 下面看依稀阿底层的具体实现

```objc
+ (instancetype)trampoline {
	static dispatch_once_t onceToken;
	static id trampoline = nil;
	dispatch_once(&onceToken, ^{
		trampoline = [[self alloc] init];
	});
	
	return trampoline;
}

- (void)setObject:(RACTuple *)tuple forKeyedSubscript:(NSArray *)variables {
	NSCParameterAssert(variables != nil);
	
	[variables enumerateObjectsUsingBlock:^(NSValue *value, NSUInteger index, BOOL *stop) {
		__strong id *ptr = (__strong id *)value.pointerValue;
		*ptr = tuple[index];
	}];
}
```
该实例方法会遍历传入的`NSArray`数组, 然后依次取出每一个`value`的指针, 用这个指针又赋值给了tuple[index], 下面我们就看一下这个方法的具体使用方法

```objc
- (void)setUnpackingTrampoline {
    RACTupleUnpackingTrampoline *line = [RACTupleUnpackingTrampoline trampoline];
    NSString *str1;
    NSString *str2;
    NSString *str3;
    NSArray *arr = [NSArray arrayWithObjects:[NSValue valueWithPointer:&str1], [NSValue valueWithPointer:&str2], [NSValue valueWithPointer:&str3], nil];
    
    NSLog(@"处理之前: str1 = %@, str2 = %@, str3 = %@", str1, str2, str3);
    [line setObject:RACTuplePack(@"tian", @23, @3.45) forKeyedSubscript:arr];
    NSLog(@"处理之后: str1 = %@, str2 = %@, str3 = %@", str1, str2, str3);
    
    /*输出结果:
     2018-03-20 15:43:28.785571+0800 ReactiveObjc[7074:641560] 处理之前: str1 = (null), str2 = (null), str3 = (null)
     2018-03-20 15:43:28.786078+0800 ReactiveObjc[7074:641560] 处理之后: str1 = tian, str2 = 23, str3 = 3.45
     */
}
```

这个方法的作用类似于, 把封装好的`RACTuple`对象, 一个一个的把它的成员变量解析出来, 说到这里我们就不得不提及两个宏

### `RACTuple`中的宏
一般使用用两个宏，`RACTupleUnpack( )` 用来解包，`Rc( )` 用来装包

```objc
#define RACTuplePack(...) \
    RACTuplePack_(__VA_ARGS__)

//下面RACTuplePack_底层的调用
#define RACTuplePack_(...) \
    ([RACTuplePack_class_name(__VA_ARGS__) tupleWithObjectsFromArray:@[ metamacro_foreach(RACTuplePack_object_or_ractuplenil,, __VA_ARGS__) ]])


//下面RACTupleUnpack_底层的调用
#define RACTupleUnpack_(...) \
    metamacro_foreach(RACTupleUnpack_decl,, __VA_ARGS__) \
    \
    int RACTupleUnpack_state = 0; \
    \
    RACTupleUnpack_after: \
        ; \
        metamacro_foreach(RACTupleUnpack_assign,, __VA_ARGS__) \
        if (RACTupleUnpack_state != 0) RACTupleUnpack_state = 2; \
        \
        while (RACTupleUnpack_state != 2) \
            if (RACTupleUnpack_state == 1) { \
                goto RACTupleUnpack_after; \
            } else \
                for (; RACTupleUnpack_state != 1; RACTupleUnpack_state = 1) \
                    [RACTupleUnpackingTrampoline trampoline][ @[ metamacro_foreach(RACTupleUnpack_value,, __VA_ARGS__) ] ]

```

- 这里的解包的宏的底层实现就是上面说到的`RACTupleUnpackingTrampoline`的实例方法
- 关于`ACTuplePack`的使用这里也不在多说了, 下面主要看一下用于解包的宏, 看一下主要用法, 上代码

```objc
    //宏的使用
    RACTuple *tuple4 = RACTuplePack(@"tian", @23);
    RACTupleUnpack(NSString *str1, NSNumber *num1) = tuple4;
    NSLog(@"%@--%d", str1, num1.intValue);
    ///输出: tian--23
    
    RACTuple *tuple3 = [RACTuple tupleWithObjects:@"jun", @3.4, nil];
    RACTupleUnpack(NSString *str2, NSNumber *num2) = tuple3;
    NSLog(@"%@--%.2f", str2, num2.floatValue);
    ///输出: jun--3.40

    /// 上面的两种做法等同于下面这种做法
    NSString *str3 = tuple3[0];
    NSNumber *num3 = tuple3[1];
    NSLog(@"%@--%.2f", str3, num3.floatValue);
    ///输出: jun--3.40
```

### `RACTupleSequence`
- 上面提到了`RACTuple`还有2个相关的类，`RACTupleUnpackingTrampoline`和`RACTupleSequence`
- 而`RACTupleUnpackingTrampoline`上面我们已经介绍过了
- 这里我们来介绍一下`RACTupleSequence`
  - 之所以说`RACTupleSequence`和`RACTuple`相关, 也只是因为两者的雷鸣里面都有一个`Tuple`
  - 实际上`RACTupleSequence`是继承自`RACSequence`的, 下面看一下定义代码, 只有一个返回值为`RACSequence`的类方法


```objc
#import "RACSequence.h"

+ (RACSequence *)sequenceWithTupleBackingArray:(NSArray *)backingArray offset:(NSUInteger)offset;

@end


//方法的实现
+ (RACSequence *)sequenceWithTupleBackingArray:(NSArray *)backingArray offset:(NSUInteger)offset {
	NSCParameterAssert(offset <= backingArray.count);

	if (offset == backingArray.count) return self.empty;

	RACTupleSequence *seq = [[self alloc] init];
	seq->_tupleBackingArray = backingArray;
	seq->_offset = offset;
	return seq;
}
```

- 可见:
  - `RACTupleSequence`这个类的目的就是把`Tuple`转换成`Sequence`
  - `Sequence`里面的数组就是`Tuple`内部的`backingArra`y。
  - `offset`从0开始


## RACSequence底层实现
`RACSequence`是`RACStream`的子类，主要是`ReactiveCocoa`里面的集合类, 先来看看关于`RACSequence`的属性

### `RACSequence`的属性

```objc
@property (nonatomic, strong, readonly, nullable) ValueType head;

@property (nonatomic, strong, readonly, nullable) RACSequence<ValueType> *tail;

@property (nonatomic, copy, readonly) NSArray<ValueType> *array;

@property (nonatomic, copy, readonly) NSEnumerator<ValueType> *objectEnumerator;

@property (nonatomic, copy, readonly) RACSequence<ValueType> *eagerSequence;

@property (nonatomic, copy, readonly) RACSequence<ValueType> *lazySequence;
```

#### 于`head`和`tail`

- `RACSequence`的所有属性中, 最重要的莫过于`head`和`tail`两个属性了, 而`tail`又是一个`RACSequence`
- 这两者就像一个人的头和身体两部分
- 测试代码如下

```objc
    RACSequence *sequence = [RACSequence sequenceWithHeadBlock:^id _Nullable{
        return @12;
    } tailBlock:^RACSequence * _Nonnull{
        return @[@23, @"jun"].rac_sequence;
    }];
    NSLog(@"sequence.head = %@ , sequence.tail =  %@", sequence.head, sequence.tail);
    
    /*输出结果:
    sequence.head = 12 , sequence.tail =  <RACArraySequence: 0x6000002325a0>{ name = , array = (
        23,
        jun
    ) }
```

#### objectEnumerator
`objectEnumerator`是一个快速枚举器, 看一下底层的get方法

```objc
- (NSEnumerator *)objectEnumerator {
	RACSequenceEnumerator *enumerator = [[RACSequenceEnumerator alloc] init];
	enumerator.sequence = self;
	return enumerator;
}

```

- 这里涉及到一个`RACSequenceEnumerator`, 底层只有一个属性
- 为了更加方便的`RACSequence`进行遍历, 重写了父类的方法
- 有了这个`NSEnumerator`，就可以从`RACSequence`的head一直遍历到tail
- 而`RACSequence`里面定义的`objectEnumerator`，就是为了取出内部的`RACSequenceEnumerator`

```objc
@interface RACSequenceEnumerator : NSEnumerator

@property (nonatomic, strong) RACSequence *sequence;

@end

//这里重写了父类的方法
- (id)nextObject {
	id object = nil;
	
	@synchronized (self) {
		object = self.sequence.head;
		self.sequence = self.sequence.tail;
	}
	
	return object;
}
```

#### `array`

```objc
- (NSArray *)array {
	NSMutableArray *array = [NSMutableArray array];
	for (id obj in self) {
		[array addObject:obj];
	}

	return [array copy];
}
```

- `RACSequence`的定义里面还有一个`array`，这个数组就是返回一个`NSArray`
- 这个数组里面装满了`RACSequence`里面所有的对象。
- 这里之所以能用`for-in`，是因为实现了`NSFastEnumeration`协议。
- 至于`for-in`的效率，完全就看重写`NSFastEnumeration`协议里面`countByEnumeratingWithState: objects: count:` 方法里面的执行效率了
- 至于剩下的两个属性, 下文中会继续说到


## RACSequence的方法
### RACSequence的初始化方法

`RACSequence`的初始化方法有且只有一个

```objc
+ (RACSequence *)sequenceWithHeadBlock:(id (^)(void))headBlock tailBlock:(RACSequence<id> *(^)(void))tailBlock {
	return [[RACDynamicSequence sequenceWithHeadBlock:headBlock tailBlock:tailBlock] setNameWithFormat:@"+sequenceWithHeadBlock:tailBlock:"];
}
```

#### `RACDynamicSequence`属性
上面初始化方法的底层是直接调用了`RACDynamicSequence`的一个类方法, 而这个类又是`RACSequence`的子类, 看看主要属性

```objc
@interface RACDynamicSequence () {
    id _head;
    RACSequence *_tail;
    id _dependency;
}
@property (nonatomic, strong) id headBlock;
@property (nonatomic, strong) id tailBlock;
@property (nonatomic, assign) BOOL hasDependency;
@property (nonatomic, strong) id (^dependencyBlock)(void);

@end
```

- 相比大家应该知道, 正常情况下我们定义的`block`都是用`copy`修饰的
- 而这里, 作者定义了三个`block`: `headBlock`, `tailBlock`，`dependencyBlock`都是用`strong`修饰的
- 关于这个问题, 可以[参考这里](https://github.com/ReactiveCocoa/ReactiveCocoa/issues/505)

#### 方法的实现

```objc
+ (RACSequence *)sequenceWithHeadBlock:(id (^)(void))headBlock tailBlock:(RACSequence<id> *(^)(void))tailBlock {
	NSCParameterAssert(headBlock != nil);

	RACDynamicSequence *seq = [[RACDynamicSequence alloc] init];
	seq.headBlock = [headBlock copy];
	seq.tailBlock = [tailBlock copy];
	seq.hasDependency = NO;
	return seq;
}

+ (RACSequence *)sequenceWithLazyDependency:(id (^)(void))dependencyBlock headBlock:(id (^)(id dependency))headBlock tailBlock:(RACSequence *(^)(id dependency))tailBlock {
	NSCParameterAssert(dependencyBlock != nil);
	NSCParameterAssert(headBlock != nil);

	RACDynamicSequence *seq = [[RACDynamicSequence alloc] init];
	seq.headBlock = [headBlock copy];
	seq.tailBlock = [tailBlock copy];
	seq.dependencyBlock = [dependencyBlock copy];
	seq.hasDependency = YES;
	return seq;
}
```

- `hasDependency`这个变量是代表是否有`dependencyBlock`。这个函数里面就只把`headBlock`和`tailBlock`保存起来了
- 上面第二个方法是带有`dependencyBlock`的, 也会把`dependencyBlock`保存起来

## 积极运算和惰性求值
- 说到惰性求值, 就立马想到了懒加载, 就是在getter里动态返回属性, 也就是等到要用的时候才会计算
- 关于这两个概念, 推荐大家看这篇文章[聊一聊iOS开发中的惰性计算](http://williamzang.com/blog/2016/11/07/liao-yi-liao-ioskai-fa-zhong-de-duo-xing-ji-suan/)

### 积极运算
在`RACSequence`中积极运算的代表是`RACSequence`的一个子类`RACArraySequence`的子类——`RACEagerSequence`。它的积极运算表现在其bind函数上

```objc
- (RACSequence *)bind:(RACSequenceBindBlock (^)(void))block {
	NSCParameterAssert(block != nil);
	RACStreamBindBlock bindBlock = block();
	NSArray *currentArray = self.array;
	NSMutableArray *resultArray = [NSMutableArray arrayWithCapacity:currentArray.count];
	
	for (id value in currentArray) {
		BOOL stop = NO;
		RACSequence *boundValue = (id)bindBlock(value, &stop);
		if (boundValue == nil) break;

		for (id x in boundValue) {
			[resultArray addObject:x];
		}

		if (stop) break;
	}
	
	return [[self.class sequenceWithArray:resultArray offset:0] setNameWithFormat:@"[%@] -bind:", self.name];
}
```
- 可以看到, 该方法内部执行了两层`for-in`循环
  - 第一层循环遍历的自己`RACSequence`中的值，然后拿到这个值传入闭包`bindBlock()`中，返回一个`RACSequence`，最后用一个`NSMutableArray`依次把每个`RACSequence`里面的值都装起来
  - 第二层循环是在遍历`RACSequence`，之所以可以用`for-in`的方式遍历就是因为实现了`NSFastEnumeration`协议，实现了`countByEnumeratingWithState: objects: count: `方法
- 这里就是一个积极运算的例子,在每次循环中都会把闭包`block()`的值计算出来。值得说明的是，最后返回的`RACSequence`的类型是`self.class`类型的，即还是`RACEagerSequence`类型的

### 惰性计算
等到需要用到的时候才会计算, 我们看一下在`RACSequence`中，bind函数的实现

```objc
- (RACSequence *)bind:(RACSequenceBindBlock (^)(void))block {
	RACSequenceBindBlock bindBlock = block();
	return [[self bind:bindBlock passingThroughValuesFromSequence:nil] setNameWithFormat:@"[%@] -bind:", self.name];
}

- (RACSequence *)bind:(RACSequenceBindBlock)bindBlock passingThroughValuesFromSequence:(RACSequence *)passthroughSequence {
	__block RACSequence *valuesSeq = self;
	__block RACSequence *current = passthroughSequence;
	__block BOOL stop = NO;

	RACSequence *sequence = [RACDynamicSequence sequenceWithLazyDependency:^ id {
		while (current.head == nil) {
			if (stop) return nil;

			id value = valuesSeq.head;

			if (value == nil) {
				stop = YES;
				return nil;
			}

			current = (id)bindBlock(value, &stop);
			if (current == nil) {
				stop = YES;
				return nil;
			}

			valuesSeq = valuesSeq.tail;
		}

		NSCAssert([current isKindOfClass:RACSequence.class], @"-bind: block returned an object that is not a sequence: %@", current);
		return nil;
	} headBlock:^(id _) {
		return current.head;
	} tailBlock:^ id (id _) {
		if (stop) return nil;

		return [valuesSeq bind:bindBlock passingThroughValuesFromSequence:current.tail];
	}];

	sequence.name = self.name;
	return sequence;
}
```

- 在上述方法实现中, 就是用`sequenceWithLazyDependency: headBlock: tailBlock:`方法生成了一个`RACSequence`，并返回
- 通过调用`RACSequence`里面的bind操作，并没有执行3个闭包里面的值，只是保存起来了。
- 这里就是惰性求值的表现——等到要用的时候才会计算
- 下面我们看一段代码示例

```objc
    NSArray *arr = @[@1, @3, @4];
    RACSequence *sequence1 = [arr.rac_sequence map:^id _Nullable(id  _Nullable value) {
        NSLog(@"sequence");
        return @10;
    }];
    
    RACSequence *lazySequence = [arr.rac_sequence.lazySequence map:^id _Nullable(id  _Nullable value) {
        NSLog(@"lazySequence");
        return @20;
    }];
    
    RACSequence *eagerSequence = [arr.rac_sequence.eagerSequence map:^id _Nullable(id  _Nullable value) {
        NSLog(@"eagerSequence");
        return @30;
    }];

//    [sequence1 array];
//    [lazySequence array];

    /*输出:
    2018-03-21 15:53:24.562184+0800 ReactiveObjc[9109:771797] eagerSequence
    2018-03-21 15:53:24.562674+0800 ReactiveObjc[9109:771797] eagerSequence
    2018-03-21 15:53:24.562799+0800 ReactiveObjc[9109:771797] eagerSequence
    */
```

- 从打印结果可以看出,只有`eagerSequence`执行了三次, 而其他两个并没有输出
- 原因是因为bind闭包只在`eagerSequence`中真正被调用执行了，而在`lazySequence`中bind闭包仅仅只是被copy了
- 当吧最后两行注释打开之后
- 可见在`RACSequence`中，除去`RACEagerSequence`是积极运算，其他的`Sequence`都是惰性求值的。

```objc
2018-03-21 15:53:24.562184+0800 ReactiveObjc[9109:771797] eagerSequence
2018-03-21 15:53:24.562674+0800 ReactiveObjc[9109:771797] eagerSequence
2018-03-21 15:53:24.562799+0800 ReactiveObjc[9109:771797] eagerSequence
2018-03-21 15:53:24.562940+0800 ReactiveObjc[9109:771797] sequence
2018-03-21 15:53:24.563403+0800 ReactiveObjc[9109:771797] sequence
2018-03-21 15:53:24.563583+0800 ReactiveObjc[9109:771797] sequence
2018-03-21 15:53:24.563742+0800 ReactiveObjc[9109:771797] lazySequence
2018-03-21 15:53:24.563838+0800 ReactiveObjc[9109:771797] lazySequence
2018-03-21 15:53:24.563937+0800 ReactiveObjc[9109:771797] lazySequence
```

## RACSequence的方法

```objc
- (id)foldLeftWithStart:(nullable id)start reduce:(id _Nullable (^)(id _Nullable accumulator, ValueType _Nullable value))reduce;

- (id)foldRightWithStart:(nullable id)start reduce:(id _Nullable (^)(id _Nullable first, RACSequence *rest))reduce;

- (BOOL)any:(BOOL (^)(ValueType _Nullable value))block;

- (BOOL)all:(BOOL (^)(ValueType _Nullable value))block;

- (nullable ValueType)objectPassingTest:(BOOL (^)(ValueType _Nullable value))block;
```

### 折叠函数
我们先看一下他的底层实现, 函数传入了一个初始值start，然后依次循环执行reduce( )，循环之后，最终的值作为返回值返回。第一个函数就是折叠函数，从左边折叠到右边; 第二个方向是从右往左

```objc
- (id)foldLeftWithStart:(id)start reduce:(id (^)(id, id))reduce {
	NSCParameterAssert(reduce != NULL);

	if (self.head == nil) return start;
	
	for (id value in self) {
		start = reduce(start, value);
	}
	
	return start;
}

- (id)foldRightWithStart:(id)start reduce:(id (^)(id, RACSequence *))reduce {
	NSCParameterAssert(reduce != NULL);

	if (self.head == nil) return start;
	
	RACSequence *rest = [RACSequence sequenceWithHeadBlock:^{
		if (self.tail) {
			return [self.tail foldRightWithStart:start reduce:reduce];
		} else {
			return start;
		}
	} tailBlock:nil];
	
	return reduce(self.head, rest);
}

```

具体使用方法测试代码
```objc
- (void)setSequenceAction {
    NSArray *array = @[@5, @3, @9, @4];
    RACSequence *sequence = [array rac_sequence];
    id leftData = [sequence foldLeftWithStart:@"-" reduce:^id _Nullable(id  _Nullable accumulator, id  _Nullable value) {
        return [accumulator stringByAppendingString:[value stringValue]];
    }];
    
    id rightData = [sequence foldRightWithStart:@":" reduce:^id _Nullable(id  _Nullable first, RACSequence * _Nonnull rest) {
        return [NSString stringWithFormat:@"%@-%@", rest.head, first];
    }];
    
    NSLog(@"leftData = %@, rightData = %@", leftData, rightData);
    
    //输出: leftData = -5394, rightData = :-4-9-3-5
}
```

### `objectPassingTest`
函数里面会调用`RACStream`中的`filter:`函数, 如果`block(value)`为YES，就代表通过了Test，那么就会返回value的`sequence`, 取出head返回

```objc
- (id)objectPassingTest:(BOOL (^)(id))block {
	NSCParameterAssert(block != NULL);

	return [self filter:block].head;
}
```

测试代码如下
```objc
NSArray *array = @[@5, @3, @9, @4];
RACSequence *sequence = [array rac_sequence];
id anyData = [sequence objectPassingTest:^BOOL(id  _Nullable value) {
    NSLog(@"%@", value);
    return false;
}];
NSLog(@"%@", anyData);

//输出: 5
```

### any: 和 all:

```objc
- (BOOL)any:(BOOL (^)(id))block {
	NSCParameterAssert(block != NULL);

	return [self objectPassingTest:block] != nil;
}

- (BOOL)all:(BOOL (^)(id))block {
	NSCParameterAssert(block != NULL);
	
	NSNumber *result = [self foldLeftWithStart:@YES reduce:^(NSNumber *accumulator, id value) {
		return @(accumulator.boolValue && block(value));
	}];
	
	return result.boolValue;
}
```

- `any:` 会调用`objectPassingTest:`函数，如果不为nil就代表有value值通过了Test，有通过了value的就返回YES，反之返回NO
- all:会从左往右依次对每个值进行block( ) Test，然后每个值依次进行&&操作
- 测试代码如下: 

```objc
    NSArray *array = @[@5, @3, @9, @4];
    RACSequence *sequence = [array rac_sequence];
    
    //all
    BOOL anyBool = [sequence any:^BOOL(id  _Nullable value) {
        return true;
    }];
    BOOL allBool = [sequence all:^BOOL(id  _Nullable value) {
        return true;
    }];
    
    NSLog(@"any = %d, all = %d", anyBool, allBool);
    //输出: any = 1, all = 1
```

## RACSequence的子类和扩展
### 子类
- 关于`RACSequence`有以下9个子类
- 其中`RACEagerSequence`是继承自`RACArraySequence`。
- 这些子类看名字就知道`sequence`里面装的是什么类型的数据。
- `RACUnarySequence`里面装的是单元`sequence`, 它只有head值，没有tail值

![RACStream.png](https://upload-images.jianshu.io/upload_images/4122543-4ca3c41197e0fcca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下面列出了每一个子类里面的方法, 前面都已经介绍过这些方法, 这里也就不在赘述

```objc
//RACArraySequence
@interface RACArraySequence : RACSequence

+ (RACSequence *)sequenceWithArray:(NSArray *)array offset:(NSUInteger)offset;

@end


//RACDynamicSequence
@interface RACDynamicSequence : RACSequence

+ (RACSequence *)sequenceWithLazyDependency:(id (^)(void))dependencyBlock headBlock:(id (^)(id dependency))headBlock tailBlock:(RACSequence *(^)(id dependency))tailBlock;

@end


//RACEmptySequence
@interface RACEmptySequence : RACSequence
//单例
+ (RACEmptySequence *)empty;

@end


//RACIndexSetSequence
@interface RACIndexSetSequence : RACSequence

+ (RACSequence *)sequenceWithIndexSet:(NSIndexSet *)indexSet;

@end


//RACSignalSequence
@interface RACSignalSequence : RACSequence

+ (RACSequence *)sequenceWithSignal:(RACSignal *)signal;

@end


//RACStringSequence
@interface RACStringSequence : RACSequence

+ (RACSequence *)sequenceWithString:(NSString *)string offset:(NSUInteger)offset;

@end


//RACTupleSequence
@interface RACTupleSequence : RACSequence

+ (RACSequence *)sequenceWithTupleBackingArray:(NSArray *)backingArray offset:(NSUInteger)offset;

@end


//RACUnarySequence
@interface RACUnarySequence : RACSequence

+ (RACUnarySequence *)return:(id)value;

@end

```

### 扩展
`RACSequenceAdditions` 总共有7个`Category`。这7个`Category`分别对iOS 里面的集合类进行了`RACSequence`的扩展，使我们能更加方便的使用`RACSequence`

![RACSequenceAdditions.png](https://upload-images.jianshu.io/upload_images/4122543-aa6185bb24ec0073.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800)

#### `NSArray+RACSequenceAdditions`

```objc
@interface NSArray<__covariant ObjectType> (RACSequenceAdditions)

@property (nonatomic, copy, readonly) RACSequence<ObjectType> *rac_sequence;

@end
```
把任意一个`NSArray`数组转换成`RACSequence`, 底层是`RACArraySequence`调用 `sequenceWithArray`方法, 将`NSArray`对象转成`RACArraySequence`对象

```objc
- (RACSequence *)rac_sequence {
	return [RACArraySequence sequenceWithArray:self offset:0];
}
```

#### `NSDictionary+RACSequenceAdditions`

```objc
@interface NSDictionary<__covariant KeyType, __covariant ObjectType> (RACSequenceAdditions)

@property (nonatomic, copy, readonly) RACSequence<RACTwoTuple<KeyType, ObjectType> *> *rac_sequence;
@property (nonatomic, copy, readonly) RACSequence<KeyType> *rac_keySequence;
@property (nonatomic, copy, readonly) RACSequence<ObjectType> *rac_valueSequence;

@end
```

把任意一个`NSDictionary`字典转换成`RACSequence`

```objc
- (RACSequence *)rac_sequence {
	NSDictionary *immutableDict = [self copy];

	// TODO: First class support for dictionary sequences.
	return [immutableDict.allKeys.rac_sequence map:^(id key) {
		id value = immutableDict[key];
		return RACTuplePack(key, value);
	}];
}

- (RACSequence *)rac_keySequence {
	return self.allKeys.rac_sequence;
}

- (RACSequence *)rac_valueSequence {
	return self.allValues.rac_sequence;
}
```

- `rac_sequence`: 通过map映射
  - 先将每一个键值对转成`RACTuple`元组对象, key对应元组的第一个, value对应第二个
  - 将每一个`RACTuple`元组放在一个数组里面
  - 最后把数组转成`RACSequence`对象
- `rac_keySequence`: 把所有的key值转成`RACSequence`对象
- `rac_valueSequence`: 把所有的value值转成`RACSequence`对象

#### `NSSet+RACSequenceAdditions`
把任意一个`NSSet`对象转换成`RACSequence`对象

```objc
@interface NSSet<__covariant ObjectType> (RACSequenceAdditions)

@property (nonatomic, copy, readonly) RACSequence<ObjectType> *rac_sequence;

@end


//属性的getter方法
- (RACSequence *)rac_sequence {
	// TODO: First class support for set sequences.
	return self.allObjects.rac_sequence;
}
```

#### `NSString+RACSequenceAdditions`
把任意一个`NSString`转换成包含该字符串, 所有字符的数组对应的`RACSequence`

```objc
@interface NSString (RACSequenceAdditions)

@property (nonatomic, copy, readonly) RACSequence<NSString *> *rac_sequence;

@end


//属性的getter方法
- (RACSequence *)rac_sequence {
	return [RACStringSequence sequenceWithString:self offset:0];
}
```

#### `NSEnumerator+RACSequenceAdditions`
- 把任意一个`NSEnumerator`转换成`RACSequence`
  - 返回的`RACSequence`的head是当前的`sequence`的head
  - 返回的`RACSequence`的tail是当前的`sequence`本身

```objc
@interface NSEnumerator<ObjectType> (RACSequenceAdditions)

@property (nonatomic, copy, readonly) RACSequence<ObjectType> *rac_sequence;

@end

//底层实现
- (RACSequence *)rac_sequence {
	return [RACSequence sequenceWithHeadBlock:^{
		return [self nextObject];
	} tailBlock:^{
		return self.rac_sequence;
	}];
}
```

#### `NSIndexSet+RACSequenceAdditions`
把任意一个`NSIndexSet`转换成`RACSequence`

```objc
@interface NSIndexSet (RACSequenceAdditions)

@property (nonatomic, copy, readonly) RACSequence<NSNumber *> *rac_sequence;

@end


//底层实现
- (RACSequence *)rac_sequence {
	return [RACIndexSetSequence sequenceWithIndexSet:self];
}
```


#### `NSOrderedSet+RACSequenceAdditions`
把任意一个`NSOrderedSet`中的数组转换成`RACSequence`对象

```objc
@interface NSOrderedSet<__covariant ObjectType> (RACSequenceAdditions)

@property (nonatomic, copy, readonly) RACSequence<ObjectType> *rac_sequence;

@end


//底层实现
- (RACSequence *)rac_sequence {
	// TODO: First class support for ordered set sequences.
	return self.array.rac_sequence;
}
```

### 总结
- 这篇文章篇幅比较长, 都是对源码的解, 文中如有不足之处还望多多指教
- 下一篇将会着重介绍一下RAC中的一些高级用法, 敬请期待..
- 参考文章:
  - http://cocoadocs.org/docsets/ReactiveCocoa/2.1/Classes/RACSequence.html
  - http://williamzang.com/blog/2016/11/07/liao-yi-liao-ioskai-fa-zhong-de-duo-xing-ji-suan/
  - http://blog.csdn.net/qq_30513483/article/details/53924990
