---
title: ReactNative之基本组件02
date: 2018-12-31 00:00
tags: [Alert, Cliboard]
categories: ReactNaive
image:
---

![ReactNative](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ReactNative/ReactNative.jpeg?x-oss-process=style/titanjun)

<!-- more -->


- 原文博客: [ReactNative相关文章](https://www.titanjun.top/categories/ReactNaive/)
- 之前的文章只是记录了一些常用的组件, 现在记录一些偶尔会用到的一些组件


## Slider

`Slider`用于选择一个范围值的组件

### 相关属性


```js
// 滑块的初始值。这个值应该在最小值和最大值之间，默认值是0
value={4}
// 滑块的最小值（当滑块滑到最左侧时表示的值），默认为0
minimumValue={1}
// 滑块的最大值（当滑块滑到最右端时表示的值），默认为1
maximumValue={10}
// 滑块的最小步长，这个值应该在0到(最大值-最小值)之间，默认值为0
step={2}

// 滑块左侧轨道的颜色。在iOS上默认为一个蓝色的渐变色
// ios：滑块右侧区域的颜色。android：滑块左侧区域的颜色 
minimumTrackTintColor={'red'}
// ios：滑块左侧区域的颜色。android：滑块右侧区域的颜色
minimumTrackTintColor={'yellow'}
```

#### 仅IOS支持：

```js
// 给滑块设置一张图片，只支持静态图片
thumbImage={require('./image/slider.png')}
// 给轨道设置一张背景图。只支持静态图片。图片最中央的像素会被平铺直至填满轨道
trackImage={require('./image/slider1.png')}
// 指定一个滑块左侧轨道背景图，仅支持静态图片。图片最右边的像素会被平铺直至填满轨道
minimumTrackImage={require('./image/left.png')}
// 指定一个滑块右侧轨道背景图，仅支持静态图片。图片最左边的像素会被平铺直至填满轨道
maximumTrackImage={require('./image/right.png')}
```

#### 仅android支持

```js
// 滑块颜色
thumbTintColor={'orange'}
```

### 相关函数

```js
// 用户松开滑块的时候调用此回调，无论值是否变化。回调值为当前值
onSlidingComplete={() => {}}

在用户拖动滑块的过程中不断调用此回调
onValueChange={() => {}}
```

## StatusBar

- 控制应用状态栏的组件
- 由于StatusBar可以在任意视图中加载，且后加载的设置会覆盖先前的设置。因此在配合导航器使用时，请务必考虑清楚StatusBar的放置顺序
- 有些场景并不适合使用组件，因此StatusBar也暴露了一个静态API。然而不推荐大家同时通过静态API和组件来定义相同的属性，因为静态API定义的属性值在后续的渲染中会被组件中定义的值所覆盖

### 相关属性介绍

#### 通用属性

```js
// 指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
animated bool

// 是否隐藏状态栏
hidden bool
```

#### 仅支持iOS

```js
// 设置状态栏文本的颜色, 可选值: enum('default', 'light-content', 'dark-content')
barStyle={'light-content'}

// 设定网络活动指示器(就是那个菊花)是否显示在状态栏
networkActivityIndicatorVisible={true}

// 通过 hidden 属性来显示或隐藏状态栏时所使用的动画效果，有两种选择：fade（默认值）、slide
showHideTransition={'fade'}
```

#### 仅支持Android

```js
// Android 设备上状态栏的背景颜色
backgroundColor={'blue'}
```

##### translucent

- 设置状态栏是否为透明。
- 当状态栏的值为`true`的时候，应用将会在状态栏下面进行绘制显示。
- 这样在`Android平台上面就是沉浸式的效果，可以达到 Android 和 iOS 应用显示效果的一致性。
- 该值常常同配置半透明效果的状态栏颜色一起使用。

```js
translucent={true}
```



##### currentHeight

- `React Native`在`Android`平台为`StatusBar`组件提供了一个静态常量`currentHeight`，我们可以通过读取这个常量来得到`Android`手机状态栏的高度。
- 注意：`currentHeight`不是一个属性，我们直接访问`StatusBar.currentHeight`就可以了



## Alert

- 启动一个提示对话框，包含对应的标题和信息。
- 默认情况下，对话框会仅有一个'确定'按钮
- 在 iOS 上你可以指定任意数量的按钮。每个按钮还都可以指定自己的样式，此外还可以指定提示的类别
- 在 Android 上
  - 最多能指定三个按钮，这三个按钮分别具有“中间态”、“消极态”和“积极态”的概念：
  - 如果你只指定一个按钮，则它具有“积极态”的属性（比如“确定”）；两个按钮，则分别是“消极态”和“积极态”（比如“取消”和“确定”）；三个按钮则意味着“中间态”、“消极态”和“积极态”（比如“稍候再说”，“取消”，“确定”）
  - 默认情况下点击提示框的外面会自动取消提示框
    - 可以提供一个额外参数来处理这一事件：`{ onDismiss: () => {} }`
    - 也可以用一个参数来阻止提示框被自动取消，即`{ cancelable: false }`
    

### alert()

```js
// 显示弹窗的方法
static alert(title, message?, buttons?, options?, type?)


// 显示弹窗
_shwoAlert() {
    Alert.alert(
        '标题',
        '弹窗提示信息',
        [
            {text: '稍后再说', onPress: () => console.log('稍后再说'), style: 'default'},
            {text: '取消', onPress: () => console.log('取消'), style: 'cancel'},
            {text: '确定', onPress: () => console.log('确定'), style: 'destructive'}
        ],
        { cancelable: false }
    )
}
```

### 按钮样式

`value` | 说明
--|--
`default` |	默认
`cancel` |	取消样式
`destructive` |  红色确定样式


## BackHandler

- `Android`：监听后退按钮事件。如果没有添加任何监听函数，或者所有的监听函数都返回`false`，则会执行默认行为，退出应用
- `tvOS`(即`Apple TV`机顶盒)：监听遥控器上的后退按钮事件（阻止应用退出的功能尚未实现）
- `iOS`：尚无作用
- 注意: 监听函数是按倒序的顺序执行（即后添加的函数先执行）。如果某一个函数返回 true，则后续的函数都不会被调用



```js
componentDidMount() {
    // 添加监听
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
  // 移除监听
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.goBack(); 
    return true;
  }
  
  // 退出当前应用
  static exitApp()
```


## Clipboard

`Clipboard`组件可以在`iOS`和`Android`的剪贴板中读写内容


```js
static getString()
// 获取剪贴板的文本内容。返回一个Promise，然后你可以用下面的方式来读取剪贴板内容。

async _getContent() {
  var content = await Clipboard.getString();
}


static setString(content)
// 设置剪贴板的文本内容，然后你可以用下面的方式来设置剪贴板内容。

_setContent() {
  Clipboard.setString('hello world');
}
```

## InteractionManager

- `InteractionManager`可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行。这样可以保证`JavaScript`动画的流畅运行。比如`Navigator`的转场动画
- 对大多数`React Native`应用来说，业务逻辑是运行在`JavaScript`线程上的。这是`React`应用所在的线程，也是发生`API`调用，以及处理触摸事件等操作的线程
- 如果你正在`JavaScript`线程处理一个跨越多个帧的工作，你可能会注意到`TouchableOpacity`的响应被延迟了。这是因为`JavaScript`线程太忙了，不能够处理主线程发送过来的原始触摸事件


### 属性方法

```
// 静态方法,在用户交互和动画结束以后执行任务, 返回一个可取消的 promise
runAfterInteractions(task)  

// 静态方法，创建一个句柄(处理器)，通知管理器，某个动画或者交互开始了
createInteractionHandle() 

// 静态方法，进行清除句柄，通知管理器，某个动画或者交互结束了。
clearInteractionHandle(handler:Handle)  

// 设置延迟时间，该会调用setTimeout方法挂起并且阻塞所有没有完成的任务，然后在eventLoopRunningTime到设定的延迟时间后，然后执行setImmediate方法进行批量执行任务
setDeadline(deadline:number) 

// 事件
Events:CallExpression
// 监听
addListener:CallExpression
```

这里最常使用的就是`runAfterInteractions`方法


```js
InteractionManager.runAfterInteractions(() => {
    navigator.push({
        component: MainPager,
        name: 'MainPager'
    })
})

// 或者设置state
componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
}
```

## Keyboard

- `Keyboard`模块用来控制键盘相关的事件
- 可以监听原生键盘事件以做出相应回应

### 相关方法

```js
//用来加载一个指定事件的事件监听器
static addListener(eventName, callback)

//移除某个类型事件的监听函数
static removeListener(eventName, callback)

//移除某个类型事件的所有监听函数
static removeAllListeners(eventName)

//把弹出的键盘收回去，同时使当前的文本框失去焦点
static dismiss()
```

### eventName

上述函数中的`eventName`可以是如下值
- `keyboardWillShow`：软键盘将要显示
- `keyboardDidShow`：软键盘显示完毕
- `keyboardWillHide`：软键盘将要收起
- `keyboardDidHide`：软键盘收起完毕
- `keyboardWillChangeFrame`：软件盘的`frame`将要改变
- `keyboardDidChangeFrame`：软件盘的`frame`改变完毕


### event 参数值

所有的键盘事件处理函数都能收到一个`event`参数，不过在不同平台下`event`参数可以取到的值不太一样

#### Android平台

- `event.endCoordinates.screenX`
- `event.endCoordinates.screenY`
- `event.endCoordinates.width`
- `event.endCoordinates.height`

#### iOS平台

- `event.easing`：这个值始终是`keyboard`
- `evnet.duration`：记录软键盘弹出动画的持续事件，单位是毫秒
- `event.startCoordinates.screenX`
- `event.startCoordinates.screenY`
- `event.startCoordinates.width`
- `event.startCoordinates.height`
- `event.endCoordinates.screenX`
- `event.endCoordinates.screenY`
- `event.endCoordinates.width`
- `event.endCoordinates.height`


```
componentWillMount() {
    // 监听键盘弹出时间
    this.keyboardShow = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow)
}

componentWillUnmount() {
    this.keyboardShow.remove()
}

_keyboardDidShow = (event) => {
    console.log(event)
}
```



