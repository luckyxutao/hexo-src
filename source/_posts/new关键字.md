---
title: new关键字
date: 2019-10-22 21:39:50
categories:
- 前端
tags:
- 基础
- 题
---
代码描述清晰、易懂
```javascript
function instant(fn,...rest){
    var f = Object.create(fn.prototype);
    var val = fn.apply(f,rest);
    return isPrimitive(val) ? f : val;
}
```