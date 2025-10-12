# 🧠 Minesweeper — HTML | CSS | JavaScript

A simple yet fun **Minesweeper Game** built with pure web technologies — no external libraries.  
This project is part of my journey as a fullstack developer taking on the challenge of improving my **frontend skills**.

---

## 🎮 How to Play

Click on the cells to reveal what's underneath:
* Empty cells will reveal adjacent areas automatically.
* Numbered cells indicate how many bombs are around.
* Right-click to place or remove a 🚩 flag.

Your goal: reveal all safe cells without triggering a bomb.
Once all safe cells are revealed, a victory modal appears showing your time.

---

## 📦 Project Structure

- `index.html` — game layout, header, and modal structure
- `style.css` — board styling and cell states
- `script.js` — main game logic, mine placement, flood fill, timer, and event handling
- `images/` — images used
- `fonts/` — fonts used

---

## 🚀 Features & Highlights

✅ Dynamic board generation 
✅ **Recursive reveal (flood fill)** for empty cells
✅ **Right-click flagging system** using event delegation
✅ **Timer** that starts on load
✅ **Victory** and **Game Over** modals 
✅ Visual state management via **CSS classes**
✅ Easily resettable with a **“New Game”** button

---

## 🧠 Key Concepts Applied

- Event delegation and bubbling (`addEventListener`, `event.target`)
- Dynamic element creation with `document.createElement`
- Dataset management (`dataset.cellValue`, `dataset.cellState`)
- Recursive functions (flood fill logic)
- Game state tracking and DOM updates
- CSS Flexbox for layout
- CSS hover and state transitions
- Use of modals and overlays for end-game feedback

---

## ▶️ Try it live

🔗 [minesweeper-pedrohmadruga.netlify.app](https://minesweeper-pedrohmadruga.netlify.app)

---

Made by [@pedrohmadruga](https://github.com/pedrohmadruga)
