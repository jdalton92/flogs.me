import mongoose from "mongoose";
import logger from "./logger.js";
import config from "./config.js";

mongoose.set("useCreateIndex", true);

export const connectDatabase = async () => {
  try {
    logger.info("connecting to", config.MONGODB_URI);
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.info("connected to MongoDB");
  } catch (e) {
    logger.error("error connection to MongoDB:", e.message);
  }
};
