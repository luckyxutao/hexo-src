---
title: webpack异步代码分割简单实现
date: 2020-04-30 13:01:43
categories:
- webpack
tags:
- 原理
---

本文主要为了说明异步代码分割实现及原理，未考虑loader/插件等实现

<!-- more -->
### 异步加载原理
1. 通过`import()`语法切割文件
2. 按需通过jsonp异步请求切割的文件(同时包装成符合规范的模块)
3. jsonp成功后将chunk文件里的模块合并到modules里，供其它模块引用
步骤`2、3`是通过[`bootstrap.js`](https://github.com/luckyxutao/2020-learning/blob/master/webpack/webpack-lazyload/zfpack-template-main.ejs)来完成的，步骤`1`是我们需要实现的

### 目标及思路
* 使用webpack自带的[`bootstrap.js`](https://github.com/luckyxutao/2020-learning/blob/master/webpack/webpack-lazyload/zfpack-template-main.ejs)来充当加载器
* 我们需要生成符合bootstrap.js要求的模块文件

### 主要步骤([完整代码](https://github.com/luckyxutao/2020-learning/tree/master/webpack/webpack-lazyload))
* 从`./src/index.js`开始编译
* 开始递归编译模块得到chunks信息(根据是`import()`还是其它的)
```json
{
	"main": {
		"./src/index.js": "let button = document.createElement('button');\nbutton.innerHTML = '点我';\nbutton.addEventListener('click', () => {\n  __webpack_require__.e(\"src_hello_js\").then(__webpack_require__.t.bind(null, \"./src/hello.js\")).then(res => {\n    console.log(res.default);\n  });\n  __webpack_require__.e(\"src_world_js\").then(__webpack_require__.t.bind(null, \"./src/world.js\")).then(res => {\n    console.log(res.default);\n  });\n});\ndocument.body.appendChild(button);"
	},
	"src_hello_js": {
		"./src/hello.js": "const hello2 = __webpack_require__(\"./src/hello2.js\");\nmodule.exports = hello2;",
		"./src/hello2.js": "module.exports = 'hello2';"
	},
	"src_world_js": {
		"./src/world.js": "module.exports = 'world';"
	}
}
```
* 根据chunks生成文件
    * [mainTemplate](https://github.com/luckyxutao/2020-learning/blob/master/webpack/webpack-lazyload/zfpack-template-main.ejs)  (默认chunks,同步引用)
    * [chunkTemplate](https://github.com/luckyxutao/2020-learning/blob/master/webpack/webpack-lazyload/zfpack-template-chunk.ejs) (异步模块使用)
