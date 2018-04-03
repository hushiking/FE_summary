function insertionSort(arr) {
    var len = arr.length
    var preIndex, current
    for (let i = 0; i < len; i++) {
        preIndex = i - 1
        current = arr[i]
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex]
            preIndex--
        }
        // console.log(preIndex)
        arr[preIndex + 1] = current
    }
    return arr
}

function insertSort(arr) {
    var len = arr.length;
    var temp;
    for (var i = 1; i < len; i++) {
        for (var j = 0; j < i; j++) { // 第一个元素视为已经排序 [7, 6, 4]
            if (arr[i] < arr[j]) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// 其中i=1,i~arr.len-1为我们的无序区,而i=0为我们的有序区.
// temp用于记录无序区准备进入有序区的元素,j用于从右往左遍历有序区并将元素往后推,找出相应的插入位置,将temp插入对应位置.
function directInsertionSort(arr) {
    var len = arr.length
    for (var i = 1; i < arr.length; i++) {
        var temp = arr[i];
        var j = i;
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
    return arr
}

console.log(insertionSort([5, 1, 4, 0, 3, 2, 7, 6]))
console.log(insertSort([5, 1, 4, 0, 3, 2, 7, 6]))
console.log(directInsertionSort([5, 1, 4, 0, 3, 2, 7, 6]))
