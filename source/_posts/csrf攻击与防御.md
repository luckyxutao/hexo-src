---
title: csrf攻击与防御
date: 2019-11-24 15:34:32
categories:
- 前端
tags:
- csrf
- 安全
---

### cookie 和 token 都存放在 header 中，为什么不会劫持 token？
+ 首先token不是防止XSS的，而是为了防止CSRF的；
+ CSRF攻击的原因是浏览器会自动带上cookie，而浏览器`不会自动`在`header或url里`带上token
 <!-- more -->

### CSRF攻击是什么
CSRF是跨站请求伪造的缩写，也被称为XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。
跟跨网站脚本（XSS）相比，XSS利用的是用户对指定网站的信任，CSRF利用的是网站对用户网页浏览器的信任。
因为`CSRF攻击利用的是冲着浏览器分不清发起请求是不是真正的用户本人`。，也就是说，简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。

### 最简单的CSRF攻击
+ 用户Alice登录和访问某银行网站A，保留cookie。
+ Alice被某些信息诱导访问危险网站B。
+ 危险网站B上有一个img标签
```HTML
<img src="http://www.examplebank.com/account=Alice&amount=1000&payfor=Badman" >
```
+ 这个标签的src不指向一张图片，而是一个http请求，这个请求向银行要求将Alice的1000元转给Badman，由于Alice的浏览器上有cookie，这样浏览器发出的这个请求就能得到响应执行。
这样Alice的钱就被偷了。

### CSRF攻击的对象与防范思路
`保护的关键，是 在请求中放入黑客所不能伪造的信息`
仅仅靠发起CSRF攻击的话，黑客只能借助受害者的cookie骗取服务器的信任，但是黑客并不能凭借拿到cookie，也看不到 cookie的内容。另外，对于服务器返回的结果，由于浏览器同源策略的限制，黑客也无法进行解析。
这就告诉我们，我们要保护的对象是那些可以直接产生数据改变的服务，而对于读取数据的服务，则不需要进行CSRF的保护。
+ 验证HTTP Referer
在HTTP请求头中有一个字段叫Referer，它记录了请求的来源地址。 服务器需要做的是验证这个来源地址是否合法，如果是来自一些不受信任的网站，则拒绝响应。
    +   兼容性不好：每个浏览器对于Referer的具体实现可能有差别。
    +   并不一定可靠：在一些古老的垃圾浏览器中，Referer可以被篡改。
+ csrfToken
    + 服务器随机产生token（比如把cookie hash化生成），存在session中，放在cookie中或者以ajax的形式交给前端。
    + 前端发请求的时候，解析cookie中的token，放到请求url里或者请求头中。
    + 服务器验证token，由于黑客无法得到或者伪造token(`无法放到请求url里或者请求头中`)，所以能防范csrf

### 相关引用
[`对于跨站伪造请求（CSRF）的理解和总结`](https://zhuanlan.zhihu.com/p/37293032?utm_source=wechat_session&utm_medium=social&utm_oi=40142471430144)