---
title: 单词搜索
date: 2020-04-18 16:44:38
categories:
- 算法
tags:
- leetcode
- 回溯
- 题
---

### [说明](https://leetcode-cn.com/problems/word-search/)

给定一个二维网格和一个单词，找出该单词是否存在于网格中。
单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
<!-- more -->
### 题解
[解析](https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof/solution/hui-su-fa-dan-ci-sou-suo-by-luckyxutao/)、[解析2](https://leetcode-cn.com/problems/word-search/solution/zai-er-wei-ping-mian-shang-shi-yong-hui-su-fa-pyth/)、[解析3](https://leetcode-cn.com/problems/word-search/solution/tu-jie-di-gui-shen-du-you-xian-sou-suo-by-z1m/)

### 核心思路
1、偏移量数组在二维平面内是经常使用的，可以把它的设置当做一个技巧，并且在这个问题中，偏移量数组内的 4 个偏移的顺序无关紧要；
说明：类似使用这个技巧的问题还有：「力扣」第 130 题：被围绕的区域、「力扣」第 200 题：岛屿数量。
2、对于这种搜索算法，我认为理解 DFS 和状态重置并不难，代码编写也相对固定，难在代码的编写和细节的处理，建议多次编写，自己多总结多思考，把自己遇到的坑记下。
![](https://pic.leetcode-cn.com/92e383cc1ca508f71d8eccd092c0333977651d7ce9de6672383981a2d78fb0c5-12.gif)

### 实现

```javascript
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    for (let i = 0; i < board.length; i++) {
        let row = board[i];
        for (let j = 0; j < row.length; j++) {
            //暴力法，从左到右层次查找，找到开始比较的字母位置，len要重置
            if (dfsHelper(board, word, i, j, 0)) {
                return true;
            }
        }
    }
    return false;
};
//len表示已经成功比较了多少位
function dfsHelper(board, word, i, j, len) {
    // 如果比较过的长度大于或等于word的长度，则说明匹配成功
    if (len >= word.length) {
        return true;
    }

    //判断是否越界(向左，向上可能为0，向右、向下可能超过数组长度)
    if (i < 0 || j < 0 || i >= board.length || j >= board[0].length) {
        return false;
    }
    //如果不等于当前字符表示此路不通
    if (word.charAt(len) !== board[i][j]) {
        return false;
    }
    //先缓存下当前值，并将当前值改为任意个数(不为字母)
    let temp = board[i][j];
    //向下搜索前，将用过的变量(board[i][j])随意改个值，以保证不被使用
    board[i][j] = '0';
    //这4个顺序不重要，
    let flag = dfsHelper(board, word, i, j + 1, len + 1) //向右搜索
        || dfsHelper(board, word, i + 1, j, len + 1) //向下搜索
        || dfsHelper(board, word, i, j - 1, len + 1) //向左搜索
        || dfsHelper(board, word, i - 1, j, len + 1) //向上搜索
    //回溯思想，用完要还原
    board[i][j] = temp;
    return flag;
}
```