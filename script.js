const CELLS_AMOUNT = 81;
const MINES_AMOUNT = 15;
const SIDE = Math.sqrt(CELLS_AMOUNT);

const gameContainer = document.querySelector(".game_container");

for (let i = 0; i < CELLS_AMOUNT; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameContainer.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");
const newGameButton = document.querySelector(".new_game_btn");

function startNewGame() {
    clearMinesweeper();
    placeMines();
    placeNumbers();
}

// Puts the mines on the board
function placeMines() {
    let bombsPlaced = new Set();
    while (bombsPlaced.size < MINES_AMOUNT) {
        let bombPosition = Math.floor(Math.random() * CELLS_AMOUNT);
        bombsPlaced.add(bombPosition);
    }

    for (const position of bombsPlaced) {
        cells[position].textContent = "B";
    }
}

function clearMinesweeper() {
    for (let cell of cells) {
        cell.textContent = "";
    }
}

function placeNumbers() {
    for (let cell of cells) {
        if (cell.textContent != "B") {
            cell.textContent = countBombsAround(cell);
        }
    }
}

function countBombsAround(cell) {
    let counter = 0;

    const neighbors = [
        getAboveCell(cell),
        getBelowCell(cell),
        getPreviousCell(cell),
        getNextCell(cell),
        getAboveLeftCell(cell),
        getAboveRightCell(cell),
        getBelowLeftCell(cell),
        getBelowRightCell(cell),
    ];

    for (const neighbor of neighbors) {
        if (neighbor && neighbor.textContent === "B") {
            counter++;
        }
    }

    return counter;
}

function cellOnEdge(cell) {
    const index = Array.from(cells).indexOf(cell);
    if (!getAboveCell(cell) || !getBelowCell(cell)) {
        return true;
    } else if (!getPreviousCell(cell) || !getNextCell(cell)) {
        return true;
    }
    return false;
}

function getPreviousCell(cell) {
    const index = Array.from(cells).indexOf(cell);
    if (index % SIDE === 0) {
        return null; // left border
    }
    return cells[index - 1];
}

function getNextCell(cell) {
    const index = Array.from(cells).indexOf(cell);
    if (index % SIDE === SIDE - 1) {
        return null; // right border
    }
    return cells[index + 1];
}

function getAboveCell(cell) {
    const index = Array.from(cells).indexOf(cell);
    if (index < SIDE) {
        return null; // up border
    }
    return cells[index - SIDE];
}

function getBelowCell(cell) {
    const index = Array.from(cells).indexOf(cell);
    if (index > CELLS_AMOUNT - SIDE - 1) {
        return null; // down border
    }
    return cells[index + SIDE];
}

function getAboveLeftCell(cell) {
    const index = Array.from(cells).indexOf(cell);
    if (index < SIDE || index % SIDE === 0) return null; // upper or left border
    return cells[index - SIDE - 1];
}

function getAboveRightCell(cell) {
    const index = Array.from(cells).indexOf(cell);
    if (index < SIDE || index % SIDE === SIDE - 1) return null; // upper or right border
    return cells[index - SIDE + 1];
}

function getBelowLeftCell(cell) {
    const index = Array.from(cells).indexOf(cell);
    if (index >= CELLS_AMOUNT - SIDE || index % SIDE === 0) return null; // lower or left border
    return cells[index + SIDE - 1];
}

function getBelowRightCell(cell) {
    const index = Array.from(cells).indexOf(cell);
    if (index >= CELLS_AMOUNT - SIDE || index % SIDE === SIDE - 1) return null; // lower or right border
    return cells[index + SIDE + 1];
}

startNewGame();

newGameButton.addEventListener("click", startNewGame);
