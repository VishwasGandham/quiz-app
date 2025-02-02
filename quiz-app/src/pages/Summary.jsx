import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const score = queryParams.get("score") || 0;

  return (
    <div className="summary">
      <h1>Quiz Completed!</h1>
      <p>Your Score: {score}</p>
      <button onClick={() => navigate("/")}>Try Again</button>
    </div>
  );
};

export default Summary;
