import apollo from "apollo-server-express";
const { UserInputError } = apollo;
import mongoose from "mongoose";

import Blog from "./model.js";

const getBlogs = async (root, { category, search, all }) => {
  let blogs = [];
  if (category) {
    blogs = await Blog.find({ category }).populate("author");
  } else if (search) {
    blogs = await Blog.find({
      $text: { $search: search, $caseSensitive: false },
    }).populate("author");
  } else if (all) {
    blogs = await Blog.find({}).populate("author");
  }

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

export default { getBlogs, getBlog, getFeaturedBlogs };
