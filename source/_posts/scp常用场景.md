title: scp常用场景
date: 2017-04-29 16:03:41
categories:
- linux
tags:
- scp
---

### 实例1：从远处复制文件到本地目录 ###
```shell
$scp root@10.6.159.xx:/opt/soft/demo.tar /opt/soft/
```
说明： 从10.6.159.xx机器上的/opt/soft/的目录中下载demo.tar 文件到本地/opt/soft/目录中

### 实例2：从远处复制目录到本地 ###
```shell
$scp -r root@10.6.159.xx:/opt/soft/test /opt/soft/
```
说明： 从10.6.159.xx机器上的/opt/soft/中下载test目录到本地的/opt/soft/目录来。

### 实例3：上传本地文件到远程机器指定目录 ###
```shell
$scp /opt/soft/demo.tar root@10.6.159.xx:/opt/soft/scptest
```
说明： 复制本地opt/soft/目录下的文件demo.tar 到远程机器10.6.159.xx的opt/soft/scptest目录

### 实例4：上传本地目录到远程机器指定目录 ###
```shell
$scp -r /opt/soft/test root@10.6.159.xx:/opt/soft/scptest
```
说明： 上传本地目录 /opt/soft/test到远程机器10.6.159.147上/opt/soft/scptest的目录中