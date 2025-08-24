# 🎲 Real-Time Multiplayer Bingo Game

A fun and interactive multiplayer Bingo game built with Node.js, Express, and Socket.IO. Play Bingo with friends in real-time across any device!

![Bingo Game](https://img.shields.io/badge/Node.js-14+-green)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-blue)
![Express](https://img.shields.io/badge/Express-4.21.2-orange)

## 🎯 Features

- **🎮 Multiplayer Support**: Create or join games with unique game IDs
- **⚡ Real-Time Gameplay**: Live turn-based gameplay with instant updates
- **🎯 Smart Win Detection**: Automatic detection of completed rows, columns, and diagonals
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🔄 Auto Restart**: Games automatically restart after each winner
- **🎨 Clean UI**: Modern, intuitive interface with visual feedback

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iam-vivekus/bingo-game
   cd bingo-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start playing!

## 🎮 How to Play

### Creating a Game

1. Enter your name in the input field
2. Click "Create Game"
3. Share the generated Game ID with your friends
4. Click "Start Game" when everyone has joined

### Joining a Game

1. Enter your name in the input field
2. Enter the Game ID provided by the host
3. Click "Join Game"
4. Wait for the host to start the game

### Game Rules

- **Objective**: Complete 5 rows, columns, or diagonals
- **Turns**: Players take turns selecting numbers from their boards
- **Winning**: First player to complete 5 lines wins!
- **Restart**: Games automatically restart after each win

## 🏗️ Project Structure

```
bingo-game/
├── server.js          # Main server file with game logic
├── package.json       # Dependencies and scripts
├── public/
│   ├── index.html     # Main game interface
│   └── client.js      # Client-side JavaScript
└── node_modules/      # Dependencies
```

## 🛠️ Technical Details

### Backend (Node.js + Express + Socket.IO)

The server handles:
- Game state management
- Real-time communication between players
- Bingo board generation
- Win condition detection
- Turn management

### Frontend (HTML + CSS + JavaScript)

The client provides:
- Responsive user interface
- Real-time board updates
- Turn notifications
- Game flow management

### Key Socket Events

- `createGame`: Creates a new game with unique ID
- `joinGame`: Allows players to join existing games
- `startGame`: Initiates gameplay
- `numberSelected`: Handles number selection and turn progression
- `bingo`: Detects winning conditions

## 🎯 Game Features

### Multiplayer Support
- Create games with unique 4-digit IDs
- Join existing games using game IDs
- Support for multiple players in a single game

### Real-Time Communication
- Live turn-based gameplay
- Instant board updates across all players
- Real-time notifications for game events

### Smart Bingo Detection
- Automatic detection of completed rows, columns, and diagonals
- Requires 5 completed lines to win (traditional Bingo rules)
- Visual feedback when numbers are selected

### Responsive Design
- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Touch-friendly controls

## 🔧 Dependencies

- **Express.js**: Web server framework
- **Socket.IO**: Real-time bidirectional communication
- **Node.js**: JavaScript runtime environment

## 🚀 Deployment

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Access the game
open http://localhost:3000
```

### Production Deployment

1. Set up a Node.js server (Heroku, Vercel, Railway, etc.)
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Configure environment variables if needed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with [Node.js](https://nodejs.org/)
- Real-time communication powered by [Socket.IO](https://socket.io/)
- Web framework by [Express.js](https://expressjs.com/)

---

**Happy Bingo! 🎲**

*Star this repository if you found it helpful!* 
