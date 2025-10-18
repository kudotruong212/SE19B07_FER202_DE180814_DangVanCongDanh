// src/components/quizReducer.jsx
import React, { useEffect, useReducer } from "react";
import { Button, Container, Card, ProgressBar, Alert, Badge } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DURATION = 10;

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
    },
  ],
  current: 0,        // index câu hiện tại
  selected: "",      // đáp án đang chọn
  feedback: null,    // 'correct' | 'incorrect' | null
  score: 0,          // điểm hiện tại
  done: false,       // đã kết thúc bài?
  timeLeft: DURATION,// thời gian còn lại cho câu hiện tại
  best: Number(localStorage.getItem("quiz_best") || 0), // High Score
};

function reducer(state, action) {
  switch (action.type) {
    case "select": {
      if (state.feedback !== null) return state; // đã chấm thì không cho đổi
      return { ...state, selected: action.option };
    }

    case "judge": {
      if (!state.selected || state.feedback !== null) return state;
      const ok = state.selected === state.questions[state.current].answer;
      return { ...state, feedback: ok ? "correct" : "incorrect" };
    }

    case "next": {
      const ok = state.selected === state.questions[state.current].answer;
      const next = state.current + 1;
      const done = next >= state.questions.length;
      const newScore = ok ? state.score + 1 : state.score;
      const best = done ? Math.max(newScore, state.best) : state.best;
      if (done) localStorage.setItem("quiz_best", String(best));
      return {
        ...state,
        current: next,
        selected: "",
        feedback: null,
        score: newScore,
        done,
        timeLeft: DURATION,
        best,
      };
    }

    case "tick": {
      if (state.done || state.timeLeft === 0) return state;
      return { ...state, timeLeft: state.timeLeft - 1 };
    }

    case "timeup": {
      // hết giờ → coi như sai nếu chưa chọn → sang câu
      const next = state.current + 1;
      const done = next >= state.questions.length;
      const best = done ? Math.max(state.score, state.best) : state.best;
      if (done) localStorage.setItem("quiz_best", String(best));
      return {
        ...state,
        current: next,
        selected: "",
        feedback: null,
        done,
        timeLeft: DURATION,
        best,
      };
    }

    case "restart":
      return { ...initialState, best: state.best };

    default:
      return state;
  }
}

export default function QuizReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const total = state.questions.length;
  const isLast = state.current === total - 1;
  const progress = Math.round((state.current / total) * 100);

  // Timer: mỗi giây trừ 1; khi = 0 thì TIMEUP
  useEffect(() => {
    if (state.done) return;
    if (state.timeLeft === 0) {
      dispatch({ type: "timeup" });
      return;
    }
    const id = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => clearInterval(id);
  }, [state.timeLeft, state.done]);

  if (state.done) {
    return (
      <Container className="mt-4">
        <Card className="p-4 text-center">
          <h2 className="mb-3">
            Your Score: {state.score} / {total}
          </h2>
          <div className="mb-3">
            High Score: <Badge bg="dark">{state.best}</Badge>
          </div>
          <Button onClick={() => dispatch({ type: "restart" })}>
            Restart Quiz
          </Button>
        </Card>
      </Container>
    );
  }

  const q = state.questions[state.current];

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {/* Tiến trình + Timer */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>Question {state.current + 1} / {total}</div>
          <div className={`fw-bold ${state.timeLeft <= 5 ? "text-danger" : "text-muted"}`}>
            ⏱ {state.timeLeft}s
          </div>
        </div>
        <ProgressBar now={progress} className="mb-3" />

        {/* Câu hỏi */}
        <h4 className="mb-3">
          {q.id}. {q.question}
        </h4>

        {/* Lựa chọn */}
        <div className="mt-2 d-flex flex-wrap gap-2">
          {q.options.map((op, idx) => (
            <Button
              key={idx}
              variant={state.selected === op ? "primary" : "outline-secondary"}
              onClick={() => dispatch({ type: "select", option: op })}
              disabled={state.feedback !== null}
            >
              {op}
            </Button>
          ))}
        </div>

        {/* Phản hồi đúng/sai với icon */}
        <div className="mt-3">
          {state.feedback === "correct" && (
            <Alert variant="success" className="py-2 d-flex align-items-center gap-2">
              <FaCheckCircle /> Correct! 🎉
            </Alert>
          )}
          {state.feedback === "incorrect" && (
            <Alert variant="danger" className="py-2 d-flex align-items-center gap-2">
              <FaTimesCircle /> Incorrect! The correct answer is <strong>{q.answer}</strong>.
            </Alert>
          )}
        </div>

        {/* Nút hành động */}
        <div className="d-flex gap-2 mt-2">
          <Button
            variant="outline-success"
            onClick={() => dispatch({ type: "judge" })}
            disabled={!state.selected || state.feedback !== null}
          >
            Check Answer
          </Button>

          <Button
            variant="primary"
            onClick={() => dispatch({ type: state.feedback ? "next" : "judge" })}
            disabled={!state.selected}
          >
            {isLast
              ? (state.feedback ? "Finish Quiz" : "Check & Finish")
              : (state.feedback ? "Next Question" : "Check & Next")}
          </Button>
        </div>
      </Card>
    </Container>
  );
}
