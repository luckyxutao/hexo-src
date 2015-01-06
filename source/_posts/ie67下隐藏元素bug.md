title: ie67下隐藏元素bug
date: 2014-11-19 20:21:25
categories:
- css
tags:
- ie
---

**具体场景:**

弹层里的一个tab切换，通过切换来控制不同元素隐藏和展示。被隐藏的元素添加了(display:none)，仍然穿透当前展示元素。
<!-- more -->
![](/assets/blogImg/2014-11-19-8.47.38.png)

**一个很恶心的解决方法如下:**

*延迟一定时间，给他们的父级元素添加一个class*

```javascript
if( isIE6 || isIE7){
    window.setTimeout(function(){
        me.dom.addClass('hide_ie6') //class名可以不存在
    },50);
}

```

