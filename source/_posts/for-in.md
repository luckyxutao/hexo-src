---
title: forin循环顺序问题
date: 2019-10-19 13:02:57
categories:
- 前端
tags:
- 基础
- 题
---

最近在看react源码，虚拟dom对比中循环用的是for in遍历对象，一直被教育的是for in顺序是不能保证的等等，但是查阅资料后发现还是有一定规律的。
<!-- more -->
> * 浏览器的最新版本现在都按chrome执行
> * 把对象当中的`非负整数键`提出来，排序好输出（升序）
> * 将剩下的键按`定义时的顺序`输出

```javascript
var obj = {};
obj['a17'] = 3;
obj['-5'] = 9;
obj['h14'] = 4;
obj['13'] = 4;
obj['13.5'] = 4;
for(var name in obj){
    console.log(name)
}
//13 a17 -5 h14 13.5
```