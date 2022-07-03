var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=random')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

//validity of a value checking function
function isPossible(board, sr, sc, val) {
    for (var row = 0; row < 9; row++) {
        if (board[row][sc] == val) {
            return false;
        }
    }

    for (var col = 0; col < 9; col++) {
        if (board[sr][col] == val) {
            return false;
        }
    }

    var r = sr - sr % 3;
    var c = sc - sc % 3;

    for (var cr = r; cr < r + 3; cr++) {
        for (var cc = c; cc < c + 3; cc++) {
            if (board[cr][cc] == val) {
                return false;
            }
        }
    }
    return true;

}

//recursive helper function that tries values [1,9] for each empty block
function solveSudokuHelper(board, sr, sc) {
    if (sr == 9) {
        changeBoard(board);
        return;
    }
    if (sc == 9) {
        solveSudokuHelper(board, sr + 1, 0)
        return;
    }
    //Non-empty block to be skipped
    if (board[sr][sc] != 0) {
        solveSudokuHelper(board, sr, sc + 1);
        return;
    }
    //putting values [1,9]
    for (var i = 1; i <= 9; i++) {
        //checking that value putten is valid
        if (isPossible(board, sr, sc, i)) {
            //if it's valid we will put that value and recurse to the next block
            board[sr][sc] = i;
            solveSudokuHelper(board, sr, sc + 1);
            board[sr][sc] = 0;                      //backtracking step 
        }
    }
}

//main function taking partially filled board as a parameter
function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0)
}

solve.onclick = function () {
    solveSudoku(board)

}