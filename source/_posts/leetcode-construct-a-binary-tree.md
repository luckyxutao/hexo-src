---
title: 基于中序与(后序|前序)遍历重建二叉树
date: 2020-01-22 15:16:06
categories:
- 算法
tags:
- 算法
- 基础
- 题
- leetcode
---

[题目介绍](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

 <!-- more -->

### 思路
[思路参考](https://liweiwei1419.github.io/sword-for-offer/07-%E9%87%8D%E5%BB%BA%E4%BA%8C%E5%8F%89%E6%A0%91/)，掌握两种数组规律后还是很容易的
![](https://liweiwei1419.github.io/images/sword-for-offer/7-1.jpg)
### 前序/中序
1. 前序数组第一个元素，可以得到根节点
2. 通过根节点找到在inorder中的位置pos, pos左侧是左子树，右侧是右子树
3. 把左子树所需的inorder和preorder切割出来，递归
```javascript

var buildTree = function (preorder, inorder) {
    if (preorder.length === 0 || inorder.length === 0) {
        return null;
    }
    var root = new TreeNode(preorder[0]);
    var pos = inorder.indexOf(preorder[0])
    root.left = buildTree(preorder.slice(1, pos + 1), inorder.slice(0, pos));
    root.right = buildTree(preorder.slice(pos + 1), inorder.slice(pos + 1));
    return root;
};
```

### 后序/中序
1. 后序数组最后一个元素，可以得到根节点
2. 通过根节点找到在inorder中的位置pos, pos左侧是左子树，右侧是右子树
3. 把左子树所需的inorder和preorder切割出来，递归
```javascript
var buildTree = function (inorder, postorder) {
    if (postorder.length === 0 || inorder.length === 0) {
        return null;
    }
    var rootVal = postorder[postorder.length - 1];
    var root = new TreeNode(rootVal);
    var pos = inorder.indexOf(rootVal);
    root.left = buildTree(inorder.slice(0, pos), postorder.slice(0, pos));
    root.right = buildTree(inorder.slice(pos + 1), postorder.slice(pos, postorder.length - 1));//排除最后一个元素
    return root;
};
```