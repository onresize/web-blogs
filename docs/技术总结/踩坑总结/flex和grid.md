---
title: flex和grid
lang: zh-CN
feed:
  enable: true
description: flex和grid
---

# flex和grid

> 本文作者：[onresize](https://github.com/onresize)

- ### `flex属性`
[flex图形选择生成示例代码](https://loading.io/flexbox)
- flex-warp: 设置子元素是否换行
- aligin-items/aligin-content: 设置侧轴对齐方式（PS: aligin-content需要搭配flex-warp使用）
- justify-content: 设置主轴对齐方式

- order: 设置子元素的位置顺序、值为整数（数值越小, 顺序位置越靠前、未设置order, 默认在最前面依次排序）
```css
.item{ order: -3 } 
.item1{ order: 1 }
```

- gap: 表示各个子元素之间的间距、px单位、是row-gap column-gap的简写、写一个值时、行间距列间距都为这个大小
```css
.contentBox { gap：10px } 
/* or */
.contentBox { row-gap：10px; column-gap: 30px }
 ```
> PS: 行间距是row-gap、指的是每个元素左右的间距、column-gap为每个元素上下之间的间距

- `flex简写`
- flex: `flex-grow` `flex-shrink` `flex-basis`
- flex-grow: 设置子元素剩余空间占用比例、默认值：0、为0时不放大、值大于或等于1时占满剩余空间、值在`0-1`按比例放大
- flex-shrink: 设置子元素的缩小比例、默认值：1、值不为0时, 每个元素自动等比缩小、值为0或负数时, 元素不缩小
- felx-basis: 设置元素的宽度、同时设置width、会替代前面设置的width

- ### `Grid属性`
[Grid图形选择生成示例代码](https://tools.itsse.cn/cssgridgenerator/)