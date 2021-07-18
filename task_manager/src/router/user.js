let express = require("express");
let User = require("../modal/user");
let auth = require("../middleware/auth");
let multer = require("multer");
const sharp = require("sharp");

let router = new express.Router();

// user creation
router.post("/users", async (req, res) => {
  // console.log("user from postman", req.body);
  const user = new User(req.body);

  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((e) => res.status(400).send(e));

  // code with async await --->>>

  try {
    let token = await user.generateAuthToken();
    await user.save();
    console.log("user token", token);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(404).send(e);
  }
});

//login user

router.post("/users/login", async (req, res) => {
  try {
    let user = await User.findByCredential(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    // console.log("userlog>>>", user, token);
    // res.send({ user: user.getpublicprofile(), token });// hode password and token with help of function/method
    res.send({ user, token }); //hiding with helpto toJSON method
  } catch (e) {
    res.status(404).send("no user found" + e);
  }
});

//logout

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    console.log("logout");
    await req.user.save();
    res.send("your are logout from current account");
  } catch (e) {
    res.status(500).send();
  }
});

//logout All
router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("logout from all device");
  } catch (error) {
    res.status(500).send(error);
  }
});

// read users

router.get("/users", async (req, res) => {
  let _id = req.params.id;
  // console.log(_id);
  // User.find()
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(400).send("no user found");
  //     }
  //     res.send(user);
  //   })
  //   .catch((e) => res.status(500).send());

  try {
    let user = await User.find();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/users/me", auth, async (req, res) => {
  let _id = req.params.id;
  // console.log(_id);
  // User.find()
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(400).send("no user found");
  //     }
  //     res.send(user);
  //   })
  //   .catch((e) => res.status(500).send());

  // try {
  //   let user = await User.find();
  //   res.send(user);
  // } catch (e) {
  //   res.status(500).send(e);
  // }

  //user taken from auth verification
  res.send(req.user);
});

//upload user avatar

let upload = multer({
  // dest: "images",
  limits: {
    fileSize: 2000000, // equal ro 2mb
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.endsWith("JPG")) {
    //   cb(new Error("Please upload a jpg file"));
    // }
    if (!file.originalname.match(/\.(jpg|JPG|doc|docx|png|jpeg)$/)) {
      cb(new Error("Please upload a jpg,doc,docx file"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("upload3"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    // req.user.avatar = req.file.buffer; // file.buffer only acces when there is no buffer
    req.user.avatar = buffer;
    await req.user.save();
    res.send("upload success");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
// get profile image
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error("no user or profile found");
    }
    res.set("Content-Type", "image/png"); // bcz sharp change the formate at time of save
    // res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send("profile deleted");
});
router.post("/user/me/avatar", upload.single("avatar"), (req, res) => {
  res.send("");
});

//read user

router.get("/users/:id", async (req, res) => {
  let _id = req.params.id;
  // User.findById(_id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(400).send("please give valid params");
  //     }
  //     res.send(user);
  //   })
  //   .catch((e) => {
  //     res.status(500).send([e, "invalid input"]);
  //   });
  try {
    let user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("no user found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// update -user

router.patch("/users/:id", async (req, res) => {
  let _Id = req.params.id;

  let updates = Object.keys(req.body); // this will give key to update
  // console.log("object updates", updates);
  const allowedUpdate = ["name", "email", "password", "age"];
  const isValid = updates.every((update) => allowedUpdate.includes(update));

  if (!isValid) {
    return res.status(404).send("update the correct value");
  }

  try {
    // const user = await User.findByIdAndUpdate(_Id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const user = await User.findById(req.params.id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    if (!user) {
      return res.status(404).send("invalid request");
    }
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
//witha auth
router.patch("/users/me", auth, async (req, res) => {
  let _Id = req.params.id;

  let updates = Object.keys(req.body); // this will give key to update
  // console.log("object updates", updates);
  const allowedUpdate = ["name", "email", "password", "age"];
  const isValid = updates.every((update) => allowedUpdate.includes(update));

  if (!isValid) {
    return res.status(404).send("update the correct value");
  }

  try {
    // const user = await User.findByIdAndUpdate(_Id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete user

router.delete("/users/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    let deletedTask = await user.deletetask();
    if (!user) {
      return res.status(404).send("no user found");
    }
    res.send({ user, deletedTask });
  } catch (e) {
    res.status(500).send(e);
  }
});

//with help of auth
router.delete("/users/me", auth, async (req, res) => {
  console.log("req.user", req.user);
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    console.log("req.user error", req.user);
    res.status(500).send(e, "error");
  }
});

module.exports = router;
