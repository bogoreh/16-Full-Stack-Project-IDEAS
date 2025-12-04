const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// GET all tasks
router.get('/', getTasks);

// GET single task
router.get('/:id', getTask);

// POST create task
router.post('/', createTask);

// PUT update task
router.put('/:id', updateTask);

// DELETE task
router.delete('/:id', deleteTask);

module.exports = router;