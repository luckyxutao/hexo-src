---
title: 验证栈序列
date: 2020-04-05 09:15:17
categories:
- 算法
tags:
- leetcode
- 栈
- 题
---

### [说明](https://leetcode-cn.com/problems/validate-stack-sequences/)
给定 pushed 和 popped 两个序列，每个序列中的 值都不重复，只有当它们可能是在最初空栈上进行的推入 push 和弹出 pop 操作序列的结果时，返回 true；否则，返回 false 。
### 算法
将 pushed 队列中的每个数都 push 到栈中，同时检查这个数是不是 popped 序列中下一个要 pop 的值，如果是就把它 pop 出来。最后，检查不是所有的该 pop 出来的值都是 pop 出来了。
[解析1](https://leetcode-cn.com/problems/validate-stack-sequences/solution/yan-zheng-zhan-xu-lie-by-leetcode/)、[解析2](https://www.cnblogs.com/MrSaver/p/12167607.html)、[解析3](https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/solution/li-yong-fu-zhu-zhan-yan-zheng-zhan-xu-lie-by-lucky/)
<!-- more -->
### 步骤
1. 用一个辅助栈(stack)模拟pushed队列的入栈操作
2. 栈是先进后出的，由此 popped[头] = stack[尾]
   如果popped按排序始终能找到符合popped[头] = stack[尾]，则将元素分别从stack[尾]、popped[头]出列
3. 如果最后为空则true，否则是false

### 实现

```javascript
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
    //栈的入栈和出栈是相反的,stack[尾]===stack[头]
    let stack = [];
    while(popped.length >0){
        //出栈顶部元素
        let top = popped[0];
        /**
         * 1. tok和新的stack顶部元素比较
         * 2. 不同则将pushed队列按顺序push到stack
         */
        while( stack[stack.length-1] !== top && pushed.length ){
            //将pushed元素从左往右 压入栈
            stack.push(pushed.shift());
        }
        //stack的最后一个等于popped[0]第一个元素，则说明符合，都从队列去除
        if(stack[stack.length-1] === top){
            stack.pop();//
            popped.shift();//
        } else {
            return false;
        }
    }
    return popped.length === 0;
};
```