---
title: implement-new
date: 2019-02-16 10:15:03
categories:
- 基础
tags:
- implement
- 面试
---
new一个函数构造器主要步骤
```javascript
function instant(fn,...args){
    var obj = Object.create(fn.prototype);
    var val = fn.apply(obj,args);
    return typeof obj === 'object' ? val : obj;
}

```
