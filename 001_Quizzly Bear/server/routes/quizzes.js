const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Score = require('../models/Score');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all public quizzes
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search, page = 1, limit = 10 } = req.query;
    const query = { isPublic: true };

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) query.title = { $regex: search, $options: 'i' };

    const quizzes = await Quiz.find(query)
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Quiz.countDocuments(query);

    res.json({
      quizzes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalQuizzes: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single quiz
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'username');
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new quiz (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, difficulty, questions, isPublic, tags } = req.body;

    const quiz = new Quiz({
      title,
      description,
      category,
      difficulty,
      questions,
      isPublic,
      tags,
      createdBy: req.userId
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit quiz answers
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { answers, timeTaken } = req.body;
    let score = 0;
    let totalPoints = 0;
    const detailedAnswers = [];

    // Calculate score
    quiz.questions.forEach((question, index) => {
      totalPoints += question.points;
      const userAnswer = answers[index];
      let isCorrect = false;
      let pointsEarned = 0;

      if (question.questionType === 'multiple-choice') {
        const selectedOption = question.options.find(opt => 
          opt.text === userAnswer
        );
        isCorrect = selectedOption ? selectedOption.isCorrect : false;
      } else {
        isCorrect = userAnswer === question.correctAnswer;
      }

      if (isCorrect) {
        pointsEarned = question.points;
        score += question.points;
      }

      detailedAnswers.push({
        questionId: question._id,
        selectedAnswer: userAnswer,
        isCorrect,
        pointsEarned
      });
    });

    const percentage = Math.round((score / totalPoints) * 100);

    // Save score
    const scoreRecord = new Score({
      user: req.userId,
      quiz: quiz._id,
      score,
      totalPoints,
      percentage,
      timeTaken,
      answers: detailedAnswers
    });

    await scoreRecord.save();

    // Update quiz stats
    quiz.plays += 1;
    quiz.averageScore = (quiz.averageScore * (quiz.plays - 1) + percentage) / quiz.plays;
    await quiz.save();

    // Update user stats
    const user = await User.findById(req.userId);
    user.stats.quizzesTaken += 1;
    user.stats.totalPoints += score;
    user.stats.averageScore = (user.stats.averageScore * (user.stats.quizzesTaken - 1) + percentage) / user.stats.quizzesTaken;
    await user.save();

    res.json({
      score,
      totalPoints,
      percentage,
      detailedAnswers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's quizzes
router.get('/user/my-quizzes', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;