title: 浏览器cookie读取差异
date: 2015-01-10 21:31:42
tags:
---

这三种浏览器对cookie的path信息的存储与操作是不同的


比如，访问http://www.example.com/api/index.html

服务器的Set-Cookie头没有设置path信息，

Set-Cookie: firstcookie=value; expires=Wed, 14-Apr-2010 08:08:35 GMT; domain=.example.com



三种浏览器在存储cookie时候，对path值的存储是不一样的。

其中IE6和firefox都是把path存储成"/api/"，chrome存储成"/api"。


对"/api"这样的path，三种浏览器的操作又是不一样的。

下次访问http://www.example.com/api2.php，IE6认为是符合path的，

在这次访问里会把之前存储的cookie送往服务器。

而firefox和chrome则把"/api"与"/api/"当作一样的处理，

不会match http://www.example.com/api2.php这样的访问。

而是match http://www.example.com/api/index2.html