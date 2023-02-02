const cells = document.querySelectorAll(".container li");
const restartBtn = document.querySelector(".restart");
const mes = document.querySelector(".status");
let running = false;
let currentPlayer = "X";
let options = ["", "", "", "", "", "", "", "", ""];

// Array for check winner
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

InitialGame();

// Init Game
function InitialGame() {
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  restartBtn.addEventListener("click", handleReset);
  running = true;
}

// Update Cell
function handleCellClick() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(cellIndex);
  checkWinner();
}

// Update Cell
function updateCell(index) {
  cells[index].innerHTML = currentPlayer;
  options[index] = currentPlayer;
}
// Check Winner
function checkWinner() {
  let winGame = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC && cellA === cellC) {
      winGame = true;
      break;
    }
  }
  if (winGame) {
    mes.innerHTML = `Player ${currentPlayer} won game !`;
    running = false;
  } else if (!options.includes("")) {
    mes.innerHTML = "Draw !";
    running = false;
  } else {
    changePlayer();
  }
}
// Change Player
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
// Reset Game
function handleReset() {
  cells.forEach((cell) => (cell.innerHTML = ""));
  options = ["", "", "", "", "", "", "", "", ""];
  running = true;
  mes.innerHTML = "";
}
