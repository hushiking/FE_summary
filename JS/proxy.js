// 我们事先定义一个对象 obj,通过 Proxy 构造器生成一个 proxyObj 对象,并对其 set(写入) 和 get(读取) 行为重新做了修改
let obj = { a: 1, c: function() {return 2} }
let proxyObj = new Proxy(obj, {
    get: function(target, prop, receiver) {
        console.log('target: ', target, prop, receiver)
        let propertyValue = Reflect.get(target, prop, receiver)
        console.log('propertyValue: ', propertyValue)
        return prop in target ? target[prop] : 0
    },
    set: function(target, prop, value) {
        target[prop] = 888
    }
})

// 当我们访问对象原本存在的属性时,会返回原有属性对应的值
console.log('proxyObj.a: ', proxyObj.a)
// 访问一个不存在的属性时,会返回 0,而不是 undefined
console.log('proxyObj.b: ', proxyObj.b)
// 要想 Proxy 起作用,就不能去操作原来对象的对象,也就是目标对象 target,即 obj,必须针对 Proxy 实例,即 proxyObj 对象进行操作,否则达不到预期效果
console.log('obj.b: ', obj.b)

// obj.a = 999
proxyObj.a = 666
proxyObj.b = 555
// obj.a = 777 // 打开注释又是不一样的结果
// 当我们试图去设置新的属性值的时候,总会返回 888
console.log('proxyObj.a: ', proxyObj.a)
// 对于可以设置、但没有设置拦截的操作,则对 proxy 对象的处理结果也同样会作用于原来的目标对象 target 上
console.log('obj.a: ', obj.a)
console.log('proxyObj.b: ', proxyObj.b)
console.log('proxyObj.c: ', proxyObj.c)