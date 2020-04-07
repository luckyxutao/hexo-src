---
title: array-rotate
date: 2019-01-07 16:28:15
categories:
- 算法
tags:
- 基础
- leetcode
---

[`Rotate Array`](https://leetcode.com/problems/rotate-array/)给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

### 暴力办法(超时)
每次移一位
* 时间复杂度O(n*k)
* 空间复杂度O(1)
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    //暴力法，每次一个元素
    while (k > 0) {
        var last = nums[nums.length - 1];
        for (let i = nums.length - 1; i > 0; i--) {
            nums[i] = nums[i - 1];
        }
        nums[0] = last;
        k--;
    }
};

```
### 引入额外数组
