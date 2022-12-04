const todosRouter = require("express").Router();
const Todo = require("../models/todo");
const User = require("../models/user");

todosRouter.get("/", (request, response) => {
  response.send("<h1>Hello</h1>");
});

todosRouter.get("/api/todos", (request, response) => {
  Todo.find({}).then((todos) => {
    response.json(todos);
  });
});

todosRouter.get("/api/todos/:id", (request, response) => {
  const todo = Todo.findById(request.params.id).then((todo) =>
    response.json(todo),
  );
});

todosRouter.delete("/api/todos/:id", (request, response) => {
  const id = Number(request.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  response.status(204).end();
});

todosRouter.post("/api/todos", (request, response) => {
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
