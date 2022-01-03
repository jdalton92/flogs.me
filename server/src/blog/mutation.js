import apollo from "apollo-server-express";
const { UserInputError, AuthenticationError } = apollo;

import Blog from "./model.js";
import User from "../user/model.js";
import Comment from "../comment/model.js";

const favoriteBlog = async (root, { blogId }, { currentUser }) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }

  const user = await User.findById(currentUser._id);
  const existing = user.savedBlogs.filter((b) => b == blogId);

  if (existing.length > 0) {
    throw new ApolloError("blog already saved");
  }

  try {
    await User.findOneAndUpdate(
      { _id: currentUser._id },
      { $push: { savedBlogs: blogId } }
    );
    return;
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { blogId },
    });
  }
};

const createBlog = async (
  root,
  { title, slug, category, tags, content, img, similarBlogs },
  { currentUser }
) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }

  // TODO: use slugify utility
  // Ensure there are no 'spaces' in slug
  slug.replace(" ", "-");

  let blog = new Blog({
    author: currentUser._id,
    title,
    slug,
    category,
    tags,
    content,
    img,
    similarBlogs,
  });

  try {
    await User.findOneAndUpdate(
      { _id: currentUser._id },
      { $push: { blogs: blog._id } }
    );

    // Add new blog to similar blogs of
    // existing blogs for those selected
    await Blog.updateMany(
      { _id: { $in: similarBlogs } },
      { $push: { similarBlogs: blog._id } }
    );

    await blog.save();
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: {
        title,
        slug,
        category,
        tags,
        content,
        img,
        similarBlogs,
      },
    });
  }

  blog = await Blog.findById(blog._id).populate("author");

  return blog;
};

const updateBlog = async (
  root,
  { _id, title, slug, category, tags, content, img, similarBlogs },
  { currentUser }
) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }

  // TODO: use slugify utility
  // Ensure there are no 'spaces' in slug
  slug.replace(" ", "-");

  const updatedBlog = {
    ...(title && { title }),
    ...(slug && { slug }),
    ...(category && { category }),
    ...(tags.length > 0 && { tags }),
    ...(content && { content }),
    ...(img && { img }),
    ...(similarBlogs && { similarBlogs }),
  };

  try {
    // Add new blog to similar blogs of existing blogs for those selected if
    // not already in similarBlogs array
    await Blog.updateMany(
      { _id: { $in: similarBlogs } },
      { $addToSet: { similarBlogs: _id } }
    );

    await Blog.findByIdAndUpdate(_id, updatedBlog, {
      new: true,
    });
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: {
        _id,
        title,
        slug,
        category,
        tags,
        content,
        img,
        similarBlogs,
      },
    });
  }
  const newBlog = await Blog.findById(_id).populate("author");
  return newBlog;
};

const deleteBlog = async (root, { blogId }, { currentUser }) => {
  if (!currentUser || currentUser.userType !== "admin") {
    throw new AuthenticationError("not authenticated");
  }

  try {
    // Remove blogs from blog collection
    const blog = await Blog.findByIdAndDelete(blogId);

    // Remove blog from similarBlogs recommendation
    await Blog.updateMany({}, { $pull: { similarBlogs: blogId } });

    // Remove blog from author
    await User.updateMany({ _id: blog.author }, { $pull: { blogs: blogId } });

    // Delete comments
    await Comment.deleteMany({ blog: blogId });

    // Remove blog from saved blogs list for each user
    await User.updateMany({}, { $pull: { savedBlogs: blogId } });
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { blogId },
    });
  }

  return true;
};

const featureBlogs = async (root, { blogId, type }, { currentUser }) => {
  if (!currentUser || currentUser.userType !== "admin") {
    throw new AuthenticationError("not authenticated");
  }
  try {
    if (type === "setFeatured") {
      await Blog.updateMany(
        { _id: { $in: blogId } },
        { $set: { featured: true } }
      );
    } else if (type.toString() === "setNonFeatured") {
      await Blog.updateMany(
        { _id: { $in: blogId } },
        { $set: { featured: false } }
      );
    }
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { blogId },
    });
  }

  return true;
};

export default {
  createBlog,
  favoriteBlog,
  updateBlog,
  deleteBlog,
  featureBlogs,
};
