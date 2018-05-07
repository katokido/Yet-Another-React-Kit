- 立即执行函数可以写成箭头函数的形式

```javascript
// 第一种写法
(() => {
  console.log('Welcome to my world.')
})()

// 第二种写法
(() => console.log('Welcome to my home.'))()

// 第三种写法
((value) => value)(item = 4)
```

- 数组解析中的空值占位

```javascript
// 第一种解析
const [, a] = [1, 2, 3, 4, 5]
// a = 2

// 第二种解析
const [, ...a] = [1, 2, 3, 4, 5]
// a = [2, 3, 4, 5]
```
