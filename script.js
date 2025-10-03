const gameContainer = document.querySelector(".game_container");

for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameContainer.appendChild(cell);
}
