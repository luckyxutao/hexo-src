title: animation-fill-mode理解
date: 2016-04-19 21:28:10
categories:
- 前端
tags:
- css3
- 动画
---

`动画起始位置 : keyframes 0% 或者 from, 不是元素默认位置`
`动画结束位置 : keyframes 100% 或者to`
<!-- more -->
```css
animation-fill-mode: backwards;
```
动画开始前 先定位到动画起始位置,再开始动画。但是结束时还是会移动到默认位置(不是动画起始位置)
如果不设置则会在动画开始后再从元素默认位置移动到动画起始位置


```css
animation-fill-mode: forwards;
```
动画结束后，元素定位在 动画结束位置


```css
animation-fill-mode: both;
```
动画开始前，元素先移动到动画起始位置
动画结束后，元素定位在 动画结束位置