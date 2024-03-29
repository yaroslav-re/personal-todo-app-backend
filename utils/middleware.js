const logger = require("./logger");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "несуществующий адрес" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "некорректный id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "тухлый токен" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "просроченный токен" });
  }

  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
