---
title: node commonjs原理
date: 2019-09-14 17:26:44
categories:
- 前端
tags:
- node cmd commonjs
---

## `核心思想`
```javascript
let mod = {
    exports : {

    }
}
const fn = function(exports,module,require,__filename,__dirname){
    
    this.avg = 'aaaa'
    module.exports = {
        gg : 1
    }
    exports.xxxx = {aaa : 2} //不可以这样导出 exports = {}，相当于exports指向新的引用，外部引用并没有改变   

};
fn.call(mod.exports,mod.exports,mod,__filename,__dirname)
console.log(mod.exports)
```

<!-- more -->
## `模拟实现`
```javascript
let fs = require("fs");
let path = require("path");
const vm = require("vm");

function Module(absPath) {
  this.id = absPath;
  this.exports = {};
}

const wrapper = [
  "(function(exports,module,require,__filename,__dirname){",
  "\n})"
];

Module.prototype.load = function() {
  let script = fs.readFileSync(this.id, "utf8");
  let fnStr = wrapper[0] + script + wrapper[1];
  // console.log(fnStr)
  let fn = vm.runInThisContext(fnStr);
  fn.call(this.exports,this.exports, this, req, __filename, __dirname);
};

function req(file) {
  let absPath = path.resolve(__dirname, file);
  let module = new Module(absPath);
  module.load();
  return module.exports;
}

const rest = req("./a.js");
// const rest = require("./a.js");
console.log(rest);

```

