---
title: 使用margin/padding百分比实现不同屏幕图片固定比例
date: 2017-08-20 22:01:25
tags:
---

`当margin/padding取形式为百分比时，无论是left/right，还是top/bottom，都是以父元素的width为参照物的！`

![](/assets/blogImg/padding-percent.png)

### 演示
375*100iphone6 高约等于宽的26.666666%
```css
html{font-size:100px;}
body{
    margin:0;
    padding:0;
}
.title{
    font-size:.14rem;
}
.banner{
    padding:.2rem;
}
.resizeable{
      padding: 26.66666666666% 0 0;
      position: relative;
}
.resizeable img{
    position: absolute;
    width: 100%; height: 100%;
    left: 0; top: 0;
}
.top-list{
    margin:0;
}
.top-list dl {
  position: relative;
  margin:0;
}

.top-list dl dt {
  overflow: hidden;
  padding: 66.1849710982659% 0 0;
  position: relative;
}

.top-list dl dt img {
    position: absolute;
    width: 100%; height: 100%;
    left: 0; top: 0;
  object-fit: cover;
}

.top-list dl dd {
  padding: .08rem;
  font-size: .14rem;
  color: #333333;
  letter-spacing: 0;
  line-height: .17rem;
}

.top-list dl dd .cont {
  font-size: .12rem;
  color: #FFFFFF;
  line-height: .15rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  font-weight: bold;
  width: 90%;
}

.top-list dl dd .author {
  font-size: 8px;
  color: #FFFFFF;
}

.top-list dl .filtrate {
    box-sizing: border-box;
    margin:0;
  position: absolute;
  padding-top: .4rem;
  padding-bottom: .06rem;
  left: 0;
  bottom: 0;
  width: 100%;
  background-image: linear-gradient(-180deg, transparent 0%, rgba(0, 0, 0, 0.56) 100%);
}

.top-list dl .date {
    margin:0;
  position: absolute;
  width: .25rem;
  height: .25rem;
  text-align: center;
  line-height: .25rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0;
  color: #fff;
  left: 0;
  top: 0;
  font-size: .1rem;
  color: #FFFFFF;
}
.top-list{
    padding:0;
}
.top-list li{
    /*margin-top: .025rem;*/
    padding-left: .24rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.top-list li .box{
    width:50%;
    padding-left:.025rem;
    padding-bottom:.025rem;
}
```

`请在移动环境下访问，图片在iphone6(375*667为基准, 图片比例375*100)`[点击这里demo](/demos/2018/padding-percent.html)

### 参考
[CSS百分比padding实现比例固定图片自适应布局](http://www.zhangxinxu.com/wordpress/2017/08/css-percent-padding-image-layout/)