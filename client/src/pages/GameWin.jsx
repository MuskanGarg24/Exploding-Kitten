import React from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import axios from "axios";

const GameWin = ({ username }) => {
  axios
    .post("http://localhost:8080/updatepoints", { username: username })
    .then((response) => {
      console.log(response);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error updating points:", error);
    });
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#151a30]">
      <h1 className="text-4xl text-white font-bold">
        🎉 Congratulations! You won the game! 🏆 Keep up the awesome gaming!
        🎮🥳
      </h1>
      <div className="flex space-x-5">
        <Link to={`/game/${username}`}>
          <button className="text-2xl bg-orange-400 text-white font-bold px-4 py-3 mt-20 rounded-xl hover:opacity-70">
            Play Again
          </button>
        </Link>
        <Link to={`/leaderboard/${username}`}>
          <button className="text-2xl bg-green-500 text-white font-bold px-4 py-3 mt-20 rounded-xl hover:opacity-70">
            View Leaderboard
          </button>
        </Link>
      </div>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
};

export default GameWin;
