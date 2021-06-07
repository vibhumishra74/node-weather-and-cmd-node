let express = require("express");
let Task = require("../modal/Task");

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

// read Tasks

router.get("/tasks", async (req, res) => {
  // Task.find()
  //   .then((task) => {
  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e);
  //   });
  try {
    let task = await Task.find();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//read Task

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
    if (!task) {
      return res.status(404).send("invalid Task query");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
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
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    if (!task) {
      return res.status(404).send("no task!! with id " + req.params.id);
    }
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete tasks

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
