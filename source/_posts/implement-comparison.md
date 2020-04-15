---
title: 你真的了解浅比较吗？
date: 2018-10-07 21:33:23
categories:
- 基础
tags:
- implement
- 面试
- 题
---

### 结论
当对比的类型为Object的时候并且key的长度相等的时候，浅比较也仅仅是用Object.is()对Object的value做了一个`基本数据类型的比较`，所以如果key里面是对象的话，有可能出现`比较不符合预期`的情况，所以`浅比较是不适用于嵌套类型的比较`的。

<!-- more -->

### 深浅差异
```javascript
var ff = {
    c: 3,
    r:{
        u:1
    }
}
var a = {
    s: 1,
    ff: {
        c: 3,
        r:{
            u:1
        }
    }
};
var b = {
    s: 1,
    ff
}
console.log(deepEqual(a, b)); // true
console.log(shallowEqual(a,b)) // false
```
### shallowEqual
* 简单粗暴，只比较最外层
* 比较都是绝对相等，对象及函数等引用类型需要完全相等
* Object.keys不包含原型链上的属性
* 嵌套类型可能会出现误判断
    * 相比deepEqual范围小，某些情况下deepEqual是true而shallowEqual是false

```javascript
/*
import { shallowEqualArrays } from "shallow-equal";
 
shallowEqualArrays([1, 2, 3], [1, 2, 3]); // => true
shallowEqualArrays([{ a: 5 }], [{ a: 5 }]); // => false
import { shallowEqualObjects } from "shallow-equal";
 
shallowEqualObjects({ a: 5, b: "abc" }, { a: 5, b: "abc" }); // => true
shallowEqualObjects({ a: 5, b: {} }, { a: 5, b: {} }); // => false
*/
/**
 *  1. 只比较一层
 *  2. 比较都是绝对相等
 *  3. 对象及函数等引用类型需要完全相等
 *
 */
function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }
    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null
    ) {//objA或objB是基本类型
        return false;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (let i = 0; i < keysA.length; i++) {
        if (!objB.hasOwnProperty(keysA[i]) || !(objA[keysA[i]] === objB[keysA[i]])) {
            return false;
        }
    }
    return true;
}

```

### deepEqual
递归比较每个属性，相对来说更耗时
```javascript
function deepEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }
    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null
    ) {//objA或objB是基本类型
        return false;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (let i = 0; i < keysA.length; i++) {
        if (!objB.hasOwnProperty(keysA[i]) || !(deepEqual(objA[keysA[i]], objB[keysA[i]]))) {
            return false;
        }
    }
    return true;
}
```