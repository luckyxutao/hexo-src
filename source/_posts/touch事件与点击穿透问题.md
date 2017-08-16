title: touch事件与点击穿透问题
date: 2016-05-25 16:22:51
categories:
- 前端
tags:
- javascript
---

看到一篇不错的文章[也来说说touch事件与点击穿透](https://segmentfault.com/a/1190000003848737)
<!-- more -->
### 解决办法: ###
1. 都使用tap或者都使用click(有300ms延迟,不推荐)是不会发生穿透的(原因参考上文),[同为tap](/demos/touch-event-tap2.html)
```javascript
    Zepto(function($){
        // 点击穿透
        var $close = $('#closePopup');
        var $popup = $('#popupLayer');
        var $under = $('#underLayer');
        var $mask = $('#bgMask');

        $close.on('tap', function(e){
            $popup.hide();
            $mask.hide();
        });

        $under.on('tap', function(){
            alert('underLayer clicked');
        });

    });
```
2. 否则可以将tap的隐藏等操作放在异步事件中[异步方式](/demos/touch-event-tap.html)
```javascript
    Zepto(function($){
        // 点击穿透
        var $close = $('#closePopup');
        var $popup = $('#popupLayer');
        var $under = $('#underLayer');
        var $mask = $('#bgMask');

        $close.on('tap', function(e){
            window.setTimeout(function(){
                $popup.hide();
                $mask.hide();
            },400);//大于300ms
        });

        $under.on('click', function(){
            alert('underLayer clicked');
        });

    });
```
3. FastClick等第三方库，个人感觉能不用尽量不用 