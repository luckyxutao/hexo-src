title: 前端调试利器---nproxy
date: 2015-02-01 11:03:56
categories:
- 前端
tags:
- nproxy
- fiddler
- 代理
---

前言：习惯了在windows环境中使用Fiddler的童鞋们，是不是感觉它的网络重定向功能很酷，Fiddler能按照你设置的规制捕获网络请求，再指向本地文件，如拦截你的js文件到本地，就能很快的调试线上环境（如后台环境，测试环境，预上线环境等）。但是Fiddler的使用对于初学者来说还是稍有困难的，界面功能很多，导致新手无从下手。（我当初就是这样的），并且Fiddler虽然有Mac版本，但是问题很多，我试了好几次都不行。

正文：今天给大家介绍一款新的神器，**nproxy.它能通吃windows,linux.mac平台。而且使用及其简单。一个配置文件就搞定了**。
<!-- more -->
安装：使用npm安装即可
```shell
npm install -g nproxy
```
用法：在replace_rule.js中设置你要重定向的文件路径即可，然后如下执行
```shell
nproxy -l replace_rule.js
```
replace_rule.js示例：
```javascript
module.exports = [
 
  // 1. replace single file with local one
  {
    pattern: 'homepage.js',      // Match url you wanna replace
    responder:  "/home/goddyzhao/workspace/homepage.js"
  },
 
  // 2. replace single file with web file
  {
    pattern: 'homepage.js',      // Match url you wanna replace
    responder:  "http://www.anotherwebsite.com/assets/js/homepage2.js"
  },
 
  // 3. replace combo file with src with absolute file path
  {
    pattern: 'group/homepageTileFramework.*.js',
    responder: [
      '/home/goddyzhao/workspace/webapp/ui/homepage/js/a.js',
      '/home/goddyzhao/workspace/webapp/ui/homepage/js/b.js',
      '/home/goddyzhao/workspace/webapp/ui/homepage/js/c.js'
    ]
  },
 
  // 4. replace combo file with src with relative file path and specified dir
  {
    pattern: 'group/homepageTileFramework.*.js',
    responder: {
      dir: '/home/goddyzhao/workspace/webapp/ui/homepage/js',
      src: [
        'a.js',
        'b.js',
        'c.js'
      ]
    }
  },
 
  // 5. Map server image directory to local image directory
  {
    pattern: 'ui/homepage/img',  // must be a string
    responder: '/home/goddyzhao/image/' //must be a absolute directory path
  },
 
  // 6. Write responder with regular expression variables like $1, $2
  {
    pattern: /https?:\/\/[\w\.]*(?::\d+)?\/ui\/(.*)_dev\.(\w+)/,
    responder: 'http://localhost/proxy/$1.$2'
  },
 
  // 7. Map server image directory to local image directory with regular expression
  // This simple rule can replace multiple directories to corresponding locale ones
  // For Example,
  //   http://host:port/ui/a/img/... => /home/a/image/...
  //   http://host:port/ui/b/img/... => /home/b/image/...
  //   http://host:port/ui/c/img/... => /home/c/image/...
  //   ...
  {
    pattern: /ui\/(.*)\/img\//,
    responder: '/home/$1/image/'
  }
];
```

###nproxy参数说明：

Options:
 
  -h, --help         output usage information
  -V, --version      output the version number
  -l, --list [list]  Specify the replace rule file
  -p, --port [port]  Specify the port nproxy will listen on(8989 by default)
  -t, --timeout [timeout] Specify the request timeout (5 seconds by default)
改变默认监听端口：因为要捕获网络请求，nproxy必然会监听请求地址和请求端口，它默认的监听端口为8989，你可以通过-p参数来设置，如

```shell
nproxy -l replace_rule.js  -p 8181
```
即可改变监听的端口。

 浏览器代理设置：代理地址为127.0.0.1 端口即为你要监听的端口，如8181.至于怎么设置浏览器的代理，请百度就知道了。**Mac Chrome可以使用SwitchSharp设置代理**

通过以上步骤，你就搭建起了前端调试环境。可以方便的直接调用后端的接口，而不用在本地造一大堆假数据了。是不是很方便了？

现在就来试试吧！

