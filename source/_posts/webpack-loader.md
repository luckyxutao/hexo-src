---
title: webpack-loader
date: 2020-04-17 14:44:12
categories:
- webpack
tags:
- loader
- 原理
---
### loader
webpack 只能理解 JavaScript 和 JSON 文件。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。
<!-- more -->
### loader执行顺序
从最左的pitch开始，再回到最左的loader，类似事件捕获冒泡，一旦pitch有返回值，则直接返回前一个loader
![](https://s1.ax1x.com/2020/05/17/Y20ArF.png)
### 3种自定义引入方式
* modules里配置
```javascript
    test : /\.js$/,
    use:[{
        loader:path.resolve(__dirname,'loaders/loader1.js')
    },{
        loader:path.resolve(__dirname,'loaders/loader2.js')
    },{
        loader:path.resolve(__dirname,'loaders/loader3.js')
    }]
```
* resolveLoader
```javascript
    resolveLoader:{
        modules:['node_modules',path.resolve(__dirname,'loaders')]
    },
```
* alias
```javascript
resolveLoader: {
        alias: {
            "babel-loader": resolve('./loaders/babel-loader.js'),
            "css-loader": resolve('./loaders/css-loader.js'),
            "style-loader": resolve('./loaders/style-loader.js'),
            "file-loader": resolve('./loaders/file-loader.js'),
            "url-loader": resolve('./loaders/url-loader.js')
        }
    },
```
### 自定义loader
* 同步处理
直接返回即可
```javascript
function loader(inputSource) {
    return inputSource + '//xxxx';
}
```
* 异步处理
```javascript
function loader(inputSource) {
    let callback = this.async();
    setTimeout(() => {
        callback(null, inputSource + '//source3', 'xxx');
    }, 3000);
}
```
* 获取/验证参数
可以以不传，但不能传错
```javascript
    let options = loaderUtils.getOptions(this);
    let schmea = {
        type: 'object',
        properties: {
            filename: {
                type: 'string',
            },
            text: {
                type: 'string'
            }
        }
    }
    validateOptions(schmea,options);
```
### banner-loader实现
```javascript
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils')
const fs = require('fs')
function loader(inputSource,inputSourceMap) {
    let options = loaderUtils.getOptions(this);
    console.log(options)
    let schmea = {
        type: 'object',
        properties: {
            filename: {
                type: 'string',
            },
            text: {
                type: 'string'
            }
        }
    }
    validateOptions(schmea,options);
    let {filename,text} = options;
    if(text){
        return inputSource + options.text;
    }
    const callback = this.async();

    if(filename){
        fs.readFile(filename,'utf8',(err,text)=>{
             callback(null,inputSource + text,inputSourceMap)   
        })
    }
    return inputSource
}

module.exports = loader;
```