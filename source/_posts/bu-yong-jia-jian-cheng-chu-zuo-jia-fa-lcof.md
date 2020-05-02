---
title: 不用加减乘除做加法
date: 2020-04-01 10:53:27
categories:
- leetcode
tags:
- 算法
- 位运算
- 题
---

### [说明](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)
写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。
```javascript
输入: a = 1, b = 1
输出: 2
```
<!-- more -->
### 思路
[`位操作基础`](/2020/03/23/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/#more)
* s = a ^ b(求和`不考虑进`)
    * 异或(XOR)可以用来模拟加法(`不考虑进位`)
    * `0+0=0^0->0, 1+0=1^0->1,0+1=0^1->1`，只有1+1=1^1(进位)->0`未满足`
* n = (a & b) << 1(找进位)
    * `按位与`(a(i)和b(i)位`都为1`则是1)
    * 这个特性可以用来得到进位操作(a(i)位和b(i)位都是1)
    * 二进制`进位`是通过`左移操作`来完成的，左移(左移1位表示进1位)，如果是0左移后仍然会是0不影响
* 求和
    * 重复前两步，直到`无进位（n=0)`了，s就等于a+b的和
* 只是用了公式计算一遍后，仍然可能有进位，则需要循环，直到无进位了，求和

### 题解
[leetcode](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/solution/wei-cao-zuo-chu-li-bu-yong-yun-suan-fu-qiu-he-by-l/)
```javascript
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function(a=19, b=7) {
    /*
    1. 先求一次不考虑进位的加法
       00->0 01->1 10->1, 11->0(进位，没处理)
    */
    let carry = a ^ b;
    /*
    2. 计算进位
       两位均是1的过滤出来，11表示进位
       如果temp为0，表示没有进位，其实是可以直接相加的，不过是0的话再左移也没有影响
    */
    let temp = (a & b)<<1;
    /*
    3.如果temp为0表示没有进位，比如：42+21，则直接相加返回
       101010 = 42
       010101 = 21
       000000 = 0，说明没有进位
    */
    if(temp === 0){
        //直接使用无进位加法求和的结果
        return carry;
    }
    let init;
    /*
      temp不为0表示有进位（可能不止一个1）
     （19+7）=> carry=20, temp = 6 相加（按同样的思路，直到没有进位了再求和 ）
      19 + 7 => 20 + 6 => 18 + 8 => 26 + 0
    */
    while(temp){
        //变成了carry和temp的相加了(carry ^ temp);
        // carry=20,temp=6求和
        init = carry ^ temp; //这里先不修改carry的值，下一步算进位还要用到
        //变成新的进位
        temp = (carry & temp)<<1; //20+6，18+8进位(temp)仍然不是0(按之前思路有进位，不能直接相加)
        //变成新值，用新数继续求和
        carry = init;
    }
    /*
        最后求和（carray已经是temp为0时的求和结果）
        temp已经是0，因此carry就是最终结果
    */
    return carry; //carray ^ temp 
};

add(19,7)
```



