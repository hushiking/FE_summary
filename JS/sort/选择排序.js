function selectionSort(arr) {
    var len = arr.length
    var minIndex, temp
    for (var i = 0; i < len - 1; i++) {
        minIndex = i
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) { // 寻找较小的数（直到最小）
                minIndex = j // 将最小的索引保存
            }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr
}

function selectSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var min = arr[i]; // 假定最小值
        var k = i; // 最小值索引
        for (var j = i + 1; j < len; j++) {
            if (min > arr[j]) { // 找出最小值
                min = arr[j];
                k = j; // 最小值索引
            }
        }
        arr[k] = arr[i]; // 实际最小值与假定最小值交换
        arr[i] = min; // 实际最小值移到头部
    }
    return arr;
}

console.log(selectionSort([5, 1, 4, 0, 3, 2, 7, 6]))
console.log(selectSort([5, 1, 4, 0, 3, 2, 7, 6]))
