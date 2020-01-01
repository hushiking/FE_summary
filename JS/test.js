const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
  const that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []
  // 待完善 resolve 和 reject 函数
  // 待完善执行 fn 函数
  function resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }
  
  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }
  }
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
          throw r
        }
  if (that.state === PENDING) {
    console.log('等待态')
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {
    console.log('完成态')
    onFulfilled(that.value)
  }
  if (that.state === REJECTED) {
    console.log('失败态')
    onRejected(that.value)
  }
}

var promise = new MyPromise((resolve, reject) => {
  var that = this
  setTimeout(() => {
    resolve(1)
    console.log('state==>', this, that, promise.state, promise.value)
  }, 0)
  setTimeout(() => {
    console.log(this.state, this.value)
  }, 2000)
})
console.log('>>>', promise.then(22))

setTimeout(() => {
  console.log(promise.state, promise.value)
  promise.then(v => {
    console.log('值2==>', v)
  })
}, 3000)