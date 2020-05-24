---
title: webpack热更新
date: 2020-05-23 06:41:42
categories:
- webpack
tags:
- 热更新
- 原理
---

## 什么是HMR

* Hot Module Replacement是指当你对代码修改并保存后，webpack将会对代码进行得新打包，并将新的模块发送到浏览器端，浏览器用新的模块替换掉旧的模块，以实现在不刷新浏览器的前提下更新页面。
* 相对于live reload刷新页面的方案，HMR的优点在于可以保存应用的状态,提高了开发效率

<!-- more -->
## 流程图
![](https://s1.ax1x.com/2020/05/24/YzeA00.png)
## webpack-dev-server如何跑起来的？
1. 实例化webpack得到compiler
2. 设置compiler
    * 将compiler的outputFileSystem设置为memory-fs以提高性能
    * 监听compiler.hooks.done钩子
        * `一旦编译成功，通过websocket将stats.hash推送给客户端`
    * 启动compiler.watch模式
        * 监听文件变化，有变化会自动编译
3. 设置WebServer
    * 实例化express
    * 挂载express中间件(以支持memory-fs)
    * 创建socket服务器
        * `一旦有client连进来，将最新hash推送给client`


## 主要步骤
###  1. 服务器&webpack
* **`1.1 webpack工作在watch模式`**
一旦文件以变化会自动编译，完成后通过触发compiler.hooks.done钩子通知监听者(webpack-dev-server)

* **`1.2 server拿到编译后的newHash通知client`**

### 2. 浏览器
* **`2.1 client收到newHash`**

* **`2.2 check && download`**
prevHash(表示当前的)，newHash(最通知收到最新的)
    * 根据`prevHash`下载manifest.json描述文件并拿到需要更新的chunkId
    ```json
    //`/${prevHash}.hot-update.json`
    {"h":"2f46879973b3c1f743f1","c":{"main":true}}
    ```
    * 根据`prevHash`和chunkId通过jsonp请求要更新的chunkjs文件
```javascript
//`/${chunkId}.${prevHash}.hot-update.js`
webpackHotUpdate("main", {
  "./src/title.js": (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_exports__["default"] = ('hello97');
    })
});
```
* **`2.3 替换要更新的js模块`**
补丁JS取回来后会调用`JsonpMainTemplate.runtime.js`的`webpackHotUpdate`方法来完成热替换的
    * 使用了`HotModuleReplacementPlugin`后，每个module对象上有个hot对象，主要作用两个：
        1. 注册支持热更新的依赖   
        2. 热更新时child通过parents查找父module的hot对象，并执行热更新依赖
```javascript
// Create a new module (and put it into the cache)
var module = installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {},
    hot: hotCreateModule(moduleId),
    parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
    children: []
};
```
    * 支持热更新的模块需要将子模块提前注册到hot._acceptedDependencies对象上(`作用1`)
    ```javascript
        let root = document.getElementById('root');
        function render(){
            let title = require('./title').default;
            root.innerHTML= title;
        }
        render();
        if(module.hot){
            //如果title变化 了，会重新调回调函数
            module.hot.accept(['./title'],render)
        }
        //注册后的效果
        hot._acceptedDependencies['./src/title.js'] = render
    ```
    * webpackHotUpdate(子更新了，子通过执行父的hot来reload)(`作用2`)
        * 一句话
        ```js
            1. 新代码包装成module执行并更新到installedModules
            2. 通过parents属性找到父模块的hot对象对应热更新依赖的回调并执行(会重新require)
                2.1 hot._acceptedDependencies['./src/title.js'] = render
        ```
        * 详细
        ```
            1. 根据chunkId从installedModules找到已加载的旧模块，取出parents和children
            2. jsonp得到的新代码包裹成一个新模块并执行，更新到installedModules
            3. 通过parents属性找到父模块的parentModule.hot._acceptedDependencies[moduleId]热更新依赖并执行
            4. 执行callback(render函数)重新require并执行js
        ```
        * 实现
    ```javascript
    window.webpackHotUpdate = (chunkId, moreModules) => {
        for (let moduleId in moreModules) {
            //找到旧的已经加载过的模块
            let oldModule = __webpack_require__.c[moduleId];
            let { parents, children } = oldModule;
            //了出parents和children
            //新为新补丁包装一个module
            var module = __webpack_require__.c[moduleId] = {
                i: moduleId,
                l: false, exports: {},
                parents, children,
                hot: window.hotCreateModule(moduleId)
            };
            moreModules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            parents.forEach(parent => {
                let parentModule = __webpack_require__.c[parent];
                parentModule.hot && parentModule.hot._acceptedDependencies[moduleId] && parentModule.hot._acceptedDependencies[moduleId]();
            });
            hotCurrentHash = newCurrentHash;
        }
    }
    ```
* **`2.4 加载结束`**
将prevHash置为newHash
