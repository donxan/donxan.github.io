---
title: 浅谈OC中Block的本质
date: 2019-06-27 20:36:20
tags: [Objective-C, Block]
categories: iOS底层原理
image:
---



![Block](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/block-ios.jpeg)


<!--more-->



## `Block`简介

- `block`是将函数及其执行上下文封装起来的一个对象
- 在`block`实现的内部，有很多变量，因为`block`也是一个对象
- 其中包含了诸如`isa`指针，`imp`指针等对象变量，还有储存其截获变量的对象等


### 定义和使用

`block`根据有无参数和有无返回值有以下几种简单使用方式


```objc
// 无参数无返回值
void (^ BlockOne)(void) = ^(void){
    NSLog(@"无参数，无返回值");  
};  
BlockOne();//block的调用

// 有参数无返回值
void (^BlockTwo)(int a) = ^(int a){
    NSLog(@"有参数，无返回值, 参数 = %d，",a);
};  
BlockTwo(100);

// 有参数有返回值
int (^BlockThree)(int,int) = ^(int a,int b){    
    NSLog(@"有参数，有返回值");
    return a + b; 
};  
BlockThree(1, 5);

// 无参数有返回值
int(^BlockFour)(void) = ^{
    NSLog(@"无参数，有返回值");
    return 100;
};
BlockFour();
```

可是以上四种`block`底层又是如何实现的呢? 其本质到底如何? 接下来我们一起探讨一下

### Block的本质

- 为了方便我们这里新建一个`Command Line Tool`项目, 在`main`函数中执行上述中一个`block`
- 探索`Block`的本质, 就要查看其源码, 这里我们使用下面命令把`main.m`文件生成与其对应的`c++`代码文件
- 在`main.m`文件所在的目录下, 执行如下命令, 会生成一个`main.cpp`文件
- 把`main.cpp`文件添加到项目中, 并使其不参与项目的编译, 下面我们就具体看一下`block`的底层到底是如何实现的

```
xcrun -sdk iphoneos clang -arch arm64 -rewrite-objc main.m
```

打开`main.cpp`文件, 找到文件最底部, 可以看到`block`的相关源码如下

```objc
// block的结构体
struct __main_block_impl_0 {
  // 结构体的成员变量
  struct __block_impl impl;
  struct __main_block_desc_0* Desc;
  
  // 构造函数
  __main_block_impl_0(void *fp, struct __main_block_desc_0 *desc, int flags=0) {
    impl.isa = &_NSConcreteStackBlock;
    impl.Flags = flags;
    impl.FuncPtr = fp;
    Desc = desc;
  }
};

// 封装了block执行逻辑的函数
static void __main_block_func_0(struct __main_block_impl_0 *__cself) {

            NSLog((NSString *)&__NSConstantStringImpl__var_folders_ty_804897ld2zg4pfcgx2p4wqh80000gn_T_main_11c959_mi_0);
        }

static struct __main_block_desc_0 {
  size_t reserved;
  size_t Block_size;
} __main_block_desc_0_DATA = { 0, sizeof(struct __main_block_impl_0)};
int main(int argc, const char * argv[]) {
    /* @autoreleasepool */ { __AtAutoreleasePool __autoreleasepool; 

        // 定义block变量
        void (* BlockOne)(void) = ((void (*)())&__main_block_impl_0((void *)__main_block_func_0, &__main_block_desc_0_DATA));

        // 执行block内部的源码
        ((void (*)(__block_impl *))((__block_impl *)BlockOne)->FuncPtr)((__block_impl *)BlockOne);

    }
    return 0;
}
static struct IMAGE_INFO { unsigned version; unsigned flag; } _OBJC_IMAGE_INFO = { 0, 2 };
```

其中`block`的声明和调用的对应关系如下

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/block-bottom.png)


删除其中的强制转换的相关代码后

```objc
// 定义block变量
void (* BlockOne)(void) = &__main_block_impl_0(
                                                (void *)__main_block_func_0,
                                                &__main_block_desc_0_DATA
                                            );

// 执行block内部的源码
BlockOne->FuncPtr(BlockOne);
```

上述代码中`__main_block_impl_0`函数接受两个参数, 并有一个返回值, 最后把函数的地址返回给`BlockOne`, 下面找到`__main_block_impl_0`的定义

```objc
// 结构体
struct __main_block_impl_0 {
  struct __block_impl impl;
  struct __main_block_desc_0* Desc;
  
  // c++中的构造函数, 类似于OC中的init方法
  // flags: 默认参数, 调用时可不传
  __main_block_impl_0(void *fp, struct __main_block_desc_0 *desc, int flags=0) {
    impl.isa = &_NSConcreteStackBlock;
    impl.Flags = flags;
    impl.FuncPtr = fp;
    Desc = desc;
  }
};
```

- `__main_block_impl_0`函数中的第一个参数`__main_block_func_0`赋值给了`fp`, `fp`又赋值给了`impl.FuncPtr`, 也就意味着`impl.FuncPtr`中存储的就是我们要执行的`__main_block_func_0`函数的地址
- `Block`结构体中的`isa`指向了`_NSConcreteStackBlock`, 说明`Block`是一个`_NSConcreteStackBlock`类型, 具体后面会详解
- `__main_block_impl_0`函数中的第二个参数`__main_block_desc_0_DATA`


```objc
static struct __main_block_desc_0 {
  size_t reserved;
  size_t Block_size;
} __main_block_desc_0_DATA = { 0, sizeof(struct __main_block_impl_0)};
```

- 其中`reserved`赋值为0
- `Block_size`被赋值为`sizeof(struct __main_block_impl_0)`, 即为`__main_block_impl_0`这个结构体占用内存的大小
- `__main_block_impl_0`的第二个参数, 接受的即为`__main_block_desc_0`结构体的变量(`__main_block_desc_0_DATA`)的地址



## Block变量捕获

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/block_var.png)

- 局部变量分为两大类: `auto`和`static`
  - `auto`: 自动变量, 离开作用域就会自动销毁, 默认情况下定义的局部变量都是`auto`修饰的变量, 系统都会默认给添加一个`auto`
  - `auto`不能修饰全局变量, 会报错
  - `static`作用域内修饰局部变量, 可以修饰全局变量
- 全局变量

### 局部变量

#### auto变量捕获 

> `auto`局部变量在`Block`中是值传递

下述代码输出值为多少？

```objc
int age = 10;

void (^BlockTwo)(void) = ^(void){
    NSLog(@"age = %d，",age);
};

age = 13;
BlockTwo();
// 输出10
```

输出值为什么是10而不是13呢? 我们还是生成`main.cpp`代码看一下吧, 相关核心代码如下

```
struct __main_block_impl_0 {
  struct __block_impl impl;
  struct __main_block_desc_0* Desc;
  // 这里多了一个age属性
  int age;
  __main_block_impl_0(void *fp, struct __main_block_desc_0 *desc, int _age, int flags=0) : age(_age) {
    impl.isa = &_NSConcreteStackBlock;
    impl.Flags = flags;
    impl.FuncPtr = fp;
    Desc = desc;
  }
};
static void __main_block_func_0(struct __main_block_impl_0 *__cself) {
  int age = __cself->age; // bound by copy

            NSLog((NSString *)&__NSConstantStringImpl__var_folders_ty_804897ld2zg4pfcgx2p4wqh80000gn_T_main_80d62b_mi_0,age);
        }

static struct __main_block_desc_0 {
  size_t reserved;
  size_t Block_size;
} __main_block_desc_0_DATA = { 0, sizeof(struct __main_block_impl_0)};
int main(int argc, const char * argv[]) {
    /* @autoreleasepool */ { __AtAutoreleasePool __autoreleasepool;  
        // 定义属性
        int age = 10;

        // block的定义
        void (*BlockTwo)(void) = ((void (*)())&__main_block_impl_0((void *)__main_block_func_0, &__main_block_desc_0_DATA, age));
        
        // 改变属性值
        age = 13;
        // 调用block
        ((void (*)(__block_impl *))((__block_impl *)BlockTwo)->FuncPtr)((__block_impl *)BlockTwo);
    }
    return 0;
}
static struct IMAGE_INFO { unsigned version; unsigned flag; } _OBJC_IMAGE_INFO = { 0, 2 };
```

那么下面我们一步步看一下, 吧一些强制转换的代码去掉之后

```objc
int age = 10;

void (*BlockTwo)(void) = &__main_block_impl_0(
                                            __main_block_func_0,
                                            &__main_block_desc_0_DATA,
                                            age
                                            );

age = 13;
BlockTwo->FuncPtr(BlockTwo);
```

在上面的`__main_block_impl_0`函数里面相比于之前的, 多了一个`age`参数

```objc
struct __main_block_impl_0 {
  struct __block_impl impl;
  struct __main_block_desc_0* Desc;
  // 新的属性age
  int age;
  // 构造函数, 多了_age参数
  __main_block_impl_0(void *fp, struct __main_block_desc_0 *desc, int _age, int flags=0) : age(_age) {
    impl.isa = &_NSConcreteStackBlock;
    impl.Flags = flags;
    impl.FuncPtr = fp;
    Desc = desc;
  }
};
```

- 上面的构造方法`__main_block_impl_0`中, 多了一个`_age`参数
- 同时后面多了一条`age(_age)`语句, 在`c++`中, `age(_age)`相当于`age = _age`, 即给`age`属性赋值, 存储构造函数传过来的`age`属性的值
- 所以在后面调用`block`的时候, `block`对应的结构体所存储的`age`属性的值仍然是10, 并没有被更新

```objc
// 及时这里重新对age进行了赋值
age = 13;

// 这里调用BlockTwo的时候, 结构体重的age属性的值并没有被更新
BlockTwo->FuncPtr(BlockTwo);

// 最后在执行block内部逻辑的时候, 
static void __main_block_func_0(struct __main_block_impl_0 *__cself) {
    int age = __cself->age; // bound by copy
    // 这里的age, 仍然是block结构体中的age, 值并没有改变, 所以输出结果还是10
    NSLog((NSString *)&__NSConstantStringImpl__var_folders_ty_804897ld2zg4pfcgx2p4wqh80000gn_T_main_80d62b_mi_0,age);
}
```


#### static变量捕获

> `static`局部变量在`Block`中是指针传递, 看一下下面代码的输出情况


```objc
auto int age = 10;
static int weight = 20;

void (^BlockTwo)(void) = ^(void){
    NSLog(@"age = %d, weight = %d，",age, weight);
};

age = 13;
weight = 23;
BlockTwo();
```

- 上面代码输出结果: `age = 10, weight = 23`
- 重新赋值后`age`的结果不变, 之前已经说过了
- 可是`weight`的结果却是赋值后的结果, 至于为什么, 请继续向下看吧...
- 我们还是生成`main.cpp`代码看一下吧, 相关核心代码如下

```objc
struct __main_block_impl_0 {
  struct __block_impl impl;
  struct __main_block_desc_0* Desc;
  int age;
  int *weight;
  __main_block_impl_0(void *fp, struct __main_block_desc_0 *desc, int _age, int *_weight, int flags=0) : age(_age), weight(_weight) {
    impl.isa = &_NSConcreteStackBlock;
    impl.Flags = flags;
    impl.FuncPtr = fp;
    Desc = desc;
  }
};
static void __main_block_func_0(struct __main_block_impl_0 *__cself) {
  int age = __cself->age; // bound by copy
  int *weight = __cself->weight; // bound by copy

            NSLog((NSString *)&__NSConstantStringImpl__var_folders_ty_804897ld2zg4pfcgx2p4wqh80000gn_T_main_282a93_mi_0,age, (*weight));
        }

static struct __main_block_desc_0 {
  size_t reserved;
  size_t Block_size;
} __main_block_desc_0_DATA = { 0, sizeof(struct __main_block_impl_0)};
int main(int argc, const char * argv[]) {
    /* @autoreleasepool */ { __AtAutoreleasePool __autoreleasepool; 
        auto int age = 10;
        static int weight = 20;

        void (*BlockTwo)(void) = ((void (*)())&__main_block_impl_0((void *)__main_block_func_0, &__main_block_desc_0_DATA, age, &weight));

        age = 13;
        weight = 23;
        ((void (*)(__block_impl *))((__block_impl *)BlockTwo)->FuncPtr)((__block_impl *)BlockTwo);
    }
    return 0;
}
static struct IMAGE_INFO { unsigned version; unsigned flag; } _OBJC_IMAGE_INFO = { 0, 2 };
```

- 从上面代码可以看到`__main_block_impl_0`类中多了两个成员变量`age`和`weight`, 说明两个变量我们都可以捕获到
- 不同的是, 同样都是`int`变量, 使用不同的修饰词修饰, `__main_block_impl_0`类中也是不同的
- `static`修饰的变量`weight`在`block`中存储的是`weight`的地址, 在后面的`block`函数中我们使用的也是其地址


```objc
int age;
int *weight;

// &weight
void (*BlockTwo)(void) = &__main_block_impl_0(__main_block_func_0, &__main_block_desc_0_DATA, age, &weight);

// 下面构造方法中, 同样(weight(_weight)方法之前讲过)将传过来的weight的地址赋值给了 (int *weight;)
 __main_block_impl_0(void *fp, struct __main_block_desc_0 *desc, int _age, int *_weight, int flags=0) : age(_age), weight(_weight) {
    impl.isa = &_NSConcreteStackBlock;
    impl.Flags = flags;
    impl.FuncPtr = fp;
    Desc = desc;
}
```

- 也就是说上面的构造函数中
    - `age`保存的是一个准确的值
    - `weight`保存的是`weight`所在的内存地址
- 所以在最后调用`block`内部逻辑的时候


```objc
static void __main_block_func_0(struct __main_block_impl_0 *__cself) {
    int age = __cself->age; // bound by copy
    int *weight = __cself->weight; // bound by copy

    // (*weight)相当于从weight的内存地址中取值, 在执行操作
    // 然而weight内存中的值已经在后面赋值的时候被更新了, 所以这里取出的值是赋值后的
    NSLog((NSString *)&__NSConstantStringImpl__var_folders_ty_804897ld2zg4pfcgx2p4wqh80000gn_T_main_282a93_mi_0,age, (*weight));
}
```

- 也就是说, 同样是局部变量
- `auto`修饰的变量在`block`中存储的是变量的值(值传递)
- `static`修饰的变量在`block`中存储的是变量的内存地址(地址传递)


### 全局变量


```objc
int age = 10;
static int weight = 20;

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        void (^BlockTwo)(void) = ^(void){
            NSLog(@"age = %d, weight = %d，",age, weight);
        };
        
        age = 13;
        weight = 23;
        BlockTwo();
    }
    return 0;
}
```

上面代码的输出结果, 毫无疑问是13和23, 相关`c++`代码如下


```objc
int age = 10;
static int weight = 20;


struct __main_block_impl_0 {
  struct __block_impl impl;
  struct __main_block_desc_0* Desc;
  __main_block_impl_0(void *fp, struct __main_block_desc_0 *desc, int flags=0) {
    impl.isa = &_NSConcreteStackBlock;
    impl.Flags = flags;
    impl.FuncPtr = fp;
    Desc = desc;
  }
};
static void __main_block_func_0(struct __main_block_impl_0 *__cself) {

            // 封装了block执行逻辑的函数
            NSLog((NSString *)&__NSConstantStringImpl__var_folders_ty_804897ld2zg4pfcgx2p4wqh80000gn_T_main_0ee0bb_mi_0,age, weight);
        }

static struct __main_block_desc_0 {
  size_t reserved;
  size_t Block_size;
} __main_block_desc_0_DATA = { 0, sizeof(struct __main_block_impl_0)};
int main(int argc, const char * argv[]) {
    /* @autoreleasepool */ { __AtAutoreleasePool __autoreleasepool; 

        // 定义block变量
        void (*BlockTwo)(void) = ((void (*)())&__main_block_impl_0((void *)__main_block_func_0, &__main_block_desc_0_DATA));

        age = 13;
        weight = 23;
        ((void (*)(__block_impl *))((__block_impl *)BlockTwo)->FuncPtr)((__block_impl *)BlockTwo);
    }
    return 0;
}
static struct IMAGE_INFO { unsigned version; unsigned flag; } _OBJC_IMAGE_INFO = { 0, 2 };
```

- 从上面代码可以看出`__main_block_impl_0`结构体重并没有捕获到`age`和`weight`的成员变量
- 同样在定义`block`变量的时候中也不需要传入`age`和`weight`的变量
- 在封装了`block`执行逻辑的函数中, 就可以直接使用全局的变量即可


## Block的类型

### Block的三种类型


- 在之前的`C++`源码中, `__main_block_impl_0`结构体中`isa`指向的类型是`_NSConcreteStackBlock`
- 下面就具体看一下, `Block`的只要类型有那些
- 先看一下下面这部分代码的输出结果


```
void (^block)(void) = ^(void){
    NSLog(@"Hello World");
};

NSLog(@"%@", [block class]);
NSLog(@"%@", [[block class] superclass]);
NSLog(@"%@", [[[block class] superclass] superclass]);
NSLog(@"%@", [[[[block class] superclass] superclass] superclass]);

/*
 2019-06-24 15:46:32.506386+0800 Block[3307:499032] __NSGlobalBlock__
 2019-06-24 15:46:32.506578+0800 Block[3307:499032] __NSGlobalBlock
 2019-06-24 15:46:32.506593+0800 Block[3307:499032] NSBlock
 2019-06-24 15:46:32.506605+0800 Block[3307:499032] NSObject
 */
```

- `block`的类型`NSBlock`最终也是继承自`NSObject`
- 这也可以解释为什么`block`的结构体`__main_block_impl_0`中会有一个`isa`指针了
- 此外, `block`共有三种类型, 可以通过调用`class`方法或者`isa`指针查看具体类型, 最终都是继承自`NSBlock`类型
    - `__NSGlobalBlock__`或者`_NSConcreteGlobalBlock`
    - `__NSStackBlock__`或者`_NSConcreteStackBlock`
    - `__NSMallocBlock__`或者`_NSConcreteMallocBlock`


### block在内存中的分配

- `_NSConcreteGlobalBlock`: 在数据区域
- `_NSConcreteStackBlock`: 在栈区域
- `_NSConcreteMallocBlock`: 在堆区域


![内存分配图](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/application.png)

- 应用程序的内存分配图如上图所示, 自上而下依次为内存的低地址-->内存的高地址
- 程序区域:  代码段, 用于存放代码
- 数据区域: 数据段, 用于存放全局变量
- 堆: 动态分配内存，需要程序员自己申请，程序员自己管理, 通常是`alloc`或者`malloc`方式申请的内存
- 栈: 用于存放局部变量, 系统会自动分配内存, 自动销毁内存


### 区分不同的block类型

- 上面提到, 一共有三种`block`类型, 且不同的`block`类型存放在内存的不同位置
- 但是如何区分所定义的`block`
到底是哪一种类型呢
看看下面代码的执行情况, 运行环境实在`MRC`环境下

```objc
static int age = 10;
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        
        int weight = 21;
        void (^block1)(void) = ^(void){
            NSLog(@"Hello World");
        };
        void (^block2)(void) = ^(void){
            NSLog(@"age  =  %d", age);
        };
        void (^block3)(void) = ^(void){
            NSLog(@"age  =  %d", weight);
        };
        
        NSLog(@"block1 = %@", [block1 class]);
        NSLog(@"block2 = %@", [block2 class]);
        NSLog(@"block3 = %@", [block3 class]);
        
        /*
         2019-06-24 21:13:14.555206+0800 Block[30548:1189724] block1 = __NSGlobalBlock__
         2019-06-24 21:13:14.555444+0800 Block[30548:1189724] block2 = __NSGlobalBlock__
         2019-06-24 21:13:14.555465+0800 Block[30548:1189724] block3 = __NSStackBlock__
         */
    }
    return 0;
}
```


针对各种不同的`block`总结如下


`block`类型 | 环境
---|---
`__NSGlobalBlock__` | 没有访问auto变量
`__NSStackBlock__` | 访问了auto变量
`__NSMallocBlock__` | `__NSStackBlock__`调用了copy


- 由于`__NSMallocBlock__`是放在堆区域
- 要想创建出`__NSMallocBlock__`类型的`block`, 我们可以调用`copy`方法

```objc
void (^block3)(void) = ^(void){
    NSLog(@"age  =  %d", weight);
};

NSLog(@"block3 = %@", [block3 class]);
NSLog(@"block3 = %@", [[block3 copy] class]);
/* 输出分别是: 
block3 = __NSStackBlock__
block3 = __NSMallocBlock__
*/
```

- 从上面的代码中我们可以明显看到, `__NSStackBlock__`类型的`block`调用`copy`方法后, 就会变成`__NSMallocBlock__`类型的`block`
- 相当于生成的`block`是在堆区域的
- 那么另外两种类型调用`copy`方法后,又会如何? 下面一起来看一下吧

```objc
int weight = 21;
void (^block1)(void) = ^(void){
    NSLog(@"Hello World");
};
void (^block3)(void) = ^(void){
    NSLog(@"age  =  %d", weight);
};

NSLog(@"block1 = %@", [block1 class]);
NSLog(@"block1 = %@", [[block1 copy] class]);
NSLog(@"block3 = %@", [block3 class]);
NSLog(@"block3 = %@", [[block3 copy] class]);
NSLog(@"block3 = %@", [[[block3 copy] copy] class]);
/*
 __NSGlobalBlock__
 __NSGlobalBlock__
 __NSStackBlock__
 __NSMallocBlock__
 __NSMallocBlock__
 */
 ```

- 从上面的代码可以看到, 只有`__NSStackBlock__`类型的`block`调用`copy`之后才会变成`__NSMallocBlock__`类型, 其他的都是原类型
- 主要也是`__NSStackBlock__`类型的作用域是在栈中, 作用域中的局部变量会在函数结束时自动销毁
- `__NSStackBlock__`调用`copy`操作后，分配的内存地址相当于从栈复制到堆；副本存储位置是堆
- 其他的则可参考下面表格


Block类 | 副本源的配置存储域 | 复制效果
---|---|---
`__NSStackBlock__` | 栈 | 从栈复制到堆
`__NSGlobalBlock__` | 程序的数据区域 | 什么也不做
`__NSMallocBlock__` | 堆 | 引用计数增加


- 在`ARC`环境下, 编译器会根据情况自动将站上的`block`复制到堆上, 类似以下情况
    - `block`作为函数返回值时
    - 将`block`赋值给`__strong`修饰的指针时
    - `block`作为`GCD`的方法参数时


## __block修饰符

**Question: 定义一个auto修饰的局部变量, 并在`block`中修改该变量的值, 能否修改成功呢?**

```objc
auto int width = 10;
static int height = 20;
void (^block)(void) = ^(void){
    // 事实证明, 在Xcode中这行代码是报错的
    width = 22;
    // 但是static修饰的变量, 却是可以赋值, 不会报错
    height = 22;
    NSLog(@"width = %d, height = %d", width, height);
};

block();

// width = 10, height = 22
```

- 在之前提到, 在`block`中, `auto`修饰的变量是值传递
-  `static`修饰的变量是指针传递, 所以在上述代码中, `block`存储的只是`height`的内存地址
- 同样`auto`变量实在`main`函数中定义的, 而`block`的执行逻辑是在`__main_block_func_0`结构体的方法中执行的, 相当于局部变量不能跨函数访问
- 至于`static`修饰的变量为什么可以修改?
  - 在`__main_block_impl_0`结构体中`height`存储的是其内存地址, 在其他函数或者结构体中访问和改变`height`的方式都是通过其真真访问的
  - 类似赋值方式: `(*height) = 22;`
  - 取值方式: `(*height)`


### __block修饰auto变量

```objc
__block auto int width = 10;

void (^block)(void) = ^(void) {
    // 很明显, 这里就可以修改了
    width = 12;
    NSLog(@"width = %d", width);
};

block();
// width = 12
```

**为什么上面的代码就可以修改变量了呢, 这是为什么呢.....请看源码**

下面是生成的`block`的结构体

```objc
struct __main_block_impl_0 {
  struct __block_impl impl;
  struct __main_block_desc_0* Desc;
  
  // 这里的width被包装成了一个__Block_byref_width_0对象
  __Block_byref_width_0 *width; // by ref
  // 这里可以对比一下之前的未被__block修饰的int变量
  // int width;
  
  __main_block_impl_0(void *fp, struct __main_block_desc_0 *desc, __Block_byref_width_0 *_width, int flags=0) : width(_width->__forwarding) {
    impl.isa = &_NSConcreteStackBlock;
    impl.Flags = flags;
    impl.FuncPtr = fp;
    Desc = desc;
  }
};
```

- 上述代码看到`__block`可以用于解决`block`内部无法修改`auto`修饰的变量值得问题
- 但是`__block`不能修饰全局变量和`static`修饰的静态变量(同样也不需要, 因为在`block`内部可以直接修改)
- 经过`__block`修饰的变量会被包装成一个对象(`__Block_byref_width_0`)
- 下面是`width`被包装后的对象的结构体, 在结构体内, 会有一个`width`成员变量

```objc
struct __Block_byref_width_0 {
  void *__isa;
  // 一个指向自己本身的成员变量
  __Block_byref_width_0 *__forwarding;
  int __flags;
  int __size;
  // 外部定义的auto变量
  int width;
};
```

下面我们先看一下, `auto`和`block`的定义和调用

```objc
int main(int argc, const char * argv[]) {
    /* @autoreleasepool */ { __AtAutoreleasePool __autoreleasepool; 
        // __block auto int width = 10;
        auto __Block_byref_width_0 width = {
            0,
            &width,
            0,
            sizeof(__Block_byref_width_0),
            10
        };

        void (*block)(void) = &__main_block_impl_0(
            __main_block_func_0,
            &__main_block_desc_0_DATA,
            &width,
            570425344
        );

        block->FuncPtr(block);
    }
    return 0;
}
```

- 可以看到在定义的`__Block_byref_width_0`类型的`width`中的每一个参数分别赋值给了`__Block_byref_width_0`结构体中的每一个成员变量
- 而在`block`内部重新对`width`重新赋值的逻辑中

```objc
static void __main_block_func_0(struct __main_block_impl_0 *__cself) {
    __Block_byref_width_0 *width = __cself->width; // bound by ref

    (width->__forwarding->width) = 12;
    NSLog((NSString *)&__NSConstantStringImpl__var_folders_ty_804897ld2zg4pfcgx2p4wqh80000gn_T_main_9241d5_mi_0, (width->__forwarding->width));
}
```

- 上面代码中的`width`是一个`__Block_byref_width_0`类型的变量
- `width`对象通过找到内部的`__forwarding`成员变量
- 在`__Block_byref_width_0`结构体中`__forwarding`是一个指向自己本身的成员变量
- 所以最后再通过`__forwarding`找到`__Block_byref_width_0`的成员变量`width`, 在进行重新赋值
- 在`NSLog`中也是通过这种逻辑获取`width`的值




---





















