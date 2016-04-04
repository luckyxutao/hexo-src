title: flexbox实现流式布局
date: 2016-04-03 22:43:44
categories:
- 前端
---

> * 依赖了flex-wrap属性，目前android4.4以下不支持
> * 方案一，固定了显示个数，无论宽度是多少均会显示固定个数，可能会导致宽度小时每个条目过窄，显示不全
> * 方案二，显示个数不固定，优点是可以通过min-width将内容显示全面，宽度小时显示的个数也会更少


[示例一](/demos/css-flex-fluid1.html) [示例二](/demos/css-flex-fluid2.html)