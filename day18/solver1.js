const fs = require('fs');

let data = fs.readFileSync('./day18/input.txt', 'UTF-8').split(/\r?\n/).map(row => JSON.parse(row))

var myArr = data[0];

for (let index = 1; index < data.length; index++) {
    const right = data[index]
    myArr = [myArr, right];
    reduce = true;
    console.log("add: " + JSON.stringify(myArr))
    while (reduce) {
        while (reduce) {

            reduce = explode();
            if (reduce) console.log("ex: " + JSON.stringify(myArr))
        }
        reduce = split();
        if (reduce) console.log("sp: " + JSON.stringify(myArr))

    }

}
console.log(JSON.stringify(myArr))

console.log("hej")



function explode() {
    var leftMost = [];
    var found = false;
    var rightVal;
    var exploded = false;
    for (let a = 0; a < myArr.length; a++) {
        if (!Array.isArray(myArr[a])) {
            leftMost.push(a);
            if (found) {
                myArr[a] += rightVal;
                found = false;
                break;
            }
            continue;
        };
        for (let b = 0; b < myArr[a].length; b++) {
            if (!Array.isArray(myArr[a][b])) {
                leftMost = [];
                leftMost.push(a);
                leftMost.push(b);
                if (found) {
                    myArr[a][b] += rightVal;
                    found = false;
                    break;
                }
                continue;
            };
            for (let c = 0; c < myArr[a][b].length; c++) {
                if (!Array.isArray(myArr[a][b][c])) {
                    leftMost = [];
                    leftMost.push(a);
                    leftMost.push(b);
                    leftMost.push(c);
                    if (found) {
                        myArr[a][b][c] += rightVal;
                        found = false;
                        break;
                    }
                    continue;
                };
                for (let d = 0; d < myArr[a][b][c].length; d++) {
                    if (!Array.isArray(myArr[a][b][c][d])) {
                        leftMost = [];
                        leftMost.push(a);
                        leftMost.push(b);
                        leftMost.push(c);
                        leftMost.push(d);
                        if (found) {
                            myArr[a][b][c][d] += rightVal;
                            found = false;
                            break;
                        }
                        continue;
                    };
                    if (!exploded) {
                    var leftVal = myArr[a][b][c][d][0];
                    switch (leftMost.length) {
                        case 1:
                            myArr[leftMost[0]] += leftVal;
                            break;
                        case 2:
                            myArr[leftMost[0]][leftMost[1]] += leftVal;
                            break;
                        case 3:
                            myArr[leftMost[0]][leftMost[1]][leftMost[2]] += leftVal;
                            break;
                        case 4:
                            myArr[leftMost[0]][leftMost[1]][leftMost[2]][leftMost[3]] += leftVal;
                            break;
                        default:
                            break;
                    }
                    rightVal = myArr[a][b][c][d][1];
                    myArr[a][b][c][d] = 0;
                    found = true;
                    exploded = true;
                }
                }
            }
        }

    }
    return exploded;
}


function split() {
    for (let a = 0; a < myArr.length; a++) {
        if (!Array.isArray(myArr[a]) && myArr[a] > 9) {
            myArr[a] = [Math.floor(myArr[a] / 2), Math.ceil(myArr[a] / 2)]
            return true;
        };
        for (let b = 0; b < myArr[a].length; b++) {
            if (!Array.isArray(myArr[a][b]) && myArr[a][b] > 9) {
                myArr[a][b] = [Math.floor(myArr[a][b] / 2), Math.ceil(myArr[a][b] / 2)]
                return true;
            };
            for (let c = 0; c < myArr[a][b].length; c++) {
                if (!Array.isArray(myArr[a][b][c]) && myArr[a][b][c] > 9) {
                    myArr[a][b][c] = [Math.floor(myArr[a][b][c] / 2), Math.ceil(myArr[a][b][c] / 2)]
                    return true;
                };
                for (let d = 0; d < myArr[a][b][c].length; d++) {
                    if (!Array.isArray(myArr[a][b][c][d]) && myArr[a][b][c][d] > 9) {
                        myArr[a][b][c][d] = [Math.floor(myArr[a][b][c][d] / 2), Math.ceil(myArr[a][b][c][d] / 2)]
                        return true;
                    };


                }
            }
        }

    }
    return false;
}