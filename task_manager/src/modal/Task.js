let mongoose = require("mongoose");

let TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
TaskSchema.pre("save", async function (next) {
  console.log("task before update");
  next();
});
const Task = mongoose.model("Task_App", TaskSchema);

module.exports = Task;
