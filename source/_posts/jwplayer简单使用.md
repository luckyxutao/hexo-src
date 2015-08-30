title: jwplayer简单使用
date: 2015-05-15 07:04:00
categories:
- 前端
tags:
- jwplayer
- 视频
---

### 这篇文章最终能达到怎样的效果及注意事项？###
> * 兼容PC端浏览器IE6+
> * flv格式边下载边播放,而mp4则需要整个文件下载完才能播放
> * flvplayer.swf需和视频文件在同一域名下，否则就是跨域请求需要特殊处理


<!-- more -->
## `说明文档及flvplayer.swf下载地址`
`版本是3.1.2，虽然老但是很好用,并且官方很多帮助教程地址都没了，还要注册好烦人的`
[说明文档](/demos/JWPlayers3_12ReadMe.html)
[flvplayer.swf下载地址](/assets/blogImg/flvplayer.swf)
## `引入js并添加脚本`
```html
<script src="../common/swfobject.js"></script>
<script type="text/javascript">
    var s1 = new SWFObject("flvplayer.swf","single","700","414","7");
    s1.addParam("allowfullscreen","true");
    s1.addVariable("file","AIRBNBMandarin12Novsmall_v2.flv");
    s1.addVariable("image","preview.jpg");
    s1.addVariable("backcolor","0x000000");
    s1.addVariable("frontcolor","0xCCCCCC");
    s1.addVariable("smoothing","true");
    s1.addVariable("lightcolor","0x557722");
    s1.addVariable("width","700");
    s1.addVariable("height","414");
    s1.addVariable("start","0");
    s1.addVariable("overstretch","true");//自动填充空白区域
    s1.write("video");
</script>
```