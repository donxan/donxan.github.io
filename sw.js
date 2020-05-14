/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","82ead6afd52f2637a965db3ee2d71ad0"],["/about/index.html","20975e919e873229b9f7d0968000b5c6"],["/archives/2016/10/index.html","0a2a96da0b7de910b46323250ad598a9"],["/archives/2016/index.html","a770b0136b6c4ee48be3439f396db11c"],["/archives/2017/01/index.html","8dbaf1abc3c8b34808e9fca4559d0050"],["/archives/2017/06/index.html","018df91ff5fea3e9a01c4cdecf8bb120"],["/archives/2017/08/index.html","44c55af00d0583eb6b00848fe455f67e"],["/archives/2017/index.html","567b76a0ed100d6113524186f867e3da"],["/archives/2018/01/index.html","5f254827bc370b28e7afa9fcf61f217d"],["/archives/2018/04/index.html","d102bf86b694ecdfa5f3f8b68f8a57c3"],["/archives/2018/05/index.html","e50fa7c20cce968ff42e4d811fb2aaf5"],["/archives/2018/06/index.html","d080b0117335010e93f01d7353e1356f"],["/archives/2018/07/index.html","2235e3feb19376f015896e0f0fb7b3b5"],["/archives/2018/08/index.html","986bbcc94cdc134d3eef1bf2058554ef"],["/archives/2018/10/index.html","4e0dd78f9d70efd4208d6a895bb01950"],["/archives/2018/12/index.html","0ccb6cd6fd213602df79e479539e372a"],["/archives/2018/index.html","6cea83852681621a3f469920777c41ea"],["/archives/2018/page/2/index.html","f544acda8b59b701c67b13b47525e506"],["/archives/2019/03/index.html","5a5e0460cc2c2003c468ed2b77dd8f28"],["/archives/2019/09/index.html","828c5b20565f1118eee964b1b1875987"],["/archives/2019/index.html","e74ab55735319b6b170368fec460f298"],["/archives/2020/03/index.html","afc16ad67975c014c10c388131732930"],["/archives/2020/index.html","55ebf5fe5f0042bfe40601a5136a8ceb"],["/archives/index.html","9cfb1f75a55260662e25eccebb51f1c8"],["/archives/page/2/index.html","4e43ff5e4cf300bd37da1a3ae95bb560"],["/archives/page/3/index.html","901ba0b0edb715ba377d57b56de7837d"],["/av-core-mini-0.6.4.js","fae9ab7d7e6b3cabcc17ddee575b92d7"],["/baidu_verify_BQasuiUrVi.html","8fc4036eea9d7f1295e73a55a2aa15da"],["/categories/HTML5/index.html","0cf608c90d300732b3ed1d24a39250cc"],["/categories/Hexo博客/index.html","d4473fb662a13835090e9588eb16f5f9"],["/categories/JavaScript笔记/index.html","e0d3d0485c94ba9489c885f142fcb3a4"],["/categories/Node-js笔记/index.html","7d163e7eeb6d40c1423f80d60fc81348"],["/categories/Python基础/index.html","db9457fe41c642444a393d3d24e31508"],["/categories/git/index.html","d7d5ed25c983d0d417ceff5dde442ae3"],["/categories/iOS进阶指南/index.html","3c6dbe45bbf89b71097f4f8c96566fa9"],["/categories/index.html","21c88d5d54e09f52925772639eba35b9"],["/categories/效率/index.html","c50f8a7564652ae6975f4d0751bee958"],["/categories/数据库基础/index.html","3d5eb6894c97653e16658ae2c06700f2"],["/css/main.css","5aa619a84b30a490edf62483149fc2d3"],["/googlefc329f0e8f9212c6.html","69202fdc36945fb4ca53b2b6585893b6"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.svg","fd289c54b3c8b7aed3ee5e0a55a8aa90"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/avatar.jpg","2c85871d8602611180377775f901c2bc"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechat-qcode.jpg","ae19f72140fdfd49ea03fe424b00cb0c"],["/images/wechat_gzh.svg","541f2b26c5fa95d795b381c78185241d"],["/images/wechat_ikedon.svg","7d365d79d845ea09aa4259323f5d7612"],["/images/wechat_logo.svg","2ef3f3696267249c4372a5e3f9db36f2"],["/images/wechatpay.svg","7d365d79d845ea09aa4259323f5d7612"],["/index.html","07bcdd68e7fcdab94e92f6ba92bede57"],["/js/src/Valine.min.js","3fa7b322b49d94daadc5b654fbb0480d"],["/js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["/js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["/js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["/js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["/js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["/js/src/instantclick.min.js","53a0bdbc01875e28d512e3d59d72f990"],["/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/js/src/md5.min.js","9aad326e2f1f70a850c00ee2aac273e3"],["/js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["/js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["/js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["/js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["/js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["/js/src/utils.js","24512c3455f976730b7bf75e1222c533"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","ef16695116fce11e9c98891da9c09c94"],["/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","866c6d5b2114e50e8352f2e8f0e1f42a"],["/lib/jquery_lazyload/README.html","e08fbbcf23b2b1a896f7f5026c13d529"],["/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/navigation/index.html","7a72911ed4f90ee65210665f19f70b58"],["/page/2/index.html","0ffa0704dbb0ad6414309ae251dd4610"],["/page/3/index.html","68cb0ccb47d0e37b233af727447d293d"],["/page/4/index.html","40ff80d8df8a2ca383a34528ecbe11b9"],["/page/5/index.html","67d2e0e9b0527c2a195e3fd08ca56827"],["/posts/144857e2/index.html","00248143b6748f97b6d4ccf67055f411"],["/posts/14d4f061/index.html","905a91dc57797fbb318e1bdf813ebd1a"],["/posts/3ac2f657/index.html","fedbd9674560c075d0ad032584bfb362"],["/posts/46193fbc/index.html","af4f52168c5b4820af7b81c270cc2c0d"],["/posts/51f133d4/index.html","eb2d8bb0f42da253eb5127016c31af6f"],["/posts/52249095/index.html","dff34b3b8bc5bac34a4af6469d84453a"],["/posts/5a30761b/index.html","2000c3a84b78a6578dd9ebf5c5401836"],["/posts/5e21c553/index.html","7cbc859ac915a910a55abe094300ad92"],["/posts/634f6774/index.html","6f741a88f973b64dd1b02dafb392bad1"],["/posts/641ca9b6/index.html","ef6d3fd2136b34e65b605383be77b1df"],["/posts/64abe4fe/index.html","86ac9d1080cd6282e3e6f1e6ce74a7be"],["/posts/68d038bb/index.html","2b963e8deafd7663419786af129176a9"],["/posts/6b2d1dfa/index.html","57921a8046387f1163fcc33afa4874f1"],["/posts/7334fb9a/index.html","b42743ff8734e0cf2f800dd205cb8adb"],["/posts/7ab2d054/index.html","685eaf67fd259507a21ca03d2b51c8f8"],["/posts/7f54d88f/index.html","7a17b9d6c6307840d77475404c76de90"],["/posts/85d9cd1f/index.html","3ef417987b22a4e8e20ccd297e45233d"],["/posts/8930c83/index.html","b2cbd4c6f04267b6b67b8aee2eaf1713"],["/posts/8d410658/index.html","6476ad7840022f8a3646f7f075037650"],["/posts/90cf2451/index.html","e2a2125f860ab57e549d933ba7298ba5"],["/posts/9483b8e/index.html","ff14fa922903d95746da1bdbd69472c0"],["/posts/9eda55ce/index.html","8ac3cc022f8c637c376869f2f69a946a"],["/posts/b4004272/index.html","061de04fa8f232f1855f2d9822c94667"],["/posts/d95c95af/index.html","4aaefa26baee16d2e8f91473f9c438cf"],["/posts/de12f33/index.html","7bb6d21e4117ba0dfe53e95faba594d7"],["/posts/e0e25902/index.html","84b70300c034d222367bfd252a56ebb9"],["/posts/e1be9692/index.html","2a66d9bb606a85544e714c4f28d7d33f"],["/posts/e5759cfd/index.html","83b37785557b2aac57277a1f667214a9"],["/posts/eabac3f5/index.html","c29a4e7aa46b0479dc45e0c12b7f6a07"],["/posts/fb0f7be/index.html","0bca3ed8b59919ee19fc4ddf152410dd"],["/posts/fdf20d39/index.html","ad6936188f43d117de84efa02c6767dc"],["/posts/fe1e9880/index.html","d62741d459cb43ca4e9432897ca6fc25"],["/posts/fe2495d8/index.html","4cff61655c648c88353e21457e0d6020"],["/sw-register.js","ab39bb33c1338ae732920006e8920152"],["/tags/CSS/index.html","847d86ee2db0dc3b20b7541ef1ade1ce"],["/tags/Calendar/index.html","e02a742aee9a351bf3e55eb37cc96ad1"],["/tags/Express/index.html","67f114e8e12d5ef93b460d2d48fa0db7"],["/tags/HTML5/index.html","0ca1c0eda3aaccde3d758b2213c7bab0"],["/tags/HTML5标签/index.html","b98e8ecd4553c57cd60e3681ff4dfc69"],["/tags/Hexo/index.html","39f14660efa5b13e63d6426f74a8e2a3"],["/tags/JavaScript/index.html","a22a4ba5067a8e15fc9e681b191e4564"],["/tags/List/index.html","90f5d1847b9e4c4277491ed6eb50f6ee"],["/tags/Mac-工具/index.html","25c4b3fc5ba8d4c66eec403c89180a79"],["/tags/MacOS/index.html","2eed69dfa90ba0260aeda70cad372b02"],["/tags/MongoDB/index.html","602ac8f6fefeee9ac1721f70d6bb3074"],["/tags/MySQL/index.html","16edca2d63df89fd6fc24327876201df"],["/tags/NexT/index.html","c94e5869790564b010e62039432ad0a6"],["/tags/NoSQL/index.html","76223b5e4866b28dbb97e6a10df5e247"],["/tags/Node-js/index.html","79bfe6a02adc5ae29e9a08755bad1d93"],["/tags/Pillow/index.html","742387ebce40a01eda30f9e4fa65a37c"],["/tags/Python/index.html","381ac749ab7a50881374362f1d0efd1c"],["/tags/Redis/index.html","864af3f23a3a4ff8acda35ad3882e0da"],["/tags/Swift5-0/index.html","13ccb2638cd74fc9136d097f5d33c586"],["/tags/Tuple/index.html","2a28d1e102b25d4949cd78ae11ee2e13"],["/tags/Web/index.html","25acedfa21c0a638f5c857670817bc40"],["/tags/WebStorm/index.html","2135984d059ce45050c6d5b3326d6989"],["/tags/Xcode11/index.html","e62a7cf6a2f1676bb3b0532e98f14abd"],["/tags/busuanzi/index.html","fb9c1bf0386ce3087fe92eb5fb22cfe9"],["/tags/filter/index.html","e390f41f0fd576d01475b2358aacc17d"],["/tags/git/index.html","eadf86319c524cf5623697cdef444e4c"],["/tags/github/index.html","4f8377020502828265fc3a278aff880d"],["/tags/iOS/index.html","a43f6876d14f18090ce2c64bed73c973"],["/tags/iOS13/index.html","99527ab081a6f7a27cb01deec46aea61"],["/tags/index.html","dfe2d565e77d7ac378059b0bb084f05a"],["/tags/map/index.html","4b367d57ef2ad7a39521f3533e1c19d2"],["/tags/os/index.html","3c02a89763e527c78d39462349fc94c5"],["/tags/pip3/index.html","23ec01f4ed3cf92733b60ead50b54a8b"],["/tags/pymongo/index.html","4328b338c0a059ae4cf01787f98ecbc9"],["/tags/random/index.html","fc440c543725edc2f83994f6c748e5cc"],["/tags/reduce/index.html","343399e39cc3480dbf33d152105c10b0"],["/tags/string/index.html","76b60b2966db623c41f08fd0f98598e0"],["/tags/不蒜子/index.html","994b835c06a96d47e11570989b70c6b9"],["/tags/判断语句/index.html","a9ab03a8fabd3543b361760ea9f4dd95"],["/tags/同步管理/index.html","f9464f7230292af634c0cbee84be7745"],["/tags/多设备/index.html","2d23dc29f116f56d7a7fadb0e680b207"],["/tags/效率/index.html","13fec5f69099e5c26d51c33fe6fa5b04"],["/tags/数据类型/index.html","350bdfd5490b131b121c622d5ea4f022"],["/tags/文件/index.html","57c808f77d9927ec097391439480f737"],["/tags/方法/index.html","2058c0096ef82889b93e7ce1d1a6599a"],["/tags/自定义样式/index.html","3a1644bef99e6fb9058f06f7c46393de"],["/tags/语法/index.html","3bc73bb68925fd07412bb8c418cf9754"],["/tags/运算符/index.html","7d180a3289a5ba599d438a829d7a59d8"],["/tags/错误异常/index.html","39668694bd7a58e3d973318989b56588"],["/tags/高阶函数/index.html","26f543e6706746b6348e857c23b2dcfb"],["/top/index.html","4029f194f6255d808082185d72860ff1"],["/uploads/avatar.jpg","2c85871d8602611180377775f901c2bc"],["/uploads/wechat-qcode.jpg","ae19f72140fdfd49ea03fe424b00cb0c"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
