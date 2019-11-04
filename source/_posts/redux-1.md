---
title: redux入门介绍
date: 2019-11-03 17:28:26
categories:
- 前端
tags:
- redux
- 题
---
![](/assets/blogImg/redux-async.png)
### 作用
React本身只是一个UI层，并不是Web应用的完整解决方案。没有解决`代码结构、组件之间通信、数据共享及职责划分`等问题，对于大型复杂应用来说恰恰是最关键的。Redux则跟MVC架构是同一类东西，统一了代码结构，使项目逻辑更加清晰、易维护。
### Action
+ Action是普通的plainObject，其中type属性是必须的。
<!-- more -->
```javascript
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```
+ 派发一个action
```javascript
store.dispatch({type:'INCREMENT'})
```

### ActionCreator
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 ActionCreator。
```javascript
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```
### BindActionCreators
ActionCreator函数结果是plainObject并不能直接执行，需要通过`dispatch`派发。bindActionCreators主要作用是批量将ActionCreator转为可派发动作的函数
```javascript
const boundedActionCreators = {
    addTodo : function(text){
        return store.dispatch({
            type: ADD_TODO,
            text
        })
    }
}
```
### Reducer
reducer是一个函数，它接受 action({type:xxx,payload:{}}) 和当前 State 作为参数，返回一个新的 State。
```javascript
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};
```
### combineReducers
随着应用变得复杂，需要对 reducer 函数进行拆分，拆分后的每一块独立负责管理 state 的一部分。combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象。state 对象的结构由传入的多个 reducer 的 key 决定。action.type需要`全局唯一`。
```javascript
/**
* {
*     counter: function(state,action){},
*     home : function(state,action){}
* }
* state = {
*    counter:{},
*    home:{} 
* }
*/
//遍历reducers对象
const nextState = {};
const prevStateForKey = state[key];//取出该对象之前值(state['Counter'])
const nextStateForKey = reducer(prevStateForKey, action); // state['Counter]新值
nextState[key] = nextStateForKey

```
### container(react组件)
通过react-redux connect连接redux
```javascript
export default connect(
  state => {
    return {
      counterData: state.Counter
    };
  },dispatch=>{
    return bindActionCreators(actions,dispatch);
  })(Counter);
```


