---
title: Swift之二维码的生成、识别和扫描
date: 2017-11-16 16:00:00
tags: [Swift, CIFilter, CIDetector, AVFoundation]
categories: Swift黑科技
---

> 最近在项目中遇到了涉及二维码相关的问题, 这里想记录总结一下二维码相关技术
<!-- more -->

## 二维码的介绍
- 二维条码/二维码是用某种特定的几何图形按一定规律在平面分布的黑白相间的图形记录数据符号信息的
- 总结: 用图形记录标记一些信息,方便通过图形识别来获取信息
- 应用场景
  - 信息获取（名片、地图、WIFI密码、资料）
  - 手机电商（用户扫码、手机直接购物下单）
  - 手机支付（扫描商品二维码，通过银行或第三方支付提供的手机端通道完成支付)
  - 微信添加好友

## 二维码的生成
- 生成二维码的方式
  - 采用第三方框架(放弃)
    - ZXing/ZBar
    - 框架不支持64位(2015年2月1号起, - 不允许不支持64位处理器的APP 上架)
  - 系统自带API
- 生成二维码的步骤
  - 创建二维码滤镜--CIFilter
  - 恢复滤镜的默认属性
  - 设置滤镜的输入数据
  - 将传入的字符串转换成Data(OC为NSData)数据
  - 通过KVC来设置输入的内容`inputMessage`

### 二维码容错率

```objc
filter?.setValue("H", forKey: "inputCorrectionLevel")
```

- `inputCorrectionLevel` 是一个单字母（@"L", @"M", @"Q", @"H" 中的一个），表示不同级别的容错率，默认为 @"M".
- QR码有容错能力，QR码图形如果有破损，仍然可以被机器读取内容，最高可以到7%~30%面积破损仍可被读取,相对而言，容错率愈高，QR码图形面积愈大。所以一般折衷使用15%容错能力。
- L水平 7%的字码可被修正.
- M水平 15%的字码可被修正
- Q水平 25%的字码可被修正
- H水平 30%的字码可被修正
- 代码: 

```objc
/* *  @param inputMsg 二维码保存的信息
   *  @param fgImage  前景图片  */
func generateCode(inputMsg: String, fgImage: UIImage?) -> UIImage {
    //1. 将内容生成二维码
    //1.1 创建滤镜
    let filter = CIFilter(name: "CIQRCodeGenerator")
    
    //1.2 恢复默认设置
    filter?.setDefaults()
    
    //1.3 设置生成的二维码的容错率
    //value = @"L/M/Q/H"
    filter?.setValue("H", forKey: "inputCorrectionLevel")
    
    // 2.设置输入的内容(KVC)
    // 注意:key = inputMessage, value必须是NSData类型
    let inputData = inputMsg.data(using: .utf8)
    filter?.setValue(inputData, forKey: "inputMessage")
    
    //3. 获取输出的图片
    guard let outImage = filter?.outputImage else { return UIImage() }
    
    //4. 获取高清图片
    let hdImage = getHDImage(outImage)
    
    //5. 判断是否有前景图片
    if fgImage == nil{
        return hdImage
    }
    
    //6. 获取有前景图片的二维码
    return getResultImage(hdImage: hdImage, fgImage: fgImage!)
}

```


### 获取高清图片

```objc
//4. 获取高清图片
fileprivate func getHDImage(_ outImage: CIImage) -> UIImage {
    let transform = CGAffineTransform(scaleX: 10, y: 10)
    //放大图片
    let ciImage = outImage.transformed(by: transform)
    
    return UIImage(ciImage: ciImage)
}

```

### 将图片合成到二维码中
- 需要用到图形上下文
- 将二维码画到图形上下文
- 将图片合成到图行上下文

```objc
//获取前景图片
fileprivate func getResultImage(hdImage: UIImage, fgImage: UIImage) -> UIImage {
    let hdSize = hdImage.size
    //1. 开启图形上下文
    UIGraphicsBeginImageContext(hdSize)
    
    //2. 将高清图片画到上下文
    hdImage.draw(in: CGRect(x: 0, y: 0, width: hdSize.width, height: hdSize.height))
    
    //3. 将前景图片画到上下文
    let fgWidth: CGFloat = 80
    fgImage.draw(in: CGRect(x: (hdSize.width - fgWidth) / 2, y: (hdSize.height - fgWidth) / 2, width: fgWidth, height: fgWidth))
    
    //4. 获取上下文
    guard let resultImage = UIGraphicsGetImageFromCurrentImageContext() else { return UIImage() }
    
    //5. 关闭上下文
    UIGraphicsEndImageContext()
    
    return resultImage
}

```

> 后续会研究彩色二维码的黑科技, 敬请期待...

## 识别二维码
> 识别图片中二维码步骤
- 创建探测器
  - 属于CoreImage框架(CIDetector)
- 获取CIImage类型的图片
- 获取图片中所有符合特征的内容(CIQRCodeFeature)
- 遍历所有的特性(CIQRCodeFeature)
- 获取特征中代表的信息(messageString)
- 识别二维码的代码实现

```objc
/* *  @param qrCodeImage 二维码的图片
   *  @return 结果的数组 */
func recognitionQRCode(qrCodeImage: UIImage) -> [String]? {
    //1. 创建过滤器
    let detector = CIDetector(ofType: CIDetectorTypeQRCode, context: nil, options: nil)
    
    //2. 获取CIImage
    guard let ciImage = CIImage(image: qrCodeImage) else { return nil }
    
    //3. 识别二维码
    guard let features = detector?.features(in: ciImage) else { return nil }
    
    //4. 遍历数组, 获取信息
    var resultArr = [String]()
    for feature in features {
        resultArr.append(feature.type)
    }
    
    return resultArr
}

```

## 二维码的扫描
- 创建输入设备(摄像头)
  - 获取摄像头设备
  - 创建输入对象
- 创建输出设置(元数据)
  - 创建输出对象
  - 设置输出对象的代理(在代理中获取扫描到的数据)
  - 设置输出数据的类型
- 创建捕捉会话
  - 将输入添加到会话中
  - 将输出添加到会话中
- 添加预览图片(方便用于查看)
  - 创建图层,将图片添加到View图层中
- 开始扫描

### 懒加载输入输出中间会话

```objc
//输入输出中间桥梁(会话)
fileprivate lazy var session : AVCaptureSession = AVCaptureSession()
```
### 初始化扫描设备
#### 注意: `AVCaptureMetadataOutputObjectsDelegate`的代理设置, 该协议中的方法会将扫描的结果返回

```objc
fileprivate func addScaningVideo(){
    //1.获取输入设备（摄像头）
    guard let device = AVCaptureDevice.default(for: .video) else { return }
    
    //2.根据输入设备创建输入对象
    guard let deviceInput = try? AVCaptureDeviceInput(device: device) else { return }
    
    //3.创建原数据的输出对象
    let metadataOutput = AVCaptureMetadataOutput()
    
    //4.设置代理监听输出对象输出的数据，在主线程中刷新
    metadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)
    
    //5.创建会话（桥梁）
    //        let session = AVCaptureSession()
    
    //6.添加输入和输出到会话
    if session.canAddInput(deviceInput) {
        session.addInput(deviceInput)
    }
    if session.canAddOutput(metadataOutput) {
        session.addOutput(metadataOutput)
    }
    
    //7.告诉输出对象要输出什么样的数据(二维码还是条形码),要先创建会话才能设置
    metadataOutput.metadataObjectTypes = [.qr, .code128, .code39, .code93, .code39Mod43, .ean8, .ean13, .upce, .pdf417, .aztec]
    
    //8.创建预览图层
    let previewLayer: AVCaptureVideoPreviewLayer = AVCaptureVideoPreviewLayer(session: session)
    previewLayer.videoGravity = .resizeAspectFill
    previewLayer.frame = view.bounds
    view.layer.insertSublayer(previewLayer, at: 0)
    
    //9.设置有效扫描区域(默认整个屏幕区域)（每个取值0~1, 以屏幕右上角为坐标原点）
    let rect = CGRect(x: scanImageView.frame.minY / kScreenHeight, y: scanImageView.frame.minX / kScreenWidth, width: scanImageView.frame.height / kScreenHeight, height: scanImageView.frame.width / kScreenWidth)
    metadataOutput.rectOfInterest = rect
    
    //10. 开始扫描
    session.startRunning()
}

```

#### 代理方法的实现
- 需要将扫描的结果转化成机器可读的编码数据,才能获取二维码的相关信息

```objc
extension ScaningViewController: AVCaptureMetadataOutputObjectsDelegate {
    func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
        //1. 取出扫描到的数据: metadataObjects
        //2. 以震动的形式告知用户扫描成功
        AudioServicesPlaySystemSound(SystemSoundID(kSystemSoundID_Vibrate))
        
        //3. 关闭session
        session.stopRunning()
        
        //4. 遍历结果
        var resultArr = [String]()
        for result in metadataObjects {
            //转换成机器可读的编码数据
            if let code = result as? AVMetadataMachineReadableCodeObject {
                resultArr.append(code.stringValue ?? "")
            }else {
                resultArr.append(result.type.rawValue)
            }
        }
        
        //5. 将结果
        let vc = ShowViewController()
        vc.scanDataArr = resultArr
        navigationController?.pushViewController(vc, animated: true)
    }
}

```


## [项目地址: Github ](https://github.com/coderQuanjun/JunQRCode)

- 感谢大家的支持



---

