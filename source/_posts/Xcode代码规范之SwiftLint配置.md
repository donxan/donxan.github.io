---
title: Xcode代码规范之SwiftLint配置
date: 2018-02-07 15:34:34
tags: [SwiftLint, Swift, Homebrew]
categories: SwiftLint
---

## 前言
- 最近公司大佬考虑将项目代码规范化, 然而自Xcode9之后,Xcode的插件基本处于废弃的状态大部分插件都是在一年前就停止更新了;
- 于是在谷歌找到了一款强大的代码规范工具[SwiftLint](https://github.com/realm/SwiftLint)
- [SwiftLint](https://github.com/realm/SwiftLint)是 [Realm](https://realm.io/) 推出的一款 Swift 代码规范检查工具, SwiftLint 基于 [Github 公布的 Swift 代码规范](https://github.com/Artwalk/swift-style-guide/blob/master/README_CN.md)进行代码检查，并且能够很好的和 Xcode 整合
- [Github 公布的 Swift 代码规范--原文](https://github.com/github/swift-style-guide)
- [Github 公布的 Swift 代码规范--中文](https://github.com/Artwalk/swift-style-guide/blob/master/README_CN.md)
- 配置好所有的设置之后，在 Xcode 中执行编译时，SwiftLint 会自动运行检查，不符合规范的代码会通过警告或者 红色错误 的形式指示出来
- 支持自定义规则,可禁用或者开启某一些规则

<!-- more -->

## 安装SwiftLint
- SwiftLint目前有三种安装方式可供选择,可以根据自己的项目需要自行选择

### 安装全局配置(Homebrew 安装)
#### Homebrew
- Homebrew, Mac系统的包管理器，用于安装NodeJS和一些其他必需的工具软件, 输入以下代码安装:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
译注：在Max OS X 10.11（El Capitan)版本中，homebrew在安装软件时可能会碰到/usr/local目录不可写的权限问题。可以使用下面的命令修复：

```
sudo chown -R `whoami` /usr/local
```

- Homebrew 会自动安装最新版本
- 打开终端输入以下代码:

```
brew install swiftlint
```
#### 安装成功,如下图所示:

![Homebrew 安装](http://upload-images.jianshu.io/upload_images/4122543-aaabe87320b6b9f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 使用 CocoaPods 安装
- 这种方式只能针对单个项目有效,如果你想要针对不同的项目使用不同的`SwiftLint` 版本，这是一种很好的解决方案
- 需要注意的是使用这种方案会将整个`SwiftLint`以及他的依赖包的完整资源文件都安装到 Pods/ 目录中去，所以在使用版本管理工具比如 `git/svn` 时要注意设置忽略相关目录
- CocosPods安装和安装第三方框架一样
- 在根目录创建`Podfile`

```
pod 'SwiftLint'
```

### 使用安装包
`SwiftLint` 还支持使用 `pkg` 安装包进行安装，在官方的 Github 页面可以找到最新发布的[安装包](https://github.com/realm/SwiftLint/releases/tag/0.17.0)


## 查看SwiftLint的全部命令
- 等待安装完成，在终端输入 `swiftlint help` 可以查看所有可用的命令：

![SwiftLint的所有命令](http://upload-images.jianshu.io/upload_images/4122543-a9eaa0ae5b92f67b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**各个命令注释**

```objc
//查看所有命令
swiftlint help

//忽略空格导致的警告和错误
swiftlint autocorrect

//输出所有的警告和错误
swiftlint lint

//查看所有可获得的规则以及对应的 ID
swiftlint rules

//产看当前版本号
swiftlint version
```

- 我们将目录切换到工程的根目录之下，然后敲击如下命令:

```
swiftlint autocorrect
```
然后我们就会发现，所有的空格符Warning都消失了。这都得益于我们刚刚所进行的命令行操作，它会将已知的能够自动修复的Error和Warning都自动修复，大大的减轻了我们的工作量。



## SwiftLint的使用
> 安装完成后,需要在Xcode中配置相关设置,才能使 SwiftLint 在 Xcode 中自动检测代码规范。配置也很简单，只需要在 Xcode 的 Build Phases 中新建一个 Run Script Phase 配置项，在里面添加相关代码后,编译即可!

- 配置代码添加步骤
- 需要将相关脚本添加到红色框内

![配置代码添加步骤](http://upload-images.jianshu.io/upload_images/4122543-9fcfc0ce421210db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800)

**1. 全局安装脚本添加方式**

```
if which swiftlint >/dev/null; then
  swiftlint
else
  echo "warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint"
fi
```

**2. CocoaPods安装脚本添加**

```
"${PODS_ROOT}/SwiftLint/swiftlint"
```

- 这里其实是设置了一个自动编译脚本，每次运行编译都会自动执行这个脚本
- 如果正确安装了 SwiftLint，就会执行 SwiftLint 中的代码规范检查，如果没有安装，脚本会抛出一个没有安装 SwiftLint 并提示下载的警告，方便提醒团队团队中没有安装的成员。
- 当然，你也可以设置为强制要求安装，这时如果没有安装则无法通过编译。只需要在脚本中
```
echo "warning: ..."
```

之后添加一行代码：

```
exit 1
```

- 这样一来，如果没有安装 SwiftLint，编译时会直接抛出一个编译错误而非警告，提示需要安装 SwiftLint。


**3. 配置完成后,`command+B`编译**
- 如果你的是正在开发中的项目, 你可能会发现你的项目提示999+的黄色警告和999+的红色错误
- 甚至你会发现甚至一些空格和一些系统的方法和注释也会报错或者警告
- `SwiftLint`默认方法名或者注释不得超过120个字符
- 
![测试项目](http://upload-images.jianshu.io/upload_images/4122543-271410cb5d83bea3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- Swift Lint 在完成上述操作之后，便已经生效。但是，如果觉得默认的风格过于严格，或者项目组有另外的要求，Swift Lint 也可以定制相应的风格，或者禁用某些规则。
- [SwiftLint](https://github.com/realm/SwiftLint) 的全部规则可以在：[Source/SwiftLintFramework/Rules](https://github.com/realm/SwiftLint/tree/master/Source/SwiftLintFramework/Rules) 目录内找到
- 

## 自定义配置
- 当你编译过项目后,看到999+的警告和错误,是不是第一反应就是要放弃了,其实不然
- 仔细看一下具体的错误，会发现好多都是第三方库的代码规范问题，而且好多问题的级别被设置成为了 error
- 第三方库的代码规范问题,这个锅我们可不能背
- 这里我们可以做一些配置，让 `SwiftLint` 在做代码规范检查的时候自动忽略 `CocoaPods`、`Carthage` 等包管理器引入的第三方库（当然，手动导入的第三方库也能设置忽略）

### 创建配置文件
- 首先需要在项目的根目录下新建一个名为 .swiftlint.yml 的配置文件
- 打开终端, cd 到项目根目录下
- 输入: `touch .swiftlint.yml`
- 执行完该命令后, 在文件夹中你可能找不到该yml格式文件,那是因为文件被隐藏了
- 关于隐藏/显示隐藏文件(命令一样): `command + shift + .`
- 下面我们来认识一下主要的几个配置选项

```objc
disabled_rules: # 禁用指定的规则
  - colon
  - comma
  - control_statement
opt_in_rules: # 启用指定的规则
  - empty_count
  - missing_docs
  # 可以通过执行如下指令来查找所有可用的规则:
  # swiftlint rules
included: # 执行 linting 时包含的路径。如果出现这个 `--path` 会被忽略。
  - Source
excluded: # 执行 linting 时忽略的路径。 优先级比 `included` 更高。
  - Carthage
  - Pods
  - Source/ExcludedFolder
  - Source/ExcludedFile.swift
```

### 在代码中关闭某个规则
可以通过在一个源文件中定义一个如下格式的注释来关闭某个规则：
```
// swiftlint:disable <rule>
```
在该文件结束之前或者在定义如下格式的匹配注释之前，这条规则都会被禁用：
```
// swiftlint:enable <rule>
```
例如:
```
    // swiftlint:disable opening_brace
    func initTakeScreenshot(launchOptions: [AnyHashable: Any]?){
        // swiftlint:enable opening_brace
        if let options = launchOptions {
            let userInfo = options[UIApplicationLaunchOptionsKey.remoteNotification]
            NotificationCenter.default.post(name: Notification.Name.UIApplicationUserDidTakeScreenshot, object: userInfo)
        }
    }
```
规则关闭之前

![Snip20180207_1.png](http://upload-images.jianshu.io/upload_images/4122543-21790882f651fa95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

规则关闭之后
![Snip20180207_2.png](http://upload-images.jianshu.io/upload_images/4122543-6ba8e782746c0849.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

也可以通过添加 :previous, :this 或者 :next 来使关闭或者打开某条规则的命令分别应用于前一行，当前或者后一行代码。

例如:

```
// swiftlint:disable:next force_cast
let noWarning = NSNumber() as! Int
let hasWarning = NSNumber() as! Int
let noWarning2 = NSNumber() as! Int // swiftlint:disable:this force_cast
let noWarning3 = NSNumber() as! Int
// swiftlint:disable:previous force_cast
```

### 忽略引入的第三方库
- 1). 忽略`CocoaPods`导入的第三方库

```
excluded: 
  - Pods
```

- 2). excluded 配置项用来设置忽略代码规范检查的路径，可以指定整个文件夹
- 比如如果你的项目使用 Carthage 管理第三方库的话，可以将 Carthage 目录添加到忽略列表：

```
excluded: 
  - Pods
  - Carthage
```

- 3). 指定精确路径下的文件，通过 - xxxx 的形式列在下面就可以了

```
excluded: # 执行 linting 时忽略的路径。 优先级比 `included` 更高。
  - Source/ExcludedFolder
  - Source/ExcludedFile.swift
```

### 嵌套配置
`SwiftLint` 支持通过嵌套配置文件的方式来对代码分析过程进行更加细致的控制。
- 在你的根 `.swiftlint.yml` 文件里设置 `use_nested_configs: true` 值。
- 在目录结构必要的地方引入额外的 `.swiftlint.yml` 文件。
- 每个文件被检查时会使用在文件所在目录下的或者父目录的更深层目录下的配置文件。否则根配置文件将会生效。
- `excluded`，`included`，和 `use_nested_configs` 在嵌套结构中会被忽略。

### 自动更正
- `SwiftLint` 可以自动修正某些错误，磁盘上的文件会被一个修正后的版本覆盖。
- 请确保在对文件执行 `swiftlint autocorrect` 之前有对它们做过备份，否则的话有可能导致重要数据的丢失。
- 因为在执行自动更正修改某个文件后很有可能导致之前生成的代码检查信息无效或者不正确，所以当在执行代码更正时标准的检查是无法使用的。

## 最后贴上官方示例

```
disabled_rules: # 执行时排除掉的规则
  - colon
  - comma
  - control_statement
opt_in_rules: # 一些规则仅仅是可选的
  - empty_count
  - missing_docs
  # 可以通过执行如下指令来查找所有可用的规则:
  # swiftlint rules
included: # 执行 linting 时包含的路径。如果出现这个 `--path` 会被忽略。
  - Source
excluded: # 执行 linting 时忽略的路径。 优先级比 `included` 更高。
  - Carthage
  - Pods
  - Source/ExcludedFolder
  - Source/ExcludedFile.swift

# 可配置的规则可以通过这个配置文件来自定义
# 二进制规则可以设置他们的严格程度
force_cast: warning # 隐式
force_try:
  severity: warning # 显式
# 同时有警告和错误等级的规则，可以只设置它的警告等级
# 隐式
line_length: 110
# 可以通过一个数组同时进行隐式设置
type_body_length:
  - 300 # warning
  - 400 # error
# 或者也可以同时进行显式设置
file_length:
  warning: 500
  error: 1200
# 命名规则可以设置最小长度和最大程度的警告/错误
# 此外它们也可以设置排除在外的名字
type_name:
  min_length: 4 # 只是警告
  max_length: # 警告和错误
    warning: 40
    error: 50
  excluded: iPhone # 排除某个名字
variable_name:
  min_length: # 只有最小长度
    error: 4 # 只有错误
  excluded: # 排除某些名字
    - id
    - URL
    - GlobalAPIKey
reporter: "xcode" # 报告类型 (xcode, json, csv, checkstyle)
```

## 附录:
> 原文链接：https://github.com/realm/SwiftLint/blob/master/README.md
> 译文链接：https://github.com/realm/SwiftLint/blob/master/README_CN.md

