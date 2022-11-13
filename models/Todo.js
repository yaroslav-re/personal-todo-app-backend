const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

console.log("connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to mongo.db");
  })
  .catch((error) => {
    console.log("error connecting to mongo.db: ", error.message);
  });

const todoSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  date: Date,
  important: Boolean,
  importance: Number,
});

todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Todo", todoSchema);
