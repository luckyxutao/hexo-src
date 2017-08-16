title: textarea赋值方式引起的bug
date: 2017-04-29 15:53:56
categories:
- javascript
---


textarea 通过HTML方式赋值，会丢失第一个\n,每次赋值都会少一个
```html
<textarea>\n\n\n\n\n\n中华人民共和国中华人民共和国中华人民共和国</textarea>
```

通过javascript赋值则不会
```javascipt
textarea.value = '\n\n\n\n\n\n中华人民共和国中华人民共和国中华人民共和国'
```

