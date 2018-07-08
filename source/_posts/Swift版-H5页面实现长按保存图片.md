---
title: Swift版-H5页面实现长按保存图片
date: 2017-07-10 14:26:40
tags: [Swift, JavaScript, WebView]
categories: Swift高阶功能
---

- 刚开始拿到需求的第一反应是:H5页面还可以保存图片??
- 随即想了一下,好像微信里好多H5页面都有这样的功能
- 然后查阅了一下相关资料,有咨询了前端大神发现两行核心代码

```objc

//获取长按所在点
let urlString = "document.elementFromPoint(\(touchPoint.x), \(touchPoint.y)).src"

//根据该点的参数获取对应图片的链接
let saveUrl = webView.stringByEvaluatingJavaScriptFromString(urlString)

```
<!-- more -->

### 下面来一起啊看一下完整的代码步骤

> #### 首先给UiWebView加一个长按手势

```objc

//添加长按手势
let longPressGes = UILongPressGestureRecognizer(target: self, action: #selector(longPressedGesture(_:)))
//一定要遵循代理
longPressGes.delegate = self
webView.addGestureRecognizer(longPressGes)

```

> #### 实现代理方法

```objc

//不实现该代理方法,长按无效
func gestureRecognizer(gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWithGestureRecognizer otherGestureRecognizer: UIGestureRecognizer) -> Bool {
    return true
}

```

> #### 接着在手势响应方法里面实现相应的功能

-  注意:
 - 一定要判断手势的state属性
 - 判断saveUrl是否是一个nil值


```
@objc func longPressedGesture(recognizer: UILongPressGestureRecognizer){
    if recognizer.state != .Began { return }

    let touchPoint = recognizer.locationInView(webView)

    //核心代码
    let urlString = "document.elementFromPoint(\(touchPoint.x), \(touchPoint.y)).src"
    if let saveUrl = webView.stringByEvaluatingJavaScriptFromString(urlString) {
        //判断图片的链接是否为空,长度是否为o
        if saveUrl.characters.count == 0 { return }
        addAlertAction(saveUrl)
    }
}
```

> #### 调用保存图片功能按钮

```objc
fileprivate func addAlertAction(imageStr: String){
    let alertV = UIAlertController()
    let saveAction = UIAlertAction(title: "保存图片", style: .Default) { (alertV) in
        self.saveImageToPhoto(imageStr)
    }
    //取消保存不作处理
    let cancelAction = UIAlertAction(title: "取消", style: .Cancel, handler: nil)

    alertV.addAction(saveAction)
    alertV.addAction(cancelAction)
    controller.presentViewController(alertV, animated: true, completion: nil)
}
```

> #### 使用SDWebImage保存图片

- 注意使用SDWebImage的缓存机制

```objc

fileprivate func saveImageToPhoto(imageStr: String){
    guard let imageUrl = NSURL(string: imageStr) else { return }

    let sdManager = SDWebImageManager.sharedManager()

    var image : UIImage!
    if sdManager.diskImageExistsForURL(imageUrl) {
        //先判断缓存中的图片
        image = sdManager.imageCache.imageFromDiskCacheForKey(imageUrl.absoluteString)

    }else{
        //缓存没有在进行下载
        let data = NSData(contentsOfURL: imageUrl)
        image = UIImage(data: data!)
    }

    //保存图片到相册中
    UIImageWriteToSavedPhotosAlbum(image, self, #selector(self.image(_:didFinishSavingWithError:contextInfo:)), nil)
}
```

> #### 最后是一个保存成功与否的回调方法


```objc
func image(image: UIImage, didFinishSavingWithError: NSError?, contextInfo: AnyObject) {
    if didFinishSavingWithError != nil {
        MBProgressHUD.show(string: "请开启访问相册权限后使用此功能", inView: self.view)
    } else {
        MBProgressHUD.show(string: "图片保存成功", inView: self.view)
    }
}

```


>  以上如有不妥之处还望多多指正
