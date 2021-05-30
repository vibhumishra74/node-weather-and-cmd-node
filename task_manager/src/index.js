let express = require("express");
require("./db/mongose");
let userRouter = require("./router/user");
let taskRouter = require("./router/task");

let app = express();
let port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("app up and spinning on ", port);
});
