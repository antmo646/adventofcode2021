const fs = require('fs');

let data = fs.readFileSync('./day3/input.txt', 'UTF-8').split(/\r\n/)
var answer = 0;

let an1 = 0;
let an2 = 0;

function gamma(arr, pos){
    console.log(arr)
    if (arr.length == 1) {
        console.log("gamma")
        console.log(arr)
        console.log(parseInt(arr.join(""), 2))
        an1=parseInt(arr.join(""), 2);
        return;
    }
    ones = arr.filter(item => item[pos] == '1')
    zeros = arr.filter(item => item[pos] == '0')
    if (ones.length >= zeros.length) 
    {
        gamma(ones, pos+1)
    } else {
        gamma(zeros, pos+1)
    }
    return;
};
function epsilon(arr, pos){
    console.log(arr)
    if (arr.length == 1) {
        console.log("epsilon")
        console.log(arr)
        console.log(parseInt(arr.join(""), 2))
        an2=parseInt(arr.join(""), 2);

        return;
    }
    ones = arr.filter(item => item[pos] == '1')
    zeros = arr.filter(item => item[pos] == '0')
    if (zeros.length <= ones.length) 
    {
        epsilon(zeros, pos+1)
    } else {
        epsilon(ones, pos+1)
    }
    return;
};


gamma(data, 0);
epsilon(data, 0);
console.log(an1*an2)