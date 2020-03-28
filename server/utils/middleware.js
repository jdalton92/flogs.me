const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const errorHandler = (e, req, res, next) => {
  if (error.name === "ValidationError" || "ValidatorError") {
    return res.status(400).json({ error: e.message });
  } else if (error.name === "Error") {
    return res.status(400).json({ error: "invalid request" });
  }

  logger.error(e.message);
  next(e);
};

module.exports = {
  errorHandler,
  requestLogger
};
