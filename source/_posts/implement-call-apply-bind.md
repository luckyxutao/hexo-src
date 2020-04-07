---
title: 手写实现call/apply/bind
date: 2019-06-07 17:22:34
categories:
- 基础
tags:
- implement
- 面试
- 题
---

### call
```javascript
Function.prototype.call = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('not a callable')
    }
    const { fn } = context;
    context.fn = this;
    const result = context.fn(...args)
    context.fn = fn;
    return result;
}
```
### apply
```javascript
Function.prototype.apply = function (context, args) {
    if (typeof this !== 'function') {
        throw new TypeError('not a callable')
    }
    const { fn } = context;
    context.fn = this;
    const result = context.fn(...args)
    context.fn = fn;
    return result;
}
```
### bind

* bind时可以绑定部分参数，执行函数会将新参数和之前的部分参数一块传入并执行
* 绑定函数也可以使用new运算符构造，提供的this值会被忽略，但前置参数仍会提供给模拟函数
* bind多次this仍然指向第一次的指向

```javascript
Function.prototype.bind = function (otherThis, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('no a callable object');
    }

    var fNOP = function () { };
    var func = this;
    var fBound = function (...myargs) {
        var fromNew = fNOP.prototype.isPrototypeOf(this);
        return func.apply(fromNew ? this : otherThis, args.concat(myargs));
    }
    if (this.prototype) {
        fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP;
    return fBound;
}
```