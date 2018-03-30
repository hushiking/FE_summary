// 最理想的继承模式
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
// 不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。
// 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型
function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype)
    prototype.constructor = subType
    subType.prototype = prototype
}

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

inheritPrototype(SubType, SuperType)
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
