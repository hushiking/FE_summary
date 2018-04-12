function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
function createAnother(original) {
    var clone = object(original)
    clone.sayHi = function() {
        console.log('hi...')
    }
    return clone
}

var person = {
    name: 'tom',
    friends: ['jerry', 'cuqi', 'darus']
}

// 新对象 anotherPerson 不仅具有 person 的所有属性和方法，还有自己的 sayHi 方法。
var anotherPerson = createAnother(person)
anotherPerson.friends.push('gay')
anotherPerson.sayHi() // hi...

var extraPerson = createAnother(person)
extraPerson.friends.push('debang')
extraPerson.sayHi() // hi...

console.log('anotherPerson.friends:', anotherPerson.friends) // [ 'jerry', 'cuqi', 'darus', 'gay', 'debang' ]
console.log('extraPerson.friends:', extraPerson.friends) // [ 'jerry', 'cuqi', 'darus', 'gay', 'debang' ]

// 在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。
// 上面示范继承模式时使用的 object() 函数不是必需的，任何能给返回新对象的函数都适用于此模式。
