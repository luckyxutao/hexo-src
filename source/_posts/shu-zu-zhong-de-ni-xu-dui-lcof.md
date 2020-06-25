---
title: 数组中的逆序对
date: 2020-03-14 18:06:48
categories:
- 算法
tags:
- leetcode
---

### [说明](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)
在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。
<!-- more -->

```
输入: [7,5,6,4]
输出: 5
```

### 算法
* 利用[`归并排序`](/2020/03/20/mergeSort/)思想实现
在`治`阶段（合并两个有序数组）时统计逆序对数量
[解析-知乎](https://zhuanlan.zhihu.com/p/66115731)
[题解1-官方](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/shu-zu-zhong-de-ni-xu-dui-by-leetcode-solution/)、[理解2-my](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/gui-bing-pai-xu-si-xiang-shi-xian-tong-ji-ni-xu-du/)

### 归并排序分治法
在合并的过程中统计逆序对
* 升序/降序逻辑都可以
* 相同元素不是逆序对`大于才是`
* 升序
    从最小开始比较，谁的第一个元素最小就谁就是基准（不是绝对的left或right)，`如果遇到相同元素，则要先去掉非基准数组相同元素`
  以`右`边数组为基准，但是对于`重复`元素，应该消掉`左`边数组的元素
* 降序
  以`左`边数组为基准，但是对于`重复`元素，应该消掉`右`边数组元素
  如：[3，2，1]，[3，1]
![](https://s1.ax1x.com/2020/05/07/Ye7sSO.jpg)
* 降序逻辑实现
    从最大开始比较，谁的第一个元素最大就谁就是基准（不是绝对的left或right)，`如果遇到相同元素，则要先去掉非基准数组相同元素`
```javascript
var reversePairs = function (num) {
    const sumObj = {count:0};
    const newArr = helper(num, 0, num.length - 1,sumObj);
    return sumObj.count;
};

function helper(num, lo, hi,sumObj) {
    if (lo >= hi) {
        return [num[lo]]
    }
    let mid = lo + Math.floor((hi - lo) / 2);
    let leftSorted = helper(num, lo, mid,sumObj);
    let rightSorted = helper(num, mid + 1, hi,sumObj);
    return merge(leftSorted, rightSorted,sumObj);
}
//[1,8],[2,9]
function merge(aNum, bNum,sumObj) {
    let res = [];
    while (aNum.length && bNum.length) {
        //这里决定了用哪个（比较的是第一个元素）
        //
        if(aNum[0] > bNum[0]){
            sumObj.count = sumObj.count + bNum.length;
            res.push(aNum.shift());
        //等于的不算逆对，只有大于的才算
        } else if(aNum[0] === bNum[0]){
            res.push(bNum.shift());
        } else {
            res.push(bNum.shift());
        }
    }
    return aNum.length > 0 ? res.concat(aNum) : res.concat(bNum);
}

```
* 升序逻辑实现
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (num) {
    const sumObj = {count:0};
    const newArr = helper(num, 0, num.length - 1,sumObj);
    return sumObj.count;
};

function helper(num, lo, hi,sumObj) {
    if (lo >= hi) {
        return [num[lo]]
    }
    let mid = lo + Math.floor((hi - lo) / 2);
    let leftSorted = helper(num, lo, mid,sumObj);
    let rightSorted = helper(num, mid + 1, hi,sumObj);
    return merge(leftSorted, rightSorted,sumObj);
}
//[1,8],[2,9]
function merge(aNum, bNum,sumObj) {
    let res = [];
    while (aNum.length && bNum.length) {
        //left小
        if (aNum[0] < bNum[0]) {
            res.push(aNum.shift());
        } else if(aNum[0] === bNum[0]){
            res.push(aNum.shift());
        } else {//right小
            //因为是升序
            sumObj.count = sumObj.count + aNum.length;
            res.push(bNum.shift());
        }
    }
    return aNum.length > 0 ? res.concat(aNum) : res.concat(bNum);
}
```

### 暴力法（超时)
```javascript
var reversePairs = function(nums) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] > nums[j] ) {
                count++;
            }
        }
    }
    return count;
};
```
