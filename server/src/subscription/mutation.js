import apollo from "apollo-server-express";
const { UserInputError, ApolloError } = apollo;

import Subscription from "./model.js";

const subscribe = async (root, { email }) => {
  try {
    const existingSubscriber = await Subscription.find({ email });

    if (existingSubscriber.length > 0) {
      throw new UserInputError("already subscribed");
    }

    const subscriber = new Subscription({
      email,
    });

    await subscriber.save();

    return email;
  } catch (e) {
    throw new ApolloError(e.message);
  }
};

export default { subscribe };
