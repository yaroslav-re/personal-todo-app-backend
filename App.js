const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
require("express-async-errors");

const todosRouter = require("./controllers/todos");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const loginRouter = require("./controllers/login");

logger.info("connecting to ", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongo.db");
  })
  .catch((error) => {
    logger.error("error connecting to mongo.db: ", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

// посмотреть unit tests react
