const fs = require('fs');

let data = fs.readFileSync('./input.txt', 'UTF-8').split(/\n/).map(function(row) {
    return {dir: row.split(' ')[0],
            n: parseInt(row.split(' ')[1])}
})

var answer = 0;

d = 0;
n = 0;
a = 0;
data.forEach((row) => {
    if (row.dir == 'forward') {
        d = d + row.n;
        n = n + a*row.n;
    }
    if (row.dir == 'down') {
        a = a + row.n;
    }
    if (row.dir == 'up') {
        a = a - row.n;
    }
})
answer = d*n;

console.log(answer)