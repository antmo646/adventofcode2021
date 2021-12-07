const fs = require('fs');
const days = process.argv[2]

let data = fs.readFileSync('./day6/input.txt', 'UTF-8').split(/\r\n/)[0].trim().split(',').map(Number)

var answer = 0;

var seen = new Map();


data.forEach((element,index) => {
    answer += generator(element-1, days)
});



console.log(answer)





function generator(size, days) {
    var orgDays = days;
    totals = 1;
    days -= size+1;
    if (days > 0) {
        if (seen.has([8, days].join(','))) {
            totals += seen.get([8, days].join(','));
        } else {
            totals += generator(8, days);
        }
        
    }
    days -= 7;
    while (days > 0) {
        if (seen.has([8, days].join(','))) {
            totals += seen.get([8, days].join(','));
        } else {
            totals += generator(8, days)
        }
        days -= 7;
    }
    if (totals > 44571) {
        seen.set([size, orgDays].join(','), totals);
    }
    if (totals > 445710000) {
    }
    return totals;
}