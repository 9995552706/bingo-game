const socket = io();

let playerName = "";
let gameID = "";
let board = [];

// DOM Elements
const nameInput = document.getElementById("name");
const gameIdInput = document.getElementById("game-id");
const createGameButton = document.getElementById("create-game");
const joinGameButton = document.getElementById("join-game");
const startGameButton = document.getElementById("start-game");
const bingoBoard = document.getElementById("bingo-board");
const messageDisplay = document.getElementById("message");
const generateId = document.getElementById("generateid");

// Generate Bingo Board for the Client
function generateBingoBoardUI(board) {
  bingoBoard.innerHTML = "";
  board.forEach((number, index) => {
    const button = document.createElement("button");
    button.textContent = number !== null ? number : "X"; // Mark empty squares with X
    button.className = "bingo-button";
    button.disabled = number === null; // Disable if number is already selected
    button.addEventListener("click", () => {
      if (number !== null) {
        socket.emit("numberSelected", { number, gameID });
      }
    });
    bingoBoard.appendChild(button);
  });
}

// Event Listeners for Buttons
createGameButton.addEventListener("click", () => {
  playerName = nameInput.value.trim();
  if (playerName) {
    socket.emit("createGame", playerName);
  }
});

joinGameButton.addEventListener("click", () => {
  playerName = nameInput.value.trim();
  gameID = gameIdInput.value.trim();
  if (playerName && gameID) {
    socket.emit("joinGame", { playerName, gameID });
  }
});

startGameButton.addEventListener("click", () => {
  socket.emit("startGame", gameID);
});

// Socket Events
socket.on("gameCreated", (id) => {
  gameID = id;
  generateId.textContent = `Game created! Share this Game ID: ${gameID}`;
  // alert(`Game created! Share this Game ID: ${gameID}`);
  startGameButton.style.display = "block"; // Show "Start Game" button for the host
});

socket.on("gameJoined", (data) => {
  messageDisplay.textContent = `Welcome, ${data.playerName}! Waiting for the host to start the game.`;
});

// socket.on("gameStarted", () => {
//   messageDisplay.textContent = "Game started! Wait for your turn.";
//   startGameButton.style.display = "none"; // Hide "Start Game" button after game starts
// });

// socket.on("yourTurn", ({ board }) => {
//   messageDisplay.textContent = "It's your turn! Pick a number.";
//   generateBingoBoardUI(board); // Update board UI
// });

// Game Started Event
socket.on("gameStarted", () => {
  generateId.textContent = '';
  messageDisplay.textContent = "Game started! Wait for your turn.";
  messageDisplay.style.color = "red";   // Set text color to red
  messageDisplay.style.fontSize = "36px"; // Set font size to large
  startGameButton.style.display = "none"; // Hide "Start Game" button after game starts
});

// Your Turn Event
socket.on("yourTurn", ({ board }) => {
  messageDisplay.textContent = "It's your turn! Pick a number.";
  messageDisplay.style.color = "green"; // Set text color to green
  messageDisplay.style.fontSize = "36px"; // Set font size to large
  bingoBoard.style.visibility = "visible";
  generateBingoBoardUI(board); // Update board UI
});


socket.on("numberTaken", (number) => {
  const buttons = Array.from(bingoBoard.children);
  const button = buttons.find((btn) => btn.textContent == number);
  if (button) button.disabled = true; // Disable the selected number globally
});

socket.on("waitingForTurn", ({ board }) => {
  messageDisplay.textContent = "Waiting for your turn...";
  messageDisplay.style.color = "red";   // Set text color to red
  messageDisplay.style.fontSize = "36px"; // Set font size to large
  bingoBoard.style.visibility = "hidden";
  generateBingoBoardUI(board); // Update board UI
});

socket.on("bingo", (winner) => {
  alert(`${winner} got BINGO!`);
});

socket.on("leaderboard", (leaders) => {
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = leaders.map((leader) => `<li>${leader}</li>`).join("");
});

socket.on("gameRestarted", () => {
  messageDisplay.textContent = "Game Restarted! Wait for your turn.";
  messageDisplay.classList.remove("turn", "wait"); // Remove any previous styling
  generateBingoBoardUI(); // Update the Bingo board UI after the game is restarted
});



