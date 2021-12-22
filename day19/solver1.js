const fs = require('fs');
const { set } = require('lodash');

let data = fs.readFileSync('./day19/input.txt', 'UTF-8').split(/\r?\n\r?\n/).map(row => {
    row = row.split(/\r?\n/);
    row.shift();
    return row.map(h => h.split(',').map(Number));
})

var map = new Set();
var doneScanners = [];

//map beacons for scanner 0

map.add(...data[0].map(el => el.join(',')));
data[0].forEach(e => map.add(e.join(',')));
console.log(map.size)

doneScanners.push(data.shift());
for (let index = 1; index < data.length; index++) {
    rotateAndMatch(data[0], data[index])
}
console.log(map.size)



//try to match for other scannes beacons the inbetween distance between beacons.
// if 12+ matches then match the rest.

function rotateAndMatch(done, tobe) {
    //rotate tobe for each iteration until we find a match
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [-el[0], el[1], el[2]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[0], -el[1], el[2]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[0], el[1], -el[2]])
    if (match(done, tobe)) return true;

    tobe = tobe.map(el => [el[1], el[0], el[2]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [-el[1], el[0], el[2]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[1], -el[0], el[2]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [-el[1], el[0], -el[2]])
    if (match(done, tobe)) return true;

    tobe = tobe.map(el => [el[2], el[1], el[0]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [-el[2], el[1], el[0]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[2], -el[1], el[0]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[2], el[1], -el[0]])
    if (match(done, tobe)) return true;

    tobe = tobe.map(el => [el[0], el[2], el[1]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [-el[0], el[2], el[1]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[0], -el[2], el[1]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[0], el[2], -el[1]])
    if (match(done, tobe)) return true;

    tobe = tobe.map(el => [el[1], el[2], el[0]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [-el[1], el[2], el[0]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[1], -el[2], el[0]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[1], el[2], -el[0]])
    if (match(done, tobe)) return true;

    tobe = tobe.map(el => [el[2], el[0], el[1]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [-el[2], el[0], el[1]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[2], -el[0], el[1]])
    if (match(done, tobe)) return true;
    tobe = tobe.map(el => [el[2], el[0], -el[1]])
    if (match(done, tobe)) return true;

}

function match(done, tobe) {


    //add inbetween relations
    for (let i = 0; i < done.length; i++) {
        for (let j = 0; j < tobe.length; j++) {
            done[i];
            tobe[j];
            var min12 = 0;
            done.forEach((el, i2) => {
                if (i2 == i) return;
                var d0 = el[0] - done[i][0];
                var d1 = el[1] - done[i][1];
                var d2 = el[2] - done[i][2];
                var checker = [tobe[j][0] + d0, tobe[j][1] + d1, tobe[j][2] + d2].join(',');
                if (tobe.some(el => el.join(',') == checker)) min12++;
            });
            if (min12 >= 12) {
                var d0 = tobe[j][0] - done[j][0];
                var d1 = tobe[j][1] - done[j][1];
                var d2 = tobe[j][2] - done[j][2];
                tobe = tobe.map(el => [el[0] - d0, el[1] - d1, el[2] - d2]);
                tobe.forEach(e => map.add(e.join(',')));
                return true;
            }
        }
    }
}








