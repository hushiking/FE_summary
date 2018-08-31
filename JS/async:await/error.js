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

// Promise错误回调
// 这是非常恐怖的一种写法。除了非常冗长和丑陋之外，控制流非常不直观，因为它是从输出接入的，而不像正常的、易读的代码库那样，从顶部到底部进行编写
function callbackErrorHell() {
    const api = new Api()
    let user, friends
    api.getUser().then(function (returnedUser) {
        user = returnedUser
        api.getFriends(user.id).then(function (returnedFriends) {
            friends = returnedFriends
            api.throwError().then(function () {
                console.log('Error was not thrown')
                api.getPhoto(user.id).then(function (photo) {
                    console.log('callbackErrorHell', {
                        user,
                        friends,
                        photo
                    })
                }, function (err) {
                    console.error(err)
                })
            }, function (err) {
                console.error(err)
            })
        }, function (err) {
            console.error(err)
        })
    }, function (err) {
        console.error(err)
    })
}

callbackErrorHell()

// Promise链的‘Catch’方法
// 我们在Promise链的最后使用了一个catch函数，这样能够为所有的操作提供一个错误处理器。但是，这还有些复杂，我们还是需要使用特定的回调来处理异步错误，而不能像处理正常的Javascript错误那样来进行处理
function callbackErrorPromiseChain() {
    const api = new Api()
    let user, friends
    api.getUser()
        .then((returnedUser) => {
            user = returnedUser
            return api.getFriends(user.id)
        })
        .then((returnedFriends) => {
            friends = returnedFriends
            return api.throwError()
        })
        .then(() => {
            console.log('Error was not thrown')
            return api.getPhoto(user.id)
        })
        .then((photo) => {
            console.log('callbackErrorPromiseChain', {
                user,
                friends,
                photo
            })
        })
        .catch((err) => {
            console.error(err)
        })
}

callbackErrorPromiseChain()

// 正常的try/catch代码块
// 我们将整个操作包装在了一个正常的try/catch代码块中。通过这种方式，我们可以按照完全相同的方式，抛出和捕获同步代码和异步代码中的错误。这种方式简单了很多
async function aysncAwaitTryCatch() {
    try {
        const api = new Api()
        const user = await api.getUser()
        const friends = await api.getFriends(user.id)
        await api.throwError()
        console.log('Error was not thrown')
        const photo = await api.getPhoto(user.id)
        console.log('async/await', {user, friends, photo})
    } catch (err) {
        console.error(err)
    }
}

aysncAwaitTryCatch()