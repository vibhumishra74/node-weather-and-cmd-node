const mongoose = require("mongoose");
let validater = require("validator");
let bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // here userSchema is middleware
  name: {
    type: String,
    required: true, //validation from mongoose
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

userSchema.statics.findByCredential = async (email, password) => {
  // let user = await User.findOne({ email }, function (err, obj) {
  //   console.log("object>>", obj);
  // });
  let user = await User.findOne({ email });

  if (!user) {
    throw new Error("unable to login with email");
  }
  // await pass(password, user.password);
  // const Pass = "$2b$08$sribdt7jrv0r90kauk/w2otqm/8ptfobsbvuhbytgxzyxssjx05mi";
  const ismatch = await bcrypt.compare(
    password,
    user.password,
    function (err, res) {
      console.log("err", err, "res", res);
    }
  );
  console.log("object user>", user.password, ismatch, password);
  if (!ismatch) {
    throw new Error("unable to login with password");
  }
  console.log("object user", user, email, ismatch);
  return user;
};

// before saving user
userSchema.pre("save", async function (next) {
  //not arrow function because it does't bind the function
  let user = this; //this give all individual object to save
  //isModified from mongoose to validate
  console.log("hash password", user.password);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("password", this.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

async function pass(plan, bcrypts) {
  // const becry = await bcrypt.hash(plan, 8);
  const com = await bcrypt.compare(plan, bcrypts);
  console.log("compare....", com, bcrypts);
  // const becry = await bcrypt.hash("hello1234", 8);
  // const com = await bcrypt.compare("hello1234", becry);
  // console.log("compare", com, becry);
}
