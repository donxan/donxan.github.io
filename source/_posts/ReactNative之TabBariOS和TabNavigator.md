---
title: ReactNative之TabBariOS和TabNavigator
date: 2018-01-06 15:23
tags: [CSS, TabBariOS, TabNavigator]
categories: ReactNaive
---
目前`React Native`提供的官方的`Tab Bar`主要是`TabBarIOS`, 但是该控件目前只支持IOS端

<!-- more -->

> 效果图

![底部选项条.png](http://upload-images.jianshu.io/upload_images/4122543-ecacb6e40602657c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/200)


## TabBarIOS
- 底部选项条, 不能跨平台,只能iOS端使用
- 添加如下代码, 就会出现底部选项条

```objc
    return (
        <TabBarIOS></TabBarIOS>
    )        
```

### 相关属性

```objc
barTintColor='yellow'
//标签栏的背景颜色

tintColor='#ed7f30'
//当前被选中的标签图标的颜色

unselectedItemTintColor='#a19a9a'
//当前没有被选中的标签图标的颜色。仅在iOS 10及以上版本有效

translucent={false} 
//一个布尔值，决定标签栏是否需要半透明化
//默认为true, 有透明效果
```

## 选项卡: `TabBarIOS.Item`
- `TabBarIOS`: 只是表示底部的一个选项条
- `TabBarIOS.Item`: 才代表每一个选项卡
- `TabBarIOS.Item`必须包装一个View,作为点击tabBar按钮，切换的View


```objc
                <TabBarIOS.Item title='首页'
                                icon={{uri:'btn_home_normal'}}
                                selectedIcon={{uri:'btn_home_selected'}}
                                onPress={()=>{
                                    this.setState({
                                        selectedIndex:0
                                    })
                                }}
                                selected={this.state.selectedIndex == 0}
                >
                    <View style={{backgroundColor:'red', flex:1}}/>
                </TabBarIOS.Item>
```

### 常用属性

```objc
badge string, number 
badge='我'
badge={12}
//在图标右上角显示一个红色的气泡, 可接受string和number类型

title string 
//在图标下面显示的标题文字。如果定义了systemIcon属性，这个属性会被忽略。

icon Image.propTypes.source 
//给当前标签指定一个自定义的图标。如果定义了systemIcon属性， 这个属性会被忽略。

selectedIcon Image.propTypes.source 
//当标签被选中的时候显示的自定义图标。如果定义了systemIcon属性，这个属性会被忽略。如果定义了icon而没定义这个属性，在选中的时候图标会染上蓝色。

onPress function 
//当此标签被选中时调用。你应该修改组件的状态来使得selected属性为true

selected bool 
//这个属性决定了子视图是否可见。如果你看到一个空白的页面，很可能是没有选中任何一个标签

systemIcon enum('bookmarks', 'contacts', 'downloads', 'favorites', 'featured', 'history', 'more', 'most-recent', 'most-viewed', 'recents', 'search', 'top-rated') 
//一些预定义的系统图标。注意如果你使用了此属性，标题和自定义图标都会被覆盖为系统定义的值。
```

- 只要设置对应的tabBarItem的selected为true,就会自动跳转到对应界面
  - 注意：tabBarItem的selected属性不能写死，可以搞个角标记录当前选中那个角标
- 监听tabBarItem的点击，修改selected属性
- 相关示例代码

```objc
export default class App extends Component<{}> {
    constructor(props){
        super(props)
        this.state = {
            selectedIndex:0
        }
    }

    // 当一个组件要显示的时候,就会自动调用render,渲染组件
    render() {
        return (
            <TabBarIOS tintColor='#ed7f30'>
                <TabBarIOS.Item title='首页'
                         icon={{uri:'btn_home_normal'}}
                                selectedIcon={{uri:'btn_home_selected'}}
                                badge='我'
                                onPress={()=>{
                                    this.setState({
                                        selectedIndex:0
                                    })
                                }}
                                selected={this.state.selectedIndex == 0}
                >
                    <View style={{backgroundColor:'red', flex:1}}/>
                </TabBarIOS.Item>

                <TabBarIOS.Item title='直播'
                                icon={{uri:'btn_column_normal'}}
                                selectedIcon={{uri:'btn_column_selected'}}
                                badge={12}
                                onPress={()=>{
                                    this.setState({
                                        selectedIndex:1
                                    })
                                }}
                                selected={this.state.selectedIndex == 1}
                >
                    <View style={{backgroundColor:'yellow', flex:1}}/>
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
}
```

## TabNavigator
- TabBarIOS只能用于iOS平台，如果在安卓上也需要有TabBar,就不能使用TabBarIOS。
- TabNavigator:一个跨平台的TabBar第三方框架组件，可以用于iOS和安卓平台
- [TabNavigator地址](https://github.com/expo/react-native-tab-navigator)

### 安装和导入
#### 安装第三方框架

```objc
yarn add react-native-tab-navigator
```
#### 导入框架

```objc
import TabNavigator from 'react-native-tab-navigator';
```

### TabNavigator常用属性

属性 | 默认值 | 类型 | 描述
---|---|---|---
sceneStyle | inherited | object (style)	 | 定义渲染的场景
tabBarStyle | inherited | object (style) | 为TabBar定义样式
tabBarShadowStyle | inherited | object (style) | 为TabBar定义阴影样式
hidesTabTouch | false | boolean | 禁用选项卡的onPress

### TabNavigator.Item常用属性

属性 | 默认值 | 类型 | 描述
---|---|---|---
renderIcon | none | function | 选项卡图标
renderSelectedIcon | none | function | 选项卡选中状态图标
badgeText | none | string or number	| 图标右上角显示
title | none | string | tabbar标题
titleStyle | inherited | style | 标题样式
selectedTitleStyle | inherited | style | 选中状态标题样式
tabStyle | inherited | style | 选项卡样式
hidesTabTouch | false | boolean | 是否选中该tabbar
onPress | none | function | 选项卡的点击方法
allowFontScaling | false | boolean | 允许标题的字体缩放

- 使用示例


```objc
render() {
        return (
            <TabNavigator>
                <TabNavigator.Item title='首页'
                                   selected={this.state.selectedIndex == 0}
                                   titleStyle={{color:'#9d9d9d'}}
                                   selectedTitleStyle={{color:'#ed7f30'}}
                                   badgeText='首页'
                                   allowFontScaling={false}
                                   renderIcon={()=>
                                       <Image source={{uri:'btn_home_normal'}} style={styles.iconStyle}/>
                                   }
                                   renderSelectedIcon={()=>
                                       <Image source={{uri:'btn_home_selected'}} style={styles.iconStyle}/>
                                   }
                                   onPress={()=>
                                       this.setState({
                                           selectedIndex:0
                                       })
                                   }
                >
                    <View style={[styles.viewStyle, {backgroundColor:'red'}]}>
                        <Text>首页</Text>
                    </View>
                </TabNavigator.Item>

                <TabNavigator.Item title='我的'
                                   selected={this.state.selectedIndex == 1}
                                   titleStyle={{color:'#9d9d9d'}}
                                   selectedTitleStyle={{color:'#ed7f30'}}
                                   badgeText={10}
                                   renderIcon={()=>
                                       <Image source={{uri:'btn_user_normal'}} style={styles.iconStyle}/>
                                   }
                                   renderSelectedIcon={()=>
                                       <Image source={{uri:'btn_user_selected'}} style={styles.iconStyle}/>
                                   }
                                   onPress={()=>
                                       this.setState({
                                           selectedIndex:1
                                       })
                                   }
                >
                    <View style={[styles.viewStyle, {backgroundColor:'green'}]}>
                        <Text>我的</Text>
                    </View>

                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}
```