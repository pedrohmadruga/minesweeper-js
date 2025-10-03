const CELLS_AMOUNT = 81;
const MINES_AMOUNT = 15;

const gameContainer = document.querySelector(".game_container");

for (let i = 0; i < CELLS_AMOUNT; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameContainer.appendChild(cell);
}

function startNewGame() {
    generateMineSweeper();
}

// Creates the minesweeper map
function generateMineSweeper() {
    let bombsPlaced = new Set();
    while (bombsPlaced.size < MINES_AMOUNT) {
        let bombPosition = Math.floor(Math.random() * CELLS_AMOUNT);
        bombsPlaced.add(bombPosition);
    }
    const cells = document.querySelectorAll(".cell");

    for (const position of bombsPlaced) {
        cells[position].textContent = "B";
    }
}

startNewGame();
