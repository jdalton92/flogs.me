const { UserInputError, ApolloError } = require("apollo-server-express");

const Subscription = require("./model");

export const subscribe = async (root, { email }) => {
  try {
    existingSubscriber = await Subscription.find({ email });

    if (existingSubscriber.length > 0) {
      throw new UserInputError("already subscribed");
    }

    const subscriber = new Subscription({
      email,
    });

    await subscriber.save();

    return { email };
  } catch (e) {
    throw new ApolloError(e.message);
  }
};
