---
title: javascript小数相乘
date: 2016-11-03 17:25:03
categories:
- 题
tags:
- 算法
- 题
---
题目描述
求 a 和 b 相乘的值，a 和 b 可能是小数，需要注意结果的精度问题

```javascript
function multiply(a, b) {
    return Math.round((a*b*100000))/100000;
}

```