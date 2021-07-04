let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

let TaskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

TaskSchema.methods.getAuthToken = async function () {
  let task = this;
  const token = jwt.sign({ _Id: task._id }, "tasksecretkey");
  task.tokens = task.tokens.concat({ token });
  await task.save();
  return task;
};

TaskSchema.pre("save", async function (next) {
  console.log("task before update");
  next();
});
const Task_App = mongoose.model("Task_App", TaskSchema);

module.exports = Task_App;
