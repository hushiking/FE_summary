// 又叫做伪经典继承，集成原型链与借用构造函数的优点，是最常用的继承方式
function SuperType(name) {
    this.name = name
    this.colors = ['red', 'green', 'blue']
}
SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name)
    this.age = age
}
// 继承方法
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
    console.log(this.age)
}

var instance1 = new SubType('小明', 18)
instance1.colors.push('black')
console.log('instance1.colors:', instance1.colors)
instance1.sayName()
instance1.sayAge()

var instance2 = new SubType('小狗', 21)
console.log('instance2.colors:', instance2.colors)
instance2.sayName()
instance2.sayAge()
