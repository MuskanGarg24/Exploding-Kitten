import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import GameOver from "./pages/GameOver";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/game/:username" element={<Game />} />
        <Route path="/leaderboard/:username" element={<Leaderboard />} />
        <Route path="/gameover" element={<GameOver />} />
      </Routes>
    </Router>
  );
};

export default App;
