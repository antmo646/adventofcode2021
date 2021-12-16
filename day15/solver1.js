const fs = require('fs');

let data = fs.readFileSync('./day15/input.txt', 'UTF-8').split(/\n/).map(row => row.split('').map(Number));

let visited = ['0,0'];
let distances = new Map();
let maxX = 0;
let maxY = 0;
data.forEach((el,i) => {
    el.forEach((el2, j) => {
        distances.set([j,i].join(),999999999999);
        maxX = j;
    })
    maxY = i;
});
distances.set('0,0', 0)
currentNode = '0,0';
possibleNodes = new Set();

while (true) {
    getPossibleNodes(currentNode);
    var newNode = null;
    possibleNodes.forEach(p => {
        if (newNode == null || distances.get(p) < distances.get(newNode)) newNode = p;
    })
    currentNode = newNode;
    visited.push(currentNode);
    possibleNodes.delete(currentNode);
    if (currentNode == [maxX, maxY].join(',')) break;
}
console.log(distances.get(currentde));

function getPossibleNodes(currentNode) {
    // x-1
    var check = [tr(currentNode)[0]-1, tr(currentNode)[1]].join(',');
    if (tr(currentNode)[0] > 0 && !visited.includes(check)) {
        distances.set(check,Math.min(distances.get(check), (distances.get(currentNode) + data[check.split(',')[1]][check.split(',')[0]])))
        possibleNodes.add(check);
    }
    // x+1
    check = [tr(currentNode)[0]+1, tr(currentNode)[1]].join(',');
    if (tr(currentNode)[0] < maxX && !visited.includes(check)) {
        distances.set(check, Math.min(distances.get(check), (distances.get(currentNode) + data[check.split(',')[1]][check.split(',')[0]])))
        possibleNodes.add(check);
    }
    // y-1
    check = [tr(currentNode)[0], tr(currentNode)[1]-1].join(',');
    if (tr(currentNode)[1] > 0 && !visited.includes(check)) {
        distances.set(check, Math.min(distances.get(check), (distances.get(currentNode) + data[check.split(',')[1]][check.split(',')[0]])))
        possibleNodes.add(check);
    }
    // y+1
    check = [tr(currentNode)[0], tr(currentNode)[1]+1].join(',');
    if (tr(currentNode)[1] < maxY && !visited.includes(check)) {
        distances.set(check, Math.min(distances.get(check), (distances.get(currentNode) + data[check.split(',')[1]][check.split(',')[0]])))
        possibleNodes.add(check);
    }
}


function tr(node) {
    return node.split(',').map(Number);
}