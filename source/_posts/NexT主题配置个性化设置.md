---
title: NexT主题配置个性化设置
date: 2018-04-03 15:03:13
tags: [Hexo, NexT]
categories: Hexo博客

---


- 前段时间, 辛辛苦苦花了一周的时间搭建了属于自己的[个人技术博客](https://www.titanjun.top/), 当然也是各种采坑各种跳, 大家如果在搭建过程中遇到什么问题, 可以参考[基于GitHub和Hexo搭建个人博客](https://www.titanjun.top/2018/03/08/%E5%9F%BA%E4%BA%8EGitHub%E5%92%8CHexo%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/)
- 我现在用的是`NexT`主题, 这是作者提供的[NexT主题中文配置](http://theme-next.iissnan.com/)
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

### https技术博客配置社会化分享
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

### 更改上一篇，下一篇的顺序
- 进入一篇文章，在文章底部，有上下篇的链接，但是点击 发现进入的是页面中的的上面那篇文章，不符合我们的正常习惯, 修改方法如下:
- 文件位置：`themes/next/layout/_macro/post.swig`

``` diff
{% if not is_index and (post.prev or post.next) %}
  <div class="post-nav">
    <div class="post-nav-next post-nav-item">
-      {% if post.next %}
+      {% if post.prev %}
-        <a href="{{ url_for(post.next.path) }}" rel="next" title="{{ post.next.title }}">
+        <a href="{{ url_for(post.prev.path) }}" rel="prev" title="{{ post.prev.title }}">
-          <i class="fa fa-chevron-left"></i> {{ post.next.title }}
+          <i class="fa fa-chevron-left"></i> {{ post.prev.title }}
        </a>
      {% endif %}
    </div>

    <span class="post-nav-divider"></span>

    <div class="post-nav-prev post-nav-item">
-      {% if post.prev %}
+      {% if post.next %}
-        <a href="{{ url_for(post.prev.path) }}" rel="prev" title="{{ post.prev.title }}">
+        <a href="{{ url_for(post.next.path) }}" rel="next" title="{{ post.next.title }}">
-          {{ post.prev.title }} <i class="fa fa-chevron-right"></i>
+          {{ post.next.title }} <i class="fa fa-chevron-right"></i>
        </a>
      {% endif %}
    </div>
  </div>
{% endif %}
```

<div class="note warning"><p>需要注意的是`prev`和`next`一定不要弄错了</p></div>


### 文章底部加上评分小星星
这里我们先看一个评分的效果图

![image](http://p7hfnfk6u.bkt.clouddn.com/Snip20180508_2.png)

- 首先先去[WidgetPack](https://widgetpack.com)注册一个账号并登陆, 填一下自己博客的信息，左上角有个 ID
- 首先打开主题配置文件：`themes/next/_config.yml`

```objc
# Star rating support to each article.
# To get your ID visit https://widgetpack.com
rating:
  enable: true
  id: 你登录后的ID    
  color: f79533
```

- `color`: 色值可改成自己喜欢的颜色
- 设置配置项
  - 可以配置评分方式，侧栏 > `Rating` > `Setting`，建议用 `IP address` 或 `Device(cookie)`，免登录，毕竟 `Socials` 里面的选项几乎都被墙，不适合国内网络环境。
  - 建议 侧栏 > `Site` > `Setting` 中勾选 `Private` 选项。
  - 上面两步勾选后别忘了点击页面右下方的 `SAVE SETTING` 绿色按钮保存

<div class="note info"><p>经过上面的配置，默认最下面只会显示 5 颗简单的小星星, 下面我们在自己优化一下样式吧</p></div>

首先打开文件：`blog/themes/next/layout/_macro/post.swig`, 添加有`+`哪一行代码

``` diff
        {% if theme.rating.enable %}
          <div class="wp_rating">
+            <div style="color: rgba(0, 0, 0, 0.75); font-size:13px; letter-spacing:3px">(&gt;看完记得五星好评哦亲&lt;)</div>
            <div id="wpac-rating"></div>
          </div>
        {% endif %}
```

然后打开文件：`blog/themes/next/source/css/_custom/custom.styl`, 添加如下代码

```objc
// 星星评分更改高度
.post-widgets {
    height: 80px;
}
```


### `leanCloud`统计
#### 统计文章阅读量
- 通过`leanCloud`统计您网站的文章阅读量
- 注册[LeanCloud](https://leancloud.cn/), 并创建一个你自己的应用

![image](http://p7hfnfk6u.bkt.clouddn.com/Snip20180508_3.png)

- 点击图片右上角的设置图标进入应用界面
- 到此，你的应用创建成功，继续表的创建
  - 创建表，并将表的名字命名为：`Counter`, 如图

![image](http://p7hfnfk6u.bkt.clouddn.com/Snip20180508_4.png)

<div class="note primary"><p>打开设置 -> 应用key 获取`App ID`和`App Key`</p></div>

最后打开主题配置文件: `themes/next/_config.yml`

```objc
leancloud_visitors:
  enable: true
  app_id: #你的app_id
  app_key: #你的的app_key
```

完成配置并重新编译。到此您已经成功设置了阅读量的统计

#### WEB安全
为了保证应用的统计计数功能仅应用于自己的博客系统，你可以在应用->设置->安全中心的Web安全域名中加入自己的博客域名，以保证数据的调用安全

![image](http://p7hfnfk6u.bkt.clouddn.com/Snip20180508_5.png)


### 配置Valine评论系统
- 评论系统之前用的来必力, 但是有时也会被墙, 用起来也不是很方便
- 现在更换的[`Valine`](https://valine.js.org/)评论系统还是很爽的
- `Valine` 是一款基于`Leancloud`的快速、简洁且高效的无后端评论系统
- 特性¶
  - 快速
  - 安全
  - 无后端实现
  - `MarkDown` 全语法支持
  - 轻量易用(~15kb gzipped)
- 配置方法
  - 获取`Leancloud`的`APP ID`和 `APP KEY`, 上面设置中已经介绍了获取方法
  

<div class="note success"><p>打开主题配置文件: `themes/next/_config.yml`</p></div>

```objc
# Valine.
# You can get your appid and appkey from https://leancloud.cn
# more info please open https://valine.js.org
valine:
  enable: true
  appid:  # your leancloud application appid
  appkey: # your leancloud application appkey
  notify: true # mail notifier , https://github.com/xCss/Valine/wiki
  verify: false # Verification code
  placeholder: 在这里说点什么吧... # comment box placeholder
  avatar: identicon # 评论表头样式  /mm/identicon/monsterid/wavatar/retro/hide
  guest_info: nick,mail,link # custom comment header
  pageSize: 10 # pagination size
```

<div class="note info"><p>其他相关配置和邮件提醒方式可查看[Valline详细配置官网](https://valine.js.org/configuration/)</p></div>


<div class="note primary"><p>下面着重说一下自定义样式</p></div>

看一下默认效果图

![image](http://p7hfnfk6u.bkt.clouddn.com/Snip20180508_6.png)

修改后的效果图

![image](http://p7hfnfk6u.bkt.clouddn.com/Snip20180508_8.png)

- 首先[下载 Valine.min.js](https://github.com/panjunwen/Valine/releases/tag/v1.1.4.fix), 并把下载好的文件放到文件夹 `themes/next/source/js/src` 
- 然后打开文件`themes/next/layout/_third-party/comments/valine.swig`, 按照如下修改

``` diff
{% if theme.valine.enable and theme.valine.appid and theme.valine.appkey %}
  <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
-  <script src="//unpkg.com/valine/dist/Valine.min.js"></script>
+  <script src="/js/src/Valine.min.js"></script>
  
  <script type="text/javascript">
    var GUEST = ['nick','mail','link'];
    var guest = '{{ theme.valine.guest_info }}';
    guest = guest.split(',').filter(item=>{
      return GUEST.indexOf(item)>-1;
    });
    new Valine({
        av: AV, 
        el: '#comments' ,
        verify: {{ theme.valine.verify }},
        notify: {{ theme.valine.notify }},
        appId: '{{ theme.valine.appid }}',
        appKey: '{{ theme.valine.appkey }}',
        placeholder: '{{ theme.valine.placeholder }}',
        avatar:'{{ theme.valine.avatar }}',
        guest_info:guest,
        pageSize:'{{ theme.valine.pageSize }}' || 10,
    });
  </script>
{% endif %}
```

<div class="note info"><p>修改评论按钮文字</p></div>

打开刚刚下载的`Valine.min.js`文件, 找到`class="vsubmit">回复</button>`代码, 更换为`class="vsubmit">提交</button>` , 这样文字就修改了


### 侧栏加入已运行的时间
相当于给记录博客的年龄, 但是我的不显示, 不知道为啥, 比较惆怅, 估计可能是主题风格的原因吧

<div class="note primary"><p>首先, 在`~/blog/themes/next/layout/_custom/sidebar.swig`, 加入以下代码</p></div>

```objc
<div id="days"></div>
</script>
<script language="javascript">
function show_date_time(){
window.setTimeout("show_date_time()", 1000);
BirthDay=new Date("05/27/2017 15:00:00");
today=new Date();
timeold=(today.getTime()-BirthDay.getTime());
sectimeold=timeold/1000
secondsold=Math.floor(sectimeold);
msPerDay=24*60*60*1000
e_daysold=timeold/msPerDay
daysold=Math.floor(e_daysold);
e_hrsold=(e_daysold-daysold)*24;
hrsold=setzero(Math.floor(e_hrsold));
e_minsold=(e_hrsold-hrsold)*60;
minsold=setzero(Math.floor((e_hrsold-hrsold)*60));
seconds=setzero(Math.floor((e_minsold-minsold)*60));
document.getElementById('days').innerHTML="已运行"+daysold+"天"+hrsold+"小时"+minsold+"分"+seconds+"秒";
}
function setzero(i){
if (i<10)
{i="0" + i};
return i;
}
show_date_time();
</script>
```

<div class="note warning"><p>切记要将上面的`Date`按照一样的格式改成自己的时间</p></div>

然后还要修改`~/blog/themes/next/layout/_macro/sidebar.swig`

``` diff
{# Blogroll #}
        {% if theme.links %}
          <div class="links-of-blogroll motion-element {{ "links-of-blogroll-" + theme.links_layout | default('inline') }}">
            <div class="links-of-blogroll-title">
              <i class="fa  fa-fw fa-{{ theme.links_icon | default('globe') | lower }}"></i>
              {{ theme.links_title }}&nbsp;
              <i class="fa  fa-fw fa-{{ theme.links_icon | default('globe') | lower }}"></i>
            </div>
            <ul class="links-of-blogroll-list">
              {% for name, link in theme.links %}
                <li class="links-of-blogroll-item">
                  <a href="{{ link }}" title="{{ name }}" target="_blank">{{ name }}</a>
                </li>
              {% endfor %}
            </ul>
+        {% include '../_custom/sidebar.swig' %}
          </div>
         {% endif %}

-        {% include '../_custom/sidebar.swig' %}
```

如果你还想修改样式, 打开`~/blog/themes/next/source/css/_custom/custom.styl`

```objc
// 自定义的侧栏时间样式
#days {
    display: block;
    color: rgb(7, 179, 155);
    font-size: 13px;
    margin-top: 15px;
}
```


### 添加Top阅读排行页面
- 基于`Leancloud`的文章阅读量进行文章排行, 所以前提是在主题配置文件中, 配置了`Leancloud`的相关配置
- 新建排行榜页面
  - 终端打开博客所在目录: `~/blog/`
  - 终端输入: `hexo new page "top"`
- 在主题配置文件中加上菜单 `top` 和它的 `icon`, 文件位置: `~/blog/themes/next/_config.yml`

``` JavaScript 
menu:
  top: /top/ || signal
```

接着在语言翻译文件中加上菜单 `top`, 文件位置：`~/blog/themes/next/languages/zh_Hans.yml`

```objc
menu:
  home: 首页
  top: 排行 # 名字自定义就好
  archives: 文章
  categories: 分类
  tags: 标签
  about: 关于
  search: 搜索
```

最后，编辑第一步新建页面生成的`index.md`文件

``` JavaScript
---
title: 排行榜
comments: false
date: 2018-05-04 14:14:02
---

<div id="top"></div>
<script src="https://cdn1.lncld.net/static/js/av-core-mini-0.6.4.js"></script>
<script>AV.initialize("app_id", "app_key");</script>
<script type="text/javascript">
  var time=0
  var title=""
  var url=""
  var query = new AV.Query('Counter');
  query.notEqualTo('id',0);
  query.descending('time');
  query.limit(1000);
  query.find().then(function (todo) {
    for (var i=0;i<1000;i++){
      var result=todo[i].attributes;
      time=result.time;
      title=result.title;
      url=result.url;
      var content="<a href='"+"https://www.titanjun.top"+url+"'>"+title+"</a>"+"<br />"+"<font color='#555'>"+"阅读次数："+time+"</font>"+"<br /><br />";
      document.getElementById("top").innerHTML+=content
    }
  }, function (error) {
    console.log("error");
  });
</script>
```

必须将里面的里面的`app_id`和`app_key`替换为你的主题配置文件中的值，必须替换里面博客的链接，1000是显示文章的数量


### 点击侧栏头像回到博客首页
- 首先要在主题配置文件中配置好，比如我把头像`avatar.gif`放`在~/blog/source/uploads/`
- 修改主题配置文件: `~/blog/themes/next/_config.yml`

``` diff
# Sidebar Avatar
# in theme directory(source/images): /images/avatar.gif
# in site  directory(source/uploads): /uploads/avatar.gif
-#avatar: /images/avatar.gif
+avatar: /uploads/avatar.gif
```

然后编辑文件：`~/blog/themes/next/layout/_macro/sidebar.swig`

``` diff
+        <a href="/" class="site-author-image" rel="start" style="border:none">
          <img class="site-author-image" itemprop="image"
               src="{{ url_for( theme.avatar | default(theme.images + '/avatar.gif') ) }}"
               alt="{{ theme.author }}" />
+        </a>
```

### 文章摘要图片
- 文章摘要是指每篇文章在页面上显示的那部分内容，也就是阅读全文之前的文章内容, 进入文章后图片自动隐藏
- 在主题配置文件中：`~/blog/themes/next/_config.yml`

```objc
excerpt_description: false

auto_excerpt:
  enable: false
```

在文件中添加如下代码: `~/blog/themes/next/layout/_macro/post.swig`

``` diff
{% if is_index %}
        {% if post.description and theme.excerpt_description %}
          {{ post.description }}
          <!--noindex-->
          <div class="post-button text-center">
            <a class="btn" href="{{ url_for(post.path) }}">
              {{ __('post.read_more') }} &raquo;
            </a>
          </div>
          <!--/noindex-->
        {% elif post.excerpt  %}
          {{ post.excerpt }}
+          
+        {% if post.image %}
+        <div class="out-img-topic">
+          <img src={{ post.image }} class="img-topic" />
+        </div>
+        {% endif %}
+          
          <!--noindex-->
          <div class="post-button text-center">
            <a class="btn" href="{{ url_for(post.path) }}{% if theme.scroll_to_more %}#{{ __('post.more') }}{% endif %}" rel="contents">
              {{ __('post.read_more') }} &raquo;
            </a>
          </div>
          <!--/noindex-->
```

为了防止有的图片宽度不够导致风格不够统一，页面不美观，需要在`~/blog/themes/next/source/css/_custom/custom.styl`中添加

```objc
// 自定义的文章摘要图片样式
img.img-topic {
    width: 100%;
}
```

最后编辑有这需求的相关文章时, 在`Front-matter`（文件最上方以`---`分隔的区域）加上一行：

```objc
image: url  # 图片的链接地址
```


### 使用`CloudFlare`配置`https`
参考
- [使用 CloudFlare 为 hexo 博客实现 HTTPS](https://blog.csdn.net/u010099080/article/details/79617603)
- [使用 cloudflare 为网站添加免费 CDN 并获取免费 SSL 服务](https://coderschool.cn/2035.html)
- [为自定义域名的GitHub Pages添加SSL 完整方案](https://www.yicodes.com/2016/12/04/free-cloudflare-ssl-for-custom-domain/)


### 关于next主题个性化配置
这里给大家推荐, 提供33中炫酷效果的文章
- [hexo的next主题个性化配置教程](https://segmentfault.com/a/1190000009544924)
- [打造个性超赞博客Hexo+NexT+GithubPages的超深度优化](https://reuixiy.github.io/technology/computer/computer-aided-art/2017/06/09/hexo-next-optimization.html#fn:2)
- [Hexo 优化 --- 支持邮件通知的评论 Valine 增强版](http://www.zhaojun.im/hexo-valine-modify/)



