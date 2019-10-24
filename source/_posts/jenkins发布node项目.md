---
title: jenkins发布node项目
date: 2018-06-02 14:48:14
tags:
---

### 安装

```shell
brew install jenkins
```
<!-- more -->
### 基本步骤

1. 安装推荐的常用插件，主要有[Publish over SSH](https://wiki.jenkins.io/display/JENKINS/Publish+Over+SSH+Plugin)、[Github Plugin](https://wiki.jenkins.io/display/JENKINS/Github%20Plugin)、[NodeJS Plugin](https://wiki.jenkins.io/display/JENKINS/NodeJS+Plugin)

2. 系统设置中添加Publish Over SSH的服务器、可以免密码登录或用户名密码，确认测试链接成功。

   1. Path to key : /Users/xxxxxx/.ssh/id_rsa , 不要写.pub

      ![](/assets/blogImg/jenkins_add_server.png)

   2. 服务器已经配置过免密码登录了,直接点测试连通性。如果配置免密码登录会在近期专门写一篇文章

3. 全局工具配置中，找到NodeJS,安装,并设置个别名

   ![](/assets/blogImg/jenkins_nodejs.png)

4. 新建一个自由风格的项目

    1. 设置仓库地址

       ![](/assets/blogImg/jekins_1.png)

   	2. 配置job的node环境

       ![](/assets/blogImg/jenkins_2.png)

   	3. 配置构建环境，打包命令、及压缩等

       ![](/assets/blogImg/jenkins_3.png)

   	4. 配置在远程用品执行的部署命令等

       ![](/assets/blogImg/jenkins_4.png)

