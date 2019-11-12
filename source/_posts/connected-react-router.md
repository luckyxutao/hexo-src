---
title: connected-react-router
date: 2019-11-08 09:04:24
categories:
- react
tags:
- router
- react
- middleware
- 原理
---
### What
> A Redux binding for React Router v4 and v5
<!-- more -->

### 核心原理
将router的操作交由redux管理，路由作为redux的一部分
+ actions
封装了push、replace、go、goBack、goForward等
+ middleware拦截dispatch，调用history`导航方法`跳转
+ ConnectedRouter
监听history变化并将新location、action派发到store
+ reducer将当前location及action放入store({router})

### 流程
1. 触发actions
dispatch(put('/about'))等
2. middleware截获，如果action.type是`CALL_HISTORY_METHOD`则交由history方法跳转并改变浏览器url
3. history变化通知store将新location和action存入store(action.type`LOCATION_CHANGE`)
4. store变化，通知react-router重新渲染路由
```javascript
router={
    action:'POP',//PUSH/REPLACE
    location:{
        pathname:'/aaa',
        search,
        hash
    }
}
```
### 代码分析
+ middleware
```javascript
import { CALL_HISTORY_METHOD } from "./constants";
export default function(history) {
  return function(store) {
    return function(next) {
      return function(action) {
        if (action.type !== CALL_HISTORY_METHOD) {
          return next(action);
        }
        let { method, path } = action.payload;
        history[method](path);
      };
    };
  };
}
```
+ reducer
```javascript
export default function(history) {
  const initialState = {
    location: history.location,
    action: history.action
  };
  return function(state = initialState, action) {
    if (action.type === LOCATION_CHANGE) {
      return {
        location: action.payload.location,
        action: action.payload.action
      };
    }
    return state;
  };
}
```
+ ConnectedRouter
```javascript
import { Context } from '../react-redux';
export default class ConnectedRouter extends React.Component {
  static contextType = Context;
  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.context.store.dispatch({
        type: LOCATION_CHANGE,
        payload: {
          location,
          action
        }
      });
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    const { children, history } = this.props;
    return <Router history={history}>{children}</Router>;
  }
}
```
+ actions
```javascript
import { CALL_HISTORY_METHOD } from "./constants";
export function put(path) {
  return {
    type: CALL_HISTORY_METHOD,
    payload: {
      method: "push",
      path
    }
  };
}
export function replace(path) {
  return {
    type: CALL_HISTORY_METHOD,
    payload: {
      method: "replace",
      path
    }
  };
}
```