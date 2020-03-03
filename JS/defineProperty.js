function createQ() {
  this.selfProperty = 'selfProperty'
}
createQ.prototype.test = 'property'

let qq = new createQ()
let tmp = {}

// console.log(qq.test)

Reflect.ownKeys(qq).forEach(property => { // defineProperty 需要深层遍历对象属性监听
  console.log('拥有的属性: ', property)
  Object.defineProperty(qq, property, {
    get() {
      console.log('property get: ', property)
      let getValue = tmp[property]
      return getValue
    },
    set(val) {
      console.log('property set: ', property, val)
      tmp[property] = val
    }
  })
})
qq.selfProperty = 'new value'
qq.newProperty = 'new property'
console.log('get value: ', qq.selfProperty) // defineProperty 只能监听已有属性，无法追踪新增属性
console.log('get value: ', qq.abc)
console.log('get value: ', qq.test) // defineProperty 修改对象默认行为，进而进行监听, 但是对原型的属性需要单独监听
console.log('get value: ', qq.newProperty)