for (i = 0; ++i < 101; console.log(i % 5 ? f || i : f + 'Buzz')) f = i % 3 ? '' : 'Fizz';
console.log('===', i);

[...Array(7).keys()].map(days =>new Date(Date.now() - 86400000 * days))

var q = {}; function aa(_, k, v){return q[k] = v};console.log(aa('bb', 'wang', 2));console.log(q)

function arr(arr) {
  return arr.slice().sort(() => Math.random() - .5)
}
arr([1,2,3,4,5])
console.log(arr([1,2,3,4,5]))