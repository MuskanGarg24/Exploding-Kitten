import React, { useState } from "react";
import startBG from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Start = () => {
  // Use the navigate hook to navigate to the game page
  const navigate = useNavigate();

  // Define the state variable for the username
  const [username, setUsername] = useState("");

  // Function to handle the start game button click
  const handleStartGameClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user", {
        username,
      });
      navigate(`/game/${username}`);
    } catch (error) {
      console.error("Error posting user data:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#151a30] bg-cover bg-no-repeat"
      style={
        window.innerWidth > 768 ? { backgroundImage: `url(${startBG})` } : {}
      }
    >
      <div className="flex justify-center md:justify-end items-center px-28 h-screen">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-6xl font-bold text-white">
            Welcome to
          </h1>
          <h1 className="text-2xl md:text-6xl font-bold text-white md:mt-3">
            Exploding Kitten
          </h1>
          <form onSubmit={handleStartGameClick}>
            <input
              type="text"
              placeholder="Enter Your Username"
              className="bg-white font-bold text-lg md:text-4xl text-center px-3 py-2 md:px-4 md:py-3 rounded-xl mt-8"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="bg-green-500 font-bold text-lg md:text-4xl text-white px-3 py-2 md:px-5 md:py-3 rounded-xl mt-5 md:mt-8 block mx-auto">
              Start Game
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Start;
