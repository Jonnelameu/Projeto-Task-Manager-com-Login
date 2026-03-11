const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  userId: String
})

module.exports = mongoose.model("Task", TaskSchema)
