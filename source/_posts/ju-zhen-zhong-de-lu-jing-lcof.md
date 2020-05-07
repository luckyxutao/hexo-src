---
title: 机器人的运动范围
date: 2020-04-09 18:54:41
categories:
- 算法
tags:
- leetcode
- 回溯
- 题
---

### [说明](https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)
地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的`数位之和`大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
<!-- more -->
### 算法
利用二维矩阵路径搜索法，回溯+DFS实现，和[`单词搜索`](/2020/04/18/word-search/)类似

### 相似题目
[单词搜索](/2020/04/18/word-search/)

### 实现
```javascript
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function (m, n, k) {
    let res = [];
    let visited = new Set();
    dfsHelper(m, n, k, 0, 0, visited, res);
    return res.length;
};
/**
 * 00 01 02 03 04 05 06 07
 * 10 11 12 13 14 15 16 17
 * 20 21 22 23 24 25 26 27
 * 
 */
function dfsHelper(m, n, k, i, j, visited, res) {
    //m,n边界长度，i,j当前坐标,res结果
    //边界检查
    if (i >= m || i < 0 || j < 0 || j >= n) {
        return
    }
    //如果坐标和大于k则走不通
    if (twoSum(i,j) > k) {
        return;
    }
    //如果已经访问过了不算
    let coordStr = i + ',' + j;
    if (visited.has(coordStr)) {
        return;
    }
    visited.add(i + ',' + j);
    res.push([i, j]);
    dfsHelper(m, n, k, i, j + 1, visited, res);//向右
    dfsHelper(m, n, k, i + 1, j, visited, res);//向下
    dfsHelper(m, n, k, i, j - 1, visited, res);//左
    dfsHelper(m, n, k, i - 1, j, visited, res);//向上
}

function twoSum(a,b){
    let sum = 0;
    while(a){
        sum = sum + a % 10;
        a = Math.floor(a/10);
    }
    while(b){
        sum = sum + b % 10;
        b = Math.floor(b/10);
    }
    return sum;
}
```