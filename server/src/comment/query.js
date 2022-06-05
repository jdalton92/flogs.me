import apollo from "apollo-server-express";
const { UserInputError } = apollo;

import Comment from "./model.js";
import Blog from "../blog/model.js";

const getComments = async (root, { slug, sort, limit, page }) => {
  try {
    const blog = await Blog.findOne({ slug });
    const query = { blog: blog._id };
    const populate = ["author", "name"];
    const paginationOptions = {
      sort,
      limit,
      page,
    };
    const comments = await Comment.paginate(query, populate, paginationOptions);
    return comments;
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { slug },
    });
  }
};

export default { getComments };
