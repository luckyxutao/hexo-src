---
title: 二叉树系列-1
date: 2020-01-08 09:09:29
categories:
- 基础
tags:
- 算法
---

二叉树常规操作，未完待续

### 树结构
```javascript
//       10
//    9          20
//       35   15    24
```
<!-- more -->

### DFS-前序遍历(中->左->右)
* 递归版
```javascript
function preOrderTraversal(root) {
    var res = [];
    helper(root,res);
    return res;
}
function helper(node,res){
    if(!node){
        return;
    }
    res.push(node.val);
    node.left && helper(node.left,res);
    node.right && helper(node.right,res);
}
```
* 非递归
主要利用了栈或队列
```javascript
function preOrderTraversal(root) {
    var res = [];
    var stack = [root];
    while(stack.length){
        var cur = stack.pop();
        res.push(cur.val);
        cur.right && stack.push(cur.right);//栈，先进后出，先把右节点推入
        cur.left && stack.push(cur.left);
    }
    return res;
}
```
### DFS-中序遍历(左->中->右)
* 递归
```javascript
function inOrderTraversal(root) {
    let res = [];
    helper(root, res);
    return res;
}

function helper(node, res) {
    if (!node) {
        return;
    }
    node.left && helper(node.left, res);
    res.push(node.val);
    node.right && helper(node.right, res);
}
```
* 非递归
```javascript
function inOrderTraversal(root) {
    let res = [];
    let s1 = [];
    let cur = root;
    while(cur||s1.length){
        while(cur){//先把所有left压入栈
            s1.push(cur);
            cur=cur.left;
        }
        cur = s1.pop();//中间节点
        res.push(cur.val);
        cur = cur.right;//right
    }
    return res;
}
```
### DFS-后序遍历（左->右->中)
* 递归
```javascript
function inOrderTraversal(root) {
    let res = [];
    helper(root, res);
    return res;
}

function helper(node, res) {
    if (!node) {
        return;
    }
    node.left && helper(node.left, res);
    node.right && helper(node.right, res);
    res.push(node.val);
}
```
* 非递归
    * 很容易得到`(中->右->左)`->`(左->右->中)`
    * 利用了双栈
```javascript
function postOrderTraversal(root){
    let s1=[root],s2=[];
    while(s1.length){
        let cur = s1.pop();
        s2.unshift(cur.val);
        cur.left && s1.push(cur.left);//进栈 左右, 出栈 右左
        cur.right && s1.push(cur.right);
    }
    return s2;
}
```

### BFS-层次遍历
* 前序(DFS)是将下层节推入`栈`后进先出
* 层次(BFS)是将下层节点推入`队列`后出，本层`先进先出`
```javascript
// 1. 从队列取出最早节点
/*** 将下层节点往队队列尾部 ***/
// 2. 将left节点往队列放
// 3. 将right节点往队列放
function levelOrderTraversal(root){
    let queue =[root];
    let res = [];
    while(queue.length){
        let cur = queue.pop();//取出最先进入队列元素
        res.push(cur.val);
        //下层节点推入队列尾部，先left，后right,遍历时也是从左到右
        cur.left && queue.unshift(cur.left);
        cur.right && queue.unshift(cur.right);
    }
    return res;
}
```

### 反转二叉树
* 转换效果
```javascript
//       10
//    9      20
//         15    35

/**
 *           10
 *        20       9
 *    35       15
 */
```
* 递归
```javascript
function invertBinaryTree(root) {
    let res = [];
    helper(root, res);
    return res;
}

function helper(node, res) {
    if (!node) {
        return;
    }
    var temp = node.left;
    node.left = node.right;
    node.right = temp;
    node.left && helper(node.left, res);
    node.right && helper(node.right, res);
}
```
* 遍历(任一遍历方式)
```javascript
function invertBinaryTree(root) {
    let s1 = [root];
    while(s1.length){
        let cur = s1.pop();
        let temp = cur.left;
        cur.left = cur.right;
        cur.right = temp;
        cur.right && s1.push(cur.right);
        cur.left && s1.push(cur.left);
    }
}
```