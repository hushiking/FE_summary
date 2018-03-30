// 问题：无法知道所创建对象的类型
function createPerson(name, age, job) {
    var o = new Object()
    o.name = name
    o.age = age
    o.job = job
    o.sayName = function() {
        console.log('this:', this);
        console.log('name:', this.name)
    }
    console.log('全局 this 指向:', this)
    return o
}

var person1 = createPerson('tom', 23, 'software engineer')
var person2 = createPerson('jerry', 20, 'doctor')
person1.sayName()
person2.sayName()
