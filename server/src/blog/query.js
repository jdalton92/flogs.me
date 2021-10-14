const { UserInputError } = require("apollo-server-express");
const mongoose = require("mongoose");

const Blog = require("../blog/model");

export const allBlogs = async (root, { category, search, all }) => {
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

export const blogDetail = async (root, { slug }) => {
  try {
    blog = await Blog.findOne({ slug })
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

export const featuredBlogDetail = async (root, { top, field, order }) => {
  const sortOrder = order === "descending" ? "-" : "";
  const fieldLength = `${field}.length`;
  let blogs;
  try {
    if (field === "featured") {
      blogs = await Blog.find({ featured: true }).populate("author");
    } else {
      if (Blog.schema.path(field) instanceof mongoose.Schema.Types.Array) {
        blogs = await Blog.find({ fieldLength: { $gt: 0 } }, null, {
          sort: `${sortOrder}${fieldLength}`,
        })
          .limit(top)
          .populate("author");
      } else {
        blogs = await Blog.find({}, null, { sort: `${sortOrder}${field}` })
          .limit(top)
          .populate("author");
      }
    }
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { top, field },
    });
  }

  return blogs;
};
