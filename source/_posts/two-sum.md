---
title: 两数之和问题
date: 2020-06-03 07:46:56
categories:
- 算法
tags:
- leetcode
- 哈希表
---

### [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)
* 说明
```
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
```
<!-- more -->
* 思路
由于未明显说明是一个有序数组，因此我们可借助一个map来记录每个digit的索引，一旦找到和为sum则返回

* 实现
```js
//对无序数组，可以使用map来记录索引
var twoSum2 = function(nums, target) {
    if(!nums||!nums.length){
        return [];
    }
    let res = [];
    let map = new Map();
    for(let i = 0;i<nums.length;i++){
        let digit = nums[i];
        if(map.has(target-digit)){
            return [nums[map.get(target-digit)],nums[i]];
        }
        map.set(digit,i);
    }
    return [];
};
// 作者：luckyxutao
// 链接：https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/solution/mian-shi-ti-57-he-wei-sde-liang-ge-shu-zi-by-lucky/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

```

### [面试题57. 和为s的两个数字](https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/)
* 说明
```
输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。
如果有多对数字的和等于s，则输出任意一对即可。
```

* 思路
数组是一个有序的数组，则优先考虑`左右双指针`思想
* 实现
```js
var twoSum = function(nums, target) {
    if(!nums||!nums.length){
        return [];
    }
    let res = [];
    //左右指针，因为是有序的
    let lo = 0, hi = nums.length-1;
    while(lo<hi){
        let sum = nums[lo] + nums[hi];
        //减右边,因为小的已经是最小了，不能再小了，大的左移可以
        if(sum >target){
            hi = hi-1;
        } else if( sum < target){//右边已经最最大了，只能左边向右移
            lo = lo+1;
        } else if( sum === target){
            return [nums[lo],nums[hi]];
        }
    }
    return []
};

```
