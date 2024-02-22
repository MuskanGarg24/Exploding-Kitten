import React, { useState } from "react";
import Card from "../components/Card";

const Game = () => {
  // Define the card names
  const cardNames = [
    "Cat card 😼",
    "Defuse card 🙅‍♂️",
    "Shuffle card 🔀",
    "Exploding kitten card 💣",
  ];

  const [drawnCards, setDrawnCards] = useState([]);
  const [defuseCount, setDefuseCount] = useState(0);
  const [message, setMessage] = useState("");
  const [selectedCardNames, setSelectedCardNames] = useState([]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the card names array
  const shuffledCardNames = shuffleArray(cardNames);

  // Initialize the selected cards
  useState(() => {
    const initialSelectedCardNames = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * shuffledCardNames.length);
      initialSelectedCardNames.push(shuffledCardNames[randomIndex]);
    }
    setSelectedCardNames(initialSelectedCardNames);
  });

  // draw a card
  const drawCard = (cardType) => {
    const nextCardIndex = selectedCardNames.findIndex(
      (card) => card === cardType
    );
    if (nextCardIndex === -1) {
      setMessage("Invalid card!");
      return;
    }
    const updatedSelectedCardNames = [...selectedCardNames];
    updatedSelectedCardNames.splice(nextCardIndex, 1); // Remove the drawn card from the array
    switch (cardType) {
      case "Cat card 😼":
        setDrawnCards([...drawnCards, cardType]);
        setMessage("You drew a cat card! Keep Going!");
        break;
      case "Defuse card 🙅‍♂️":
        setDefuseCount(defuseCount + 1);
        setMessage("You drew a defuse card! You can diffuse the next bomb!");
        break;
      case "Exploding kitten card 💣":
        if (defuseCount > 0) {
          setDefuseCount(defuseCount - 1);
          setMessage("You drew an exploding kitten card, but you defused it!");
        } else {
          setMessage("You drew an exploding kitten card! You lost!");
          return;
        }
        break;
      case "Shuffle card 🔀":
        setMessage("You drew a shuffle card! Restarted the game!");
        break;
      default:
        setMessage("You drew an unknown card! Keep Going!");
        break;
    }
    setSelectedCardNames(updatedSelectedCardNames);
  };

  // if all the cards are removed display you win
  if (
    selectedCardNames.length === 0 &&
    message !== "You drew a shuffle card! Restarted the game!"
  ) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">You win!</h1>
      </div>
    );
  }

  // if exploded bomb card is drawn display you lost
  if (message === "You drew an exploding kitten card! You lost!") {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">You lost!</h1>
      </div>
    );
  }

  if (message === "You drew a shuffle card! Restarted the game!") {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">Game Restarted!</h1>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="flex justify-between py-9 px-12">
        <h1 className="text-4xl">Exploding Kittens</h1>
        <h2 className="text-2xl">Defuse count: {defuseCount}</h2>
        <button className="text-2xl bg-orange-400 text-white px-3 py-2 rounded-lg">
          View Leaderboard
        </button>
      </div>
      <div className="my-9">
        <h1 className="text-center text-2xl">{message}</h1>
      </div>
      <div className="grid grid-cols-5 gap-4 px-12">
        {selectedCardNames.map((name, index) => (
          <Card key={index} name={name} drawCard={drawCard} />
        ))}
      </div>
    </div>
  );
};

export default Game;
