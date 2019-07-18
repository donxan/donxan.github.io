---
title: 简析OC中对象占用内存的原理
date: 2019-06-10 20:16:20
tags: [Objective-C]
categories: iOS底层原理

---



- `OC`即`Objective-C`, 是`iOS`的开发语言之一, 其底层都是通过`C/C++`实现
- `OC`代码在编译过程中都会被转成`C/C++`代码, 之后再转成汇编语言, 最后才转成机器语言(0和1)
- 所以`OC`的面向对象都是基于`C/C++`的数据结构实现的, 具体一点就是通过机构提实现的(这个后面会详解)

<!--more-->



## `C/C++`代码转换

 - 上面说到, `OC`代码在编译过程中都会转成`C/C++`代码, 不过这个过程我们看不到, 也拿不到转化后的`C/C++`代码
 - 所以下面我们手动将`OC`代码转成`C/C++`代码
 - 使用下面的命令行
 

```objc
xcrun  -sdk  iphoneos  clang  -arch  arm64  -rewrite-objc OC源文件  -o  输出的CPP文件

// xcrun --> xcode run的简写
// iphoneos --> 指运行在iOS平台
// -arch --> 支持的设备架构: 模拟器(i386)、32bit(armv7)、64bit（arm64）, iOS的架构现在基本都是arm64

// 打开终端到文件目录下, 输入以下示例代码即可
xcrun -sdk iphoneos clang -arch arm64 -rewrite-objc main.m -o main.cpp
```

> 其中`cpp`就是指`c plus plus`, 也就是`c++`的意思

 
## OC对象的本质

在说`OC`对象的本质之前, 我们可以先点进去看一下`NSObject`对象的底层定义, 如下

```objc
@interface NSObject <NSObject> {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wobjc-interface-ivars"
    Class isa  OBJC_ISA_AVAILABILITY;
#pragma clang diagnostic pop
}
```

- 抛开定义的宏不考虑, 其实就只有一个`Class`类型的`isa`属性
- 下面从上一步中生成的`main.cpp`文件中, 看一下`NSObject`在内存中是如何声明的


```objc
struct NSObject_IMPL {
    Class isa;
};
```

> `NSObject`最后转成了`NSObject_IMPL`(结构体), 我们的`OC`对象最后其实就是转成了结构体; 也就是说,`c++`的结构体支撑了`OC`语法中的面相对象

至于`isa`是什么? 我们可以点进去看一下, 其实也就是一个指向结构体`struct objc_class`的指针, 那么他在64位的环境下占8个字节，在32环境上占4个字节

```objc
typedef struct objc_class *Class;
```


## 方法底层

- 现在我们在回到最初的问题, 一个`NSObject`对象占用多少内存?
- 上面说到一个`isa`就需要占用8个字节, 那么一个`NSObject`对象就至少需要8个字节
- 但是系统真的就为一个`NSObject`对象分配了8个字节的存储空间吗??
- 下面我们通过两个方法来计算对象所占用内存大小


```objc
// runtime方法
#import <objc/runtime.h>
        
// 获取NSObject类的示例对象的大小, (至少需要多少内存, 成员变量所占用的存储大小)
NSLog(@"%zd", class_getInstanceSize([NSObject class]));
// 输出 8


// malloc方法
#import <malloc/malloc.h>

NSObject *obj = [[NSObject alloc]init];
// 获取obj指针所指向的内存的大小, 实际上分配的内容(最少为16)
NSLog(@"%zd", malloc_size((__bridge const void *) obj));
// 输出 16
```

从上面的代码可以看出两个方法打印出来的结果是不一样的, 但是为什么不一样呢, 方法内部优势如何实现的呢??下面我们就具体来看一下

### class_getInstanceSize

- `class_getInstanceSize`是`runtime`中的方法, 用于获取`NSObject`类的示例对象的大小
- 使用时需要导入对应的头文件`#import <objc/runtime.h>`
- 至于其方法内部是如何实现的, 这里我们可以查看他的源码, OC所有开发的源码可以到这里查找: https://opensource.apple.com/tarballs
- 打开网页, 搜索并找到`objc4`的文件夹

![runtime源码](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/object4.png)

打开`objc4`所在文件夹, 找到最新版本的代码(数字越大版本越薪)下载, 下载完成，打开项目，然后找到`class_getInstanceSize`方法的的实现(`.mm`文件中)


![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/getclasssize.png)


接下来, 我们就具体看下方法内部到底是如何实现的

```objc
// 方法的实现
size_t class_getInstanceSize(Class cls)
{
    if (!cls) return 0;
    return cls->alignedInstanceSize();
}

// Class's ivar size rounded up to a pointer-size boundary.
uint32_t alignedInstanceSize() {
    return word_align(unalignedInstanceSize());
}
```

- 从上面代码中`alignedInstanceSize`方法的注释中就可明白, 该方法返回的是当前类(`NSObject`)的成员变量的大小
- 当前`NSObject`中就只有一个`isa`指针, 所以返回8个字节
- 上面方法中提到了一个`word_align`, 可以理解为内存对齐, 后面对具体详解


### malloc_size

- `malloc_size`是`malloc`中的方法, 用于获取`obj`指针所指向的内存的大小, 即系统实际分配的内存大小(最少为16)
- 使用时需要导入对应的头文件`#import <malloc/malloc.h>`
- 同样根据上面的方式下载源码, 找到`libmalloc`
- `malloc_size`方法的实现代码如下

```objc
size_t
malloc_size(const void *ptr)
{
	size_t size = 0;

	if (!ptr) {
		return size;
	}

	(void)find_registered_zone(ptr, &size);
	return size;
}
```




































