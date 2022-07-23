const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.static("build"));
const url = `mongodb+srv://yarik:${process.env.password}@cluster1-lm71m.mongodb.net/phoneDB?retryWrites=true&w=majority`;
mongoose.connect(url);

const todoSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});
const Todo = mongoose.model("Todo", todoSchema);

let todos = [
  {
    id: 1,
    title: "Meeting",
    content: "Go home",
    date: "1654409145000",
    important: 1,
    done: true,
  },
  {
    id: 2,
    title: "Workout",
    content: "Go to swimming pool",
    date: "1657039172000",
    important: 2,
    done: true,
  },
  {
    id: 3,
    title: "Friend",
    content: "Go to friend's house",
    date: "1657211972000",
    important: 3,
    done: false,
  },
];

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

app.post("/api/todos/:id", (request, response) => {
  // todos = todos.push()
  console.log(
    "request!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ",
    request.data,
  );
  response.status(204).end("success");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
