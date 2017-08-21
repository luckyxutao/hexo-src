---
title: find命令最常用法
date: 2017-08-21 22:15:30
categories:
- 前端
tags:
- shell linux
- find
---

`命令行查找文件、目录还是很方便的，常用如下：`

### 精确匹配
```bash
➜  hexo-src git:(master) ✗ find ~/work/respo -name travel_touch
/Users/qitmac000321/work/respo/source-travel/fonts/travel_touch
/Users/qitmac000321/work/respo/travel_touch
```

### 正则模糊查找文件
```shell
➜  hexo-src git:(master) ✗ find ~/work/respo -name 'travel_t*' -type f
/Users/qitmac000321/work/respo/source-travel/fonts/travel_touch/1.0.1/travel_touch.ttf
/Users/qitmac000321/work/respo/source-travel/fonts/travel_touch/1.0.1/travel_touch.woff
```

### 正则模糊查找目录
```shell
➜  hexo-src git:(master) ✗ find ~/work/respo -name 'travel_t*' -type d
/Users/qitmac000321/work/respo/source-travel/fonts/travel_touch
/Users/qitmac000321/work/respo/travel_touch
```