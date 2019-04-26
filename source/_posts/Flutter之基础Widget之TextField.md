---
title: Flutter之基础Widget之TextField
date: 2019-04-26 18:31:40
<!--updated: 2019-04-26 18:31:40 # 更新日期-->
<!--permalink: Flutter_Widget_TextField-->
tags: [Flutter, Widget, Dart, TextField]
categories: Flutter笔记
<!--keywords: 关键字-->
<!--comments: 是否开启评论-->
<!--sticky: 文章置顶-->
<!--password: 文章密码-->
image:
---


![Flutter](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/widget_field.png?x-oss-process=style/titanjun)



<!--more-->

- [Flutter和Dart系列文章](https://www.titanjun.top/categories/Flutter%E7%AC%94%E8%AE%B0/)
- [项目GitHub地址](https://github.com/CoderTitan/Flutter_Widget)
- 上一篇[Flutter之基础Widget](https://www.titanjun.top/Flutter%E4%B9%8B%E5%9F%BA%E7%A1%80Widget.html)文章介绍了`Flutter`中基础的`Widget`, 但是由于篇幅的原因, 这篇文章就主要介绍`TextField`

## `TextField`

`TextField`用于文本输入，它提供了很多属性，我们先简单介绍一下主要属性的作用

```dart
const TextField({
    Key key,
    // 编辑框的控制器，跟文本框的交互一般都通过该属性完成，如果不创建的话默认会自动创建
    this.controller,
    // 用于控制`TextField`是否占有当前键盘的输入焦点, 使我们和键盘交互的`handle`
    this.focusNode,
    
    // 用于控制`TextField`的外观显示，如提示文本、背景颜色、边框等
    this.decoration = const InputDecoration(),
    // 键盘类型
    TextInputType keyboardType,
    // 决定键盘右下角按钮显示的内容
    this.textInputAction,
    // 设置什么情况下使用大写字母, 默认不使用大写字母
    this.textCapitalization = TextCapitalization.none,
    
    // 正在编辑的文本样式, `TextStyle`
    this.style,
    // 输入框文本的对其方式
    this.textAlign = TextAlign.start,
    // 输入框文本的其实位置
    this.textDirection,
    
    // 是否自动获取焦点, 默认`false`
    this.autofocus = false,
    // 是否隐藏正在编辑的文本，如用于输入密码的场景等，文本内容会用“•”替换, 默认`false`
    this.obscureText = false,
    // 是否自动校验, 默认`false`
    this.autocorrect = true,
    
    // 输入框能输入的最大行数
    this.maxLines = 1,
    // 输入框能输入的最多字符个数
    this.maxLength,
    // 达到最大长度(`maxLength`)时是否阻止输入, 默认`true`: 不能继续输入, `false`可以继续输入
    this.maxLengthEnforced = true,
    
    // 输入文本发生变化时的回调
    this.onChanged,
    // 点击键盘完成按钮时触发的回调，该回调没有参数，(){}
    this.onEditingComplete,
    // 点击键盘完成按钮时触发的回调，该回调有参数，参数即为当前输入框中的值。(String){}
    this.onSubmitted,
    
    // 对输入文本的校验
    this.inputFormatters,
    // 输入框是否可用, `false`则输入框会被禁用
    this.enabled,
    
    // 光标的宽度
    this.cursorWidth = 2.0,
    // 光标的圆角
    this.cursorRadius,
    // 光标的颜色
    this.cursorColor,
    
    // 键盘的外观, Brightness.light和dark
    this.keyboardAppearance,
    // 当TextField滚动时, 设置文本字段在滚动后的位置与可滚动项的边缘的距离
    this.scrollPadding = const EdgeInsets.all(20.0),
    // 长按输入的文本, 设置是否显示剪切，复制，粘贴按钮, 默认是显示的
    this.enableInteractiveSelection = true,
    // 点击输入框时的回调(){}
    this.onTap,
})
```

### controller

- 编辑框的控制器，通过它可以设置/获取编辑框的内容、选择编辑内容、监听编辑文本改变事件
- 大多数情况下我们都需要显式提供一个`controller`来与文本框交互
- 如果没有提供`controller`，则`TextField`内部会自动创建一个
- 下面是一个`TextField`的取值和赋值的操作

```dart
class TextFieldWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return ControllerText();
  }
}

class ControllerText extends State<TextFieldWidget> {
  TextEditingController _textController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Container(
      width: 414.0,
      height: 600.0,
      color: Colors.white12,
      child: Column(
        children: <Widget>[
          TextField(
            controller: _textController,
            decoration: InputDecoration(icon: Icon(Icons.phone_iphone), hintText: 'hintText'),
          ),
          RaisedButton(
            child: Text('赋值'),
            onPressed: (){
              setState(() {
                  _textController.text = "https://www.titanjun.top";
              });
            },
          ),
          RaisedButton(
            child: Text('取值'),
            onPressed: (){
              setState(() {});
            },
          ),
          Text(_textController.text)
        ],
      ),
    );
  }
}
```

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/textfield_controller.gif)

### focusNode

用于控制`TextField`是否占有当前键盘的输入焦点, 使我们和键盘交互的`handle`


```
FocusNode focusNode1 = new FocusNode();

TextField(
    autofocus: true, 
    focusNode: focusNode1,//关联focusNode1
    decoration: InputDecoration(
        labelText: "input1"
    ),
),

RaisedButton(
    child: Text("隐藏键盘"),
    onPressed: () {
    // 当所有编辑框都失去焦点时键盘就会收起  
        focusNode1.unfocus();
    },
),
```


### decoration

用于控制`TextField`的外观显示，如提示文本、背景颜色、边框等, 下面是`InputDecoration`的构造方法


```dart
const InputDecoration({
    // 接收Widget, 在输入框左侧显示的图片                  
    this.icon,
    
    // String, 输入框的描述, 当输入框获取焦点时默认会浮动到上方
    this.labelText,
    // TextStyle, 样式
    this.labelStyle,

    // 辅助文本, 位于输入框下方，如果errorText不为空的话，则helperText不显示
    this.helperText,
    this.helperStyle,
    
    /// 提示文本，位于输入框内部
    this.hintText,
    this.hintStyle,
    
    // 错误信息提示文本
    this.errorText,
    this.errorStyle,
    // errorText显示的最大行数
    this.errorMaxLines,
    // errorText不为空，输入框没有焦点时要显示的边框
    this.errorBorder,
    
    // labelText是否浮动，默认为true，修改为false则labelText在输入框获取焦点时不会浮动且不显示
    this.hasFloatingPlaceholder = true,
    // 改变输入框是否为密集型，默认为false，修改为true时，图标及间距会变小
    this.isDense,
    // 内间距
    this.contentPadding,
    
    // 位于输入框内部起左侧置的图标
    this.prefixIcon,
    // 预先填充在输入框左侧的Widget,跟prefixText同时只能出现一个
    this.prefix,
    //预填充在输入框左侧的文本, 不可修改删除，例如手机号前面预先加上区号等
    this.prefixText,
    this.prefixStyle,
    
    // 位于输入框内部右侧位置的图标
    this.suffixIcon,
    // 预先填充在输入框右侧的Widget,跟suffixText同时只能出现一个
    this.suffix,
    // 预填充在输入框右侧的文本, 不可修改删除
    this.suffixText,
    this.suffixStyle,
    
    // 位于右下方显示的文本，常用于显示输入的字符数量
    this.counterText,
    this.counterStyle,
    
    // 相当于输入框的背景颜色
    this.fillColor,
    // 如果为true，则输入使用fillColor指定的颜色填充
    this.filled,
    
    // 输入框有焦点时的边框,如果errorText不为空的话，该属性无效
    this.focusedBorder,
    // errorText不为空时，输入框有焦点时的边框
    this.focusedErrorBorder,
    // 输入框禁用时显示的边框，如果errorText不为空的话，该属性无效
    this.disabledBorder,
    // 输入框可用时显示的边框，如果errorText不为空的话，该属性无效
    this.enabledBorder,
    // 正常情况下的边框
    this.border,
    // 输入框是否可用
    this.enabled = true,
    // counterText的语义标签, 如果赋值将替换counterText, 但是我试了好像没什么效果
    this.semanticCounterText,
  })
```

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/widget_textfield.png)


### keyboardType

用于设置该输入框默认的键盘输入类型，取值如下：

```dart
keyboardType: TextInputType.number,
```

`TextInputType` | 含义
---|---
`text` | 文本输入键盘
`multiline` | 多行文本，需和`maxLines`配合使用(设为`null`或大于1)
`number` | 纯数字键盘 
`phone` | 电话号码输入键盘会弹出数字键盘并显示`* #`
`datetime` | 日期输入键盘, `Android`上会显示`: -`
`emailAddress` | 电子邮件地址,会显示`@ .`
`url` | 连接输入键盘, 会显示`/ .`


### textInputAction

决定键盘右下角按钮显示的内容, `TextInputAction`枚举值

`textInputAction` | 样式
---|---
`none` | 不支持`iOS`
`unspecified` | 显示`return`
`done` | 显示`Done`
`go` | 显示`Go`
`search` | 显示`Search`
`send` | 显示`Send`
`next` | 显示`Next`
`previous` | 不支持`iOS`
`continueAction` | 显示`Continue`
`join` | 显示`Join`
`route` | 显示`Route`
`emergencyCall` | 显示`Emergency Call`
`newline`


### textCapitalization

设置什么状态下使用大写字母键盘`TextCapitalization`枚举值

```dart
enum TextCapitalization {
  // 每个单词的第一个字母使用大写字母
  words,
  // 默认为每个句子的第一个字母使用大写键盘。
  sentences,
  // 每个字符默认使用大写键盘
  characters,
  /// 不使用大写字母键盘
  none,
}
```


### textAlign

输入框内文本在水平方向的对齐方式

```dart
// 默认值
this.textAlign = TextAlign.start

// 所有枚举值
left: 左对齐
right: 右对齐
center: 居中
start: 起始位置, 和textDirection有关
end: 终点位置, 和textDirection有关
justify: 文本的拉伸行，以软换行符结束，以填充容器的宽度
```

### textDirection

决定文本是从右向左对其还是从左向右对齐

```dart
enum TextDirection {
  rtl,
  ltr,
}
```

### inputFormatters

- 用于限制输入的内容，接收一个`TextInputFormatter`类型的集合
- `TextInputFormatter`是一个抽象类, 官方给我们提供了他的三个子类，分别是
  - `WhitelistingTextInputFormatter`: 白名单校验，也就是只允许输入符合规则的字符
  - `BlacklistingTextInputFormatter`: 黑名单校验，除了规定的字符其他的都可以输入
  - `LengthLimitingTextInputFormatter`: 长度限制，跟maxLength作用类似
- 构造函数如下

```dart
// 白名单校验
WhitelistingTextInputFormatter(this.whitelistedPattern)
// 黑名单校验
BlacklistingTextInputFormatter(
    this.blacklistedPattern, {
    // 当输入禁止输入的字符时候, 会被替换成设置的replacementString字符
    this.replacementString = '',
})
// 长度校验
LengthLimitingTextInputFormatter(this.maxLength)

// whitelistedPattern和blacklistedPattern都是Pattern类型的,
abstract class RegExp implements Pattern {
    external factory RegExp(String source,
      {bool multiLine: false, bool caseSensitive: true});
}
```

使用介绍

```dart
// 白名单
inputFormatters: [
    // 只能输入数字
    WhitelistingTextInputFormatter.digitsOnly,
    // 是能输入小写字母
    WhitelistingTextInputFormatter(RegExp("[a-z]"))
],

// 黑名单
inputFormatters: [
    // 不能输入回车符
    BlacklistingTextInputFormatter.singleLineFormatter,
    // 不能输入小写字母
    BlacklistingTextInputFormatter(RegExp("[a-z]"), replacementString: '-')
],

// 字符限制
[LengthLimitingTextInputFormatter(10)]

// 也可是三种或两种一起使用一起使用
inputFormatters: [
  // 不能输入小写字母
  BlacklistingTextInputFormatter(RegExp("[a-z]")),
  // 限制输入10个字符
  LengthLimitingTextInputFormatter(10)
],
```


### 光标设置

设置输入框光标的样式

```dart
// 光标的宽度
this.cursorWidth = 2.0,
// 光标的圆角
this.cursorRadius,
// 光标的颜色
this.cursorColor,

// 示例如下
cursorWidth: 10,
cursorColor: Colors.cyan,
cursorRadius: Radius.circular(5),
```


### enableInteractiveSelection

长按输入的文本, 设置是否显示剪切，复制，粘贴按钮, 默认是显示的

```dart
// 默认值
this.enableInteractiveSelection = true,
```

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/textfield_true.png)


### 事件监听

```dart
// 输入文本发生变化时的回调，参数即为输入框中的值
onChanged: (val) {
    print(val);
},

// 点击键盘的动作按钮时的回调，没有参数
onEditingComplete: (){
    print("点击了键盘上的动作按钮");
},

// 点击键盘的动作按钮时的回调，参数为当前输入框中的值
onSubmitted: (val){
    print("点击了键盘上的动作按钮，当前输入框的值为：${val}");
},

// 点击输入框时的回调(){}, 没有参数
onTap: (){
    print('点击输入框');
},
```


## Form

- 实际业务中，在正式向服务器提交数据前，都会对各个输入框数据进行合法性校验，但是对每一个`TextField`都分别进行校验将会是一件很麻烦的事
- `Flutter`提供了一个表单`Form`，它可以对输入框进行分组，然后进行一些统一操作，如输入内容校验、输入框重置以及输入内容保存。
- `Form`继承自`StatefulWidget`对象，它对应的状态类为`FormState`

```dart
// Form类的定义
const Form({
    Key key,
    @required this.child,
    
    // 是否自动校验输入内容；当为true时，每一个子FormField内容发生变化时都会自动校验合法性，并直接显示错误信息。否则，需要通过调用FormState.validate()来手动校验
    this.autovalidate = false,
    
    // 决定Form所在的路由是否可以直接返回（如点击返回按钮），该回调返回一个Future对象，如果Future的最终结果是false，则当前路由不会返回；如果为true，则会返回到上一个路由。此属性通常用于拦截返回按钮
    this.onWillPop,
    
    // Form的任意一个子FormField内容发生变化时会触发此回调
    this.onChanged,
})
```

### FormField

`Form`的子元素必须是`FormField`类型，`FormField`是一个抽象类，`FormState`内部通过定义的属性来完成操作，`FormField`部分定义如下：

```dart
const FormField({
    Key key,
    @required this.builder,
    // 保存回调
    this.onSaved,
    // 验证回调
    this.validator,
    // 初始值
    this.initialValue,
    // 是否自动校验。
    this.autovalidate = false,
    this.enabled = true,
})
```

### TextFormField

为了方便使用，`Flutter`提供了一个`TextFormField`，它继承自`FormField`类，也是`TextField`的一个包装类，所以除了`FormField`定义的属性之外，它还包括`TextField`的属性。

```dart
class TextFormField extends FormField<String> {
  
  TextFormField({
    Key key,
    this.controller,
    String initialValue,
    FocusNode focusNode,
    InputDecoration decoration = const InputDecoration(),
    TextInputType keyboardType,
    TextCapitalization textCapitalization = TextCapitalization.none,
    TextInputAction textInputAction,
    TextStyle style,
    TextDirection textDirection,
    TextAlign textAlign = TextAlign.start,
    bool autofocus = false,
    bool obscureText = false,
    bool autocorrect = true,
    bool autovalidate = false,
    bool maxLengthEnforced = true,
    int maxLines = 1,
    int maxLength,
    VoidCallback onEditingComplete,
    ValueChanged<String> onFieldSubmitted,
    FormFieldSetter<String> onSaved,
    FormFieldValidator<String> validator,
    List<TextInputFormatter> inputFormatters,
    bool enabled = true,
    Brightness keyboardAppearance,
    EdgeInsets scrollPadding = const EdgeInsets.all(20.0),
    bool enableInteractiveSelection = true,
  })
}
```


### FormState

- `FormState`为`Form`的`State`类，可以通过`Form.of()`或`GlobalKey`获得。
- 我们可以通过它来对`Form`的子元素`FormField`进行统一操作
- 我们看看其常用的三个方法：

```dart
  // 调用此方法后，会调用Form子元素FormField的save回调，用于保存表单内容
  void save() {
    for (FormFieldState<dynamic> field in _fields)
      field.save();
  }

  /// 调用此方法后，会将子元素FormField的内容清空。
  void reset() {
    for (FormFieldState<dynamic> field in _fields)
      field.reset();
    _fieldDidChange();
  }

  /// 调用此方法后，会调用Form子元素FormField的validate回调，如果有一个校验失败，则返回false，所有校验失败项都会返回用户返回的错误提示。
  bool validate() {
    _forceRebuild();
    return _validate();
  }
```

### 需求示例

用户登录示例, 在提交之前校验：
- 用户名不能为空，如果为空则提示“用户名不能为空”。
- 密码不能小于6位，如果小于6为则提示“密码不能少于6位”。

```dart
class TextStateWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return TextWidget();
  }
}

class TextWidget extends State<TextStateWidget>  {
  TextEditingController _nameController = TextEditingController();
  TextEditingController _psdController = TextEditingController();
  GlobalKey _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 20, horizontal: 30),
      child: Form(
        key: _formKey,
        autovalidate: true,
        child: Column(
          children: <Widget>[
            TextFormField(
              autofocus: true,
              controller: _nameController,
              decoration: InputDecoration(
                labelText: '用户名',
                hintText: '用户名或密码',
                icon: Icon(Icons.person)
              ),
              validator: (value) {// 校验用户名
                return value.trim().length > 0 ? null : '用户名不能为空';
              },
            ),
            TextFormField(
              controller: _psdController,
              obscureText: true,
              decoration: InputDecoration(
                labelText: '密码',
                hintText: '登录密码',
                icon: Icon(Icons.lock)
              ),
              validator: (psd) {
                return psd.trim().length > 5 ? null : '密码不能少于6位';
              },
            ),
            Padding(
              padding: EdgeInsets.only(top: 30),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: RaisedButton(
                      padding: EdgeInsets.all(15),
                      child: Text('登录'),
                      color: Theme.of(context).primaryColor,
                      textColor: Colors.white,
                      onPressed: () {
                        // 反正这里我是没看懂, 后面再慢慢学习吧
                        if((_formKey.currentState as FormState).validate()){
                          //验证通过提交数据
                        }
                      },
                    ),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
```

![image](https://cdn.jsdelivr.net/gh/flutterchina/flutter-in-action@1.0/docs/imgs/image-20180904174217682.png)


> 好了, 到这里`TextField`相关的知识已经介绍完了, 下一篇应该就是介绍容器类`Widget`了, 拭目以待吧



## 参考文献

- [Flutter实战](https://book.flutterchina.club/chapter3/input_and_form.html)
- [Flutter官网](https://docs.flutter.io/flutter/material/TextField-class.html)



---





