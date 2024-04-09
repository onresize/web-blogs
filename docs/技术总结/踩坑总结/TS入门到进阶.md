---
title: TS入门到进阶
lang: zh-CN
feed:
  enable: true
description: TS入门到进阶
---

# TS 入门到进阶

> 本文作者：[onresize](https://github.com/onresize)

[在线学习 TS](https://www.typescriptlang.org/play)

- #### `Typescript 入门类型`
`boolean, number, string, null, undefined, array, object, symbol, any, void ...`
- void是声明一个没有返回值的类型
```ts
let course: string = '前端工程师'
let price: number = 129
price = '89' //类型报错
let isOnline: boolean = true
```

- #### `元组`
```ts
type TArr = (number | string)[]
let arr: TArr = [1, '2']
// 相当于
let arr: [number, string] = [1, '2'] // 这里必须是对应顺序的类型

arr.push('3')
arr.push(false) // 报错、类型必须是 number | string
```

- #### `联合类型`

```ts
let course1: string | number = '玩转前端'
course1 = 1
course1 = true // 报错

type courseScore = '好' | '非常好' | '嘎嘎好'
let score1: courseScore = '好'
let score2: courseScore = '一般好' // 报错
```

- #### `type 类型别名`
```ts
type TArr = Array<string | number>
let arr = [1, 2, '3'] as TArr

type TObj = {
  a: number
  b?: number | string
  readonly c: number
}

let obj: TObj = {
  a: 1,
  c: 2
}

obj.c = 3 // 报错、c是只可读属性
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
  课程地址: 'xxxx',
}
course['课程地址'] = 'yyyy' // 报错、readonly定义不可修改、?可选符、值可不定义
```

- #### `type 和 interface 的区别`
```ts
// type主要用来定义数据类型、interface主要用来描述数据结构

// 相同点：
// 1.都可以用来描述对象或函数
// 2.都可以扩展和相互继承

interface IFunc { (a: string, b: string): void } // 接口描述函数
type TFunc = (a: string, b: string) => void // type描述函数

const func1: IFunc = (a: string, b: string): void => {
  console.log(`${a}-${b}`)
}

const func2 = function (a: string, b: string): void {
  console.log(`${a}-${b}`)
} as TFunc

interface IA { name: string }
type TB = { hobby: string }

interface IB extends IA { age: number } // interface 继承 interface
interface IC extends TB { address: string } // interface 继承 type

type TC = TB & { sex: string } // type 继承 type
type TD = IA & { character: string } //  type 继承 interface

// 两者只有type能做的：
// 1.type可以什么基本类型、联合类型、元组
type TA = number // 基本类型

interface IC {}
interface ID {}

type TB = IC | ID // 联合类型

type TR = ['1', 2, true] // 元组

// 两者只有interface能做的：
// 1.interface可以重复声明、并且重复声明是自动合并的
interface IA {
  name: string
  age: number
}

interface IA {
  sex: string
}

let person: IA = {
  name: 'yzw',
  age: '18',
  sex: '男'
}
```
- #### `通过 typeof 获取实例的类型进行赋值`
```ts
let el = document.createElement('div')
type TDom = typeof el
```

- #### `类型断言`
- 类型断言、手动你去指定一个值的类型、tsx中只能用as的方式
- 断言的前提条件是、两个类型之间存在父子集关系
```ts
function getLength(input: number | string) {
  const str = input as string 
  console.log(str.length)
}

type n = 1 | 2
let b = 1 as n

let c = '1' as number // 报错、类型互不相干、不能用as断言

type TArr = readonly [string, number]
let arr: TArr = ['1', 2]
// 相当于
let arr = ['1', 2] as const

arr[0] = 1 // 报错、数组可读不可写
```

- <>方式的类型断言
```ts
let str: any = "yzw"
let n1: number = (<string>str).length
```

- 非空断言、当明确在一定条件下、某个对象 `key` 一定存在时、可以用 `!` 标记
```ts
interface IA {
  say?: () => undefined
}

const t: IA = {
  say: () => {}
}

t.say!()
```

- #### `Typescript 函数`

```ts
function 函数名(参数: 参数类型): 返回值类型 {} // 大致语法
function add(x: number, y: number, z?: number): number {
  return x + y
}
add(1, 2)
```

```ts
let add1: (a: number, b: number) => number = function (x: number, y: number): number {
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

- #### `泛型`
- 泛型指的是定义函数、接口或类的时候不去预先指定具体类型、使用的时候才去指定类型
```ts
interface A<T> {
  id: T
}

type B = A<string>
type C = A<number>

let obj1: B = { id: '1' }
let obj2: C = { id: 1 }


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
type CourseProps = keyof VueCourse5 // 只能是name和price选一个、相当于 type CourseProps = 'name' | 'price'
let k:CourseProps = 'name'
let k1:CourseProps = 'p' // 报错类型 'p' 不能赋值给 keyof VueCourse5
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
type ReturnType1<T> = T extends () => infer P ? P : never 
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

