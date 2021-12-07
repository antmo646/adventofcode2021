const fs = require('fs');

let data = fs.readFileSync('./day6/input.txt', 'UTF-8').split(/\r\n/)[0].trim().split(',').map(Number)

var answer = 0;

for (var i = 0; i < 40; i++) {
data.forEach((element,index) => {
    if (element > 0) {
        data[index] = element-1;
    } else {
        data[index] = 6;
        data.push(8)
    }
});
}



console.log(data.length)






