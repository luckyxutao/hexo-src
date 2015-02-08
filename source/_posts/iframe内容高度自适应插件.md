title: iframe内容高度自适应插件
date: 2015-02-07 20:42:02
tags:
- jQuery插件
- iframe高度自适应
---

> * 原理是通过定时器不断检测iframe高度并设置frame高度
> * 适用于同域情况，`引用页面和iframe均需要指定相同的document.domain`
> * 将dom操作代价降到最低，如果高度没变化不会更新frame高度
> * 兼容ie6+

<!-- more -->
###为什么要开发这个插件？###
页面引用iframe给我们带来方便的同时，也带来了烦恼，如：高度无法自动适应会导致滚动条出现，又不能将高度写死。
###为什么要使用interval轮询呢？###
如果引的iframe的高度是不变的(即：加载完成之后，高度固定)是不需要轮询的，这个插件适用于iframe内有交互并且会影响iframe的高度(如下图):
`展开/收起、添加回复等多种因素都会导致iframe高度发生变化。`

![](/assets/blogImg/2015-02-07 下午9.06.59.png)

###用法:
```javascript
document.domain = xxxx.com;

$("#commentPage").AutosizeFrame({
		interval: 10, // 轮询时间
		minHeight: 500 //最小高度
});
```
###插件地址:
[https://github.com/luckyxutao/jQueryPlugins/tree/master/AutosizeFrame](https://github.com/luckyxutao/jQueryPlugins/tree/master/AutosizeFrame)
