import React, { useState } from "react";
import cardsBG from "../assets/card.webp";
import catIMG from "../assets/cat.png";
import defuseIMG from "../assets/defuse.webp";
import shuffleIMG from "../assets/shuffle.png";
import bombIMG from "../assets/bomb.png";
import ReactCardFlip from "react-card-flip";

const Card = ({ name, drawCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      drawCard(name);
      setIsFlipped(false);
    }, 1000);
  };

  const cardImages = {
    "Cat card 😼": catIMG,
    "Defuse card 🙅‍♂️": defuseIMG,
    "Shuffle card 🔀": shuffleIMG,
    "Exploding kitten card 💣": bombIMG,
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="card" onClick={handleClick}>
        <img src={cardsBG} alt="card" />
      </div>
      <div onClick={handleClick}>
        <img src={cardImages[name]} alt={name} />
      </div>
    </ReactCardFlip>
  );
};

export default Card;
