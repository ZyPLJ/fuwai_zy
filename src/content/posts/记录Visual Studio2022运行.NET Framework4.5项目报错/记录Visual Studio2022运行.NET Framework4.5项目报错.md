---
title: 记录Visual Studio2022运行.NET Framework4.5项目报错
published: 2024-06-29 23:35:01
description: 问题解决公司项目都是.NET Framework的老项目，而我入职的时候电脑也是安装的Visual Studio2019，用了挺久。但是最近出的免费Ai补全的插件不支持，所以我下载了一个2022，不过问题就来了，我用Visual Studio2022去打开公司的老项目会报错
tags: [.NET]
category: 杂七杂八
draft: false
pinned: false
---

# 问题解决
公司项目都是`.NET Framework`的老项目，而我入职的时候电脑也是安装的`Visual Studio2019`，用了挺久。但是最近出的免费Ai补全的插件不支持，所以我下载了一个2022，不过问题就来了，我用`Visual Studio2022`去打开公司的老项目会报错，如图：
![](c1e7609ee2f1f0c8af750ba5504ef4b.png)
当我看到这些报错的时候就很疑惑，删除bin、obj文件重新加载项目生成解决方案都试了没用。正当我百思不得其解的时候，看到了一篇文章提到了如图：
![](ce59b2b76e90c511f921a70c362716e.png)
我记得组长叫我部署iis的时候都会将支持32位哪里改为true，我就在想会不会就是这个问题。然后我打开了`Visual Studio 2022`的web项目设置页面，发现了默认是勾选是64位版本运行项目，如图：
![](2cca65fd66cfd5640447324ab1bede8.png)
把这个==<span style="background:#fff88f">勾选去掉</span>==之后就能运行项目了，当然前提是安装了这些：
![](37481f99b23abde8499ab36fe395be4.png)
# 参考链接
[未能加载文件或程序集“XXX.dll”或它的某个依赖项的解决方法 - 睡觉对我非常重要 - 博客园 (cnblogs.com)](https://www.cnblogs.com/Chowhound/p/17158355.html)  https://www.cnblogs.com/Chowhound/p/17158355.html