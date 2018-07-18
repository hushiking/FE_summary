function deepClone(initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
        var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
        // 如果是相互引用对象，则跳出循环，并没有什么卵用
        // if (prop === obj) {
        //     continue;
        // }
        if (typeof prop === 'object') {
            // 判断是数组则原始采用数组
            obj[i] = (prop.constructor === Array) ? [] : {};
            arguments.callee(prop, obj[i]);
        } else {
            obj[i] = prop;
        }
    }
    return obj;
}
var str = {};
var obj = { c: [2, 3], a: { a: "hello", b: 21 }, arr: [{ name: "name", age: 11 }, { eat: function () { console.log('eat') } }] };
var res = deepClone(obj, str);
console.log(res, '===', str)
