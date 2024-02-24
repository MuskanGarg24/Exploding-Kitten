## Exploding Kittens Card Game

This project is an online single-player card game based on the popular card game "Exploding Kittens." The game consists of four different types of cards: Cat, Defuse, Shuffle, and Exploding Kitten. Players draw cards from a deck, aiming to avoid exploding kittens while collecting other cards to win the game. The backend is developed in Golang, utilizing Redis as a database to store user points for the leaderboard. The frontend is built with ReactJS.

### Features
- User Registration: Users can create a username to enter the game.
- Single-Player Gameplay: Players draw cards from the deck and interact with different card types according to the game rules.
- Card Types: Cat cards are harmless, Defuse cards prevent explosion, Shuffle cards restart the game, and Exploding Kitten cards end the game.
- Leaderboard: Tracks the number of games won by each user.

### Technologies Used
- Backend: Golang
- Frontend: React.js
- Database: Redis

### Setup Instructions
- Clone the repository from GitHub: 
`git clone https://github.com/MuskanGarg24/Exploding-Kitten.git`
- Navigate to the project directory: 
`cd Exploding-Kitten`
- Install dependencies:
   - Backend: `cd backend`
   - Client: `cd client && npm install`
- Run the client server: `npm run dev`
- Run the backend server: `go run main.go`

### Usage
- Register or login with a username.
- Start the game by clicking the "Start" button.
- Draw cards from the deck by clicking on it.
- Follow the game rules and aim to collect all cards without drawing an Exploding Kitten.
- Keep track of your wins on the leaderboard.

### Deployment

- Backend (Render)
- Frontend (Vercel)
- [Exploding Kittens Card Game](https://exploding-kitten-seven.vercel.app/)