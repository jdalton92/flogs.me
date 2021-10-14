const { UserInputError, PubSub } = require("apollo-server-express");

const Comment = require("./model");
const Blog = require("../blog/model");

export const commentDetail = async (root, { slug }) => {
  try {
    blog = await Blog.findOne({ slug });
    comments = await Comment.find({ blog: blog._id }).populate(
      "author",
      "name"
    );
    return comments;
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { blogId },
    });
  }
};
