---
title: robots.txt文件防爬虫规则
lang: zh-CN
feed:
  enable: true
description: robots.txt文件防爬虫规则
---

# robots.txt文件防爬虫规则

> 本文作者：[onresize](https://github.com/onresize)

- robots.txt 是一种用于网站根目录的文本文件，其主要目的在于指示网络爬虫（web crawlers）和其他网页机器人（bots）哪些页面可以抓取，以及哪些页面不应该被抓取。可以看作是网站和搜索引擎机器人之间的一个协议。
robots.txt 文件支持一系列规则，主要包括`User-agent`、`Disallow`、`Allow`和`Sitemap`。以下是这些规则的基础用法：

[在线生成robots.txt](https://tool.ip138.com/robots/)

#### 1. User-agent: 指定了这条规则对哪些机器人生效
- `*` 代表这个规则对所有的机器人都有效。例如：
```text
User-agent: *
```

#### 2. Disallow: 指定机器人不允许访问的页面或目录
- 例如，禁止所有机器人访问整个网站：  
```text
User-agent: *
Disallow: /
```
- 或只禁止访问某个特定的目录：  
```text
User-agent: *
Disallow: /private/
```

#### 3. Allow: 与`Disallow`相反，指定机器人允许访问的页面
- 通常这与`Disallow`一起使用，来覆盖更广范的`Disallow`规则。例如：
```text
User-agent: *
Disallow: /private/
Allow: /private/public/
```

#### 4. Sitemap: 指定了网站的sitemap位置
- 虽然这不是限制搜索引擎bot的命令，但它提供了网站地图的位置给bot，有助于搜索引擎更好地索引网站。例如：
```text
Sitemap: http://www.example.com/sitemap.xml
```
- 生成robots.txt时要谨慎，错误的规则可能会导致搜索引擎未能爬取到希望被索引的网页，或者索引到不希望公开的页面。

#### 5. 一些常见的注意事项、包括：
- 确保允许搜索引擎机器人访问希望在搜索结果中展示的公开页面。
- 使用`Disallow`可以阻止一些内容被搜寻，但它并不是一个安全措施，不应该用来隐藏敏感信息。
- 一些搜索引擎机器人可能不遵循`robots.txt`的规则，尤其是一些恶意爬虫。
- robots.txt文件需要放置在网站的根目录下，比如`http://www.example.com/robots.txt`。
- 一旦更改了`robots.txt`，这些更改可能需要一些时间才能被搜索引擎发现并应用。
- 存在一个网络爬虫联盟标准（Robots Exclusion Protocol），许多搜索引擎如Google, Bing等都支持这个标准。不过，要注意的是，遵守该文件的内容完全是基于爬虫的自愿，这意味着这个文件不能强制执行任何规则。因此，如果需要确保网站的某些部分不被访问，应该使用更强的安全措施，如身份验证或IP阻止。