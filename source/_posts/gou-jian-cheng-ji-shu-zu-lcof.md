---
title: 构建乘积数组
date: 2020-01-06 08:44:07
categories:
- 算法
tags:
- leetcode
- 栈
- 题
---

### [说明](https://leetcode-cn.com/problems/gou-jian-cheng-ji-shu-zu-lcof/)
给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，其中 B 中的元素 B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]。不能使用除法。
```
输入: [1,2,3,4,5]
输出: [120,60,40,30,24]
```
<!-- more -->
### 题解
[解析](https://leetcode-cn.com/problems/gou-jian-cheng-ji-shu-zu-lcof/solution/java-pythonchao-xiang-xi-jie-ti-by-yang_hang/)、[解析2](https://leetcode-cn.com/problems/gou-jian-cheng-ji-shu-zu-lcof/solution/shuang-xun-huan-gou-jian-cheng-ji-shu-zu-by-luckyx/)
### 算法
B[i] = [1..A[i-1]*A[i+1]...n]，A乘积(不包含A[i])
![](https://pic.leetcode-cn.com/825a287e48a91afd584ecab3601661b3152591403cdff05da31c4dcd8805fee9.png)
* 我们可以把[1...x...n]数组以x为分割点，分成左、右两个数组left[1...x-1]和right[x+1...n]
* 分别求left乘积和right乘积
* result[i] = left乘积*right乘积
* left乘积从左往右，right从右往左（简单)
    `rigth从左往右的话需要先算出总乘积，再依次除1.2.3.4等，这里不能用除法`
```
/**
    * 当前元素左边积的数组(对应每个元素)
    *  说明:第一个元素左边是1，第2个元素左边也是1，第三个元素3左边是（1*2）=2，没有左/右元素时以1代替
    * leftArr积[1,1,2,6,24]
    * rightArr积[120,60,20,5,1]
    * res[i] = leftArr[i]*rightArr[i]
    */
```

### 实现

```javascript
/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function(a) {
    /**
     * 1. 求leftSum
     * 2. 求rightSum，顺便计算结果
     */
    let leftSum = [];
    let leftTemp = 1;
    //得到leftSum
    for(let i = 0;i<a.length;i++){
        leftTemp = leftTemp * (i === 0 ? 1 :a[i-1]);
        leftSum.push(leftTemp);
    }
    //计算rightSum，每个数右边的乘积和
    let j = a.length - 1;
    let res = [];
    let rightTemp = 1;
    while(j>=0){
        rightTemp = rightTemp * (j===a.length-1 ? 1 :a[j+1]);
        //res = rightSum[j] => rightTemp  * leftSum[j]
        res[j] = rightTemp * leftSum[j];
        j--;
    }
    return res;
};
```