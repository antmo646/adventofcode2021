const fs = require('fs');

let data = fs.readFileSync('./day16/input.txt', 'UTF-8').split("");

let versions = [];


// 1. convert hex to dec

let hexToDec = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111"
}

data = data.map(char => hexToDec[char]).join('');


let val = calculateMessage(data);

console.log(val[1])



function calculateMessage(message) {
    let value = 0;
    let packetVersion = parseInt(message.substring(0, 3), 2);
    versions.push(packetVersion);
    let packetType = parseInt(message.substring(3, 6), 2);
    let literal = packetType === 4 ? true : false;
    let whatsLeft = "";
    if (literal) {
        let i = 0;
        let numArr = [];
        while (true) {
            let sub = message.substring(6 + i, 11 + i);
            numArr.push(...sub.substring(1, 5));
            if (sub.substring(0, 1) == '0') {
                whatsLeft = message.substring(11 + i);
                break;
            }
            i += 5;
        }
        value = parseInt(numArr.join(''), 2);
    } else {
        let childValues = [];
        let lengthTypeId = parseInt(message.substring(6, 7), 2);
        if (lengthTypeId === 0) {
            let lengthSP = parseInt(message.substring(7, 22), 2);
            let whatsLeftInner = message.substring(22, 22 + lengthSP).length;
            whatsLeft = message.substring(22);
            while (whatsLeftInner > 10) {
                let num = whatsLeft.length;
                let returnVal = calculateMessage(whatsLeft);
                whatsLeft = returnVal[0];
                childValues.push(returnVal[1]);
                whatsLeftInner = whatsLeftInner - (num - whatsLeft.length);
            }
        }
        else if (lengthTypeId === 1) {
            let numOfSubPackets = parseInt(message.substring(7, 18), 2);
            whatsLeft = message.substring(18);
            for (let j = 0; j < numOfSubPackets; j++) {
                let returnVal = calculateMessage(whatsLeft);
                whatsLeft = returnVal[0];
                childValues.push(returnVal[1]);
            }
        }
        switch (packetType) {
            case 0:
                value = childValues.reduce((a, b) => a + b, 0)
                break;
            case 1:
                value = childValues.reduce((a, b) => a * b, 1)
                break;
            case 2:
                value = Math.min(...childValues);
                break;
            case 3:
                value = Math.max(...childValues);
                break;
            case 5:
                value = childValues[0] > childValues[1] ? 1 : 0;
                break;
            case 6:
                value = childValues[0] < childValues[1] ? 1 : 0;
                break;
            case 7:
                value = childValues[0] == childValues[1] ? 1 : 0;
                break;
            default:
                break;
        }
    }
    return [whatsLeft, value];

}