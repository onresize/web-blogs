---
title: TS入门到进阶
lang: zh-CN
---

# TS 入门到进阶

> 本文作者：[onresize](https://github.com/onresize)

- ## 入门
  [在线学习 TS](https://www.typescriptlang.org/play)

```ts
// 类型系统
let course: string = '前端工程师'
let price: number = 129
price = '89' //类型报错
let isOnline: boolean = true
```

- #### `Typescript 入门类型`

  `boolean, number, string, null, undefined, symbol, any, enum ...`

- #### `联合类型`

```ts
let course1: string | number = '玩转前端'
course1 = 1
course1 = true // 报错

type courseScore = '好' | '非常好' | '嘎嘎好'
let score1: courseScore = '好'
let score2: courseScore = '一般好' // 报错
```

- #### `接口类型`

```ts
interface 前端课程 {
  课程名字: string
  价格: number[]
  受众: string
  讲师头像?: string | boolean
  readonly 课程地址: string
}
let course: 前端课程 = {
  课程名字: '玩转前端',
  价格: [59, '139'],
  讲师头像: false,
  课程地址: 'xxxx',
}
course['课程地址'] = 'yyyy' // 报错
```

- #### `Typescript 函数`

```ts
function 函数名(参数: 参数类型): 返回值类型 {} //大致语法
function add(x: number, y: number): number {
  return x + y
}
add(1, 2)
```

```ts
let add1: (a: number, b: number) => number = function (
  x: number,
  y: number
): number {
  return x + y
}
type addType = (a: number, b: number) => number
let add2: addType = function (x: number, y: number): number {
  return x + y
}

interface addType1 {
  (a: number, b: number): number
}
let add3: addType1 = function (x: number, y: number): number {
  return x + y
}
```

```ts
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
```

- #### `宿主环境的类型` [参考](https://github.com/Microsoft/TypeScript/tree/main/src/lib)

```ts
let w: Window = window
let ele: HTMLElement = document.createElement('div')
let allDiv: NodeList = document.querySelectorAll('div')

ele.addEventListener(
  'click',
  function (e: MouseEvent) {
    const args: IArguments = arguments
    w.alert(1)
    console.log(args)
  },
  false
)
```

- #### `泛型入门`
```ts
function identity0(arg: any): any {
    return arg
}
// 相当于type T = arg的类型
function identity<T>(arg: T): T {
    return arg
}
identity<string>('玩转前端') // 这个T就是string，所以返回值必须得是string
identity<number>(1)
```

- #### `keyof`
```ts
interface VueCourse5 {
    name:string,
    price:number
}
type CourseProps = keyof VueCourse5 // 只能是name和price选一个
let k:CourseProps = 'name'
let k1:CourseProps = 'p' // 改成price
```

- #### `extends && in`
```ts
// T extends U ? X : Y 类型三元表达式

type ExtendsType<T> = T extends boolean ? "前端" : "后端"
type ExtendsType1 = ExtendsType<boolean> 
// type ExtendsType1='前端'
type ExtendsType2 = ExtendsType<string> 
// type ExtendsType2='后端'


type Courses = '前端'|'后端'
type CourseObj = {
    [k in Courses]:number // 遍历Courses类型作为key
}
// 上面的代码等于下面的定义
// type CourseObj = {
//     前端: number;
//     后端: number;
// }
```

```ts
// K extends keyof T限制K的类型必须是T的属性之一
// T[K]是值得类型
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]
}
const coursePrice:CourseObj = {
    "前端":20,
    "后端":30
}
getProperty(coursePrice,'前端')
getProperty(coursePrice,'运维') // 报错
```

- #### `infer`
```ts
// 其实写的不多，认识一下就好
type Foo = () => CourseObj

// 如果T是一个函数，并且函数返回类型是P就返回P
type ReturnType1<T> = T extends ()=>infer P ?P:never 
type Foo1 = ReturnType1<Foo>
```

- #### [好用的类型工具函数](https://www.typescriptlang.org/docs/handbook/utility-types.html)
```ts
interface Todo {
  title: string
  desc:string
  done?: boolean
}


type partTodo = Partial<Todo>
type requiredTodo = Required<Todo>
type TodoPreview = Pick<Todo, "title" | "desc">
type TodoPreview1= Omit<Todo, "desc">
```


- ## 进阶

```ts
// TODO:
```
