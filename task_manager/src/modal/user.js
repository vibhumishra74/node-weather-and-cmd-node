const mongoose = require("mongoose");
let validater = require("validator");
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("./Task");

const userSchema = new mongoose.Schema(
  {
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
      // lowercase: true,
      validate(value) {
        let srt = value;
        if (srt.toLowerCase().includes("password"))
          throw new Error("password can't be password");
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

//virual list to understand mongoose for refrence not store in db

userSchema.virtual("tasks", {
  //any things which we want to refer
  ref: "Task_App",
  localField: "_id",
  foreignField: "owner",
});

//deleting user data when user remove from db this one not working right now
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  console.log("deleted");
  // next();
});
//deleting user data when user remove from db
userSchema.methods.deletetask = function () {
  const task = this;
  const allTask = Task.deleteMany({ owner: task._id });
  return allTask;
};

//hiding user password and user token with function
userSchema.methods.getpublicprofile = function () {
  const user = this;
  const userobject = user.toObject();
  delete userobject.password;
  delete userobject.tokens;
  return userobject;
};
//hiding user password and user token with toJSON method
userSchema.methods.toJSON = function () {
  const user = this;
  const userobject = user.toObject();
  delete userobject.password;
  delete userobject.tokens;
  return userobject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _Id: user._id.toString() }, "secretkey");
  // console.log("user token in function", user);
  //user.token is from modal tokal
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//statics used on modal, method used on instance of function meyhod not used arrow function because they need to bind function

userSchema.statics.findByCredential = async (email, password) => {
  // let user = await User.findOne({ email }, function (err, obj) {
  //   console.log("object>>", obj);
  // });
  let user = await User.findOne({ email });

  if (!user) {
    throw new Error("unable to login with email");
  }
  const ismatch = await bcrypt.compare(password.toLowerCase(), user.password);
  // console.log("object user>", user.password, ismatch, password);
  if (!ismatch) {
    throw new Error("unable to login with password");
  }
  // console.log("object user", user, email, ismatch);
  return user;
};

// before saving user
userSchema.pre("save", async function (next) {
  //not arrow function because it does't bind the function
  let user = this; //this give all individual object to save
  //isModified from mongoose to validate
  // console.log("hash password", user.password);
  if (user.isModified("password")) {
    user.hashpassword = await bcrypt.hash(user.password, 8);
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("password", this.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// const token = json.sign({ _id: "hello123" }, "secretkey");

// let data = json.verify(token, "secretkey");

// console.log("token", token, "data", data);
