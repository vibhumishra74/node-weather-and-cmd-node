let mongoose = require("mongoose");

mongoose.connect(
  // "mongodb://127.0.0.1:27017/task-manager-api",
  "mongodb+srv://vibhu:vibhu5636536@cluster0.yvotg.mongodb.net/task?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
