const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const Todo = require("./models/Todo");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

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
  const todo = Todo.findById(request.params.id).then((todo) =>
    response.json(todo),
  );
  // if (todo) {
  //   response.json(todo);
  // } else {
  //   response.status(404).end();
  // }
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
    id: body.id,
    title: body.title,
    description: body.description,
    date: new Date(),
    important: body.important,
    importance: body.importance,
  });

  todo.save().then((savedTodo) => {
    response.json(savedTodo);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
