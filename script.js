const CELLS_AMOUNT = 81;
const MINES_AMOUNT = 10;
const SIDE = Math.sqrt(CELLS_AMOUNT);
const REVEALED_COLOR = "rgb(206, 218, 222, 1)";

const gameContainer = document.querySelector(".game_container");

for (let i = 0; i < CELLS_AMOUNT; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.cellValue = "";
    cell.dataset.cellState = "hidden";
    gameContainer.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");
const newGameButton = document.querySelector(".new_game_btn");
const minesLeft = document.querySelector(".mines_left");
let revealedCounter;

function getNeighbors(cell) {
    return [
        getAboveCell(cell),
        getBelowCell(cell),
        getPreviousCell(cell),
        getNextCell(cell),
        getAboveLeftCell(cell),
        getAboveRightCell(cell),
        getBelowLeftCell(cell),
        getBelowRightCell(cell),
    ];
}

function startNewGame() {
    clearMinesweeper();
    placeMines();
    placeNumbers();
    minesLeft.textContent = MINES_AMOUNT;
    revealedCounter = 0;
}

// Puts the mines on the board
function placeMines() {
    let bombsPlaced = new Set();
    while (bombsPlaced.size < MINES_AMOUNT) {
        let bombPosition = Math.floor(Math.random() * CELLS_AMOUNT);
        bombsPlaced.add(bombPosition);
    }

    for (const position of bombsPlaced) {
        cells[position].dataset.cellValue = "*";
    }
}

function clearMinesweeper() {
    for (let cell of cells) {
        cell.textContent = "";
        cell.dataset.cellValue = "";
        cell.dataset.cellState = "hidden";
        cell.style.backgroundColor = "";
    }
}

function placeNumbers() {
    for (let cell of cells) {
        if (cell.dataset.cellValue != "*") {
            cell.dataset.cellValue = countBombsAround(cell);
        }
    }
}

function countBombsAround(cell) {
    let counter = 0;

    const neighbors = getNeighbors(cell);

    for (const neighbor of neighbors) {
        if (neighbor && neighbor.dataset.cellValue === "*") {
            counter++;
        }
    }

    !counter && (counter = "");
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

function revealAllNeighbours(cell) {
    const neighbors = getNeighbors(cell);

    for (const neighbor of neighbors) {
        if (neighbor && neighbor.dataset.cellState === "hidden") {
            neighbor.textContent = neighbor.dataset.cellValue;
            neighbor.style.backgroundColor = REVEALED_COLOR;
            neighbor.dataset.cellState = "revealed";

            if (neighbor.dataset.cellValue === "") {
                revealAllNeighbours(neighbor);
            }
            revealedCounter++;
        }
    }
}

startNewGame();

newGameButton.addEventListener("click", startNewGame);

gameContainer.addEventListener("click", function (event) {
    const cell = event.target;

    if (!cell.classList.contains("cell")) return;

    if (cell.dataset.cellState === "flagged") return;

    cell.textContent = cell.dataset.cellValue || "";
    cell.dataset.cellState = "revealed";

    if (cell.dataset.cellValue === "") {
        revealAllNeighbours(cell);
    }

    cell.style.backgroundColor = REVEALED_COLOR;

    if (cell.dataset.cellValue === "*") {
        alert("KABOOM! You lost!");
        return;
    }
    revealedCounter++;
    console.log(revealedCounter);

    if (revealedCounter === CELLS_AMOUNT - MINES_AMOUNT) {
        alert("Congratulations! You won!");
    }
});

gameContainer.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    const cell = event.target;

    if (!cell.classList.contains("cell")) return;

    if (cell.dataset.cellState === "revealed") return;

    if (cell.dataset.cellState === "hidden") {
        cell.textContent = "🚩";
        cell.dataset.cellState = "flagged";
        minesLeft.textContent--;
    } else if (cell.dataset.cellState === "flagged") {
        cell.textContent = "";
        cell.dataset.cellState = "hidden";
        minesLeft.textContent++;
    }
});

//TODO: Detect when all squares are cleared
//TODO: Freeze board on defeat or victory
//TODO: Add timer
