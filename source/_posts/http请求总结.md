---
title: 常见http请求交互
date: 2019-11-02 08:49:06
categories:
- 前端
tags:
- http
- 请求
---

总结了下前端与后端交互常用的发请求方式，环境`fetch+eggjs`
<!-- more -->
### json格式
`后端node可以通过ctx.request.body拿到前端发送的JSON`
```javascript
let meta = {
  method: "POST",
  credentials: 'include',// same-origin、 omit、 include
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(params) //传为json string
};
fetch("http://127.0.0.1:7001/", meta)
  .then(response => response.json())
  .then(responseJson => {
    debugger;
  })
  .catch(error => {
    console.error(error);
  });
```
### form
```javascript
let meta = {
    'method': 'POST',
    'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    'body': 'a=1&b=2&c=3'//通过qs.stringify({a:1,b:2,c:3})
};
```
### formdata
通常上传功能会使用此类方式。可以通过表单获取一个FormData，也可以直接创建一个，egg可以通过ctx.request.files[]拿到上传的文件，ctx.request.body拿到参数
```javascript
//eggjs
config.multipart = {
    fileSize: '50mb',
    mode: 'file',
    fileExtensions: [ '.xls', '.txt' ], // 扩展几种上传的文件格式
};
//获取表单
var formElement = document.querySelector("form");
var formData = new FormData(formElement);
//新建formData
const fm = new FormData();
fm.append('a', 1);
fm.append('b', 2);
fm.append('c', 3);
let meta = {
    'method': 'POST',
    'headers': {
        'Content-Type': 'multipart/form-data'
    },
    'body': fm
};
```