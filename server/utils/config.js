if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const MONGODB_URI = process.env.MONGODB_URI;

export default {
  MONGODB_URI,
};
