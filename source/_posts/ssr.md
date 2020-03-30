---
title: 基于React的SSR方案分享
date: 2020-03-30 15:26:11
categories:
- 前端
tags:
- react
- ssr
- node
---
### 涉及到的技术
本方式基于webpack、react、redux、react-router、koa、axios等技术封装，`本方案未完待续～`

<!-- more -->

### 简介及特点
1. 更利于SEO。
不同爬虫工作原理类似，只会爬取源码，不会执行网站的任何脚本（Google除外，据说Googlebot可以运行javaScript）。使用了React或者其它MVVM框架之后，页面大多数DOM元素都是在客户端根据js动态生成，可供爬虫抓取分析的内容大大减少(如图一)。另外，浏览器爬虫不会等待我们的数据完成之后再去抓取我们的页面数据。服务端渲染返回给客户端的是已经获取了异步数据并执行JavaScript脚本的最终HTML，网络爬中就可以抓取到完整页面的信息。

2. 更利于首屏渲染
首屏的渲染是node发送过来的html字符串，并不依赖于js文件了，这就会使用户更快的看到页面的内容。尤其是针对大型单页应用，打包后文件体积比较大，普通客户端渲染加载所有所需文件时间较长，首页就会有一个很长的白屏等待时间。

### 局限
* 服务端压力较大
本来是通过客户端完成渲染，现在统一到服务端node服务去做。尤其是高并发访问的情况，会大量占用服务端CPU资源；

* 开发条件受限
在服务端渲染中，只会执行到componentDidMount之前的生命周期钩子，因此项目引用的第三方的库也不可用其它生命周期钩子，这对引用库的选择产生了很大的限制；

* 学习成本相对较高
除了对webpack、React要熟悉，还需要掌握node、Koa2等相关技术。相对于客户端渲染，项目构建、部署过程更加复杂

### package.json
```javascript
{
  "name": "ssr",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev:server": "nodemon build/server.js",
    "debug": "nodemon --inspect-brk build/server.js",
    "dev:build:server": "webpack --config webpack.server.js --watch",
    "dev:build:client": "webpack --config webpack.client.js --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.19.2",
    "koa": "^2.11.0",
    "koa-proxy": "^1.0.0-alpha.3",
    "koa-router": "^8.0.8",
    "koa-static": "^5.0.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-redux": "^7.2.0",
    "react-router-config": "^5.1.1",
    "react-router-dom": "^5.1.2",
    "redux": "^4.0.5",
    "redux-logger": "^3.0.6",
    "redux-thunk": "^2.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.9.0",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/plugin-transform-runtime": "^7.9.0",
    "@babel/preset-env": "^7.9.0",
    "@babel/preset-react": "^7.9.4",
    "babel-loader": "^8.1.0",
    "style-loader": "^1.1.3",
    "css-loader": "^3.4.2",
    "ignore-loader": "^0.1.2",
    "node-sass": "^4.13.1",
    "nodemon": "^2.0.2",
    "sass-loader": "^8.0.2",
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11",
    "webpack-merge": "^4.2.2",
    "webpack-node-externals": "^1.7.2"
  }
}
```
### 基于webpack构建
```javascript
// webpack.client.js
const path = require('path');
const base = require('./webpack.base');
const webpackMerge = require('webpack-merge');
module.exports = webpackMerge(base, {
    entry: './src/client/index.js',
    output: {
        path: path.resolve('static'),
        filename: 'client.js'
    },
    module:{
        rules:[
            {
                test : /\.scss$/i,
                use : ['style-loader','css-loader','sass-loader']
            }
        ]
    }
});
// webpack.server.js
const path = require('path');
const nodeExternal = require('webpack-node-externals');
const base = require('./webpack.base');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(base,{
    target: 'node',
    entry: './src/server/index.js',
    output: {
        path: path.resolve('build'),
        filename: 'server.js'
    },
    externals: [nodeExternal()],
    module:{
        rules:[
            {
                test : /\.s?css$/,
                loader : 'ignore-loader'
            }
        ]
    }
});
// webpack.base.js
const path = require('path');
module.exports = {
    mode: 'development',
    devtool:'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }
        ]
    }
}

```
### store
* getClientStore
    需要把第一次服务端渲染的state同步给client的store
```javascript
return createStore(reducers, window.__GLOBAL_INIT_STATE, applyMiddleware(thunk, logger));
```
* getServerStore

### containers(共享)
* react组件，前后端共享
* 未按redux方式组织目录，采用了`以应用的状态作为模块的划分依据`
* 目录结构采用了[Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux)
```
➜  ssr git:(master) ✗ tree src/containers 
src/containers
├── App
│   ├── action.js
│   ├── index.js
│   ├── index.scss
│   ├── reducer.js
│   └── type.js
├── Main
│   └── index.js
├── Search
│   ├── index.css
│   ├── index.js
│   └── reducer.js
└── reducers.js
```
### client
和server端共用一套路由，通过renderRoutes渲染路由
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import routes from '../routes';
import { BrowserRouter, Route } from 'react-router-dom';
import {renderRoutes,matchRoutes} from 'react-router-config'
import { Provider } from 'react-redux';
import { getClientStore } from '../store';
ReactDOM.hydrate(<Provider store={getClientStore()}>
    <BrowserRouter>
        {renderRoutes(routes)}
    </BrowserRouter></Provider>, document.getElementById('root'));
```

### services（共享）
client/server都会调用该层，故抽到单独一层
* 基于axiox封装了request方法
* 服务端调接口时透传了cookie
* NetInterface时封装了常用业务接口

### routes（共享）
```javascript
import React, { Fragment } from 'react';
import App from '../containers/App';
import Search from '../containers/Search';
import { Route } from 'react-router-dom';
import Main from '../containers/Main';
export default [{
    path:'/',
    // exact: true,
    component:Main,
    routes: [{
        path: "/app",
        component: App,
        key:'app',
        getInitialProps: App.getInitialProps
    }, {
        path: "/search",
        key:'search',
        component: Search,
        getInitialProps: Search.getInitialProps
    }]
}];
```
### server
* koa承担server服务
* react-router-config的matchRoutes来做路由匹配及渲染
* 匹配成功的路由会调组件外挂getInitialProps静态方法

```javascript
import React from 'react';
import { StaticRouter} from 'react-router-dom';
import {renderRoutes,matchRoutes} from 'react-router-config'//渲染路由
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import routes from '../routes';
import { getServerStore } from '../store';
export default async function (reqPath) {
    const context = {
        name: 'xutao'
    };
    let store = getServerStore();
    let matchedRoutes= matchRoutes(routes,reqPath);
    let promises = [];
    matchedRoutes.forEach(item=>{
        if(item.route.getInitialProps){
            promises.push(item.route.getInitialProps(store));
        }
    });
    await Promise.all(promises);
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter context={context} location={reqPath}>{renderRoutes(routes)}</StaticRouter>
        </Provider>
    );
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="root">${html}</div>
        <script>window.__GLOBAL_INIT_STATE = ${JSON.stringify(store.getState())}</script>
        <script src="/static/client.js"></script>
    </body>
    </html>`;
    return htmlTemplate;
}

```