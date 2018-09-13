---
title: iOS的静态库和动态库
date: 2018-09-12 11:56:26
tags: [静态库, 动态库, framewoframework]
categories: 组件化开发
image:
---

![staticFramework](http://pcat1usdp.bkt.clouddn.com/staticFramework.png)

<!--more-->

## 静态库简介

### 什么是库?

- 库从本质上来说是一种可执行代码的二进制格式，可以被载入内存中执行
- 库就是程序代码的集合, 是共享程序代码的一种方式
- 库从广义上可分为开源库和闭源库, 而闭源库才分为静态库和动态库
  - 开源库: 对外公开源代码, 能看到具体的代码实现, 例如`Github`上面的第三方开源库都称之为开源库
  - 闭源库: 不公开源代码, 文件是经过编译后的二进制文件, 看不到具体实现, 例如`.a`文件和`.framework`文件


### 静态库与动态库

- 静态库：链接时完整地拷贝至可执行文件中，被多次使用就有多份冗余拷贝
  - 静态库有两种存在形式: `.a`和`.framework`
- 动态库：动态库则不会复制, 只有一份. 程序运行时动态加载到内存; 系统只加载一次, 多个程序共用, 节省内存
  - 动态库有两种存在形式: `.dylib`和`.framework`
  - 需要注意的是: 系统的`.framework`是动态库，我们自己建立的`.framework`是静态库
- 但是项目中如果使用到自己的动态库, 苹果是不允许上架!
- 再但是`WWDC2014`上公布的苹果对`ios8`开放动态加载`dylib`的接口 也就是说 开放了动态库挂载, 但是目前几乎没有上架的项目使用


 <div class="note info"><p>`.a`与`.framework`的区别</p></div>

- `.a`是一个纯二进制文件不能直接使用, 必须要有`.h`文件才能使用, `.h`文件对外提供接口, `.a`文件是代码的具体实现, 即`.m`
- `.framework`中除了有二进制文件之外还有资源文件, 可以直接使用
- 所以开发中建议使用`.framework`


### 为什么要使用静态库？

- 保护自己的核心代码, 国内的企业，掌握有核心技术，同时是又希望更多的程序员来使用其技术，因此采用"闭源"的方式开发使用
- 实现iOS项目的组件化, 可以把固定的业务模块编译成静态库
- 开发第三方SDK, 例如: 友盟SDK, 百度地图SDK....
- 提高项目的编译速度, 比如项目的组件化, 虽然使用了组件化, 但依然是源码, 如果工程庞大, 编译速度依然非常慢, 但是如果把响应的功能和业务组件编译成静态库, 将会大大提高项目的编译速度


## `.a`静态库的生成和使用

![staticLibrary](http://pcat1usdp.bkt.clouddn.com/staticLibrary.png)


- 生成`.a`静态库, 这里我们选择第二个创建
- 静态库分真机和模拟机两种环境
  - 在真机环境下编译出来的是只适用于真机的静态库
  - 在模拟机环境下编译出来的是只使用模拟机的静态库
  - 同事使用真机和模拟机的静态库, 后面会提到, 暂不赘述
- 在不同的环境下静态库支持的架构也是不同的, 模拟器下的静态库和真机下的静态库不能共用, 不同型号编译的静态库也是不能共用的
- 不同设备使用的CPU不同，从而使用的CPU架构（指令集）也不同，静态库有其支持的CPU架构，若静态库在不支持的CPU架构上运行程序就会崩溃


### 静态库的架构

```objc
// 1. 模拟器使用的CPU架构： 
iphone4s - iphone5 : i386 
iPhone5s - iPhoneX ：x86_64

// 2. 真机使用的CPU架构： 
iPhone3gs - iPhone4s：armv7 
iPhone5 - iPhone5c：armv7s 
iPhone5s - iPhoneX：armv64 
```


- 如果想要查看不同的机型所支持的架构, 可分别使用不同的模拟器或者真机, 编译出不同的静态库
- 然后使用终端, cd 到静态库所在的目录
- 在执行`lipo -info 静态库名称`即可


```objc
// 执行lipo -info的输出结果
$ lipo -info libStateLib.a 
input file libStateLib.a is not a fat file
Non-fat file: libStateLib.a is architecture: x86_64
```

### 编译多架构静态库

- 在调试不同机型的过程中, 需要选中每一个模拟器进行编译, 生成支持对应架构的静态库然后合并, 非常蛋疼
- 怎样一次编译支持多个架构的的静态库?

![bundleActive](http://pcat1usdp.bkt.clouddn.com/bundleActive.png)

- 该选项默认是`YES`, 也就是只编译当前活跃环境的架构, 设置成`No`即可
- 模拟器环境编译出来的就支持所有的模拟机型号, 真机亦是如此


### 静态库的版本

- 和`iOS`证书一样分调试版本(`Debug`)和发布版本`Release`
- 真机-`Debug`版本 
- 真机-`Release`版本 
- 模拟器-`Debug`版本 
- 模拟器-`Release`版本


<div class="note info"><p>调试版本`Debug`</p></div>

- 真机-`Debug`版本和模拟器-`Debug`版本 
- 调试版本的特点
  - 调试版本会包含完整的符号信息，以方便调试
  - 调试版本不会对代码进行优化


<div class="note info"><p>发布版本`Release`</p></div>

- 真机-`Release`版本和模拟器-`Release`版本 
- 发布版本的特点
  - 发布版本不会包含完整的符号信息， 
  - 发布版本的执行代码是进行过优化的， 
  - 发布版本的大小会比调试版本的略小， 
  - 在执行速度方面，发布版本会更快些，但不意味着会有显著的提升


<div class="note primary"><p>生成不同版本的静态库</p></div>

选择项目 `-> Edit Scheme -> Run -> Release/Debug` 分别进行编译, 即可得到不同版本的静态库

![EditScheme](http://pcat1usdp.bkt.clouddn.com/EditScheme.png)



### 生成`.a`和`.h`文件

- 正常情况下, 生成的`.h`文件是在`../include/$(PRODUCT_NAME)`目录下的, `$(PRODUCT_NAME)`指的是项目的名字
- 修改图中2处的路径地址, 即可修改`.h`文件生成的路径, 填空即为和`.a`文件在同级目录下


![image](http://pcat1usdp.bkt.clouddn.com/inclode2.png)



最后编写好代码, `command+B`编译之后, 如图所示操作即可找到生成的静态库

![image](http://pcat1usdp.bkt.clouddn.com/productA.png)



<div class="note success"><p>合并静态库</p></div>

- 因为静态库针对于模拟器和真机生成了不同版本(支持不同架构), 所以没法同时运行
- 合并后的静态库既可以在真机上调试，也可以在模拟器上调试, 省去了来回切换的诸多烦恼
- 但是合并后的静态库大小是模拟器和真机的大小之和，如果静态库太大，合并打包后，会非常大，因此很多第三方的静态库的`.a`是区分版本的


```objc
// 以下所有方式得到的静态库都可以通过lipo -info xx.a方式检测现有的架构, 注意要在xx.a所在的目录下

// 1. 合并静态库
lipo -create 静态库1路径 静态库2路径 -output 合并后的静态库名称

// 示例
lipo -create /Users/xxx/Debug-iphoneos/libStateLib.a /Users/xxx/Debug-iphonesimulator/libStateLib.a -output hahah.a


// 2. 移除某一个架构
lipo -remove 架构名称 静态库绝对路径 -output 新的静态库名字
lipo -remove arm64 /Users/xxx/Build/Products/hahah.a -output ha_arm64.a


// 2. 拆分出一个单独架构的静态库
lipo -thin 架构名称 静态库绝对路径 -output 新的静态库名字
lipo -thin arm64 /Users/xxx/Build/Products/hahah.a -output only_arm64.a
```


## `.framework`静态库

### 生成`.framework`静态库

#### 选择`framework`

创建新工程, 选择第一个创建`Framework`工程

![staticLibrary](http://pcat1usdp.bkt.clouddn.com/staticLibrary.png)


#### 选择编译环境

选择适配所有真机或者适配所有模拟器(编译所有架构), `Build Settings -> Build Active Architecture Only`选项设为`NO`


#### 手动设置静态库

刚创建的工程默认创建的是动态库, 需要手动设置链接类型, `Build Settings -> Mach-o Type`设置成`Static Library`

![machtype](http://pcat1usdp.bkt.clouddn.com/machtype.png)


#### 静态库版本

设置静态库的版本, 选择项目 -> `Edit Scheme -> Run -> Release/Debug` 分别进行编译, 即可得到不同版本的静态库


#### 添加公开头文件 

`Target->Build Phases->Headers`中的`Project`中要暴露的头文件拖拽到`Pulic`里面： 


![headerfile](http://pcat1usdp.bkt.clouddn.com/headerfile.gif)


#### 编译 

分别选择`Generic iOS Device`和任意一个模拟器各编译一次。编译完，工程中`Products`文件夹下的`xxx.framework`由红色变成了黑色，然后`show in finder`，看看生成的文件 


<div class="note warning"><p>注意事项</p></div>

- 如果静态库中有`category`类，则在使用静态库的项目配置中`Other Linker Flags`需要添加参数`-ObjC`或者`-all_load` 
- 如果创建的`framework`类中使用了`.tbd`，则需要在实际项目中导入`.tbd`动态库。
- `.framework`静态库的合并和拆分和`.a`静态库的方式一样, 就不在赘述了


### `bundle`加载资源

- 由于`Xcode`默认在编译时会把所有的素材文件导入到`mainBundle`中，可能会让宿主工程与使用静态库的程序冲突。
- 在创建静态库的项目中又是难免会用到一些图片或者`xib`等资源, 类似这些资源在静态库中又如何进行管理呢
- 这里我们就要引入一个`bundle`文件, 对资源进行管理, 用以存放`xib`文件或者图片等资源
- `bundle`文件是是静态的，不进行编译的资源文件, 所以使用时需要找到相应的资源路径


<div class="note success"><p>创建方式</p></div>

- 把包含资源文件的文件夹的后缀改为`.bundle`, 这时他就变成一个`bundle`文件
- 或者右键显示包内容就可以把对应的图片资源等放进文件中，然后把他丢进工程中就可以使用了
- 调用该图片时, 需要在图片名前加上`xxx.bundle`前缀


### 静态库的测试

- 静态库本身就是一个小项目, 实现某些功能, 但是这些功能在开发中也需要测试. 而测试代码又不能作为静态库的一部分
- 建议创建一个复合项目, 在宿主工程中添加一个静态库的工程

![allStatic](http://pcat1usdp.bkt.clouddn.com/allStatic.gif)


### 自动打包

- 上面介绍的都是手动打包的方式, 虽然麻烦一些, 但是相对更不容易出错, 而且可以对本地代码打包
- 还有一种自动打包方式, 只需一条命令`package`, 便可对静态库进行打包, 但是前提是: 代码必须已经上传到远程仓库
- 首先安装`package`: 
  - `sudo gem install cocoapods-packager`
- 使用

```objc
// 前提是代码必须已经上传到远程仓库, 否则报错不会成功
// 1. cd 到podspec文件所在的根目录

//2. 执行
pod package xxx.podspec
```



## 私有库的二进制

- 在组件化开发的过程选中, 虽然使用了组件化, 但依然是源码, 如果工程庞大, 编译速度依然非常慢
- 所以,为了加快编译速度可以直接把私有库打包成为一个静态库库文件, 进行使用
- 在每一个私有库里面都有一个这样的测试工程, 但是这个工程不能打包成静态库
- 但是, 如果为了打包静态库单独分离出一个工程用于打包, 那么我们后期就需要维护和更新两套代码, 过于繁琐
- 所以我们可以用符合工程进行处理, 在`Example`所在的测试工程中添加一个静态库的工程, 如[静态库的测试](#静态库的测试)所示

![exampleTest](http://pcat1usdp.bkt.clouddn.com/exampleTest.png)



### 打包静态库

这里我们是以`framework`静态库为例, 静态库工程添加之后, 左侧会多出一个类似`BaseLib`的文件夹, 该文件夹用于存放需要打包的文件, 即`TitanBase/Classes`目录下的文件

![image](http://pcat1usdp.bkt.clouddn.com/addItems.png)


- 导入文件的时候需要注意, 一定不能勾选`Copy Items`选项, 因为我们需要的是引用`Classes`目录下的文件, 而不是拷贝
- 如果是拷贝, 静态库和`Classes`目录使用的将会是两套不同的代码(虽然内容可能一样), 由乙方改变, 另一方的代码不会改变
- 引用则可以做到一改全改

![copyItem](http://pcat1usdp.bkt.clouddn.com/copyItem.png)


- 接下来选择静态库的工程, 并修改打包静态库的相应的配置, 步骤参考[生成.framework静态库](#生成.framework静态库)
- 这里生成的静态库的目录是系统默认, 我们也可以自行设置: `File -> WorkSpace Setting`

![selectLib](http://pcat1usdp.bkt.clouddn.com/selectLib.png)


- 最后在`Classes`的统计目录下创建一个`Products`的目录(自定义创建, 你开心就好)
- 把打包好的`.framework`或者`.a`的静态库, 放到`Products`目录下


### 修改`podspec`文件

#### 引入静态库

完成了静态库的打包, 下面就是修改`podspec`文件中相应的配置了


```ruby
s.source_files = 'TitanBase/Classes/**/*.h'
s.vendored_frameworks = "TitanBase/Products/BaseLib.framework"
```

- `source_files`: 需要导入的文件, 现在只需要导入`.h`文件即可
- `vendored_frameworks`: 需要导入的`framework`静态库
- 最后重新对测试工程进行`pod install`即可, 更多配置相关信息可参考[官方文档](https://guides.cocoapods.org/syntax/podspec.html#specification)


```ruby
# 表示依赖的系统类库，比如libz.dylib等
s.libraries     = 'z', 'sqlite3' 

# 表示依赖系统的框架
s.frameworks    = 'UIKit','AVFoundation' 

# 依赖的第三方/自己的framework静态库
s.vendored_frameworks = 'YJKit/YJKit.framework' 

# 表示依赖第三方/自己的静态库（比如libWeChatSDK.a）
s.vendored_libraries = 'Library/Classes/libWeChatSDK.a' 
# 依赖的第三方的或者自己的静态库文件必须以lib为前缀进行命名，否则会出现找不到的情况，这一点非常重要
```


#### 切换静态库和源码

- 开发过程中如果需要调试代码的时候, 需要查看源码进行调试
- 但是静态库却只能看到头文件, 没有源码, 无法进行调试
- 在导入的私有库中, 静态库和源码如何进行切换呢
- 这里我们在`podspec`配置文件中引入一个`if-else`语句, 如下所示

```ruby
  if ENV['IS_SOURCE']
      s.source_files = 'TitanBase/Classes/**/*'
      s.dependency 'AFNetworking'
  else
      s.source_files = 'TitanBase/Classes/**/*.h'
      s.vendored_frameworks = "TitanBase/Products/BaseLib.framework"
      s.dependency 'AFNetworking'
  end
```

- 此时如果需要切换为源码, 只需要执行`IS_SOURCE=1 pod install`即可(或者任意非0的数字, 非0即为真)
- 执行`pod install`, 就会执行`else`后面的语句, 即导入静态库
- 但是如果所有的组件都加了类似的判断, 切判断条件都是`IS_SOURCE`, 那么每次重新切换, 所有的组件都会导入源码或者导入静态库
- 建议每一语句可以加两个判断条件, 一个统一的判断条件, 一个只对每一个组件的条件

```ruby
  if ENV['IS_SOURCE'] || ENV['IS_BASE']
     ...
  else
      ...
  end
```


### 有依赖关系的静态库

- 对单独的静态库工程打包静态库的时候, 默认不会将第三方库的内容打包进去, 是可以使用的
- 对包含静态库工程的复合工程打包的时候, 可能会出现引用的第三方头文件找不到的问题或者出现打包出的静态库包含第三方库的代码和资源, 这样打包出来的静态库
  - 第一: 打包好的静态库应该是不能使用的
  - 第二: 打包好的静态库中包含第三方库的所有代码和资源, 所以打包的静态库会很大
- 所以我们打包静态库, 是不需要把第三方的任何东西打包进去的
- 在复合工程中建议的办法: 修改`Podfile`文件, 如下

```ruby
target 'CoreImage_Example' do
  pod 'CoreImage', :path => '../'

  target 'CoreImage_Tests' do
    inherit! :search_paths

    
  end
  
  # 以下添加的部分, CoreImgLib: 为静态库的名称, 需要在静态库中重新引用pod库的部分
  target 'CoreImgLib' do
      
  end
end
```

在引用第三方头文件的地方

```objc
// 如果使用""方式报错
#import "AFNetworking.h"

// 可改成以下方式引用
#import <AFNetworking/AFNetworking.h>
```

接下来在重新打包就可以了


### 多分类的静态库打包

类似`AFNetworking`的多分类框架


```ruby
-> AFNetworking (3.2.1)
   A delightful iOS and OS X networking framework.
   pod 'AFNetworking', '~> 3.2.1'
   - Homepage: https://github.com/AFNetworking/AFNetworking
   - Source:   https://github.com/AFNetworking/AFNetworking.git
   - Versions: 3.2.1, ......,0.5.1 [master repo]
   - Subspecs:
     - AFNetworking/Serialization (3.2.1)
     - AFNetworking/Security (3.2.1)
     - AFNetworking/Reachability (3.2.1)
     - AFNetworking/NSURLSession (3.2.1)
     - AFNetworking/UIKit (3.2.1)
```


- 对于有多个分类的私有库, 如果要打包成静态库
  - 一: 可以每个分类单独处理, 分别打包, 很麻烦不建议这么做(也没必要)
  - 二: 把分类整合到一起, 打包成一个静态库
- 如下, 如果使用源码, 按照分类导入, 如果使用静态库, 打包成一个静态库导入

```ruby
  if ENV['IS_SOURCE']
      # 静态库
      s.source_files = 'TKDownloadPlayer/Classes/**/*.h'
      s.vendored_frameworks = 'TKDownloadPlayer/Products/TKDownPlayerLib.framework'
  else
      # 源码
      s.subspec 'TKDownload' do |dl|
          dl.source_files = 'TKDownloadPlayer/Classes/TKDownload/**/*'
      end
      
      s.subspec 'TKRemotePlayer' do |rp|
          rp.source_files = 'TKDownloadPlayer/Classes/TKRemotePlayer/**/*'
      end
  end
```


---


