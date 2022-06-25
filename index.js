const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("build"));

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
    date: "2022-1-17T18:39:34.091Z",
    important: 2,
    done: true,
  },
  {
    id: 3,
    title: "Friend",
    content: "Go to friend's house",
    date: "2022-1-17T19:20:14.298Z",
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
  response.json(todos);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// остановились на методе delete
