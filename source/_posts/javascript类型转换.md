---
title: javascript类型转换
date: 2019-10-21 08:48:53
categories:
- 基础
tags:
- 基础
- 题
---

### 基本数据类型
共有String、Number、Boolean、null/undefined、Object、Symbol(es6新增)6种类型
```javascript
typeof undefined // "undefined"
typeof 0 // "number"
typeof true // "boolean"
typeof "foo" // "string"
typeof Symbol("id") // "symbol"
typeof Math // "object"  (1)
typeof null // "object"  (2)
typeof alert // "function"  (3)
```
<!-- more -->
### String类型转换
    当需要字符串形式的值时会发生转换，如：alert(value)

### Number转换
Numeric conversion happens in mathematical functions and expressions automatically.如:
```javascript
when division / is applied to non-numbers:
alert( "6" / "2" ); // 3, strings are converted to numbers
Number('123') //转为123
```
+ 规则
 `‘+’ 计算时一边是string，则会把另一边也转为string`

value|Becomes...
---|:---:
undefined|NaN
null|0
true/false| 1 and 0
string|Whitespaces from the start and end are removed. If the remaining string is empty, the result is 0. Otherwise, the number is “read” from the string. An error gives NaN.
### Boolean转换
+ 空字符串、0、null、undefined、NaN转换为false
+ 其它为true

### Object到基本类型转换
[ObjectTo基本类型](https://javascript.info/object-toprimitive)
+ 如果定义了Symbol.toPrimitive则按该方法转换
+ 如果没定义，且hint是string则, 按`obj.toString,obj.valueOf`顺序
+ 如果没定义，hint(`number或default`)，则`obj.valueOf,obj.toString`顺序