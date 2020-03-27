---
title: hexo next 配置 DaoVoice实现在线聊天
tags:
  - Hexo
categories: Hexo博客
abbrlink: 68d038bb
date: 2020-03-27 16:08:03
---

之前有访问过一些大佬的个人博客，里面有个在线联系功能，看着不错，所以也试着在自己的站点上接入了此功能。

# 注册

首先在[DaoVoice](http://www.daovoice.io/)注册个账号，点击->[邀请码](http://dashboard.daovoice.io/get-started?invite_code=6b1cb9a7)是`6b1cb9a7`。

![](https://cdn.jsdelivr.net/gh/donxan/pics/20200327174211.png)



完成后，会得到一个`app_id`，后面会用到：
![https://cdn.jsdelivr.net/gh/donxan/pics/typora-icon2.png](https://s1.ax1x.com/2018/01/21/pW5yM8.png)

# 修改head.swig

修改`/themes/next/layout/_partials/head.swig`文件，添加内容如下，注意’//widget.daovoice.io/widget/2e5d695d.js’ 中js文件名改成自己的id就行：

```
{% if theme.daovoice %}
  <script>
  (function(i,s,o,g,r,a,m){i["DaoVoiceObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;a.charset="utf-8";m.parentNode.insertBefore(a,m)})(window,document,"script",('https:' == document.location.protocol ? 'https:' : 'http:') + "//widget.daovoice.io/widget/2e5d695d.js","daovoice")
  daovoice('init', {
      app_id: "{{theme.daovoice_app_id}}"
    });
  daovoice('update');
  </script>
{% endif %}
```



位置贴图：
[![pWIwmF.md.png](https://s1.ax1x.com/2018/01/21/pWIwmF.md.png)](https://imgchr.com/i/pWIwmF)

# 主题配置文件

在`_config.yml`文件中添加内容：

```
# Online contact
daovoice: true
daovoice_app_id:   # 这里填你刚才获得的 app_id
```



# 聊天窗口配置

附上我的聊天窗口的颜色、位置等设置信息：
[![pWonhR.png](https://s1.ax1x.com/2018/01/21/pWonhR.png)](https://s1.ax1x.com/2018/01/21/pWonhR.png)

至此，网页的在线联系功能已经完成，重新`hexo g`，`hexo d`上传GitHub后，页面上就能看到效果了。

就比如说你现在往右下角看看(～￣▽￣)～ ，欢迎撩我（滑稽）。