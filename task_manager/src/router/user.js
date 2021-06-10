let express = require("express");
let User = require("../modal/user");

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
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(404).send(e);
  }
});

//login user

router.post("/users/login", async (req, res) => {
  try {
    let user = await User.findByCredential(req.body.email, req.body.password);
    console.log("userlog>>>", user);
    res.send(user);
    console.log("email log send", res.send(user));
  } catch (e) {
    res.status(404).send(e);
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

// delete user

router.delete("/users/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("no user found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
