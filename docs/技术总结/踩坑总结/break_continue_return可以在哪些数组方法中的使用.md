---
title: break_continue_return可以在哪些数组方法中的使用
lang: zh-CN
feed:
  enable: true
description: break_continue_return可以在哪些数组方法中的使用
---

# break_continue_return可以在哪些数组方法中的使用

> 本文作者：[onresize](https://github.com/onresize)

- 结论：在 `for、for-in、for-of` 中，`break` 和 `continue` 使可以正常执行并且达到想到的结果，但是 `return` 不能正常执行。在 `forEach、map、filter` 中 `break` 和 `continue` 会出现异常，`return` 会跳出当前循环，但是会继续接下来的循环

### `break、continue、return`

1. break关键字可以用于for、while、do-while及switch语句中，用来跳出整个语句块，结束当前循环的执行。另外我们要特别注意，break语句总是跳出自己所在的那一层循环。当两个for循环嵌套时，如果break语句位于内层的for循环，它只会跳出内层的for循环，但不会跳出外层的for循环

2. continue适用于各种循环结构中，不能用于其他地方，用于跳过本次循环，执行下一次循环。break可以跳出当前循环，即整个循环都不会执行了。而与break不同，continue是提前结束本次循环，但会继续执行下一次的循环。在多层嵌套的循环中，continue也可以通过标签指明要跳过的是哪一层循环，并且同样是只结束自己所在的循环。

3.  return并不是专门用来结束循环的关键字，它可以用来结束一个方法或循环。当一个方法执行到return语句时，该方法就会被结束。与break和continue不同的是，return是直接结束整个方法，不管这个return处在多少层的循环之内。



### for循环
`1.break使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
for(let i = 0; i < array.length; i++) {
    if (5 == i) {
        break;
    }
    console.log(array[i]);
}
```

`2.continue使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
for(let i = 0; i < array.length; i++) {
    if (5 == i) {
        continue;
    }
    console.log(array[i]);
}
```

`3.return使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
for(let i = 0; i < array.length; i++) {
    if (5 == i) {
        return;
    }
    console.log(array[i]);
}
```

- 结论：`break` 和 `continue` 可以在 `for` 中正常执行，`return` 不可以

### for-in循环

`1.break使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
for(let i in array) {
    if (5 == i) {
        break;
    }
    console.log(array[i]);
}
```

`2.continue使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
for(let i in array) {
    if (5 == i) {
        continue;
    }
    console.log(array[i]);
}
```

`3.return使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
for(let i in array) {
    if (5 == i) {
        return;
    }
    console.log(array[i]);
}
```

- 结论：`break` 和 `continue` 可以在 `for-in` 中正常执行，`return` 不可以。

### for-of循环

`1.break使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
for(let i of array) {
    if (5 == i) {
        break;
    }
    console.log(array[i]);
}
```

`2.continue使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
for(let i of array) {
    if (5 == i) {
        continue;
    }
    console.log(array[i]);
}
```

`3.return使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
for(let i of array) {
    if (5 === i) {
        return;
    }
    console.log(array[i]);
}
```

- 结论：`break` 和 `continue` 可以在 `for-in` 中正常执行，`return` 不可以。





### forEach循环

`1.break使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
array.forEach((item) => {
    if (5 == item) {
        break;
    }
    console.log(item);
});
```

`2.continue使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
array.forEach((item) => {
    if (5 == item) {
        continue;
    }
    console.log(item);
});
```

`3.return使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
array.forEach((item) => {
    if (5 == item) {
        return;
    } else {
        console.log(item);
    }
});
```

- 结论： `break` 和 `continue` 不可以在 `forEach` 中正常执行，会出现异常，`return` 会跳出当前循环，但是不会终止循环的继续。




### filter循环

`1.break使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
let res = [];
res = array.filter((item) => {
    if (5 == item) {
        break;
    }
    return item;
});
console.log(res);
```

`2.continue使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
let res = [];
res = array.filter((item) => {
    if (5 == item) {
        break;
    }
    return item;
});
console.log(res);
```

`3.return使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
let res = [];
res = array.filter((item) => {
    if (5 == item) {
        return;
    }
    return item;
});
console.log(res);
```

- 结论：`break` 和 `continue` 不可以在filter中正常执行，会出现异常，`return` 会跳出当前循环，并且会去除当前位置，改变数组的长度，但是不会终止循环的继续。



### map循环

`1.break使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
let res = [];
res = array.map((item) => {
    if (5 == item) {
        break;
    }
    return item;
});
console.log(res);
```

`2.continue使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
let res = [];
res = array.map((item) => {
    if (5 == item) {
        break;
    }
    return item;
});
console.log(res);
```

`3.return使用`
```js
let array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
let res = [];
res = array.map((item) => {
    if (5 == item) {
        return;
    }
    return item;
});
console.log(res);
```

- 结论：`break` 和 `continue` 不可以在 `filter` 中正常执行，会出现异常，`return` 会跳出当前循环，当前位置会用 `undefined` 替换，不会改变数组的长度，但是不会终止循环的继续。