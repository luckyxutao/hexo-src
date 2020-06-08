---
title: webpack打包sass相对路径问题
date: 2020-04-18 08:17:41
categories:
- webpack
tags:
- loader
- 原理
---
### 现象
webpack打包错误，提示找不到路径所在图片，并不是未引用url-loader等情况。
<!-- more -->
```shell
ERROR in ./src/index.scss
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
ModuleNotFoundError: Module not found: Error: Can't resolve '../../assets/down_bg.png' in '/Users/xutao/work/demos/2020-lcs/src'
```
### 目录说明
* 说明
    * ./index.scss通过`@import`引入了./styles/download/index.scss
    * ./styles/download/index.scss里通过`相对路径`引用了图片
* 目录结构
```shell
➜  2020-lcs git:(master) ✗ tree ./src 
./src
├── assets
│   ├── `**down_bg.png**`
│   ├── down_btn_adr.png
│   ├── down_btn_ios.png
│   ├── down_guide.png
│   └── down_ico.png
├── index.jsx
├── `**index.scss**`
├── scripts
│   ├── pages
│   │   ├── download
│   │   │   └── index.jsx
│   │   └── registration
│   │       ├── CreateButton.jsx
│   │       ├── EmailForm.jsx
│   │       ├── PhoneForm.jsx
│   │       ├── TabBar.jsx
│   │       └── index.jsx
│   └── utils
│       └── responsive.js
└── styles
    ├── common.scss
    ├── download
    │   └── `**index.scss**`
    └── registration
        └── index.scss
```

### 解决办法
将./styles/download/index.scss里资源路径改为 `以引入方(./index.scss)所在目录为基准点`，再使用相对的路径，看起来是很别扭
```scss
    //styles/download/index.scss
    background:url(./assets/down_bg.png) no-repeat;
```

### 根本原因
[`Problems with url(...)`](https://webpack.js.org/loaders/sass-loader/#problems-with-url)
1. sass-loader及sass预处理器`未能正确`处理@import依赖里`相对路径`
2. 只是机械的将依赖资源合并到当前文件，@import替换为了require
3. 以上操作会导致后期webapck在处理路径时发生错位


### loader处理后文件
* 打包失败的(./index.scss)
`var ___CSS_LOADER_URL_IMPORT_0___ = require("../../assets/down_bg.png");`
```js
// Imports
var ___CSS_LOADER_API_IMPORT___ = require("../node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = require("-!../node_modules/css-loader/dist/cjs.js!antd-mobile/dist/antd-mobile.css");
var ___CSS_LOADER_GET_URL_IMPORT___ = require("../node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = require("../../assets/down_bg.png");
var ___CSS_LOADER_URL_IMPORT_1___ = require("./assets/down_btn_ios.png");
var ___CSS_LOADER_URL_IMPORT_2___ = require("./assets/down_btn_adr.png");
var ___CSS_LOADER_URL_IMPORT_3___ = require("./assets/down_guide.png");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
// Module
exports.push([module.id, "@charset \"UTF-8\";\n/* 移动端页面设计稿宽度 */\n/* 移动端页面设计稿dpr基准值 */\n/* 单位px转化为vw */\n/* 根元素大小使用 vw 单位 */\nhtml {\n  /* 同时，通过Media Queries 限制根元素最大最小值 */ }\n  @media screen and (max-width: 320px) {\n    html {\n      font-size: 64px; } }\n  @media screen and (min-width: 750px) {\n    html {\n      font-size: 150px; } }\n\nbody {\n  max-width: 750px;\n  min-width: 320px;\n  margin: 0 auto; }\n\n.page-root-download {\n  font-size: 100vw;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat;\n  height: 100vh;\n  background-size: 100%; }\n  .page-root-download .logo {\n    width: 100vw;\n    height: 44vw;\n    padding-top: 36.4vw;\n    display: flex;\n    justify-content: center; }\n    .page-root-download .logo .pic {\n      width: 33.6vw;\n      object-fit: cover; }\n  .page-root-download .bottom {\n    margin-top: 29.33333vw; }\n    .page-root-download .bottom .row {\n      display: flex;\n      justify-content: center;\n      margin-top: 6.4vw; }\n    .page-root-download .bottom .btn {\n      width: 84vw;\n      height: 13.6vw;\n      background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") 0 0 no-repeat;\n      background-size: 100%; }\n      .page-root-download .bottom .btn-adr {\n        background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + "); }\n  .page-root-download .mask {\n    position: absolute;\n    height: 100%;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.7);\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0; }\n    .page-root-download .mask .pic {\n      position: absolute;\n      top: 12.4vw;\n      right: 11.06667vw;\n      width: 68.93333vw;\n      height: 76vw;\n      background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n      background-size: 100%; }\n\n.page-root-registration {\n  background-color: #1B072E;\n  height: 100vh; }\n  .page-root-registration .white {\n    color: #fff; }\n  .page-root-registration .header {\n    padding-left: 2.93333vw;\n    align-items: center;\n    display: flex;\n    color: #fff;\n    height: 11.73333vw; }\n    .page-root-registration .header .left {\n      font-size: 2.66667vw; }\n    .page-root-registration .header .title {\n      margin-left: -2.66667vw;\n      font-size: 4.8vw; }\n    .page-root-registration .header .main {\n      display: flex;\n      justify-content: center;\n      flex: 1; }\n  .page-root-registration .tab-area .am-tabs .am-tabs-pane-wrap {\n    overflow: hidden; }\n  .page-root-registration .tab-area .am-tabs-tab-bar-wrap .am-tabs-default-bar {\n    background-color: transparent !important; }\n    .page-root-registration .tab-area .am-tabs-tab-bar-wrap .am-tabs-default-bar-tab {\n      color: rgba(255, 255, 255, 0.5) !important; }\n    .page-root-registration .tab-area .am-tabs-tab-bar-wrap .am-tabs-default-bar-tab-active {\n      color: #fff !important; }\n    .page-root-registration .tab-area .am-tabs-tab-bar-wrap .am-tabs-default-bar-underline {\n      border-color: #fff !important; }\n  .page-root-registration .tab-area .txt-ipt {\n    width: 100%;\n    height: 10.8vw;\n    color: #6F5B78;\n    font-size: 3.46667vw;\n    display: flex;\n    align-items: center; }\n    .page-root-registration .tab-area .txt-ipt-sms {\n      display: flex;\n      align-items: center; }\n      .page-root-registration .tab-area .txt-ipt-sms input {\n        flex: 1; }\n      .page-root-registration .tab-area .txt-ipt-sms .button-send-sms {\n        display: flex;\n        align-items: center;\n        height: 100%; }\n        .page-root-registration .tab-area .txt-ipt-sms .button-send-sms .retry {\n          margin-left: 0.8vw; }\n    .page-root-registration .tab-area .txt-ipt input {\n      height: 100%;\n      width: 100%;\n      background-color: transparent;\n      border: 0 none;\n      border-bottom: solid 1px #342146; }\n    .page-root-registration .tab-area .txt-ipt-phone {\n      border-bottom: solid 1px #342146; }\n      .page-root-registration .tab-area .txt-ipt-phone input {\n        border: 0 none;\n        border-left: solid 1px #342146;\n        margin-left: 1.33333vw;\n        padding-left: 1.33333vw; }\n    .page-root-registration .tab-area .txt-ipt-country {\n      border-bottom: solid 1px #342146; }\n      .page-root-registration .tab-area .txt-ipt-country-button {\n        display: flex;\n        align-items: center;\n        font-size: 3.46667vw;\n        color: #fff; }\n  .page-root-registration .tab-area .txt-ipt:nth-last-child(1) input {\n    border-bottom: 0 none; }\n  .page-root-registration .tab-area .form-top {\n    display: flex;\n    flex-direction: column;\n    margin: 0 4.8vw;\n    margin-top: 5.2vw;\n    padding: 0.66667vw 1.33333vw;\n    border: solid 1px #342146;\n    border-radius: 1.06667vw; }\n  .page-root-registration .tab-area .form-create {\n    padding: 0 4.8vw;\n    margin-top: 16vw; }\n    .page-root-registration .tab-area .form-create-tip {\n      margin-top: 2.8vw;\n      font-size: 2.93333vw;\n      color: #7F2FCB;\n      text-align: center; }\n    .page-root-registration .tab-area .form-create-button {\n      height: 10.66667vw;\n      color: #fff;\n      font-size: 4.8vw;\n      background-color: #5E1A9F;\n      display: flex;\n      align-items: center;\n      justify-content: center; }\n  .page-root-registration .tab-area .form-bottom {\n    padding: 0 4.8vw;\n    margin-top: 15.33333vw; }\n    .page-root-registration .tab-area .form-bottom .label {\n      color: #fff;\n      font-size: 2.4vw; }\n    .page-root-registration .tab-area .form-bottom .txt-ipt {\n      border-bottom: solid 1px #342146;\n      border-top: solid 1px #342146;\n      margin-top: 3.6vw; }\n", ""]);
// Exports
module.exports = exports;
```
* 正确的(./index.scss)
`var ___CSS_LOADER_URL_IMPORT_0___ = require("./assets/down_bg.png");`
```js
//./src/index.scss经过sass处理后的文件
var ___CSS_LOADER_API_IMPORT___ = require("../node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = require("-!../node_modules/css-loader/dist/cjs.js!antd-mobile/dist/antd-mobile.css");
var ___CSS_LOADER_GET_URL_IMPORT___ = require("../node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = require("./assets/down_bg.png");
var ___CSS_LOADER_URL_IMPORT_1___ = require("./assets/down_btn_ios.png");
var ___CSS_LOADER_URL_IMPORT_2___ = require("./assets/down_btn_adr.png");
var ___CSS_LOADER_URL_IMPORT_3___ = require("./assets/down_guide.png");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
// Module
exports.push([module.id, "@charset \"UTF-8\";\n/* 移动端页面设计稿宽度 */\n/* 移动端页面设计稿dpr基准值 */\n/* 单位px转化为vw */\n/* 根元素大小使用 vw 单位 */\nhtml {\n  /* 同时，通过Media Queries 限制根元素最大最小值 */ }\n  @media screen and (max-width: 320px) {\n    html {\n      font-size: 64px; } }\n  @media screen and (min-width: 750px) {\n    html {\n      font-size: 150px; } }\n\nbody {\n  max-width: 750px;\n  min-width: 320px;\n  margin: 0 auto; }\n\n.page-root-download {\n  font-size: 100vw;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat;\n  height: 100vh;\n  background-size: 100%; }\n  .page-root-download .logo {\n    width: 100vw;\n    height: 44vw;\n    padding-top: 36.4vw;\n    display: flex;\n    justify-content: center; }\n    .page-root-download .logo .pic {\n      width: 33.6vw;\n      object-fit: cover; }\n  .page-root-download .bottom {\n    margin-top: 29.33333vw; }\n    .page-root-download .bottom .row {\n      display: flex;\n      justify-content: center;\n      margin-top: 6.4vw; }\n    .page-root-download .bottom .btn {\n      width: 84vw;\n      height: 13.6vw;\n      background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") 0 0 no-repeat;\n      background-size: 100%; }\n      .page-root-download .bottom .btn-adr {\n        background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + "); }\n  .page-root-download .mask {\n    position: absolute;\n    height: 100%;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.7);\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0; }\n    .page-root-download .mask .pic {\n      position: absolute;\n      top: 12.4vw;\n      right: 11.06667vw;\n      width: 68.93333vw;\n      height: 76vw;\n      background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n      background-size: 100%; }\n\n.page-root-registration {\n  background-color: #1B072E;\n  height: 100vh; }\n  .page-root-registration .white {\n    color: #fff; }\n  .page-root-registration .header {\n    padding-left: 2.93333vw;\n    align-items: center;\n    display: flex;\n    color: #fff;\n    height: 11.73333vw; }\n    .page-root-registration .header .left {\n      font-size: 2.66667vw; }\n    .page-root-registration .header .title {\n      margin-left: -2.66667vw;\n      font-size: 4.8vw; }\n    .page-root-registration .header .main {\n      display: flex;\n      justify-content: center;\n      flex: 1; }\n  .page-root-registration .tab-area .am-tabs .am-tabs-pane-wrap {\n    overflow: hidden; }\n  .page-root-registration .tab-area .am-tabs-tab-bar-wrap .am-tabs-default-bar {\n    background-color: transparent !important; }\n    .page-root-registration .tab-area .am-tabs-tab-bar-wrap .am-tabs-default-bar-tab {\n      color: rgba(255, 255, 255, 0.5) !important; }\n    .page-root-registration .tab-area .am-tabs-tab-bar-wrap .am-tabs-default-bar-tab-active {\n      color: #fff !important; }\n    .page-root-registration .tab-area .am-tabs-tab-bar-wrap .am-tabs-default-bar-underline {\n      border-color: #fff !important; }\n  .page-root-registration .tab-area .txt-ipt {\n    width: 100%;\n    height: 10.8vw;\n    color: #6F5B78;\n    font-size: 3.46667vw;\n    display: flex;\n    align-items: center; }\n    .page-root-registration .tab-area .txt-ipt-sms {\n      display: flex;\n      align-items: center; }\n      .page-root-registration .tab-area .txt-ipt-sms input {\n        flex: 1; }\n      .page-root-registration .tab-area .txt-ipt-sms .button-send-sms {\n        display: flex;\n        align-items: center;\n        height: 100%; }\n        .page-root-registration .tab-area .txt-ipt-sms .button-send-sms .retry {\n          margin-left: 0.8vw; }\n    .page-root-registration .tab-area .txt-ipt input {\n      height: 100%;\n      width: 100%;\n      background-color: transparent;\n      border: 0 none;\n      border-bottom: solid 1px #342146; }\n    .page-root-registration .tab-area .txt-ipt-phone {\n      border-bottom: solid 1px #342146; }\n      .page-root-registration .tab-area .txt-ipt-phone input {\n        border: 0 none;\n        border-left: solid 1px #342146;\n        margin-left: 1.33333vw;\n        padding-left: 1.33333vw; }\n    .page-root-registration .tab-area .txt-ipt-country {\n      border-bottom: solid 1px #342146; }\n      .page-root-registration .tab-area .txt-ipt-country-button {\n        display: flex;\n        align-items: center;\n        font-size: 3.46667vw;\n        color: #fff; }\n  .page-root-registration .tab-area .txt-ipt:nth-last-child(1) input {\n    border-bottom: 0 none; }\n  .page-root-registration .tab-area .form-top {\n    display: flex;\n    flex-direction: column;\n    margin: 0 4.8vw;\n    margin-top: 5.2vw;\n    padding: 0.66667vw 1.33333vw;\n    border: solid 1px #342146;\n    border-radius: 1.06667vw; }\n  .page-root-registration .tab-area .form-create {\n    padding: 0 4.8vw;\n    margin-top: 16vw; }\n    .page-root-registration .tab-area .form-create-tip {\n      margin-top: 2.8vw;\n      font-size: 2.93333vw;\n      color: #7F2FCB;\n      text-align: center; }\n    .page-root-registration .tab-area .form-create-button {\n      height: 10.66667vw;\n      color: #fff;\n      font-size: 4.8vw;\n      background-color: #5E1A9F;\n      display: flex;\n      align-items: center;\n      justify-content: center; }\n  .page-root-registration .tab-area .form-bottom {\n    padding: 0 4.8vw;\n    margin-top: 15.33333vw; }\n    .page-root-registration .tab-area .form-bottom .label {\n      color: #fff;\n      font-size: 2.4vw; }\n    .page-root-registration .tab-area .form-bottom .txt-ipt {\n      border-bottom: solid 1px #342146;\n      border-top: solid 1px #342146;\n      margin-top: 3.6vw; }\n", ""]);
// Exports
module.exports = exports;

```
