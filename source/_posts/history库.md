---
title: history库
date: 2019-11-09 18:23:10
categories:
- 前端
tags:
- router
- history
- react
---
### What?
通过对浏览器内置的History及API进行封装，使操作history更统一(`Hash，H5 API等`)、方便切换。
> The history library is a lightweight layer over browsers' built-in History and Location APIs. The goal is not to provide a full implementation of these APIs, but rather to make it easy for users to opt-in to different methods of navigation.
<!-- more -->

### History分类
+ createBrowserHistory
HTML5 history API，体验更好
+ createHashHistory
基于hash对象，兼容性好
+ createMemoryHistory
非DOM环境像react native等

### 核心功能
+ 创建history对象
+ 提供常用history导航方法
+ 监听`history对象变化`及`取消监听`
```javascript
/*
location.pathname - The path of the URL
location.search - The URL query string
location.hash - The URL hash fragment
action - PUSH、REPLACE or POP
*/
history.listen((location, action) => {
  console.log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  );
  console.log(`The last navigation action was ${action}`);
});
```

