const fs = require('fs');

let data = fs.readFileSync('./day11/input.txt', 'UTF-8').split(/\r\n/).map(row => row.split('').map(Number));

var answer = 0;
var flasher = []
for (let index = 0; index < 100; index++) {
    flasher = [];
    data.forEach((arr,i) => {
        arr.forEach((num,j) => {
            if (num === 9) flasher.push([i,j])
            data[i][j] = num+1;
        })
    })
    for (let index2 = 0; index2 < flasher.length; index2++) {
        const element = flasher[index2];
        increaseNeighbour(...element);
         //kom ihåg inte inca flash. Om flash, lägg till i flasher arr så sköter denna loopen det;
    }
    flasher.forEach(el => data[el[0]][el[1]] = 0)
    answer += flasher.length;
    //nolla flashers efter arrayen.
}

console.log(answer)


function increaseNeighbour(i,j) {
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if ((0 <= (x+i) && (x+i) < data.length) && (0 <= (y+j) && (y+j) < data[0].length) && !(x == 0 & y == 0)) {
                if (data[x+i][y+j] == 9) flasher.push([x+i,y+j])
                if (data[x+i][y+j] != 10) data[x+i][y+j] = data[x+i][y+j] +1;
            }
        }
    }
    return;
}