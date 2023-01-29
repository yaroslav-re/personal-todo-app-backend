const app = require("./App");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`server running on port ${config.PORT}`);
});

// починить delete запрос и post запрос
