import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const SECRET = process.env.SECRET;
const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const EMAIL = process.env.EMAIL;

export default {
  MONGODB_URI,
  PORT,
  NODE_ENV,
  SECRET,
  API_KEY,
  DOMAIN,
  EMAIL,
};
