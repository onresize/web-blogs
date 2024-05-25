---
title: js打印的一些总结
lang: zh-CN
feed:
  enable: true
description: js打印的一些总结
---

# js打印的一些总结

> 本文作者：[onresize](https://github.com/onresize)

### `1.基础信息打印`
- console.log() 可以接受任何类型的参数，包括字符串、数字、布尔值、对象、数组、函数等。最厉害的是，它支持占位符!
- 常用的占位符：

`%s`：字符串<br />
`%d or %i`：整数<br />
`%f`：浮点数<br />
`%o`：对象<br />
`%c`：CSS样式<br />

```js
console.log('%c This is a styled message', 'color: red; font-size: 20px;');
```

- `效果如下：`
<p align="left">
  <img src="/AA_mdPics/log1.min.png" style="border-radius: 6px;"/>
</p>

```js
// 美化打印实现方法
const prettyLog = () => {
  const isEmpty = (value) => {
    return value == null || value === undefined || value === '';
  };
  const prettyPrint = (title, text, color) => {
    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
      'background:transparent'
    );
  };
  // 基础信息打印
  const info = (textOrTitle, content = '') => {
    const title = isEmpty(content) ? 'Info' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#909399');
  };
  return {
    info
  };
};
```

```js
// 创建打印对象
const log = prettyLog();
// 不带标题
log.info('这是基础信息!');
//带标题
log.info('注意看', '这是个男人叫小帅!');
```

- `效果如下：`
<p align="left">
  <img src="/AA_mdPics/log2.min.png" style="border-radius: 6px;"/>
</p>

```js
const error = (textOrTitle, content = '') => {
    const title = isEmpty(content) ? 'Error' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#F56C6C');
};
// 创建打印对象
const log = prettyLog();
log.error('奥德彪', '出来的时候穷 生活总是让我穷 所以现在还是穷。');
log.error('前方的路看似很危险,实际一点也不安全。');
```

- `效果如下：`
<p align="left">
  <img src="/AA_mdPics/log3.min.png" style="border-radius: 6px;"/>
</p>


### `2.图片打印`
```js
  const picture = (url, scale = 1) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const c = document.createElement('canvas')
      const ctx = c.getContext('2d')
      if (ctx) {
        c.width = img.width
        c.height = img.height
        ctx.fillStyle = 'red'
        ctx.fillRect(0, 0, c.width, c.height)
        ctx.drawImage(img, 0, 0)
        const dataUri = c.toDataURL('image/png')
        console.log(
          `%c sup?`,
          `font-size: 1px;
                padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor(
            (img.width * scale) / 2
          )}px;
                background-image: url(${dataUri});
                background-repeat: no-repeat;
                background-size: ${img.width * scale}px ${img.height * scale}px;
                color: transparent;
                `
        )
      }
    }
    img.src = url
  }

  picture('https://onresize.github.io/web-blogs/image.webp')
```

- `效果如下：`
<p align="left">
  <img src="/AA_mdPics/log4.min.png" style="border-radius: 6px;"/>
</p>

### `3.美化的数组打印`
```js
const table = () => {
    const data = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 }
    ];
    console.log(
        '%c id%c name%c age',
        'color: white; background-color: black; padding: 2px 10px;',
        'color: white; background-color: black; padding: 2px 10px;',
        'color: white; background-color: black; padding: 2px 10px;'
    );
    data.forEach((row) => {
        console.log(
            `%c ${row.id} %c ${row.name} %c ${row.age} `,
            'color: black; background-color: lightgray; padding: 2px 10px;',
            'color: black; background-color: lightgray; padding: 2px 10px;',
            'color: black; background-color: lightgray; padding: 2px 10px;'
        );
    });
};
table()
```

- `效果如下：`
<p align="left">
  <img src="/AA_mdPics/log5.min.png" style="border-radius: 6px;"/>
</p>
