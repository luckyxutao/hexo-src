---
title: react key使用index和id区别
date: 2019-10-16 09:09:18
categories:
- 前端
tags:
- react 优化
---
​    react日常开发过程中我们经常会遇到一些警告，如：Each child in an array or iterator should have a unique "key" prop。 为了省事我们通常会使用index作为key，警告不见了效果好像也没什么问题。但是真的没问题吗？
### demo对比差异
​   左边是id作为key，右边索引做为key，可以看出dom操作是完全不一样的，id作为key则只是删除了第一个dom，索引则是所有dom都更新了222、333、444，为什么会这样呢？还要从react的更新流程说起，这里只讨论主流程
### react更新流程
   1. instance._renderValidatedComponent（执行render方法)->得到nextRenderedElement
   2. 对比nextRenderedElement和prevRenderedElement是否可以复用(object类型type相等&&key相等)
    2.1 可以复用则用之前的实例 instance.receiveComponent更新流程（ReactDOMComponent)
        2.1.1 updateComponent
        2.2.2 _updateDOMProperties
        2.2.3 _updateDOMChildren
            2.2.3.1 childrenArray
                2.2.3.1.1  _reconcilerUpdateChildren
                    * flattenChildren，将array变为对象，顺序与array一致
                    *   prevChildren={.$111:nextElement111,.$222:nextElement222,.$333:nextElement333,.$444:nextElement444}
                        nextChildren = {.$222:nextElement222,.$333:nextElement333,.$444:nextElement444}, 
                    * 更新children->如果child不是array则直接更新，是array则递归
                        * `循环nextChildren,根据nextChild的key(.$key)去prevChildren对像中查找实例，若找到合符合（shouldUpdateReactComponent）则使用该实例更新nextRenderedElement`
                        * 若不符合则根据renderedElement新建实例并mount，umount旧实例
                    * prevChildren有而nextChildren没有放到removedNodes数组
                2.2.3.1.2  childrenDiff(元素已经更新完成),顺序尚未更新
                    *   

            2.2.3.2 children不是Array
                2.2.3.2.1  直接更新
    2.2 不能利用则根据nextRenderedElement创建新的实例
        2.2.1 umount之前组件
        2.2.2 创建新实例->mount->replace已有markup




​	

​	