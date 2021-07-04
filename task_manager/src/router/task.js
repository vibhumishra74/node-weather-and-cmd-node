let express = require("express");
let Task = require("../modal/Task");
let auth = require("../middleware/auth");

let router = new express.Router();

//task creation

router.post("/tasks", async (req, res) => {
  // console.log("task>>", req.body);
  const task = new Task(req.body);

  try {
    // task
    //   .save()
    //   .then(() => {
    //     res.status(201).send(task);
    //   })
    //   .catch((e) => {
    //     res.status(400).send(e);
    //   });

    // code with asynch await
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

//task owner add
router.post("/tasks/auth", auth, async (req, res) => {
  // console.log("task>>", req.body);
  // const task = new Task(req.body);

  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    // task
    //   .save()
    //   .then(() => {
    //     res.status(201).send(task);
    //   })
    //   .catch((e) => {
    //     res.status(400).send(e);
    //   });

    // code with async await
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

// read Tasks
// /tasks/:completed this is params where as /tasks?completed is query
// tasks?completed=true
//tasks?completed=false&limit=1
// tasks?completed=false&limit=3&page=4
router.get("/tasks", auth, async (req, res) => {
  const { page = 1, limit = parseInt(req.query.limit) || 10 } = req.query;
  // Task.find()
  //   .then((task) => {
  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e);
  //   });
  try {
    let task = await Task.find({
      owner: req.user._id,
      completed: req.query.completed,
    })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    // await req.user
    // .populate({ path: "tasks", match: { completed: true } })
    // .execPopulate(); // this one work
    // let task = await Task.find();
    // res.send(req.user.task);
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//read Task

// read task only if creat by current user
router.get("/tasks/:id", auth, async (req, res) => {
  let _id = req.params.id;
  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(404).send("invalid id");
  //     }
  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e);
  //   });
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    // let token = task.getAuthToken();
    if (!task) {
      return res
        .status(404)
        .send("invalid Task query or login with your account");
    }
    res.send(task);
    // res.send({ task, token });
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/tasks/:id", async (req, res) => {
  let _id = req.params.id;
  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(404).send("invalid id");
  //     }
  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e);
  //   });
  try {
    const task = await Task.findById(_id);
    // let token = task.getAuthToken();
    if (!task) {
      return res.status(404).send("invalid Task query");
    }
    res.send({ task, token });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  let updates = Object.keys(req.body); // this will give key to update
  const allowedUpdate = ["description", "completed"];
  const isValid = updates.every((update) => allowedUpdate.includes(update));

  if (!isValid) {
    return res.status(404).send("update the correct value!");
  }

  try {
    //req.dody.id <-- give id from params and req.body give all value to update
    // let task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send("no task!!" + req.params.id);
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.patch("/tasks/:id", async (req, res) => {
  let updates = Object.keys(req.body); // this will give key to update
  const allowedUpdate = ["description", "completed"];
  const isValid = updates.every((update) => allowedUpdate.includes(update));

  if (!isValid) {
    return res.status(404).send("update the correct value!");
  }

  try {
    //req.dody.id <-- give id from params and req.body give all value to update
    // let task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("no task!! with id " + req.params.id);
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete tasks

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    let task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send("no task found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.delete("/tasks/:id", async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send("no task found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
