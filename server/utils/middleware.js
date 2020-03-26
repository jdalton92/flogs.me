const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError" || "ValidatorError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "Error") {
    return response.status(400).json({ error: "invalid request" });
  }

  logger.error(error.message);
  next(error);
};

module.exports = {
  errorHandler,
  requestLogger
};
