require("../db/mongose");
let Task = require("../modal/Task");
const deletetaskandcount = async (id, task) => {
  let deleted = await Task.findByIdAndDelete(id);
  let count = await Task.countDocuments({ completed: task });
  return [deleted, count];
};

deletetaskandcount("60b349d3b6a72a108463c3f7", true)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => e);
