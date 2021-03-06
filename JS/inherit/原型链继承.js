// 构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。
// 对象（实例对象）具有属性__proto__，可称为隐式原型，一个对象（实例）的隐式原型指向构造该对象的构造函数的原型对象，这也保证了实例能够访问在构造函数原型中定义的属性和方法。
function SuperType() {
    this.property = true
}
SuperType.prototype.getSuperValue = function() {
    console.log('===', this)
    return this.property
}
SuperType.sign = '超类'

function SubType() {
    this.subproperty = false
}
// 原型链继承
SubType.prototype = new SuperType() // 此方法以超类型的实例对象为原型对象，不仅继承了超类型的属性和方法。而且该实例对象又包含一个指向构造该对象的构造函数的原型对象
// SubType.prototype = SuperType.prototype // 此方法只继承了原型对象上面的方法，无法继承超类型的属性和方法
SubType.prototype.getSubValue = function() {
    return this.subproperty
}

var p = new SuperType()
console.log('SubType:', SubType.sign) // undefined 超类的静态属性无法继承
console.log('p.getSuperValue:', p.getSuperValue()) // p.getSuperValue: true

var instance = new SubType()
console.log('instance.getSuperValue:', instance.getSuperValue())
console.log('instance.getSubValue:', instance.getSubValue())

// 所有函数（方法、构造函数）的默认原型都是 Object 构造函数的实例，包含一个指向构造该原型的构造函数的原型对象，即 Object.prototype
// 原型与实例的关系，使用 instanceof 操作符测试实例与原型链中出现过的构造函数
// 由于原型链的关系，可以说 instance 是 Object、SuperType、SubType 中任何一个类型的实例
console.log(instance instanceof Object)
console.log(instance instanceof SuperType)
console.log(instance instanceof SubType)

// 只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，因此都返回 true
console.log(Object.prototype.isPrototypeOf(instance))
console.log(SuperType.prototype.isPrototypeOf(instance))
console.log(SubType.prototype.isPrototypeOf(instance))



// 原型链问题
function Parent() {
    this.colors = ['red', 'green', 'blue']
}

function Child() {

}
// 原型链继承，Child.prototype 变成了 Parent 的一个实例，因此拥有了一个它自己的 colors 属性，就跟专门创建了一个 Child.prototype.colors 属性一样。
// 结果是 Child 的所有实例都会共享这个 colors 属性！！！
Child.prototype = new Parent()

var instance1 = new Child()
instance1.colors.push('black')
console.log('instance1.colors:', instance1.colors) // instance1.colors: [ 'red', 'green', 'blue', 'black' ]

var instance2 = new Child()
console.log('instance2.colors:', instance2.colors) // instance2.colors: [ 'red', 'green', 'blue', 'black' ]
