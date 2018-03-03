---
title: linux之umask
date: 2018-01-14 21:53:02
categories:
- linux
tags:
- umask
---

umask 文件、目录默认权限掩码
文件最高666 rw-rw-rw-
目录最高777 rwxrwxrwx


假如:umask是022

则默认目录权限是:
777-022  755 (rwxr-xr-x)
文件:
666-022 644（rw-r--r--)