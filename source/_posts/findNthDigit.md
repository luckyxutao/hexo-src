---
title: 数字序列中某一位的数字
date: 2020-02-01 12:57:16
categories:
- 算法
tags:
- leetcode
- 栈
- 题
---

### [说明](https://leetcode-cn.com/problems/nth-digit/)
在无限的整数序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...中找到第 n 个数字。
`第11个数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是0，它是10的一部分。`
<!-- more -->
### 题解
[解析](https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/solution/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-javascrip/)、[解析2](https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/solution/mian-shi-ti-44-shu-zi-xu-lie-zhong-mou-yi-wei-de-6/)
### 算法
1. 找到targetNum的位数(不是n的位数)
2. 找到targetNum数字
3. 确认n在targetNum中的位置

### 步骤
以n=365为例，详细[`规律`](https://leetcode-cn.com/problems/nth-digit/solution/xiang-jie-zhao-gui-lu-by-z1m/)
* 找targetNum位数，顺带计算targetNum所在`位数最小值之前的位数和`
    以365targetNum是3为例，3位的最小值是100，并且能得到(1-99)的位数和是9+180=189
* tagetNum的位数是`3`
* 计算targetNum
    * 先得到100之后所需要位数 = (365-100之前的位数) = 365 - 189 = 176
    * targetNum = 最小位数最小值（100-1） + Math.ceil(176/3) = 158
    `为什么最小值要减1，因为100本身也算数，因此需要从99开始加`
    ```javascript
    /**除法做了向上取整， 以99=>100为例（不必在意思数组具体数字个数和含义)
    99 + [1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15],[16,17,18]
    找第2位， Math.ceil(2/3) = 1 =>2 % 3 = 2
       表示99 + 1 = 100, 索引 = [2-1]
    找第9位， Math.ceil(9/3) = 3 =>3 %3 = 0
        表示99+3=102,索引=[102最后一位] 
    找第8位，Math.ceil(8/3) = 2.666=>3  8 % 3 = 2
        表示99+3=102 索引=[2-1]
    找第7位，Math.ceil(7/3) = 2.33=>3 7%3 = 1
    */
    ```
* 确定n位在targetNum的索引
    * 176 % 3
    如果是0则是该数字的最后一位，否则余数就是n在targetNum中的索引


### 实现

```javascript
var findNthDigit = function (n = 365) {
    //如果 n 小于 10 ，直接返回就可以了
    if (n < 10) {
        return n;
    }
    //1. 计算第365位所在的target有几位数(不是365的位数)
    let digtis = 0;
    let sum = 0;
    let nextStep;//为了循环完成后后退一次，拿到小于n时位数和
    let baseNum = 0;
    while (sum <= n) {
        // 9*1 + 90*2 + 900 * 3
        nextStep = Math.pow(10,digtis)*9*(digtis+1);
        sum = sum + nextStep;
        //0,10,100,1000,10000
        baseNum = Math.pow(10,digtis);;
        digtis++;
    }
    // 循环条件结束后，是多加了一次(我们需要前一次的和)
    sum = sum - nextStep;

    //减去最小值（100）之前的位数，从最小值（100）开始
    let rest = n - sum;
    baseNum -= 1; //100也算在内，所以需要减1
    //2. 计算targetNum数字
    let targetNum = baseNum + Math.ceil(rest / digtis);
    //3.通过余数得知在targetNum第几位
    let mod = rest % digtis;
    // //如果idx为0，则是该group最后一个数字，否则mod-1就是位置
    // /** 100
    //  * [1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15],[16,17,18]
    //  * 9/3 = 3 =>3 %3 = 0
    //  * 8/3 = 2.666=>3  8 % 3 = 2
    //  * 7/3 = 2.33=>3 7%3 = 1
    // */
    targetNum = targetNum + ''
    if (mod === 0) {
        return targetNum[targetNum.length - 1]
    } else {
        return targetNum[mod - 1]
    }
};

```