const { UserInputError } = require("apollo-server-express");

const User = require("./model");

export const getUser = async (root, { userId }) => {
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

export const getMe = (root, args, { currentUser }) => {
  return currentUser;
};
