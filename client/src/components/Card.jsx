import React, { useEffect, useState } from "react";
import cardsBG from "../assets/card.webp";
import catIMG from "../assets/cat.avif";
import defuseIMG from "../assets/defuse.avif";
import shuffleIMG from "../assets/shuffle.jpeg";
import bombIMG from "../assets/bomb.jpg";
import ReactCardFlip from "react-card-flip";

const Card = ({ name, drawCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      drawCard(name);
      setIsFlipped(false);
    }, 2000);
  };

  const cardImages = {
    "Cat card 😼": catIMG,
    "Defuse card 🙅‍♂️": defuseIMG,
    "Shuffle card 🔀": shuffleIMG,
    "Exploding kitten card 💣": bombIMG,
  };

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="card h-96" onClick={handleClick}>
          <img
            src={cardsBG}
            alt="card"
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
        <div className="card h-96" onClick={handleClick}>
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
