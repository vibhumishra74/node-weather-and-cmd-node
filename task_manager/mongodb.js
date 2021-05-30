let mongoose = require("mongoose");
let validater = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    require: true, //validation from mongoose
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validater.isEmail(value)) {
        // from validatore module
        throw new Error("not valid email");
      }
    },
  },
  age: {
    type: Number,
    validate(value) {
      //validation from mongoose
      if (value < 0) {
        throw new Error("number must be positive");
      }
    },
    default: 0,
  },
  password: {
    type: String,
    minlength: 6,
    require: true,
    lowercase: true,
    validate(value) {
      let srt = value;
      if (srt.toLowerCase().includes("password"))
        throw new Error("password can't be password");
    },
  },
});

const Me = new User({
  name: "   is is noT check password        ",
  email: "ok@INCODE.co",
  password: "HELLO",
});

// Me.save()
//   .then((Me) => {
//     console.log(Me);
//   })
//   .catch((err) => console.log("error!", err));

// chalenge task

const Task = mongoose.model("Task_App", {
  description: {
    type: String,
    require: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task_status = new Task({
  description: "      description sanitization       ",
});

Task_status.save()
  .then(() => {
    console.log(Task_status);
  })
  .catch((err) => console.log("error!", err));
