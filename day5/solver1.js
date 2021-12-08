const fs = require('fs');

let data = fs.readFileSync('./day5/input.txt', 'UTF-8').split(/\n/).map(row => {
    c1 = row.trim().split(' -> ')[0].split(',').map(Number);

    c2 = row.trim().split(' -> ')[1].split(',').map(Number);
    let result = []
    if (c1[0] === c2[0]){
        for (let i = Math.min(c1[1], c2[1]); i <= Math.max(c1[1], c2[1]); i++) {
            result.push([c1[0], i])
        }
    } else if (c1[1] === c2[1]){
        for (let i = Math.min(c1[0], c2[0]); i <= Math.max(c1[0], c2[0]); i++) {
            result.push([i, c1[1]])
        }
    }
    return result;
})

data = data.flat(1)
data.sort()

var answer = 0

for (let i = 0; i < data.length; i++) {
    var found = false;
    for (let j = i+1; j < data.length; j++) {
        if (isEqual(data[i], data[j])) {
            if (!found) answer++;
            found = true;
        } else {
            i = j-1; 
            break;
        }
    }
    
}


console.log(answer)



function isEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}