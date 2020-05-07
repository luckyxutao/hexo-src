---
title: 归并排序
date: 2020-03-20 17:49:59
categories:
- 算法
tags:
- leetcode
- 排序
- 题
---

### 基本思想
归并排序（MERGE-SORT）是利用归并的思想实现的排序方法，该算法采用经典的分治（divide-and-conquer）策略（分治法将问题分(divide)成一些小的问题然后递归求解，而治(conquer)的阶段则将分的阶段得到的各答案"修补"在一起，即分而治之)。
<!-- more -->
![](https://s1.ax1x.com/2020/05/07/YeWn1A.png)
[不错的文章](https://www.cnblogs.com/chengxiao/p/6194356.html)
### 相关题目
* [数组中的逆序对](/2020/03/14/shu-zu-zhong-de-ni-xu-dui-lcof/)

### 实现

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(num) {
    return helper(num, 0, num.length - 1);
};

function helper(num, lo, hi) {
    //如果lo>=hi，说明到叶子节点了
    if (lo >= hi) {
        return [num[lo]]
    }
    let mid = lo + Math.floor((hi - lo) / 2);
    let leftSorted = helper(num, lo, mid);
    let rightSorted = helper(num, mid + 1, hi);
    return merge(leftSorted,rightSorted);
}
//[1,8],[2,9]
//合并两个有序数组
function merge(aNum, bNum) {
    let res = [];
    while (aNum.length && bNum.length) {
        if(aNum[0]<=bNum[0]){
            res.push(aNum.shift());
        } else {
            res.push(bNum.shift());
        }
    }
    return aNum.length > 0 ? res.concat(aNum) : res.concat(bNum);
}

```