const Task = require('../models/Task')

exports.getTasks = async (req, res) => {
  const filter = {}
  if (req.query.status) filter.isCompleted = req.query.status === 'completed'
  if (req.query.priority) filter.priority = req.query.priority
  const tasks = await Task.find(filter)
  res.json(tasks)
}

exports.createTask = async (req, res) => {
  const task = new Task(req.body)
  const saved = await task.save()
  res.json(saved)
}

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(task)
}

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.json({ success: true })
}
