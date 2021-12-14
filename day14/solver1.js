const fs = require('fs');
const path = require('path/posix');

let data = fs.readFileSync('./day14/input.txt', 'UTF-8').split(/\r\n/);

let board = data.splice(0, data.indexOf('')).map(row => row.split(''))[0];

let instructions = new Map();
data.forEach(row => {
    row = row.split(' -> ');
    instructions.set(row[0], row[1]);
})

for (let step = 0; step < 10; step++) {
        for (let index = 0; index+1 < board.length; index++) {
            var element = board[index] + board[index+1];
            if (instructions.has(element)) {
                board.splice(index+1, 0, instructions.get(element));
                index++;
            }                
            
        }
}

var max = 0;
var min = 0;
board = board.sort();
var prev = '';
var count = 0;
board.forEach(el => {
    if (prev == '' || prev == el) {
        count++;
        prev = el;
    } else {
        if (count > max) max = count;
        if (count < min || min == 0) min = count;
        count = 1;
        prev = el;
    }
})
console.log(max - min);