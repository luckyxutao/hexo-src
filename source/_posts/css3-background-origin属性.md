title: css3学习之background-origin
date: 2015-02-08 18:18:43
tags:
- css3
---

###作用:###

设置元素背景图片的原始起始位置。

###语法：###
`background-origin ： border-box | padding-box | content-box;`
<!-- more -->
参数分别表示背景图片是从**边框**，还是**内边距（默认值）**，或者是**内容区域**开始显示。
效果如下：

![](/assets/blogImg/531003de0001166903660166.jpg)

**需要注意**的是，如果背景不是**no-repeat**，这个属性无效，它会从边框开始显示。[点击这里demo](/demos/css3-background-origin.html)