---
title: ReactNaive之ScrollView和ListView
date: 2018-01-03 16:54
tags: [CSS, ScrollView, ListView]
categories: ReactNaive
---


- 记住ScrollView必须有一个确定的高度才能正常工作，因为它实际上所做的就是将一系列不确定高度的子组件装进一个确定高度的容器（通过滚动操作）
- 要给一个ScrollView确定一个高度的话，要么直接给它设置高度（不建议），要么确定所有的父容器都有确定的高度

<!-- more -->

![ListView.png](http://upload-images.jianshu.io/upload_images/4122543-45456c9ba9799576.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/200)

## ScrollView
### ScrollView常用的属性


```objc
horizontal bool 
//当此属性为true的时候，所有的子视图会在水平方向上排成一行，而不是默认的在垂直方向上排成一列。默认值为false。

showsHorizontalScrollIndicator bool
//当此属性为true的时候，显示一个水平方向的滚动条。
showsVerticalScrollIndicator bool
//当此属性为true的时候，显示一个垂直方向的滚动条。

alwaysBounceHorizontal bool 
//当此属性为true时，水平方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。当horizontal={true}时默认值为true，否则为false。

refreshControl element 
//指定RefreshControl组件，用于为ScrollView提供下拉刷新功能

(ios) alwaysBounceVertical bool
//当此属性为true时，垂直方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。
//当horizontal={true}时默认值为false，否则为true。

(ios) automaticallyAdjustContentInsets bool
//当滚动视图放在一个导航条或者工具条后面的时候，iOS系统是否要自动调整内容的范围。默认值为true。（译注：如果你的ScrollView或ListView的头部出现莫名其妙的空白，尝试将此属性置为false）

(ios) bounces bool
//当值为true时，如果内容范围比滚动视图本身大，在到达内容末尾的时候，可以弹性地拉动一截。如果为false，尾部的所有弹性都会被禁用，即使alwaysBounce*属性为true。默认值为true。

(ios) bouncesZoom bool 
//当值为true时，使用手势缩放内容可以超过min/max的限制，然后在手指抬起之后弹回min/max的缩放比例。否则的话，缩放不能超过限制。

(ios) contentInset {top: number, left: number, bottom: number, right: number} 
//内容范围相对滚动视图边缘的坐标。默认为{0, 0, 0, 0}

(ios) contentOffset PointPropType
//用来手动设置初始的滚动坐标。默认值为{x: 0, y: 0}

pagingEnabled bool
//当值为true时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上。默认值为false。

scrollEnabled bool
//当值为false的时候，内容不能滚动，默认值为true。

(ios) scrollEventThrottle number
//这个属性控制在滚动过程中，scroll事件被调用的频率（单位是每秒事件数量）。更大的数值能够更及时的跟踪滚动位置，不过可能会带来性能问题，因为更多的信息会通过bridge传递。默认值为0，意味着每次视图被滚动，scroll事件只会被调用一次。

(ios)scrollIndicatorInsets {top: number, left: number, bottom: number, right: number} 
//决定滚动条距离视图边缘的坐标。这个值应该和contentInset一样。默认值为{0, 0, 0, 0}。

(ios) scrollsToTop bool 
//当此值为true时，点击状态栏的时候视图会滚动到顶部。默认值为true。

stickyHeaderIndices [number]
//一个子视图下标的数组，用于决定哪些成员会在滚动之后固定在屏幕顶端。
//举个例子，传递stickyHeaderIndices={[0]}会让第一个成员固定在滚动视图顶端。
//这个属性不能和horizontal={true}一起使用。

(ios) maximumZoomScale number 
//允许的最大缩放比例。默认值为1.0。

(ios) minimumZoomScale number 
//允许的最小缩放比例。默认值为1.0。
```

### ScrollView常用的方法
- 开发中，常需要在滚动的时候做事情，那怎么监听ScrollView滚动

```objc
// 监听滚动开始
onMomentumScrollBegin={this._onMomentumScrollBegin.bind(this)}

// 监听滚动结束
onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}

// 监听开始拖拽
onScrollBeginDrag={this._onScrollBeginDrag.bind(this)}

// 监听结束拖拽
onScrollEndDrag={this._onScrollEndDrag.bind(this)}

// 监听滚动动画完成
onScrollAnimationEnd={this._onScrollAnimationEnd.bind(this)}

onMomentumScrollStart?: function 
//滚动动画开始时调用此函数。

onMomentumScrollEnd?: function 
//滚动动画结束时调用此函数。

// 监听滚动的时候
onScroll={this._onScroll.bind(this)}

// 设置滚动频率,一滚动就监听,需要和onScroll配套使用
scrollEventThrottle={1}


scrollTo(y: number | { x?: number, y?: number, animated?: boolean }, x: number, animated: boolean) 
//滚动到指定的x, y偏移处。第三个参数为是否启用平滑滚动动画。
//使用示例:
scrollTo({x: 0, y: 0, animated: true})

scrollToEnd(options?) 
//滚动到视图底部（水平方向的视图则滚动到最右边）。
//加上动画参数 scrollToEnd({animated: true})则启用平滑滚动动画，或是调用 scrollToEnd({animated: false})来立即跳转。如果不使用参数，则animated选项默认启用。
```

### 获取原生事件
- 滚动的时候,会传入一个合成事件作为监听滚动方法的参数，每个方法都会有这个合成事件
- 通过合成事件能获取原生事件`nativeEvent`,原生事件`nativeEvent`会有我们想要的信息.
- 什么是合成事件：在RN中，事件的处理由其内部自己实现的事件系统完成，触发的事件都叫做 合成事件（`SyntheticEven`t）

```objc
    // 滚动完成的时候调用
    _onMomentumScrollEnd(e){
        // 获取原生事件
        var nativeEvent = e.nativeEvent
        //获取当前偏移量
        var contentX = nativeEvent.contentOffset.x
        //当前页
        var page = contentX / kScreenWidth

        this.setState({
            currentPage:page
        })
    }

```

## ListView
- 官方文档提示: 在0.46版本开始此组件已过期, 并推荐使用`FlatList`或`SectionList`替代, 但是在0.51版本依然可以使用
- `ListView`: 一个核心组件，用于高效地显示一个可以垂直滚动的变化的数据列表
- ListView内部是通过`ListViewDataSource`这个对象，显示数据，因此使用ListView必须先创建`ListViewDataSource`对象。
- `ListViewDataSource`构造方法(创建对象):可选择性传入4个参数,描述怎么提取数据，怎么刷新cell
- 这些参数：都是函数，当产生对应的事件的时候，会自动执行这些函数.

### ListView常用的属性和方法
- ListView可以使用所有ScrollView的属性。

```objc
initialListSize number 
//指定在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据，而不是花费太多帧逐步显示出来

dataSource ListViewDataSource 
//ListView.DataSource实例（列表依赖的数据源）
```
- `ListViewDataSource`构造函数可以接受下列四种参数（都是可选）：

```objc
getRowData(dataBlob, sectionID, rowID);
//怎么获取行数据
getSectionHeaderData(dataBlob, sectionID);
//怎么获取每一组头部数据
rowHasChanged(prevRowData, nextRowData);
//决定什么情况行数据才发生改变，当行数据发生改变，就会绘制下一行cell
sectionHeaderHasChanged(prevSectionData, nextSectionData);
//决定什么情况头部数据才发生改变，当行数据发生改变，就会绘制下一行cell
```
- `ListViewDataSource`为`ListView`组件提供高性能的数据处理和访问。我们需要调用clone方法从原始输入数据中抽取数据来创建`ListViewDataSource`对象。
- 要更新`datasource`中的数据，请（每次都重新）调用`cloneWithRows`方法（如果用到了section，则对应`cloneWithRowsAndSections`方法）clone方法会自动提取新数据并进行逐行对比（使用`rowHasChanged`方法中的策略），这样`ListView`就知道哪些行需要重新渲染了
- 注意：初始化`ListViewDataSource`的时候，如果不需要修改提取数据的方式，只需要实现`rowHasChanged`，告诉什么时候刷新下一行数据.
- 注意：默认`ListViewDataSource`有提取数据方式，可以使用默认的提取方式.

### ListView使用步骤
- 1). 创建数据源

```objc
        //1. 创建数据源对象
        var datas = new ListView.DataSource({
            //设置数据改变的时候刷新下一行数据
            rowHasChanged: (r1, r2)=>{r1 != r2},
        })

        //2. 请求数据'
        var foodArr = require('./Resource/food.json')

        //3. 设置数据
        datas = datas.cloneWithRows(foodArr)

        //5. 保存数据源
        this.state = {
            dataArr: datas
        }
```

- 2). ListView实现

```objc
                <ListView style={{backgroundColor:'white', marginTop:20}}
                    //设置数据源
                          dataSource={this.state.dataArr}
                    //渲染哪一行(设置cell样式)
                          renderRow={this._renderRow.bind(this)}
                          //设置头部样式
                          renderHeader={this._renderHeader.bind(this)}
                          //设置section的头部样式
                          renderSectionHeader={this._renderSectionHeader.bind(this)}
                          //设置尾部样式
                          renderFooter={this._renderFooter.bind(this)}
                          //设置分割线样式
                          renderSeparator={this._renderSeparator.bind(this)}
                />
```

- 3). 相关属性方法介绍
  - renderRow: 设置每行cell样式

```objc
// 实现数据源方法,设置每行cell样式
/*这个方法会自动传入四个参数(rowData,sectionID,rowID,highlightRow)
rowData:当前行数据
sectionID:当前行所在组ID
rowID：哪一行的角标
highlightRow:高亮函数
*/
    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <View>
                <Text>{rowData}</Text>
            </View>
        );
    }

```

- ListView头部和尾部视图

```objc
//头部视图
 _renderHeader() {
        return (
            <View>
                <Text>头部视图</Text>
            </View>
        )
    }
//尾部视图
 _renderFooter() {
        return (
            <View>
                <Text>尾部视图</Text>
            </View>
        )
    }
```

- renderSectionHeader: 设置每一个section的头部样式


```objc
//sectionData: 每一组的头部数据
//sectionID: 组ID
_renderSectionHeader(sectionData, sectionID){
    
}
```

- ListView分割线

```objc
 // 哪一组,哪一行,相邻行是否高亮
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted)  {
        console.log(sectionID,rowID,adjacentRowHighlighted);
        return (
            <View style={{height:1,backgroundColor:'black'}}></View>
        )
    }
```