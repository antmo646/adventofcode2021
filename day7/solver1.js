const fs = require('fs');

let data = fs.readFileSync('./day7/input.txt', 'UTF-8').split(',').map(Number);

var av = data.reduce((a, b) => a + b) / data.length;

var av = Math.round(av);

var ans;

if (calcClosest(av) < calcClosest(av-1)) {
    while (true) {
        var f1 = calcClosest(av+1);
        var f2 = calcClosest(av);
        if (f1 > f2) {
            ans = f2;
            break;
        }
        av++;
    }
} else {
    while (true) {
        var f1 = calcClosest(av-1);
        var f2 = calcClosest(av);
        if (f1 > f2) {
            ans = f2;
            break;
        }
        av--;
    }
}

console.log(ans);


function calcClosest(element) {
    ans = 0;
    data.forEach(el => {
        for (let index = 1; index <= Math.abs(element-el); index++) {
            ans += index;            
        }
    });
    return ans;
}








