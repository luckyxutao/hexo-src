---
title: HTML5协议之WebSocket
date: 2017-08-17 22:06:19
categories:
- 协议
tags:
- sse http
---
### 简介
Web Sockets 是用于 Web 应用程序的新一代双向通信技术，运行在单一套接字之上，它通过 JavaScript 接口暴漏在 HTML5 兼容的浏览器中。一个 WebSocket 就是客户端和服务端之间的标准双向 TCP 套接字。套接字以 HTTP 连接开始，在 HTTP 握手之后“升级”为 TCP 套接字。握手之后，任意一端都可以发送数据。


### WebSocket 特点
> * 建立在 TCP 协议之上，服务器端的实现比较容易
> * 可以发送文本，也可以发送二进制数据。
> * 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。
> * 没有同源限制，客户端可以与任意服务器通信。
> * 数据格式比较轻量，性能开销小，通信高效
> * 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器

----

### 兼容性
IE10+ 及其它现在浏览器均支持[兼容性点这里](http://caniuse.mojijs.com/Home/Html/item/key/websockets/index.html)

### 示例
`以expressjs+socket.io`构建的一个聊天室
#### 效果
*绿色背景是发送，白色背景是接收消息*
![](/assets/blogImg/websocketpic1.png)
#### ServerClient
```javascript
/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io')(server);
let i = 0;
io.on('connection', function (socket) {
  console.log('a user connected');
  i++;
  socket.on('disconnect', function(){
    i--;
    console.log('user disconnected');
  });
  socket.on('chat message', function (data) {
    io.emit('news', { talkmsg : data,total:i });//广播消息
    console.log(data);
  });
});
```
#### Client
```html
<!DOCTYPE html>
<html>
  <head>
    <title>{{ title }}</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
    </style>
  </head>
  <body>
      <ul id="messages"></ul>
      <div id="total"></div>
      <form action="">
        <input id="m" autocomplete="off" /><button>Send</button>
      </form>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    <script type="text/javascript">
      $(function () {
        var socket = io();
        $('form').submit(function(){
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });

        socket.on('news', function(data){
          $('#messages').append($('<li>').text(data.talkmsg));
          $('#total').html('当前在线人数：'+data.total)
          window.scrollTo(0, document.body.scrollHeight);
        });
      });
    </script>
  </body>
</html>

```