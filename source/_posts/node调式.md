title: node调式
date: 2016-10-06 21:03:11
categories:
- 前端
tags:
- node调试
---



**推荐一篇[node调试教程](http://i5ting.github.io/node-debug-tutorial/#102) **

通过环境变量来控制程序调试环境

```shell

 env __DEV__=1 node 1.js

```


1.js

```javascript

var dv = process.env.__DEV__;
if (dv == 1) {
    console.log('devdevdevdev222')
} else {
    console.log('product product product222')
}

```
