const fs = require('fs');

let data = fs.readFileSync('./input.txt', 'UTF-8').split(/\n/).map(Number)

var answer = 0;

prev = 100000000
var i = 0
data.forEach((row) => {
    if ((i+2) < data.length) {
    var sum = row + data[i+1] + data[i+2];
    console.log(sum);
    console.log(prev);
    console.log(" ");
    if (sum > prev) {
        answer++;
    }
    prev = sum;
    i++;
}
})

console.log(answer)