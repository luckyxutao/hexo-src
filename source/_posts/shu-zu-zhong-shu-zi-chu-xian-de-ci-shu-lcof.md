---
title: 位操作基础
date: 2020-03-23 13:32:54
categories:
- leetcode
tags:
- 算法
- 位运算
- 题
---

### 位操作基础
[`异或操作基础`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR)
<!-- more -->
* 如果我们对 0 和二进制位做 XOR 运算，得到的仍然是这个二进制位
a ⊕ 0 = a

* 如果我们对相同的二进制位做 XOR 运算，返回的结果是 0
a ⊕ a = 0

* XOR 满足交换律和结合律
a ⊕ b ⊕ a = (a ⊕ a) ⊕ b = 0 ⊕ b = b

### 异或运算符优先级
* 位操作符是`低于`比较运算符(===)的，因此(a &b ) === c

### 左移

```javascript
let h = 1; //000001->1
h<<=1;     //000010->2
h<<=1;     //000100->4
```

### 两个number某个二进位是否相等
直接与001,010,100,1000,10000...进行[`按位与`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND)操作即可，因为其它位全是0，只看1所在位

* 以比较第1位为例
2和5的二进制第1位是相同的，2和4的第一位不相同
```javascript
  1(001)
  2 & 1 = 1
  010->2
  001->1
  
  
  5 & 1 = 1
  101->5
  001->1

  4 & 1 = 0
  100->4
  001->1
```

### 找到Number二进制不为0的最低位
结果是100
```javascript
var num = 6; //110
var x = 1;//001
//  100才符合
while((x & num) === 0){
    //左移，001->010->100->1000...
    x<<=1;
}
```

### [只出现一次的数字](https://leetcode-cn.com/problems/single-number/)
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
解: 参考上边的`交换律`，所以我们只需要将所有的数进行 XOR 操作，得到那个唯一的数字。
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let a = 0;
    for(let i = 0; i<nums.length;i++){
        a = a^nums[i];
    }
    return a;
};
```
### [不用加减乘除做加法](/2020/04/01/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)

### [数组中数字出现的次数](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/)
一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。
[`官方题解`](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/solution/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-by-leetcode/)
```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 * 目标是找到a,b
 */
var singleNumbers = function(nums) {
    let x;
    for(let i=0;i<nums.length;i++){
        x^=nums[i];
    }
    //找到 x = a ^ b
    let div = 1; //001
    while((x & div) === 0){//直到找到不是0的位
        div<<=1; //左移1位 001->010->100
    }

    let a = 0, b = 0;
    for(let i=0;i<nums.length;i++){
        //说明位不同，每个数和div 按位与，等于0表示
        if((nums[i] & div) === 0){
            a ^= nums[i];
        } else {
            b ^= nums[i];
        }
    }
    return [a,b];

};
```
