const fs = require('fs');

let data = fs.readFileSync('./input.txt', 'UTF-8').split(/\n/).map(Number)

var answer = 0;

prev = 100000000
data.forEach((row) => {
    if (row > prev) {
        answer++;
    }
    prev = row;
})

console.log(answer)