const express = require('express')
const router = express.Router()
const controller = require('../controllers/taskController')
const Task = require('../models/Task');



router.get('/', controller.getTasks)
router.post('/', async (req, res) => {
  try {
    console.log('Received request:', req.body); // Debug log

    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Error saving task:', err); // See actual error
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', controller.updateTask)
router.delete('/:id', controller.deleteTask)

module.exports = router
