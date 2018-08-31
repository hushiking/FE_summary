const aa = _ => new Promise((res, rej) => { // 设置aa函数返回promise对象
    setTimeout(function() {
        console.log('1')
        res('2')
    }, 1000);
})
let bb = async function() {
  await aa().then((res) => { // await会等待aa()执行完，并且then代码也执行完，当然，then代码里面的异步操作不会执行。
    console.log(res)
    setTimeout(function(){  
        console.log('4') // then中的代码执行完直接进入下一个then，这个then 其实return了undefined
        return 'sdf'
    }, 2000)
    // return '自定义插入'
  }).then(res => {
      console.log(res) // undefined
  }).catch(err => {
      console.log(err)
  })
  console.log('3')
}
console.log(bb()) // Promise {<pending>}
// console结果
// Promise { <pending> }
// 1
// 2
// undefined
// 3
// 4
