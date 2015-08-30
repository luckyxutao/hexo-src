title: 通过transform居中显示
date: 2015-05-16 17:14:11
categories:
- 前端
tags:
- css
- 居中
---

垂直水平居中是日常前端开发当中一个常见的需求，在支持 CSS3 属性的现代浏览器当中，有一个利用 CSS3 属性的垂直水平居中方法。
<!-- more -->
```css
.center {
     position: absolute;
     top: 50%;
     left: 50%;
     -ms-transform: translate(-50%,-50%);
     -moz-transform: translate(-50%,-50%);
     -o-transform: translate(-50%,-50%);
     transform: translate(-50%,-50%); 
 }
```
详细参见:http://segmentfault.com/a/1190000002436755