const fs = require('fs');

let data = fs.readFileSync('./day8/input.txt', 'UTF-8').split(/\r\n/).map(row => row.split(' | ')[1].split(' '))
var answer = 0;

data.forEach(arr => {
    arr.forEach(el => {
        if ([2,3,4,7].some(num => num === el.length)) answer++;
    })
})



console.log(answer)
