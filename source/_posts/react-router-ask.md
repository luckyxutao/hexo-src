---
title: react-router-ask
date: 2020-03-23 11:13:43
categories:
- 前端
tags:
- router
- react
- 题
---


### 为什么要使用前端路由
* 代码解耦
* React路由是一个构建在React之上的强大的路由库
* 使URL与网页上显示的数据保持同步。

<!-- more -->
### 为什么要使用Switch组件？
因为route默认的匹配原则是只要匹配上都会渲染，如果遇到非精确匹配同时包含了子路由的情况，则会将子、父路由都渲染出来，而Switch则保证只会有一个匹配
### React-Router是如何配置的
* 如果是BrowserHistory，则需要在服务端设置转发(fallback),hashHistory则不需要
* 引入Browser或HashHistory as Router
* 用Router将应用入口包裹起来
* React组件通过withRouter高阶函数来取到history及location信息

### React-Router是如何代码分割的
* React-Router并不提供代码分割功能
* 代码分割使用了DynamicImport（是一种规范，webpack默认支持）特性

```javascript
import('./math').then(res=>{
    console.log(res.default)
});
import('./print').then(res=>{
    res.default('from print')
});
/////////////////
dist
├── 0.bundle.js
├── 0.bundle.js.map
├── 1.bundle.js
├── 1.bundle.js.map
├── bundle.js
├── bundle.js.map
└── index.html

```
```javascript


import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router,Route } from 'react-router-dom';
import './index.css';
function AsyncComponent(loadComponent,placeholder='loading……'){
    return class AyncComponent extends React.Component{
        state = {
            Child:null
        }
        async componentDidMount(){
            loadComponent().then(res=>{
                this.setState({
                    Child:res.default
                })
            })
        }
        render(){
            const { Child } = this.state;
            return (
                Child ? <Child {...this.props} /> : placeholder
            );
        }
    }    
}

const App = ()=>{
    return (
        <Router>
            <Route path="/m1" component={AsyncComponent(()=>{
                return import('./pages/m1');
            })} />
            <Route path="/m2" component={AsyncComponent(()=>{
                return import('./pages/m2');
            })} />
        </Router>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
```

### React-Router路由都有哪些常用props
* 常用props
    exact、path、children、component、render
* 说明
    exact是否匹配子路由
    path 路径
* 渲染规则及优先级
    match
        children(函数)->children（组件）-> component->render->null
    !match
        children(函数)->null    

### route匹配的原理是什么？
* 将route的path转换为regexp，路径pattern
* 将当前location.pathname和路径pattern做比较
* 匹配成功则渲染，否则null

### React-Router怎么获取历史对象？
通过`withRouter`, withRouter可以使子元素获取history对象以及距离最近Route的location及match信息
### React-Router怎么获取URL的参数？
v3默认提供了，v4需要自己获取，可通过querystring

### 在history模式中push和replace有什么区别？
* push是往history或路由栈里新增一个，路由栈会增加
* replace则是把当前路由替换为新的，路由栈长度不会增加

### React-Router怎么设置重定向？
 可以设置到children上，也可以和其它route并列设置（Switch内)，一旦匹配上就会重定向，顺序上需要注意
### React-Router 4中<Router>组件有几种类型？
HashHistory、BrowserHistory

### React-Router的实现原理是什么？
* history库监听hash或history Api获取最新的pathname
* Router监听history库 location变化事件，有变化时会将最亲的的location通过context传给route，重新渲染route
* Route收到最新location,会将location和Route定义的path作对比，匹配上则渲染否则null
* withRouter 是收听距离最近上层的 match、location信息及history对象

### React-Router 4的switch有什么用？
渲染第一个匹配的路由或Redirect
### React-Router的<Link>标签和<a>标签有什么区别？
* A是普通的链接，这种方式会完全刷新应用，导致spa数据丢失
* Link是路由提供的导航、跳转方式，是通过history的push或replace触发的，不会丢失数据

### React的路由和普通路由有什么区别？
* 普通路由是由后端控制的，切换路由时页面每次都会刷新，页面页数据也不共享
* React的路由是由前端控制的（基于hash或browserHistory)，页面切换不会真正刷新页面，各页面数据共享（spa)