import React from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import axios from "axios";

const GameWin = ({ username }) => {
  // Update the user's points on winning the game
  axios.post("http://localhost:8080/updatepoints", { username: username });

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#151a30]">
      <h1 className="text-xl md:text-4xl text-white font-bold text-center px-5">
        🎉 Congratulations! You won the game! 🏆 Keep up the awesome gaming!
        🎮🥳
      </h1>
      <div className="mt-9 md:mt-16 flex space-x-2 md:space-x-5">
        <Link to={`/game/${username}`}>
          <button className="text-md md:text-2xl bg-orange-400 text-white font-bold md:px-4 md:py-3 px-3 py-2 rounded-xl hover:opacity-70">
            Play Again
          </button>
        </Link>
        <Link to={`/leaderboard/${username}`}>
          <button className="text-md md:text-2xl bg-green-500 text-white font-bold md:px-4 md:py-3 px-3 py-2 rounded-xl hover:opacity-70">
            View Leaderboard
          </button>
        </Link>
      </div>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
};

export default GameWin;
