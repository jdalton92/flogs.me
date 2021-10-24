import apollo from "apollo-server-express";
const { PubSub } = apollo;

// TODO: Include pubsub subscriptions
// const pubsub = new PubSub();

const commentAdded = {
  // subscribe: () => pubsub.asyncIterator(["COMMENT_ADDED"]),
};

export default { commentAdded };
