---
title: ReactNative之基本组件
date: 2017-12-18 16:54
tags: [View, Text, Image]
categories: ReactNaive
---

- 本文主要总结的是ReactNative的一些简单语法, 大部分内容总结自[袁大神](http://www.jianshu.com/u/b09c3959ab3b)的文章
- 这里主要简单介绍以下几个控件:
- `View` 和 `Text`
- `Button` 和 `Image`
- `TextInput`

<!-- more -->


##  View
- RN中的View组件类似于iOS中的UIView
  - 一般常用于容器，往里面添加子控件,任何子组件都可以，View里面也可以在放View.
  - 可设置样式: 背景颜色, 宽高等属性
  - 没有点击事件，不能监听点击
  - 如需要添加监听事件, 这里需要用到`TouchableOpacity`组件

## `TouchableOpacity`
- `TouchableOpacity`点击控件
  - 如果想让一个没有点击事件的组件，能点击，就需要在外层包装一个`TouchableOpacity`，这个View,就能点击了。
  - 注意：`TouchableOpacity`默认点击区域，就是所有子控件的区域,因为默认一个组件的尺寸由子控件绝对，因此`TouchableOpacity`也是一样

###  `activeOpacity`属性
- `activeOpacity`: 不透明度
  - 一个View,被`TouchableOpacity`包装后，点击这个`View`,就会有透明效果，这个效果可以通过`activeOpacity`属性调整
  - 取值: 0~1，1表示不透明，点击就没透明效果了。
- 使用示例:

```objc
<TouchableOpacity activeOpacity={0.7}>
    <View style={styles.junViewStyle}>
    </View>
</TouchableOpacity>
```

###  disabled属性
- 如果设为true，则禁止此组件的一切交互
- 通过disabled，可以控制一个被`TouchableOpacity`包装的组件什么时候能点击。

###  监听的几种手势
  
```objc
onLongPress function ：长按的时候调用

onPress function ：点击的时候调用

onPressIn function ：手指按下的时候调用

onPressOut function ：手指抬起的时候调用
```

> 需要注意的是: `onPress`与`onPressIn`，`onPressOut`，有冲突，不要同时实现

代码示例:

```objc
           <TouchableOpacity activeOpacity={0.7}
                              onPress={()=>{
                                  alert('点击')
                              }}
                              onLongPress={()=>{
                                  alert('长按')
                              }}
            >
                <View style={styles.junViewStyle}>
                </View>

            </TouchableOpacity>

```


##  Text
Text: 用于展示一段文字

###  属性介绍
- `adjustsFontSizeToFit`: 指定字体是否随着给定样式的限制而自动缩放(默认false), 为true时: 会自动改变字体大小
- `allowFontScaling`: 控制字体是否要根据系统的“字体大小”辅助选项来进行缩放。
- `minimumFontScale`: 当adjustsFontSizeToFit开启时，指定最小的缩放比（即不能低于这个值）。可设定的值为0.01 - 1.0
- `numberOfLines`:最大行数，超出最大行数，就不会完全显示，超出部分显示...
- `selectable`:决定用户是否可以长按选择文本，以便复制和粘贴,默认false
- `suppressHighlighting`: 默认情况下，文本被按下时会有一个灰色的阴影，如果想取消就设置为true
- `onPress`: 监听文本点击的操作
- `onLongPress`: 当文本被长按以后调用此回调函数

###  常用样式属性

```objc
color: 'yellow' //字体颜色
fontSize: 20,  //字体大小
fontStyle: 'italic' //字体样式('normal': 正常字体, 'italic': 斜体)

fontWeight:'bold', //指定字体的粗细
//大多数字体都支持'normal'和'bold'值。并非所有字体都支持所有的数字值。如果某个值不支持，则会自动选择最接近的值
//enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')

lineHeight:50, //字体的高度(如字体需要垂直居中, 可设置与控件的高度相同即可)
textAlign:'center' //文字排列方式('auto', 'left', 'right', 'center', 'justify'(iOS支持))
```

示例使用

```objc
        <View style={styles.mainStyle}>
            <Text style={styles.textStyle}
                  numberOfLines={1}
                  selectable={true}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.5}
            >
                我是iOS开发工程师
            </Text>
        </View>

```

##  Button
- Button:按钮,当一个文字想要点击效果，可以使用按钮
- 注意：Button没有样式，设置样式无效，最大的弊端，开发中一般不使用，一般自定义按钮，自己包装一个Text用于按钮.
- 常用属性

```objc
title='Button' //按钮文字
color="green"  //按钮文字颜色
onPress={()=>{ //点击事件
    alert('点击了Button')
}}
disabled={true} //是否允许点击, 为true时不可点击
```

代码示例

```objc
        <View style={styles.mainStyle}>
            
            <Button
                title='Button'
                color="green"
                onPress={()=>{
                    alert('点击了Button')
                }}
                disabled={true}
            />
        </View>

```

## TextInput
- `TextInput`: 文本输入框, 支持样式设置
- `TextInput`默认没有边框，需要自己添加`borderWidth`
- `TextInput`是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。

###  常用属性介绍

```objc
placeholder='请输入账号' //占位文字
placeholderTextColor='#e1e1e1' //占位字符串显示的文字颜色

selectionColor='green' //设置光标颜色
caretHidden={true}  //如果为true，则隐藏光标。默认值为false

autoFocus={true}  //自动获取焦点,如果为true，在componentDidMount后会获得焦点。默认值为false

blurOnSubmit={true}  //点击键盘，右下角return,或者按回车的时候，是否自动退出键盘，true:是。注意：键盘必须是英文输入键盘，数字键盘无效.

editable={false}  //文本框是否可以编辑，默认值为true，如果为false，文本框是不可编辑的
secureTextEntry={true}  //是否是密文效果,注意：多行无效果

secureTextEntry={false}  //是否是多行输入框，默认文本输入框只能一行，true,就能多行输入
maxLength={15}  //最大字符数，显示输入文本长度

clearTextOnFocus={true}  //每次重新输入文本框，是否清空之前的文本
enablesReturnKeyAutomatically={true}  //如果为true，键盘会在文本框内没有文字的时候禁用确认按钮。默认值为false

autoCorrect={true}  //如果为false，会关闭拼写自动修正。默认值是true。

```

- `autoCapitalize`: 控制TextInput是否要自动将特定字符切换为大写
- enum('none', 'sentences', 'words', 'characters') 
  - `characters`: 所有的字符。
  - `words`: 每个单词的第一个字符。
  - `sentences`: 每句话的第一个字符（默认）。
  - `none`: 不自动切换任何字符为大写。


- 键盘类型`keyboardType`
- `keyboardType='number-pad'`
  - `default`: 默认键盘
  - `numeric`: 带有小数点的数字键盘
  - `email-address`: 有@符的字母键盘
  - `ascii-capable`: 纯字母键盘
  - `numbers-and-punctuation`
  - `url`
  - `number-pad`
  - `phone-pad`
  - `name-phone-pad`
  - `decimal-pad`
  - `twitter`
  - `web-search`

- returnKeyType: 决定键盘右下角按钮显示的内容

  - ` enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo')`

- clearButtonMode: 是否要在文本框右侧显示“清除”按钮
  - `never`: 不显示
  - `while-editing`: 编辑的时候显示
  - `always`
  - `unless-editing`

###  常用的监听事件

```objc
onBlur function 
//当文本框失去焦点的时候调用此回调函数。

onChange function 
//当文本框内容变化时调用此回调函数。

onChangeText function 
//当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。

onEndEditing function 
//当文本输入结束后调用此回调函数。

onFocus function 
//当文本框获得焦点的时候调用此回调函数。

onLayout function 
//当组件挂载或者布局变化的时候调用，参数为{x, y, width, height}。

onScroll function 
//在内容滚动时持续调用，传回参数的格式形如{ nativeEvent: { contentOffset: { x, y } } }。 也可能包含其他和滚动事件相关的参数

onSelectionChange function 
//长按选择文本时，选择范围变化时调用此函数，传回参数的格式形如 { nativeEvent: { selection: { start, end } } }。

onSubmitEditing function 
//此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数。如果multiline={true}，此函数不可用。

onKeyPress function 
//当一个键被按下的时候调用此回调。传递给回调函数的参数为{ nativeEvent: { key: keyValue } }，其中keyValue即为被按下的键。会在onChange之前调用。

```

### 方法

```objc
isFocused(): boolean 
//返回值表明当前输入框是否获得了焦点。

clear() 
//清空输入框的内容。
```

##  Image
- `Image`:用于加载图片
  - 图片可以是本地图片也可以是网络中的图片

### 加载图片的方式
- 首先看一下图片的三种存放方式
  - 图片存放到RN项目中
  - 图片存放到iOS项目中
  - 图片存放到安卓项目中
  

![RN项目中的图片.png](http://upload-images.jianshu.io/upload_images/4122543-fb4d14710cbd2852.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/500)
  
![iOS中的图片.png](http://upload-images.jianshu.io/upload_images/4122543-c0c5932f82858f27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/500)

- 如何加载图片
  - RN中加载资源:require(文件路径),用于加载RN中的资源，不管是图片，还是json都是一样的
  - uri:指定一个资源路径，就会自动加载
  - uri加载注意：通过uri加载资源，必须设置图片尺寸，否则不显示
  - 如果网络加载http图片，iOS默认不支持，需要在info.plist中做配置
- 各种图片加载方式

```objc
      <View style={styles.mainStyle}>
            {/*组件*/}
            <Text>1. 加载RN项目中的资源</Text>
            <Image
                style={styles.imageStyle}
                source={require('./BenzImage/Benz-GLA1.jpg')}
            />

            <Text>2. 加载iOS项目中的资源</Text>
            <Image
                style={styles.imageStyle}
                source={{uri: 'Benz-GLA2'}}
            />

            <Text>3. 加载https网络资源</Text>
            <Image
                style={styles.imageStyle}
                source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513422273696&di=4d6b5ad6af91e9dfc5df8dbcdc068ed6&imgtype=0&src=http%3A%2F%2Fimg6.taoche.cn%2F1b%2F021701pc9d.jpg'}}
            />

            <Text>4. 加载http网络资源</Text>
            <Image
                style={styles.imageStyle}
                source={{uri: 'http://upload-images.jianshu.io/upload_images/4122543-ae133247aa24204e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620'}}
            />

        </View>

```

###  相关属性介绍
- `source`: 设置Image图片资源
  - `source={uri: 'Benz-GLA2'}`
- `blurRadius`: 设置图片模糊状态
  - `blurRadius={10}`
  - 值越大,模糊状态越明显
- `resizeMode`: 决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小
  - `resizeMode='cover'`
  - `cover`: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）
    - 译注：这样图片完全覆盖甚至超出容器，容器中不留任何空白。
  - `contain`: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸（如果容器有`padding`内衬的话，则相应减去）
    - 译注：这样图片完全被包裹在容器中，容器中可能留有空白
  - `stretch`: 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。
  - `repeat`: 重复平铺图片直到填满容器。图片会维持原始尺寸。仅iOS可用。
  - `center`: 居中不拉伸
- `defaultSource`: 在读取图片时默认显示的加载提示图片
  - `defaultSource={uri: 'Benz-GLA2', scale: 1.0}`
  - `uri`: 是一个表示图片的资源标识的字符串，它可以是一个http地址或是一个本地文件路径（使用`require`(相对路径)来引用）。
  - `width, height`:  如果你知道图片的尺寸，那么可以在这里指定。这一尺寸会被用作`<Image/>`组件的默认尺寸。
  - `scale`: 图片的缩放系数。默认是1.0，意味着每一个图片像素都对应一个设备独立像素（DIP）。
  - `number`: 本地图片引用语法`require('./image.jpg')`所返回的内部资源id
 
###  监听图片加载方法

```objc
onLayout function 
//当元素挂载或者布局改变的时候调用，参数为：{nativeEvent: {layout: {x, y, width, height}}}.

onLoad function 
//加载成功完成时调用此回调函数。

onLoadStart function 
//加载开始时调用

onLoadEnd function 
//加载结束后，不论成功还是失败，调用此回调函数。

onError function 
//当加载错误的时候调用此回调函数，参数为{nativeEvent: {error}}

onPartialLoad  function 
//如果图片本身支持逐步加载，则逐步加载的过程中会调用此方法。“逐步加载”的具体定义与具体的标准和实现有关。

onProgress function 
//在加载过程中不断调用，参数为{nativeEvent: {loaded, total}}
```

###  Image类方法

```objc
static getSize(uri: string, success: (width: number, height: number) => void, failure: (error: any) => void) 
```
- 一般在`componentDidMount`调用，先获取图片尺寸，然后在设置图片尺寸。
- 在显示图片前获取图片的宽高(以像素为单位)。如果图片地址不正确或下载失败,此方法也会失败。
- 要获取图片的尺寸,首先需要加载或下载图片(同时会被缓存起来)。
- 这意味着理论上你可以用这个方法来预加载图片，虽然此方法并没有针对这一用法进行优化，而且将来可能会换一些实现方案使得并不需要完整下载图片即可获取尺寸。
- 所以更好的预加载方案是使用下面那个专门的预加载方法。

```objc
static prefetch(url: string) 
//预加载一个远程图片(将其下载到本地磁盘缓存)。
```

###  示例代码

```objc
export default class App extends Component<{}> {
    constructor(props){
        super(props)

        this.state = {
            wid: 100,
            hei: 100
        }
    }

    componentDidMount() {
        Image.getSize('http://upload-images.jianshu.io/upload_images/4122543-ae133247aa24204e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620', (width, height)=>{
            this.setState({
                wid:width,
                hei:height
            })
        }, (error)=>{
            alert(error)
        })
    }

    // 当一个组件要显示的时候,就会自动调用render,渲染组件
    //
    render() {
        return (
            <View style={styles.mainStyle}>
                <Text>加载iOS项目中的资源</Text>
                <Image
                    style={[styles.imageStyle, {width: this.state.wid, height: this.state.hei}]}
                    source={{uri: 'http://upload-images.jianshu.io/upload_images/4122543-ae133247aa24204e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620'}}
                    blurRadius={0}
                    resizeMode='contain'
                    // defaultSource={{uri: 'Benz-GLA2', scale: 1.0}}
                    onLoad={()=>{
                        console.log("图片加载完成")
                    }}
                    onLoadStart={()=>{
                        console.log('图片开始加载')
                    }}
                    onLoadEnd={()=>{
                        console.log('图片加载结束')
                    }}
                    onProgress={(progress)=>{
                        console.log(progress.nativeEvent.total)
                        console.log(progress.nativeEvent.loaded)
                    }}
                    onError={()=>{
                        alert('图片加载错误')
                    }}
                />
            </View>
        )
    }
}


// 4.样式表 组件外观 尺寸,颜色
const styles = StyleSheet.create({
    mainStyle:{
        flex:1,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    },
    imageStyle:{
        width:150,
        height:150,
        backgroundColor:'yellow'
    }
});

```




