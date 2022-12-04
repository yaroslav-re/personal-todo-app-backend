const mongoose = require("mongoose");

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
