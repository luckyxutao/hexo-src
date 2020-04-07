---
title: implement-object-create
date: 2018-12-06 10:24:16
categories:
- 基础
tags:
- implement
- 面试
---

```javascript
if(typeof Object.create !== 'function'){
    Object.create = function(proto){
        var fNOP = function(){};
        fNOP.protoype = proto;
        return new fNOP();
    }
}
```