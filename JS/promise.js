setTimeout(() => console.log('a'), 0)

let p = new Promise((resolve) => {
    console.log('b');
    resolve()
})

p.then(() => console.log('c'))
p.then(() => console.log('d'))
console.log('e');
