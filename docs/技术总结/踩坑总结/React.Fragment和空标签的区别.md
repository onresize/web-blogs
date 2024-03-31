---
title: React.Fragment和空标签的区别
lang: zh-CN
feed:
  enable: true
description: React.Fragment和空标签的区别
---
# React.Fragment和空标签的区别
>
> 本文作者：[onresize](https://github.com/onresize)
>
 - `<></> 其实是 React.Fragment 的语法糖`
 
 - `它们两个都可以用来对元素进行分组，渲染成 HTML 后不会增加额外的标签`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <header>Header</header>
    <main>Main</main>
    <footer>Footer</footer>
  </body>
</html>
```
- ### `翻译成 jsx`
```jsx
// ✅ 1. 正确写法：
export default function App() {
  return (
    <React.Fragment>
      <header>Header</header>
      <main>Main</main>
      <footer>Footer</footer>
    </React.Fragment>
  );
}

// ✅ 2. 正确写法：better
export default function App() {
  return (
    <>
      <header>Header</header>
      <main>Main</main>
      <footer>Footer</footer>
    </>
  );
}
```
- ### `区别`
 - `React.Fragment 和 <></> 二者的唯一区别就是 React.Fragment 可以设置 key 而 <></> 设置不了`

 - `在 jsx 遍历元素，需要设置 key 时，只能用 React.Fragment，不能用 <></>`
```jsx
<BreadcrumbList>
  {linkList.map((el) => (
    // 需要设置 key时，只能使用 React.Fragment
    <React.Fragment key={el}>
      <BreadcrumbItem>
        <BreadcrumbLink>
          <Link href={el}>{PATHS_MAP[el]}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
    </React.Fragment>
  ))}
  <BreadcrumbItem>
    <BreadcrumbPage>
        {PATHS_MAP[labelLink]}
    </BreadcrumbPage>
  </BreadcrumbItem>
</BreadcrumbList>
```
- ### `Tips`
- `一般情况，应该优先使用 React.Fragment 或者 <></>，这样可以避免不必要的 div 节点，可以让渲染出来的 HTML 结构清晰简洁`

- `使用 <></>时，不要忘记导入 React`

- `React 版本 > 17 时，可以不用导入`