---
title: weback插件系统学习
date: 2020-06-07 20:56:43
tags:
---
### 为什么要学习插件？
* webpack基础配置无法满足需求
* 插件几乎能够任意更改webpack编译结果
* webpack内部也是通过大量内部插件实现的

<!-- more -->
### 步骤
0. 找到合适的钩子注册监听，确保callback参数能满足需要
1. 插件是一个class必须有一个名为apply方法，通常用来注册hooks监听
2. 在监听的回调函数里添加逻辑
3. 在webpack.config里注册插件

### 生命周期
* compiler.hooks.emit
即将写入文件到磁盘
* compiler.hooks.done
* [钩子](https://webpack.docschina.org/api/compilation-hooks/#afterseal)


### [webpack-sources](https://github.com/webpack/webpack-sources)
写webpack插件修改资源文件用到
* RawSource
单个
* ConcatSource
多个源
* ...


### 打包资源追加新文件
```js
compilation.assets[this.options.name] = 
{
    source(){
        return content;
    },
    size(){
        return content.length;
    }
};
```

### 修改即将写入磁盘的文件
```js
let content = assets[filename].source();
content = `/* ${filename} build at ${Date.now()} */\n` + content;
assets[filename] = new RawSource(content);
// assets[filename] = new ConcatSource(content,content2);
```


### 插件-压缩打包文件
可以将输出资源压缩成zip
```js
const JSZip = require('jszip')
class DonePlugin{
    constructor(options){
        this.options = options;
    }
    apply(compiler){
        //准备向
        // assets有source方法
        compiler.hooks.emit.tapPromise('EmitPlugin',(compilation,callback)=>{
            var zip = new JSZip();
            for(let filename in compilation.assets){
                if(compilation.assets.hasOwnProperty(filename)){
                    zip.file(filename,compilation.assets[filename].source());
                }
            }
            return zip.generateAsync({type:'nodebuffer'}).then(content=>{
                //把数据挂到assets上自动会写入文件
                //相当于是个接口
                compilation.assets[this.options.name] = 
                {
                    source(){
                        return content;
                    },
                    size(){
                        return content.length;
                    }
                };
            });

        });
    }
}
/**
 * 找到合适的钩子
 * 知道钩子函数的参数和数据结果，加工
 * 
 * 
 */
module.exports = DonePlugin;
```

### 插件-时间戳插件(修改文件)
js/css文件加上build时间戳
```js
const {ConcatSource,RawSource} = require('webpack-sources');
class TimePlugin {
    constructor(options) {
        this.options = options;
    }
    
    apply(compiler) {
        compiler.hooks.emit.tapPromise('TimePlugin',(compilation,callback)=>{
            return new Promise((resolve,reject)=>{
                let assets = compilation.assets;
                compilation.chunks.forEach(chunk=>{
                // Webpack 会根据 Chunk 去生成输出的文件资源，每个 Chunk 都对应一个及其以上的输出文件
                    // 例如在 Chunk 中包含了 CSS 模块并且使用了 ExtractTextPlugin 时，
                    // 该 Chunk 就会生成 .js 和 .css 两个文件
                    chunk.files.forEach(filename=>{
                        let content = assets[filename].source();
                        content = `/* ${filename} build at ${Date.now()} */\n` + content;
                        assets[filename] = new RawSource(content);
                    });
                });
                resolve();
            });
        });
    }

}

module.exports = TimePlugin;

```

### 参考
* [写一个webpack内联代码插件](https://libin1991.github.io/2019/02/26/%E5%86%99%E4%B8%80%E4%B8%AAwebpack%E5%86%85%E8%81%94%E4%BB%A3%E7%A0%81%E6%8F%92%E4%BB%B6/)
