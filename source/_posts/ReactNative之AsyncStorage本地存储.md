---
title: ReactNative之AsyncStorage本地存储
date: 2018-01-24 11:13
tags: [AsyncStorage, JavaScript]
categories: ReactNaive
---


- 在RN开发中，持久化存储数据，可以使用`AsyncStorage`，对原生的API进行了一层封装
- `AsyncStorage`是一个简单的、异步的、持久化的`Key-Value`存储系统，它对于`App`来说是全局性的

<!-- more -->

> ## `AsyncStorage`原理和使用
- `AsyncStorage`存储数据，在iOS中，底层会把数据保存到沙盒中的`Documents`中,并生成`manifest.json`文件。保存的数据都在`manifest.json`中。
- `AsyncStorage`删除数据，也仅仅是删除`manifest.json`文件中的数据，并不是删除`manifest.json`文件
- 唯有`clear`方法是将文件删除

![数据持久化.jpg](http://upload-images.jianshu.io/upload_images/4122543-59ec94ecc769d233.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

![json文件内容.jpg](http://upload-images.jianshu.io/upload_images/4122543-296bd2a19ea5dc90.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 存储

```objc
static setItem(key: string, value: string, callback?: ?(error: ?Error) => void) 
//将key字段的值设置成value，并在完成后调用callback函数。如果有任何错误发生，则会传递一个Error对象作为第一个参数。返回一个Promise对象
```

- 注意：`AsyncStorage`只能存储字符串，需要把对象转换为字符串才行
- 具体使用
- 

```objc
//key值
var key = 'per'
var person = {
    name:'jun',
    age:20
}

//json转成字符串
var jsonStr = JSON.stringify(person)

//存储
AsyncStorage.setItem('person', jsonStr, function (error) {
    if (error) {
        alert('存储失败')
    }else {
        alert('存储完成')
    }
})
```

## 读取

```objc
static getItem(key: string, callback?: ?(error: ?Error, result: ?string) => void) 
//读取key字段并将结果作为第二个参数传递给callback。如果有任何错误发生，则会传递一个Error对象作为第一个参数。返回一个Promise对象。
```

> 使用方法


```objc
//读取
_readData(){
    console.log('读取')
    AsyncStorage.getItem('per', function (error, result) {
        if (error) {
            alert('读取失败')
        }else {
            console.log(result)
            alert('读取完成')
        }
    })
}

```

### 删除

```objc
static removeItem(key: string, callback?: ?(error: ?Error) => void) 
//删除一个字段。返回一个Promise对象。

static clear(callback?: ?(error: ?Error) => void) 
//删除全部的AsyncStorage数据，即直接删除该缓存文件
```

> 函数用法


```objc
//删除
_deleteData(){
    console.log('删除')

    //删除一条数据
    AsyncStorage.removeItem('per', function (error) {
        if (error) {
            alert('删除失败')
        }else {
            alert('删除完成')
        }
    })

    //删除json文件
    AsyncStorage.clear(function (error) {
        if (error) {
            alert('文件删除失败')
        }else {
            alert('文件删除完成')
        }
    })
}
```

### 其他用法

```objc
static mergeItem(key: string, value: string, callback?: ?(error: ?Error) => void) 
//假设已有的值和新的值都是字符串化的JSON，则将两个值合并。返回一个Promise对象。还没有被所有原生实现都支持

static getAllKeys(callback?: ?(error: ?Error, keys: ?Array<string>) => void) 
//获取所有本应用可以访问到的数据，不论来自什么库或调用者。返回一个Promise对象。

static flushGetRequests() 
//清除所有进行中的查询操作。
```



