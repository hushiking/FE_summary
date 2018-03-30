var name = 'mq'
var departments = {
    name: 'dev',
    getName: function() {
        return `${name}-${this.name}`
    },
    pro: {
        name: 'fe',
        getName: () => {
            return `${name}-${this.name}`
        }
    }
}

var getName = departments.getName
var pro = departments.pro
console.log(this)
console.log(getName())
console.log(departments.getName())
console.log(departments.pro.getName())
console.log(pro.getName())
