---
title: instanceof关键字
date: 2020-01-02 13:46:42
categories:
- 基础
tags:
- implement
---

instanceof for testing object instance, `cannot test primitive type`

<!-- more -->
### 适用场景
*  it's safe to say that instanceof is applicable only for objects rather than primitive types.
*  typeof operator tests whether the value belongs to primitive types like "string", "number", "boolean", "object", "function" or "undefined".

### polyfill实现
根据左值原型指针和右边prototype做比较，如果相等则为true,否则沿原型链向上找，直到Object.prototype.__proto为null
```javascript
function myInstanceOf(L, R) {
    let proto = L.__proto__;
    let prototype = R.prototype;
    while (proto) {
        if (proto === prototype) {
            return true;
        }
        proto = proto.__proto__
    }
    return false;
}

var aa = [1];
//aa.__proto__ === Array.prototype true
//Array.prototype.__proto__ === Object.prototype true
//Object.prototype.__proto__ null
console.log(myInstanceOf(aa, Object))
```