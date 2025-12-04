const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

// Get single task
const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
};

// Create task
const createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = new Task({
    title,
    description: description || '',
    completed: completed || false,
  });

  await task.save();
  res.status(201).json(task);
};

// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const task = await Task.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  );

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
};

// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json({ message: 'Task deleted successfully' });
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};