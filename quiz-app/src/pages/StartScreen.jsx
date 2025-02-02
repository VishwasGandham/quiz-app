import React from "react";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Quiz</h1>
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
    </div>
  );
};

export default StartScreen;
