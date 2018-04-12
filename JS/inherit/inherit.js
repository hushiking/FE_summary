// 属性搜索原则先查找自身，再查找原型链
function Person(age) {
    this.age = age;
    // this.printAge = function() {
    //     console.log(this.age);
    // }
}

Person.prototype.age = 30;
Person.prototype.printAge = function() {
    console.log(this.age * 1.5);
}

let p = new Person(20);
p.printAge();
p.__proto__.printAge();
