function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }

  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?

// 缓存代理实现乘积运算
const mult = function () {
  let a = 1
  for (let i = 0, l; l = arguments[i++];) {
    a = a * l
  }
  return a
}

const proxyMult = (function () {
  const cache = {}
  return function () {
    const tag = Array.prototype.join.call(arguments, ',')
    console.log('tag==>', tag)
    if (cache[tag]) {
      return cache[tag]
    }
    console.log('this==>', this)
    cache[tag] = mult.apply(this, arguments)
    return cache[tag]
  }
})()
console.log(proxyMult(1, 2, 3, 4))
console.log(proxyMult(1, 2, 3, 4))