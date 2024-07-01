document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const board = document.getElementById("board");
  const resetButton = document.getElementById("resetButton");
  const gameStatus = document.getElementById("gameStatus");
  let currentPlayer = "X";
  let gameState = Array(9).fill("");

  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = cell.getAttribute("data-index");

      if (gameState[cellIndex] !== "" || checkWinner()) {
          return;
      }

      gameState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      if (checkWinner()) {
          gameStatus.textContent = `Player ${currentPlayer} wins!`;
      } else if (!gameState.includes("")) {
          gameStatus.textContent = "It's a draw!";
      } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          gameStatus.textContent = `Player ${currentPlayer}'s turn`;
      }
  }

  function checkWinner() {
      return winningConditions.some(condition => {
          const [a, b, c] = condition;
          return gameState[a] !== "" && gameState[a] === gameState[b] && gameState[a] === gameState[c];
      });
  }

  function resetGame() {
      gameState.fill("");
      cells.forEach(cell => (cell.textContent = ""));
      currentPlayer = "X";
      gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  }

  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
  resetButton.addEventListener("click", resetGame);

  // Initialize game status
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
});
