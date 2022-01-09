import apollo from "apollo-server-express";
const { ApolloServer } = apollo;
import express from "express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
const app = express();

import config from "./utils/config.js";
import { connectDatabase } from "./utils/database.js";
import { errorHandler } from "./utils/middleware.js";
import typeDefs from "./src/schema.js";
import resolvers from "./src/resolvers.js";
import User from "./src/user/model.js";

connectDatabase();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req && req.headers && req.headers.authorization;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

app.use(express.static("build"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "build", "index.html"));
});
app.use(errorHandler);
server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen({ port: config.PORT }, () => {
  console.log(`Server ready at port ${config.PORT}`);
});
