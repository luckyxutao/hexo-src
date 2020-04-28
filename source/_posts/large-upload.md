---
title: 实现一个大文件上传和断点续传
date: 2020-04-18 06:10:57
categories:
- 前端
tags:
- node
- upload
- hot
---

片上传、断点续传，这两个名词对于做过或者熟悉文件上传的朋友来说应该不会陌生。之所有有这边文章，还是因为自己在网上浏览了一些文章后发现没有找到一篇能瞬间明白原理和实现的，因此决定自己写一篇文章，方便有需要的朋友了解原理和实现。
<!-- more -->
### 原理
* client/server约定一致和切片策略
* 上传前client切片并计算hash
* 调接口获取该文件上传信息（传完整，传输部分成功，未上传过）
* 过滤掉传过的切片再发服务器

### demo工程
`源码很容易阅读` [https://github.com/luckyxutao/2020-learning/tree/master/file-upload](https://github.com/luckyxutao/2020-learning/tree/master/file-upload)

![](https://ftp.bmp.ovh/imgs/2020/04/000ed063dbd8b467.png)


### 项目特点与说明
* typescript(client/server)
* server
    * nodejs+express
    * 流式处理上传文件
* client
    * create-react-app + antd
    * hash计算放在了serviceWorker里

### 实现了大文件分片上传
* 前端对File(继承自Blob)进行切片
* 对File计算生成hash,文件名
* 发请求上传切片，nodejs采用流方式接收数据
* 切片上传完后，前端请求后端合并文件

### 实现秒上传
* 确认文件是否存在

### 实现了断点续上传
刷新页面或暂停后恢复，已上传切片可以复用
* 串行方式上传（并行上传最多并发6个请求，其它排队等，相比串行上传无明显优势）
* 某个切片上传中断，刷新页面或者点按钮恢复后，从该切片上传（该切片从0开始，无法复用）
* 步骤
    * 前端上传前请求sever,是否有已上传成功部分
    * 过滤掉已上传过切片
    * 发请求
