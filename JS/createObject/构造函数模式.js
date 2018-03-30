// 问题：每个方法都要在每个实例上重新创建一遍。创建两个完成同样任务的方法没有必要，会占用内存。
function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = function() {
        console.log('this:', this);
        console.log('name:', this.name)
    }
}

var person1 = new Person('tom', 23, 'software engineer')
var person2 = new Person('jerry', 20, 'doctor')
person1.sayName()
person2.sayName()