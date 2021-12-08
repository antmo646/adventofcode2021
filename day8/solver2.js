const fs = require('fs');

let data = fs.readFileSync('./day8/input.txt', 'UTF-8').split(/\r\n/).map(row => {
    var arr = row.split(' | ')[0].split(' ')
    arr.sort((a,b) => a.length - b.length);
    return arr;
})
let output = fs.readFileSync('./day8/input.txt', 'UTF-8').split(/\r\n/).map(row => row.split(' | ')[1].split(' '))
var answer = 0;

data.forEach((arr, index) => {
    answer += calculate(arr, output[index])
})



console.log(answer)



function calculate(arr, out) {
    var final = {'a': null, 'b': null, 'c': null, 'd': null, 'e': null, 'f': null, 'g': null}
    var final2 = {'0': null, '1': 0, '2': null, '3': null, '4': 2, '5': null, '6': null, '7': 1, '8': null, '9': null}

    //get a
    Array.from(arr[1]).forEach(ch => {
        if (!arr[0].includes(ch)) final.a = ch;
    })

    //get b,d
    var bCands = []; 
    Array.from(arr[2]).forEach(ch => {
        if (!arr[0].includes(ch)) bCands.push(ch);
    })
    
    arr.forEach((el, index) => {
        if (el.length === 6) {
            if (!el.includes(bCands[0])) {
                final.d = bCands[0]
                final.b = bCands[1]
                final2[0] = index;
            }
            if (!el.includes(bCands[1])) {
                final.d = bCands[1]
                final.b = bCands[0]
                final2[0] = index;
            }
        }
    });

    //get c,f
    var cCands = Array.from(arr[0]);
    arr.forEach((el, index) => {
        if (el.length === 6 && index != final2[0]) {
            var isNine = true;
            if (!el.includes(cCands[0])) {
                final.c = cCands[0]
                final.f = cCands[1]
                final2[6] = index;
                isNine = false;
            }
            if (!el.includes(cCands[1])) {
                final.c = cCands[1]
                final.f = cCands[0]
                final2[6] = index;
                isNine = false;
            }
            if (isNine) final2[9] = index;
        }
    });

    //get g
    var gCands = Array.from(arr[final2[9]]);
    var valArr = []
    for (const [key, value] of Object.entries(final)) {
        valArr.push(value);
      }
    gCands.forEach(el => {
        if (!valArr.includes(el)) {
            final.g = el; 
            valArr.push(el)
        }

    })

    //get e
    var eCands = Array.from(arr[final2[6]]);
    eCands.forEach(el => {
        if (!valArr.includes(el)) {
            final.e = el; 
        }
    })      
     final2[2] = translateCodes(arr, "acdeg", final);
     final2[3] = translateCodes(arr, "acdfg", final);
     final2[5] = translateCodes(arr, "abdfg", final);
     final2[8] = translateCodes(arr, "abcdefg", final);

     ans = [];
     out.forEach(o => {
        ans.push(getOutput(arr,o,final2));
     })
     ans = ans.join('');
     ans = parseInt(ans);
     return ans;

}


function translateCodes(arr, match, final) {
    var newMatch = [];
    var retObj;
    Array.from(match).forEach(ch => {
        newMatch.push(final[ch]);
    })
    arr.forEach((el, index) => {
        if (el.length === match.length) {
            
            if (el.split('').sort().join() === newMatch.sort().join()) {
                retObj = index;
            }
        }
    })
    return retObj;
}


function getOutput(arr, match, final2) {
    var invF = {};
    var retObj;
    for(var key in final2){
      invF[final2[key]] = key;
    }

    arr.forEach((el, index) => {
        if (el.length === match.length) {
            if (el.split('').sort().join() === match.split('').sort().join()) {
                retObj = invF[index];
            }
        }
    })
    return retObj;
}