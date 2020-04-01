---
title: 整数相加求和
date: 2020-01-03 17:28:26
categories:
- 题
tags:
- 算法
- 题
---
函数处理大数据的相加问题，所谓的大数据是指超出了整型，长整型之类的常规数据类型表示范围的数据。实现语言不限

<!-- more -->

```javascript
// d1
// 求两个大数相加
/**
 * 
 * @param {*} n1 
 * @param {*} n2 
 * 1. 两个数左对齐，方便循环
 * 2. 按位数多的循环，按位数相加，位数少的补0，放入新数组
 * 3. 循环新数组，按10进位
 */
function bigNumber(n1, n2) {
    var arr1 = [...n1].reverse();
    var arr2 = [...n2].reverse();
    var results = [];
    var i = Math.max(arr1.length, arr2.length) - 1;
    var left, right;
    while (i > -1) {
        left = arr1[i] && parseInt(arr1[i], 10) || 0;
        right = arr2[i] && parseInt(arr2[i], 10) || 0;
        results.unshift(left + right);
        i--;
    }
    for (let i = 0; i < results.length - 1; i++) {
        var curr = results[i];
        if (curr > 9) {
            results[i + 1] = results[i + 1] + 1;
            results[i] = results[i] % 10;
        };
    }
    return results.reverse().join('')
}

var result = bigNumber('9999', '2')
console.log(result)
console.log(bigNumber('11','222222'))
console.log(9999 + 2)
```