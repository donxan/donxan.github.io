---
title: iOS黑科技之(CoreImage)静态人脸识别(一)
date: 2017-11-22 14:39
tags: [Swift, CoreImage, CIDetector, AVFoundation]
categories: Swift黑科技
image: 
---

![Core Image框架图.png](http://upload-images.jianshu.io/upload_images/4122543-3f1d091e07de5a9b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<!-- more -->


> 人脸识别原理简介：每一张图片都是由每一个像素点组成，而每一个像素点中又有对应的颜色值(如RGB)，人的面部特征中，不同的五官，颜色值肯定存在差异，而人脸识别技术就是通过对照片中每一个像素的识别进行大量的算法处理，最终得出五官的轮廓



- 这里我们将使用`CoreImage`框架,进行静态的人脸识别(类似照片, 图像等)
- 苹果原生的人脸识别并不是一个独立的框架，而是放在`CoreImage`框架中
- Apple 已经帮我们把image的分类处理好了
- CoreImage是iOS5新增的强大类库之一，它可以处理图片的各种效果，什么饱和度啊，旋转变形啊，色彩啊等等。
- 在使用CoreImage之前要导入CoreImage.framework框架



## 主要类介绍
- CIImage
  - Core Image中的图像类，类似于UIKit中的UIImage类。
- CIContext: 上下文对象
  - 所有图像处理都在CIContext对象中实现，通过Quartz 2D、OpenGL渲染CIImage对象; 如滤镜、颜色等渲染处理
- CIColor：颜色
  - 图片的关联与画布、图片像素颜色的处理。
- CIVector：向量
  - 图片的坐标向量等几何方法处理。

- CIDetector
特征识别类
  - 该类集成了苹果有关特征识别的一些功能。
  - 可检测图片中人脸的眼睛、嘴巴、等等
- CIFilter
  - 滤镜类，包含一个字典结构，对各种滤镜定义了属于自己的属性
  - CIFilter 产生一个CIImage
  - 接受一到多的图片作为输入，经过一些过滤操作，产生指定输出的图片
- CIFeature: 代表由 detector处理后产生的特征

## 项目代码介绍
### 创建
#### 这里要先介绍一下检测器的类别

```objc
//人脸检测器
public let CIDetectorTypeFace: String

//矩形识别
public let CIDetectorTypeRectangle: String

//二维码识别
public let CIDetectorTypeQRCode: String

//文本识别
public let CIDetectorTypeText: String

//指定检测精度
public let CIDetectorAccuracy: String

//指定使用特征跟踪，这个功能就像相机中的人脸跟踪功能
public let CIDetectorTracking: String

//设置将要识别的特征的最小尺寸
public let CIDetectorMinFeatureSize: String

//针对矩形探测器的，用于设置返回矩形特征的最多个数。
//这个关键字的值是一个1~...的NSNumber值。有效范围1 < = CIDetectorMaxFeatureCount < = 256。默认值为1
public let CIDetectorMaxFeatureCount: String

//脸部透视数, 值为包含1、3、5、7、9、11的NSNumber对象
public let CIDetectorNumberOfAngles: String

//设置识别方向，值是一个从1 ~ 8的整型的NSNumber
public let CIDetectorImageOrientation: String

//设置这个参数为true(bool类型的NSNumber)，识别器将提取眨眼特征
public let CIDetectorEyeBlink: String

//如果设置这个参数为ture(bool类型的NSNumber)，识别器将提取微笑特征
public let CIDetectorSmile: String

//用于设置每帧焦距，值得类型为floot类型的NSNumber
public let CIDetectorFocalLength: String

//用于设置矩形的长宽比，值得类型为floot类型的NSNumber
public let CIDetectorAspectRatio: String

//控制文本检测器是否应该检测子特征。默认值是否，值的类型为bool类型的NSNumber
public let CIDetectorReturnSubFeatures: String

```

- 这里需要的是人脸识别的`CIDetectorTypeFace`

```objc
//1. 创建上下文对象
let context = CIContext()

//2. UIImage转成CIImage
guard let image = imageView.image  else { return }
guard let ciImage = CIImage(image: image) else { return }

//3. 参数设置(精度设置)
let parmes = [CIDetectorAccuracy: CIDetectorAccuracyHigh]

//4. 创建识别类
let detector = CIDetector(ofType: CIDetectorTypeFace, context: context, options: parmes)

```

### 参数设置
- 这里设置了一个识别精度CIDetectorAccuracy，识别精度的值有：

```objc
//识别精度低，但识别速度快、性能高
public let CIDetectorAccuracyLow: String 

// 识别精度高，但识别速度慢、性能低
public let CIDetectorAccuracyHigh: String 
```
- 除了精度的设置，还有`CIDetectorMinFeatureSize`用于设置将要识别的特征的最小尺寸，也就是说小于这个尺寸的特征将不识别。
  - 对于人脸检测器，这个关键字的值是从0.0 ~ 1.0的`NSNumber`值，这个值表示：基于输入图像短边长度的百分比。有效值范围:0.01 <= `CIDetectorMinFeatureSize` <= 0.5。为这个参数设定更高值仅用于提高性能。默认值是0.15。
  - 对于矩形探测器，这个关键字的值是从0.0 ~ 1.0的`NSNumber`值，这个值表示：基于输入图像短边长度的百分比。有效值范围:0.2 <= `CIDetectorMinFeatureSize` <= 1.0的默认值是0.2。
  - 对于文本探测器，这个关键字的值是一个范围从0.0 ~ 1.0的`NSNumber`值，这个值表示：基于输入图像高度的百分比。有效值范围:0.0 <= `CIDetectorMinFeatureSize` <= 1.0。默认值是10/(输入图像的高度)

### CIFaceFeature概述
- `CIFaceFeature`是保存脸部所有信息的类
- `CIFaceFeature`是`CIFeature`的子类
- `CIFeature`类只保存基本信息， 所有的附加信息由子类(`CIFaceFeature`)保存
- 各属性简介:

```objc
//检测到的脸部在图片中的frame
open var bounds: CGRect { get }

//是否检测到左眼的位置
open var hasLeftEyePosition: Bool { get }

//左眼的位置
open var leftEyePosition: CGPoint { get }

//是否检测到右眼的位置
open var hasRightEyePosition: Bool { get }

//右眼的位置
open var rightEyePosition: CGPoint { get }

//是否检测到嘴巴的位置
open var hasMouthPosition: Bool { get }

//嘴巴的位置
open var mouthPosition: CGPoint { get }

//脸部是否倾斜    
open var hasFaceAngle: Bool { get }

//脸部倾斜角度
open var faceAngle: Float { get }

//是否微笑    
open var hasSmile: Bool { get }

//左眼是否闭上
open var leftEyeClosed: Bool { get }

//右眼是否闭上
open var rightEyeClosed: Bool { get }
```

### `Core Image`坐标系问题
- 如图: 

![坐标系对比.png](http://upload-images.jianshu.io/upload_images/4122543-a8af4dc80c214d1b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

- `UIView`坐标系
  - 图中上半部分坐标系
  - Y轴自上而下依次增大
- `Core Image`坐标系
  - 图中下半部分显示坐标系
  - X轴与`UIView`坐标系相同, Y轴坐标系最底部为0, 自下而上依次增大, 与`UIView`坐标系相反
  - 所以需要对以次坐标设置frame的控件, 做一次针对Y轴的翻转, 如下: 
  
```objc
resultView.transform = CGAffineTransform(scaleX: 1, y: -1)
```


### 人脸检测(核心代码)

```objc
/// 通过人脸识别提取有效的人脸图片
static func faceImagesByFaceRecognition(imageView: UIImageView, resultCallback: @escaping ((_ count: Int) -> ())) {
    //0. 删除子控件
    let subViews = imageView.subviews
    for subview in subViews {
        if subview.isKind(of: UIView.self) {
            subview.removeFromSuperview()
        }
    }
    
    //1. 创建上下文对象
    let context = CIContext()
    
    //2. UIImage转成CIImage
    guard let image = imageView.image  else { return }
    guard let ciImage = CIImage(image: image) else { return }
    
    //3. 参数设置(精度设置)
    let parmes = [CIDetectorAccuracy: CIDetectorAccuracyHigh]
    
    //4. 创建识别类
    let detector = CIDetector(ofType: CIDetectorTypeFace, context: context, options: parmes)
    
    //5. 找到识别其中的人连对象
    guard let faceArr = detector?.features(in: ciImage) else { return }
    
    //6. 添加识别的红框
    let resultView = UIView(frame: CGRect(x: 0, y: 0, width: imageView.frame.width, height: imageView.frame.height))
    imageView.addSubview(resultView)
    
    //7. 遍历扫描结果
    for faceFeature in faceArr {
        resultView.addSubview(addRedrectangleView(rect: faceFeature.bounds))
        
        //7.1 如果识别到眼睛
        guard let feature = faceFeature as? CIFaceFeature else { return }
        //左眼
        if feature.hasLeftEyePosition {
            let leftView = addRedrectangleView(rect: CGRect(x: 0, y: 0, width: 5, height: 5))
            leftView.center = feature.leftEyePosition
            resultView.addSubview(leftView)
        }
        //右眼
        if feature.hasRightEyePosition {
            let rightView = addRedrectangleView(rect: CGRect(x: 0, y: 0, width: 5, height: 5))
            rightView.setValue(feature.rightEyePosition, forKey: "center")
            resultView.addSubview(rightView)
        }
        
        //7.2 识别嘴巴
        if feature.hasMouthPosition {
            let mouthView = addRedrectangleView(rect: CGRect(x: 0, y: 0, width: 10, height: 5))
            mouthView.setValue(feature.mouthPosition, forKey: "center")
            resultView.addSubview(mouthView)
        }
    }
    
    //8. 将resultView沿x轴翻转
    resultView.transform = CGAffineTransform(scaleX: 1, y: -1)
    
    //9. 结果回调
    resultCallback(faceArr.count)
}
```

### 检测结果展示
- 检测到的人脸部位展示红色矩形框
- 眼镜和嘴巴部位显示红色矩形框
- 照片随机选取的, 不喜勿喷

![WechatIMG29.jpeg](http://upload-images.jianshu.io/upload_images/4122543-424e5a9f1da0e4b5.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

### 注意事项:
- image的实际尺寸需要和imageView的尺寸完全一样,获取的脸部各个部位的尺寸才能完全吻合
- 这里我只做了简单的尺寸比例转换
- 代码如下:

```objc
static func getScale(imageView: UIImageView, image: UIImage) -> CGFloat{
    let viewSize = imageView.frame.size
    let imageSize = image.size
    
    let widthScale = imageSize.width / viewSize.width
    let heightScale = imageSize.height / viewSize.height
    
    return widthScale > heightScale ? widthScale : heightScale
}

```


---
### GitHub--[Demo地址](https://github.com/coderQuanjun/JunFaceRecognition)

-  注意:  
  - 这里只是列出了主要的核心代码,具体的代码逻辑请参考demo
  - 文中相关介绍有的地方如果有不是很详细或者有更好建议的,欢迎联系小编
