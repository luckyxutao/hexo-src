---
title: 面试题-判断整数数组是否存在一个元素(其出现次数大于其它元素出现次数)
date: 2020-04-24 08:24:27
categories:
- 算法
tags:
- leetcode
- 数组
- 题
---

### 说明
一个整数数组，判断该数组是否存在一个元素出现的次数大于其它元素所出现的次数
<!-- more -->
* [1，2，3，3]，
true ,重复次数最多的3(2次),且只有3是2次
* [1,2,2,3,3]
false，重复次数最多的是2和3，两者都是2次，因此是false

### 思路
1. 遍历数组将每个数字的次数存到map里，同时得到最大出现次数maxCount
2. 遍历map，如果map里value值两次与maxCount相等则返回false
3. 遍历结束return true;

### 实现
```js
function isExistNum(arr){
    let map = new Map();
    let maxCount = 0;
    //边统计次数，边求最出现次数最多次数
    for(let i = 0; i<arr.length;i++){
        let cur = arr[i];
        if(!map.has(cur)){
            map.set(cur,1);
        } else {
            map.set(cur,map.get(cur)+1);
        }
        maxCount = Math.max(maxCount,map.get(cur))
    }
    /*
        1. 首先找到最大次数的
        2. 看看是否重复,迭代map，如果值为maxCount的key出现了2次则说明不存在
    */
    let i = 0;
    for([key,count] of map){
        //如果
        if(maxCount === count){
            if(i==1){
                return false;
            }
            i++;
        }
    }
    return true;
}
```