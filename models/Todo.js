const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: {
    type: String,
    minLength: 3,
    required: true,
  },
  date: Date,
  important: Boolean,
  importance: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Todo", todoSchema);
