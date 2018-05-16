---
title: React Native之导航组件NavigatorIOS和Navigator
date: 2018-01-05 17:04
tags: [CSS, NavigatorIOS, Navigator]
categories: ReactNaive
---



## NavigatorIOS
- `NavigatorIOS`是一个包装`UINavigationController`，能够实现一个导航堆栈, 且只能在iOS上使用的组件
- 它的工作原理与使用本地应用程序`UINavigationController`的效果完全相同，从`UIKIt`提供相同的动画和行为
<!-- more -->

![Navigator.png](http://upload-images.jianshu.io/upload_images/4122543-d1e3e673185be43f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/200)


### 常用属性

```objc
//样式, 必须设置{flex:1}, 否则看不到子控件
style={{flex:1}}

//导航条的背景颜色
barTintColor='yellow'

//为true , 隐藏导航栏
navigationBarHidden={false}

//是否隐藏阴影，true／false。
shadowHidden={false}

//导航栏上按钮的颜色设置
tintColor='black'

//导航栏上标题的颜色设置
titleTextColor='blue'

//导航栏是否是半透明的，true／false。
translucent={true}
```

### NavigatorIOS的使用
- 必须初始化路由: `initialRoute{}`
- 注意:`component`，需要传入组件，自定义组件

```objc
//用于初始化路由。其参数对象中的各个属性如下：
initialRoute：
 {
  component: function, //加载的视图组件
  title: string, //当前视图的标题
  passPros: object, //传递的数据
  backButtonIcon: Image.propTypes.source, // 后退按钮图标
  backButtonTitle: string, //后退按钮标题
  leftButtonIcon: Image.propTypes.soruce, // 左侧按钮图标
  leftButtonTitle: string, //左侧按钮标题
  onLeftButtonPress: function, //左侧按钮点击事件
  rightButtonIcon: Image.propTypes.soruce, // 右侧按钮图标
  rightButtonTitle: string, //右侧按钮标题
  onRightButtonPress: function, //右侧按钮点击事件
}

```

- 使用示例

```objc
<NavigatorIOS initialRoute={
        {
        //JunNavigatorView: 为自定义的组件
            component:JunNavigatorView,
            title: '首页',
            leftButtonTitle:'左按钮',
            rightButtonTitle:'跳转'
        }
    }
/>
```

### 页面间的跳转
- 获取Navigator，只有它才能跳转
- 只要是导航控制器下的组件，都可以通过props获取
- `this.props.navigator`
- 界面跳转方法


```objc
pust(route)：//加载一个新的页面（视图或者路由）并且路由到该页面。
pop()：//返回到上一个页面。
popN(n)：//一次性返回N个页面。当 N=1 时，相当于 pop() 方法的效果。
replace(route)：//替换当前的路由。
replacePrevious（route）：//替换前一个页面的视图并且回退过去。
resetTo(route)：//取代最顶层的路由并且回退过去。
popToTop()：//回到最上层视图。

```

- 使用示例

```objc
    <Text onPress={()=>{
        this.props.navigator.push({
            component:JunTwoView,
            title:'第二页面'
        })

    }}
    >点击跳转到第二个页面</Text>
```

## Navigator
- `Navigator`很好解决了`NavigatorIOS`不能跨平台和自定义的问题
- RN开发中通常使用`Navigator`
- Navigator作用：只提供跳转功能，支持iOS,安卓
- 导航条需要自定义，需要导航条的界面，自己添加
只要一个控件，包装成Navigator就能获取跳转功能

### Navigator导入问题
- 在0,43版本之前(包括0.43), `Navigator`在`react-native`库中
- 从0.44版本开始`Navigator`就被移入了`react-native-deprecated-custom-components`库中
- 使用前,先进入当前项目文件，安装Navigator所在的库

```objc
//终端输入
yarn add react-native-deprecated-custom-components

//下面方法可能已经失效(亲测失败)
npm install react-native-deprecated-custom-components --save
```
- 下载完成后，导入
```
import {Navigator} from 'react-native-deprecated-custom-components'
```

### Navigator的使用
#### `initialRoute`：初始化路由
- 定义启动时加载的路由
- 路由是导航栏用来识别渲染场景的一个对象

```objc
<Navigator initialRoute={{component: JunOneView}}/>
```

#### 配置场景动画和手势
- 可选的函数, 设置跳转方向
- 会带有两个参数调用，一个是当前的路由，一个是当前的路由栈
- 返回一个场景配置对象

```objc
_configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromLeft;
}
```

- 其他跳转方向参数

```objc
Navigator.SceneConfigs.PushFromRight (默认)
Navigator.SceneConfigs.FloatFromRight
Navigator.SceneConfigs.FloatFromLeft
Navigator.SceneConfigs.FloatFromBottom
Navigator.SceneConfigs.FloatFromBottomAndroid
Navigator.SceneConfigs.FadeAndroid
Navigator.SceneConfigs.HorizontalSwipeJump
Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
Navigator.SceneConfigs.VerticalUpSwipeJump
Navigator.SceneConfigs.VerticalDownSwipeJump
```

#### 渲染指定路由的场景
- 必要参数, 调用的参数是路由和导航器

```objc
_renderScene(route, navigator) {
        // ...扩展符, 作用:如果是对象,就获取对象中所有值,如果是数组,就获取数组中所有值
    return (<route.component navigator={navigator} {... route.props}/>)
}

```

#### 设置导航尺寸

```objc
style={{flex:1}}
```

### 其他属性或方法

```objc
onDidFocus function 
//每当导航切换完成或初始化之后，调用此回调，参数为新场景的路由。

onWillFocus function 
//会在导航切换之前调用，参数为目标路由。
```

## 延展符
- 文中用到了一个操作符: `...`即为延展符
- 延展符的作用
  - 遍历数组
  - 遍历对象的属性,一个一个传值给下一个控件
  

```objc
var arr1 = [1, 2, 3, 4, 5]
var arr2 = [0]
        
arr2.push(...arr1)
console.log(arr2)
//输出结果: [0, 1, 2, 3, 4, 5]
```
- 作用等同于`JavaScript`数组中的concat方法
- 区别在于`concat`只能作用于数组

```objc
var arr1 = [1, 2, 3, 4, 5]
var arr2 = [0]

// arr2.push(...arr1)
arr2 = arr2.concat(arr1)
console.log(arr2)
//输出结果: [0, 1, 2, 3, 4, 5]
```

> #### 关于`JavaScript`的数组语法, 请查看我的另一篇文章[JavaScript基本语法01](https://www.titanjun.top/2017/08/09/JavaScript%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%9501/)
