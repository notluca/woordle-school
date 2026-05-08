let words = [];
let currentWord = "";
let currentRow = 0;
let currentCol = 0;

async function loadWords() {
  const response = await fetch("../words/words.json");
  const data = await response.json();
  words = data.words;
  return words[Math.floor(Math.random() * words.length)];
}

function createGameBoard() {
  const gameCanvas = document.getElementById("gameCanvas");
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    row.classList.add("row");
    gameCanvas.appendChild(row);
  }
}

function getCell(row, col) {
  return document.querySelectorAll(".row")[row].querySelectorAll(".cell")[col];
}

function handleKey(e) {
  if (currentRow >= 6) {
    alert("Can't geuss anymore!");
    return;
  }

  const key = e.key.toLowerCase();

  if (key === "backspace") {
    if (currentCol > 0) {
      currentCol--;
      getCell(currentRow, currentCol).textContent = "";
    }
    return;
  }

  if (key === "enter") {
    if (currentCol < 5) {
      alert("Not enough letters!");
      return;
    }
    submitGuess();
    return;
  }

  if (/^[a-z]$/.test(key) && currentCol < 5) {
    getCell(currentRow, currentCol).textContent = key.toUpperCase();
    currentCol++;
  }
}

function submitGuess() {
  const row = document.querySelectorAll(".row")[currentRow];
  const cells = row.querySelectorAll(".cell");
  let guess = "";

  for (let i = 0; i < 5; i++) {
    guess += cells[i].textContent.toLowerCase();
  }

  for (let i = 0; i < 5; i++) {
    if (guess[i] === currentWord[i]) {
      cells[i].style.backgroundColor = "green";
    } else if (currentWord.includes(guess[i])) {
      cells[i].style.backgroundColor = "yellow";
    } else {
      cells[i].style.backgroundColor = "gray";
    }
  }

  if (guess === currentWord) {
    setTimeout(
      () => alert("Correct! You got it in " + (currentRow + 1) + " tries!"),
      100,
    );
    document.removeEventListener("keydown", handleKey);
    return;
  }

  currentRow++;
  currentCol = 0;

  if (currentRow >= 6) {
    setTimeout(
      () => alert("Game over! The word was: " + currentWord.toUpperCase()),
      100,
    );
  }
}

function startGame() {
  createGameBoard();
  loadWords().then((word) => {
    currentWord = word.toLowerCase();
    document.addEventListener("keydown", handleKey); // ✅ listen for physical keyboard
  });
}

startGame();
