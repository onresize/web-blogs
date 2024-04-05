---
title: vite搭建react项目样式隔离方案
lang: zh-CN
feed:
  enable: true
description: vite搭建react项目样式隔离方案
---

# vite搭建react项目样式隔离方案

> 本文作者：[onresize](https://github.com/onresize)

### css module方案

```js
// vite配置css module

css: {
	modules: {
		scopeBehaviour: "global" | "local",
		localsConvention: 'camelCaseOnly' // 开启了 camelCase 格式变量名转换(box-left --> boxLeft)
	}
}
```

```less
// index.module.less
.box {
  .box1 {}
}
#box3 {}
```

```jsx
// App.jsx
import styles from './index.module.less'

const App = () => {
    return (
    <>
        <div classname={`${styles.box} card`}>
        	<div classname={styles.box1}></div>
        </div>
       	<div id={styles.box3}></div>
    </>
    )
}
```

### css in js方案

- #### styled-components
- #### 安装

```bash
yarn add styled-components
```

- #### 使用

```jsx
import styled from 'styled-components';
 
const Wrapper = styled.section`
  margin: 0 auto;
  width: 300px;
  text-align: center;
`;
 
const Button = styled.button`
  width: 100px;
  color: white;
  background: skyblue;
`;
 
render(
  <Wrapper>
    <Button>Hello World</Button>
  </Wrapper>
);
```

- 总结

![](/AA_mdPics/css_module.png)