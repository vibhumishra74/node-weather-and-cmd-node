require("../db/mongose");

// count and delete

Task.findByIdAndUpdate("60a2abb663a6bc4604a4b256", { completed: true })
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: true });
  })
  .then((comp) => {
    console.log(comp);
    return Task.find({ completed: true });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => console.log("Error!", e));

Task.findByIdAndDelete("60aff025907e202300d474de")
  .then((task) => {
    console.log(task);
  })
  .catch((e) => console.log(e));
