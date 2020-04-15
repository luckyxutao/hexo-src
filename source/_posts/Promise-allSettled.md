---
title: Promise.allSettled方法
date: 2020-04-11 10:44:47
categories:
- 前端
tags:
- promise
- 基础
- 题
---

Promise.allSettled()方法返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果。
`allSettled函数是没有失败的（即使某个promise失败）`

<!-- more -->

### 示例说明

```javascript
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
 
Promise.allSettled([resolved, rejected]).then(function (results) {
    assert.deepEqual(results, [
        { status: 'fulfilled', value: 42 },
        { status: 'rejected', reason: -1 }
    ]);
```

### 实现

```javascript

Promise.allSettled = function(promiseArr){
    let results = [];
    let count=0;
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promiseArr.length;i++){
            var curr = promiseArr[i];
            if(curr instanceof Promise){
                curr.then(res=>{
                    results[i] = {
                        status:'fulfilled',
                        value : res
                    }
                    count++;
                    if(count >= promiseArr.length){
                        resolve(results);
                    }
                },err=>{
                    results[i] = {
                        status : 'rejected',
                        reason : err
                    }
                    count++;
                    if(count >= promiseArr.length){
                        resolve(results);
                    }
                })
            } else {
                results[i] = {
                    status : 'fulfilled',
                    value : curr
                }
                count++;
                if(count >= promiseArr.length){
                    resolve(results);
                }
            }
        }
    });
}

```