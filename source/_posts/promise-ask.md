---
title: promise-ask
date: 2020-03-24 12:20:17
categories:
- 前端
tags:
- promise
- 题
---

### promise 易混淆、易错
<!-- more -->
```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('开始');
        resolve('success');
    }, 5000);
});

const start = Date.now();
//是原始promise的实例,接的是cunstructor里的
promise.then((res) => {
    console.log(res, Date.now() - start);
}).then(res=>{//是新new Promise的then,前一个then无返回，因此是undefined
    console.log(res,'rrrrr')
})
//是原始promise的实例,接的是cunstructor里的
promise.then((res) => {
    console.log(res, Date.now() - start);
});

```

### 多个 .catch
都是最初的实例
```javascript
var p = new Promise((resolve, reject) => {
  reject(Error('The Fails!'))
})
p.catch(error => console.log(error.message))
p.catch(error => console.log(error.message))
```

### 宏、微任务
```javascript
const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);//ssss
    });

}));

first().then((arg) => {
    console.log(arg); ////ttttt
});
console.log(4);
/**
 * macro[setTimeout]
 * micro[ssss,tttt]
 * 3
 * 7
 * 4
 * 1
 * 2
 * 5
 */

```

### promise 成功失败、相互转换
```javascript
let p1 = new Promise((resolve, reject) => {
    let num = 6
    if (num < 5) {
        console.log('resolve1')
        resolve(num)
    } else {
        console.log('reject1')
        reject(num) //execu0
    }
})
p1.then((res) => {
    console.log('resolve2')
    console.log(res)
}, (rej) => { ///execu1
    console.log('reject2')
    let p2 = new Promise((resolve, reject) => {
        if (rej * 2 > 10) {
            console.log('resolve3')
            resolve(rej * 2)// execu2
        } else {
            console.log('reject3')
            reject(rej * 2)
        }
    })
    return p2
}).then((res) => {
    console.log('resolve4') // execu3
    console.log(res)
}, (rej) => {
    console.log('reject4')
    console.log(rej)
});


```
### promise catch
捕获前一级的 onRejected
```javascript
/**
catch相当于 
.then(null,err=>{})
*/
Promise.resolve(1)
    .then((res) => {
        console.log(res);
        return 2;
    })
    .catch((err) => {
        return 3;
    })
    .then((res) => {
        console.log(res);
    });
```

### promise-穿透
* 当then里onFulfiled和onRejected不是函数时会发生穿透。
* onFulfiled、onRejected不是函数时有默认值
```javascript
onFulfiled = (value)=>value;
onRejected = (err)=throw err;
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log(1))
```

### 执行顺序
macroTask=>microTask[多个执行结束]=>macroTask[执行一个]=>microTask[多个执行结束]
```javascript
setTimeout(() => {
    console.log('setTimeout')
})
let p1 = new Promise((resolve) => {
    console.log('Promise1')
    resolve('Promise2')
})
p1.then((res) => {
    console.log(res)
})
console.log(1)

// 宏任务 [timeout1]
// 微任务 [pormise1]
/**
 * promise1
 * 1
 * promise2
 * settimeout
 */

```