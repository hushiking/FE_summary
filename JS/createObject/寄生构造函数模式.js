// 寄生构造函数模式返回的对象与构造函数或者构造函数的原型属性之间没有关系。也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同。
// 因此，不能依赖 instanceof 操作符来确定对象类型，所以不建议使用这种模式创建对象。
function Person(name, age, job) {
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

var person1 = new Person('tom', 23, 'software engineer')
person1.sayName()

// 这个模式可以在特殊的情况下用来为对象创建构造函数。例如我们想创建一个具有额外方法的特殊数组。由于不能直接修改 Array 构造函数，因此可以使用这种模式
function SpecialArray() {
    // 创建数组
    var values = new Array()
    // 添加值
    values.push.apply(values, arguments)
    // 添加方法
    values.toPipedString = function() {
        return this.join('|')
    }
    // 返回数组
    return values
}

var colors = new SpecialArray('red', 'green', 'blue')
console.log(colors.toPipedString())
