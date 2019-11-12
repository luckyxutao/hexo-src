---
title: redux中间件
date: 2019-11-04 09:45:04
categories:
- react
tags:
- redux
- middleware
- 原理
---
### 前言


> It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.

这是 redux 作者 Dan 对 middleware 的描述，middleware 提供了一个分类处理 action 的机会，在 middleware 中你可以检阅每一个流过的 action，挑选出特定类型的 action 进行相应操作，给你一次改变 action 的机会。
<!-- more -->

### 是什么
+ 给使用者提供了一种可以组合、自由插拔的插件机制来增强和扩展redux
+ 通过对`dispatch包装`可以拦截所有dispatch的action，以方便增加逻辑
+ 是一个增强版的store
![](/assets/blogImg/redux-middleware-2.png)

假设我们想在所有dispatch触发时拦截做些特殊处理，是很难做到的也不优雅,如：打印日志
```javascript
let store = createStore(reducer);
let dispatch = store.dispatch;
store.dispatch = function (action) {
  console.log(store.getState().number);
  dispatch(action);
  console.log(store.getState().number)
};
export default store;
```
如果需要打印每一个 action 信息用来调试，就得去改 dispatch 或者 reducer 代码，使其具有打印日志的功能。又比如点击 button 后，需要先去服务器请求数据，只有等拿到数据后，才能dispatch更新到store以重新渲染 view，此时我们又希望 dispatch 或者 reducer 拥有异步请求的功能等等。。。
面对多种多样的业务需求，`单纯的修改 dispatch 或 reducer 的代码显然不具有普世性，我们需要的是可以组合的，自由插拔的插件机制`，所以 redux 的 middleware 是为了`增强 dispatch 而出现的`,是一个`enhance的store`。
### 实现
总共分四步，[`middleware源码`](#source-middleware)
+ 根据参数创建store，拿到原始getState和dispatch
+ 给 middleware分发 store
+ 通过[`compose`](#compose)组合串联 middlewares
![](/assets/blogImg/redux-middleware-4.png)
+ 返回新dispatch

### 新dispatch执行顺序
![](/assets/blogImg/redux-middleware-5.png)

### source-middleware
```javascript
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    // step1，根据参数创建原始store
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }
    // step2 给 middleware 分发 store
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    ///
    // step 3 组合串联 middlewares
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
```
### compose
```javascript
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```