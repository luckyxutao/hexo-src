---
title: react-router之withRouter
date: 2019-10-28 08:57:29
categories:
- 前端
tags:
- router
- react-router
---
You can get access to the history object's properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
### 原理
* 通过高阶组件将普通React组件包装成Route
* Route是默认值（`path是/且exact为false`）意味着无论访问什么路径都会匹配
* render方法可以控制（如何）条件渲染组件
```javascript
export default (Component) => {
  return function(props){
    return <Route render={routeProps=>{
      return <Component {...routeProps} />;
    }}></Route>
  }
};

```



