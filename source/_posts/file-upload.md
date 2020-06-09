---
title: file-upload
date: 2020-06-09 15:03:15
tags:
---

<!-- ### 主题结构
* server
    * nodejs+express
* client
    * create-react-app + antd
* hash计算放在了serviceWorker里 -->

### Blob 对象
Blob（Binary Large Object）对象代表了一段二进制数据。其它操作二进制数据的接口都是建立在此对象的基础之上。生产Blob对象的方法：1.使用Blob 构造函数，2.对已有的Blob对象slice方法切割成小部分，应用场景有：大文件的断点续传。

### 前端切割文件
file对象继承自Blob对象，通过slice方法可以完成文件分割
* 每个10M
```js
const SIZE = 1024 * 1024 * 10; //10M
function createChunks(file: File): Part[] {
    let current = 0;
    let partList: Part[] = [];
    while (current < file.size) {
        let chunk = file.slice(current, current + SIZE);
        partList.push({
            chunk, size: chunk.size
        })
        current += SIZE;
    }
    return partList;
}
```
### 计算分割后文件hash
计算分割的文件hash
* 发消息，通过serviceworker计算hash
    ```js
        function calculateHash(partList: Part[]) {
            return new Promise((resolve, reject) => {
                let worker = new Worker('/hash.js');
                worker.postMessage({ partList });
                worker.onmessage = (event) => {
                    let { percent: _a, hash } = event.data;
                    setHashPercent(_a);
                    if (hash) {
                        console.log('hash计算完成')
                        resolve(hash);
                    }
                };
            });
        }
    ```
* hash.js接收消息，处理hash
    ```js
    self.importScripts('https://cdn.bootcss.com/spark-md5/3.0.0/spark-md5.js');
    self.onmessage = async (event) => {
        let { partList } = event.data;
        const spark = new self.SparkMD5.ArrayBuffer();
        // let percent = 0;
        // let perSize = 100 / partList.length;
        let len = partList.length;
        let count=0;
        let buffers = await Promise.all(partList.map(({ chunk, size }) => {
            return new Promise((resolve)=>{
                const reader = new FileReader();
                reader.readAsArrayBuffer(chunk);
                reader.onload = function (event) {
                    count++;
                    self.postMessage({ percent: (count/len).toFixed(2) })
                    resolve(event.target.result);
                }
            });
        }));
        // let buffers = await Promise.all(partList.map(({ chunk, size }) => {
        //     debugger
        //     return chunk.ArrayBuffer;
        // }));
        buffers.forEach(buffer => {
            spark.append(buffer);
        });
        self.postMessage({ percent: 1, hash: spark.end() });
        self.close();
    }
    ```
### 更新片断文件名
* b576f417ce15ea060ba3cb712c83add8.mp4-0
* b576f417ce15ea060ba3cb712c83add8.mp4-1
* b576f417ce15ea060ba3cb712c83add8.mp4-2
* ...

### 开始上传
* 验证文件
将b576f417ce15ea060ba3cb712c83add8.mp4名称发送到服务器
    1.服务器已经存在该文件，则提示上传成功
    2.服务器有部分文件(b576f417ce15ea060ba3cb712c83add8.mp4-0,b576f417ce15ea060ba3cb712c83add8.mp4-1)，返给前端
    3.服务没有文件，也没有已上传片断，则客户端从0开始上传
* 过滤partList
    * 服务器缺失的需要上传
    * 服务器片断size小于实际size的，也需要重新上传
* 通知服务器可以合并文件