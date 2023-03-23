var table = document.getElementById("game-table");
var currentPlayer = "X";
var gameOver = false;

function createTable(rows, cols) {
  var html = "";

  for (var i = 0; i < rows; i++) {
    html += "<tr>";
    for (var j = 0; j < cols; j++) {
      html += "<td></td>";
    }
    html += "</tr>";
  }

  table.innerHTML = html;

  addClickHandlers();
}

function addClickHandlers() {
  var cells = document.getElementsByTagName("td");

  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClicked);
  }
}

function cellClicked() {
  if (gameOver) {
    return;
  }

  if (this.innerHTML !== "") {
    return;
  }

  this.innerHTML = currentPlayer;

  if (checkForWinner()) {
    showWinner();
    gameOver = true;
  } else if (checkForTie()) {
    showTie();
    gameOver = true;
  } else {
    switchPlayers();
  }
}

function checkForWinner() {
  var cells = document.getElementsByTagName("td");

  // Check rows
  for (var i = 0; i < cells.length; i += 3) {
    if (cells[i].innerHTML === currentPlayer &&
        cells[i + 1].innerHTML === currentPlayer &&
        cells[i + 2].innerHTML === currentPlayer) {
      return true;
    }
  }

  // Check columns
  for (var i = 0; i < 3; i++) {
    if (cells[i].innerHTML === currentPlayer &&
        cells[i + 3].innerHTML === currentPlayer &&
        cells[i + 6].innerHTML === currentPlayer) {
      return true;
    }
  }

  // Check diagonals
  if (cells[0].innerHTML === currentPlayer &&
      cells[4].innerHTML === currentPlayer &&
      cells[8].innerHTML === currentPlayer) {
    return true;
  }

  if (cells[2].innerHTML === currentPlayer &&
      cells[4].innerHTML === currentPlayer &&
      cells[6].innerHTML === currentPlayer) {
    return true;
  }

  return false;
}

function showWinner() {
  alert("O jogador " + currentPlayer + " venceu!");
  resetGame();
}

function checkForTie() {
  var cells = document.getElementsByTagName("td");

  for (var i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === "") {
      return false;
    }
  }

  return true;
}

function showTie() {
  alert("Deu velha!");
  resetGame();
}

function switchPlayers() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function resetGame() {
  var cells = document.getElementsByTagName("td");

  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }

  gameOver = false;
  currentPlayer = "X";
}

var startButton = document.getElementById("start-button");
var rowsInput = document.getElementById("rows");
var colsInput = document.getElementById("cols");

startButton.addEventListener("click", function() {
  var rows = rowsInput.value;
  var cols = colsInput.value;
  createTable(rows, cols);
});
