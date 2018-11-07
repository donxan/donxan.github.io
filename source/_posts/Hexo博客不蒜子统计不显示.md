---
title: Hexo博客不蒜子统计不显示
date: 2018-10-23 16:55:45
tags: [Hexo, busuanzi, 不蒜子]
categories: Hexo博客
---





![image](http://p7hfnfk6u.bkt.clouddn.com/busuanzi.png)


<!-- more -->

- 10月份开始引用不蒜子作为静态网站的博客的统计功能都无法显示了, 刚开始还以为是自己的博客修改了什么文件所致, 随之查看了好多其他博客, 发现好多类似的网站统计都不显示了
- 随后上[不蒜子的官网](http://ibruce.info/2015/04/04/busuanzi/)看了一下，才知道，原来不蒜子的域名更改了，导致`script`引用不了，从而无法进行统计
- 下面是不蒜子官网的公告


```
！！！！2018年9月 - 重要提示 ！！！！
大家好，因七牛强制过期原有的『dn-lbstatics.qbox.me』域名（预计2018年10月初），与客服沟通数次无果，即使我提出为此付费也不行，只能更换域名到『busuanzi.ibruce.info』！因我是最早的一批七牛用户，为七牛至少带来了数百个邀请用户，很痛心，很无奈！
各位继续使用不蒜子提供的服务，只需把原有的：
<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
域名改一下即可：
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
只需要修改该js域名，其他均未改变。若有疑问，可以加入不蒜子交流QQ群：`419260983`，对您带来的不便，非常抱歉！！！还是那句话，不蒜子不会中断服务！！！！
```


所以想要继续使用不蒜子功能，只需修改对应的不蒜子域名即可

<div class="note success"><p>所需修改文件地址</p></div>

```
…/next/layout/_third-party/analytics/busuanzi-counter.swig
```

原代码

```js
<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```

修改后代码

```js
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```


我的博客: https://www.titanjun.top/
