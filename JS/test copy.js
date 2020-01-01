class MyPromise {
  constructor(callback) {
      this.__succ_res = null;     //保存成功的返回结果
      this.__err_res = null;      //保存失败的返回结果
      this.status = 'pending';    //标记处理的状态
      //箭头函数绑定了this，如果使用es5写法，需要定义一个替代的this
      callback((...arg) => {
          console.log('值1===', arg)
          this.__succ_res = arg;
          this.status = 'success';
      }, (...arg) => {
          this.__err_res = arg;
          this.status = 'error';
      });
  }
  then(onFulfilled, onRejected) {
      if (this.status === 'success') {
          onFulfilled(...this.__succ_res);
      } else if (this.status === 'error') {
          onRejected(...this.__err_res);
      };
  }
};

new MyPromise((resolve, reject) => {
  resolve(1);
}).then(res => {
  console.log(res);
});
//结果 1
