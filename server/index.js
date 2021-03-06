const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const User = require("./models/user");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const databaseConnection = async () => {
  try {
    logger.info("connecting to", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.info("connected to MongoDB");
  } catch (e) {
    logger.info("error connection to MongoDB:", e.message);
  }
};
databaseConnection();

let app = express();
let environment = process.env.NODE_ENV || "development";
if (environment === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : "";
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => {
  console.log(`Server ready at port ${process.env.PORT}`);
});
