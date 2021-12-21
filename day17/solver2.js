const fs = require('fs');

let data = fs.readFileSync('./day17/input.txt', 'UTF-8').match(/-\d+|\d+/g);

let targetArea = new Set();

let answer = 0;

for (let x = data[0]; x <= data[1]; x++) {
    for (let y = data[2]; y <= data[3]; y++) {
        targetArea.add([x, y].join(','));
    }
}

let startY = -2000;
let canNotDoIt = 0;

while (canNotDoIt < 2000) {
    canNotDoIt++;
    for (let startX = 1; startX <= data[1]; startX++) {
        if (findTarget(startX, startY)) {
            canNotDoIt = 0;
        }
    }
    startY++;
}

console.log(answer);

function findTarget(x, y) {
    let position = [0,0]
    let zeroCounter = 0;
    let innerMaxy = 0;
    while(true) {
        position = [position[0] + x, position[1] + y];
        if (x > 0) x--;
        else if (x < 0) x++; 
        else zeroCounter++;
        y--;
        innerMaxy = Math.max(innerMaxy, position[1]);
        if (targetArea.has(position.join(','))) {
            answer++;
            return true; 
        }
        if (position[0] > data[1] || zeroCounter > 400) return false;  
    }
}