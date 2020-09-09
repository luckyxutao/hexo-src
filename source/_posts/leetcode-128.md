---
title: 128. 最长连续序列
date: 2020-09-09 09:42:54
categories:
- 算法
tags:
- leetcode
---

### [说明](https://leetcode-cn.com/problems/longest-consecutive-sequence/)
给定一个未排序的整数数组，找出最长连续序列的长度。
要求算法的时间复杂度为 O(n)。
示例:
```
输入: [100, 4, 200, 1, 3, 2]
输出: 4
解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。

```
<!-- more -->

### [思路](https://leetcode-cn.com/problems/longest-consecutive-sequence/solution/128-zui-chang-lian-xu-xu-lie-by-luckyxutao/)
1. 遍历nums,放入set里
2. 遍历set,判断当前数是否是最小值(是否存在小于nu-1)
3. 如果当前数是最小的，从当前数num开始循环判断是否存在num+1等

### 实现
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    let numSet = new Set();
    let continuesAns = 0;
    for(let k of nums){
        numSet.add(k);
    }
    for(let num of numSet){
        //如果false,说明当前数不是最小的，跳过
        if(!numSet.has(num-1)){
            let n = num;
            let tmp = 1;
            while(numSet.has(n+1)){
                n++;
                tmp++;
            }
            continuesAns = Math.max(continuesAns,tmp);
        }
    }
    return continuesAns;
};
```
