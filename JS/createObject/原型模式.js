function Person() {

}
Person.prototype.name = 'tom'
Person.prototype.age = 23
Person.prototype.job = 'software engineer'
Person.prototype.sayName = function() {
    console.log('this:', this);
    console.log('name:', this.name)
}

var person1 = new Person()
person1.sayName() // this: Person {} name: tom
var person2 = new Person()
// 当为对象实例添加一个属性时，这个属性会屏蔽原型对象中保存的同名属性
person2.name = 'jerry'
person2.sayName() // this: Person { name: 'jerry' } name: jerry

// 判断属性是否只存在于原型中
function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && name in object
}

// 使用 hasOwnProperty() 方法判断是否是实例属性
console.log('1:', person2.hasOwnProperty('name')) // true
console.log('2:', 'name' in person2) // true
console.log('3:', hasPrototypeProperty(person2, 'name')) // false
delete person2.name
person2.sayName() // this: Person {} name: tom
console.log('4:', person2.hasOwnProperty('name')) // false
console.log('5:', 'name' in person2) // true
console.log('6:', hasPrototypeProperty(person2, 'name')) // true

console.log('实例对象共享原型方法：', person1.sayName === person2.sayName) // true

// Object.keys返回对象自身的可枚举属性
person1.name = 'cuqi'
console.log('person1:', Object.keys(person1)) // [ 'name' ]
console.log('person2:', Object.keys(person2)) // []
console.log('prototype:', Object.keys(person1.__proto__)) // [ 'name', 'age', 'job', 'sayName' ]

// 重写原型对象，每创建一个函数，就会同时创建它的 prototype 对象，这个对象会自动获得 constructor 属性。
// 这里重写了默认的 prototype 对象，因此 constructor 属性变成了新对象的 constructor 属性（指向 Object 构造函数），不再指向 Person 函数。
// 此时，尽管 instanceof 操作符还能返回正确的结果，但通过 constructor 已经无法确定对象的类型了！
Person.prototype = {
    name: 'darus',
    age: '18',
    job: 'teacher',
    sayName: function() {
        console.log('name:', this.name)
    }
}

var friend = new Person()
console.log('实例1:', friend instanceof Object) // true
console.log('实例2:', friend instanceof Person) // true
console.log('构造函数1:', friend.constructor === Person) // false
console.log('构造函数2:', friend.constructor) // function Object() { [native code] }
console.log('构造函数3:', friend.constructor === Object) // true

// 直接添加 constructor 属性会导致它的[[Enumerable]]特性被设置为 true。而默认情况下，原生的 constructor 属性是不可枚举的。
// 因此可以采用 Object.defineProperty()
function Person() {

}
Person.prototype = {
    name: 'darus',
    age: '18',
    job: 'teacher',
    sayName: function() {
        console.log('name:', this.name)
    }
}
// 重设构造函数，只适用于 ECMAScript5 兼容的浏览器
Object.defineProperty(Person.prototype, 'constructor', {
    enumerable: false,
    value: Person
})

var people = new Person()
console.log('构造函数4:', people.constructor === Person) // true
console.log('构造函数5:', '构造函数:', people.constructor) // 构造函数: function Person() { }
console.log('构造函数6:', people.constructor === Object) // false



// 原型的动态性
var man = new Person()

Person.prototype.sayHi = function() {
    console.log('hi...')
}
console.log('Person.prototype:', Person.prototype) // 
man.sayHi() // hi...
// 把原型对象修改为另外一个对象就等于切断了构造函数与最初原型之间的联系
// 记住：实例中的指针仅指向原型，而不指向构造函数
function People() {

}
var woman = new People()
People.prototype = {
    constructor: People,
    name: 'gay',
    age: '18',
    job: 'student',
    sayName: function() {
        console.log('name:', this.name)
    }
}
try {
    woman.sayName()
} catch (error) {
    console.error(error)
}
var woman2 = new People()
woman2.sayName() // gay

// 原生对象的原型可以任意添加属性和方法（不推荐这么做，会覆盖原生方法。也可能会在另一个支持该方法的实现中导致命名冲突）

// 原型对象的问题！！！
// 由于原型中的所有属性是被很多实例共享的，这种共享对于函数非常合适。对于包含基本值的属性倒也可以，可以在实例上添加一个同名属性，隐藏原型中的对应属性。
// 但是对于包含引用类型值的属性来说，修改一个实例的属性，会导致另一个实例的该属性发生变化。所以原型模式也很少使用。
