---
title: http压缩
date: 2018-01-07 14:36:16
categories:
- 前端
tags:
- http 压缩
---

### 效果还是很惊人的
![](/assets/blogImg/httpzip.png)

### nginx压缩开启
```shell
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_comp_level 5;
    gzip_types text/css text/javascript application/javascript;
    include /etc/nginx/conf.d/*.conf;
}

```