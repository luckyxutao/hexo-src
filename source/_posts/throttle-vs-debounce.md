title: throttle-vs-debounce
date: 2016-05-12 16:47:34
categories:
- 前端
tags:
- javascript
---

> * debounce经典场景:resize计算、input autocomplete、按钮快速频繁点击 等不关心过程只关心最终结果的场景
> * throttle增大了事件触发的间隔，与requestAnimationFrame相同，如：滚动底部检测等
> * 都是为了提高性能，但应用的场景大不同

[可视化理解debounce和throttle](http://demo.nimius.net/debounce_throttle/)     
[理解debounce和throttle](http://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/#more)