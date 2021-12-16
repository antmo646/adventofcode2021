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


calculateMessage(data);

console.log(versions.reduce((a,b) => a+b, 0))



function calculateMessage(message) {
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
                whatsLeft = message.substring(11+i);
                break;
            }
            i += 5;
        }

    } else {
        let lengthTypeId = parseInt(message.substring(6, 7), 2);
        if (lengthTypeId === 0) {
            let lengthSP =  parseInt(message.substring(7, 22), 2);
            whatsLeft = message.substring(22, 22+lengthSP);
            while(whatsLeft.length >10) {
                whatsLeft = calculateMessage(whatsLeft);
            }
        }
        else if (lengthTypeId === 1) {
            let numOfSubPackets =  parseInt(message.substring(7, 18), 2);
            whatsLeft = message.substring(15);
            for (let j = 0; j < numOfSubPackets; j++) {
                whatsLeft = calculateMessage(whatsLeft);
            }
        }
    }
    return whatsLeft;

}