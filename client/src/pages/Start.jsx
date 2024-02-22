import React, { useState } from "react";
import startBG from "../assets/startBG.webp";
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
      navigate("/game");
    } catch (error) {
      console.error("Error posting user data:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat relative"
      style={{ backgroundImage: `url(${startBG})` }}
    >
      {/* take username input */}
      <input
        type="text"
        placeholder="Enter your username"
        className="bg-white font-bold absolute top-80 left-48 text-4xl p-4 rounded-xl"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
