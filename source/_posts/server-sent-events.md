title: server-sent-events
date: 2017-08-17 10:46:45
categories:
- 协议
tags:
- sse http
---

**推荐一篇阮一峰老师的[server sent events](http://www.ruanyifeng.com/blog/2017/05/server-sent_events.html) **

`Server Sent Events是一种全新的HTML5服务器推送事件技术,主要有以下特点`

> * SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
> * SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
> * SSE 默认支持断线重连，WebSocket 需要自己实现。
> * SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
> * SSE 支持自定义发送的消息类型。 

<!-- more -->
### 效果
![](/assets/blogImg/sse-pic2.png)
![](/assets/blogImg/sse-pic1.png)
### 兼容性
ie/edge系列不支持,[兼容性点这里](http://caniuse.mojijs.com/Home/Html/item/key/eventsource/index.html)

### 服务器端实现
需要配置以下header参数:
`Content-Type: text/event-stream`
`Cache-Control: no-cache`
`Connection: keep-alive`

```javascript
/* GET home page. */
router.get('/stream', function(req, res, next) {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control':'no-cache', //不允许缓存
      'Connection':'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: " + (new Date()) + "\n\n");

    let interval = setInterval(function () {
      // res.write("data: " + (new Date()) + "\n\n"); 
      res.write("event:onTimeChanged\n");//自定义事件，client通过监听onTimeChanged来接收消息
      res.write(":This is a Comment\n");//注释
      let obj = {
        foo : new Date().getTime(),
        name : 'xutao'
      }
      res.write("data: "+JSON.stringify(obj)+"\n\n")
    }, 1000);

    req.connection.addListener("close", function () {
      clearInterval(interval);
    }, false);
});
```
### client端实现
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
<div id="btn-close">停止请求</div>
<div id="example"></div>
<script>
  var source = new EventSource('http://127.0.0.1:3000/stream');
  var div = document.getElementById('example');
  var btn_close = document.getElementById('btn-close');
  btn_close.addEventListener('click', function (event) {
     source.close();
  }, false);
  source.onopen = function (event) {
    div.innerHTML += '<p>Connection open ...</p>';
  };
  
  source.onerror = function (event) {
    div.innerHTML += '<p>Connection close.</p>';
  };
  
  source.addEventListener('connecttime', function (event) {
    div.innerHTML += ('<p>Start time: ' + event.data + '</p>');
  }, false);
  
  source.addEventListener('onTimeChanged',function(event){//接收自定义事件，默认是onmessage
    let jsonDat = JSON.parse(event.data);
    div.innerHTML += ('<p>Ping: ' + jsonDat.foo + '-' + jsonDat.name + '</p>');
  },false);

  // source.onmessage = function (event) {
  //   div.innerHTML += ('<p>Ping: ' + JSON.parse(event.data).foo + '</p>');
  // };
  
</script>
</body>
</html>
```
