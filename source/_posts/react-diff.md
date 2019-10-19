---
title: react-diff
date: 2019-10-19 17:22:04
categories:
- 前端
tags:
- react
- 题
---

React 中最值得称道的部分莫过于 Virtual DOM 与 diff 的完美结合，特别是其高效的 diff 算法，让用户可以无需顾忌性能问题而”任性自由”的刷新页面，让开发者也可以无需关心 Virtual DOM 背后的运作原理，因为 React diff 会帮助我们计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行实际 DOM 操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染。
<!-- more -->
### 什么是VirtualDOM?
virtual dom（虚拟DOM）,也就是React.createElment函数返回的虚拟节点。它通过JS的Object对象模拟DOM中的节点。第一个参数是type，第二个是props，第3个或更多参数均是children（array或1个）
```javascript
// ReactElement.createElement = function (type, config, children)
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type, // string or function
    key: key, // 标识虚拟dom与实例的关系
    ref: ref, // 引用
    props: props, // children等
    // Record the component responsible for creating this element.
    _owner: owner
  };
```
### VirtualDOM实例化
+ 如果type是function或class
    + 实例化为ReactCompositeComponent
+ 如果是string
    + 实例化ReactDOMComponent
        + _updateDOMProperties
        + _createInitialChildren
            + Y children(Array)
                + `string会实例化为ReactDomTextComponent`
                + 按对应类型实例化
            + N `string直接更新dom，不会实例化为ReactDomTextComponent`