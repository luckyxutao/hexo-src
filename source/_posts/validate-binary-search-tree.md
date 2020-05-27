---
title: 验证二叉搜索树
date: 2020-05-05 22:27:54
categories:
- 算法
tags:
- leetcode
- BST
- 题
---

### [说明](https://leetcode-cn.com/problems/validate-binary-search-tree/solution/98-yan-zheng-er-cha-sou-suo-shu-by-luckyxutao-2/)
给定一个二叉树，判断其是否是一个有效的二叉搜索树。
<!-- more -->
### BST性质
* 左边节点小于当前值
* 右边节点大于当前值
* `左子树`和`右子树`也必须是BST

### 思路
* 利用BST`中序遍历是升序`的特点
* 用一个变量prev记住前一个节点，如果prev存在并且prev.val>=root.val，则为false,否则为true
* 递归
### 实现
```js
var isValidBST = function(root) {
    if(!root){
        return true;
    }
    /*
    1.利用BST中序遍历是升序的特点

    */
    let prev = null;
    function dfsHelper(root){
        if(!root){
            return true;
        }
        let leftRe = dfsHelper(root.left);
        if(!leftRe){
            return false;
        }
        /** 处理当前节点 */
        if(prev && prev.val >= root.val){
            return false;
        }
        prev = root;
        return dfsHelper(root.right);
    }
    return dfsHelper(root);
};
```