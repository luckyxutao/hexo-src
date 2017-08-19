---
title: fetch-post请求正确姿势
date: 2017-08-18 13:36:43
categories:
- 前端
tags:
- fetch post
---

### fetch发送post请求，不用url传参数

`地址栏url传参数有尺寸限制，从2k-8k不等`

---
```javascript
fetch("http://www.example.org/submit.php", {
  method: "POST",
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: "userName=&password=admin"
}).then(function(res) {
  if (res.ok) {
    alert("Perfect! Your settings are saved.");
  } else if (res.status == 401) {
    alert("Oops! You are not authorized.");
  }
}, function(e) {
  alert("Error submitting form!");
});
```

### 图示
![](/assets/blogImg/fetch_post.png)