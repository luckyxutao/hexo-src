---
title: 深入理解react-router
date: 2019-11-12 08:56:32
categories:
- react
tags:
- router
- react-router
---

React Router 是一个基于 React 之上的强大路由库，它可以让你向应用中快速地添加视图和数据流，同时保持页面与 URL 间的同步。
<!--more-->
### 核心思想
+ 监听[`history`](/2019/11/09/history库/)库url变化事件(Router)
+ 通过`react context`传播机制，将变化传给(route)做匹配渲染
+ route将`最新`match(`含路径参数，不含query参数`)和location通过context传给child

### Router
位于应用的顶层，通过对[`history`](/2019/11/09/history库/)监听，将新location信息传给route做匹配渲染，新版本已经封装了BrowserRouter，HasRouter。
```javascript
this.unlisten = this.props.history.listen(location => {
    this.setState({ location });
});
//
render(){
    const props = {
        history:this.props.history,
        location:this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname),
    }
    return (
        <Context.Provider value={props}>
            {this.props.children}
        </Context.Provider>
    )
}
```
### Route
根据`path属性`生成`路径匹配正则表达式`,与当前路径pathname比较，通过`context`对象将最新的location、match信息传给子元素
+ 优先级顺序
    + 匹配成功
        + children === function ? children(props): children
        + component ? <Component />
        + render ? render(props)
    + 不成功
        + children === function ? children():null
+ exact
控制路由是否需要匹配子路由
```javascript
const pathToRegExp = require('path-to-regexp');
const url = '/user';
const url2 = '/user/beijing/shanghai';
const keys = []
let reg = pathToRegExp(url,keys,{end:false});
console.log(reg.test(url)) // true
console.log(reg.test(url2)) // true

let reg2 = pathToRegExp(url,keys,{end:true});
console.log(reg2.test(url)) // true
console.log(reg2.test(url2)) // false
```
+ component属性
```javascript
<Route path="/" component={Home} />
```
+ children子元素
```javascript
<Route path="/"><Home /></Route>
```
+ render方法
```javascript
<Route render={props=>{return <Home />;}} />
```
+ children方法
```javascript
<Route children={props=>{return <Other />;}} />
```
### Switch
渲染第一个匹配的child路由，匹配到就停止。
```javascript
const {location} = this.context;
let element = null, match;
React.Children.forEach(this.props.children,child=>{
    if(match == null){
        element = child;
        const path = child.props.path || child.props.from;
        if(path){ //如果有path路径，则路径匹配，
            match = matchPath(location.pathname,{...child.props,path});
        } else {// 没有path属性，则默认匹配所有 /
            match = this.context.match;
        }
    } 
});
return element;
```
### Redirect
很像服务端302跳转，会重定向到一个新位置
```javascript
export default class Redirect extends React.Component {
  static contextType = context;
  render() {
    const { history} = this.context;
    const { to, push = false } = this.props;
    const method = push ? history.push : history.replace;
    method(to);
    return null;
  }
}
```
### withRouter
You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. 
```javascript
export default (WrappedComponent) => {
    return class extends React.Component{
        static contextType = context;
        render(){
            return <WrappedComponent {...this.props} {...this.context} />
        }
    }
};
```
### Link
是对a标签的封装。a标签直接跳转会刷新页面，Link好处是跳转地址不用关心是hash还是browserHistory，都是通过history方式跳转的不会刷新页面。