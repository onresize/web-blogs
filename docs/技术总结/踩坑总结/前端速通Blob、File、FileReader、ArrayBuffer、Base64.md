---
title: 前端速通Blob、File、FileReader、ArrayBuffer、Base64
lang: zh-CN
feed:
  enable: true
description: 前端速通Blob、File、FileReader、ArrayBuffer、Base64
---

# 前端速通Blob、File、FileReader、ArrayBuffer、Base64

> 本文作者：[onresize](https://github.com/onresize)

### `1.Blob`
- Blob 对象表示一个不可变、原始数据的「类文件」对象。它的数据可以按文本（text()方法）或二进制（arrayBuffer()方法）的格式进行读取，也可以转换成 ReadableStream （stream()方法）可读流来用于数据操作。Blob 提供了一种高效的方式来操作数据文件，而不需要将数据全部加载到内存中(比如流式读取、文件切片slice()方法)，这在处理大型文件或二进制数据时非常有用。
- Blob 表示的不一定是 JavaScript 原生格式的数据，它还可以用来存储文件、图片、音频、视频、甚至是纯文本等各种类型的数据。
- File 接口基于 Blob，继承了 blob 的功能并将其扩展以支持用户系统上的文件。

- 可以使用 new Blob() 构造函数来创建一个 Blob 对象：
```js
new Blob(blobParts)
new Blob(blobParts, options)
```
- 1.blobParts (可选)：一个可迭代对象，比如 Array，包含 ArrayBuffer、TypedArray、DataView、Blob、字符串或者任意这些元素的混合，这些元素将会被放入 Blob 中。
- 2.options (可选)：可以设置 type （MIME 类型）和 endings （用于表示换行符）。
```js
const blob1 = new Blob(["Hello, world!"], { type: "text/plain" });
const blob2 = new Blob(['<q id="a"><span id="b">hey!</span></q>'], { type: "text/html" });
```

#### Blob 对象主要有以下几个属性：
- 1.size: 返回 Blob 对象的大小（以字节为单位）。
```js
console.log(blob.size); // 输出 Blob 的大小
```

- 2.type: 返回 Blob 对象的 MIME 类型。
```js
console.log(blob.type); // 输出 Blob 的 MIME 类型
```

#### Blob 对象提供了一些常用的方法来操作二进制数据。
- 1.slice([start], [end], [contentType])
- 该方法用于从 Blob 中提取一部分数据，并返回一个「新的 Blob 对象」。参数 start 和 end 表示提取的字节范围，contentType 设置提取部分的 MIME 类型。
```js
const blob = new Blob(["Hello, world!"], { type: "text/plain" });
const partialBlob = blob.slice(0, 5);
```

- 2.text()
- 该方法将 Blob 的内容读取为文本字符串。它返回一个 Promise，解析为文本数据。
```js
blob.text().then((text) => {
  console.log(text); // 输出 "Hello, world!"
});
```

- 3.arrayBuffer()
- 该方法将 Blob 的内容读取为 ArrayBuffer 对象，适合处理二进制数据。它返回一个 Promise，解析为 ArrayBuffer 数据。
```js
const blob = new Blob(["Hello, world!"], { type: "text/plain" });
blob.arrayBuffer().then((buffer) => {
  console.log(buffer);
});
```

- 4.stream()
- 该方法将 Blob 的数据作为一个 ReadableStream 返回，允许你以流的方式处理数据，适合处理大文件。
```js

const blob = new Blob(["Hello, world! This is a test Blob."], { type: 'text/plain' });

// 获取 Blob 的可读流
const readableStream = blob.stream();

// 创建一个默认的文本解码器
const reader = readableStream.getReader();

// 用于读取流并输出到控制台
function readStream() {
  reader.read().then(({ done, value }) => {
    if (done) {
      console.log('Stream complete');
      return;
    }
    // 将 Uint8Array 转换为字符串并输出
    console.log(new TextDecoder("utf-8").decode(value));
    // 继续读取下一个块
    return reader.read().then(processText);
  }).catch(err => {
    console.error('Stream failed:', err);
  });
}

readStream();
```

- 一个更复杂的示例：将一个 Blob 的内容流式读取并将其写入到另一个流中（了解即可）
```js
const blob = new Blob(["Hello, world! This is a test Blob."], { type: 'text/plain' });

// 使用 Blob.stream() 方法获取一个可读流
const readableStream = blob.stream();

// 创建一个新的 Response 对象，以便使用 Response.body 作为可读流
const response = new Response(readableStream);

// 使用 TextDecoderStream 将二进制流转换为字符串
const textDecoderStream = new TextDecoderStream();
readableStream.pipeTo(textDecoderStream.writable);

// 获取解码后的可读流
const decodedStream = textDecoderStream.readable;

// 创建一个可写流目标，通常是显示在页面上或传输到服务器
const writableStream = new WritableStream({
  write(chunk) {
    console.log(chunk); // 在控制台输出解码后的文本
    // 这里你可以将数据写入到某个地方，比如更新网页内容或上传到服务器
  },
  close() {
    console.log('Stream complete');
  }
});

// 将解码后的流数据写入到可写流
decodedStream.pipeTo(writableStream).catch(err => {
  console.error('Stream failed:', err);
});
```

#### 使用场景
- 只要记住，「Blob 对象可以存储任何类型数据」，那对于各种数据类型（比如文件、图像、音视频）相关的操作都可以使用 Blob。
- 1.生成文件下载、可以通过 Blob 创建文件并生成下载链接供用户下载文件
```js
const blob = new Blob(["This is a test file."], { type: "text/plain" });
const url = URL.createObjectURL(blob); // 创建一个 Blob URL
const a = document.createElement("a");
a.href = url;
a.download = "test.txt";
a.click();
URL.revokeObjectURL(url); // 释放 URL 对象
```

- 2.上传文件、Blob 常用于上传文件到服务器，尤其是在使用 FormData API 时
```js
const formData = new FormData();
// 做过上传文件功能的小伙伴，肯定都遇到过将 File 对象传入到 formData 中上传
// 其实 File 对象就是继承了 Blob 对象，只不过加上了一些文件信息。
formData.append("file", blob, "example.txt");

fetch("/upload", {
  method: "POST",
  body: formData,
}).then((response) => {
  console.log("File uploaded successfully");
});
```

- 3.图像处理、通过 FileReader API 可以将 Blob 对象读取为不同的数据格式。
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="file" id="fileInput" accept="image/*" />

    <div id="imageContainer"></div>
    <script>
      const fileInput = document.getElementById("fileInput");

      const imageContainer = document.getElementById("imageContainer");

      fileInput.addEventListener("change", function (event) {
        // File 对象继承了 Blob 对象
        const file = event.target.files[0];

        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "500px";
            img.style.margin = "10px";
            imageContainer.innerHTML = "";
            imageContainer.appendChild(img);
          };
          // 转成 base64
          reader.readAsDataURL(file);
        } else {
          alert("请选择一个有效的图片文件。");
        }
      });
    </script>
  </body>
</html>
```

### `2.File`
- File 是 JavaScript 中代表文件的数据结构，它继承自 Blob 对象，包含文件的元数据（如文件名、文件大小、类型等）。
- Blob 是纯粹的二进制数据，它可以存储任何类型的数据，但不具有文件的元数据（如文件名、最后修改时间等）。
- File 是 Blob 的子类，除了继承 Blob 的所有属性和方法之外，还包含文件的元数据。
- 你可以将 File 对象看作是带有文件信息的 Blob。Blob 更加通用，而 File 更专注于与文件系统的交互。
- File 对象通常有三种方式获取：
- 1.用户使用<input type="file"> 元素选择文件返回的 FileList 对象中获取（即files 属性）
- 2.从拖放操作返回的 DataTransfer 对象中获取。
- 3.可以使用 JavaScript 构造函数手动创建。
```js
<input type="file" id="fileInput" />

<script>
  // 获取用户上传的
  document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    console.log("文件名:", file.name);
    console.log("文件类型:", file.type);
    console.log("文件大小:", file.size);
  });
  
  // 手动创建 File
  const file = new File(["Hello, world!"], "hello-world.txt", {
    type: "text/plain",
  });
  console.log(file);
</script>
```

- File 对象继承了 Blob 对象的方法，因此可以使用一些 Blob 对象的方法来处理文件数据。
```js
const blob = file.slice(0, 1024); // 获取文件的前 1024 个字节

file.text().then((text) => {
  console.log(text); // 输出文件的文本内容
});

file.arrayBuffer().then((buffer) => {
  console.log(buffer); // 输出文件的 ArrayBuffer
});

const stream = file.stream();

// File 对象上的一些常见属性
file.type
file.size
file.name
file.lastModified
```

#### 支持 Blob 和 File 对象的 API
- 以下 API 都接受 Blob 对象和 File 对象：
- FileReader
- URL.createObjectURL()
- Window.createImageBitmap() 和 WorkerGlobalScope.createImageBitmap()
- fetch() 方法的 body 选项
- XMLHttpRequest.send()

### `3.FileReader`
- FileReader 「只能访问用户明确选择的文件内容」，比如是使用 `<input type="file">` 元素或者通过拖放。

- #### FileReader 实例属性

| **属性名** | 类型         | **描述**                                                     |
| ---------- | ------------ | ------------------------------------------------------------ |
| readyState | Number       | 表示 `FileReader` 的当前状态。可能的值有： 0 - EMPTY：还没有加载任何数据。 1 - LOADING：数据正在被加载。 2 - DONE：已完成全部的读取请求。 |
| result     | Any          | 文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用的读取方法，例如字符串或 ArrayBuffer。 |
| error      | DOMException | 如果读取过程中发生错误，该属性包含一个 `DOMException` 对象，描述错误的详细信息。 |



- #### FileReader 实例方法

| 方法名               | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| readAsArrayBuffer()  | 开始读取指定的 `Blob` 或 `File` 对象，并将文件内容读为 `ArrayBuffer`。 |
| readAsBinaryString() | 开始读取指定的 `Blob` 或 `File` 对象，并将文件内容读为二进制字符串。 |
| readAsDataURL()      | 开始读取指定的 `Blob` 或 `File` 对象，并将文件内容读为 Data URL（Base64 编码的字符串）。 |
| readAsText()         | 开始读取指定的 `Blob` 或 `File` 对象，并将文件内容读为文本字符串，默认使用 UTF-8 编码。 |
| abort()              | 中止读取操作。在返回时，`readyState` 属性为 `DONE`。         |



- #### 事件

- 除了属性和方法，`FileReader` 还会触发一些事件，可以监听这些事件来处理读取过程中的不同阶段：

| 事件名      | **描述**                                             |
| ----------- | ---------------------------------------------------- |
| onloadstart | 在读取操作开始时触发。                               |
| onprogress  | 在读取数据块时周期性地触发。                         |
| onload      | 在读取操作成功完成时触发。                           |
| onabort     | 在读取操作被中止时触发。                             |
| onerror     | 在读取操作出错时触发。                               |
| onloadend   | 在读取操作完成时触发，无论成功或失败（包括被中止）。 |

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FileReader Example</title>
  </head>
  <body>
    <h1>Upload and Read a Text File</h1>
    <input type="file" id="fileInput" accept=".txt">
    <div id="fileContent" style="white-space: pre-wrap; margin-top: 20px;"></div>

    <script>
      document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) {
          return;
        }

        const reader = new FileReader();

        // 监听文件读取成功事件
        reader.onload = function(e) {
          const content = e.target.result;
          document.getElementById('fileContent').textContent = content;
        };

        // 监听文件读取出错事件
        reader.onerror = function(e) {
          console.error('Error reading file:', e.target.error);
        };

        // 以文本格式读取文件
        reader.readAsText(file);
      });

    </script>
  </body>
</html>
```

### `4.Base64`

- 上面的 Blob、File 都是Web API，而 Base64 是一种方法，不是 Web API。

#### Base64 的应用场景

- **「嵌入图像」**：在 HTML 或 CSS 文件中直接嵌入图像数据，避免额外的 HTTP 请求。
- **「数据传输」**：在 JSON 或 XML 中传输二进制数据时，使用 Base64 将数据编码为文本格式。
- **「电子邮件」**：在 MIME 邮件中，Base64 用于编码二进制附件。

### `5.URL.createObjectURL()`

- URL 接口的提供了`createObjectURL()` 静态方法用于生成临时 URL ，它可以用来表示一个 `File`、`Blob` 或者 `MediaSource（基本被废弃）` 对象。允许开发者通过 URL 引用本地的文件或数据，而不需要将其上传到服务器。
- 这个 URL 生命周期与其创建时所在窗口的 document 绑定在一起，浏览器会在卸载文档时自动释放对象 URL，然而，为了优化性能和内存使用，如果在安全时间内可以明确卸载，就应该卸载，这时需手动调用revokeObjectURL()。

#### 使用场景

- 预览文件：用户上传文件后，可以使用 `createObjectURL()` 生成一个 URL createObjectURL

- 动态生成内容：在不需要持久化存储的情况下，使用 Blob 对象动态生成内容并通过 URL 引用。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Preview</title>
  </head>
  <body>
    <h1>Upload and Preview Image</h1>
    <input type="file" id="fileInput" accept="image/*">
    <div id="preview" style="margin-top: 20px;">
      <img id="imagePreview" src="" alt="Image Preview" style="max-width: 100%; display: none;">
    </div>

    <script>
      document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) {
          return;
        }

        // 生成一个 URL 用于引用文件
        const imageUrl = URL.createObjectURL(file);

        // 显示图像预览
        const img = document.getElementById('imagePreview');
        img.src = imageUrl;
        img.style.display = 'block';

        img.onload = function() {
          URL.revokeObjectURL(imageUrl);
        };
      });

    </script>
  </body>
</html>
```

### `6.ArrayBuffer、TypedArray 、DataView`

- `ArrayBuffer` 是一种用于表示通用的、固定长度的二进制数据块的对象。它实际上只是一个字节数组，不能直接操作数据，它本身不提供读取或写入数据的方法。
- `ArrayBuffer` 更多的是作为底层的二进制数据存储，是所有其他视图（如 `TypedArray` 和 `DataView`）的基础。

```js
// 创建一个 ArrayBuffer
const buffer = new ArrayBuffer(8); // 8 字节的缓冲区

// 查看 ArrayBuffer 的大小
console.log(buffer.byteLength); // 输出 8
```

- `TypedArray` 是一组类型化数组的视图，提供了对底层 `ArrayBuffer` 的数据进行读取和写入的能力。它们提供了类似于普通数组的接口，但操作的是二进制数据。
- 有多种类型的 `TypedArray`，如 `Int8Array`、`Uint8Array`、`Uint8ClampedArray`、`Int16Array`、`Uint16Array`、`Int32Array`、`Uint32Array`、`Float32Array` 和 `Float64Array`。每种类型的数组视图提供了针对特定数据类型的操作方法。
- 适用于大量相同类型数据的操作。

```js
// 1. 直接创建一个 TypedArray，会自动创建一个 ArrayBuffer
let int8Array = new Int8Array(4);
// 写入数据
int8Array[0] = 1;
int8Array[1] = 2;

// 2. 使用现有的 ArrayBuffer 创建一个 TypedArray
let buffer = new ArrayBuffer(8);
const int32View = new Int32Array(buffer, 0, 2); // 创建一个 Int32Array 视图 从偏移量 0 开始，长度为 2
// 写入数据
int32View[0] = 12345;
int32View[1] = 67890;
// 读取数据
console.log(int32View[0]); // 输出 12345
console.log(int32View[1]); // 输出 67890
```

- `DataView` 是另一个视图，用于从 `ArrayBuffer` 中读取和写入不同类型的数据。
- 与 `TypedArray` 不同的是，`DataView` 允许在同一 `ArrayBuffer` 上进行多种类型的操作。
- 适用于需要在同一个 `ArrayBuffer` 上进行多种类型操作的情况。

```js
// 创建一个 ArrayBuffer
const buffer = new ArrayBuffer(8);

// 创建一个 DataView
const dataView = new DataView(buffer);

// 写入数据
dataView.setInt32(0, 12345, true); // 从偏移量 0 开始，小端模式
dataView.setFloat32(4, 3.14159, true); // 从偏移量 4 开始，小端模式

// 读取数据
console.log(dataView.getInt32(0, true)); // 输出 12345
console.log(dataView.getFloat32(4, true)); // 输出 3.14159
```

#### 完整示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binary Data Handling</title>
  </head>
  <body>
    <h1>Binary Data Handling</h1>
    <button id="writeData">Write Data</button>
    <pre id="output"></pre>

    <script>
      document.getElementById('writeData').addEventListener('click', function() {
        handleBinaryData();
      });

      function handleBinaryData() {
        // 创建一个 ArrayBuffer
        const buffer = new ArrayBuffer(16);

        // 创建一个 DataView
        const dataView = new DataView(buffer);

        // 写入数据
        dataView.setInt32(0, 12345, true); // 从偏移量 0 开始，小端模式
        dataView.setFloat32(4, 3.14159, true); // 从偏移量 4 开始，小端模式
        dataView.setUint8(8, 255); // 从偏移量 8 开始，单字节无符号整数
        dataView.setInt16(9, 1234, true); // 从偏移量 9 开始，小端模式

        // 创建 TypedArray 视图
        const int32View = new Int32Array(buffer, 0, 2);
        const float32View = new Float32Array(buffer, 4, 1);
        const uint8View = new Uint8Array(buffer, 8, 2);
        const int16View = new Int16Array(buffer, 8, 1);

        // 读取数据
        const output = `
        Int32: ${int32View[0]}, ${int32View[1]}
        Float32: ${float32View[0]}
        Uint8: ${uint8View[0]}, ${uint8View[1]}
        Int16: ${int16View[0]}
    `;

        // 显示输出
        document.getElementById('output').textContent = output;
      }

    </script>
  </body>
</html>
```

#### 总结

- Blob、File 等等就是各种类型文件相关的对象，背后底层一般都是用二进制存储数据，而ArrayBuffer、TypedArray、DataView就是可以让你直接定义与操作二进制数组，而 Base64 又可以将二进制转成字符串文本进行存储，遇到图片展示需求就可以直接内联显示或者使用URL提供的静态方法`createObjectURL()`生成临时 url 来呈现也可以