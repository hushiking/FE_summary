class Api {
    constructor() {
        this.user = {
            id: 1,
            name: 'test'
        }
        this.friends = [this.user, this.user, this.user]
        this.photo = 'not a real photo'
    }
    getUser() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.user), 200)
        })
    }
    getFriends(userId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.friends.slice()), 200)
        })
    }
    getPhoto(userId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.photo), 200)
        })
    }
    throwError() {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('Intentional Error')), 200)
        })
    }
}

// 带有“async”标签的函数实际上会返回一个Promise。这样的话，就允许我们非常容易地组合异步控制流
async function getUserInfo() {
    const api = new Api()
    const user = await api.getUser()
    const friends = await api.getFriends(user.id)
    const photo = await api.getPhoto(user.id)
    return {
        user,
        friends,
        photo
    }
}
// 我们可以重新配置前面的样例，让它返回用户数据，而不是简单地打印日志。我们可以通过调用async函数，将其作为一个Promise来获取数据
function promiseUserInfo() {
    getUserInfo().then(({user, friends, photo}) => {
        console.log('promiseUserInfo', {user, friends, photo})
    })
}

promiseUserInfo()

// 我们可以在接收者函数中使用async/await语法，这样的话，就能形成完全具有优势、非常简单的异步编程代码块
async function awaitUserInfo() {
    const {user, friends, photo} = await getUserInfo()
    console.log('awaitUserInfo', {user, friends, photo})
}

awaitUserInfo()

// 获取前十个用户的数据
async function getLotsOfUserData() {
    const users = []
    while (users.length < 10) {
        users.push(await getUserInfo())
    }
    console.log('getLotsOfUserData', users)
}

getLotsOfUserData()

// 如果想要并行获取十个
async function getLotsOfUserDataFaster() {
    try {
        const userPromises = Array(10).fill(getUserInfo())
        const users = await Promise.all(userPromises)
        console.log('getLotsOfUserDataFaster', users)
    } catch (err) {
        console.error(err)
    }
}

getLotsOfUserDataFaster()