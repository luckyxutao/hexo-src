---
title: 695. 岛屿的最大面积
date: 2020-06-22 17:32:15
categories:
- 算法
tags:
- leetcode
---

### [说明](https://leetcode-cn.com/problems/max-area-of-island/)
给定一个包含了一些 0 和 1 的非空二维数组 grid 。

一个 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 0 。)

<!-- more -->

### 思路
* 典型的dfs搜索问题
* 可以将访问过的元素[1]置为0，最后也不需要恢复grid

### 实现
```js
var maxAreaOfIsland = function (grid) {
    if (!grid || !grid.length) {
        return;
    }
    let rowLen = grid.length, colLen = grid[0].length;
    let maxArea = 0;
    let res = { count :0}
    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
            maxArea = Math.max(maxArea, dfsHelper(grid, i, j));
        }
    }
    return maxArea;
};

function dfsHelper(grid,i, j) {
    //中止条件
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) {
        return 0;
    }
    if (grid[i][j] === 0) {
        return 0;
    }
    grid[i][j] = 0;
    return 1 + dfsHelper(grid, i, j + 1) + dfsHelper(grid, i + 1, j) +dfsHelper(grid, i - 1, j) + dfsHelper(grid, i, j - 1);
}

```