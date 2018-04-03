function shellSort(arr) {
    var len = arr.length;
    var gap = 1;
    // gap = Math.floor(len / 2);
    while (gap < len / 3) { //动态定义间隔序列 
        gap = gap * 3 + 1;
    }
    while (gap !== 0) {
        for (var i = gap; i < len; i++) {
            var temp = arr[i];
            var j;
            for (j = i - gap; j >= 0 && temp < arr[j]; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
        // gap = Math.floor(gap / 2);
        gap = (gap - 1) / 3
    }
    return arr;
}

console.log(shellSort([5, 1, 4, 0, 3, 2, 7, 6]))
