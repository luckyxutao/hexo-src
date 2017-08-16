title: 解决NGINX返回不完整数据
date: 2016-05-16 21:17:27
categories:
- 系统
tags:
- linux
- nginx
---

**现象:**
chrome下请求不完整提示net::ERR_INCOMPLETE_CHUNKED_ENCODING,而其它浏览器没发现
<!-- more -->
**原因:**
问题就出在proxy_temp_file_write_size上，当你的文件超过该参数设置的大小时，nginx会先将文件写入临时目录(缺省为nginx安装目下/proxy_temp目录),如果nginx对prxoy_temp没有权限就会写不进去，结果就是只显示部分页面。

**错误log:**
```shell
2016/05/16 20:38:19 [crit] 608#0: *639 open() "/usr/local/var/run/nginx/proxy_temp/5/04/0000000045" failed (13: Permission denied) while reading upstream, client: 127.0.0.1, server:
```

**解决方法(mac系统,通过homebrew安装的nginx):**
```shell
sudo chown -R nobody:nobody /usr/local/var/run/nginx/proxy_temp/
```
