const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.static("build"));

const url = `mongodb+srv://yarik:${process.env.REACT_APP_PASSWORD}@cluster1-lm71m.mongodb.net/phoneDB?retryWrites=true&w=majority`;
mongoose.connect(url);

const todoSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
  importance: Number,
});
const Todo = mongoose.model("Todo", todoSchema);

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>Hello</h1>");
});

app.get("/api/todos", (request, response) => {
  Todo.find({}).then((todos) => {
    response.json(todos);
  });
});

app.get("/api/todos/:id", (request, response) => {
  const id = Number(request.params.id);
  const todo = todos.find((todo) => {
    return todo.id === id;
  });
  if (todo) {
    response.json(todo);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/todos/:id", (request, response) => {
  const id = Number(request.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  response.status(204).end();
});

app.post("/api/todos", (request, response) => {
  const body = request.body;
  // if (body.content === undefined) {
  //   return response.status(400).json({ error: "content missing" });
  // }
  const todo = new Todo({
    content: body.content,
    date: new Date(),
    important: body.important,
    importance: body.importance,
  });

  todo.save().then((savedTodo) => {
    response.json(savedTodo);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
