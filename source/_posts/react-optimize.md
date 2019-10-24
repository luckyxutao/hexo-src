---
title: react常用优化总结
date: 2019-10-20 20:38:51
categories:
- 前端
tags:
- react
- 优化
---
总结了在React开发中常用的一些优化经验
<!-- more -->
### React.Fragment
A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.
```javascript
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
```
### 只传必要的props
不使用(...)析构方式传参
### 使用PureComponent
本质还是class组件，通过在shouldComponentUpdate函数里浅比较了state和props，减少了重复渲染次数
### 不要使用内联函数
如果我们使用内联函数，则每次调用“render”函数时都会创建一个新的函数实例，PureCompoent优化效果也会失效，而是在组件创建一个函数
```javascript
import React from "react";
 
export default class InlineFunctionComponent extends React.Component {
  
  setNewStateData = (event) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <h1>Welcome Guest</h1>
        <input type="button" onClick={this.setNewStateData} value="Click For Inline Function" />
      </div>
    )
  }
}
```
### shouldComponentUpdate
在该组件中通过比较state、props等来决定是否需要render
### 虚拟化长列表
无限加载[长列表](https://bvaughn.github.io/react-virtualized/#/components/List)优化