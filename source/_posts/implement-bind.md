---
title: implement-bind
date: 2018-12-17 16:52:54
categories:
- 基础
tags:
- implement
- 面试
---
bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

<!-- more -->

### 特点
* bind时可以绑定部分参数，执行函数会将新参数和之前的部分参数一块传入并执行
* 绑定函数也可以使用new运算符构造，提供的this值会被忽略，但前置参数仍会提供给模拟函数
* bind多次this仍然指向第一次的指向

### 简单版
大多数情况下够用了，性能更好，不支持通过 new来调用绑定的函数
```javascript
Function.prototype.myBind = function() {
    var thatFunc = this,
        thatArg = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
            throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
    	var funcArgs = args.concat(Array.prototype.slice.call(arguments));
      	return thatFunc.apply(thatArg, funcArgs);
    };
}

```
### 标准版


```javascript
Function.prototype.bind = function (otherThis) {
    var ArrayPrototypeSlice = Array.prototype.slice;
    var thatFunc = this;
    var baseArgs = ArrayPrototypeSlice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
            throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    var fBound = function () {
        var funcArgs = baseArgs.concat(ArrayPrototypeSlice.call(arguments));
        var ff = fNOP.prototype.isPrototypeOf(this);
        return thatFunc.apply(ff ? this : otherThis, funcArgs);
    };
    var fNOP = function(){};
    if(this.prototype){
        fNOP.prototype = this.prototype;
    }
    // 这种方式会导致bind后的函数修改prototype，同时也会影响被bind的prototype
    //  fBound.prototype = this.prototype;
    fBound.prototype = new fNOP;//这样绑定后函数的只是（被绑定对象）的一个实例，通过__proto__可以访问，但是无法影响
    return fBound;
}

```