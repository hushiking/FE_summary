// 执行顺序 b f c d e a
// 立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时
// setTimeout(fn, 0)在下一轮“事件循环”开始时执行
// Promise里面的函数是直接执行的，首先打印 b
// p.then(() => console.log('d'))与Promise.resolve()在本轮“事件循环”结束时执行
// console.log('f');则是立即执行，因此排在 b 后面输出 f
setTimeout(() => console.log('a'), 0)

let p = new Promise((resolve) => {
    console.log('b'); // 进入 promise 内部立即执行
    resolve()
})

p.then(() => console.log('c'))
p.then(() => console.log('d'))

Promise.resolve().then(function () {
    console.log('e');
});

console.log('f');

/** 
 * setTimeout是一个宏任务源，写在里面的回调函数会加到宏任务队列中。
 * Promise是一个微任务源，写在里面resolve以及reject回调会被加到微任务队列中。
 * 事件循环可以分为这样的一个过程：分别是 宏任务->执行栈->微任务。
*/
