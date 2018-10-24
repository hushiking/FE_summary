// 等待2秒执行
function sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

async function exec() {
    console.log('等待...')
    await sleep(2000)
    console.log('2秒过后，执行！')
}

exec()