---
title: Flutter的安装和配置
date: 2019-02-12 19:20:40
tags: [Flutter, iOS, Android, Dart]
categories: Flutter笔记
image:
---


![Flutter](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/flutter.jpeg?x-oss-process=style/titanjun)



<!--more-->


- `Flutter`是谷歌的移动`UI`框架，可以快速在`iOS`和`Android`上构建高质量的原生用户界面, 并且是未来新操作系统[Fuchsia](https://baike.baidu.com/item/Fuchsia/19900570)的默认开发套件
- 在全世界，`Flutter`正在被越来越多的开发者和组织使用，并且`Flutter`是完全免费、开源的----[Flutter中文网](https://flutterchina.club/)
- `Flutter`同时支持`Windows`、`Linux`和`MacOS`操作系统作为开发环境，并且在`Android Studio`和`VS Code`两个`IDE`上都提供了全功能的支持
- `Flutter`以`Dart`语言为开发语言(之后的文章会介绍)


## 跨平台框架

- 在`Flutter`诞生之前，已经有许多跨平台`UI`框架的方案，比如基`于WebView`的`Cordova`、`AppCan`等，还有使用`HTML+JavaScript`渲染成原生控件的`React Native`、`Weex`等(虽然我只用过`React Native`)
- 基于`WebView`的框架
  - 优点很明显，它们几乎可以完全继承现代`Web`开发的所有成果（丰富得多的控件库、满足各种需求的页面框架、完全的动态化、自动化测试工具等等），当然也包括`Web`开发人员，不需要太多的学习和迁移成本就可以开发一个`App`
  - 缺点也很致命, 在对体验和性能有较高要求的情况下, `WebView`的渲染效率和`JavaScript`执行性能太差。再加上`Android`各个系统版本和设备厂商的定制，很难保证所在所有设备上都能提供一致的体验
- `React Native`一类的框架
  - 将最终渲染工作交还给了系统，虽然同样使用类`HTML+JS`的`UI`构建逻辑，但是最终会生成对应的自定义原生控件，以充分利用原生控件相对于`WebView`的较高的绘制效率
  - 同时这种策略也将框架本身和`App`开发者绑在了系统的控件上，不仅框架本身需要处理大量平台相关的逻辑，随着系统版本变化和`API`的变化，开发者可能也需要处理不同平台的差异，甚至有些特性只能在部分平台上实现，这样框架的跨平台特性就会大打折扣
- `Flutter`框架
  - `Flutter`则开辟了一种全新的思路，从头到尾重写一套跨平台的`UI`框架，包括`UI`控件、渲染逻辑甚至开发语言
  - `Flutter`使用自己的高性能渲染引擎来绘制`widget`, `Flutter`使用`C`、`C ++`、`Dart`和`Skia`（2D渲染引擎）构建
  - 在`iOS`上，`Flutter`引擎的`C/C ++`代码使用`LLVM`编译，任何`Dart`代码都是`AOT`编译为本地代码的，`Flutter`应用程序使用本机指令集运行（不涉及解释器）
  - 而在`Android`下，`Flutter`引擎的`C/C ++`代码是用`Android`的`NDK`编译的，任何`Dart`代码都是`AOT`编译成本地代码的，`Flutter`应用程序依然使用本机指令集运行（不涉及解释器）


## `Flutter`安装

- 可参考官网的[安装Flutter](https://flutterchina.club/get-started/install/), 支持`Windows`、`Linux`和`MacOS`操作系统
- 我使用的系统是`MacOS`操作系统

### 系统要求

要安装并运行`Flutter`，您的开发环境必须满足以下最低要求:

- 操作系统: macOS (64-bit)
- 磁盘空间: 700 MB (不包括`Xcode`或`Android Studio`的磁盘空间）.
- 工具: `Flutter`依赖下面这些命令行工具.
  - `bash`, `mkdir`, `rm`, `git`, `curl`, `unzip`, `which`

### 获取`Flutter SDK`

#### 下载SDK

- 去`Flutter`官网下载其最新可用的安装包，[转到下载页](https://flutter.io/docs/development/tools/sdk/archive?tab=macos#macos)
- 注意，`Flutter`的渠道版本会不停变动，请以`Flutter`官网为准
- 另外，在中国大陆地区，要想正常获取安装包列表或下载安装包，可能需要翻墙，读者也可以去`Flutter github`项目下去下载安装包，[转到下载页](https://github.com/flutter/flutter/releases)

![Flutter_SDK](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/flutter_SDK.png?x-oss-process=style/titanjun)


#### 环境配置

- 解压SDK并把解压好的文件全部放在你想要放置的位置, 建议和其他开发语言的SDK放置在一起, 比如`~/Library/Flutter`
- 为了方便后续使用，需要将项目根目录下`bin`路径加入环境变量`PATH`中
  - 编辑器打开`~/.bash_profile`文件, 添加如下


```rb
# Flutter 相关配置
# xxx是你自己的Flutter文件夹路径
export PATH=/xxx/Flutter/bin:$PATH
```

由于在国内访问`Flutter`有时可能会受到限制，`Flutter`官方为中国开发者搭建了临时镜像，大家可以将如下环境变量加入到用户环境变量中：

```ruby
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

<div class="note warning"><p>注意</p></div>

此镜像为临时镜像，并不能保证一直可用，读者可以参考详情请参考 [Using Flutter in China](https://github.com/flutter/flutter/wiki/Using-Flutter-in-China) 以获得有关镜像服务器的最新动态


<div class="note info"><p>保存文件, 并更新当前配置</p></div>


```ruby
# 执行命令
source ~/.bash_profile
```

<div class="note success"><p>验证`flutter/bin`目录是否在你的PATH中</p></div>


```ruby
# 执行下面命令
echo $PATH
```

如果安装成功, 会输出类似`/xxx/Flutter/bin`的路径


### 安装开发工具

#### 安装Android Studio

- 下载并安装[Android Studio](http://www.android-studio.org/)
- 启动`Android Studio`，然后执行`Android Studio`安装向导, 这将安装最新的`Android SDK`，`Android SDK`平台工具和`Android SDK`构建工具, 这是`Flutter`开发`Android`应用时所必备的
- 安装完成后, 配置一个需要的`Android`模拟器


#### 安装Xcode

在`App Store`搜索最新版本`Xcode`下载安装即可


#### VSCode

开发`IDE`，直接去[官网下载](https://code.visualstudio.com/)安装即可


### 环境配置检测

通过`flutter doctor`命令来执行`Flutter`的安装程序了，经过一段时间的下载和安装，`Flutter`会输出安装结果(时间可能会比较久)


```
$ flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel beta, v0.5.1, on Mac OS X 10.13.5 17F77, locale en-NZ)
[!] Android toolchain - develop for Android devices (Android SDK 26.0.2)
    ! Some Android licenses not accepted.  To resolve this, run: flutter doctor --android-licenses
[!] iOS toolchain - develop for iOS devices (Xcode 9.4.1)
    ✗ Missing Xcode dependency: Python module "six".
    Install via 'pip install six' or 'sudo easy_install six'.
    ✗ libimobiledevice and ideviceinstaller are not installed. To install, run:
        brew install --HEAD libimobiledevice
        brew install ideviceinstaller
    ✗ ios-deploy not installed. To install:
        brew install ios-deploy
    ✗ CocoaPods not installed.
        CocoaPods is used to retrieve the iOS platform side's plugin code that responds to your plugin usage on the Dart side.
        Without resolving iOS dependencies with CocoaPods, plugins will not work on iOS.
        For more info, see https://flutter.io/platform-plugins
    To install:
        brew install cocoapods
        pod setup
[✓] Android Studio
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
[✓] Android Studio (version 3.0)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
[!] IntelliJ IDEA Ultimate Edition (version 2017.1.1)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
[!] VS Code (version 1.24.1)
[!] Connected devices
    ! No devices available

! Doctor found issues in 5 categories.
```

- 其中前面有`[✓]`标识的是已经安装成功的
- `[!]`标识是需要安装或者更新的
- 下面介绍需要安装的编辑器及其配置


## 开发工具


运行`flutter doctor`命令可看到相关信息

- `Flutter`的版本和信息
- `Flutter`运行所需的`Android`工具链，有些许可证没有接受，输入提示命令，输入`y`确认
- `Flutter`运行所需的`iOS`工具链不满足
- `AS`、`IDEA`的`Flutter`插件没有安装，所以需要安装，因此需要配置`AS`或`IDEA`
- 有可用的连接设备


### `Android Studio`

- 打开插件选择项`Preferences > Plugins`
- 选择`Browse repositories`，搜索`Flutter`插件并安装(同时自动安装`Dart`插件)
- 插件安装完成后, 重启`Android Studio`后插件生效

![android_flutter](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/android_flutter.png?x-oss-process=style/titanjun)


这时候在命令行运行`flutter doctor`，可以看到`Android Studio`已经好了

```
[✓] Android Studio (version 3.2)
```

### iOS配置

- 在进行`iOS`配置之前, 首先需要安装`CocoaPods`, 可自行百度
- 安装`CocoaPods`后, 在执行`flutter doctor`命令, 可能会出现如下问题
- 此时在终端中依次执行出现的命令即可

```ruby
[!] iOS toolchain - develop for iOS devices

# 可能出现的命令, 若出现, 依次执行出现的命令即可, 未出现的可不执行
$ brew install --HEAD usbmuxd
$ brew link usbmuxd
$ brew install --HEAD libimobiledevice
$ brew install ideviceinstaller ios-deploy cocoapods
$ pod setup
```

这时候在命令行运行`flutter doctor`，可以看到`iOS`相关配置也好了


### VSCode插件

在扩展中搜索`Flutter`和`Dart`安装后, 重载即可


### 配置完成

此刻, 在运行`flutter doctor`命令, 应该就没有问题了


```
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, v1.0.0, on Mac OS X 10.14.3 18D109, locale
    zh-Hans-CN)
[✓] Android toolchain - develop for Android devices (Android SDK 28.0.3)
[✓] iOS toolchain - develop for iOS devices (Xcode 10.1)
[✓] Android Studio (version 3.0)
[✓] VS Code (version 1.30.2)
[✓] Connected device (1 available)

• No issues found!
```


## 创建Flutter应用

### CSCode创建

中文版: `vscode` -> 查看 -> 命令面板 -> `Flutter: new project` -> 输入项目名称


<div class="note warning"><p>注意</p></div>

项目名称不支持大写字母


### Android Studio创建

打开`Android studio`就可以看见`Flutter`工程模板如下

![android_create_flutte](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/android_create_flutter.png)

### 命令创建

```
flutter create helloflutter
```

这里创建了一个名为`helloflutter`的`Dart package`

<div class="note info"><p>参数介绍</p></div>

- 要创建插件包，请使用`--template=plugin`参数执行`flutter create`
- 使用`--org`选项指定您的组织，并使用反向域名表示法。该值用于生成的`Android`和`iOS`代码中的各种包和包标识符。

```
flutter create --org com.example --template=plugin helloflutter
```

- 默认情况下，插件项目针对`iOS`代码使用`Objective-C`，`Android`代码使用`Java`。
- 如果您更喜欢`Swift`或`Kotlin`，则可以使用`-i`或`-a` 为`iOS`或`Android`指定语言。例如：

```
flutter create --template=plugin -i swift -a kotlin helloflutter
```

### 参考文章

- [Flutter的原理及美团的实践](http://blog.itpub.net/31077337/viewspace-2199818/)
- [Flutter中文网](https://flutterchina.club/)


> 初识`Flutter`, 总结的可能也不准确, 不足之处还望海涵, 后续会继续优化相关文章


---

