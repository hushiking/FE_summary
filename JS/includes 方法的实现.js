String.prototype.had = function(search, start) {
    'use strict'
    if (typeof start !== 'number') {
        start = 0
    }

    if (start + search.length > this.length) {
        return false
    } else {
        return this.indexOf(search, start) !== -1
    }
}

let a = 'abcde'
console.log('是否包含：', a.had('ab', 0))
console.log('是否包含：', a.had('ab', 1))
console.log('是否包含：', a.had('bc', 1))
console.log('是否包含：', a.had('ef', 1))
