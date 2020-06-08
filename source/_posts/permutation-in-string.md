---
title: 567. 字符串的排列
date: 2020-06-06 22:00:50
categories:
- 算法
tags:
- leetcode
- 滑动窗口
- 题
---
### [说明](https://leetcode-cn.com/problems/permutation-in-string/solution/567-zi-fu-chuan-de-pai-lie-si-lu-qing-xi-by-luckyx/)
给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
换句话说，第一个字符串的排列之一是第二个字符串的子串。
```
输入: s1 = "ab" s2 = "eidbaooo"
输出: True
解释: s2 包含 s1 的排列之一 ("ba").
```
<!-- more -->
### 题解
滑动窗口主要步骤：
* 放入窗口
* 调整窗口
* 使用窗口信息


### 思路
* 先遍历s1,将字符和字符的数量存入map中，need = { a : 2, b:1}
* 滑动窗口根据当前字符也将当前字符放入win={a:2,b:1,c:3}中
* 如果need被win包含，或者说相同，则表示匹配成功

### 实现
```js
var checkInclusion = function (t, s) {
    let need = {};
    let window = {};
    for (const c of t) {
        need[c] = (need[c] || 0) + 1;
    }

    let left = 0, right = 0;
    while (right < s.length) {
        //放入窗口
        let c = s.charAt(right);
        window[c] = (window[c] || 0) + 1;
        right++;

        //调整窗口，判断左侧窗口是否要收缩
        while (right - left > t.length) {
            let d = s.charAt(left);
            left++;
            if(window[d] > 1){
                window[d]--;
            } else {
                delete window[d];
            }
        }
        //使用窗口信息，
        if (objEqual(need,window)){
            return true;
        }
    }
    // 未找到符合条件的子串
    return false;

}
//以ob1为准，其它属性不care
function objEqual(obj1,obj2){
    for(let k in obj1){
        if(obj1[k] !== obj2[k]){
            return false;
        }
    }
    return true;
}

```