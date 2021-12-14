const fs = require('fs');
const path = require('path/posix');

let instructions = fs.readFileSync('./day13/input.txt', 'UTF-8').split(/\r\n/);
let paper = instructions.splice(0, instructions.indexOf('')).map(row => {
    return row.split(',').map(Number);
});
instructions.splice(0,1);
instructions = instructions.map(row => {
    row = row.split('=');
    return [row[0].at(-1), parseInt(row[1])]
})
var maxX = Math.max(...paper.map(row => row[0]))
var maxY = Math.max(...paper.map(row => row[1]))

var max = [maxX, maxY]

    

for (let index = 0; index < instructions.length; index++) {
    
    const inst = instructions[index];
    var stringPaper = paper.map(row => row.join(','));
    var foldAlong = inst[0] === 'x' ? 0 : 1;
    var toAdd = [];

    paper.forEach(el => {
        if (el[foldAlong] > inst[1]) {
            el[foldAlong] = inst[1] - (el[foldAlong] - inst[1]);
        } 
    })
        max[foldAlong] = inst[1] - 1;
    paper = paper.filter(el => el[foldAlong] <= max[foldAlong]);
}


paper = new Set(paper.map(row => row.join(',')));
paper = Array.from(paper);

var stringrow = [];
for (let y = 0; y <= max[1]; y++) {
    for (let x = 0; x <= max[0]; x++) {
        if (paper.includes([x,y].join(','))) stringrow.push("#");
        else stringrow.push(" ")
    }
    console.log(stringrow.join(''))
    stringrow = [];
}


