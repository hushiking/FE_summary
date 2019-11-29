const foo = {name: 'foo'}

foo.fn = function() {
  // 这里的 this 指向了 foo
  // 因为 foo 调用了 fn，
  // fn 的 this 就指向了调用它所在方法的对象 foo 上
  console.log(this.name)
}

foo.fn()

// 利用 this 的机制来实现 call
Function.prototype.myCall = function(thisArg) {
  if (typeof this !== 'function') {
    // 调用call的若不是函数则报错
    throw new TypeError('Error')
  }

  const args = [...arguments].slice(1)
  thisArg = thisArg || window
  // 将调用call函数的对象添加到thisArg的属性中
  thisArg.fn = this
  // 执行该属性
  const result = thisArg.fn(...args)
  // 删除该属性
  delete thisArg.fn
  // 返回函数执行结果
  return result
}

// 利用 this 的机制来实现 apply
Function.prototype.myApply = function(thisArg) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }

  const args = arguments[1]
  thisArg = thisArg || window
  thisArg.fn = this
  const result = thisArg.fn(...args)
  delete thisArg.fn
  return result
}

const bar = function() {
  console.log(this.name, arguments)
}

bar.prototype.name = 'bar'

const func = {
  name: 'foo'
}

bar.myCall(func, 1, 2, 3) // foo [1, 2, 3]
bar.myApply(func, [1, 2, 3]) // foo [1, 2, 3]