import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizData } from "../api";

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  const correctAnswers = {
    0: 2,
    1: 0,
    2: 0,
    3: 2,
    4: 3,
    5: 3,
    6: 2,
    7: 1,
    8: 3,
    9: 2,
  };

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await fetchQuizData();
      if (data) {
        setQuizData(data);
        setLoading(false);
      }
    };
    loadQuiz();
  }, []);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answerIndex });
  };

  const handleSubmit = () => {
    if (!quizData) return;
    let score = 0;

    quizData.questions.forEach((question, index) => {
      let correctOptionIndex = null;

      if (
        question.options &&
        question.options.some((option) => option.hasOwnProperty("isCorrect"))
      ) {
        const correctOption = question.options.find(
          (option) => option.isCorrect
        );
        if (correctOption) {
          correctOptionIndex = question.options.indexOf(correctOption);
        }
      }

      if (correctOptionIndex === null && question.correctAnswer !== undefined) {
        correctOptionIndex = question.correctAnswer;
      }

      if (correctOptionIndex === null && correctAnswers.hasOwnProperty(index)) {
        correctOptionIndex = correctAnswers[index];
      }

      if (
        selectedAnswers[index] !== undefined &&
        selectedAnswers[index] === correctOptionIndex
      ) {
        score += 4;
      }
    });

    navigate(`/summary?score=${score}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div>
      <h1>{quizData.title}</h1>
      <p>{quizData.description || "No description available."}</p>

      {quizData.questions.map((question, qIndex) => (
        <div key={qIndex}>
          <p>
            <strong>Question {qIndex + 1}:</strong>{" "}
            {question.description || "No question description"}
          </p>
          <ul>
            {question.options.map((option, optIndex) => (
              <li
                key={optIndex}
                onClick={() => handleAnswerSelect(qIndex, optIndex)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedAnswers[qIndex] === optIndex
                      ? "lightblue"
                      : "white",
                  padding: "5px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              >
                {option.description}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}
      >
        Submit
      </button>
    </div>
  );
};

export default Quiz;
