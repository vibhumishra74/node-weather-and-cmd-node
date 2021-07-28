let express = require("express");
require("./db/mongose");
let userRouter = require("./router/user");
let taskRouter = require("./router/task");
// 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
let app = express();
let port = process.env.PORT || 3000;

// express middle ware

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("app up and spinning on ", port);
});

// const Task = require("./modal/Task");
// const User = require("./modal/user");
// async function main() {
//   // const task = await Task.findById("60e1794c2644330e706b5ba8");
//   // await task.populate("owner").execPopulate();
//   // console.log("task??", task);
//   const user = await User.findById("60e1f1fd7e2f5e282409fc7b");
//   await user.populate("task").execPopulate();
//   console.log(user.tasks);
//   // console.log(user.my_task);
// }
// main();
