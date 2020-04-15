---
title: 模拟koa-bodyparser中间件获取post参数
date: 2020-04-11 16:32:16
categories:
- node
tags:
- koa
- 原理
- 题
---


对于GET请求，我们可以直接通过request.query拿到请求参数，但是对于POST请求的处理，koa没有封装获取参数的方法，需要通过解析上下文context中的原生node.js请求对象req，将POST表单数据解析成query string（例如：a=1&b=2&c=3），再将query string 解析成JSON格式（例如：{"a":"1", "b":"2", "c":"3"}）

<!-- more -->

### 主要思想
1. 取到req.headers['content-type']，值为`application/x-www-form-urlencoded`或`application/json`
2. `x-www-form-urlencoded`对应的格式为`a=1&b=2`, json则是json对象
3. 通过`监听ctx.req对象的data和end事件`接收data数据
4. 按对应格式方式解析成json对象放到request.body

### 模拟实现
```javascript
    return async (ctx, next) => {
        // 获取请求数据的类型 json 或表单
        let contentType = ctx.get("Content-Type");
        if(['application/x-www-form-urlencoded','application/json'].includes(contentType)){
            await new Promise((resolve, reject) => {
                // 存储数据的数组
                let dataArr = [];
                // 接收数据
                ctx.req.on("data", chunk => dataArr.push(chunk));
                ctx.req.on("end",()=>{
                    // 获取数据 Buffer 格式
                    let data = Buffer.concat(dataArr).toString();
                    if (contentType === "application/x-www-form-urlencoded") {
                        // 如果是表单提交，则将查询字符串转换成对象赋值给 ctx.request.body
                        ctx.request.body = querystring.parse(data);
                    } else if (contentType === "application/json") {
                        // 如果是 json，则将字符串格式的对象转换成对象赋值给 ctx.request.body
                        ctx.request.body = JSON.parse(data);
                    }
                    resolve()
                })
            });
        }
        await next();
    }
```