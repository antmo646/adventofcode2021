const fs = require('fs');

let data = fs.readFileSync('./input.txt', 'UTF-8').split(/\r\n/)
console.log(data)
var answer = 0;

var gamma = [];
var epsilon = [];

for (var i = 0; i < data[0].length; i++) {

    zeros = 0;
    ones = 0;

    data.forEach(row => {
        if (row[i] == '0') zeros++;
        else ones++;  
    })
    if (zeros > ones) {
        gamma.push(0);
        epsilon.push(1);
    } else {
        gamma.push(1);
        epsilon.push(0);
    }
}

console.log(gamma);
console.log(epsilon);
gamma = parseInt(gamma.join(""), 2);
epsilon = parseInt(epsilon.join(""), 2);

answer = gamma*epsilon;

console.log(answer)