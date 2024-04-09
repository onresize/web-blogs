---
title: base64相关
lang: zh-CN
feed:
  enable: true
description: base64相关
---

# base64相关

> 本文作者：[onresize](https://github.com/onresize)

### 不同类型转 base64 后的文档类型

| 文件后缀 |                           文档类型                           |
| :------: | :----------------------------------------------------------: |
|   .png   |                    data:image/png;base64,                    |
|   .jpg   |                   data:image/jpeg;base64,                    |
|   .gif   |                    data:image/gif;base64,                    |
|   .svg   |                  data:image/svg+xml;base64,                  |
|   .ico   |                  data:image/x-icon;base64,                   |
|   .bmp   |                    data:image/bmp;base64,                    |
|   .doc   |               data:application/msword;base64,                |
|  .docx   | data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64, |
|   .xls   |            data:application/vnd.ms-excel;base64,             |
|  .xlsx   | data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64, |
|   .pdf   |                 data:application/pdf;base64,                 |
|   .ppt   |          data:application/vnd.ms-powerpoint;base64,          |
|  .pptx   | data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64, |
|   .txt   |                   data:text/plain;base64,                    |

### 文件流转base64
- `方式1`：使用FileReader API
```js
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}
 
// 使用示例
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const base64 = await convertToBase64(file);
  console.log(base64); // 打印Base64编码字符串
});
```

- `方式2`：使用Canvas API
```js
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
 
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
 
      resolve(canvas.toDataURL());
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}
 
// 使用示例
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const base64 = await convertToBase64(file);
  console.log(base64); // 打印Base64编码字符串
});
```