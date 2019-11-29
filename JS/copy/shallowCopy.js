var createAssigner = function (keysFunc, defaults) {
    return function (obj) {
        var length = arguments.length
        if (defaults) obj = Object(obj)
        if (length < 2 || obj == null) return obj
        for (var index = 1; index < length; index++) {
            var source = arguments[index]
            keys = keysFunc(source)
            l = keys.length
            for (var i = 0; i < l; i++) {
                var key = keys[i]
                if (!defaults || obj[key] === void 0) {
                    obj[key] = source[key]
                }
            }
        }
        return obj
    }
}
var allKeys = function (obj) {
    var keys = []
    for (var key in obj) keys.push(key)
    return keys
}
var extend = createAssigner(allKeys, {})
// 浅拷贝
var aa = {
    t: function () {
        return 0
    }
}
var b = {
    k: 2,
    l: {
        a: 3,
        b: {
            c: 4
        }
    }
}
var res = extend(aa, b)
console.log(res, res['k'])