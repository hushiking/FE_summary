// 也叫做伪造对象或经典继承
// 函数只不过是在特定环境中执行代码的对象
// 优点：每个实例都会具有自己的 colors 属性的副本；可以向超类型构造函数传递参数
function SuperType(name) {
    this.name = name
    this.colors = ['red', 'green', 'blue']
}

function SubType(name) {
    SuperType.call(this, name)
}

var instance1 = new SubType('小明')
instance1.colors.push('black')
console.log('instance1.colors:', instance1.colors, instance1.name)

var instance2 = new SubType('小狗')
console.log('instance2.colors:', instance2.colors, instance2.name)

// 问题：无法避免构造函数存在的问题——方法都在构造函数中定义，函数复用无从谈起！！！
