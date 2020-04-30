---
title: react核心概念梳理
date: 2020-03-01 20:19:06
categories:
- 前端
tags:
- react
---

学习react(基于15.6)过程中理解核心概念还是很重要的，便于我们抓住主干线索


<!-- more -->

* element(虚拟DOM)
```javascript
{
    $$typeof: Symbol(react.element),
    props : {
        id:'2222',
        children:[{
            $$typeof: Symbol(react.element),
            props : {
                onClick:this.onClick,
                className:'active',
                children:'button'
            },
            type : 'span'
        }],
    },
    type : 'div'
}
```
* instance
平时我们写的`class/函数`组件的实例，包含生命周期等
state/props变化后，触发更新逻辑
```javascript
instance = new Counter();
Counter.getDerivedStateFromProps();
instance.render()
instance.didMount();
```
* 虚拟DOM管理类
根据`虚拟DOM`type创建的管理类，主要用来管理和维护`虚拟DOM`。内部拥有instance，用来获取新rendered元素、触发生命周期
    * ReactCompositeComponent
    用来管理element.type是函数的虚拟DOM元素
    * ReactDOMComponent
    用来管理element.type是string(div,span)的虚拟DOM元素

* 关系图
![](https://s1.ax1x.com/2020/04/30/JLB7WQ.png)