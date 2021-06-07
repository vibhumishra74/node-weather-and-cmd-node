const mongoose = require("mongoose");
let validater = require("validator");
let bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  // here userSchema is middleware
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
userSchema.pre("save", async function (next) {
  //not arrow function because it does't bind the function
  let user = this; //this give all individual object to save
  //isModified from mongoose to validate
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("password", this.password);
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
