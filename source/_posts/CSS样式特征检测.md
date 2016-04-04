title: CSS样式特征检测
date: 2015-10-11 20:46:19
categories:
- 前端
tags:
- javascript
- css
---

在javascript我们经常会用到特征检测而不是针对浏览器版本，好处就不多说了。那么针对css需要怎么判断呢？
比如：浏览器是否支持display:flex-box等等。
<!-- more -->
```javascript
(function(win) {
    'use strict';

    var el = win.document.createElement('div'),
        camelRe = /-([a-z]|[0-9])/ig,
        support,
        camel;

    win.isStyleSupported = function(prop, value) {
        // If no value is supplied, use "inherit"
        value = arguments.length === 2 ? value : 'inherit';
        // Try the native standard method first
        if ('CSS' in win && 'supports' in win.CSS) {
            return win.CSS.supports(prop, value);
        }
        // Check Opera's native method
        if ('supportsCSS' in win) {
            return win.supportsCSS(prop, value);
        }
        // Convert to camel-case for DOM interactions
        camel = prop.replace(camelRe, function(all, letter) {
            return (letter + '').toUpperCase();
        });
        // Check if the property is supported
        support = (camel in el.style);
        // Assign the property and value to invoke
        // the CSS interpreter
        el.style.cssText = prop + ':' + value;
        // Ensure both the property and value are
        // supported and return
        return support && (el.style[camel] !== '');
    };

})(this);
```