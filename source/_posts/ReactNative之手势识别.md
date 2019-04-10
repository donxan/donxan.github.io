---
title: ReactNative之手势识别
date: 2019-04-10 12:21:32
tags: [PanResponder, onPress]
categories: ReactNaive
image:
---

![ReactNative](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ReactNative/ReactNative.jpeg?x-oss-process=style/titanjun)

<!-- more -->



- 移动开发中最重要的就是交互, 说到交互, 就不得不说触摸事件
- 在`iOS`中有单击, 双击, 长按, 拖拽等触摸操作
- 在`React Native`中点击手势都有其对应的组件, 每个组件都可以用来包裹视图来响应用户的点击事件


## TouchableWithoutFeedback

- 响应用户的点击事件, 点击操作时, 组件没有任何视觉反馈,看起来像`Web`效果而不是原生的效果`Native`
- 是单节点组件, 只能包含一个组件, 如果你希望包含多个子组件，用一个View来包装它们
- 该控件除非你不得不使用，否则请不要使用该组件


### 属性方法

- `accessibilityComponentType`:   `View.AccessibilityComponentType`   
    设置可访问的组件类型

- `accessibilityTraits`: `View.AccessibilityTraits,[View.AccessibilityTraits]` 
    设置访问特征

- `accessible`: `bool`  
    设置当前组件是否可以访问

- `delayLongPress`: `number`
    设置延迟的时间，单位为毫秒。从`onPressIn`方法开始，到`onLongPress`被调用这一段时间

- `delayPressIn`: `number`
    设置延迟的时间，单位为毫秒，从用户触摸控件开始到`onPressIn`被调用这一段时间

- `delayPressOut`: `number`         
    设置延迟的时间，单位为毫秒，从用户触摸事件释放开始到`onPressOut`被调用这一段时间

- `onLayout`: `function`  
    当组件加载或者改组件的布局发生变化的时候调用, 调用传入的参数为`{nativeEvent:{layout:{x,y,width,height}}}`

- `onLongPress`: `function`        
    当用户长时间按压组件(长按效果)的时候调用该方法

- `onPress`: `function`
    当用户点击的时候调用(触摸结束)。 但是如果事件被取消了就不会调用。(例如:当前被滑动事件所替代)

- `onPressIn`: `function`  
    用户开始触摸组件回调方法

- `onPressOut`: `function`
    用户完成触摸组件之后回调方法

- `pressRetentionOffset`: `{top:number,left:number,bottom:number,right:number}`
    该设置当视图滚动禁用的情况下，可以定义当手指距离组件的距离; 当大于该距离该组件会失去响应;当少于该距离的时候，该组件会重新进行响应

> 该组件我们一般不会直接进行使用，下面三种`Touchable*`系列组件对于该组件的属性方法都可以进行使用


## TouchableOpacity

该组件封装了响应触摸事件。当点击按下的时候，该组件的透明度会降低。该组件使用过程中并不会改变视图的层级关系，而且我们可以非常容易的添加到应用并且不会产生额外的异常错误

### 属性方法

- `TouchableWithoutFeedback`的所有 属性，这边`TouchableOpacity`组件全部可以进行使用
- `activeOpacity`:  `number`---设置当用户触摸的时候，组件的透明度(取值0-1)


## TouchableHighlight

当手指点击按下的时候，该视图的不透明度会进行降低同时会看到相应的颜色(视图变暗或者变亮)。如果我们去查看该组件的源代码会发现，该底层实现是添加了一个新的视图


### 属性方法

- 所有`TouchableWithoutFeedback`的属性
- `activeOpacity`: `number`---该用来设置视图在进行触摸的时候，要要显示的不透明度(通常在0-1之间)
- `onHideUnderlay`: `function`---当底层被隐藏的时候调用
- `onShowUnderlay`: `function`---当底层显示的时候调用
- `underlayColor`: 当触摸或者点击控件的时候显示出的颜色


## TouchableNativeFeedback

- 仅限`Android`平台
- 在`Android`设备上，这个组件利用原生状态来渲染触摸的反馈
- 目前它只支持一个单独的`View`实例作为子节点


### 属性方法

- 所有`TouchableWithoutFeedback`的属性
- `background`: 决定在触摸反馈的时候显示什么类型的背景


## PanResponder

### 相关介绍

`PanResponder`类可以将多点触摸操作协调成一个手势。它使得一个单点触摸可以接受更多的触摸操作，也可以用于识别简单的多点触摸手势

> 手势处理

`React Native`框架底层的手势响应系统提供了响应处理器，`PanResponder`将这些手势响应处理器再次进行封装，以便开发者更容易对手势进行处理，更容易预测用户的手势，对每一个手势响应处理器，`PanResponder`除了为其提供代表触摸行为的原生事件外，还提供了一个新的手势状态对象用来详细描述手势的状态

> 基本思想是：

监视屏幕上指定大小、位置的矩形区域，当用手指按压这个区域中的某点后，开发者会收到这个事件，当按压后拖动手指时，会收到手势引发的各类事件，当手指离开这个矩形区域时，开发者也会收到相应的事件

> 注意事项：

- 开发者可以任意指定监视矩形区域的大小，但在这个区域里，只有第一个按下的事件会上报和继续监视处理，如果第一个手指按下还没有离开，接着第二个手指又来按下了，那么对第二个手指的各种触摸事件无法捕获
- 开发者可以在屏幕上指定多个监视矩形区域，但是不能同时监视多个矩形区域的不同触摸事件
- 监视区域会阻止被监视区域覆盖的组件接收触摸事件，比如监视区域覆盖了一个按钮，那么就无法通过按这个按钮来触发其对应的事件，只能在`PanResponder`监视器的事件处理中对触摸行为进行处理


### 使用操作

利用`PanResponder`实现监视器有以下几个步骤：

#### 指定监视区域

如果监视区域有多个，一定不能重叠，否则都失效

#### 定义监视器相关变量

指向监视器的变量（必须有）、指向监视器监视区域的变量（可以有）、记录监视区域左上角顶点坐标的两个数值变量（可以有）、上一次触摸点的横纵坐标变量（可以有）

#### 事件处理

准备监视器的事件处理函数

#### 建立监视器

`PanResponder.create(config)`

相关事件监听

```js
// 返回值为布尔值, 如果返回值为 true，则表示这个 View 能够响应滑动手势, 两者有一个为true即可响应
onMoveShouldSetPanResponder: (e, gestureState) => {...}
onMoveShouldSetPanResponderCapture: (e, gestureState) => {...}

// 返回值为布尔值, 如果返回值为 true，则表示这个 View 能够响应触摸手势, 两者有一个为true即可响应
onStartShouldSetPanResponder: (e, gestureState) => {...}
onStartShouldSetPanResponderCapture: (e, gestureState) => {...}

// 当前有其他的东西成为响应器并且没有释放它。如果视图正在响应，会触发该方法
onPanResponderReject: (e, gestureState) => {...}
// 最近一次的移动距离.如:(获取x轴方向的移动距离 gestureState.dx)
onPanResponderGrant: (e, gestureState) => {...}
// 开始按下时的响应事件
onPanResponderStart: (e, gestureState) => {...}
// 结束按下时的响应事件
onPanResponderEnd: (e, gestureState) => {...}
// 用户手指离开屏幕时，调用该方法
onPanResponderRelease: (e, gestureState) => {...}
// 用户滑动手指时，调用该方法
onPanResponderMove: (e, gestureState) => {...}

// 另一个组件已经成为了新的响应者，所以当前手势将被取消
onPanResponderTerminate: (e, gestureState) => {...}
// 如果回调函数返回为 true，则表示同意释放响应者角色 同时会回调onResponderTerminate函数，通知组件事件响应处理被终止了
onPanResponderTerminationRequest: (e, gestureState) => {...}

// 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者（暂只支持android）
onShouldBlockNativeResponder: (e, gestureState) => {...}
```


#### 监视器与监视区域关联 

`{…this.watcher.panHandlers}`

实例：点击、拖动选择百分百参数 比如说播放器的音量大小

#### 参数`event`(`e`)

获取触摸的位置在被响应的 View 中的相对坐标，`evt.nativeEvent.locationX`

- `nativeEvent`
  - `changedTouches` - 在上一次事件之后，所有发生变化的触摸事件的数组集合（即上一次事件后，所有移动过的触摸点）
  - `identifier` - 触摸点的ID
  - `locationX` - 触摸点相对于父元素的横坐标
  - `locationY` - 触摸点相对于父元素的纵坐标
  - `pageX` - 触摸点相对于根元素的横坐标
  - `pageY` - 触摸点相对于根元素的纵坐标
  - `target` - 触摸点所在的元素ID
  - `timestamp` - 触摸事件的时间戳，可用于移动速度的计算
  - `touches` - 当前屏幕上的所有触摸点的集合

#### `gestureState`对象

- `stateID` -- 触摸状态的ID。在屏幕上有至少一个触摸点的情况下，这个ID会一直有效。
- `moveX` - 最近一次移动时的屏幕横坐标
- `moveY` - 最近一次移动时的屏幕纵坐标
- `x0` - 当响应器产生时的屏幕坐标
- `y0` - 当响应器产生时的屏幕坐标
- `dx` - 从触摸操作开始时的累计横向路程
- `dy` - 从触摸操作开始时的累计纵向路程
- `vx` - 当前的横向移动速度
- `vy` - 当前的纵向移动速度
- `numberActiveTouches` - 当前在屏幕上的有效触摸点的数量


### 使用示例

相关代码


```js
export default class MyApp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            backColor: 'red',
            left: 0,
            top: 100
        }
    }
    
    componentWillMount() {
        this._panResponse = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this._top = this.state.top
                this._left = this.state.left
                this.setState({ backColor: 'red' })
            },
            onPanResponderMove: (event, ges) => {
                console.log(`event = ${event}, guesture = ${ges}`)
                this.setState({
                    top: this._top + ges.dy,
                    left: this._left + ges.dx,
                    backColor: 'blue'
                })
            },
            onPanResponderRelease: (event, ges) => {
                this.setState({
                    backColor: 'orange'
                })
            }
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <View 
                    {...this._panResponse.panHandlers}
                    style={{
                        position: 'absolute',
                        backgroundColor: this.state.backColor,
                        left: this.state.left,
                        top: this.state.top,
                        width: 50, 
                        height: 50
                    }}
                />
            </View>
        );
    }
}
```


