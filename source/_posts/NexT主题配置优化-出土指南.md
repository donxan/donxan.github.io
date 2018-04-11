---
title: NexT主题配置优化-出土指南
date: 2018-04-03 15:03:13
tags: [Hexo, NexT]
categories: Hexo博客
<!--copyright: true-->
---

- 前段时间, 辛辛苦苦花了一周的时间搭建了属于自己的 [个人技术博客](https://www.titanjun.top/) , 当然也是各种采坑各种跳, 大家如果在搭建过程中遇到什么问题, 可以参考 [基于GitHub和Hexo搭建个人博客](https://www.titanjun.top/2018/03/08/%E5%9F%BA%E4%BA%8EGitHub%E5%92%8CHexo%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/)
- 博客搭建好之后就是选择博客主题的问题了, 刚开始我用的是 [Yelee主题](https://github.com/MOxFIVE/hexo-theme-yelee) , 这个主题总体来说还是不错的, 动画效果还是很炫酷的, 星级评价也达到了1107个 
- 这两天看到很多人都在用 [NexT主题](https://github.com/iissnan/hexo-theme-next) , 而且网上分享的关于个性化的配置也有很多, 还是很推荐使用的, 所以我 就尝试着配置了一下
- 这是作者提供的 [NexT主题中文配置](http://theme-next.iissnan.com/)
- 下面我把集成NexT主题配置时遇到的坑给大家总结分享一下

<!-- more -->

- 文章主要介绍的优化方面主要有以下34种配置
  - 集成Mob社会化分享
  - 在右上角或者左上角实现fork me on github
  - 添加RSS
  - 添加动态背景
  - 实现点击出现桃心效果
  - 修改文章内链接文本样式
  - 修改文章底部的那个带#号的标签
  - 在每篇文章末尾统一添加“本文结束”标记
  - 修改作者头像并旋转
  - 博文压缩
  - 修改``代码块自定义样式
  - 侧边栏社交小图标设置
  - 主页文章添加阴影效果
  - 在网站底部加上访问量
  - 添加热度
  - 网站底部字数统计
  - 添加 README.md 文件
  - 设置网站的图标Favicon
  - 实现统计功能
  - 添加顶部加载条
  - 在文章底部增加版权信息
  - 添加网易云跟帖(跟帖关闭，已失效，改为来必力)
  - 隐藏网页底部powered By Hexo / 强力驱动
  - 修改网页底部的桃心
  - 文章加密访问
  - 添加jiathis分享
  - 博文置顶
  - 修改字体大小
  - 修改打赏字体不闪动
  - 侧边栏推荐阅读
  - 自定义鼠标样式
  - 为博客加上萌萌的宠物
  - DaoVoice 在线联系
  - 点击爆炸效果

### 1. https技术博客配置社会化分享
大家应该知道像一些`JiaThis`分享和百度分享并不支持`https`, 这里给大家推荐一个, 支持`https`的社会化分享-Mob

1-1. 获取`App Key`
博客集成Mod分享组件, 参考 [Mob官方文档](http://wiki.mob.com/快速集成-13/) , 获取到`App Key`

1-2. 在主题配置文件中添加配置：

```objc
mob_share:
  enable: true
  appkey: ********
```

1-3. 在`next/layout/_partials/share/`里面添加`mob_share.swig`文件, 并在`mob_share.swig`内输入一下内容:

- 这里需要注意的一点:
  - 以下代码只支持`http`开头的网址, 在`https`中点击分享按钮会没有任何反应
  - 如果需要支持`https`的网址, 在最后一行`src=http://f1.webshare.mob.com`, 需要把这里的`http`同样改成`https`, 这样你就可以实现分享功能了

```objc
<!--MOB SHARE BEGIN-->
<div class="-hoofoo-share-title">分享到：</div>
<div class="-hoofoo-share-buttons">
    <div class="-mob-share-weibo -hoofoo-share-weibo -hoofoo-share-ui-button"><i class="fa fa-weibo" aria-hidden="true"></i></div>
    <div class="-mob-share-weixin -hoofoo-share-weixin -hoofoo-share-ui-button"><i class="fa fa-weixin" aria-hidden="true"></i></div>
    <div class="-mob-share-qq -hoofoo-share-qq -hoofoo-share-ui-button"><i class="fa fa-qq" aria-hidden="true"></i></div>
    <div class="-mob-share-twitter -hoofoo-share-twitter -hoofoo-share-ui-button"><i class="fa fa-twitter" aria-hidden="true"></i></div>
    <div class="-hoofoo-share-more -hoofoo-share-ui-button -mob-share-open"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></div>
</div>
<div class="-mob-share-ui" style="display: none">
    <ul class="-mob-share-list">
        <li class="-mob-share-weibo"><p>新浪微博</p></li>
        <li class="-mob-share-weixin"><p>微信</p></li>
        <li class="-mob-share-qzone"><p>QQ空间</p></li>
        <li class="-mob-share-qq"><p>QQ好友</p></li>
        <li class="-mob-share-tencentweibo"><p>腾讯微博</p></li>
        <li class="-mob-share-renren"><p>人人网</p></li>
        <li class="-mob-share-kaixin"><p>开心网</p></li>
        <li class="-mob-share-douban"><p>豆瓣</p></li>
        <li class="-mob-share-youdao"><p>有道云笔记</p></li>
        <li class="-mob-share-mingdao"><p>明道</p></li>
        <li class="-mob-share-pengyou"><p>朋友网</p></li>
        <li class="-mob-share-facebook"><p>Facebook</p></li>
        <li class="-mob-share-twitter"><p>Twitter</p></li>
        <li class="-mob-share-pocket"><p>Pocket</p></li>
        <li class="-mob-share-google"><p>Google+</p></li>
        <li class="-mob-share-tumblr"><p>Tumblr</p></li>
        <li class="-mob-share-instapaper"><p>Instapaper</p></li>
        <li class="-mob-share-linkedin"><p>Linkedin</p></li>
    </ul>
    <div class="-mob-share-close">取消</div>
</div>
<div class="-mob-share-ui-bg"></div>
<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey={{theme.mob_share.appkey}}"></script>
<!--MOB SHARE END-->
```

1-4. 在`next/layout/post.swig`中添加条件分支：

```objc
{% if theme.jiathis %}
      {% include '_partials/share/jiathis.swig' %}
    {% elseif theme.baidushare %}
      {% include '_partials/share/baidushare.swig' %}
    {% elseif theme.add_this_id %}
      {% include '_partials/share/add-this.swig' %}
    {% elseif theme.duoshuo_shortname and theme.duoshuo_share %}
      {% include '_partials/share/duoshuo_share.swig' %}
    {% elseif theme.mob_share.enable %}
      {% include '_partials/share/mob_share.swig' %}
{% endif %}
```

1-5. 在`next/source/css/_common/components/third-party/`里添加样式文件`mob_share.styl`：

```objc
.-hoofoo-share-buttons{
    display: inline-block;
}
.-hoofoo-share-title{
    font-size: 1.1em;
    font-weight: 200;
}
.-hoofoo-share-ui-button{
    cursor: pointer;
    background-color: #555;
    color: #fff;
    font-size: 24px;
    line-height: 40px;
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 25px;
    float: left;
    transition: background 0.4s;
    -moz-transition: background 0.4s;    /* Firefox 4 */
    -webkit-transition: background 0.4s;    /* Safari 和 Chrome */
    -o-transition: background 0.4s;
}
.-hoofoo-share-weibo:hover{
    background-color: #cf3f41;
}
.-hoofoo-share-weixin:hover{
    background-color: #18a01a;
}
.-hoofoo-share-qq:hover{
    background-color: #950c0c;
}
.-hoofoo-share-twitter:hover{
    background-color: #2ab3e6;
}
.-hoofoo-share-more:hover{
    background-color: #777;
}
.-mob-share-weixin-qrcode-content{
    border-radius: 4px;
    -webkit-box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    -o-box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}
.-mob-share-weixin-qrcode{
    margin: 5% !important;
    width: 90% !important;
    height: auto !important;
}
.-mob-share-weixin-qrcode-close {
    background-image: url('/lib/fancybox/source/fancybox_sprite.png') !important;//因为兼容问题把vendor改成了lib，根据自己的路径修改
}
.-mob-share-weixin-qrcode-close {
    overflow: hidden;
    line-height: 100px !important;
    position: absolute !important;
    top: -18px !important;
    right: -18px !important;
    width: 36px !important;
    height: 36px !important;
    cursor: pointer !important;
    z-index: 8040 !important;
}
/*Retina graphics!*/
@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
       only screen and (min--moz-device-pixel-ratio: 1.5),
       only screen and (min-device-pixel-ratio: 1.5){
    .-mob-share-weixin-qrcode-close {
        background-image: url('/lib/fancybox/source/fancybox_sprite@2x.png') !important;//因为兼容问题把vendor改成了lib，根据自己的路径修改
        background-size: 44px 152px !important; /*The size of the normal image, half the size of the hi-res image*/
    }
}
.-mob-share-close{
    height: 4em !important;
    font-size: 0.8em !important;
    line-height: 4em !important;
    background: #555 !important;
    color: #fff !important;
}
```

1-6. 同一目录下的 `third-party.styl` 中添加：

```objc
@import "mob_share";
```

1-7. 在`next/layout/_scripts/third-party/`里添加脚本文件`mob_share.swig`：

```objc
{% if theme.mob_share.enable %}
<script type="text/javascript">
    //微信二维码点击背景关闭
    $('body').delegate('.-mob-share-weixin-qrcode-bg','click', function(){
         $(".-mob-share-weixin-qrcode-close").trigger("click");
    }); 
</script>
{% endif %}
```

1-8. 在`next/layout/_layout.swig的body`标签结束前添加：

```objc
{% include '_scripts/third-party/mob_share.swig' %}
```

> 剩下的优化配置, 大家可以参考以下博客

### 2. 关于next主题个性化配置
这里给大家推荐, 提供33中炫酷效果的文章
- [hexo的next主题个性化配置教程](https://segmentfault.com/a/1190000009544924)


### 3. `leanCloud`统计
通过leanCloud统计您网站的文章阅读量
- [leanCloud,实现文章阅读量统计](http://www.joryhe.com/2016-05-29-how_to_create_leancloud_read_Counter.html)


### 4.  使用`CloudFlare`配置`https`
参考
- [使用 CloudFlare 为 hexo 博客实现 HTTPS](https://blog.csdn.net/u010099080/article/details/79617603)
- [使用 cloudflare 为网站添加免费 CDN 并获取免费 SSL 服务](https://coderschool.cn/2035.html)
- [为自定义域名的GitHub Pages添加SSL 完整方案](https://www.yicodes.com/2016/12/04/free-cloudflare-ssl-for-custom-domain/)

