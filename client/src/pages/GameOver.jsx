import React from "react";
import { Link } from "react-router-dom";

const GameOver = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#151a30]">
      <h1 className="text-2xl md:text-4xl text-white font-bold px-5 text-center">
        Game Over! You lost! 😢 Better luck next time! 🎮
      </h1>
      <div className="flex space-x-5">
        <Link to="/">
          <button className="text-lg md:text-2xl bg-orange-400 text-white font-bold md:px-4 md:py-3 px-3 py-2 mt-9 md:mt-12 rounded-xl hover:opacity-70">
            Play Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GameOver;
