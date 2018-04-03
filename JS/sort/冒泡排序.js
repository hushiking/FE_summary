var s1 = 0 // 内层循环
var s2 = 0 // 外层循环
function bubbleSort(arr) {
    var len = arr.length, flag = true, temp;
    for (var i = 0; i < len - 1; i++) { // 比较到 j+1，所以 len-1
        flag = true
        for (var j = 0; j < len - 1 - i; j++) { // 每比较一次，较大项就被移到数组尾部，所以 len-1-i
            if (arr[j] > arr[j + 1]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                flag = false
            }
            s1++
        }
        s2++
        if (flag) {
            break
        }
    }
    console.log('内存循环次数：', s1)
    console.log('外层循环次数：', s2)
    return arr
}

console.log(bubbleSort([5,1,4,0,3,2,7,6]))
