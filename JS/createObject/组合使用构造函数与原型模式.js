// 构造函数与原型混成模式，在使用中最广泛，认同度最高
function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.friends = ['tom', 'jerry', 'cuqi']
}
Person.prototype = {
    constructor: Person,
    sayName: function() {
        console.log('name:', this.name)
    }
}

var person1 = new Person('tom', 23, 'software engineer')
var person2 = new Person('jerry', 20, 'doctor')

person1.friends.push('darus')
console.log('person1.friends:', person1.friends) // [ 'tom', 'jerry', 'cuqi', 'darus' ]
console.log('person2.friends:', person2.friends) // [ 'tom', 'jerry', 'cuqi' ]
console.log(person1.friends === person2.friends) // false
console.log(person1.sayName === person2.sayName) // true
