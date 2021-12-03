const fs = require('fs');

let data = fs.readFileSync('./input.txt', 'UTF-8').split(/\n/).map(function(row) {
    return {dir: row.split(' ')[0],
            n: parseInt(row.split(' ')[1])}
})

var answer = 0;

d = 0;
n = 0;
data.forEach((row) => {
    if (row.dir == 'forward') {
        d = d + row.n;
    }
    if (row.dir == 'down') {
        n = n - row.n;
    }
    if (row.dir == 'up') {
        n = n + row.n;
    }
})
answer = d*n;

console.log(answer)