import React from "react";
import startBG from "../assets/startBG.webp";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  const handleStartGameClick = () => {
    navigate("/game");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat relative"
      style={{ backgroundImage: `url(${startBG})` }}
    >
      <button
        className="bg-green-500 font-bold absolute top-80 right-48 text-4xl text-white p-4 rounded-xl"
        onClick={handleStartGameClick}
      >
        Start Game
      </button>
    </div>
  );
};

export default Start;
