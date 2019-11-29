Array.prototype.myReduce = function(callbackFn) {
  // 拿到数组
  const arr = this,
    len = arr.length;
  // 下标值
  let k = 0,
    // 累加器
    accumulator = undefined,
    // k下标对应值是否存在
    kPresent = false,
    // 初始值
    initialValue = arguments.length > 1 ? arguments[1] : undefined;
  
  if (typeof callbackFn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function');
  }
  // 数组为空并且无初始值, 报错
  if (len === 0 && arguments.length < 2) {
    throw new TypeError('Reduce of empty array with no initial value');
  }
  // 如果初始值存在
  if (arguments.length > 1) {
    accumulator = initialValue;
  } else {
    // 不存在
    accumulator = arr[k];
    ++k;
  }

  while(k < len) {
    // 判断是否为 empty [,,,]
    kPresent = arr.hasOwnProperty(k);
    // 如果下标值存在
    if (kPresent) {
      const kValue = arr[k];
      // 调用 callbackFn
      accumulator = callbackFn.apply(undefined, [accumulator, kValue, k, arr]);
    }
    ++k;
  }

  return accumulator;
}

const lReduce = Array(5).myReduce((a, b) => a + b, 3);
const aReduce = [].myReduce((a, b) => a + b, 5);
const rReduce = ['1', null, undefined, , 3, 4].reduce((a, b) => a + b, 3);
const mReduce = ['1', null, undefined, , 3, 4].myReduce((a, b) => a + b, 3);

console.log(rReduce, mReduce);
console.log(lReduce, aReduce);