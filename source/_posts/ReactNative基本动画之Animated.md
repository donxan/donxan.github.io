---
title: ReactNative基本动画之Animated
date: 2018-03-06 19:26:34
tags: [ReactNative, Animated, LayoutAnimation]
categories: ReactNaive
image:
---



![React Native](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ReactNative/ReactNative.jpeg?x-oss-process=style/titanjun)


<!--more-->


`React Naticw`封装了两个易于使用的动画组件。用于全局的布局动画`LayoutAnimation`，和用于创建更精细的交互控制的动画`Animated`


## LayoutAnimation

- 当布局变化时，自动将视图运动到它们新的位置上
- `LayoutAnimation`动画使用简单，要实现动画效果只需要在`setState`前添加`LayoutAnimation`动画方法

### 相关方法

```js
// 计划下一次布局要发生的动画
configureNext: (config: LayoutAnimationConfig, onAnimationDidEnd?: () => void) => void 
// config: 表示动画相应的属性
// onAnimationDidEnd: 当动画结束的时候被调用。只在iOS设备上支持


// 用来创建 configureNext 所需的 config 参数的辅助函数
create: (duration: number, type?: string, creationProp?: string) => LayoutAnimationConfig
// duration: 动画持续时间, 毫秒
// type: 类型定义在LayoutAnimation.Types中
// creationProp: 动画属性，定义 LayoutAnimation.Properties
```

### LayoutAnimationConfig

`LayoutAnimationConfig`的相关参数信息

```js
// configureNext相关参数信息
export interface LayoutAnimationConfig {
    // 动画持续的时间, 毫秒
    duration: number; 
    // 配置创建新视图时的动画
    create?: LayoutAnimationAnim;  
    // 配置被更新视图时的动画
    update?: LayoutAnimationAnim;  
    // 配置创建删除视图时的动画
    delete?: LayoutAnimationAnim;  
}
```

### LayoutAnimationAnim

`LayoutAnimationAnim`相关参数格式参考

```js
export interface LayoutAnimationAnim {
    // 动画持续时间, 毫秒, 会覆盖 config 中设置的 duration
    duration?: number;  
    // 延迟时间执行, 毫秒
    delay?: number;   
    //弹跳动画阻尼系数（配合 spring 使用）
    springDamping?: number;  
    // 初始速度
    initialVelocity?: number;
    // 类型定义在LayoutAnimation.Types中
    type?: string; //LayoutAnimationTypes
    // 类型定义在LayoutAnimation.Properties中
    property?: string; //LayoutAnimationProperties
}
```

### 常用枚举值

`LayoutAnimationTypes`和`LayoutAnimationProperties`的取值如下

```js
export interface LayoutAnimationTypes {
    spring: string;
    linear: string;
    easeInEaseOut: string;
    easeIn: string;
    easeOut: string;
    keyboard: string;
}

export interface LayoutAnimationProperties {
    opacity: string; //透明度
    scaleXY: string; //尺寸变化
}
```

代码示例

```js
export default class SpingAnimated extends Component {
    constructor(props) {
        super(props)

        this.state = {
            width: 50,
            height: 50,
        }
    }

    _startAnimated() {
        LayoutAnimation.configureNext({
            duration: 500,
            create: {type: 'linear', property: 'opacity'},
            update: {type: 'linear', property: '0.8'}
        })

        this.setState({
            width: this.state.width + 20,
            height: this.state.height + 20,
        })
    }

    render(){
        return (
            <View style={{ width: 414, height: 800, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                 <View style={{width: this.state.width, height: this.state.height, backgroundColor: 'red'}}/>

                <TouchableOpacity style={{position:'absolute', bottom: 50}} onPress={this._startAnimated.bind(this)}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
 }
```







## Animated

- `Animated`库用于创建更精细的交互控制的动画，它使得开发者可以非常容易地实现各种各样的动画和交互方式，并且具备极高的性能
- `Animated`提供了两种类型的值：

  - `Animated.Value()`用于单个值
  - `Animated.ValueXY()`用于矢量值
  - `Animated.Value`可以绑定到样式或是其他属性上，也可以进行插值运算, 单个`Animated.Value`可以用在任意多个属性上


### 配置动画

`Animated`提供了三种动画类型。每种动画类型都提供了特定的函数曲线，用于控制动画值从初始值变化到最终值的变化过程:

- `Animated.timing()`：最常用的动画类型，使一个值按照一个过渡曲线而随时间变化。
- `Animated.spring()`：弹簧效果，基础的单次弹跳物理模型实现的 spring 动画。
- `Animated.decay()`：衰变效果，以一个初始的速度和一个衰减系数逐渐减慢变为0


### 组合动画
`Animated`实现组合动画的主要方式：

- `Animated.parallel`：同时开始一个动画数组里的全部动画。默认情况下，如果有任何一个动画停止了，其余的也会被停止。可以通过`stopTogether`选项设置为`false`来取消这种关联。
- `Animated.sequence`：按顺序执行一个动画数组里的动画，等待一个完成后再执行下一个。如果当前的动画被中止，后面的动画则不会继续执行
- `Animated.stagger`：一个动画数组，传入一个时间参数来设置队列动画间的延迟，即在前一个动画开始之后，隔一段指定时间才开始执行下一个动画里面的动画，并不关心前一个动画是否已经完成，所以有可能会出现同时执行（重叠）的情况


### 自定义动画组件

组件必须经过特殊处理才能用于动画。所谓的特殊处理主要是指把动画值绑定到属性上，并且在一帧帧执行动画时避免反应重新渲染和重新调和的开销。此外还得在组件卸载时做一些清理工作，使得这些组件在使用时是安全的

> `createAnimatedComponent()`方法正是用来处理组件，使其可以用于动画

`Animated`中默认导出了以下这些可以直接使用的动画组件，当然它们都是通过使用上面这个方法进行了封装：

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`


### 合成动画值

你可以使用加减乘除以及取余等运算来把两个动画值合成为一个新的动画值。

- `Animated.add()`
- `Animated.divide()`
- `Animated.modulo()`
- `Animated.multiply()`



## timing动画

常用的线性动画, 使组件随时间变化从一个`fromValue`按照一个过渡曲线变化到一个`toValue`

```js
export const timing: (value: AnimatedValue | AnimatedValueXY, config: TimingAnimationConfig) => CompositeAnimation;
```

`config`参数介绍

```js
    interface TimingAnimationConfig extends AnimationConfig {
        // 终点值
        toValue: number | AnimatedValue | { x: number; y: number } | AnimatedValueXY;
        // 渐变函数
        easing?: (value: number) => number;
        // 动画持续时间
        duration?: number;
        // 延迟时间
        delay?: number;
    }
```

代码示例

```js
 export default class Animation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fadeOutOpacity: new Animated.Value(1),
        }

        this.fadeOutAnimated = Animated.timing(
            this.state.fadeOutOpacity,
            {
                toValue: 0,  //透明度动画最终值
                duration: 3000,   //动画时长3000毫秒
                easing: Easing.linear,
            }
        );
    }

    _startAnimated() {
        this.fadeOutAnimated.start(() => this.state.fadeOutOpacity.setValue(1));
    }

    render(){
        return (
            <View style={{flex: 1, backgroundColor: '#f7f7f7', marginTop: 88, marginBottom: 34}}>
                 <Animated.View style={{marginTop: 100,width: 200, height: 200, opacity: this.state.fadeOutOpacity}}>
                    <View style={{width:200,height:200,backgroundColor: 'red'}}/>
                 </Animated.View>

                <TouchableOpacity style={{marginLeft: 50}} onPress={this._startAnimated.bind(this)}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
 }
```





## spring

弹簧动画, 基础的单词弹跳物理模型实现的`spring`动画

```js
export function spring(value: AnimatedValue | AnimatedValueXY, config: SpringAnimationConfig): CompositeAnimation;
```

`config`参数格式介绍

```js
interface SpringAnimationConfig extends AnimationConfig {
    // 目标值
    toValue: number | AnimatedValue | { x: number; y: number } | AnimatedValueXY;
    // 反弹系数，默认为8
    bounciness?: number;
    // 控制动画的速度，默认为12
    speed?: number;
    // 控制速度，默认为40
    tension?: number;
    // 控制“弹跳系数”、夸张系数，默认为7
    friction?: number;
}
```

示例代码

```js
export default class SpingAnimated extends Component {
    constructor(props) {
        super(props)

        this.state = {
            springValue: new Animated.Value(1)
        }

        this.springAnimated = Animated.spring(this.state.springValue, {
            toValue: 1,
            duration: 2000,
            tension: 10,
            friction: 2
        })
    }

    _startAnimated() {
        this.state.springValue.setValue(0.1);
        this.springAnimated.start();
    }

    render(){
        return (
            <View style={{ width: 414, height: 800, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                <Animated.View style={{width: 100, height: 100, backgroundColor: 'red', transform: [{scale: this.state.springValue}]}}/>

                <TouchableOpacity style={{position:'absolute', bottom: 50}} onPress={this._startAnimated.bind(this)}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
 }
```






