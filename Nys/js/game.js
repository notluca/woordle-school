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

  const letterCount = {};
  const result = Array(5).fill(null);

  for (let i = 0; i < 5; i++) {
    if (guess[i] === currentWord[i]) {
      result[i] = "green";
      letterCount[currentWord[i]] = (letterCount[currentWord[i]] || 0) - 1;
    } else {
      letterCount[currentWord[i]] = (letterCount[currentWord[i]] || 0) + 1;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === "green") continue;
    if (letterCount[guess[i]] > 0) {
      result[i] = "yellow";
      letterCount[guess[i]]--;
    } else {
      result[i] = "grey";
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === "green") cells[i].style.backgroundColor = "#79B851";
    else if (result[i] === "yellow") cells[i].style.backgroundColor = "#F3C237";
    else cells[i].style.backgroundColor = "#A4AEC4";

    const keyBtn = document.querySelector(`.key-btn[data-key="${guess[i]}"]`);
    const current = keyBtn ? keyBtn.dataset.state : null;
    if (result[i] === "grey" && !current) {
      keyBtn.dataset.state = "grey";
      keyBtn.style.backgroundColor = "#6B7280";
    } else if (result[i] === "yellow" && current !== "green") {
      keyBtn.dataset.state = "yellow";
      keyBtn.style.backgroundColor = "#F3C237";
    } else if (result[i] === "green") {
      keyBtn.dataset.state = "green";
      keyBtn.style.backgroundColor = "#79B851";
    }
  }

  if (guess === currentWord) {
    showPopup(popupCorrect);
    document.removeEventListener("keydown", handleKey);
    return;
  }

  currentRow++;
  currentCol = 0;

  if (currentRow >= 6) {
    showPopup(popupWrong);
    document.removeEventListener("keydown", handleKey);
  }
}

function createKeyboard() {
  const keyboard = document.createElement("div");
  keyboard.id = "keyboard";

  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ];

  rows.forEach((rowKeys) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("keyboard-row");

    rowKeys.forEach((key) => {
      const button = document.createElement("button");
      button.textContent = key === "Backspace" ? "⌫" : key.toUpperCase();
      button.dataset.key = key;
      button.classList.add("key-btn");
      if (key === "Enter" || key === "Backspace")
        button.classList.add("key-wide");

      button.addEventListener("click", function () {
        handleKey({ key });
      });

      rowDiv.appendChild(button);
    });

    keyboard.appendChild(rowDiv);
  });

  document.querySelector(".content").appendChild(keyboard);
}

function startGame() {
  createGameBoard();
  createKeyboard();
  loadWords().then((word) => {
    currentWord = word.toLowerCase();
    document.addEventListener("keydown", handleKey);
  });
}

const popupCorrect = document.getElementById("popupCorrect");
const popupWrong = document.getElementById("popupWrong");
const overlay = document.getElementById("popupOverlay");
const closeButtons = document.querySelectorAll(".close");

function showPopup(popup) {
  overlay.style.display = "block";
  popup.style.display = "block";
}

function hidePopups() {
  overlay.style.display = "none";
  popupCorrect.style.display = "none";
  popupWrong.style.display = "none";
}

closeButtons.forEach((button) => {
  button.addEventListener("click", hidePopups);
});
overlay.addEventListener("click", hidePopups);

document.querySelectorAll(".close").forEach(function (el) {
  el.addEventListener("click", function () {
    window.location.href = "../../Bram/home.html";
  });
});

startGame();
