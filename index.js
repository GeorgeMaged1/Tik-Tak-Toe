// Tic Tac Toe Game
const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
const resetButton = document.getElementById("reset");
const cells = [];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

function createBoard() {
    boardElement.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleClick);
        boardElement.appendChild(cell);
        cells.push(cell);
    }
}

function handleClick(event) {
    if (gameOver) return;

    const cellIndex = event.target.getAttribute("data-index");

    if (board[cellIndex] !== "") {
        messageElement.textContent = "Cell already taken!";
        return;
    }

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    let winner = checkWinner();
    if (winner) {
        gameOver = true;
        messageElement.textContent = `Player ${winner} wins!`;
    } else if (isBoardFull()) {
        gameOver = true;
        messageElement.textContent = "It's a tie!";
    } else {
        switchPlayer();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].style.backgroundColor = "#90EE90";
            cells[b].style.backgroundColor = "#90EE90";
            cells[c].style.backgroundColor = "#90EE90";
            return board[a];
        }
    }
    return null;
}

function isBoardFull() {
    return board.every(cell => cell !== "");
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageElement.textContent = `Current Player: ${currentPlayer}`;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    currentPlayer = "X";
    messageElement.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "#FFF";
    });
    createBoard();
}

resetButton.addEventListener("click", resetGame);

createBoard();
messageElement.textContent = `Current Player: ${currentPlayer}`;
