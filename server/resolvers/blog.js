const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server-express");

const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/user");

module.exports = {
  Query: {
    allBlogs: async (root, { category, search, all }) => {
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
    },
    blogDetail: async (root, { slug }) => {
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
    },
    featuredBlogDetail: async (root, { top, field, order }) => {
      const sortOrder = order === "descending" ? "-" : "";
      let blogs;
      try {
        if (field === "featured") {
          blogs = await Blog.find({ featured: true }).populate("author");
        } else {
          blogs = await Blog.find({}, null, { sort: `${sortOrder}${field}` })
            .limit(top)
            .populate("author");
        }
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { top, field },
        });
      }

      return blogs;
    },
  },
  Mutation: {
    saveBlog: async (root, { blogId }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const user = await User.findById(currentUser._id);
      const existing = user.savedBlogs.filter((b) => b === blogId);

      if (existing.length > 0) {
        throw new ApolloError("blog already saved");
      }

      try {
        user.savedBlogs = user.blogs.concat(blogId);
        await user.save();
        return;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { blogId },
        });
      }
    },
    addBlog: async (
      root,
      { title, slug, category, tags, content, img, similarBlogs },
      { currentUser }
    ) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      //Ensure there are no 'spaces' in slug
      slug.replace(" ", "-");

      let blog = new Blog({
        title,
        slug,
        category,
        tags,
        content,
        img,
        author: currentUser._id,
        similarBlogs,
      });

      try {
        const user = await User.findById(currentUser._id);
        user.blogs = user.blogs.concat(blog._id);

        await user.save();
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
    },
    removeBlogs: async (root, { blogId }, { currentUser }) => {
      if (!currentUser || currentUser.userType !== "admin") {
        throw new AuthenticationError("not authenticated");
      }

      try {
        // Remove blogs from blog collection
        const blog = await Blog.findByIdAndDelete(blogId);

        // Remove blog from similarBlogs recomendation
        await Blog.updateMany({}, { $pull: { similarBlogs: blogId } });

        // Remove blog from author
        await User.updateMany(
          { _id: blog.author },
          { $pull: { blogs: blogId } }
        );

        //Remove comments from blog
        await Comment.deleteMany({ blog: blogId });

        //Remove blog from saved blogs list for each user
        await User.updateMany({}, { $pull: { savedBlogs: blogId } });
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { blogId },
        });
      }

      return true;
    },
    featureBlogs: async (root, { blogId, type }, { currentUser }) => {
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
    },
  },
};
