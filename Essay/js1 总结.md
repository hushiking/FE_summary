# JS 精简代码

## 日历: 创建过去 7 天的数组, 减号换成加号, 代表未来 7 天的数组

```js
[...Array(7).keys()].map(days =>new Date(Date.now() - 86400000 * days))
```

## 生成随机 ID, 并不安全

```js
Math.random().toString(36).substring(2)
```

## 获取URL的查询参数

`?foo=bar&baz=bing => {foo: bar, baz: bing}`

```js
var q = {}

location.search.replace(/([^?&=]+)=([^&]+)/g, (_,k,v)=>q[k]=v)

console.log(q)
```

`[^?&=]`表示匹配任意不在方括号内部的字符, `+` 表示匹配多个

## 每秒使用当前时间更新页面

```html
<body onload="setInterval(() => document.body.innerHTML = new Date().toLocaleString().slice(10, 19))"></body>
```

## 数组混淆

```js
(arr) => arr.slice().sort(() => Math.random - .5)
```

## 生成随机十六进制代码（生成随机颜色)

```js
'#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')
```

## 面试题

```js
for (i = 0; ++i < 101; console.log(i % 5 ? f || i : f + 'Buzz')) f = i % 3 ? '' : 'Fizz';
```

## 数组去重

```js
[...new Set(arr)]
```

## 创建特定大小的数组

```js
[...Array(3).keys()]
```
