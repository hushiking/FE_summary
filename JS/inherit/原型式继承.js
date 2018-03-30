// 借助原型基于已有的对象创建新对象，同时还不必因此创建自定义类型。
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
// 从本质上讲，object()对传入其中的对象执行了一次浅复制
var person = {
    name: 'tom',
    friends: ['jerry', 'cuqi', 'darus']
}

var person1 = object(person)
person1.friends.push('gay')

var person2 = object(person)
person2.friends.push('debang')

console.log('person.friends:', person.friends)
console.log('person1.friends:', person1.friends)
console.log('person2.friends:', person2.friends)
console.log('person1.name:', person1.name)
console.log('person2.name:', person2.name)

// ES5通过新增 Object.create()方法规范化了原型式继承
// 问题：原型式继承包含引用类型值的属性始终会共享相应的值
