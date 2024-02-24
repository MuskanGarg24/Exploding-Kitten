import React, { useState } from "react";
import Card from "../components/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import GameWin from "./GameWin";
import GameOver from "./GameOver";

const Game = () => {
  // Define the card names
  const cardNames = [
    "Cat card 😼",
    "Defuse card 🙅‍♂️",
    "Shuffle card 🔀",
    "Exploding kitten card 💣",
  ];

  // Get the username from the URL
  let { username } = useParams();

  // Use the navigate hook
  const navigate = useNavigate();

  // Define the state variables
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
        setMessage("Wooho 🎉 You picked a Cat Card. Keep Going! 🐱");
        break;
      case "Defuse card 🙅‍♂️":
        setDefuseCount(defuseCount + 1);
        setMessage(
          "You picked a Defuse Card 🙅‍♂️. You can diffuse the next bomb! 💣"
        );
        break;
      case "Exploding kitten card 💣":
        if (defuseCount > 0) {
          setDefuseCount(defuseCount - 1);
          setMessage(
            "You picked an Exploding Kitten Card 💣, but you defused it! 😶‍🌫️"
          );
        } else {
          setMessage(
            "Oops ❌ You picked an Exploding Kitten Card. You lost 🤯!"
          );
          setTimeout(() => {
            navigate("/gameover");
          }, 2000);
        }
        break;
      case "Shuffle card 🔀":
        setMessage(
          "Haha 😆! You picked a Shuffle Card. Restarting the Game...🔀"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;
      default:
        setMessage("You drew an unknown card! Keep Going!");
        break;
    }
    setSelectedCardNames(updatedSelectedCardNames);
  };

  // if the user has no defuse cards left display game over
  if (message === "Oops ❌ You picked an Exploding Kitten Card. You lost 🤯!") {
    return <GameOver username={username} />;
  }

  // if all the cards are removed display you win
  if (
    selectedCardNames.length === 0 &&
    message !== "Haha 😆! You picked a Shuffle Card. Restarting the Game...🔀"
  ) {
    return <GameWin username={username} />;
  }

  return (
    <div className="bg-[#151a30] min-h-screen">
      <div className="text-center px-5 py-9 md:flex md:justify-between md:py-9 md:px-12">
        <h2 className="text-xl md:text-2xl text-white font-bold">
          Defuse Power : {defuseCount}
        </h2>
        <h2 className="text-xl mt-5 md:mt-0 md:text-2xl text-white font-bold">
          Choose your cards wisely to win the game!
        </h2>
        <Link to={`/leaderboard/${username}`}>
          <button className="text-lg px-3 py-2 mt-7 md:mt-0 md:text-xl bg-orange-400 text-white font-bold md:px-4 md:py-2 rounded-lg hover:opacity-70">
            View Your Leaderboard
          </button>
        </Link>
      </div>
      <h1 className="text-center text-lg md:text-2xl text-white font-bold mb-9 md:px-0 px-5 md:mb-16 md:mt-9">
        {message}
      </h1>
      <div className="grid px-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:px-16 md:pb-0 pb-16">
        {selectedCardNames.map((name, index) => (
          <Card key={index} name={name} drawCard={drawCard} />
        ))}
      </div>
    </div>
  );
};

export default Game;
