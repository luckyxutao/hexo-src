title: 不使用css来阻止滚动条滚动
date: 2014-11-19 15:25:51
categories:
- 前端
tags:
- scroll
- 滚动条
---

------

最近开发了一个自定义滚动条，当鼠标hover到目标元素再滚动时，就会出现元素在滚动，外部窗口也在滚动，很不爽。
   

> * 给body添加overflow，隐藏滚动条。缺点：视觉上出现页面左右晃动,体验差。
> * 给body绑定mousewheel事件，如果当前是在目标元素，则阻止默认行为。缺点：不够优雅
> * 给子元素mousewheel事件加上return false(兼容ie6)。缺点：无

##第二种解决方案
<!-- more -->
          
```javascript
	var stopScroll = function(e){
		e.preventDefault();
		e.stopPropagation();
	};
	var $body = $('body');
	this._$window.on('mouseenter',function(){
		$body.on('mousewheel',stopScroll);
	});
	this._$window.on('mouseleave',function(){
		$body.off('mousewheel',stopScroll);
	});
```

##第三种方案

```javascript
//鼠标滚动时逻辑处理
_mouseWheelHandler: function(event, delta, deltaX, deltaY) {
	if (this._cacheFuncProxyer('hasScrollBar')) {
		this._execScrolling(delta * -1, delta * this._getGap());
	}
	return false
}
```