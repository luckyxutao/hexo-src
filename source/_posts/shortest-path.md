---
title: d3-最短路径问题
date: 2021-02-05 20:26:08
categories:
- 算法
tags:
- d3
- 算法
---

### D3最短路径
* [Dijkstra on node-link diagram](https://bl.ocks.org/fabiovalse/03d07b071257987add9a7ba28a4befb5)

<!-- more -->

### dijistra算法
* [漫画：什么是 “图”？](https://mp.weixin.qq.com/s?__biz=MzIxMjE5MTE1Nw==&mid=2653197523&idx=2&sn=893c01a31446d3c479c312836ae83819&chksm=8c99e609bbee6f1fb0df2fb60edb8fba5166b49ef200ab8fb3af4ff144b3f96b283a34ff776c&mpshare=1&scene=23&srcid=#rd)
    * 邻接表
* [漫画：图的 “最短路径” 问题](https://mp.weixin.qq.com/s?__biz=MzIxMjE5MTE1Nw==&mid=2653197626&idx=1&sn=fca7472af006a7f8890ee84ad7cf1116&chksm=8c99e7e0bbee6ef6faa1a34160a5e135503425e37552e90dfca2fbc10f223dbf3b875e84e418&scene=21#wechat_redirect)
* [漫画：Dijkstra 算法的优化](https://mp.weixin.qq.com/s?__biz=MzIxMjE5MTE1Nw==&mid=2653197794&idx=1&sn=8286ba52dd8e909197324148ffe6b7d7&chksm=8c99e738bbee6e2e16332dea4c5daef34dc2db6166149244c5406b1042c46d166e83e2e6f2df&scene=21#wechat_redirect)


### 多条相同路径(基于dijkstra)
* https://www.mmuaa.com/post/8a34f8ee19456510.html
* https://blog.csdn.net/liu16659/article/details/90180469

### 求路径策略
* 给每幅图生成一个graphId
* 以graphId为键，存储dijistra计算结果(中心点到所有节点最短路径)->前驱数组
    * 如果graphId计算过则走缓存，否则重新计算路径
* 通过前驱列表，回溯查找某个节点最短路径nodeIds
* 根据节点路径nodeIds求得linkIds

### D3渲染路径
* 渲染节点或边时，判断当前id是否在shortest_path_ids数据里