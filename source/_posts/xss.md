---
title: xss攻略与防御
date: 2019-11-20 09:53:14
categories:
- 前端
tags:
- xss
- 安全
---
### 简介
跨站脚本（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。
XSS攻击通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是JavaScript，但实际上也可以包括Java，VBScript，ActiveX，Flash或者甚至是普通的HTML。攻击成功后，攻击者可能得到更高的权限（如执行一些操作）、私密网页内容、会话和cookie等各种内容。
<!-- more -->
### 类型
+ 存储型 XSS
    * 攻击者将恶意代码提交到目标网站的数据库中。
    * 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
    * 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
    * 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。
    * 这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。
+ 反射型 XSS
    `跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。`
    + 攻击者构造出特殊的 URL，其中包含恶意代码。
    * 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
    * 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
+ DOM型
    `不安全的javascript`
    * 攻击者构造出特殊的 URL，其中包含恶意代码。
    * 用户打开带有恶意代码的 URL。
    * 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。

### 预防
+ 输入过滤
    + 前端提交检查
    + 后端入库检查
+ 输入过滤
    + 后端输出处理
    + 前端js输出处理
+ HttpOnly Cookie

### 过滤输入输出
```JavaScript
HTMLEncode : function(str){
    //return ( str || '' ).toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\'/g,"&#39;").replace(/\"/g,"&quot;");
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str||""));
    return div.innerHTML;
},
HTMLDecode : function(str){
    //return ( str || '' ).toString().replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"\'").replace(/&quot;/g,"\"");
    var div = document.createElement('div');
    div.innerHTML = str||"";
    return div.innerText || div.textContent;
},
```