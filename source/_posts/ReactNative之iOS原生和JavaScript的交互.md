---
title: ReactNative之iOS原生和JavaScript的交互
date: 2019-08-17 14:21:01
<!--updated: 2019-04-26 18:31:40 # 更新日期-->
tags: [ReactNative, JavaScript, iOS]
categories: ReactNaive
<!--keywords: 关键字-->
comments: true
<!--password: 文章密码-->
image:
---




![js-ios](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ReactNative/rn-js-ios.png?x-oss-process=style/titanjun)


<!--more-->


在`ReactNative`开发中, 在`JavaScript`语法无法实现的时候会涉及到一些原生开发, 既然是混合开发就会涉及到一些`iOS`和`ReactNative`之间通讯的问题, 这里就涉及到两种方式:
- `RN`调用原生的方法, 给原生发送数据
- 原生给`RN`回传数据, 或者给`RN`发送通知
- 下面就简单记录下这两种方式的实现


## JS调用原生

- 这里要讲的交互场景是`JS`调用原生方法，最后由原生方法将结果回调到JS里面
- `react-native`是在原生的基础上，将接口调用统一为`js`
- 也就是说，`react-native`调起原生的能力非常重要


### js调用模块

在原生需要创建一个继承自`NSObject`的类(模块)


```objc
#import <Foundation/Foundation.h>
// 需要导入头文件
#import <React/RCTBridgeModule.h>

// 必须遵循RCTBridgeModule协议
@interface AppEventMoudle : NSObject <RCTBridgeModule>

@end
```

在`AppEventMoudle.m`文件件中需要导出改模块, 并将创建的方法导出

```objc
#import "AppEventMoudle.h"
#import <React/RCTBridge.h>

@implementation AppEventMoudle


// 导出桥接模块, 参数传空或者当前class的类名
// 参数若为空, 默认模块名为当前class类名即AppEventMoudle
RCT_EXPORT_MODULE(AppEventMoudle);

// 带有参数
RCT_EXPORT_METHOD(OpenView:(NSDictionary *)params){
    
    // 因为是显示页面，所以让原生接口运行在主线程
    dispatch_async(dispatch_get_main_queue(), ^{
    
        // 在这里可以写需要原生处理的UI或者逻辑
        NSLog(@"params = %@", params);
    });
}

/// 带有回调
RCT_EXPORT_METHOD(OpenView:(NSDictionary *)params, callback:(RCTResponseSenderBlock)callback){
    
    // 因为是显示页面，所以让原生接口运行在主线程
    dispatch_async(dispatch_get_main_queue(), ^{
    
        // 在这里可以写需要原生处理的UI或者逻辑
        NSLog(@"params = %@", params);
        if (callback) {
            callback(@[params]);
        }
    });
}
```


<div class="note warning"><p>上面代码需要注意的是</p></div>

- 桥接到`Javascript`的方法返回值类型必须是`void`
- `React Native`的桥接操作是异步的，在`queue`里面异步执行，所以如果要返回结果给`Javascript`，就必须通过回调或者触发事件来进行
- 这里的回调对应于`iOS`端就是通过`block`来回调的


### RCTBridge


- `RCTBridge`可以说是一个封装类,封装了`RCTCxxBridge`
- 我们先看这个文件提供的一些变量和方法
 - `RCTModuleClasses`: 主要储存的是我们注册的`module`, 所有用宏`RCT_EXPORT_MODULE()`注册的`module`都会存入这个变量.
 - `RCTGetModuleClasses`: 获取`RCTModuleClasses`里面所有注册的`module`类
 - `RCTBridgeModuleNameForClass`: 从一个类获取这个类的名字
 - `RCTVerifyAllModulesExported`: 验证我们所写的所有遵守`RCTBridgeModule`协议的类是否都在我们的管理中



### RCTResponseSenderBlock


```objc
typedef void (^RCTResponseSenderBlock)(NSArray *response);
```

- `RCTResponseSenderBlock`是`RCTBridgeModule`里面提供的`block`
- 这个`block`接受一个数组参数, 代表原生方法的返回结果



### 线程问题

- js代码的执行是在js线程里面，原生模块的执行默认是在一个串行的`queue`里面异步执行的
- 对于原生模块的执行来说，默认一个串行的`queue`是不够的，我们有时候需要指定模块所有任务执行所在的`queue`


```objc
RCT_EXPORT_METHOD(OpenView:(NSDictionary *)params){
    
    // 因为是显示页面，所以让原生接口运行在主线程
    dispatch_async(dispatch_get_main_queue(), ^{
    
        // 在这里可以写需要原生处理的UI或者逻辑
        NSLog(@"params = %@", params);
    });
}
```

## 原生向RN发送监听

- 例如: 项目中的`H5`页面, 通过原生的`Webview`实现, 并且监听`url`的变化, 并通知`js`做相关操作
- 这样我们就要在`url`变化的时候, 给`JavaScript`发送监听通知
- 并且不能使用`RCTResponseSenderBlock`进行回调, `block`回调只能执行一次, 并不能不断的执行


### 第一步

- 我们需要创建一个`WebViewController`的控制器, 在该控制器内添加`UIWebView`的UI和逻辑的实现
- 在`UIWebViewDelegate`的协议方法中监听`webview`的`url`的变化, 并发送通知


```objc
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
  NSString *url= request.URL.absoluteString;
  if (url && ![url isEqualToString:@""]) {
    // 发送通知
    [[NSNotificationCenter defaultCenter] postNotificationName:@"urlChange" object:url];
  }
  [self clickAction:url];
  
  return YES;
}
```


### 第二步

需要在`js`调用的方法中接受上述代码中发送的通知, 如下

```objc
RCT_EXPORT_METHOD(OpenWebView:(NSDictionary *)params){
    dispatch_async(dispatch_get_main_queue(), ^{
        // 接受通知监听
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(urlChange:) name:@"urlChange" object:nil];
        
        WebViewController *webView = [WebViewController new];
        webView.params = params;
        UINavigationController *navi = [[UINavigationController alloc] initWithRootViewController:webView];
        
        UIViewController *rootVC = [UIApplication sharedApplication].keyWindow.rootViewController;
        [rootVC presentViewController:navi animated:YES completion:nil];
    });
}
```

### 第三步

实现监听方法, 并给`JavaScript`发送消息通知

```objc
- (void)urlChange:(NSNotification *)notification{
  [self.bridge.eventDispatcher sendAppEventWithName:@"NativeWebView"
                                               body:@{@"url":(NSString *)notification.object}];
}
```

要获取`self.bridge`属性, 需要遵循`RCTBridgeModule`协议, 并加上如下代码

```objc
@synthesize bridge = _bridge;
```

最后不要忘记移除该通知

```objc
- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self name:@"urlChange" object:nil];
}
```

### 第四步

在`JavaScript`中接受`iOS`原生发送的消息通知


```js
this.webViewListener = NativeAppEventEmitter.addListener('NativeWebView', message => {
	this.handleMessageFromNative(message)
})


// 并在对应的位置销毁即可
this.webViewListener && this.webViewListener.remove()
this.webViewListener = null
```


## 原生给js发送事件

- 上面提到的那种方式都是`js`调用`iOS`原生代码后, 用`iOS`原生在给`js`发送事件监听
- 那么如果需要`iOS`原生主动给`js`发送监听事件呢, 类似场景: 比如在`AppDelegate`中给`js`发送事件通知有改如何实现
- 之前遇到过这样一个需求: 需要监听`APP`进入后台和`APP`从后台进入前台的事件, 并在`JavaScript`中做相关操作
- 不能像之前那种, 定义一个`_bridge`, 并遵循`RCTBridgeModule`协议, 就可以使用下面代码发送监听事件了, 加断点可以发现, 下面获取的`self.bridge`为`nil`


```objc
-(void)applicationDidEnterBackground:(UIApplication *)application {
    // 这里的self.bridge为nil
  [self.bridge.eventDispatcher sendAppEventWithName:@"NativeWebView"
                                               body:@{@"url":(NSString *)notification.object}];
}
```


下面先介绍一个消息监听的实例类

### RCTEventEmitter

`RCTEventEmitter`是一个基类, 用于发出`JavaScript`需要监听的事件, 提供了一下属性和方法

```objc
@interface RCTEventEmitter : NSObject <RCTBridgeModule>

@property (nonatomic, weak) RCTBridge *bridge;

// 返回你将要发送的消息的name, 如果有未添加的, 运行时将会报错
- (NSArray<NSString *> *)supportedEvents;

// 用于发送消息事件
- (void)sendEventWithName:(NSString *)name body:(id)body;

// 在子类中重写此方法, 用于发送/移除消息通知
- (void)startObserving;
- (void)stopObserving;

// 添加监听和移除监听
- (void)addListener:(NSString *)eventName;
- (void)removeListeners:(double)count;

@end
```

具体的使用示例, 可继续向下看

### 第一步

创建一个继承自`RCTEventEmitter`的类, 并遵循协议`<RCTBridgeModule>`


```objc
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface AppEventManager : RCTEventEmitter <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
```


### 第二步

再具体的`iOS`原生代码中发送消息通知


```objc
#import "AppEventManager.h"

@implementation AppEventManager

// 导出该模块
RCT_EXPORT_MODULE();

// 返回sendEventWithName中监听的name, 如果有监听, 但是为在该方法中添加的, 运行时会报错
- (NSArray<NSString *> *)supportedEvents {
    return @[@"DidEnterBackground", @"DidBecomeActive"];
}

// 添加观察者事件, 重写该方法中, 并在该方法中接受消息通知
- (void)startObserving {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationDidEnterBackground:) name:@"DidEnterBackground" object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationDidBecomeActive:) name:@"DidBecomeActive" object:nil];
}

// 移除观察者
- (void)stopObserving {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}


- (void)applicationDidEnterBackground:(NSNotification *)notification{
    // 在此处向JavaScript发送监听事件
    [self sendEventWithName:@"DidEnterBackground" body: notification.object];
}

- (void)applicationDidBecomeActive:(NSNotification *)notification{
    // 在此处向JavaScript发送监听事件
    [self sendEventWithName:@"DidBecomeActive" body: notification.object];
}
```

<div class="note warning"><p>注意的是</p></div>

- 一旦`RCT_EXPORT_MODULE()`声明该类是`EXPORT_MODULE`, 那么该类的实例已经创建好了
- 如果你在其他地方创建这个类的实例(`alloc` 或 `new`), 会导致,`ReactNative`不能正确识别该类的实例


### 第三步

在`ReactNative`中引用该模块, 并添加对对应事件的监听即可

先导出`iOS`原生定义的模块

```js
// AppEventManager为原生中创建的类名
const appEventMan = new NativeEventEmitter(NativeModules.AppEventManager)
```

使用`appEventMan`在对应的地方添加监听即可


```js
this.didEnterBackground = appEventMan.addListener('DidEnterBackground', () => {
	console.log(`APP开始进入后台---------------`)
})

this.didBecomeActive = appEventMan.addListener('DidBecomeActive', () => {
	console.log(`APP开始从后台进入前台----------`)
})
```

但是也不要忘记在对应的地方移除该监听

```js
componentWillUnmount () {
	this.didEnterBackground && this.didEnterBackground.remove()
	this.didEnterBackground = null
	
	this.didBecomeActive && this.didBecomeActive.remove()
	this.didBecomeActive = null
}
```

<div class="note success"><p>O(∩_∩)O哈哈~</p></div>

至此, 在`ReactNative`中`JavaScript`和`iOS`原生的交互基本就结束了, O(∩_∩)O哈哈~


---



