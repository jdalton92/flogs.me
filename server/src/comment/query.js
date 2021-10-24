import apollo from "apollo-server-express";
const { UserInputError, PubSub } = apollo;

import Comment from "./model.js";
import Blog from "../blog/model.js";

const getComment = async (root, { slug }) => {
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

export default { getComment };
