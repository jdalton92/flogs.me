import config from "./config.js";

const info = (...params) => {
  if (config.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  console.error(...params);
};

export default {
  info,
  error,
};
