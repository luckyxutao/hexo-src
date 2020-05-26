---
title: 面试题56 - II. 数组中数字出现的次数 II(哈希表/位运算）
date: 2020-04-29 17:10:46
categories:
- 算法
tags:
- leetcode
- 位运算
- 哈希表
- 题
---

### [说明](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/)
在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。
<!-- more -->
### [`题解`](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/solution/mian-shi-ti-56-ii-shu-zu-zhong-shu-zi-chu-xian-d-8/)
* 复杂度
    - 时间O(n),空间O(1)
    因为32是常数，并不会随着nums增大而增大
* 统计数组里每个元素 二进制位 1的个数，如果是3的倍数，则最终结果该为是0，否则是1
```javascript
var singleNumber = function(nums) {
    /*
    1. 计算每二进制位
    */
    let res = 0;
    let mask = 1;
    let lastNum = 0;
    for(let i = 0;i<32;i++){
        let cnt = 0;
        for(let j = 0;j<nums.length;j++){
            let cur = nums[j];
            if((cur & mask)!==0){
                cnt++;
            }
        }
        //目标数字i位是0
        if(cnt %3 == 0){
            // middd<<=1;
            // res = res + middd;
        } else {//i位是1
            lastNum = lastNum + mask;
        }
        //左移1位
        mask<<=1;
    }
    return lastNum;
};
```

### 哈希map实现
* 复杂度
    - 时间O(n),空间O(n)
* 遍历数组nums，将每个数出现的次数存到map里
* 遍历map，如果map.get(nums[i])为1，则return

```javascript
var singleNumber2 = function(nums) {
    let map = new Map();
    for(let i = 0; i< nums.length;i++){
        let char = nums[i];
        if(map.has(char)){
            map.set(char,map.get(char)+1);
        } else {
            map.set(char,1);
        }
    }
    for([key,value] of map){
        if(value === 1){
            return key;
        }
    }
};
```