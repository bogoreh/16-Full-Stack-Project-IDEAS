import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizStarted && !quizCompleted) {
      handleTimeUp();
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, quizCompleted]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`/quizzes/${id}`);
      setQuiz(response.data);
      setAnswers(new Array(response.data.questions.length).fill(''));
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load quiz');
      navigate('/quizzes');
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(quiz.timeLimit);
  };

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleTimeUp = () => {
    toast.error('Time is up!');
    submitQuiz();
  };

  const submitQuiz = async () => {
    try {
      setQuizCompleted(true);
      const timeTaken = quiz.timeLimit - timeLeft;
      
      const response = await axios.post(`/quizzes/${id}/submit`, {
        answers,
        timeTaken
      }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      
      setResults(response.data);
      toast.success(`Quiz completed! Score: ${response.data.score}/${response.data.totalPoints}`);
    } catch (error) {
      toast.error('Failed to submit quiz');
    }
  };

  if (loading) {
    return <div className="loading">Loading quiz...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  if (quizCompleted && results) {
    return (
      <div className="quiz-results">
        <div className="results-card card">
          <h2 className="text-3xl font-bold mb-6">Quiz Results</h2>
          <div className="score-display">
            {results.score} / {results.totalPoints}
          </div>
          <div className="percentage">
            {results.percentage}%
          </div>
          <p className="text-gray-600 mb-6">
            Time taken: {Math.floor((quiz.timeLimit - timeLeft) / 60)}:
            {((quiz.timeLimit - timeLeft) % 60).toString().padStart(2, '0')}
          </p>
          
          <div className="detailed-results mt-8">
            <h3 className="text-xl font-bold mb-4">Detailed Results</h3>
            {results.detailedAnswers.map((answer, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <p className="font-semibold">{quiz.questions[index].questionText}</p>
                <p className={`mt-2 ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  Your answer: {answer.selectedAnswer}
                  {answer.isCorrect ? ' ✓' : ' ✗'}
                </p>
                <p className="text-gray-600">Points: {answer.pointsEarned}/{quiz.questions[index].points}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex gap-4 justify-center">
            <button onClick={() => navigate('/quizzes')} className="btn btn-primary">
              Browse More Quizzes
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="quiz-intro">
        <div className="card">
          <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
          <p className="text-gray-600 mb-6">{quiz.description}</p>
          
          <div className="quiz-info grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="info-item">
              <span className="block text-gray-500">Category</span>
              <span className="font-semibold">{quiz.category}</span>
            </div>
            <div className="info-item">
              <span className="block text-gray-500">Difficulty</span>
              <span className="font-semibold">{quiz.difficulty}</span>
            </div>
            <div className="info-item">
              <span className="block text-gray-500">Questions</span>
              <span className="font-semibold">{quiz.questions.length}</span>
            </div>
            <div className="info-item">
              <span className="block text-gray-500">Time Limit</span>
              <span className="font-semibold">
                {Math.floor(quiz.timeLimit / 60)}:{(quiz.timeLimit % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          
          <div className="instructions mb-8">
            <h3 className="text-xl font-bold mb-3">Instructions:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Read each question carefully</li>
              <li>Select the best answer</li>
              <li>You cannot go back after submitting</li>
              <li>The quiz will auto-submit when time runs out</li>
            </ul>
          </div>
          
          <button onClick={startQuiz} className="btn btn-primary w-full py-3 text-lg">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;

  return (
    <div className="quiz-taking">
      <div className="quiz-header mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{quiz.title}</h2>
          <div className="timer">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <div className="progress-bar mt-4">
          <div className="flex justify-between mb-2">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="question-card">
        <div className="question-text">
          {currentQuestion + 1}. {question.questionText}
          <span className="ml-2 text-sm text-gray-500">({question.points} points)</span>
        </div>
        
        <div className="options-list">
          {question.questionType === 'multiple-choice' ? (
            question.options.map((option, index) => (
              <div
                key={index}
                className={`option ${answers[currentQuestion] === option.text ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(option.text)}
              >
                {option.text}
              </div>
            ))
          ) : (
            <div className="true-false-options flex gap-4">
              <div
                className={`option flex-1 text-center ${answers[currentQuestion] === 'True' ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect('True')}
              >
                True
              </div>
              <div
                className={`option flex-1 text-center ${answers[currentQuestion] === 'False' ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect('False')}
              >
                False
              </div>
            </div>
          )}
        </div>

        <div className="quiz-navigation mt-8 flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="btn bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          
          <button
            onClick={handleNextQuestion}
            className="btn btn-primary"
          >
            {currentQuestion === totalQuestions - 1 ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizDetail;