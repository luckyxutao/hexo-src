---
title: webpack-loader-ask
date: 2020-03-20 21:43:53
categories:
- webpack
tags:
- loader
- 原理
---

### webpack默认配置是在哪处理的，loader有什么默认配置么？
WebpackOptionsDefaulter.process方法，默认解析 .wasm , .mjs , .js 和 .json 为后缀的文件 
<!-- more -->
```js
this.set("module.defaultRules", "make", options => [
    {
        type: "javascript/auto",
        resolve: {}
    },
    {
        test: /\.mjs$/i,
        type: "javascript/esm",
        resolve: {
            mainFields:
                options.target === "web" ||
                options.target === "webworker" ||
                options.target === "electron-renderer"
                    ? ["browser", "main"]
                    : ["main"]
        }
    },
    {
        test: /\.json$/i,
        type: "json"
    },
    {
        test: /\.wasm$/i,
        type: "webassembly/experimental"
    }
]);
```
### 配置中的module.rules在webpack中是如何生效与实现的？
webpack使用RuleSet对象来匹配模块所需的loader。RuleSet相当于一个规则过滤器，会将resourcePath应用于所有的module.rules规则，从而筛选出所需的loader。

### webpack中有一个resolver的概念，用于解析模块文件的真实绝对路径，那么loader和普通模块的resolver使用的是同一个么？
不是， resolve和resolveLoader
### 我们知道，除了config中的loader，还可以写inline的loader，那么inline loader和normal config loader执行的先后顺序是什么？
通过enforce来控制，多个loader匹配成功后，叠加执行顺序如下：
* post
* inline
* autoloader(normal)
* pre

### webpack编译流程中loader是如何以及在何时发挥作用的？
* compilation.addEntry
* normalModule
* doBuild
编译的第一步就是调用loaders，之后是ast

### loader为什么是自右向左执行的？
顺时针方向
```
loader1.pitch ->loader2.pitch->loader3.pitch   ->
                                                    source.js
loader2.normal<-loader2.normal<-loader3.normal <-
```
* 两个阶段
    * pitch
    * normal

### 如果在某个pitch中返回值，具体会发生什么？
不包含当前loader的normal方法，执行前一个loader的normal方法
```js
//索引减1,的normalloader
loaderContext.loaderIndex--;
//前一个loader的normal,方向逆转
loaderContext.loaders[loaderContext.loaderIndex].normal.apply(loaderContext,args,callback)
```

### 如果你写过loader，那么可能在loader function中用到了this，这里的this究竟是什么，是webpack实例么？
this是指loaderContext对象，不是webpack的实例
```js
loaderContext.loaders[loaderContext.loaderIndex].normal.apply(loaderContext,args,callback)
```

### loader function中的this.data是如何实现的？
```js
loaderContext.loaders[loaderContext.loaderIndex].data;
```
### 如何写一个异步loader，webpack又是如何实现loader的异步化的？
```js
function loader(){
    const callback = this.async();
    setTimeout(()=>{
        callback();
    },1000)
}

```

