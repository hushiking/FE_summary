function quickSort(arr) {
    var len = arr.length;
    if (len <= 1) {
        return arr;
    }
    var midLength = Math.floor(len / 2);
    var midValue = arr.splice(midLength, 1); // 会改变原始数组，所以下面 for 循环遍历的时候采用 arr.length
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < midValue) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(midValue, quickSort(right));
}

console.log(quickSort([5, 1, 4, 0, 3, 2, 7, 6]))
