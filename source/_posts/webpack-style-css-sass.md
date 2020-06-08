---
title: style/css/sass工作原理
date: 2020-05-06 17:41:13
categories:
- webpack
tags:
- loader
- 原理
---

### 介绍
虽然标题是style-loader、css-loader及sass-loader，本文主要以此为例，重点介绍loader工作流程及原理。
<!-- more -->


### 执行流程
![](https://s1.ax1x.com/2020/05/17/Y20ArF.png)

### loaderContext对象
 module 一开始构建的过程中，首先会创建一个 loaderContext 对象，它和这个 module 是一一对应的关系，而这个 module 所使用的所有 loaders 都会共享这个 loaderContext 对象，每个 loader 执行的时候上下文就是这个 loaderContext 对象

![](https://s1.ax1x.com/2020/05/26/tiO4JA.png)

### loader分类
一共有4种loader，`同一种类型文件被多条rules匹配`上的话会按以下叠加顺序处理，通过`enforce`声明类型
* **post**
* **inline**
* **normal(AutoLoaders)(`默认`)**
* **pre(前置loader)**

### 控制loader加载流程
* 默认加载顺序
post(后置)->inline(内联)->normal(autoLoaders)->pre(前置)
* 控制loader加载(require路径)

| 符号 | 变量  | 含义  | 说明|
|---|---|---|---|
| -! |  noPreAutoLoaders  | post+inline | Prefixing with -! will disable all configured preLoaders and loaders but not postLoaders|
| ! |  noAutoLoaders  | pre+inline+post  | Prefixing with ! will disable all configured normal loaders|
| !! |  noPrePostAutoLoaders  | inline | Prefixing with !! will disable all configured loaders (preLoaders, loaders, postLoaders)|

### css/cass/style
![](https://s1.ax1x.com/2020/05/26/tibhin.png)
