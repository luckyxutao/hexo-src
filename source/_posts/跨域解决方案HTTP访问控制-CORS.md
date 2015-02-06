title: 跨域解决方案HTTP访问控制(CORS)
date: 2015-01-31 21:40:04
categories:
- 前端
tags:
- javascript
---
CORS是XMLHttpRequest Level 2中新增加的功能
大家也知道，XMLHttpRequest接口是Ajax的根本，而Ajax考虑到安全性的问题，是禁止跨域访问资源的。
也就是说：www.a.com的页面无法通过Ajax来调用www.b.com的资源。
很多人又会说，但jQuery的$.ajax()明明就可以跨域访问啊！
对，的确是跨了，但那是jsonp！关于jsonp的介绍也很多了，这里不扯。
其实jQuery的$.ajax()方法中，也可以实现CORS，只要服务器端配合，跨域就不需要使用jsonp。
 <!-- more -->


移动端的开发，除了Opera Mini还不支持，其他设备的版本支持情况也很好。

##好了，下面进入实战，直接说说使用方法。
我用的是Nodejs+Expressjs的方案，原理都是一样的

server端

```javascript
//get请求
router.get('/getUsers/:uid', function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://xxx.aaaa.com");
 	res.json({ message: 'hooray! welcome to our api!' });  
});
//post请求
router.post('/getUsers/', function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://xxx.aaaa.com");
 	res.json({ message: req.body.uid + '! welcome to our apiii2242!' });  
});
```

客户端

```javascript
$.ajax({
	url: '/getusers/',
	data :{
		uid : 29
	},
	type : 'POST'
})
.done(function(json) {
	$('.msg').html(json.message)
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});
```
不需要使用JSONP(不支持post请求),get、post请求都支持。

 ###兼容性
![](/assets/blogImg/2015-1-31-cros.png)
支持情况还算良好(假如无视IE的话)。
