title: 通过line-clamp来限制显示的行数
date: 2016-04-23 22:52:54
categories:
- 前端
tags:
- 移动端
- css
---

`通过css的line-clamp属性来控制文本显示的行数`

[演示](/demos/css3-line-clamp.html)


```css
.fold {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```