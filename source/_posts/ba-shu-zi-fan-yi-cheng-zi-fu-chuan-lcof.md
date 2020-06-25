---
title: 面试题46. 把数字翻译成字符串
date: 2020-04-24 20:34:33
categories:
- 算法
tags:
- leetcode
- 栈
---

### [说明](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)
给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。

<!-- more -->

### 算法
[参考解析](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/solution/dong-tai-gui-hua-dp-by-z1m/)
数学求余(10和100)，得到最后一位和两位
* 时间复杂度 
都是O(n)

### 实现
动态规划和递归思路是相同的，只是实现方式一个自顶向下，一个自下向上
* 动态规划
```javascript

var translateNum = function(num) {
    if(num<10){
        return 1;
    }
    let str = num+'';
    let dp = [1,1];
    for(let i = 1;i<str.length;i++){
        let dual = str.slice(i-1,i+1);
        if(dual >= 10 && dual <=25){
            dp[i+1] = dp[i] + dp[i-1];
        } else {
            dp[i+1] = dp[i]
        }
    }
    return dp[dp.length-1]
}

```
* 递归
```javascript
/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function(num) {
    if(num<10){
        return 1;
    }
    let c = num % 100;//两位
    if(c >=10 && c<=25){
        return translateNum(Math.floor(num/10)) + translateNum(Math.floor(num/100))
    } else {//只有一种解法
        return translateNum(Math.floor(num/10))
    }
};

```