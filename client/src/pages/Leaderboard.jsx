import React, { useState, useEffect } from "react";
import axios from "axios";
import badgeIcon from "../assets/badge.png";
import { Link, useParams } from "react-router-dom";
import Confetti from "react-confetti";

const Leaderboard = () => {
  const [userData, setUserData] = useState(null);
  const [top3Users, setTop3Users] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    // Fetch user leaderboard data
    axios
      .get("http://localhost:8080/leaderboard", {
        params: {
          username: username,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetch top 3 users data
    axios
      .get("http://localhost:8080/top3")
      .then((response) => {
        console.log(response.data);
        setTop3Users(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top 3 users:", error);
      });
  }, []);

  return (
    <div className="bg-[#151a30] min-h-screen">
      <div className="flex justify-center space-x-5">
        <img src={badgeIcon} alt="badge" className="w-16 h-16 mt-12" />
        <h1 className="text-white text-5xl font-bold text-center pt-12">
          LEADERBOARD
        </h1>
        <img src={badgeIcon} alt="badge" className="w-16 h-16 mt-12" />
      </div>
      {userData ? (
        <div className="mt-5 text-center text-2xl text-white font-bold">
          <p>Hey👋, {userData.username}!</p>
          <p className="mt-2">Your Current Score is {userData.points / 2}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <h1 className="text-white text-3xl text-center mt-11">
          Congratulations to the Top 3 Players of the Day 🎉🏆
        </h1>
        <div className="flex flex-col justify-center text-white text-xl w-1/2 mx-auto mt-9 text-center">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Rank
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Badge
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {top3Users.map((player, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {/* Emoji badges */}
                          {index === 0 && "🥇"}
                          {index === 1 && "🥈"}
                          {index === 2 && "🥉"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {player.username}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {player.points / 2}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-9">
          <Link to={`/game/${username}`}>
            <button className="text-xl bg-orange-400 text-white font-bold px-3 py-2 rounded-xl hover:opacity-70">
              Play Again
            </button>
          </Link>
        </div>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    </div>
  );
};

export default Leaderboard;
