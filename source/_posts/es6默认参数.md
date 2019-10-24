---
title: es6默认参数
date: 2019-10-24 22:20:34
categories:
- 前端
tags:
- es6
- 基础
- 前端
---
### 基本用法——很简单不在赘述
```javascript
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
```
### 作用域
一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
 <!-- more -->
 ![](/assets/blogImg/fun_defaultParamVal.png)
### 实例练习
```javascript
var x = 1;//outer作用域
function foo(x, y = function() { x = 2; }) {//圆括号内作用域(中间)
  var x = 3;
  y();//x=2只更改了括号作用域里的x，没改内部作用域x
  console.log(x); // 3 访问的是内部x，不是括号里的x
}

foo() 
console.log(x); 
// 3 1
//#####另一种情况#############
var x = 1;//outer作用域
function foo(x, y = function() { x = 2; }) {//圆括号内作用域(中间)
  x = 3; //内部没有，访问括号里的x
  y();//x=2只更改了括号作用域里的x，没改内部作用域x
  console.log(x); //  访问的是是括号里的x
}

foo() 
console.log(x); 
// 2 1
```