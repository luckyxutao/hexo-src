---
title: 把数组排成最小的数
date: 2020-04-08 11:32:41
categories:
- 算法
tags:
- leetcode
- 栈
- 题
---

### [说明](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/)
输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。


<!-- more -->

### 算法
此题求拼接起来的 “最小数字” ，本质上是一个排序问题，只不过比较的是连续后的字符串值。
* [解析1](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/solution/mian-shi-ti-45-ba-shu-zu-pai-cheng-zui-xiao-de-s-4/)、[解析2](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/solution/kuai-su-pai-xu-shi-xian-ba-shu-zu-pai-cheng-zui-xi/)

### 快排实现
```javascript

/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
    quickSort(nums,0,nums.length-1);
    return nums.join('')
};

function quickSort(nums,lo,hi){
    if(lo>hi){
        return;
    }
    let i = partition(nums,lo,hi);
    quickSort(nums,lo,i-1);
    quickSort(nums,i+1,hi);
}
//如果a>b则返回true,否则false;
//比较的是连接字符串的值，不是number值
function compare(a,b){
    let x1 = a + '' + b;
    let x2 = b + '' + a;
    //比较的是字符串的是 '301' '103'
    if(parseInt(x1,10) > parseInt(x2,10)){
        return true;
    }
    return false;
}

function partition(nums,lo,hi){
    let i = lo+1, j = hi;
    let pivot = nums[lo];
    while(i<=j){
        while(i<=j && !(compare(nums[i],pivot))){
            i++;
        }

        while(i<=j && compare(nums[j],pivot)){
            j--;
        }

        if(i<=j){
            let temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
            i++;
            j--;
        }
    }
    //把第一个元素和j交换(i已经大于j了)
    nums[lo] = nums[j];
    nums[j] = pivot;
    return j;
}
```