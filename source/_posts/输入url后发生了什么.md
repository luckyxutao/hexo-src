---
title: 输入url后发生了什么
date: 2020-03-29 16:57:18
categories:
- 前端
---

### DNS域名解析找到ip
* 先看dns缓存有无
* 看host有没有绑定
* nslookup等找到域名服务商解析ip

<!-- more -->

### 根据ip判断是否是网段内，还是外部网络
### 通过arp协议找到网关
### 找到对方服务器ip
### 通过三次握手建立tcp传输链路
* “三次握手”的目的是“为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误

### 发http请求报文(4部分)
* 请求行
    * GET /api/34?a=2  http1.1
* 请求头
    * Accept/text/html
    * Accept-Encoding
    * If-none-match
    * If-modified-sinced
    * Refer
    * Host
    * cookie
    * Connection:keep-alive
    * Content-type:application/json
* 空行
* 请求body
    * a=1&b=2
### 服务器处理响应（4部分）
* 响应行
    * 302
* 响应头
    * content-type
    * content-length
    * content-encoding
    * set-cookie
    * cache-control
    * eTag
    * last-modified
    * Access-control-allow-control
* 空行
* 响应body

### 缓存到浏览器
### 接收完毕是否要close, keep-alive则会不关闭

### 浏览器渲染
* 主要步骤
    * 处理 HTML 标记并构建 DOM 树。
    * 处理 CSS 标记并构建 CSSOM 树。
    * 将 DOM 与 CSSOM 合并成一个渲染树。
    * 根据渲染树来布局，以计算每个节点的几何信息。
    * 将各个节点绘制到屏幕上。
* 注
    1. CSSOM和DOM是并行构建的，但是renderTree需要等它们两个都完成才会构建
    2. 构建DOM过程中遇到script标签后会暂停dom构建，并执行脚本，如果此时cssom尚未完成，脚本会待cssom完成时，继续执行脚本完成dom树
    3. CSS会阻塞渲染