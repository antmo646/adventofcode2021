const fs = require('fs');

let data = fs.readFileSync('./day10/input.txt', 'UTF-8').split(/\r\n/).map(row => row.split(''));
var alternatives = {'<': '>', '{': '}','(': ')','[': ']', '>': '<', '}': '{', ')': '(', ']': '['}
var starters = ['<', '{', '(', '['];
var scores = {'(': 1, '[': 2, '{': 3, '<': 4}
var answer = [];

// cands = data.filter(arr => {
//     const counts = {};

//     arr.forEach(ch => {
//         counts[ch] = counts[ch] ? counts[ch] + 1 : 1;
//     })
//     if (counts['<'] != counts['>']) return true;
//     if (counts['{'] != counts['}']) return true;
//     if (counts['('] != counts[')']) return true;
//     if (counts['['] != counts[']']) return true;
//     return false;
// })

var cands = data.filter((arr, i) => {
    var expected = [];
    return !arr.some((ch,j) => {
        if (starters.includes(ch)) expected.push(ch);
        else {
            if (alternatives[ch] !== expected[expected.length-1]) {
                return true;
            }
            expected.pop()
        }
        return false;
    })
})

cands.forEach((arr, i) => {
    var internalAnswer = 0;
    var expected = [];
    arr.forEach((ch,j) => {
        if (starters.includes(ch)) expected.push(ch);
        else {
            expected.pop()
        }
    })
    expected.reverse().forEach(ch => {
        internalAnswer = 5*internalAnswer + scores[ch];
    })
    answer.push(internalAnswer);
})

var a = answer.sort((a,b) => a-b)
var finalAnswer = answer.sort((a,b) => a-b)[Math.floor(answer.length/2)];

console.log(finalAnswer)






