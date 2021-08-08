---
title: react中context无法阻止渲染问题
date: 2020-08-08 18:06:42
categories:
- react
tags:
- react
---

使用react的context之后，会导致组件被刷新。很多时候为了减少render的次数，我们不得不使用shouldUpdate或memo等方法，但是当组件使用了context上下文之后，无论你的反回值是true或false,只要context里的值发生了改变，都无法阻止组件的render，这也是因为组件需要监听context值的变化，但有时，我们并不需要所有变化都被更新。[参考](https://zh-hans.reactjs.org/docs/context.html)

### 解决思路
* 更新时不使用扩展符{...}，context就不会生成新的对象，但明显不合理。
* 把值存在顶层的state中，不存context中，这样又有点绕，得不偿失
* 使用EventEmitter这种发布式模式，不在本次讨论范围内，包括使用redux的方案
* 使用不同颗粒度的context
* 既然使用了useContext的组件一定会被render，只要把useContext进行上移即可，移到父组件上去调用，相当于一种折中的方式，把大量子组件的更新context的方法移交到父组件中去，这样就可以变相的优化了。
　  在以上几点中，我最后选择了使用第五点，也就是把context的使用提升到了父级，这就有点类似于redux中的connect组件了，在这里可以把context转化成props传入子组件，然后在子组件中判断props的变化。


