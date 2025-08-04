const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let games = {}; // Store game data

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("createGame", (playerName) => {
    const gameID = Math.floor(1000 + Math.random() * 9000).toString();
    games[gameID] = {
      players: [{ id: socket.id, name: playerName, board: [], bingo: false }],
      currentTurn: 0,
      numbersSelected: [],
    };
    socket.join(gameID);
    socket.emit("gameCreated", gameID);
  });

  socket.on("joinGame", ({ playerName, gameID }) => {
    if (games[gameID]) {
      games[gameID].players.push({ id: socket.id, name: playerName, board: [], bingo: false });
      socket.join(gameID);
      io.to(gameID).emit("gameJoined", { playerName });
    } else {
      socket.emit("error", "Game ID not found!");
    }
  });

  socket.on("startGame", (gameID) => {
    if (games[gameID]) {
      const game = games[gameID];
      io.to(gameID).emit("gameStarted");
      game.players.forEach((player, index) => {
        const board = generateBingoBoard();
        player.board = board;
        io.to(player.id).emit(index === 0 ? "yourTurn" : "waitingForTurn", { board });
      });
    }
  });

  socket.on("numberSelected", ({ number, gameID }) => {
    if (games[gameID]) {
      const game = games[gameID];
      if (!game.numbersSelected.includes(number)) {
        game.numbersSelected.push(number);
        io.to(gameID).emit("numberTaken", number); // Broadcast the selected number

        // Check for Bingo
        const player = game.players.find((p) => p.id === socket.id);
        player.board = player.board.map((n) => (game.numbersSelected.includes(n) ? null : n));

        if (checkBingo(player.board)) {
          player.bingo = true;
          io.to(gameID).emit("bingo", player.name);

          // After Bingo, restart the game with the same players
          setTimeout(() => {
            io.to(gameID).emit("gameRestarted");
            resetGame(gameID);
          }, 3000); // Wait for 3 seconds before restarting the game
        }

        // Move to the next turn
        game.currentTurn = (game.currentTurn + 1) % game.players.length;
        game.players.forEach((player, index) => {
          io.to(player.id).emit(index === game.currentTurn ? "yourTurn" : "waitingForTurn", {
            board: player.board,
          });
        });
      }
    }
  });
});

// Helper function to generate a shuffled Bingo board
function generateBingoBoard() {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  numbers.sort(() => Math.random() - 0.5); // Shuffle numbers
  return numbers;
}

// Helper function to check if a player has Bingo
function checkBingo(board) {
  let emptyCount = 0;

  // Check rows
  for (let i = 0; i < 5; i++) {
    if (board.slice(i * 5, i * 5 + 5).every((n) => n === null)) {
      emptyCount++;
    }
  }

  // Check columns
  for (let i = 0; i < 5; i++) {
    if (
      [board[i], board[i + 5], board[i + 10], board[i + 15], board[i + 20]].every(
        (n) => n === null
      )
    ) {
      emptyCount++;
    }
  }

  // Check diagonals
  if (
    [board[0], board[6], board[12], board[18], board[24]].every((n) => n === null)
  ) {
    emptyCount++;
  }
  if (
    [board[4], board[8], board[12], board[16], board[20]].every((n) => n === null)
  ) {
    emptyCount++;
  }

  // Return true if there are 5 or more empty rows, columns, or diagonals
  return emptyCount >= 5;
}

// Function to reset the game and start over with the same players
function resetGame(gameID) {
  const game = games[gameID];
  game.players.forEach((player) => {
    player.board = generateBingoBoard(); // Generate a new Bingo board
    player.bingo = false; // Reset Bingo status
  });
  game.numbersSelected = []; // Clear selected numbers
  game.currentTurn = 0; // Reset turn order

  // Notify all players and restart the game
  io.to(gameID).emit("gameRestarted");
  game.players.forEach((player, index) => {
    io.to(player.id).emit(index === 0 ? "yourTurn" : "waitingForTurn", {
      board: player.board,
    });
  });
}

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
