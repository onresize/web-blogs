---
title: 一些新颖的js数组方法
lang: zh-CN
feed:
  enable: true
description: 一些新颖的js数组方法
---

# 一些新颖的js数组方法

> 本文作者：[onresize](https://github.com/onresize)

#### 1. copyWithin(): 数组内部复制
- 这个方法可以在同一个数组内复制并替换元素，不会改变数组长度。
```js
const numbers = [1, 2, 3, 4, 5];
numbers.copyWithin(0, 3); // [4, 5, 3, 4, 5]

// 指定结束位置
const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
fruits.copyWithin(2, 0, 2); // ['apple', 'banana', 'apple', 'banana', 'kiwi']
```

#### 2. at() 和 with(): 现代数组访问方法
- 这两个新方法提供了更优雅的数组元素访问和修改方式：
```js
const arr = ['a', 'b', 'c'];
// 使用负索引访问最后一个元素
console.log(arr.at(-1)); // 'c'

// 不改变原数组的情况下修改元素
const newArr = arr.with(1, 'x'); // ['a', 'x', 'c']
console.log(arr); // ['a', 'b', 'c']
```

#### 3. reduceRight(): 从右向左归约
- 与 reduce() 类似，但从数组末尾开始处理：
```js
// 构建嵌套对象
const keys = ['user', 'name', 'john'];
const nested = keys.reduceRight((value, key) => ({ [key]: value }), null);
// 结果: { user: { name: { john: null } } }
```

#### 4. findLast(): 反向查找
- ES13新增方法，从数组末尾开始查找元素：
```js
const numbers = [2, 4, 6, 8, 9, 10, 12];
// 查找最后一个偶数
const lastEven = numbers.findLast(num => num % 2 === 0); // 12
```

#### 5. 不可变数组操作方法
- ES2023引入的新方法：toSorted()、toReversed()、toSpliced()，它们不会修改原数组：
```js
const original = [3, 1, 4, 1, 5];
const sorted = original.toSorted(); // [1, 1, 3, 4, 5]
console.log(original); // [3, 1, 4, 1, 5]
```

#### 6. lastIndexOf(): 查找最后匹配索引
- 查找指定元素最后出现的位置：
```js
const text = ['hello', 'world', 'hello', 'javascript'];
console.log(text.lastIndexOf('hello')); // 2
console.log(text.lastIndexOf('hello', 1)); // 0
```

#### 7. flatMap(): 映射并扁平化
- 结合了 map() 和 flat() 的功能，效率更高：
```js
const sentences = ['Hello world', 'JavaScript is awesome'];
const words = sentences.flatMap(sentence => sentence.split(' '));
// ['Hello', 'world', 'JavaScript', 'is', 'awesome']
```