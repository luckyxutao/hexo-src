---
title: 674. 最长连续递增序列
date: 2020-06-12 22:22:54
categories:
- 算法
tags:
- leetcode
---

### [说明](https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/)
给定一个未经排序的整数数组，找到最长且连续的的递增序列，并返回该序列的长度。
```
输入: [1,3,5,4,7]
输出: 3
解释: 最长连续递增序列是 [1,3,5], 长度为3。
尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为5和7在原数组里被4隔开。 

```
<!-- more -->

### [思路](https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/solution/674-zui-chang-lian-xu-di-zeng-xu-lie-hua-dong-chua/)
* `连续`子序列问题通常首先会想到滑动窗口
* 如果num.length>0，最小长度为1
* lo=0,hi=0;
* 如果nums[hi]<=nums[hi-1]则lo = hi
* 比较hi和lo差值，计算长度

### 实现
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
    if(!nums||!nums.length){
        return 0
    }

    let lo = 0, hi = 0;
    //至少是1
    let maxRes = 1;
    while(hi<nums.length-1){
        //窗口右移
        hi++;
        if(hi===nums.length){
            break;
        }
        //调整窗口
        if(nums[hi]<=nums[hi-1]){
            lo = hi;
        }
        maxRes = Math.max(maxRes,hi-lo+1);
    }
    return maxRes;
};


```
