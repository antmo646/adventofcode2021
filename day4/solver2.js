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
    boards = boards.filter((b, index) => {
        boards[index] = addToBoard(b, n)
        var rem = checkBoard(b, n);
        return rem === 0;  
    });
});


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
    var rem = 0;
    board.forEach(element => {
        if (element.every((el) => el.checked)) {
            winner(board, num);
            rem = 1;
        }
    });
    var tBoard = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
    tBoard.forEach(element => {
        if (element.some((el) => el.checked == 'undefined')) {
        }
        if (element.every((el) => el.checked)) {
            winner(board, num);
            rem = 1;
        }
    });
    return rem;
}

function winner(board, num) {
    unmarkedScore = 0
    board.forEach((row) => {
        row.forEach(el => {if (!el.checked) {unmarkedScore += el.num}})
    })
    console.log("winning: " + unmarkedScore*num)
}