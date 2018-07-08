---
title: Swift之删除HTML5页面的广告
date: 2017-11-11 15:19:34
tags: [Swift, HTML5, WebView]
categories: Swift高阶功能
---

好久没来博客了,最近工作中任务(Bug)比较多!除了改Bug之外发现最近新出的一部电视剧不错, 给大家推荐一下<<<<猎场>>>>

<!-- more -->

![猎场.jpg](http://upload-images.jianshu.io/upload_images/4122543-050601a063e14ce8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## UIWebViewDelegate
- 好了,言归正传,今天遇到了一个关于UIWebView问题的问题,如何删除H5页面的广告问题(一般出现在第三方的H5页面的情况)
- APP中嵌入一个H5的网页，但出现的广告条或是无关头尾，相当大煞风景, 那该如何去掉呢?
- 嵌入webview 一段JavaScript代码来隐藏，目前Android和iOS都支持此方法(这就是iOS中常说的js和OC交互)
- UIWebVIew的基本使用这里就不多做介绍了
- 下面介绍一下UIWebViewDelegate的一些代理方法

```objc
//当网页视图被指示载入内容而得到通知。应当返回YES，这样会进行加载。通过导航类型参数可以得到请求发起的原因
optional public func webView(_ webView: UIWebView, shouldStartLoadWith request: URLRequest, navigationType: UIWebViewNavigationType) -> Bool


//UIWebView的控件加载网页的监听函数方法：
//1. 当网页视图已经开始加载一个请求后，得到通知。
optional public func webViewDidStartLoad(_ webView: UIWebView)

//2. 当网页视图结束加载一个请求之后，得到通知。
optional public func webViewDidFinishLoad(_ webView: UIWebView)

//3. 当前请求加载中发生错误时，得到通知。
optional public func webView(_ webView: UIWebView, didFailLoadWithError error: Error)

```

## 基于JavaScript的H5代码
- 首先,我们先看一下HTML5在浏览器中的现实情况, [参考地址](http://mini.eastday.com/mobile/170818161313395.html)
-
![删除前的原网页](http://upload-images.jianshu.io/upload_images/4122543-146823b54ab03b8d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 下面我们就要找到广告或者其他你想删除的部分对应的HTML代码
- 用浏览器打开[参考地址](http://mini.eastday.com/mobile/170818161313395.html), 建议使用谷歌浏览器
- 找到浏览器的开发者工具, 按照如下操作
-
![查看网页代码](http://upload-images.jianshu.io/upload_images/4122543-c3efc0cb6e21f3ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 控制网页和js源码的显示方式
-
![Snip20171111_6.png](http://upload-images.jianshu.io/upload_images/4122543-ea333a6efa617e15.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  - 调节手机/电脑显示: 你要选择在那种情境下显示网页,通俗来说,就是模拟器
  - 放大镜:你可以通过放大镜对网页上的控件进行选取,然后找到html代码
  - 手机:转化为手机模式,但是前提必须要转换Device的模式,要不然,光是视图上的转变,没有实际的转变(注意:我现在拿手机的网页做示例,所有我需要转化,当你做的电脑的就不需要转换这些了)

- 下面这就是要找到广告对应的js源码了(这里以订阅按钮为例)
![Snip20171111_8.png](http://upload-images.jianshu.io/upload_images/4122543-e8c6dd62b00d9c38.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 将右侧按钮为选中状态
  - 用鼠标选中你要删除的控件(这里以订阅按钮为例), 这时你会发现右侧代码会有一行背景颜色被加深
  - 我们要做的就是调用js语法删除这行js代码, 从而删除订阅按钮
  - 找到该控件的class标签或者id标签
  - 通过以下代码控制删除

```objc
//class类型
document.getElementsByClassName('gg-item news-gg-img3').style.display = 'none'
//id类型
document.getElementsById('gg-item news-gg-img3').style.display = 'none'
```

- 如果找到的该控件所在的js代码没有class或者id标志, 可以继续找到其父控件,通过以下方式删除

```objc
document.getElementsByClassName('gg-item news-gg-img3')[0].style.display='none'
```

## 具体核心代码如下
- 删除广告后的效果如图

![最终效果图](http://upload-images.jianshu.io/upload_images/4122543-26d52ecdfceb0f52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400)

- 核心代码

```objc
extension NoneADViewController: UIWebViewDelegate{
    func webViewDidFinishLoad(_ webView: UIWebView) {
        //最顶部的广告
        webView.stringByEvaluatingJavaScript(from: "document.getElementsByClassName('gg-item news-gg-img3')[0].style.display='none'")
        //删除页面浮框广告
        webView.stringByEvaluatingJavaScript(from: "document.getElementsByClassName('dbleleven-wrap')[0].style.display='none'")
        //第一张图片下面的广告
        webView.stringByEvaluatingJavaScript(from: "document.getElementsByClassName('baiduimageplusm-title-img-only')[0].style.display = 'none'")

    }

    func webView(_ webView: UIWebView, shouldStartLoadWith request: URLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        guard let urlStr = request.url?.absoluteString else { return true }
        print(urlStr)

        return true
    }
}

```
