const fs = require('fs');
const path = require('path/posix');

let data = fs.readFileSync('./day12/input.txt', 'UTF-8').split(/\r\n/).map(row => row.split('-'));
let paths = [['start']]


while (paths.some(p => !p.includes('end'))) {
    for (let i = 0; i < paths.length; i++) {
        const p = paths[i];
        if (p.includes('end')) continue;
        data.forEach((opt, index) => {
            if (opt.some(x => x === p.at(-1))) {
                var newCave = opt.filter(x => x != p.at(-1))[0];
                if (!(newCave[0] == newCave[0].toLowerCase() && p.includes(newCave))) {
                    added = true;
                    var p2 = p.slice();
                    p2.push(newCave);
                    paths.push(p2);
                }
            }
        })
        paths.splice(i,1);
    }
}

console.log(paths.length)