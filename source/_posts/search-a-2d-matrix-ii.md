---
title: 240. 搜索二维矩阵 II
date: 2020-05-10 12:11:56
categories:
- 算法
tags:
- leetcode
---

### [说明](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)

```
编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
每行的元素从左到右升序排列。
每列的元素从上到下升序排列。

[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]

```
<!-- more -->

### 思路
1. 从左下角或右上角搜索可以少搜索一个方向，以右上角开始为例（15）： target= 5
2. 15比5大，则15所有这一列所有元素都比5大，因此15所在的列就不用搜索了，肯定不会在这列的， column--；
3. 4比5小，则向下搜索

### 复杂度
迭代/递归 最差都是O(n)

### 迭代
```js
var findNumberIn2DArray = function(matrix, target) {
    if(!matrix||!matrix.length){
        return false;
    }
    let rowLen = matrix.length, columnLen = matrix[0].length;
    let i = 0, j = columnLen-1;
    while(i<rowLen && j >=0){
        if(matrix[i][j] === target){
            return true;
        } else if(matrix[i][j]>target){
            j--;
        } else if(matrix[i][j] < target){
            i++;
        }
    }
    return false;
};


```


### 递归实现
```js
var findNumberIn2DArray2 = function(matrix, target) {
    if(!matrix||!matrix.length){
        return false;
    }
    let rowLen = matrix.length, columnLen = matrix[0].length;
    //右上角[0][4]
    return findHelper(matrix,target,0,columnLen-1);
};

function findHelper(matrix,target,i,j){
    if(i>=matrix.length || j>= matrix[0].length || i<0 || j<0){
        return false;
    }
    if(matrix[i][j]=== target){
        return true;
    } else if(matrix[i][j] > target){
        return findHelper(matrix,target,i,j-1)
    } else if(matrix[i][j] < target){
        return findHelper(matrix,target,i+1,j)
    }
}

```