---
title: webpack-prefetch插件
date: 2020-06-08 21:24:36
categories:
- webpack
tags:
- loader
- 原理
---

### 什么是prefetch？
这种“资源提示” 告诉浏览器这是一个在未来可能使用到的资源。

浏览器通常会在空闲状态取得这些资源，在取得资源之后搁在HTTP缓存以便于实现将来的请求。如果有多个‘预请求提示’则会在浏览器空闲时排队执行。当浏览器离开空闲状态时正好在‘预请求’资源，那么浏览器会取消任何正在进行中的请求（同时会将部分响应数据放置在缓存中，而在Header中继续使用Content-Range字段 ）并停止处理‘预请求’队列。

总之:在闲置时获取资源
```html
  <link rel="prefetch" href="style.css" as="style">
  <link rel="prefetch" href="main.js" as="script">
```
<!-- more -->

### webpack动态导入
我们知道webpack动态导入语法会产生代码分割，产生一个异步加载的bundle.js。懒加载可以用来优化首屏加载首屏渲染时间，但是懒加载的缺点也很明显，初次加载会有一定延迟。

### webpack中的prefetch
通过动态导入的魔法注释可以指定一个模块prefetch，生成的chunks中可以区分是否prefetch
* 魔法注释
```js
import(/* webpackPrefetch: true */ './hello');
```
* 拿到预加载模块chunkId
```js
chunk.getChildIdsByOrders().prefetch
```

### prefetch插件
* 步骤
    1. 魔法注释
    2. 监听html-webpack-plugin修改tag钩子，将prefetch的chunk加到head标签

* 实现
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
class PrefetchPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        //准备向
        // assets有source方法
        compiler.hooks.compilation.tap('PrefetchPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('PrefetchPlugin', (data, cb) => {
                let chunks = compilation.chunks;
                let tags = [];
                chunks.forEach(chunk => {
                    let prefetchChunkIds = chunk.getChildIdsByOrders().prefetch;
                    if (prefetchChunkIds) {
                        prefetchChunkIds.forEach(prefetchChunkId => {
                            let dstChunk = chunks.filter(v => v.id == prefetchChunkId)[0]
                            dstChunk.files.forEach(file => {
                                tags.push({
                                    tagName: 'link',
                                    voidTag: false,
                                    attributes: {
                                        rel: 'prefetch',
                                        href: file,
                                        as: 'script'
                                    }
                                });
                            });
                        });
                    }
                });
                data.headTags.push(...tags);
                cb(null, data)
            });
        });
    }
}
/**
 * 获取compilation
 * 知道钩子函数的参数和数据结果，加工
 * htmlWebpackPluginAlterAssetTags
 * 如何拿到chunk名称
 */
module.exports = PrefetchPlugin;


```