const fs = require('fs');

let data = fs.readFileSync('./day10/input.txt', 'UTF-8').split(/\r\n/).map(row => row.split(''));
var alternatives = {'<': '>', '{': '}','(': ')','[': ']', '>': '<', '}': '{', ')': '(', ']': '['}
var starters = ['<', '{', '(', '['];
var scores = {')': 3, ']': 57, '}': 1197, '>': 25137}
var answer = 0;

data.forEach((arr, i) => {
    var expected = [];
    arr.some((ch,j) => {
        if (starters.includes(ch)) expected.push(ch);
        else {
            if (alternatives[ch] !== expected[expected.length-1]) {
                answer += scores[ch];
                return true;
            }
            expected.pop()
        }
        return false;
    })
})




console.log(answer)






// cands = data.reduce(arr => {
//     const counts = {};

//     for (const ch of arr) {
//     counts[ch] = counts[ch] ? counts[ch] + 1 : 1;
//     }
//     if (counts['<'] != counts['>']) return false;
//     if (counts['{'] != counts['}']) return false;
//     if (counts['('] != counts[')']) return false;
//     if (counts['['] != counts[']']) return false;
//     return true;
// })