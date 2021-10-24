// Queries
import userQuery from "./user/query.js";
import commentQuery from "./comment/query.js";
import blogQuery from "./blog/query.js";
// Mutations
import userMutation from "./user/mutation.js";
import commentMutation from "./comment/mutation.js";
import contactMutation from "./contact/mutation.js";
import subscriptionMutation from "./subscription/mutation.js";
import blogMutation from "./blog/mutation.js";
// Subscriptions
import commentSubscription from "./comment/subscription.js";

const queries = { ...userQuery, ...commentQuery, ...blogQuery };

const mutations = {
  ...userMutation,
  ...commentMutation,
  ...subscriptionMutation,
  ...contactMutation,
  ...blogMutation,
};

const subscriptions = commentSubscription;

export default {
  Query: queries,
  Mutation: mutations,
  // TODO: fix pubsub subscriptions
  // Subscription: subscriptions,
};
