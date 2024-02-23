import React, { useState } from "react";
import startBG from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Start = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const handleStartGameClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user", {
        username,
      });
      console.log(response);
      console.log("User data posted successfully");
      setUsername("");
      navigate(`/game/${username}`);
    } catch (error) {
      console.error("Error posting user data:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${startBG})` }}
    >
      <div className="flex justify-end items-center px-28 h-screen">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold text-white">Welcome to</h1>
          <h1 className="text-6xl font-bold text-white mt-3">
            Exploding Kitten
          </h1>
          <form onSubmit={handleStartGameClick}>
            <input
              type="text"
              placeholder="Enter Your Username"
              className="bg-white font-bold text-4xl text-center px-4 py-3 rounded-xl mt-8"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="bg-green-500 font-bold text-4xl text-white px-5 py-3 rounded-xl mt-8 block mx-auto">
              Start Game
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Start;
