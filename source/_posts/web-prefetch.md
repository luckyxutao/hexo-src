---
title: 使用web预加载技术优化你的应用
date: 2020-05-09 07:08:39
tags:
---

### preload
优先加载的资源，preload 是告诉浏览器页面`必定`需要的资源，浏览器一定会加载这些资源；如：字体文件
<!-- more -->
### prefetch
优先级较低，prefetch 是告诉浏览器页面`可能`需要的资源，浏览器不一定**会加载这些资源。如：webpack动态导入的分割代码


### DNS预加载
DNS prefetching 允许浏览器在用户浏览页面时在后台运行 DNS 的解析。如此一来，DNS 的解析在用户点击一个链接时已经完成，所以可以减少延迟。
```html
<link rel="dns-prefetch" href="http://www.spreadfirefox.com/">
```
<!-- more -->
### Preconnect
preconnect 允许浏览器在一个 HTTP 请求正式发给服务器前预先执行一些操作，这包括 DNS 解析，TLS 协商，TCP 握手，这消除了往返延迟并为用户节省了时间。
"Preconnect 是优化的重要手段，它可以减少很多请求中的往返路径 —— 在某些情况下可以减少数百或者数千毫秒的延迟。—— lya Grigorik"
```html
<link href="https://cdn.domain.com" rel="preconnect" crossorigin>
```

### Prerendering
Prerendering 和 prefetching 非常相似，它们都优化了可能导航到的下一页上的资源的加载，区别是 prerendering 在后台渲染了整个页面，整个页面所有的资源。如下：
```html
<link rel="prerender" href="https://www.keycdn.com">
```

### 参考&引用 
* [什么是 Preload，Prefetch 和 Preconnect？](https://github.com/fi3ework/blog/issues/32)
* [用 preload 预加载页面资源](https://zhuanlan.zhihu.com/p/33759023#:~:text=%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86preload%20%E5%92%8Cprefetch,%E4%B8%80%E5%AE%9A%E4%BC%9A%E5%8A%A0%E8%BD%BD%E8%BF%99%E4%BA%9B%E8%B5%84%E6%BA%90%E3%80%82)
