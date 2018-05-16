---
title: ReactNaive之CSS和Flex布局
date: 2017-10-23 07:54:34
tags: [CSS, Flex]
categories: ReactNaive
---
ReactNaive之CSS和Flex布局
<!-- more -->

## {}和()的使用
### {}的使用
#### ReactNative中，使用表达式的时候需要用{}包住

```objc
style={styles.mainStyle}
```

#### ReactNative中,在字符串中使用变量的时候，需要用{}包住

```objc
var str = 'hello'
<Text>{str}</Text>
```

#### ReactNative中，对象，字典需要用{}包住

- `style = {}`,最外层表达式，用{}包住
- `{flex:1}`,对象，用{}包住

```objc
<View style={{flex:1}}></View>
```
### ()的使用
- 创建组件`<View></View>`，必须要用()包住
  - 因此只要返回组件，都需要用()

```objc
render(){
    return (
        <View style={styles.mainStyle}>

        </View>
    )
}
```

## ReactNative之CSS布局
- ReactNative支持CSS中的布局属性，因此可以使用CSS布局属性
- CSS颜色大全，下面会用到，点击这[CSS颜色代码大全](http://www.cnblogs.com/axing/archive/2011/04/09/CSS.html)

### 视图边框
- 什么时候使用？想设置自己周边有边框的时候
- 注意点：***一定要设置边框宽度***

```objc
borderBottomWidth number //底部边框宽度
borderLeftWidth number //左边框宽度
borderRightWidth number //右边框宽度
borderTopWidth number //顶部边框宽度
borderWidth number //边框宽度
border<Bottom|Left|Right|Top>Color //各方向边框的颜色,<>表示连着一起，例如borderBottomColor
borderColor //边框颜色
```

### 尺寸
#### 设置宽高

```objc
width number
height number
```

#### 外边距
- 设置组件与组件之间的间距
  - 注意：第一个组件比较特殊，参照父组件，与父控件之间的间距。
  - 其他组件间距，相对于上一个组件
- 什么时候使用？想设置自己在父控件的位置的时候使用

```objc
margin number 外边距
marginBottom number 下外边距
marginHorizontal number 左右外边距
marginLeft number 左外边距
marginRight number 右外边距
marginTop number 上外边距
marginVertical number 上下外边距

//注意marginRight和width冲突，如果设置了width，marginRight无效。
```

#### 内边距
- 设置子控件与当前控件的位置
- 什么时候使用？想设置自己的子控件相对自己的位置的时候使用

```objc
padding number 内边距
paddingBottom number 下内边距
paddingHorizontal number 左右内边距
paddingLeft number 做内边距
paddingRight number 右内边距
paddingTop number 上内边距
paddingVertical number 上下内边距
```

#### 相对定位和绝对定位
#### 边缘

```objc
left   number  左边缘。
right  number  右边缘。
top    number  顶部边缘。
bottom number  底部边缘。
```

#### 定位(position):
- 通过 `left`, `top`, `right` 以及 `bottom` 边缘属性进行定位。

```objc
absolute：绝对定位，参照父控件位置定位
relative：相对定位，参照当前控件原始位置定位
```
- 什么时候使用绝对定位，当想把一个已经设置了宽度的控件快速的放在左下角，右下角的时候，可以使用绝对定位
- 什么时候使用相对定位，当想相对自己做出一些改变的时候，采用相对定位,比如相对自己，往下移动一点

## ReactNative之Flex布局
- 一般使用ReactNative开发App,一般都采用Flex布局，使用这套布局就非常快。

### Flex简介
- Flex又叫弹性布局，会把当前组件看做一个容器，他的所有子组件都是他容器中的成员，通过Flex，就能迅速的布局容器中的成员。
- 使用场景：当想快速布局一个组件中所有子组件的时候，可以使用Flex布局

### Flex主轴和侧轴
- Flex中有两个主要的概念：主轴和侧轴
- 主轴与侧轴的关系：相互垂直的。
- 主轴：决定容器中子组件默认的布局方向：水平，垂直
- 侧轴：决定容器中子组件与主轴垂直的布局方向
  - 比如主轴水平，那么子组件默认就是水平布局排布，侧轴就是控制子组件在垂直方向的布局

### flexDirection属性
- flexDirection:决定主轴的方向，水平或者垂直，这样子组件就会水平排布或者垂直排布
- flexDirection共有四个值，在RN中默认为column。

```objc
row（默认值）：主轴为水平方向，从左向右。依次排列
row-reverse：主轴为水平方向，从右向左依次排列
column：主轴为垂直方向，默认的排列方式，从上向下排列
column-reverse：主轴为垂直方向，从下向上排列
```

### flexWrap属性
- flexWrap:决定子控件在父视图内是否允许多行排列。
- flexWrap共有两个值，默认为nowrap。

```objc
nowrap 组件只排列在一行上，可能导致溢出。
wrap   组件在一行排列不下时，就进行多行排列
```

### justifyContent
- `justifyContent`:决定子组件在主轴中具体布局，是靠左，还是居中等
- `justifyContent`共有五个值，默认为`flex-start`

```objc
flex-start: //子组件向主轴起点对齐，如果主轴水平，从左开始，主轴垂直，从上开始。
flex-end:  //子组件向主轴终点对齐，如果主轴水平，从右开始，主轴垂直，从下开始。
center: //居中显示，注意：并不是让某一个子组件居中，而是整体有居中效果
space-between: //均匀分配,相邻元素间距离相同。每行第一个组件与行首对齐，每行最后一个组件与行尾对齐。
space-around: //均匀分配,相邻元素间距离相同。每行第一个组件到行首的距离和每行最后一个组件到行尾的距离将会是相邻元素之间距离的一半
```

### alignItems
- `alignItems`:决定子组件在测轴中具体布局
一直都没有管过侧轴，如果侧轴垂直，决定子组件在上，还是下，或者居中
- `alignItems`共有四个值，默认为`stretch`。

```objc
flex-start 子组件向侧轴起点对齐。
flex-end 子组件向侧轴终点对齐。
center 子组件在侧轴居中。
stretch 子组件在侧轴方向被拉伸到与容器相同的高度或宽度。
```

### alignSelf
- `alignSelf`:自定义自己的侧轴布局，用于一个子组件设置。
- 注意：当某个子组件不想参照默认的`alignItems`时，可以设置`alignSelf`，自定义自己的侧轴布局。
- `alignSelf`共有五个值，默认为`auto`。

```objc
auto 继承它的父容器的alignItems属性。如果没有父容器则为 "stretch"
flex-start 子组件向侧轴起点对齐。
flex-end 子组件向侧轴终点对齐。
center 子组件在侧轴居中。
stretch 子组件在侧轴方向被拉伸到与容器相同的高度或宽度。
```

### flex
- `flex`: 决定子控件在主轴中占据几等分。
- `flex`: 任意数字，所有子控件`flex`相加，自己`flex`占总共多少，就有多少宽度.


## ReactNative之组件属性(Props、State)
- 在App开发中，少不了组件之间的传值，在RN中组件之间通信需要用到Props和State。

### Props(属性)
- 什么是Props？一般用于自定义组件，大多数组件在创建时就可以使用各种参数来进行定制，用于定制的这些参数就称为props（属性）。
- props不能在自己的组件中修改, 只能在父组件中修改
- 如果想在自己的组件中修改属性, 需要用state
- `name`:就是`Props`，通过`this.props.name`访问

```objc
<Room name="小码哥" />
```

> 注意：props是在父组件中指定，而且一经指定，在整个组件的生命周期中都不再改变。


### State
- State：如果以后想修改某个属性，就修改界面，就需要用state。
- 注意:State属性一般在constructor中声明(ES6)，在setState中修改数据.
- 定义state属性

```objc
this.state = {
    num:1,
};
```

- 修改state属性

```objc
this.setState({
    num : number
})
```





