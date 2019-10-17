---
title: react event
date: 2019-10-16 09:09:39
tags:
---
### 合成事件
React基于虚拟DOM实现了一个合成事件层，我们所定义的事件处理器会接收到一个合成事件对象的实例，它完全符合 W3C 标准，不会存在任何IE标准的兼容问题。并且与原生浏览器具有一样的接口，同样支持事件冒泡机制，可用 stopPropagation() 和 preventDefault() 来中断它。所有事件都自动绑定在最外层上。如果需要访问原生事件对象，可以使用nativeEvent属性。
    > * 抹平了平台差异
    > * 抹平了浏览器差异
    > * 通过delegate优化了事件绑定
<!-- more -->
### 绑定过程
    1. 注入平台特定事件及组件
        * 注入事件plugins
            SimpleEventPlugin(click等)
            EnterLeaveEventPlugin
            ...
    2. mount或update组件时添加或删除事件监听
        * _updateDOMProperties(onClick)
            * 根据onClick找到对应的依赖事件[topClick]
            * 检查topClick事件是否在document上已经注册过
                N: trapBubbledEvent->给doc绑定了dispatchEvent(第一个参数为'topClick')

### 触发执行过程
    1. 事件传播到document的click事件-->dispatchEvent
    2. batchingStrategy.isBatchingUpdates置为true，批量模式
        根据事件类型(onClick)提炼extractEvents
            * 实例化合成事件（SyntheticMouseEvent、SyntheticClipboardEvent...)
            * 按照捕获、冒泡原理提炼绑定的事件accumulateTwoPhaseDispatches（bubble&&capture)
                * events
                    _dispatchInstances(用于设置event的currentTarget)
                    _dispatchListeners
![](/assets/blogImg/react-events.png)
            * runEventQueueInBatch
                * 循环dispatchListeners(Array)
                    * 是否有stopPropagation阻止冒泡,Y 停止循环
                    * 执行listener函数
                        * 多次setState(`新文章单说`)
    4.  ReactDefaultBatchingStrategyTransaction事务close
        * flushBatchedUpdates
            更新dirtyComponent里的state更新
        * batchingStrategy.isBatchingUpdates=false