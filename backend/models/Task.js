const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  isCompleted: { type: Boolean, default: false },
  userId: String // optional if login is added
})

module.exports = mongoose.model('Task', taskSchema)
