import React from "react";

const Card = ({ name, drawCard }) => {
  const handleClick = () => {
    drawCard(name);
  };

  return (
    <div
      className="bg-white p-4 rounded-md shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <p>{name}</p>
    </div>
  );
};

export default Card;
