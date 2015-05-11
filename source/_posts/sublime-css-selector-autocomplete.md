title: sublime css选择器不自动提示解决方案
date: 2015-02-16 21:50:19
categories:
- 前端
tags:
- sublime
---

> * 需要安装AllAutocomplete插件,通过PackageControl中搜索不再累述。
> * 浏览和编辑Completion Rules.tmPreferences都需要安装ResourceViewer插件(st3不允许直接编辑)。

<!-- more -->
本人一直在使用sublime这个编辑器，用得非常爽，界面也很漂亮，但是发现一个问题，写css时，除了属性提示外，其它的选择器都不会自动提示，经过一番谷歌，终于找到解决方案了。


**`1.将css目录下的Completion Rules.tmPreferences的cancelCompletion的string清空`**
```xml
    <dict>
        <key>cancelCompletion</key>
        <string></string>
    </dict>
  ```
**`2. 清除session和cache`**
	`以下步骤通过ResourceView来进入目录并删除`
  	需要删除文件夹 .../Sublime Text 3/Cache 和文件 .../Sublime Text 3/Local/Session.sublime_session，并重启 Sublime Text 后才能生效。
**`3. 最终效果`**

![](/assets/blogImg/2015-02-16 下午10.54.19.png)