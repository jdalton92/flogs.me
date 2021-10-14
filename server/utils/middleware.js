import logger from "./logger.js";

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const errorHandler = (error, req, res, next) => {
  if (error) {
    const status = error.status || error.statusCode || 500;
    const message =
      error.message || error.statusMessage || "Internal server error";
    logger.info(error);

    return res.status(status).send({
      status,
      message,
    });
  }

  next(error);
};

export default {
  errorHandler,
  requestLogger,
};
