---
title: react key使用index和id区别
date: 2019-10-16 09:09:18
categories:
- 前端
tags:
- react 优化
---
​    react日常开发过程中我们经常会遇到一些警告，如：Each child in an array or iterator should have a unique "key" prop。 为了省事我们通常会使用index作为key，警告不见了效果好像也没什么问题。但是真的没问题吗？
<!-- more -->
### demo对比差异
>* 索引做为key
![](/assets/blogImg/id_index.png)
>* id做为key
​![](/assets/blogImg/id_unique.png)
    可以看出dom操作是完全不一样的，id作为key则只是删除了第一个dom，索引则是所有dom都更新了222、333、444，为什么会这样呢？还要从react的更新流程说起，这里只讨论主流程
### key用索引执行流程(删除111第1个元素)
    `当前数据用前一条数据的组件，当然得更新DOM，但是因为索引和顺序是稳定的，顺序对比不用操作`
![](/assets/blogImg/index_key.png)

### key用id执行流程(删除111第1个元素)
    `当前数据还用当前数据的组件，不需要更新DOM，但是在顺序调整等情况下是需要操作dom的（配例不需要）`
![](/assets/blogImg/id_key.png)
​
### 结论
    chilren使用index虽然带来了便利，但是缺点也很多，造成很多不必要的dom更新。