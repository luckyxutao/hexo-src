---
title: redux原理学习
date: 2019-11-04 08:55:46
categories:
- react
tags:
- redux
- 原理
---
redux是一个非常小的库，了解其工作原理对我们日常开发也是很重要的
### createStore
[`源码`](https://github.com/luckyxutao/my-react-router-connected/blob/master/src/redux/createStore.js)是redux库的核心，主要包含3个方法
<!-- more -->
+ dispatch
派发一个动作，dispatch参数只能是`plainObject`({type:'increment'})
```javascript
  function dispatch(action) {
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    for (let index = 0; index < currentListeners.length; index++) {
      currentListeners[index]();
    }
    return action;
  }
```
+ subscribe
监听store变化，每触发一个action后触发该回调
+ getState
获取当前store状态tree

### combineReducers
[`源码`](https://github.com/luckyxutao/my-react-router-connected/blob/master/src/redux/bindActionCreators.js)随着项目越来越大拆分reducer(如：按页面拆分）已经不可避免（每个reducer管理一部分state)，通过此函数将分散的reducer合并成一个传入createStore。
combineReducers会返回一个总reducer函数combination(state，action)通过循环对象每个属性来更新state

+ 过滤对象所有非函数属性
+ 遍历对象所有属性，根据key找到对应reducer函数并执行，并将结果放入新对象的key值
+ 对比新、旧state属性是否相等，来决定返新对象与否

### applyMiddleware
参见[`redux中间件`](/2019/11/04/redux-3-middleware)Redux middleware 提供了一个分类处理 action 的机会。在 middleware 中，我们可以检阅每一个流过的 action,并挑选出特定类型的 action 进行相应操作，以此来改变 action。

### bindActionCreators
[`源码`](https://github.com/luckyxutao/my-react-router-connected/blob/master/src/redux/bindActionCreators.js)actionCreators返回的只是plainObject，需要通过dispath派发。本函数主要作用是将actionCreators函数转换为可dispatch的，循环actions对象并执行bindActionCreator，返回新对象。
```javascript
function bindActionCreator(actionCreator,dispatch){
    return function(){
        return dispatch(actionCreator.apply(this,arguments))
    }
}
```