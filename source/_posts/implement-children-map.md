---
title: React.Children.map函数简单实现
date: 2020-04-04 11:38:37
categories:
- 前端
tags:
- implement
- react
- 源码
- 题
---



React.children.map函数简单实现
<!-- more -->
> * 处理了children嵌套数组问题
> * 通过clone元素，处理了key问题（和React一致）

```javascript
export function ReactElement(type, key, ref, _self, _source, _owner, props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        props,
        _owner,
        _source,
        _self
    }
    return element;
}

function childrenMap(children, callback) {
    var res = [];
    var indexObj = { index: 0 };//需要是个引用类型，值类型的话，递归函数内修改了，但是外边不知道，仍然以旧值循环
    traversalAll(children, res, indexObj, callback);
    return res;
}

function traversalAll(children, res, indexObj, callback, prefix = '') {
    if (!children) {
        return null;
    }
    if (Array.isArray(children)) {
        for (let k = 0; k < children.length; k++) {
            let spelator = prefix ? ':' : '.'
            let newPrefixName = prefix + spelator + k;
            traversalAll(children[k], res, indexObj, callback, newPrefixName);
        }
    } else {
        // console.log(`${prefix}`);
        var oldElement = children;
        var clonedElement = ReactElement(oldElement.type, prefix, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
        res.push(callback(clonedElement, indexObj.index++))
    }
}
```
