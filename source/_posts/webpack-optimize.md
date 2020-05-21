---
title: webpack常用优化
date: 2020-03-26 18:46:47
categories:
- webpack
tags:
- 优化
---

### 第三方库处理-externals
防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。[`参见externals`](http://webpack.docschina.org/configuration/externals/)
<!-- more -->
### include exclude 常用于loader
* 首先，不配置这两个属性你引入的模块还是会被打包。
* 但是，很多第三方模块是不需要再被处理的，比如jQuery,不需要再被babel处理，因为jQuery已经是es5，浏览器直接可以识别。这个时候，你不设置exclude，jQuery就会被处理，这样就增加了打包时间。
* 所以，设置好exclude和include可以优化打包时间。
### babel-plugin-import
实现模块按需加载、而不是引一个模块将整个库打包进来
### scope-hoisting
Scope Hoisting 它可以让webpack打包出来的代码文件更小，运行更快，它可以被称作为 "作用域提升"。是在webpack3中提出来的，当然现在webpack4也是支持的。
* 代码体积更小，因为函数申明语句会产生大量代码；
* 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小。
* 由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句，不然它将无法生效。 
    * ES2015 的模块语法规定 import 和 export 关键字必须在顶层、模块路径只能用字符串字面量，这种“强制静态化”的做法使代码在编译时就能确定模块的依赖关系，以及输入和输出的变量，所以这种功能实现起来会更加简便。
暂不支持 CommonJS 模块语法的原因是，这种模块语法中的模块是可以动态加载的，很难分析出模块之间的依赖关系及输出的变量。
* 预先计算部分值
```javascript
// d.js
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;

export default d;

// index.js
import d from './d';
console.log(d)
```
* prod环境开启了后部分代码
```javascript
([function (e, t, r) { "use strict"; r.r(t); console.log("1111111"), console.log("result is", 6) }]);
```
* dev环境未开启bundle.js部分代码
```javascript
/******/ ({

/***/ "./src/d.js":
/*!******************!*\
  !*** ./src/d.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var a = 1;
var b = 2;
var c = 3;
var d = a + b + c;
/* harmony default export */ __webpack_exports__["default"] = (d);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./d */ "./src/d.js");

console.log('1111111');
console.log('result is', _d__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ })

/******/ });


```
### webpackBundle-analyzer
通过本插件分析打包文件
### tree-shaking
tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export。这个术语和概念实际上是由 ES2015 模块打包工具 rollup 普及起来的。
webpack 2 正式版本内置支持 ES2015 模块（也叫做 harmony modules）和未使用模块检测能力。新的 webpack 4 正式版本扩展了此检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
* tree-shaking 默认只支持 es6语法静态导入，不支持require等
* `production`环境默认支持dev环境不支持
* 确保没有 compiler 将 ES2015 模块语法转换为 CommonJS 模块
* 在项目 package.json 文件中，添加一个 "sideEffects" 属性。
    * sideEffects
        * package.json里sideEffects默认是true
            * 即使没使用test变量，但是import test.js后仍然会打包到bundle
        * package.json的sideEffects为false的话
            * test文件不会被打包到bundle

```javascript
//package.json
//排除css，否则css也会被排除在外
  "sideEffects": [
    "**/*.css"
  ],
// index.js
import test from './test'//代码没用test变量

//test.js，有副作用，不是纯函数
function test(){
    return 'hello'
}
console.log('llloooootesttest') //副作用effects
test();

export default test;
```
### 第三方库处理-dll(动态链接库)
DLLPlugin 和 DLLReferencePlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。
* dll.config.js
```javascript
// dll.config.js
const path = require('path');
const DllPlugin = require('webpack').DllPlugin;
// 需要产生一个缓存列表
module.exports = {
    mode: 'development',
    entry : ['react','react-dom'], // add minus
    output:{
        library:'react',//放全局变量
        // libraryTarget:'commonjs2', //默认是var,commonjs, commonjs2, umd this
        filename : 'react.dll.js',
        path: path.resolve(__dirname,'dll')
    },
    plugins:[
        new DllPlugin({
            name : 'react',
            path : path.resolve(__dirname,'dll/manifest.json')
        })
    ]
}
```
* webpack.config配置
```javascript
// webpack.config.js
// // dll去找manifest.json文件
new DLLReferencePlugin({
    manifest : path.resolve(__dirname,'./dll/manifest.json')
}),
// //将dllreact.js引入到html
new AddAssetHtmlPlugin({
    filepath : path.resolve(__dirname,'./dll/react.dll.js')
}),
```
* html模板
需要单独引用打好的dll文件，或者通过AddAssetHtmlPlugin自动引入


### 构建速度-splitChunks

webpack 总共提供了三种办法来实现 Code Splitting，
>* 入口配置：entry 入口使用多个入口文件；
>* `抽取公有代码：使用 SplitChunks 抽取公有代码；`
>* 动态加载 ：动态加载一些代码。

* 多entry时，相同文件文件提取
* 被不同文件引用过N次以上时提取
* chunks参数
    * async（默认）
        * 只有通过import('aaaa.js').then动态语法会提取公共文件
    * initial/all
        * 动态导入或静态导入多次的都会提取为公共文件
* minChunks
    模块被不同的 chunk 引入超过 1 次的抽取为 common
* catchGroup
它可以继承/覆盖上面 splitChunks 中所有的参数值，除此之外还额外提供了三个配置，分别为：test, priority 和 reuseExistingChunk。
test: 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中；
priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。

```javascript
        // 生产环境下第三方模块进行抽离
        optimization:{
            // usedExports:true,
            splitChunks: {
                chunks: 'initial',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 6,
                maxInitialRequests: 4,
                automaticNameDelimiter: '~',
                automaticNameMaxLength: 30,
                cacheGroups: {
                  react:{
                    test : /[\\/]node_modules[\\/](react)|(react-dom)/,
                    priority:-2
                  },
                  defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                  },
                  default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                  }
                }
              }
        },
```
### 动态加载-代码分割
* 动态导入 类比路由的懒加载 import
* 默认会产生代码分割
* 使用jsonp异步加载
* 魔术字符串修改分割文件name
```javascript
button.addEventListener('click',()=>{
    // 动态导入 类比路由的懒加载 import
    // 默认会产生代码分割
    // 使用jsonp异步加载 ./calc
    // 魔术字符串修改分割文件name
    import(/* wepbackChunkName:'video' */'./calc').then(res=>{
        console.log(res.add(23,32))
    })
});
//修改异步chunk名字，chunkFilename:'[name].min.js'
// 0.min.js
// 8.bundle.js

```
