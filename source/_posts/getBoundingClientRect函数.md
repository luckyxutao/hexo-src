title: getBoundingClientRect函数
date: 2014-11-20 16:54:22
categories:
- javascript
---


该方法获得**页面中某个元素的左，上，右和下分别相对浏览器视窗的位置**。该方法已经不再是IE Only了，FF3.0+和Opera9.5+已经支持了该方法，可以说在获得页面元素位置上效率能有很大的提高，在以前版本的Opera和Firefox中必须通过循环来获得元素在页面中的绝对位置。
 <!-- more -->
 ###兼容性
![](/assets/blogImg/2014-11-20--18.36.11.jpg)

下面的代码举了个简单的例子，可以滚动滚动条之后点红色区域看各个值的变化

![](http://pic002.cnblogs.com/img/qieqing/200810/2008100603035335.gif)
![](http://pic002.cnblogs.com/img/qieqing/200810/2008100603040663.gif)