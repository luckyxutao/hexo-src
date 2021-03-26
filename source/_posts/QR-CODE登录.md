---
title: QR-CODE登录原理
date: 2021-03-26 19:51:29
tags:
---
### 扫码登录原理
* pc端请求二维码(自带token)
* 客户端ajax轮询(发送token)

### 客户端扫描
* 客户端已经登录(前提)
* 扫码得到token并将token和当前用户登录信息一块发给server
* server收到用户信息和token，将token和用户id作关联`并`登录，生成新token
* ajax轮询得到新token标志登录成功