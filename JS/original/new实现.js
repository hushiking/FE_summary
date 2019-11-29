function myNew() {
  // 创建一个实例对象
  var obj = new Object()
  // 取得外部传入的构造器
  var Constructor = Array.prototype.shift.call(arguments)
  // 实现继承, 实例可以访问构造器的属性
  obj.__proto__ = Constructor.prototype
  // 调用构造器, 并改变其 this 指向到实例
  var result = Constructor.apply(obj, arguments)
  // 如果构造函数返回值是对象则返回这个对象，如果不是对象则返回新的实例对象
  return typeof result === 'object' ? result : obj
}

// ========= 无返回值 =============
const testNewFun = function(name) {
  this.name = name;
};

const newObj = myNew(testNewFun, 'foo');

console.log(newObj); // { name: "foo" }
console.log(newObj instanceof testNewFun); // true
// ========= 有返回值 =============
const testNewFun1 = function(name) {
  this.name = name;
  return {};
};

const newObj1 = myNew(testNewFun1, 'foo');

console.log(newObj1); // {}
console.log(newObj1 instanceof testNewFun1); // false