import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/game/:username" element={<Game />} />
        <Route path="/leaderboard/:username" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;
