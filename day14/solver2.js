const fs = require('fs');
const path = require('path/posix');

let data = fs.readFileSync('./day14/input.txt', 'UTF-8').split(/\n/);

let board = data.splice(0, data.indexOf('')).map(row => row.split(''))[0];

let answer = new Map();

let seen = new Map();

let instructions = new Map();
data.forEach(row => {
    row = row.split(' -> ');
    instructions.set(row[0], row[1]);
})

board.forEach(el => {
    if (answer.has(el)) answer.set(el, answer.get(el)+1);
    else answer.set(el, 1);
})

for (let index = 0; index + 1 < board.length; index++) {
    var element = board[index] + board[index + 1];
    if (instructions.has(element)) {
        var newLetter = instructions.get(element);
        if (answer.has(newLetter)) answer.set(newLetter, answer.get(newLetter)+1);
        else answer.set(newLetter, 1);
        answer = mergeMaps(answer, addNew(2, [board[index], instructions.get(element)]));
        answer = mergeMaps(answer, addNew(2, [instructions.get(element), board[index + 1]]));
    }
}
var max = Math.max(...answer.values());
var min = Math.min(...answer.values());
console.log(max - min);


function addNew(step, element) {
    if (step > 40) return new Map();
    var elString = element.join("");
    if (seen.has(elString + step)) return seen.get(elString + step);   

    if (instructions.has(elString)) {
        var newLetter = instructions.get(elString);

        //Left side
        var temp1 = addNew(step + 1, [element[0], newLetter])
        
        //Right side
        var temp2 = addNew(step + 1, [newLetter, element[1]])

        var temp = mergeMaps(temp1, temp2);
        if (temp.has(newLetter)) temp.set(newLetter, temp.get(newLetter)+1);
        else temp.set(newLetter, 1);
        seen.set(elString + step, temp);
        return temp;
    }
    return new Map();
}


function mergeMaps(map1, map2) {
    var merged = new Map();
    var array = new Set([...map1.keys(), ...map2.keys()])
    array.forEach(key => {
        toAdd = 0;
        if (map1.has(key)) toAdd += map1.get(key);
        if (map2.has(key)) toAdd += map2.get(key);
        merged.set(key, toAdd);
    })
    return merged;
}