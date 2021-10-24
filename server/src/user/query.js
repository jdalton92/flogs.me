import apollo from "apollo-server-express";
const { UserInputError } = apollo;

import User from "./model.js";

const getUser = async (root, { userId }) => {
  try {
    user = await User.findById(userId)
      .populate({
        path: "blogs",
        populate: {
          path: "author",
        },
      })
      .populate({
        path: "savedBlogs",
        populate: {
          path: "author",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "blog",
        },
      });
    return user;
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { userId },
    });
  }
};

const getMe = (root, args, { currentUser }) => {
  return currentUser;
};

export default { getUser, getMe };
