---
title: 常见http头
date: 2019-10-28 20:24:05
categories:
- 基础
tags:
- http
- 题
---

+ 常用的http请求头
    1. Accept
        + Accept:text/html 浏览器可接受服务器返回类型为text/html
        + Accept:*/* 浏览器可以处理所有类型
    2. Accept-Encoding
    + content-type
        application/json、application/x-www-form-urlencode等
    +  `If-None-Match`
    +  `If-Mofified-Since`
        + 浏览器申明可以支持的编码方法，支持何种压缩方法(gzip、deflate)等，参见[`http压缩`](/2018/01/07/http压缩/)
    3. Connection
        + keep-alive  当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接。
        + close 代表一个Request完成后，客户端和服务器之间用于传输HTTP数据的TCP连接会关闭， 当客户端再次发送Request，需要重新建立TCP连接。
    4. User-Agent
    6. Cookie
    7. Referer
    8. Host
    9. pragma(no-store)（http1.0)
    10. Range（用于断点续传）
<!-- more -->
+ 常用的http响应头
    + content-encoding: gzip
    + content-length
    + content-encoding
    + content-type
    + Cache-Control
        + 参见[`http缓存`](/2018/01/07/http缓存/)
    + set-cookie
        + httponly
    + 缓存想关
        + Cache-Control(max-age=86400)
        + `etag`
        + `last-modified`
        + expires(http1.0)
    + status
        + 200
        + 404
        + 500
          server错误
        + 304
          没有修改
        + 302
            临时跳转
        + 301
           永久跳转
        + 403
          forbidden
    + server
        + nginx等
    + Access-Control-Allow-Origin
    + Access-Control-Allow-Methods
    + Access-Control-Allow-Credentials
        *是否允许发送cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。如果access-control-allow-origin为星，当前字段就不能为true*