import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/leaderboard", {
        params: {
          username: "xyz",
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Points: {userData.points/2}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Leaderboard;
