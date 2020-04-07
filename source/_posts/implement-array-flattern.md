---
title: array-flattern
date: 2019-05-28 11:25:18
categories:
- 基础
tags:
- implement
- 面试
- 算法
---


扁平化一个数组

```javascript
// [1, 2, 3, 4, [5, 6, [7, 8], 9], 10]
// [1,2,3,4,5,6,7,8,9,10]
function flatter(arr){
    var res = [];
    traversalAll(arr,res);
    return res;
}

function traversalAll(arr,res){
    if(!arr){
        return;
    }
    if(Array.isArray(arr)){
        for(let k=0;k <arr.length;k++){
            traversalAll(arr[k],res);
        }
    } else {
        res.push(arr);
    }
}

```