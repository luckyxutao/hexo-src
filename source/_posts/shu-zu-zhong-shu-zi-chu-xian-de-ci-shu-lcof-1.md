---
title: 面试题56 - I. 数组中数字出现的次数
date: 2020-04-27 17:30:19
categories:
- 算法
tags:
- leetcode
- 位运算
- 哈希表
- 题
---
### [说明](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/)
一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。
<!-- more -->
### 思路
1. 全员异或得到 x = a^b
2. x的二进制xi为1(表示第i位a和b不相等)，以此来分成两组，一组该位值为1，另一组该位值为0
3. 分别在每组全员^(异或)

### 实现

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
    let res = [];//结果a,b
    /*
        1. 全员异或得到 x =  a^b
        2. x的二进制xi为1(表示第i位a和b不相等)，以此来分成两组，一组该位值为1，另一组该位值为0
        3. 分别在每组全员^(异或)
    */
    // 一、全员异或得到x
    let x = 0;
    for(let i = 0;i<nums.length;i++){
        x = x ^ nums[i];
    }
    //二、从最左找到Xi的不同位(值为1的，0是相同)
    let mask = 1;
    //等于0的话，一直将mask左移1位，直到遇到不同的
    /*
       1010 = 5  x
       0010 = 2 mask
       以第2位是1还是不是1 分为两组
    */
    let i = 0;
    while((x & mask) == 0 && i<32){
        mask<<=1;//向左移，让mask和左位是1的x对齐
        i++;
    }

    //以第2位是1还是不是1 分为两组
    // mask  000000010
    let a = 0, b = 0;
    for(let i = 0;i<nums.length;i++){
        //说明第2位是0，作为一组
        if((nums[i] & mask) === 0){
            a = a ^ nums[i];
        } else {//说明第2位是1，另一组
            b = b ^ nums[i]
        }
    }
    return [a,b];
};

```

