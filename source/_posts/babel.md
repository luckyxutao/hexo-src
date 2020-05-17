---
title: babel介绍与使用
date: 2019-11-25 21:33:14
categories:
- webpack
tags:
- babel
- webpack
---

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事情：

* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
* 源码转换 (codemods)

<!-- more -->
### 转换过程
* code转为ast树
* 修改ast数据结构
* 修改后的ast生成code

### babel用法
* @babel/core 核心转换工具
* @babel/types 用于修改ast及判断的工具类
```javascript
//遍历并修改ast
const importPlugin = {
    visitor: {
        ImportDeclaration(path) {
            if (!t.isImportDefaultSpecifier(specifiers[0])) {//等等
        }
    }
}
//原始code
const ast = babel.transform(code, {
    plugins: [importPlugin]
});
const newCode = ast.code;//转换后的code
console.log(newCode)
```

### 实现babel-plugin-import插件
按需打包插件，避免导入整个包
* webpack.config.js
```javascript
    module: {
        rules: [{
            test: /\.js$/,
            exclude:/node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins:['./plugins/plugin-transform-xu-import']
                },
            }
        }]
```
* babel插件[`查找路径`](https://babeljs.io/docs/en/options#plugin-and-preset-options)
* 转换前
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {Button,Alert} from 'antd'
console.log(antd)
```
* 转换后效果明显打包前`5.7M`，打包后`1.56M`
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';
```
* 插件源码
```javascript
////////#############
let t = require('babel-types');
// const code = "import {Button,Alert} from 'antd'";
module.exports = function(){
    let importPlugin = {
        visitor: {
            ImportDeclaration(path) {
                console.log('myplugins')
                let { node } = path;
                let source = node.source.value;
                let specifiers = node.specifiers;
                if (!t.isImportDefaultSpecifier(specifiers[0])) {
                    specifiers = specifiers.map((v, i) => {
                        return t.importDeclaration(
                            [t.importDefaultSpecifier(v.local)],
                            t.stringLiteral(`${source}/lib/${v.local.name.toLowerCase()}`)
                        )
                    })
                    path.replaceWithMultiple(specifiers);
                }
            }
        }
    };
    return importPlugin;
}
```