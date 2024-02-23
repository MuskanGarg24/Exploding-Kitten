import React from "react";
import { Link } from "react-router-dom";

const GameOver = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#151a30]">
      <h1 className="text-4xl text-white font-bold">
        Game Over! You lost! 😢 Better luck next time! 🎮
      </h1>
      <div className="flex space-x-5">
        <Link to="/">
          <button className="text-2xl bg-orange-400 text-white font-bold px-4 py-3 mt-20 rounded-xl hover:opacity-70">
            Play Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GameOver;
