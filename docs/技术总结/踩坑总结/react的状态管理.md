---
title: react的状态管理
lang: zh-CN
feed:
  enable: true
description: react的状态管理
---

# react的状态管理

> 本文作者：[onresize](https://github.com/onresize)


- react生态流行的状态管理库有：`redux、mobx、dva、recoil、zustand`
- 当前版本：
```json
"react": "^18.2.0",
"react-dom": "^18.2.0",

"@reduxjs/toolkit": "^2.2.3",
"react-redux": "^9.1.0",

"mobx": "^6.12.0",
"mobx-persist-store": "^1.1.4",
"mobx-react-lite": "^4.0.6",
```

### 1.项目中使用redux
- 安装
```bash
yarn add react-redux @reduxjs/toolkit
```

- src -> store -> index.jsx
```jsx
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
// 默认存储在localStorage
import storage from 'redux-persist/lib/storage'
// 存储在sessionStorage
// import storageSession from 'redux-persist/lib/storage/session'
import header from './modules/header'

const reducer = combineReducers({
  header,
})

const persistConfig = {
  key: 'redux-state',
  storage,
  // blacklist: ['xxx'], // reducer 里不持久化的数据, 除此外均为持久化数据
  whitelist: ['header'], // reducer 里持久化的数据, 除此外均为不持久化数据
}

const persistReducerConfig = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistReducerConfig,
  devTools: true, // 开启redux调试工具
  // 关闭序列化检测
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// 持久化
export const persistor = persistStore(store)
```

- src -> store -> modules -> header.jsx
```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 100,
  name: 'yzw'
}

const counterSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    // 重置状态
    reset: state => initialState,
    incremented: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { incremented } = counterSlice.actions // 固定模板导出方法

export default counterSlice.reducer
```

- 入口文件 main.jsx 示例
```jsx
import ReactDOM from 'react-dom/client'
import Router from './router'
import { Provider } from 'react-redux'
import { store } from './store/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 注册store
  <Provider store={store}>
    <Router />
  </Provider>
)
```

- index.jsx 页面中使用 
```jsx
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { incremented, reset } from '@/store/modules/header'

export default function MyPage() {
  const dispatch = useDispatch() 
  const { value, name } = useSelector(({ header }) => header) // 解构出 header模块 中的 initialState 值

  return (
    <>
      <h2>
        {value}
      </h2>
      <Button onClick={() => dispatch(incremented(value + 1))}>+1</Button>
      <Button onClick={() => dispatch(incremented(value - 1))}>-1</Button>
      <Button onClick={() => dispatch(reset())}>重置</Button>
    </>
  )
}
```

### 2.项目中使用mobx
- 安装
```bash
yarn add mobx mobx-persist-store mobx-react-lite
```

- src -> mobx -> index.jsx
```jsx
import { createContext, useContext } from "react";

import login from "./modules/login";
import header from "./modules/header";

class RootStore {
	login = login;
	header = header;
}

const Context = createContext(new RootStore());

export default function useStore() {
	return useContext(Context);
}
```

- src -> store -> modules -> header.jsx
```jsx
import { configure, makeAutoObservable, reaction, action } from "mobx";
import { makePersistable, isHydrated } from "mobx-persist-store";

configure({
	enforceActions: "never"
});

class Header {
	isCollapse = false; // false：展开

	// 重置状态
	resetState() {
		globalThis.localStorage.clear();
		this.isCollapse = false;
	}

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
		makePersistable(this, {
			name: "HeaderStore",
			// 需要持久化的属性key
			properties: ["isCollapse"],
			storage: globalThis.localStorage
		});
	}

	get isHydrated() {
		return isHydrated(this);
	}

	updateCollapse(bool) {
		this.isCollapse = bool;
	}
}

const header = new Header();
export default header;
```

- index.jsx 页面中使用 
```jsx
import { observer } from "mobx-react-lite";
import useStore from "@/mobx/index";

// 当mobx数据变化、observer包裹的组件、数据才会响应变更
const CollapseIcon = observer((props) => {
	const { header } = useStore();

	return (
		<div
			onClick={() => {
				header.updateCollapse(!header.isCollapse);
			}}
		>
			{header.isCollapse}
		</div>
	);
});

export default CollapseIcon;
```