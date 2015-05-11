title: css3学习之background-clip
date: 2015-02-08 22:13:04
tags:
- css3
---

###作用:###

用来将背景图片做适当的裁剪以适应实际需要。

###语法：###
`background-clip ： border-box | padding-box | content-box | no-clip`
<!-- more -->
参数分别表示从**边框**、或**内填充**，或者**内容区域**向外裁剪背景。no-clip表示不裁切，和参数border-box显示同样的效果。backgroud-clip默认值为**border-box**。
效果如下：[点击这里demo](/demos/css3-background-clip.html)

![](/assets/blogImg/5310065d0001c95103660166.jpg)