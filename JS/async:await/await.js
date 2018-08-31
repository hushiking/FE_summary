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

// 检索某个用户、检索他们的好友、获取他们的图片
// 嵌套promise回调函数
// 缺点：回调地狱，更糟糕的是没有错误检查，所以其中任何一个回调都可能会悄无声息地发生失败，表现形式则是未处理的Promise拒绝
function callbackHell() {
    const api = new Api()
    let user, friends
    api.getUser().then(returnedUser => {
        user = returnedUser
        api.getFriends(user.id).then(returnedFriends => {
            friends = returnedFriends
            api.getPhoto(user.id).then(photo => {
                console.log('callbackHell', {
                    user,
                    friends,
                    photo
                })
            })
        })
    })
}

callbackHell()

// promise链
// Promise非常棒的一项特性就是它们能够链接在一起，这是通过在每个回调中返回另一个Promise来实现的。通过这种方式，我们能够保证所有的回调处于相同的嵌套级别
function promiseChain() {
    const api = new Api()
    let user, friends
    api.getUser()
        .then(returnedUser => {
            user = returnedUser
            return api.getFriends(user.id)
        })
        .then(returnedFriends => {
            friends = returnedFriends
            return api.getPhoto(user.id)
        })
        .then(photo => {
            console.log('promiseChain', {
                user,
                friends,
                photo
            })
        })
}

promiseChain()

// async/await
// 在返回Promise函数调用之前，添加“await”将会暂停函数流，直到Promise处于resolved状态为止，并且会将结果赋值给等号左侧的变量。借助这种方式，我们在编写异步操作流时，能够像编写正常的同步命令序列一样
async function asyncAwaitIsYourNewBestFriends() {
    const api = new Api()
    const user = await api.getUser()
    const friends = await api.getFriends(user.id)
    const photo = await api.getPhoto(user.id)
    console.log('asyncAwaitIsYourNewBestFriends', {
        user,
        friends,
        photo
    })
}
// 注意：“async”要放到函数声明开始的位置上。这是必须的，它实际上会将整个函数变成一个Promise

asyncAwaitIsYourNewBestFriends()

// 按顺序地获取某个用户的好友的好友
// 递归promise循环
// 我们创建了一个内部函数，该函数会以Promise链的形式递归获取好友的好友，直至列表为空为止。它完全是函数式的，这一点非常好，但对于这样一个非常简单的任务来说，这个方案依然非常复杂
function promiseLoops() {
    const api = new Api()
    let user, friends
    api.getUser()
        .then(returnedUser => {
            user = returnedUser
            return api.getFriends(user.id)
        })
        .then(returnedFriends => {
            const getFriendsOfFriends = friends => {
                if (friends.length > 0) {
                    let friend = friends.pop()
                    return api.getFriends(friend.id)
                        .then(moreFriends => {
                            console.log('promiseLoops', moreFriends)
                            return getFriendsOfFriends(friends)
                        })
                }
            }
            return getFriendsOfFriends(returnedFriends)
        })
}

promiseLoops()

// async/await for循环
async function asyncAwaitLoops() {
    const api = new Api()
    const user = await api.getUser()
    const friends = await api.getFriends(user.id)
    for (let friend of friends) {
        let moreFriends = await api.getFriends(friend.id)
        console.log('asyncAwaitLoops', moreFriends)
    }
}

asyncAwaitLoops()

// 并行按顺序获取某个用户的好友的好友
// 要并行运行操作，首先生成一个要运行的Promise的列表，然后将其作为参数传递给Promise.all()。这样会返回一个Promise让我们去await它完成，当所有的操作都结束时，它就会进行resolve处理
async function asyncAwaitLoopsParallel() {
    const api = new Api()
    const user = await api.getUser()
    const friends = await api.getFriends(user.id)
    const friendPromises = friends.map(friend => api.getFriends(friends.id))
    const moreFriends = await Promise.all(friendPromises)
    console.log('asyncAwaitLoopsParallel', moreFriends)
}

asyncAwaitLoopsParallel()
