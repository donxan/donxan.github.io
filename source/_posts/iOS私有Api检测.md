---
title: iOS私有Api检测
date: 2018-07-16 15:16:40
tags: [API, ipa, APP]
categories: 入坑指南
image:
---

![image](http://p7hfnfk6u.bkt.clouddn.com/Guide251.png)

<!-- more -->

- 最近提交`APP`审核被苹果的审核人员是虐的不要不要的, 一直都说是使用了私有`API`
- 但是我使出了浑身解数, 也没找到自己写的代码里哪里用到了私有`API`, 最后网上找了一些检测私有`API`的方法才发现在SDK里面涉及到了
- 下面就检测私有`API`的方法简单介绍一下


## 指定私有`API`
- 这是最显而易见的, 也是最方便解决的可能出现私有`API`的情况
- 当然这种方法首先你要知道使用了那些私有`API`, 然后在代码中进行全局搜索, 修改, 此方法暂不赘述
- 这些方法, 我在查找的时候基本能定位到使用私有api的第三方库的位置


### 终端命令
首先要`cd`到工程目录

```
cd 到工程的目录
```

全局搜索的命令(注意后面有一个点), 其中`prefs`即为你要搜索的私有`API`

```
grep -r prefs .
```

如果私有`api`属于类似`GraphicsServices.framework`等`.framework`第三方库中，然后全局搜索后发现无法检测到这个库的存在，应该是私有库之类的, 也可以使用

```
grep -r GraphicsServices .
```

到这里, 解决上述第三方库的私有`API`的问题, 就是直接替换掉新的`SDK`, 当然如果新的第三方库也有私有`API`的话, 那就只能舍弃了, 否则基本无解

![image](http://p7hfnfk6u.bkt.clouddn.com/Praiteapi23.png)


### `strings`检测
此方法是利用已经打包的`ipa`包检测

- 首先你有个可以提交审核的`ipa`，就是需要提交到苹果审核的包，不是测试的`release`
- 将`ipa`重命名为`zip`格式，也可以直接使用解压工具解压, 如果有两个文件夹`Payload`、`Symbols`，就OK
- `cd`到`Payload`里面的`app`

```
cd /Users/xxx/Downloads/xxx\ 2018-07-16\ 15-00-36/zcmlc/Payload/xxx.app
```

然后执行, 其中`test`为你要搜索的`app`的名字, `api`为你要搜索的私有的`API`

```
strings - -a -arch armv7 "test" | grep api
```

除了上述这命令之外, 这里还有第二种命令搜索, 生成一个文件, 自己去找即可

```
strings - -a -arch armv7 "test" > test.txt
```



### 私有API检测工具

主要介绍使用`iOS-private-api-checker`进行检测详情可参考: [iOS-private-api-checker私有API检测工具使用详细步骤](https://www.jianshu.com/p/07779e293ca7)

