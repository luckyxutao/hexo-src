---
title: 33. 搜索旋转排序数组
date: 2020-06-19 18:35:17
categories:
- 算法
tags:
- leetcode
---

### [说明](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)
假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 O(log n) 级别。

<!-- more -->

### 思路
* 二分搜索思想
* 如果nums[lo]<=nums[mid]，说明lo-mid是有序的(特别注意小于`等于`)
* 本题适合采用左闭右闭区间管理lo和hi([]),因为比较过程中用到了num[hi]
* 判断target是否在left(lo-mid)/right(mid,hi)

### 实现
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if(!nums||!nums.length){
        return -1;
    }
    let lo = 0, hi = nums.length-1;
    //左闭，右开
    while(lo<=hi){
        let mid = lo + Math.floor((hi-lo)/2);
        if(nums[mid] === target){
            return mid;
        } else if(nums[lo]<=nums[mid]){//左边有序
            if(nums[lo] <= target && target <= nums[mid]){
                hi = mid-1;
            } else{
                lo = mid+1;
            }
        } else {
            if(nums[mid] <= target && target <= nums[hi]){
                lo = mid+1;
            } else{
                hi = mid-1;
            }
        }
    }
    return nums[hi] === target ? hi : -1;
};

```