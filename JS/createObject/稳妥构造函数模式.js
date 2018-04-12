// 与寄生构造函数模式类似，但有两点不同：
// 一是新创建对象的实例方法不引用 this
// 二是不使用 new 操作符调用构造函数
function Person(name, age, job) {
    // 创建要返回的对象
    var o = new Object()
    // 可以在这里定义私有变量和函数
    function sayHi() {
        console.log('hi...')
    }
    // 添加方法
    o.sayName = function() {
        console.log('sayHi:', sayHi)
        console.log('name:', name)
    }
    // 返回对象
    return o
}

// 变量 person1 中保存的是一个稳妥对象，除了调用 sayName() 方法外，没有别的方式可以访问其数据成员。不可能有别的方法访问传入到构造函数中的原始数据！！
var person1 = Person('tom', 23, 'software engineer')
person1.sayName() // sayHi: function sayHi() { console.log('hi...') } name: tom

// 与寄生构造函数模式类似，该模式创建的对象与构造函数之间也没有什么关系，因此 instanceof 操作符对这种对象也没有意义。
