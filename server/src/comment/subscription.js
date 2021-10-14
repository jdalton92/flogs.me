const { PubSub } = require("apollo-server-express");

const pubsub = new PubSub();

export const commentAdded = {
  subscribe: () => pubsub.asyncIterator(["COMMENT_ADDED"]),
};
