var arr = [1,2,3]

arr.forEach(row => {
    console.log(row)
    if (row == 2) {
        arr.splice(1,1);
    }
})