---
title: history与react-router
date: 2019-10-31 08:40:49
categories:
- react
tags:
- history
- react
- 题
---
window.history属性指向 History 对象，它表示当前窗口的浏览历史。

### 属性

+  History.length：当前窗口访问过的网址数量（包括当前网页）
+  History.state：History 堆栈最上层的状态值（详见下文）
 <!-- more -->

### 方法

+ pushState方法用于在历史中添加一条记录。
+ replaceState 用来修改 History 对象的当前记录，其他都与pushState()方法一模一样。
+ History.back()：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。
+ History.forward()：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。
+ History.go()：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如go(1)相当于forward()，go(-1)相当于back()。如果参数超过实际存在的网址范围，该方法无效果；如果不指定参数，默认参数为0，相当于刷新当前页面。

### 事件
每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。注意，`仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用History.back()、History.forward()、History.go()方法时才会触发`。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

### 演示
```javascript
import React from "react";
import Context from './context';
(function(history){
    let oldPush = history.pushState;
    history.pushState = function(state,title,url){
        if(window.onpushstate){
            window.onpushstate(state,title,url);
        }
        oldPush.apply(history,arguments); // [state,title,url]
    }
})(window.history)
export default class BrowserRouter extends React.Component{
    state = {
        location : {
            pathname: document.location.pathname ||'/',
            a:1
        }
    }

    componentDidMount(){
        window.onpopstate = event=>{
            this.setState({
                location:{
                    ...this.state.location,
                    pathname: document.location.pathname,
                    state: event.state
                }
            });
        }
        window.onpushstate = (state,title,pathname)=>{
            this.setState({
                location:{
                    ...this.state.location,
                    pathname,
                    state
                }
            });
        }
    }

    locationState=null;

    render(){
        const that = this;
        let props = {
            location:this.state.location,
            history:{
                push:(to,state)=>{
                    if(that.getMessage){
                        const allow = window.prompt(this.getMessage(that.props.location));
                        if(!allow){
                            return ;
                        }
                    }
                    if(typeof to === 'object'){
                        const {pathname,state} = to;
                        this.locationState = state;
                        window.history.pushState(state,'',pathname);
                        // window.location.hash = pathname;
                    } else {
                        window.history.pushState(null,'',to);
                    }
                },
                block(message) {
                    that.getMessage=message;
                },
                unblock() {
                    that.getMessage=null;
                }
            }
        }
        return (
            <Context.Provider value={props}>
                {this.props.children}
            </Context.Provider>
        )
    }
}
```