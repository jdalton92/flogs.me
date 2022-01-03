import apollo from "apollo-server-express";
const { UserInputError } = apollo;
import mongoose from "mongoose";

import Blog from "./model.js";

const getAllBlogs = async (root, { sort }) => {
  const blogs = await Blog.find({})
    .sort(sort || "-date")
    .populate("author");

  return blogs;
};

const getBlogs = async (root, { category, sort, limit, page }) => {
  const query = category ? { category } : {};
  const populate = "author";
  const paginationOptions = {
    sort,
    limit,
    page,
  };

  const blogs = await Blog.paginate(query, populate, paginationOptions);

  return blogs;
};

const searchBlogs = async (root, { searchTerm, limit, page }) => {
  const query = {
    $text: { $search: searchTerm, $caseSensitive: false },
  };
  const populate = "author";
  const paginationOptions = {
    page,
    limit,
  };

  const blogs = await Blog.paginate(query, populate, paginationOptions);

  return blogs;
};

const getBlog = async (root, { slug }) => {
  try {
    const blog = await Blog.findOne({ slug })
      .populate("author")
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })
      .populate({
        path: "similarBlogs",
        populate: {
          path: "author",
        },
      });

    if (!blog) {
      throw new UserInputError("blog does not exist");
    }

    return blog;
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { slug },
    });
  }
};

const getFeaturedBlogs = async (root, { top, field, order }) => {
  const sortOrder = order === "descending" ? "-" : "";
  let blogs;
  try {
    switch (field) {
      case "featured":
        blogs = await Blog.find({ featured: true }).populate("author");
        break;
      case "comments":
        blogs = await Blog.find({ "comments.0": { $exists: true } }, null, {
          sort: `${sortOrder}${field}`,
        })
          .limit(top)
          .populate("author");
        break;
      case "date":
        blogs = await Blog.find({}, null, { sort: `${sortOrder}${field}` })
          .limit(top)
          .populate("author");
        break;
      default:
        throw new UserInputError("invalid field");
    }
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { top, field },
    });
  }

  return blogs;
};

export default {
  getBlogs,
  getAllBlogs,
  searchBlogs,
  getBlog,
  getFeaturedBlogs,
};
