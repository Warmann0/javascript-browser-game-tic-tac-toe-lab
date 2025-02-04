//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.
/*-------------------------------- Constants --------------------------------*/
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let winner = false;

/*------------------------ Cached Element References ------------------------*/
const cells = document.querySelectorAll(".sqr");
const message = document.querySelector("#message");

/*-------------------------------- Functions --------------------------------*/
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    message.textContent = `${turn}'s turn`;
    winner = true;
}

function cellClicked() {
    const cellIndex = this.id; // Get clicked cell's ID
    if (board[cellIndex] !== "" || !winner) return; // Ignore clicks on filled or inactive cells
    
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = turn; // Update board state
    cell.textContent = turn; // Display current player's symbol
}

function changePlayer() {
    turn = (turn === "X") ? "O" : "X"; // Switch players
    message.textContent = `${turn}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `${turn} wins!`;
        winner = false;
    } else if (!board.includes("")) {
        message.textContent = "Draw!";
        winner = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    message.textContent = `${turn}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    winner = true;
}

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("DOMContentLoaded", initializeGame);
