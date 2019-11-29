'use strict'
function chef(foods) {
    let i = 0
    return {
        next() {
            let done = i >= foods.length
            let value = !done ? foods[i++] : undefined
            return {
                value,
                done
            }
        }
    }
}

let a = chef([1, 2, 3])
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
