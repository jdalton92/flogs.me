const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
mongoose.set("useCreateIndex", true);

const middleware = require("./utils/middleware");

const subscriptionsRouter = require("./controllers/subscriptions");

app.use(cors());
app.use(express.static(__dirname + "/build"));
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
app.use(bodyParser.json());

const databaseConnection = async () => {
  try {
    logger.info("connecting to", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    logger.info("connected to MongoDB");
  } catch (e) {
    logger.info("error connection to MongoDB:", e.message);
  }
};
databaseConnection();

app.use(middleware.errorHandler);
app.use(middleware.requestLogger);

app.use("/api/subscriptions", subscriptionsRouter);

module.exports = app;
