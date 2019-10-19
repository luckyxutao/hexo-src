---
title: setState更新流程
date: 2019-10-18 09:11:19
categories:
- 前端
tags:
- react
- 题
- 原理
- 面试
---

本文不讨论详细diff算法只关注setState更新流程(如果不是batchedUpdate也会包装成一个)，[key索引与id区别](/2019/10/16/react-key使用index和id区别/)
<!-- more -->
### 相关事务
+ [***ReactDefaultBatchingStrategyTransaction***](#ReactDefaultBatchingStrategyTransaction)
+ [***ReactUpdatesFlushTransaction***](#ReactUpdatesFlushTransaction)
+ [***ReactReconcileTransaction***](#ReactReconcileTransaction)

### 更新主流程
```javascript
+ 将newState放入_pendingStateQueue
  + //`ReactDefaultBatchingStrategyTransaction`
+ 将要更新的实例放入dirtyComponents队列，并添加updateNumber
  + //`ReactUpdatesFlushTransaction`
  + //`ReactReconcileTransaction`
+ 循环处理dirtyComponents任务(flushBatchedUpdates)
+ updateComponent(inst)
  + `componentWillReceiveProps`
  + var nextState = Object.assign({},inst.state,newState)
  + 是否需要执行更新
    + shouldComponentUpdate
    + PureComponent根据state,props shallow比较
  + updateNumber为null
  + `componentWillUpdate`
  + 执行render得到nextRenderedElement
  + 组件是否可以复用(object比较type和key，其它类型比较值)
    + Y 用旧实例更新新RenderedElement(ReactDomComponent)
      + receiveComponent->updateComponent
      + _updateDOMProperties
        + 更新本层props(除了children),包括事件、style及属性等
        + _updateDOMChildren
          + children(Array)
            + _reconcilerUpdateChildren(flatten和update)
              + children转换为nextChildren{key:nextRenderedElement}(有序的，按定义顺序)
              + 遍历更新nextChildren
                + 组件是否可以从prevChildren能找到可以复用(object比较type和key，其它类型比较值)
                  + Y 新nextElement用根据key找到的实例更新，无论数据对不(`key索引与id区别`)
                  + N 根据nextElement创建新实例并持载
                + 删除已经不被使用的实例(nextChildren里没有,prevChildren里有)
            + children元素顺序更新
                顺序调整算法
          + children
            + 直接更新内容
    + 创建新组件并挂载，卸载旧组件
  + componentDidUpdate
```
### ReactDefaultBatchingStrategyTransaction
```javascript
var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function () {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};
var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};
```
### ReactUpdatesFlushTransaction
```javascript
var NESTED_UPDATES = {
  initialize: function () {
    this.dirtyComponentsLength = dirtyComponents.length;
  },
  close: function () {
    if (this.dirtyComponentsLength !== dirtyComponents.length) {
      // Additional updates were enqueued by componentDidUpdate handlers or
      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
      // these new updates so that if A's componentDidUpdate calls setState on
      // B, B will update before the callback A's updater provided when calling
      // setState.
      dirtyComponents.splice(0, this.dirtyComponentsLength);
      flushBatchedUpdates();
    } else {
      dirtyComponents.length = 0;
    }
  }
};
```
### ReactReconcileTransaction
```javascript
var UPDATE_QUEUEING = {
  initialize: function () {
    this.callbackQueue.reset();
  },
  close: function () {
    this.callbackQueue.notifyAll();
  }
};
```

### ReactReconcileTransaction
```javascript

var SELECTION_RESTORATION = {
  /**
   * @return {Selection} Selection information.
   */
  initialize: ReactInputSelection.getSelectionInformation,

  /**
   * @param {Selection} sel Selection information returned from `initialize`.
   */
  close: ReactInputSelection.restoreSelection
};
/**
 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
 * high level DOM manipulations (like temporarily removing a text input from the
 * DOM).
 */

var EVENT_SUPPRESSION = {
  /**
   * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
   * the reconciliation.
   */
  initialize: function () {
    var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
    ReactBrowserEventEmitter.setEnabled(false);
    return currentlyEnabled;
  },

  /**
   * @param {boolean} previouslyEnabled Enabled status of
   *   `ReactBrowserEventEmitter` before the reconciliation occurred. `close`
   *   restores the previous value.
   */
  close: function (previouslyEnabled) {
    ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
  }
};
/**
 * Provides a queue for collecting `componentDidMount` and
 * `componentDidUpdate` callbacks during the transaction.
 */

var ON_DOM_READY_QUEUEING = {
  /**
   * Initializes the internal `onDOMReady` queue.
   */
  initialize: function () {
    this.reactMountReady.reset();
  },

  /**
   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
   */
  close: function () {
    this.reactMountReady.notifyAll();
  }
};
```