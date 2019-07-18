---
title: Flutter之可滑动Widget
date: 2019-05-17 20:21:11
<!--updated: 2019-04-26 18:31:40 # 更新日期-->
<!--permalink: Flutter_Widget_TextField-->
tags: [Flutter, Widget, Dart]
categories: Flutter笔记
<!--keywords: 关键字-->
comments: true
<!--password: 文章密码-->
image:
---



![可滚动Widget](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/flutter_scroll.png)


<!--more-->

-  [Flutter和Dart系列文章](https://www.titanjun.top/categories/Flutter%E7%AC%94%E8%AE%B0/)和[代码GitHub地址](https://github.com/CoderTitan/Flutter_Widget)
- 在`Flutter`中, 当内容超过显示视图时，如果没有特殊处理，`Flutter`则会提示`Overflow`错误
- `Flutter`提供了多种可滚动（`Scrollable Widget`）用于显示列表和长布局
- 可滚动`Widget`都直接或间接包含一个`Scrollable`, 下面是常用的几个可滚动的`Widget`
  - `SingleChildScrollView`
  - `ListView`
  - `GridView`
  - `CustomScrollView`
  - 滚动监听及控制`ScrollController`

## Scrollbar

- `Scrollbar`是一个`Material`风格的滚动指示器（滚动条），如果要给可滚动`widget`添加滚动条，只需将`Scrollbar`作为可滚动`widget`的父`widget`即可
- `CupertinoScrollbar`是`iOS`风格的滚动条，如果你使用的是`Scrollbar`，那么在`iOS`平台它会自动切换为`CupertinoScrollbar`
- `Scrollbar`和`CupertinoScrollbar`都是通过`ScrollController`来监听滚动事件来确定滚动条位置，关于`ScrollController`详细的内容我们将在后面专门一节介绍
- 下面是`Scrollbar`和`CupertinoScrollbar`的构造函数, 都只有一个`child`属性, 用于接受一个可滚动的`Widget`


```dart
const Scrollbar({
    Key key,
    @required this.child,
})

const CupertinoScrollbar({
    Key key,
    @required this.child,
})
```

<div class="note info"><p>主轴和纵轴</p></div>

- 在可滚动`widget`的坐标描述中，通常将滚动方向称为主轴，非滚动方向称为纵轴。
- 由于可滚动`widget`的默认方向一般都是沿垂直方向，所以默认情况下主轴就是指垂直方向，水平方向同理


## SingleChildScrollView

`SingleChildScrollView`类似于开发中常用的`ScrollView`, 不再详细介绍了, 下面看一下具体使用介绍吧


```dart
const SingleChildScrollView({
    Key key,
    // 设置滚动的方向, 默认垂直方向
    this.scrollDirection = Axis.vertical,
    // 设置显示方式
    this.reverse = false,
    // 内边距
    this.padding,
    // 是否使用默认的controller
    bool primary,
    // 设置可滚动Widget如何响应用户操作
    this.physics,
    this.controller,
    this.child,
})
```

### scrollDirection

设置视图的滚动方向(默认垂直方向), 需要对应的设置其子`Widget`是`Column`或者`Row`, 否则会报`Overflow`错误

```dart
scrollDirection: Axis.vertical,

// 枚举值
enum Axis {
  /// 水平滚动
  horizontal,
  /// 垂直滚动
  vertical,
}
```

### reverse

- 是否按照阅读方向相反的方向滑动
- 设置水平滚动时
  - 若`reverse: false`，则滚动内容头部和左侧对其, 那么滑动方向就是从左向右
  - `reverse: true`时，则滚动内容尾部和右侧对其, 那么滑动方向就是从右往左。
- 其实此属性本质上是决定可滚动`widget`的初始滚动位置是在头还是尾，取`false`时，初始滚动位置在头，反之则在尾

### physics

- 此属性接受一个`ScrollPhysics`对象，它决定可滚动`Widget`如何响应用户操作
- 比如用户滑动完抬起手指后，继续执行动画；或者滑动到边界时，如何显示。
- 默认情况下，`Flutter`会根据具体平台分别使用不同的`ScrollPhysics`对象，应用不同的显示效果，如当滑动到边界时，继续拖动的话，在`iOS`上会出现弹性效果，而在`Android`上会出现微光效果。
- 如果你想在所有平台下使用同一种效果，可以显式指定，`Flutter SDK`中包含了两个`ScrollPhysics`的子类可以直接使用：
    - `ClampingScrollPhysics`：安卓下微光效果。
    - `BouncingScrollPhysics`：`iOS`下弹性效果。


### controller

- 此属性接受一个`ScrollController`对象
- `ScrollController`的主要作用是控制滚动位置和监听滚动事件。
- 默认情况下，`widget`中会有一个默认的`PrimaryScrollController`，如果子`widget`中的可滚动`widget`没有显式的指定`controller`并且`primary`属性值为`true`时（默认就为`true`），可滚动`widget`会使用这个默认的`PrimaryScrollController`
- 这种机制带来的好处是父`widget`可以控制子树中可滚动`widget`的滚动，例如，`Scaffold`使用这种机制在`iOS`中实现了"回到顶部"的手势


### 代码示例

```dart
class ScrollView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Scrollbar(
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        reverse: true,
        padding: EdgeInsets.all(0.0),
        physics: BouncingScrollPhysics(),
        child: Center(
          child: Column( 
            //动态创建一个List<Widget>  
            children: str.split("") 
                //每一个字母都用一个Text显示,字体为原来的两倍
                .map((c) => Text(c, textScaleFactor: 2.0)) 
                .toList(),
          ),
        ),
      ),
    );
  }
}
```


## ListView

- `ListView`是最常用的可滚动`widget`，它可以沿一个方向线性排布所有子`widget`, 类似于`ReactNative`中的`ListView`
- `ListView`共有四种构造函数
  - `ListView()`默认构造函数
  - `ListView.builder()`
  - `ListView.separated()`
  - `ListView custom()`

```dart
ListView({
    // 公共参数上面都介绍过了
    Key key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController controller,
    bool primary,
    ScrollPhysics physics,
    EdgeInsetsGeometry padding,
    
    // 是否根据子widget的总长度来设置ListView的长度，默认值为false
    bool shrinkWrap = false,
    // cell高度
    this.itemExtent,
    // 子widget是否包裹在AutomaticKeepAlive中
    bool addAutomaticKeepAlives = true,
    // 子widget是否包裹在RepaintBoundary中
    bool addRepaintBoundaries = true,
    bool addSemanticIndexes = true,
    // 设置预加载的区域, moren 0.0
    double cacheExtent,
    //子widget列表
    List<Widget> children = const <Widget>[],
    // 子widget的个数
    int semanticChildCount,
})
```

### 属性介绍

#### shrinkWrap

- 表示是否根据子`widget`的总长度来设置`ListView`的长度，默认值为`false` 。
- 默认情况下，`ListView`的会在滚动方向尽可能多的占用空间
- 当`ListView`在一个无边界(滚动方向上)的容器中时，`shrinkWrap`必须为`true`


#### itemExtent

- 该参数如果不为`null`，则会强制`children`的"长度"为`itemExtent`的值
- 这里的"长度"是指滚动方向上子`widget`的长度，即如果滚动方向是垂直方向，则代表子`widget`的高度，如果滚动方向为水平方向，则代表子`widget`的长度
- 在`ListView`中，指定`itemExtent`比让子`widget`自己决定自身长度会更高效，这是因为指定`itemExtent`后，滚动系统可以提前知道列表的长度，而不是总是动态去计算，尤其是在滚动位置频繁变化时


#### addAutomaticKeepAlives

- 表示是否将列表项包裹在`AutomaticKeepAlive`中
- 在一个懒加载列表中，如果将列表项包裹在`AutomaticKeepAlive`中，在该列表项滑出视口时该列表项不会被GC，它会使用`KeepAliveNotification`来保存其状态
- 如果列表项自己维护其`KeepAlive`状态，那么此参数必须置为`false`


#### addRepaintBoundaries

- 性表示是否将列表项包裹在`RepaintBoundary`中
- 当可滚动`widget`滚动时，将列表项包裹在`RepaintBoundary`中可以避免列表项重绘，但是当列表项重绘的开销非常小（如一个颜色块，或者一个较短的文本）时，不添加`RepaintBoundary`反而会更高效
- 和`addAutomaticKeepAlive`一样，如果列表项自己维护其`KeepAlive`状态，那么此参数必须置为`false`


#### 使用示例

```dart
class ScrollView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      itemExtent: 60,
      cacheExtent: 100,
      addAutomaticKeepAlives: false,
      children: renderCell(),
    );
  }

  List<Widget> renderCell() {
    String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return str.split("")
    .map((item) => ListTile(
      title: Text('字母--$item'),
      subtitle: Text('这是字母列表'),
      leading: Icon(Icons.wifi),
    )).toList();
  }
}
```

### ListTile

- `ListTile`是`Flutter`给我们准备好的用于创建`ListView`的子`widget` 
- 提供非常常见的构造和定义方式，包括文字，icon，点击事件，一般是能够满足基本需求，但是就不能自己定义了

```dart
const ListTile({
    Key key,
    // 前置(左侧)图标, Widget类型
    this.leading,
    // 标题, Widget类型
    this.title,
    // 副标题, Widget类型
    this.subtitle,
    // 后置(右侧)图标, Widget类型
    this.trailing,
    // 是否三行显示, subtitle不为空时才能使用
    this.isThreeLine = false,
    // 设置为true后字体变小
    this.dense,
    // 内容的内边距
    this.contentPadding,
    // 是否可被点击
    this.enabled = true,
    // 点击事件
    this.onTap,
    // 长按操作事件
    this.onLongPress,
    // 是否是选中状态
    this.selected = false,
})

// 使用示例
return ListTile(
  title: Text('index--$index'),
  subtitle: Text('我是一只小鸭子, 咿呀咿呀哟; 我是一只小鸭子, 咿呀咿呀哟; 我是一只小鸭子, 咿呀咿呀哟;'),
  leading: Icon(Icons.wifi),
  trailing: Icon(Icons.keyboard_arrow_right),
  isThreeLine: true,
  dense: false,
  contentPadding: EdgeInsets.all(10),
  enabled: index % 3 != 0,
  onTap: () => print('index = $index'),
  onLongPress: () => print('long-Index = $index'),
  selected: index % 2 == 0,
);
```


### ListView.builder

- `ListView.builder`适合列表项比较多（或者无限）的情况，因为只有当子`Widget`真正显示的时候才会被创建
- 适用于自定义子`Widget`且所有子`Widget`的样式一样

```dart
ListView.builder({
    Key key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController controller,
    bool primary,
    ScrollPhysics physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry padding,
    this.itemExtent,
    // 
    @required IndexedWidgetBuilder itemBuilder,
    // 列表项的数量，如果为null，则为无限列表
    int itemCount,
    bool addAutomaticKeepAlives = true,
    bool addRepaintBoundaries = true,
    bool addSemanticIndexes = true,
    double cacheExtent,
    int semanticChildCount,
})
```

#### itemCount

列表项的数量，如果为null，则为无限列表

#### itemBuilder

- 它是列表项的构建器，类型为`IndexedWidgetBuilder`，返回值为一个`widget`
- 当列表滚动到具体的`index`位置时，会调用该构建器构建列表项


#### 代码示例

```dart
class ListBuild extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return ListView.builder(
        itemCount: 30,
        itemBuilder: (content, index) {
          return ListTile(
            title: Text('index--$index'),
            subtitle: Text('数字列表'),
            leading: Icon(Icons.wifi),
          );
        },
      );
    }
}
```

### ListView.separated

`ListView.separated`可以生成列表项之间的分割器，它除了比`ListView.builder`多了一个`separatorBuilder`参数外, 其他参数都一样

```dart
ListView.separated({
    Key key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController controller,
    bool primary,
    ScrollPhysics physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry padding,
    @required IndexedWidgetBuilder itemBuilder,
    // 一个分割生成器
    @required IndexedWidgetBuilder separatorBuilder,
    @required int itemCount,
    bool addAutomaticKeepAlives = true,
    bool addRepaintBoundaries = true,
    bool addSemanticIndexes = true,
    double cacheExtent,
})
```

#### separatorBuilder

该参数是一个分割生成器, 同样是一个`IndexedWidgetBuilder`类型的参数

```dart
typedef IndexedWidgetBuilder = Widget Function(BuildContext context, int index);
```

#### 代码示例

奇数行添加一条红色下划线，偶数行添加一条蓝色下划线。

```dart
lass SeparatedList extends StatelessWidget {
  //下划线widget预定义以供复用。  
  Widget lineView1 = Divider(color: Colors.red, height: 2, indent: 10,);
  Widget lineView2 = Divider(color: Colors.blue, height: 5, indent: 30);

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return ListView.separated(
      itemCount: 30,
        itemBuilder: (content, index) {
          return ListTile(
            title: Text('index--$index'),
            subtitle: Text('数字列表'),
            leading: Icon(Icons.wifi),
          );
        },
        separatorBuilder: (context, index) {
          return index % 2 == 0 ? lineView1 : lineView2;
        },
    );
  }
}
```

### Divider

设置每一个子`WIdget`的分割线

```dart
const Divider({
    Key key,
    // 分割线所在的SizedBox的高度, 除内边距之外的距离上面的间距
    this.height = 16.0,
    // 分割线左侧间距
    this.indent = 0.0,
    // 分割线颜色
    this.color
})
```

### ListView.custom

- 大家可能对前两种比较熟悉，分别是传入一个子元素列表或是传入一个根据索引创建子元素的函数。
- 其实前两种方式都是`custom`方式的“快捷方式”
- `ListView`内部是靠这个`childrenDelegate`属性动态初始化子元素的
- 我们使用`builder`和`separated`比较多，这个`custom`相对来说就比较少了

```dart
const ListView.custom({
    Key key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController controller,
    bool primary,
    ScrollPhysics physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry padding,
    this.itemExtent,
    // 动态初始化子元素
    @required this.childrenDelegate,
    double cacheExtent,
    int semanticChildCount,
})
```

#### childrenDelegate

其实在`ListView`的前面几种构造函数中, 都默认设置了`childrenDelegate`这个属性, 更多可参考官方文档

```dart
// ListView
ListView({
    // ...
  }) : childrenDelegate = SliverChildListDelegate(
         children,
         addAutomaticKeepAlives: addAutomaticKeepAlives,
         addRepaintBoundaries: addRepaintBoundaries,
         addSemanticIndexes: addSemanticIndexes,
       ), super();

// ListView.builder
ListView.builder({
    // ...
  }) : childrenDelegate = SliverChildBuilderDelegate(
         itemBuilder,
         childCount: itemCount,
         addAutomaticKeepAlives: addAutomaticKeepAlives,
         addRepaintBoundaries: addRepaintBoundaries,
         addSemanticIndexes: addSemanticIndexes,
       ), super();

// ListView.separated
ListView.separated({
    // ...
  }) : childrenDelegate = SliverChildBuilderDelegate(
         // ...
       ), super();
```

- 上面代码中可见，这里自动帮我们创建了一个`SliverChildListDelegate`的实例
- 而`SliverChildListDelegate`是抽象类`SliverChildDelegate`的子类
- `SliverChildListDelegate`中主要逻辑就是实现了`SliverChildDelegate`中定义的`build`方法

```dart
Widget build(BuildContext context, int index) {
    assert(builder != null);
    if (index < 0 || (childCount != null && index >= childCount))
      return null;
    Widget child;
    try {
      child = builder(context, index);
    } catch (exception, stackTrace) {
      child = _createErrorWidget(exception, stackTrace);
    }
    if (child == null)
      return null;
    if (addRepaintBoundaries)
      child = RepaintBoundary.wrap(child, index);
    if (addSemanticIndexes) {
      final int semanticIndex = semanticIndexCallback(child, index);
      if (semanticIndex != null)
        child = IndexedSemantics(index: semanticIndex + semanticIndexOffset, child: child);
    }
    if (addAutomaticKeepAlives)
      child = AutomaticKeepAlive(child: child);
    return child;
}
```

- 从上面代码的逻辑可以看出, 就是根据传入的索引返回`children`列表中对应的元素
- 每当`ListView`的底层实现需要加载一个元素时，就会把该元素的索引传递给`SliverChildDelegate`的`build`方法，由该方法返回具体的元素
- 另外在`SliverChildDelegate`内部，除了定义了`build`方法外，还定义了 一个名为`didFinishLayout`的方法

```dart
void didFinishLayout() {
    assert(debugAssertChildListLocked());
    final int firstIndex = _childElements.firstKey() ?? 0;
    final int lastIndex = _childElements.lastKey() ?? 0;
    widget.delegate.didFinishLayout(firstIndex, lastIndex);
}
```

- 每当`ListView`完成一次`layout`之后都会调用该方法, 同时传入两个索引值
- 这两个值分别是此次`layout`中第一个元素和最后一个元素在`ListView`所有子元素中的索引值, 也就是可视区域内的元素在子元素列表中的位置
- 然而不论是`SliverChildListDelegate`还是`SliverChildBuilderDelegate`的代码中，都没有`didFinishLayout`的具体实现。所以我们需要编写一个它们的子类

```dart
class MySliverBuilderDelegate extends SliverChildBuilderDelegate {
  MySliverBuilderDelegate(
    Widget Function(BuildContext, int) builder, {
    int childCount,
    bool addAutomaticKeepAlives = true,
    bool addRepaintBoundaries = true,
  }) : super(builder,
            childCount: childCount,
            addAutomaticKeepAlives: addAutomaticKeepAlives,
            addRepaintBoundaries: addRepaintBoundaries);

  @override
  void didFinishLayout(int firstIndex, int lastIndex) {
    print('firstIndex: $firstIndex, lastIndex: $lastIndex');
  }
}
```

然后我们创建一个`ListView.custom`的列表视图

```dart
class CustomList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return ListView.custom(
      childrenDelegate: MySliverBuilderDelegate(
        (BuildContext context, int index) {
          return ListTile(
            title: Text('index--$index'),
            subtitle: Text('数字列表'),
            leading: Icon(Icons.wifi),
          );
        }, childCount: 30,
      ),
    );
  }
}
```

## GridView

`GridView`可以构建二维网格列表, 系统给出了五中构造函数
- `GridView()`
- `GridView.count`
- `GridView.extent`
- `GridView.builder`
- `GridView.custom`


```dart
// 默认构造函数
GridView({
    Key key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController controller,
    bool primary,
    ScrollPhysics physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry padding,
    @required this.gridDelegate,
    bool addAutomaticKeepAlives = true,
    bool addRepaintBoundaries = true,
    bool addSemanticIndexes = true,
    double cacheExtent,
    List<Widget> children = const <Widget>[],
    int semanticChildCount,
})
```

- 可以看到, 除了`gridDelegate`属性外, 其他属性和`ListView`的属性都一样, 含义也都相同
- `gridDelegate`参数的类型是`SliverGridDelegate`，它的作用是控制`GridView`子`widget`如何排列
- `SliverGridDelegate`是一个抽象类，定义了`GridView`排列相关接口，子类需要通过实现它们来实现具体的布局算法
- `Flutter`中提供了两个`SliverGridDelegate`的子类`SliverGridDelegateWithFixedCrossAxisCount`和`SliverGridDelegateWithMaxCrossAxisExtent`, 下面我们分别介绍

### SliverGridDelegateWithFixedCrossAxisCount

该子类实现了一个横轴为固定数量子元素的排列算法，其构造函数为：

```dart
const SliverGridDelegateWithFixedCrossAxisCount({
    // 横轴子元素的数量,此属性值确定后子元素在横轴的长度就确定了,即ViewPort横轴长度/crossAxisCount。
    @required this.crossAxisCount,
    // 主轴方向的间距
    this.mainAxisSpacing = 0.0,
    // 侧轴方向子元素的间距
    this.crossAxisSpacing = 0.0,
    // 子元素在侧轴长度和主轴长度的比例, 由于crossAxisCount指定后子元素横轴长度就确定了，然后通过此参数值就可以确定子元素在主轴的长度
    this.childAspectRatio = 1.0,
})
```

从上面的个属性可以发现，子元素的大小是通过`crossAxisCount`和`childAspectRatio`两个参数共同决定的。注意，这里的子元素指的是子`widget`的最大显示空间，注意确保子`widget`的实际大小不要超出子元素的空间, 代码示例如下
  

```dart
class ScrollView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GridView(
      padding: EdgeInsets.all(10),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        childAspectRatio: 1,
        mainAxisSpacing: 10,
        crossAxisSpacing: 10
      ),
      children: <Widget>[
        Container(color: Colors.orange),
        Container(color: Colors.blue),
        Container(color: Colors.orange),
        Container(color: Colors.yellow),
        Container(color: Colors.pink)
      ],
    );
  }
}
```

### GridView.count

`GridView.count`构造函数内部使用了`SliverGridDelegateWithFixedCrossAxisCount`，我们通过它可以快速的创建横轴固定数量子元素的`GridView`

```dart
GridView.count({
    Key key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController controller,
    bool primary,
    ScrollPhysics physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry padding,
    @required int crossAxisCount,
    double mainAxisSpacing = 0.0,
    double crossAxisSpacing = 0.0,
    double childAspectRatio = 1.0,
    bool addAutomaticKeepAlives = true,
    bool addRepaintBoundaries = true,
    bool addSemanticIndexes = true,
    double cacheExtent,
    List<Widget> children = const <Widget>[],
    int semanticChildCount,
})
```

上面`SliverGridDelegateWithFixedCrossAxisCount`中给出的示例代码等价于：

```dart
class CountGridView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return GridView.count(
      padding: EdgeInsets.all(10),
      crossAxisCount: 3,
      mainAxisSpacing: 10,
      crossAxisSpacing: 10,
      childAspectRatio: 1,
      children: <Widget>[
        Container(color: Colors.orange),
        Container(color: Colors.blue),
        Container(color: Colors.orange),
        Container(color: Colors.yellow),
        Container(color: Colors.pink)
      ],
    );
  }
}
```



### SliverGridDelegateWithMaxCrossAxisExtent

该子类实现了一个侧轴子元素为固定最大长度的排列算法，其构造函数为：

```dart
const SliverGridDelegateWithMaxCrossAxisExtent({
    @required this.maxCrossAxisExtent,
    this.mainAxisSpacing = 0.0,
    this.crossAxisSpacing = 0.0,
    this.childAspectRatio = 1.0,
})
```

- `maxCrossAxisExtent`为子元素在侧轴上的最大长度，之所以是“最大”长度，是因为横轴方向每个子元素的长度仍然是等分的
- 同样侧轴上子`Widget`的个数, 也是由该属性决定
- 其它参数和`SliverGridDelegateWithFixedCrossAxisCount`相同

```dart
class ExtentScrollView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GridView(
      padding: EdgeInsets.all(10),
      gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 100,
        childAspectRatio: 1,
        mainAxisSpacing: 10,
        crossAxisSpacing: 10
      ),
      children: <Widget>[
        Container(color: Colors.orange),
        Container(color: Colors.blue),
        Container(color: Colors.orange),
        Container(color: Colors.yellow),
        Container(color: Colors.pink)
      ],
    );
  }
}
```

### GridView.extent

同样`GridView.extent`构造函数内部使用了`SliverGridDelegateWithMaxCrossAxisExtent`，我们通过它可以快速的创建侧轴子元素为固定最大长度的的`GridView`

```dart
GridView.extent({
    Key key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController controller,
    bool primary,
    ScrollPhysics physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry padding,
    @required double maxCrossAxisExtent,
    double mainAxisSpacing = 0.0,
    double crossAxisSpacing = 0.0,
    double childAspectRatio = 1.0,
    bool addAutomaticKeepAlives = true,
    bool addRepaintBoundaries = true,
    bool addSemanticIndexes = true,
    List<Widget> children = const <Widget>[],
    int semanticChildCount,
})
```

上面`SliverGridDelegateWithMaxCrossAxisExtent`中给出的示例代码等价于：

```dart
class ExtentScrollView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GridView.extent(
      padding: EdgeInsets.all(10),
      maxCrossAxisExtent: 100,
      childAspectRatio: 1,
      mainAxisSpacing: 10,
      crossAxisSpacing: 10,
      children: <Widget>[
        Container(color: Colors.orange),
        Container(color: Colors.blue),
        Container(color: Colors.orange),
        Container(color: Colors.yellow),
        Container(color: Colors.pink)
      ],
    );
  }
}
```

### GridView.builder

- 上面我们介绍的`GridView`都需要一个`Widget`数组作为其子元素，这些方式都会提前将所有子`widget`都构建好，所以只适用于子`Widget`数量比较少时
- 当子`widget`比较多时，我们可以通过`GridView.builder`来动态创建子`Widget`


```dart
GridView.builder({
    Key key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController controller,
    bool primary,
    ScrollPhysics physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry padding,
    @required this.gridDelegate,
    @required IndexedWidgetBuilder itemBuilder,
    int itemCount,
    bool addAutomaticKeepAlives = true,
    bool addRepaintBoundaries = true,
    bool addSemanticIndexes = true,
    double cacheExtent,
    int semanticChildCount,
})
```

- 可以看出`GridView.builder`必须指定的参数有两个,其中`gridDelegate`之前已经介绍过了
- 属性`itemBuilder`在之前`ListView`中也有介绍过类似的, 用于构建子`Widget`
- 使用示例如下

```dart
class BuilderGridView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      itemCount: 50,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 4,
        mainAxisSpacing: 10,
        crossAxisSpacing: 10
      ),
      itemBuilder: (content, index) {
        return Container(
          color: Colors.orange,
          child: Center(
            child: Text('$index'),
          ),
        );
      },
    );
  }
}
```


### GridView.custom

和`ListView.custom`一样, 用于构建自定义子`Widget`, 有两个必须指定的参数, 这里就不在赘述了

```dart
const GridView.custom({
    Key key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController controller,
    bool primary,
    ScrollPhysics physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry padding,
    @required this.gridDelegate,
    @required this.childrenDelegate,
    double cacheExtent,
    int semanticChildCount,
})
```


## CustomScrollView

- `CustomScrollView`使用`sliver`来自定义滚动模型（效果, 它可以包含多种滚动模型
- 假设有一个页面，顶部需要一个`GridView`，底部需要一个`ListView`，而要求整个页面的滑动效果是统一的，即它们看起来是一个整体
- 如果使用`GridView+ListView`来实现的话，就不能保证一致的滑动效果，因为它们的滚动效果是分离的，所以这时就需要一个"胶水"，把这些彼此独立的可滚动`widget`"粘"起来，而`CustomScrollView`的功能就相当于“胶水”


```dart
const CustomScrollView({
    Key key,
    // 滑动方向
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController controller,
    bool primary,
    ScrollPhysics physics,
    bool shrinkWrap = false,
    double cacheExtent,
    this.slivers = const <Widget>[],
    int semanticChildCount,
})
```

上述属性除了`slivers`之外, 前面都有提到过, 接受一个`Widget`数组, 但是这里的`Widget`必须是`Sliver`类型的, 至于原因, 下面会详解


<div class="note warning"><p>什么是`Sliver` ??</p></div>

- 在`Flutter`中，`Sliver`通常指具有特定滚动效果的可滚动块
- 可滚动`widget`，如`ListView`、`GridView`等都有对应的`Sliver`实现如`SliverList`、`SliverGrid`等
- 对于大多数`Sliver`来说，它们和可滚动`Widget`最主要的区别是`Sliver`不会包含`Scrollable`，也就是说`Sliver`本身不包含滚动交互模型
- 正因如此，`CustomScrollView`才可以将多个`Sliver`"粘"在一起，这些`Sliver`共用`CustomScrollView`的`Scrollable`，最终实现统一的滑动效果
- 前面之所以说“大多数“`Sliver`都和可滚动`Widget`对应，是由于还有一些如`SliverPadding`、`SliverAppBar`等是和可滚动`Widget`无关的
- 它们主要是为了结合`CustomScrollView`一起使用，这是因为`CustomScrollView`的子`widget`必须都是`Sliver`


### SliverAppBar

- `AppBar`和`SliverAppBar`是`Material Design`中的导航栏
- `AppBar`和`SliverAppBar`都是继承`StatefulWidget`类，二者的区别在于`AppBar`位置的固定的应用最上面的；而`SliverAppBar`是可以跟随内容滚动的
- 其中大部分的属性和`AppBar`都一样


```dart
const SliverAppBar({
    Key key,
    // 导航栏左侧weidget
    this.leading,
    // 如果leading为null，是否自动实现默认的leading按钮
    this.automaticallyImplyLeading = true,
    // 导航栏标题
    this.title,
    // 导航栏右侧按钮, 接受一个数组
    this.actions,
    // 一个显示在AppBar下方的控件，高度和AppBar高度一样，可以实现一些特殊的效果，该属性通常在SliverAppBar中使用
    this.flexibleSpace,
    // 一个AppBarBottomWidget对象, 设置TabBar
    this.bottom,
    //中控件的z坐标顺序，默认值为4，对于可滚动的SliverAppBar，当 SliverAppBar和内容同级的时候，该值为0，当内容滚动 SliverAppBar 变为 Toolbar 的时候，修改elevation的值
    this.elevation = 4.0,
    // 背景颜色，默认值为 ThemeData.primaryColor。改值通常和下面的三个属性一起使用
    this.backgroundColor,
    // 状态栏的颜色, 黑白两种, 取值: Brightness.dark
    this.brightness,
    // 设置导航栏上图标的颜色、透明度、和尺寸信息
    this.iconTheme,
    // 设置导航栏上文字样式
    this.textTheme,
    // 导航栏的内容是否显示在顶部, 状态栏的下面
    this.primary = true,
    // 标题是否居中显示，默认值根据不同的操作系统，显示方式不一样
    this.centerTitle,
    // 标题间距，如果希望title占用所有可用空间，请将此值设置为0.0
    this.titleSpacing = NavigationToolbar.kMiddleSpacing,
    // 展开的最大高度
    this.expandedHeight,
    // 是否随着华东隐藏标题
    this.floating = false,
    // 是否固定在顶部
    this.pinned = false,
    // 只跟floating相对应，如果为true，floating必须为true，也就是向下滑动一点儿，整个大背景就会动画显示全部，网上滑动整个导航栏的内容就会消失
    this.snap = false,
})
```

### 使用示例

```dart
class CustomScrollViewTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //因为本路由没有使用Scaffold，为了让子级Widget(如Text)使用
    //Material Design 默认的样式风格,我们使用Material作为本路由的根。
    return Material(
      child: CustomScrollView(
        slivers: <Widget>[
          //AppBar，包含一个导航栏
          SliverAppBar(
            pinned: true,
            expandedHeight: 250.0,
            flexibleSpace: FlexibleSpaceBar(
              title: const Text('Demo'),
              background: Image.asset(
                "./images/avatar.png", fit: BoxFit.cover,),
            ),
          ),

          SliverPadding(
            padding: const EdgeInsets.all(8.0),
            sliver: new SliverGrid( //Grid
              gridDelegate: new SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, //Grid按两列显示
                mainAxisSpacing: 10.0,
                crossAxisSpacing: 10.0,
                childAspectRatio: 4.0,
              ),
              delegate: new SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  //创建子widget      
                  return new Container(
                    alignment: Alignment.center,
                    color: Colors.cyan[100 * (index % 9)],
                    child: new Text('grid item $index'),
                  );
                },
                childCount: 20,
              ),
            ),
          ),
          //List
          new SliverFixedExtentList(
            itemExtent: 50.0,
            delegate: new SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  //创建列表项      
                  return new Container(
                    alignment: Alignment.center,
                    color: Colors.lightBlue[100 * (index % 9)],
                    child: new Text('list item $index'),
                  );
                },
                childCount: 50 //50个列表项
            ),
          ),
        ],
      ),
    );
  }
}
```


## ScrollController

- `ScrollController`用于控制可滚动`widget`的滚动位置，这里以`ListView`为例，展示一下`ScrollController`的具体用法
- 最后再介绍一下路由切换时如何来保存滚动位置
- 下面先看一下`ScrollController`的构造函数

```dart
ScrollController({
    // 初始滚动位置
    double initialScrollOffset = 0.0,
    // 是否保存滚动位置
    this.keepScrollOffset = true,
    // 调试使用的输出标签
    this.debugLabel,
})
```

### 相关属性和方法

#### offset

可滚动`Widget`当前滚动的位置


#### jumpTo()

跳转到指定的位置, 没有动画效果

```dart
void jumpTo(double value) {
    assert(_positions.isNotEmpty, 'ScrollController not attached to any scroll views.');
    for (ScrollPosition position in List<ScrollPosition>.from(_positions))
      position.jumpTo(value);
}
```


#### animateTo()

跳转到指定的位置, 跳转时会有一个动画效果

```dart
Future<void> animateTo(double offset, {
    @required Duration duration,
    @required Curve curve,
  }) {
    assert(_positions.isNotEmpty, 'ScrollController not attached to any scroll views.');
    final List<Future<void>> animations = List<Future<void>>(_positions.length);
    for (int i = 0; i < _positions.length; i += 1)
      animations[i] = _positions[i].animateTo(offset, duration: duration, curve: curve);
    return Future.wait<void>(animations).then<void>((List<void> _) => null);
}
```

#### positions

- 一个`ScrollController`可以同时被多个`Scrollable`使用，`ScrollController`会为每一个`Scrollable`创建一个`ScrollPosition`对象，这些`ScrollPosition`保存在`ScrollController`的`positions`属性中(是一个数组)
- `ScrollPosition`是真正保存滑动位置信息的对象，`offset`只是一个便捷属性, 其他更多属性可查看相关官方文档
- 一个`ScrollController`虽然可以对应多个`Scrollable`，但是有一些操作，如读取滚动位置`offset`，则需要一对一，但是我们仍然可以在一对多的情况下，通过其它方法读取滚动位置

```dart
// controller的offset属性
double get offset => position.pixels;

// 读取相关的滚动位置
controller.positions.elementAt(0).pixels
controller.positions.elementAt(1).pixels
```

#### 滚动监听

`ScrollController`间接继承自`Listenable`，我们可以根据`ScrollController`来监听滚动事件。如：

```dart
controller.addListener(()=>print(controller.offset))
```


### ScrollController控制原理

先看一下`ScrollController`另外几个方法的实现

```dart
// 创建一个存储位置信息的ScrollPosition
 ScrollPosition createScrollPosition(
    ScrollPhysics physics,
    ScrollContext context,
    ScrollPosition oldPosition,
  ) {
    return ScrollPositionWithSingleContext(
      physics: physics,
      context: context,
      initialPixels: initialScrollOffset,
      keepScrollOffset: keepScrollOffset,
      oldPosition: oldPosition,
      debugLabel: debugLabel,
    );
 }

 // 注册位置信息
 void attach(ScrollPosition position) {
    assert(!_positions.contains(position));
    _positions.add(position);
    position.addListener(notifyListeners);
  }

  // 注销位置信息
  void detach(ScrollPosition position) {
    assert(_positions.contains(position));
    position.removeListener(notifyListeners);
    _positions.remove(position);
  }

  // 销毁ScrollController
  @override
  void dispose() {
    for (ScrollPosition position in _positions)
      position.removeListener(notifyListeners);
    super.dispose();
  }
```

- 当`ScrollController`和`Scrollable`关联时，`Scrollable`首先会调用`ScrollController`的`createScrollPosition()`方法来创建一个`ScrollPosition`来存储滚动位置信息
- 然后`Scrollable`会调用`attach()`方法，将创建的`ScrollPosition`添加到`ScrollController`的`positions`属性中，这一步称为“注册位置”，只有注册后`animateTo()`和`jumpTo()`才可以被调用
- 当`Scrollable`销毁时，会调用`ScrollController`的`detach()`方法，将其`ScrollPosition`对象从`ScrollController`的`positions`属性中移除，这一步称为“注销位置”，注销后`animateTo()`和`jumpTo()`将不能再被调用
- 需要注意的是，`ScrollController`的`animateTo()`和`jumpTo()`内部会调用所有`ScrollPosition`的`animateTo()`和`jumpTo()`，以实现所有和该`ScrollController`关联的`Scrollable`都滚动到指定的位置


### 代码示例

创建一个`ListView`，当滚动位置发生变化时，我们先打印出当前滚动位置，然后判断当前位置是否超过1000像素，如果超过则在屏幕右下角显示一个“返回顶部”的按钮，该按钮点击后可以使`ListView`恢复到初始位置；如果没有超过1000像素，则隐藏“返回顶部”按钮。代码如下

```dart
class ScrollControllerTestRoute extends StatefulWidget {
  @override
  ScrollControllerTestRouteState createState() {
    return new ScrollControllerTestRouteState();
  }
}

class ScrollControllerTestRouteState extends State<ScrollControllerTestRoute> {
  ScrollController _controller = new ScrollController();
  bool showToTopBtn = false; //是否显示“返回到顶部”按钮

  @override
  void initState() {
    //监听滚动事件，打印滚动位置
    _controller.addListener(() {
      print(_controller.offset); //打印滚动位置
      if (_controller.offset < 1000 && showToTopBtn) {
        setState(() {
          showToTopBtn = false;
        });
      } else if (_controller.offset >= 1000 && showToTopBtn == false) {
        setState(() {
          showToTopBtn = true;
        });
      }
    });
  }

  @override
  void dispose() {
    //为了避免内存泄露，需要调用_controller.dispose
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("滚动控制")),
      body: Scrollbar(
        child: ListView.builder(
            itemCount: 100,
            itemExtent: 50.0, //列表项高度固定时，显式指定高度是一个好习惯(性能消耗小)
            controller: _controller,
            itemBuilder: (context, index) {
              return ListTile(title: Text("$index"),);
            }
        ),
      ),
      floatingActionButton: !showToTopBtn ? null : FloatingActionButton(
          child: Icon(Icons.arrow_upward),
          onPressed: () {
            //返回到顶部时执行动画
            _controller.animateTo(.0,
                duration: Duration(milliseconds: 200),
                curve: Curves.ease
            );
          }
      ),
    );
  }
}
```


## 参考文献

- [Flutter可滚动Widget](https://book.flutterchina.club/chapter6/)
- [Flutter中文网--可滚动Widget](https://flutterchina.club/widgets/scrolling/)




---

