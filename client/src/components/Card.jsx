import React, { useState } from "react";
import cardsBG from "../assets/card.webp";
import catIMG from "../assets/cat.avif";
import defuseIMG from "../assets/defuse.avif";
import shuffleIMG from "../assets/shuffle.jpeg";
import bombIMG from "../assets/bomb.jpg";
import ReactCardFlip from "react-card-flip";

const Card = ({ name, drawCard }) => {
  // set the state of the card to be flipped
  const [isFlipped, setIsFlipped] = useState(false);

  // function to handle the click event on the card
  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      drawCard(name);
      setIsFlipped(false);
    }, 2000);
  };

  // object to store the images of the cards
  const cardImages = {
    "Cat card 😼": catIMG,
    "Defuse card 🙅‍♂️": defuseIMG,
    "Shuffle card 🔀": shuffleIMG,
    "Exploding kitten card 💣": bombIMG,
  };

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="card h-40 md:h-96" onClick={handleClick}>
          <img
            src={cardsBG}
            alt="card"
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
        <div className="card h-40 md:h-96" onClick={handleClick}>
          <img
            src={cardImages[name]}
            alt={name}
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
      </ReactCardFlip>
    </>
  );
};

export default Card;
