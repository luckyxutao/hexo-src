title: iframe不跨域交互总结
date: 2015-05-28 07:01:21
tags:
- iframe
- 跨域

---

###完全不跨域情况(域名完全相同)###

`设置domain是指相同的主域名`

`普通iframe和内容被表单target冲掉的还是有区别的`


target冲掉是一种比较古老的提交方式，具体原理参见[使用JavaScript发送表单](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Forms/Sending_forms_through_JavaScript)

调用页(是否设置domain) | iframe(是否设置domain) | 与frame能否交互 | target冲掉iframe
----  |------|---- | ----
否  | 否 | 能 | 能
是   | 是  | 能 | 不能
是  | 否  | 不能 | 不能
否   | 是  | 不能 | 能