---
title: react-diff
date: 2019-10-19 17:22:04
categories:
- 前端
tags:
- react
- 题
- diff
---

React(基于`15`)中最值得称道的部分莫过于 Virtual DOM 与 diff 的完美结合，特别是其高效的 diff 算法，让用户可以无需顾忌性能问题而”任性自由”的刷新页面，让开发者也可以无需关心 Virtual DOM 背后的运作原理，因为 React diff 会帮助我们计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行实际 DOM 操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染。
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
    + `实例化为ReactCompositeComponent`
+ 如果是string
    + 实例化`ReactDOMComponent`
        + _updateDOMProperties
        + _createInitialChildren
            + Y children(Array)
                + `string/number会实例化为ReactDomTextComponent`
                + 按对应类型实例化
            + N `string/number直接更新dom，不会实例化为ReactDomTextComponent`

### diff比较的是什么？
+ string/number比较值
+ Object则比较type和key

### diff基本原则
+ 相同类型(`key和type`)
    + `nextRenderedElement(data)`用`旧实例更新`(receiveComponent)
    + nextRenderedElement虽然根据`key`找到实例，并`不保证找到实例的currentElement和nextRenderedElement一致`
    + 如果`nextRenderedElement与prevInstance(currentElement)对不上`，甚至[`DOM操作会更多`](/2019/10/16/react-key使用index和id区别/)。
+ 不同类型
    + 创建新实例，无复用逻辑

### treeDiff
React 只会对相同颜色方框内的 DOM 节点进行[`比较`](#diff比较的是什么？)，即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。
![](https://static001.infoq.cn/resource/image/1f/5a/1f522dc11891365ce77c7650f517495a.png)
```javascript
A.destroy();
A = new A();
A.append(new B());
A.append(new C());
D.append(A);
```
![](https://static001.infoq.cn/resource/image/e1/e3/e1a32e640909e276d6f9c6ac9c1da4e3.png)

### childDiff(内容)

+ _reconcilerUpdateChildren(改之前是1,2,3,4,之后是2,3,1,5)
    + flattenChildren(Array to Object`按定义顺序，仍然`[有序](/2019/10/19/for-in/))

```javascript
    //#########before顺序
    //[1,2,3,4]
    //#########after
    // 虚拟dom
    nextNestedChildrenElements = [{
        'nextRenderedElement虚拟DOM{data:2}',
        key: 2
    },{
        'nextRenderedElement虚拟DOM{data:3}',
        key: 3
    },{
        'nextRenderedElement虚拟DOM{data:1}',
        key: 1
    },{
        'nextRenderedElement虚拟DOM{data:5}',
        key: 4
    }];
    //(仍然有序与nextNestedChildrenElements保持一致))
    nextChildren = {
        .$2 : 'nextRenderedElement虚拟DOM{data:2}',
        .$3 : 'nextRenderedElement虚拟DOM{data:3}',
        .$1 : 'nextRenderedElement虚拟DOM{data:1}',
        .$4 : 'nextRenderedElement虚拟DOM{data:5}',
    }
```

+ updateChildren
    + 遍历`nextChildren`更新每个child([`参考key索引与id区别`](/2019/10/16/react-key使用index和id区别/))
        + 根据`nextChild`的`key`去`prevChildren`里[`找`](#diff比较的是什么？)是否有可用的元素
        + 如果`找到可用的`，则用`该组件(prev组件实例-壳)更新nextChildElement（data)`
        + `没找到可用实例`则创建新实例并挂载
        + `旧的有并且新的无(key)`则放入待删除数据里(*`4`*)

```javascript
    prevChildren = {
        .$1: 'prevComponent实例({data:1})',
        .$2: 'prevComponent实例({data:2})',
        .$3: 'prevComponent实例({data:3})',
        .$4: 'prevComponent实例({data:4})'
    }
    nextChildren = {
        .$2 : 'component实例(用的是prev){data:2}',
        .$3 : 'component实例(用的是prev){data:3}',
        .$1 : 'component实例(用的是prev){data:1}',
        .$4 : 'component实例(新建){data:5}',
    }
```
### childDiff(顺序)
