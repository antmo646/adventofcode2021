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

    

for (let index = 0; index < 1; index++) {
    const inst = instructions[index];
    var stringPaper = paper.map(row => row.join(','));
    var foldAlong = inst[0] === 'x' ? 0 : 1;
    var toAdd = [];
    if (max[foldAlong] - inst[1] <= inst[1]) {
        var index2 = 0; 
        for (var row = inst[1] - (max[foldAlong] - inst[1]); row < inst[1]; row++) {
            for (var row2 = 0; row2 <= max[foldAlong == 1 ? 0 : 1]; row2++) {
                var checker  = "";
                if (foldAlong == 0) checker = [maxX-index2, row2].join(',');
                else checker = [row2, maxY-index2].join(',');
                if (stringPaper.includes(checker)) {
                    checker = checker.split(',').map(Number);
                    checker[foldAlong] = inst[1] - (checker[foldAlong] - inst[1]);
                    paper.push(checker);
                };
            }
            index2++;
        }
        max[foldAlong] = inst[1] - 1;
    } else {
        paper.forEach(el => {
            if (el[foldAlong] > inst[1]) {
                el[foldAlong] = max[foldAlong] - el[foldAlong];
            } else if (el[foldAlong] < inst[1]) {
                el[foldAlong] = el[foldAlong] + ((max[foldAlong] - inst[1]) - inst[1])
            }
        })
        max[foldAlong] = inst[1] - 1 + ((max[foldAlong] - inst[1]) - inst[1]);
    }
    paper = paper.filter(el => el[foldAlong] <= max[foldAlong]);
}


paper = new Set(paper.map(row => row.join(',')));
console.log(paper.size);


