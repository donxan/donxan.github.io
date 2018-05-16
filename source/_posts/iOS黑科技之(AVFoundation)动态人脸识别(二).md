---
title: iOS黑科技之(AVFoundation)动态人脸识别(二)
date: 2017-11-22 14:50
tags: [Swift, AVFoundation]
categories: Swift黑科技
---

> 人脸识别原理简介：每一张图片都是由每一个像素点组成，而每一个像素点中又有对应的颜色值(如RGB)，人的面部特征中，不同的五官，颜色值肯定存在差异，而人脸识别技术就是通过对照片中每一个像素的识别进行大量的算法处理，最终得出五官的轮廓

<!-- more -->

## 首先介绍一些人脸识别的方式
### `CoreImage`静态人脸识别, 可识别照片, 图像等
- 详情可查看上一篇博客介绍

### Face++
- 是北京旷视科技有限公司旗下的新型视觉服务平台, 旨在提供简单易用，功能强大，平台通用的视觉服务
- Face++是新一代云端视觉服务平台，提供一整套世界领先的人脸检测，人脸识别，面部分析的视觉技术服务
- [Face++百度百科介绍](https://baike.baidu.com/item/Face++/6754083)
- [Face++官网](https://www.faceplusplus.com.cn/pricing/)

### OpenCV
- 由一系列 C 函数和少量 C++ 类构成, 实现了图像处理和计算机视觉方面的很多通用算法, 其他的具体的不是很了解
- [这是百度百科的内容](https://baike.baidu.com/item/opencv/10320623?fr=aladdin)

### Vision
- Vision 是 Apple 在 WWDC 2017 伴随iOS 11推出的基于CoreML的图像识别框架
- 根据[Vision官方文档看](https://developer.apple.com/documentation/vision)，`Vision` 本身就有`Face Detection and Recognition`(人脸检测识别)、`Machine Learning Image Analysis`(机器学习图片分析)、`Barcode Detection`(条形码检测)、`Text Detection`(文本检测)。。。。。等等这些功能
-  感兴趣的同学可以查看相关文档学习一下, 这里小编就不过多作介绍了

#### AVFoundation
- 可以用来使用和创建基于时间的视听媒体的框架
- 这里我们使用的人脸识别方式也是使用`AVFoundation`框架

## 对关键类的简单介绍
### `AVCaptureDevice`:代表硬件设备
- 我们可以从这个类中获取手机硬件的照相机、声音传感器等。
- 当我们在应用程序中需要改变一些硬件设备的属性（例如：切换摄像头、闪光模式改变、相机聚焦改变）的时候必须要先为设备加锁，修改完成后解锁。
- 示例: 切换摄像头

```objc
//4. 移除旧输入，添加新输入
//4.1 设备加锁
session.beginConfiguration()
//4.2. 移除旧设备
session.removeInput(deviceIn)
//4.3 添加新设备
session.addInput(newVideoInput)
//4.4 设备解锁
session.commitConfiguration()

```

### `AVCaptureDeviceInput`:设备输入数据管理对象
- 可以根据`AVCaptureDevice`创建对应的AVCaptureDeviceInput对象，
- 该对象将会被添加到AVCaptureSession中管理,代表输入设备，它配置抽象硬件设备的ports。通常的输入设备有（麦克风，相机等）

### `AVCaptureOutput`: 代表输出数据
- 输出的可以是图片（`AVCaptureStillImageOutput`）或者视频（`AVCaptureMovieFileOutput`）

### `AVCaptureSession`: 媒体（音、视频）捕捉会话
- 负责把捕捉的音频视频数据输出到输出设备中。
- 一个`AVCaptureSession`可以有多个输入或输出。
- 是连接`AVCaptureInput`和`AVCaptureOutput`的桥梁，它协调input到output之间传输数据。
- 它有startRunning和stopRunning两种方法来开启会话和结束会话。
- 每个session称之为一个会话，也就是在应用运行过程中如果你需要改变会话的一些配置（例如：切换摄像头）,此时需要先开启配置，配置完成之后再提交配置。
   
### `AVCaptureVideoPreviewLayer`: 图片预览层
- 我们的照片以及视频是如何显示在手机上的呢？那就是通过把这个对象添加到`UIView`的`layer`上的


> 好了, 上面吧啦吧啦的说了那么多废话, 那么我们的人脸识别究竟是怎样实现的呢? 下面干货来了

## 添加扫描设备
- 获取设备(摄像头)
- 创建输入设备
- 创建扫描输出
- 创建捕捉回话

### 输出设备
- 这里使用`AVCaptureMetadataOutput`, 可以扫描人脸, 二维码, 条形码等信息
- 必须设置代理, 否则获取不到扫描结果
- 需要设置要输出什么样的数据: face(人脸), qr(二维码)等等

```objc
//3.创建原数据的输出对象
let metadataOutput = AVCaptureMetadataOutput()
        
//4.设置代理监听输出对象输出的数据，在主线程中刷新
metadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)

//7.告诉输出对象要输出什么样的数据,识别人脸, 最多可识别10张人脸
metadataOutput.metadataObjectTypes = [.face]
```

> 主要代码如下:

```objc
fileprivate func addScaningVideo(){
    //1.获取输入设备（摄像头）
    guard let device = AVCaptureDevice.default(for: .video) else { return }
    
    //2.根据输入设备创建输入对象
    guard let deviceIn = try? AVCaptureDeviceInput(device: device) else { return }
    deviceInput = deviceIn
    
    //3.创建原数据的输出对象
    let metadataOutput = AVCaptureMetadataOutput()
    
    //4.设置代理监听输出对象输出的数据，在主线程中刷新
    metadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)
    //4.2 设置输出代理
    faceDelegate = previewView
    
    //5.设置输出质量(高像素输出)
    session.sessionPreset = .high
    
    //6.添加输入和输出到会话
    if session.canAddInput(deviceInput!) {
        session.addInput(deviceInput!)
    }
    if session.canAddOutput(metadataOutput) {
        session.addOutput(metadataOutput)
    }
    
    //7.告诉输出对象要输出什么样的数据,识别人脸, 最多可识别10张人脸
    metadataOutput.metadataObjectTypes = [.face]
    
    //8.创建预览图层
    previewLayer = AVCaptureVideoPreviewLayer(session: session)
    previewLayer.videoGravity = .resizeAspectFill
    previewLayer.frame = view.bounds
    previewView.layer.insertSublayer(previewLayer, at: 0)
    
    //9.设置有效扫描区域(默认整个屏幕区域)（每个取值0~1, 以屏幕右上角为坐标原点）
    metadataOutput.rectOfInterest = previewView.bounds
    
    //10. 开始扫描
    if !session.isRunning {
        DispatchQueue.global().async {
            self.session.startRunning()
        }
    }
}

```

### 切换摄像头
- 获取当前摄像头方向
- 创建新的输入input
- 移除旧输入`capture`, 添加新的输入`capture`
- 具体代码如下: 

```objc
@IBAction func switchCameraAction(_ sender: Any) {
    //1. 执行转场动画
    let anima = CATransition()
    anima.type = "oglFlip"
    anima.subtype = "fromLeft"
    anima.duration = 0.5
    view.layer.add(anima, forKey: nil)
    
    //2. 获取当前摄像头
    guard let deviceIn = deviceInput else { return }
    let position: AVCaptureDevice.Position = deviceIn.device.position == .back ? .front : .back
    
    //3. 创建新的input
    let deviceSession = AVCaptureDevice.DiscoverySession(deviceTypes: [.builtInWideAngleCamera], mediaType: .video, position: position)
    guard let newDevice = deviceSession.devices.filter({ $0.position == position }).first else { return }
    guard let newVideoInput = try? AVCaptureDeviceInput(device: newDevice) else { return }
    
    //4. 移除旧输入，添加新输入
    //4.1 设备加锁
    session.beginConfiguration()
    //4.2. 移除旧设备
    session.removeInput(deviceIn)
    //4.3 添加新设备
    session.addInput(newVideoInput)
    //4.4 设备解锁
    session.commitConfiguration()
    
    //5. 保存最新输入
    deviceInput = newVideoInput
}

```

### 处理扫描结果
> 实现`AVCaptureMetadataOutputObjectsDelegate`该协议的协议方法(只有一个方法)


```
//`metadataObjects`就是返回的扫描结果
optional public func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection)

```

### `AVMetadataFaceObject`介绍
- `faceID`: 人脸的唯一标识 
  - 扫描出来的每一个人, 有不同的`faceID`
  - 同一个人, 不同的状态下(摇头, 歪头, 抬头等), 都会有不同`faceID`
- `hasRollAngle`: 是否有倾斜角,侧倾角(左右歪头)(BOOL类型)
- `rollAngle`: 倾斜角,侧倾角的角度(`CGFloat`类型)
- `hasYawAngle`: 是否有偏转角(左右摇头)
- `yawAngle`: 偏转角角度


### 处理扫描结果
#### 获取预览图层的人脸数组
- 遍历扫描的人脸数组, 转换成在预览图层的人脸数组
- 主要是人脸在图层的左边的转换
- 返回转换后的新的数组

```objc
fileprivate func transformedFaces(faceObjs: [AVMetadataObject]) -> [AVMetadataObject] {
    var faceArr = [AVMetadataObject]()
    for face in faceObjs {
        //将扫描的人脸对象转成在预览图层的人脸对象(主要是坐标的转换)
        if let transFace = previewLayer.transformedMetadataObject(for: face){
            faceArr.append(transFace)
        }
    }
    return faceArr
}

```

#### 根据人脸位置添加红框
- 设置红框的frame

```
faceLayer?.frame = face.bounds
```

- 根据偏转角和倾斜角的角度获取`CATransform3D`

```objc
    fileprivate func transformDegress(yawAngle: CGFloat) -> CATransform3D {
        let yaw = degreesToRadians(degress: yawAngle)
        //围绕Y轴旋转
        let yawTran = CATransform3DMakeRotation(yaw, 0, -1, 0)
        //红框旋转问题
        return CATransform3DConcat(yawTran, CATransform3DIdentity)
    }
    
    //处理偏转角问题
    fileprivate func transformDegress(rollAngle: CGFloat) -> CATransform3D {
        let roll = degreesToRadians(degress: rollAngle)
        //围绕Z轴旋转
        return CATransform3DMakeRotation(roll, 0, 0, 1)
    }
    
    //角度转换
    fileprivate func degreesToRadians(degress: CGFloat) -> CGFloat{
        return degress * CGFloat(Double.pi) / 180
    }

```

- 根据有无偏转角和倾斜角旋转红框

```objc
//3.4 设置偏转角(左右摇头)
if face.hasYawAngle{
    let tranform3D = transformDegress(yawAngle: face.yawAngle)
    
    //矩阵处理
    faceLayer?.transform = CATransform3DConcat(faceLayer!.transform, tranform3D)
}

//3.5 设置倾斜角,侧倾角(左右歪头)
if face.hasRollAngle{
    let tranform3D = transformDegress(rollAngle: face.rollAngle)
    
    //矩阵处理
    faceLayer?.transform = CATransform3DConcat(faceLayer!.transform, tranform3D)
}

```

- 至此, 动态的人脸识别就完成了, 会在人脸位置增加红框显示, 并且红框会根据人脸的位置动态的, 实时的调整
- 下面就快拿起你的相机测试吧


---
### GitHub--[Demo地址](https://github.com/coderQuanjun/JunFaceRecognition)

-  注意:  
  - 这里只是列出了主要的核心代码,具体的代码逻辑请参考demo
  - 文中相关介绍有的地方如果有不是很详细或者有更好建议的,欢迎联系小编

