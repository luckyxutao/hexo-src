---
title: http缓存
date: 2018-01-07 12:01:13
categories:
- 前端
tags:
- http cache
---

> * cache-control说明
> * http缓存请求流程
> * 缓存策略
> * nginx缓存配置
> * 缓存和刷新的关系


<!-- more -->

### 缓存请求指令
客户端可以在HTTP请求中使用的标准 Cache-Control 指令。
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)
### 缓存响应指令
服务器可以在响应中使用的标准 Cache-Control 指令。
### nginx缓存配置 ###
![](/assets/blogImg/缓存.png)
![](/assets/blogImg/协商缓存.png)
`nginx配置`
```shell
    server {
        listen 80;
        server_name q.xxxxxx.com;
        add_header Access-Control-Allow-Origin *;

        location ~* \.(css|js)$ {
            root   /usr/share/nginx/html;
            #不允许浏览器强制缓存，每次都去协商缓存根据,request提供If-Modified-Since及If-None-Match,供决策,是304or200
            expires 0;
            ##允许http cache-control 10天，允许客户端强制缓存-->协商缓存-->拉取，本地没有再取server
            # expires 10d;
        }
        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            # proxy_pass http://xxxxxx.com;
        }
    }
```
### http缓存请求流程
我们可以看到两类缓存规则的不同，强制缓存如果生效，不需要再和服务器发生交互，而对比缓存不管是否生效，都需要与服务端发生交互。

两类缓存规则可以同时存在，强制缓存优先级高于对比缓存，也就是说，当执行强制缓存的规则时，如果缓存生效，直接使用缓存，不再执行对比缓存规则。
`初次请求`
![](/assets/blogImg/httpcache1.webp)
`后续请求`
![](/assets/blogImg/httpcache2.webp)

### 缓存策略
有些资源是很长时间不会改变的，比如网站的 logo 图片、jQuery 库、字体等，因此可以为它们设定「永不过期」的缓存时间，例如设定为 10 年。

### cache-control说明
`Expires`
　　Expires的值为服务端返回的到期时间，即下一次请求时，请求时间小于服务端返回的到期时间，直接使用缓存数据。不过Expires 是HTTP 1.0的东西，现在默认浏览器均默认使用HTTP 1.1，所以它的作用基本忽略。

`Cache-Control`
![](/assets/blogImg/http_cache_interpet.png)
`参考文章`
[彻底弄懂HTTP缓存机制及原理](https://mp.weixin.qq.com/s?__biz=MzIwNTc4NTEwOQ==&mid=2247484185&idx=1&sn=6f39d612bc70ef9e8cde3827b0321163)

### 缓存和刷新关系

f5(mac平台Command+R)和地址栏输入是相同的，会优先从本地缓存找

ctrl+f5(mac平台硬性重新加载Shift+Command+R)会跳过缓存，直接发送请求到服务器