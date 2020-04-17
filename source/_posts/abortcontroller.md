---
title: 中止Promise及fetch请求
date: 2020-01-03 22:03:39
categories:
- 前端
tags:
- 基础
- fetch
- promise
- 题
---

控制器是一个极其简单的对象。
<!-- more -->

它具有单个方法 abort()，和单个属性 signal。
当 abort() 被调用时：
abort 事件就会在 controller.signal 上触发
controller.signal.aborted 属性变为 true。
任何对 abort() 调用感兴趣的人，都可以在 controller.signal 上设置监听器来对其进行跟踪。
[https://zh.javascript.info/fetch-abort](https://zh.javascript.info/fetch-abort)
### 取消Promise
我们可以通过调用controller.abort();在任何地方中止Promise。
```javascript

function doSomethingAsync({signal}) {
    if (signal.aborted) return Promise.reject(new DOMException('Aborted', 'AbortError'));

    return new Promise((resolve, reject) => {
        console.log('Promise Started');
        const timeout = window.setTimeout(resolve, 2500, 'Promise Resolved')

        // Listen for abort event on signal
        signal.addEventListener('abort', () => {
            window.clearTimeout(timeout);
            reject(new DOMException('Aborted', 'AbortError'));
        });
    });
}
```
### 取消fetch请求
将signal传递给fetch，同样可以通过controller.abort();中止fetch。
```javascript
let urls = [...]; // 要并行 fetch 的 url 列表

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

```