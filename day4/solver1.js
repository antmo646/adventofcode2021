const fs = require('fs');

let data = fs.readFileSync('./day4/input.txt', 'UTF-8').split(/\n\s*\n/)

let draws = data[0].split(",").map(Number);

data.shift();
let boards = data.map(function(row) {
    return row.split(/\n/).map(function(row2){
        return row2.trim().split(/ +/).map(function(row3) {
            return {num: parseInt(row3), checked: false}
        })
    })
})

draws.forEach(n => {
    boards.forEach((b, index) => {
        boards[index] = addToBoard(b, n)
        checkBoard(b, n);
    });
});
console.log(boards)


function addToBoard(board, num) {
    board.forEach((r,i) => {
        r.forEach((e,i2) => {
            if (e.num == num) {
                r[i2] = {num: num, checked: true};
            }
        })
        board[i] = r;
    })
    return board;
}

function checkBoard(board, num){
    board.forEach(element => {
        if (element.every((el) => el.checked)) {
            winner(board, num);
        }
    });
    var tBoard = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
    tBoard.forEach(element => {
        if (element.some((el) => el.checked == 'undefined')) {
        }
        if (element.every((el) => el.checked)) {
            winner(board, num);
        }
    });
}

function winner(board, num) {
    unmarkedScore = 0
    board.forEach((row) => {
        row.forEach(el => {if (!el.checked) {unmarkedScore += el.num}})
    })
    console.log("winning: " + unmarkedScore*num)
    throw new Error("Found A Winner!");
}