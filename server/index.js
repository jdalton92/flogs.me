import ApolloServer from "apollo-server-express";
import express from "express";
import path from "path";
const app = express();
import jwt from "jsonwebtoken";
import { connectDatabase } from "./utils/database.js";
import { errorHandler } from "./utils/middleware.js";
import typeDefs from "./src/schema.js";
import resolvers from "./src/resolvers.js";
import User from "./src/user/model.js";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

connectDatabase();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req && req.headers && req.headers.authorization;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
app.use(errorHandler);
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => {
  console.log(`Server ready at port ${process.env.PORT}`);
});
