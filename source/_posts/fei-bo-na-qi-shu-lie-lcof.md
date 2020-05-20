---
title: 面试题10- I. 斐波那契数列(3种复杂度)
date: 2020-04-20 18:21:05
categories:
- 算法
tags:
- leetcode
- 递归
- 动态规划
- 题
---

### leetcode链接

[解析](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/solution/mian-shi-ti-10-i-fei-bo-na-qi-shu-lie-3chong-fu-za/)
<!-- more -->

### 结果

| 方式  | 耗时  | 时间复杂度  | 空间复杂度|
|---|---|---| ---|
| 直接递归  | 7997  | O(n^2) | O(1)|
| 备忘录  | 0  |O(n) | O(n)|
| 动态规划  | 0  |O(n) | O(1)|


### 最优解
```javascript
var fib = function(n) {
    //0,1,2,3,5,8,13
    if(n<2){
        return n;
    }
    let prev0 = 0;
    let prev1 = 1;
    let res = 0;
    for(let i = 2;i<=n;i++){
        res = (prev0 + prev1) %(1e9+7);
        prev0 = prev1;
        prev1 = res;
    }
    return res;
};
```

### 次优
```javascript
let memoize = new Map();
var fib = function(n) {
    if(memoize.has(n)){
        return memoize.get(n);
    }
    if(n<2){
        return n;
    }
    let re = fib(n-1) + fib(n-2);;
    memoize.set(n,re);
    return re;
};
```

### 最差
```javascript
var fib = function(n) {
    if(n<2){
        return n;
    }
    return fib(n-1)+fib(n-2);
}
```