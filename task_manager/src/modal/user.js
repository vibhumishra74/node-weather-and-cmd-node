const mongoose = require("mongoose");
let validater = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true, //validation from mongoose
    trim: true,
  },
  email: {
    type: String,
    required: true,
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
    minlength: 7,
    required: true,
    lowercase: true,
    validate(value) {
      let srt = value;
      if (srt.toLowerCase().includes("password"))
        throw new Error("password can't be password");
    },
  },
});

module.exports = User;
