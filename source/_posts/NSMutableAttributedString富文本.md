---
title: NSMutableAttributedString富文本
date: 2017.05.19 16:57:23
tags: [Swift, 富文本]
categories: 高级用法
---

在iOS开发中，常常会有一段文字显示不同的颜色和字体，或者给某几个文字加删除线或下划线的需求。以及一些直播界面中包含图片和字体的弹幕效果，大部分都是由NSMuttableAttstring（带属性的字符串）实现的。
 
<!-- more -->
## 一、简易使用方法

> 1、示例代码

```objc
    fileprivate func addAttributeString() -> NSMutableAttributedString{
        
        let time = "还剩 19 时 30 分 40 秒 开售"
        let timeAtt = NSMutableAttributedString(string: time)
        
        //字典中存放一些属性名和属性值
        let timeDic = [NSFontAttributeName : UIFont.systemFont(ofSize: 18), NSForegroundColorAttributeName : UIColor.red, NSBackgroundColorAttributeName : UIColor.orange]
        
        //为某一范围内的文字设置多个属性
        timeAtt.setAttributes(timeDic, range: NSMakeRange(2, 4))
        //为某一范围内的文字添加单个属性
        timeAtt.addAttribute(NSFontAttributeName, value: UIFont.systemFont(ofSize: 18), range: NSMakeRange(8, 4))
        //为某一范围内的文字添加多个属性
        timeAtt.addAttributes(timeDic, range: NSMakeRange(8, 4))
        //为某一范围内的文字移除某个属性
        timeAtt.removeAttribute(NSFontAttributeName, range: NSMakeRange(8, 4))
        
        return timeAtt
    }

```

> 字符串处理

```objc
//拼接字符串
timeAtt.append(NSAttributedString)

//插入字符串
timeAtt.insert(NSAttributedString, at: Int)

//替换
timeAtt.replaceCharacters(in: NSRange, with: NSAttributedString)
timeAtt.replaceCharacters(in: NSRange, with: String)

//删除
timeAtt.removeAttribute(String, range: NSRange)

```


> 2、常见属性及说明

```objc
NSFontAttributeName                设置字体属性，默认值：字体：Helvetica(Neue) 字号：12

NSForegroundColorAttributeNam      设置字体颜色，取值为 UIColor对象，默认值为黑色

NSBackgroundColorAttributeName     设置字体所在区域背景颜色，取值为 UIColor对象，默认值为nil, 透明色

NSLigatureAttributeName            设置连体属性，取值为NSNumber 对象(整数)，0 表示没有连体字符，1 表示使用默认的连体字符

NSKernAttributeName                设定字符间距，取值为 NSNumber 对象（整数），正值间距加宽，负值间距变窄

NSStrikethroughStyleAttributeName  设置删除线，取值为 NSNumber 对象（整数）

NSStrikethroughColorAttributeName  设置删除线颜色，取值为 UIColor 对象，默认值为黑色

NSUnderlineStyleAttributeName      设置下划线，取值为NSNumber对象（整数），枚举常量NSUnderlineStyle中的值，与删除线类似

NSUnderlineColorAttributeName      设置下划线颜色，取值为 UIColor 对象，默认值为黑色

NSStrokeWidthAttributeName         设置笔画宽度，取值为 NSNumber 对象（整数），负值填充效果，正值中空效果

NSStrokeColorAttributeName         填充部分颜色，不是字体颜色，取值为 UIColor 对象

NSShadowAttributeName              设置阴影属性，取值为 NSShadow 对象

NSTextEffectAttributeName          设置文本特殊效果，取值为 NSString 对象，目前只有图版印刷效果可用：

NSBaselineOffsetAttributeName      设置基线偏移值，取值为 NSNumber （float）,正值上偏，负值下偏

NSObliquenessAttributeName         设置字形倾斜度，取值为 NSNumber （float）,正值右倾，负值左倾

NSExpansionAttributeName           设置文本横向拉伸属性，取值为 NSNumber （float）,正值横向拉伸文本，负值横向压缩文本

NSWritingDirectionAttributeName    设置文字书写方向，从左向右书写或者从右向左书写

NSVerticalGlyphFormAttributeName   设置文字排版方向，取值为 NSNumber 对象(整数)，0 表示横排文本，1 表示竖排文本

NSLinkAttributeName                设置链接属性，点击后调用浏览器打开指定URL地址

NSAttachmentAttributeName          设置文本附件,取值为NSTextAttachment对象,常用于文字图片混排

NSParagraphStyleAttributeName      设置文本段落排版格式，取值为 NSParagraphStyle 对象

```


> ## [更多方法和属性说明详见苹果官方说明文档](https://developer.apple.com/reference/foundation/nsmutableattributedstring#//apple_ref/doc/uid/TP40003689)


## 二实现图文混排
> 效果如图

![image](http://upload-images.jianshu.io/upload_images/2092665-fa45440126fc57c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 实例代码


```objc
//1,富文本字符串
let attText = NSMutableAttributedString(string: "你好不好")
attText.setAttributes([NSForegroundColorAttributeName : UIColor.orange], range: NSMakeRange(0, 4))
        
//2,图片处理
let attachment = NSTextAttachment()
attachment.image = UIImage(named: "tt1")
        
//3,计算文字高度
let lineHeight = label.font.lineHeight
        
//4,设置图片的显示大小
attachment.bounds = CGRect(x: 0, y: 0, width: lineHeight, height: lineHeight)
//5,图片转成富文本
let picAtt = NSAttributedString(attachment: attachment)
        
//6,插入到原字符串中
attText.insert(picAtt, at: 2)

```

> 菜鸟一枚,文中如有不妥之处还望多多指正;互相学习共同进步!

> 喜欢的朋友可以点下喜欢,并关注下!