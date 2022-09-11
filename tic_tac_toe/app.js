/*-----constants-----*/ 
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*-----app's state (variables)-----*/
let board;
let win;
let square = document.getElementsByClassName('square');

/*-----cached element references-----*/
const squares = Array.from(document.querySelectorAll('[square]'));
const messages = document.querySelector('h2');
const playerOneInput = document.getElementById('play1Name')
const playerTwoInput = document.getElementById('play2Name')
const submit = document.getElementById('submit')
const oText = "O";
const xText = "X";
let turn = xText

/*-----event listeners-----*/
for (var i = 0; i < square.length; i++) {
    square[i].addEventListener('click', cellClick);
}
document.getElementById('reset-button').addEventListener('click', resetGame);

playerOneInput.addEventListener('click', function(){
    playerOneInput.value = ''
})
playerTwoInput.addEventListener('click', function(){
    playerTwoInput.value = ''
})
submit.addEventListener('click', function(){
    playerOneInput.style.display = 'none'
    playerTwoInput.style.display = 'none'
    submit.style.display = 'none'
})

/*-----functions-----*/
function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });

        if (winner) {
            return winner;
        } else if (board.includes('')) {
            return null;
        } else {
            return 'T';
        }
    };

    function cellClick() {
        for (let i = 0; i < square.length; i++) {
        if (square[i].textContent === xText || square[i].textContent === oText) {
            square[i].removeEventListener('click', cellClick)
        }
        handleTurn ();
    }
}

function handleTurn(handleClick) {
    let idx = squares.findIndex (function(box){
        return box === event.target;
    });
    board[idx] = turn;
    if (turn === xText) {
        turn = oText
    } else {
        turn = xText
    };
    win = getWinner ();
    render();
};

function resetGame() {
    init();
    playerOneInput.style.display = 'flex'
    playerTwoInput.style.display = 'flex'
    submit.style.display = 'flex'
    playerOneInput.value = 'Enter player one name.'
    playerTwoInput.value = 'Enter player two name.'
    board;
    turn = xText;
    win;
    square = document.getElementsByClassName('square');
    for (var i = 0; i < square.length; i++) {
        square[i].addEventListener('click', cellClick);
    }
}

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    render();
};

function render() {
    board.forEach(function(val, idx){
        squares[idx].textContent = val
    });
    if (win === 'T') {
        messages.textContent = `It's a tie!`
    } else if (win === xText) {
        messages.textContent = `${playerOneInput.value} wins the game!`
    } else if (win === oText) {
        messages.textContent = `${playerTwoInput.value} wins the game!`
    } else {
        messages.textContent = `It's ${turn}'s turn!`
    }
};

init();