const todosRouter = require("express").Router();
const Todo = require("../models/todo");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }

  return null;
};

todosRouter.get("/", async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "авторизуйся" });
  }

  const todos = await Todo.find({}).populate("user", { username: 1, name: 1 });
  response.json(todos);
});

todosRouter.get("/:id", async (request, response) => {
  const todo = await Todo.findById(request.params.id);
  if (todo) {
    response.json(todo.toJSON());
  } else {
    response.status(404).end();
  }
});

todosRouter.delete("/:id", async (request, response) => {
  await Todo.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

todosRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "неправильный токен" });
  }
  const user = await User.findById(decodedToken.id);

  const todo = new Todo({
    title: body.title,
    content: body.content,
    date: body.date,
    important: body.important,
    importance: body.importance,
    user: user._id,
  });

  const savedTodo = await todo.save();
  user.todos = user.todos.concat(savedTodo._id);
  await user.save();

  response.json(savedTodo);
});

todosRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const todo = {
    content: body.content,
    important: body.important,
    importance: body.importance,
  };
  Todo.findByIdAndUpdate(request.params.id, todo, { new: true })
    .then((updatedTodo) => {
      response.json(updatedTodo);
    })
    .catch((error) => next(error));
});

module.exports = todosRouter;
