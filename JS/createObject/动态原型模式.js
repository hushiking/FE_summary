// 使用动态原型模式时，不能使用对象字面量重写原型，否则已经创建的实例会与新原型之间切断联系。
function Person(name, age, job) {
    // 属性
    this.name = name
    this.age = age
    this.job = job
    this.friends = ['tom', 'jerry', 'cuqi']
    // 方法
    if (typeof this.sayName != 'function') {
        Person.prototype.sayName = function() {
            console.log('name:', this.name)
        }
    }
}

var person1 = new Person('tom', 23, 'software engineer')
person1.sayName() // tom
