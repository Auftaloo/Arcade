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
let turn = 'X';
let win;

/*-----cached element references-----*/
const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');

/*-----event listeners-----*/
document.getElementById('board').addEventListener('click', handleTurn);
document.getElementById('reset-button').addEventListener('click', init);

/*-----functions-----*/
function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });

        if (winner) {
            return winner
        } else if (board.includes('')) {
            return null
        } else {
            return 'T'
        }
    };

function handleTurn() {
    let idx = squares.findIndex (function(square){
        return square === event.target;
    });
    board[idx] = turn;
    if (turn === 'X') {
        turn = 'O'
    } else {
        turn = 'X'
    };
    win = getWinner ();
    render();
};

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
    messages.textContent = win === 'T' ? `It's a tie!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
};

init();