const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "please provide the password as an argument: node mongo.js <password>",
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://yarik:${password}@cluster1-lm71m.mongodb.net/phoneDB?retryWrites=true&w=majority`;

const todoSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");
    const todo = new Todo({
      content: "its alive",
      date: new Date(),
      important: true,
    });
    return todo.save();
  })
  .then(() => {
    console.log("todo saved");
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
